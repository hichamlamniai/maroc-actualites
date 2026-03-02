/**
 * /api/cron/refresh
 *
 * Endpoint de rafraîchissement déclenché :
 *  - Par Vercel Cron (1x/jour à 6h UTC — plan Hobby)
 *  - Par cron-job.org ou tout service externe toutes les 30 min
 *
 * Ce qu'il fait :
 *  1. Invalide le cache ISR de toutes les pages (revalidatePath)
 *  2. La prochaine visite re-fetche NewsAPI avec from=6_jours et tri par date
 *
 * Sécurisé par CRON_SECRET (header Authorization: Bearer <secret>).
 * Sans secret configuré → accepté (pratique en dev et services externes).
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/types/news';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // ── Authentification ──────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  const isAuthorized =
    !cronSecret ||
    authHeader === `Bearer ${cronSecret}` ||
    request.headers.get('x-cron-secret') === cronSecret;

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const startTime = Date.now();

  // ── Invalidation ISR de toutes les pages ─────────────────────────────
  // Force Next.js à re-fetcher NewsAPI (from=6 jours) à la prochaine visite
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  for (const cat of CATEGORIES) {
    revalidatePath(`/${cat.slug}`, 'page');
  }

  return NextResponse.json({
    status: 'ok',
    refreshedAt: new Date().toISOString(),
    durationMs: Date.now() - startTime,
    message: 'Cache ISR invalidé — les pages seront régénérées à la prochaine visite',
    categoriesInvalidated: CATEGORIES.map((c) => c.slug),
  });
}
