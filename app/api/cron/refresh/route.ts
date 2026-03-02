/**
 * /api/cron/refresh
 *
 * Processus arrière-plan déclenché toutes les 30 min par Vercel Cron.
 * 1. Récupère les derniers articles depuis NewsAPI (ou mock)
 * 2. Valide chaque lien en vérifiant le <title> de la page
 * 3. Filtre les liens vides, supprimés ou redirigés
 * 4. Déclenche la revalidation ISR de toutes les pages
 *
 * Sécurisé par CRON_SECRET (auto-injecté par Vercel sur les crons).
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/types/news';
import { fetchArticlesByCategory, fetchLatestArticles } from '@/lib/newsApi';
import { validateArticles } from '@/lib/articleValidator';

// Durée max de la fonction serverless (60s sur Vercel Pro, 10s sur Free)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // ── Authentification ──────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // En local (sans secret) ou avec le bon secret Vercel
  const isAuthorized =
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    request.headers.get('x-cron-secret') === cronSecret;

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const startTime = Date.now();
  const report: Record<string, { fetched: number; valid: number; rejected: number }> = {};

  // ── Traitement par rubrique ───────────────────────────────────────────
  for (const category of CATEGORIES) {
    try {
      // 1. Récupère les articles (NewsAPI ou mock)
      const articles = await fetchArticlesByCategory(category);

      // 2. Validation complète par titre de page
      const validArticles = await validateArticles(articles, 10);

      report[category.slug] = {
        fetched: articles.length,
        valid: validArticles.length,
        rejected: articles.length - validArticles.length,
      };
    } catch {
      report[category.slug] = { fetched: 0, valid: 0, rejected: 0 };
    }
  }

  // ── Revalidation ISR de toutes les pages ─────────────────────────────
  // Déclenche la re-génération des pages en arrière-plan
  // (les visiteurs voient l'ancienne version jusqu'à la prochaine visite)
  revalidatePath('/', 'layout');          // Homepage + layout global
  revalidatePath('/', 'page');

  for (const cat of CATEGORIES) {
    revalidatePath(`/${cat.slug}`, 'page');
  }

  const duration = Date.now() - startTime;

  return NextResponse.json({
    status: 'ok',
    refreshedAt: new Date().toISOString(),
    durationMs: duration,
    categories: report,
    totalValid: Object.values(report).reduce((sum, r) => sum + r.valid, 0),
    totalRejected: Object.values(report).reduce((sum, r) => sum + r.rejected, 0),
  });
}
