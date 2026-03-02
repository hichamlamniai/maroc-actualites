/**
 * articleValidator.ts
 *
 * Valide un lien en récupérant les premiers octets de la page
 * pour extraire le <title> et détecter :
 *  - Pages 404 / supprimées / vides
 *  - Redirections vers la page d'accueil (titre trop générique)
 *  - Contenu sans rapport avec l'article
 */

// Mots-clés indiquant une page d'erreur ou supprimée
const ERROR_KEYWORDS = [
  '404', '410', 'not found', 'page not found',
  'introuvable', 'supprimé', 'supprimée', 'deleted', 'removed',
  'error', 'erreur', 'access denied', 'forbidden', 'interdit',
  'unavailable', 'indisponible', 'oops', 'gone',
  'page expirée', 'page does not exist',
];

// Titres génériques indiquant une redirection vers l'accueil
const GENERIC_TITLES = [
  'accueil', 'home', 'homepage', 'bienvenue', 'welcome',
  'hespress', 'le360', 'medias24', 'telquel', 'map', 'l\'économiste',
];

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  pageTitle?: string;
}

/**
 * Valide un article en vérifiant sa page réelle.
 * Récupère seulement les 8 premiers Ko pour extraire <title>.
 * En cas d'erreur réseau → accepté (mieux que de tout rejeter).
 */
export async function validateArticleUrl(
  url: string,
  articleTitle: string
): Promise<ValidationResult> {
  // Vérification format de base
  if (!url || url === '#' || url === '') {
    return { valid: false, reason: 'URL vide ou invalide' };
  }
  try {
    new URL(url);
  } catch {
    return { valid: false, reason: 'Format URL invalide' };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        // User-Agent navigateur pour éviter les blocages bot
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-FR,fr;q=0.9',
        // Demande seulement les premiers 8Ko pour récupérer le <title>
        Range: 'bytes=0-8192',
      },
      redirect: 'follow',
    });

    clearTimeout(timer);

    // Rejet HTTP explicite (404, 410, 500…)
    if (res.status === 404 || res.status === 410) {
      return { valid: false, reason: `HTTP ${res.status}` };
    }
    if (res.status >= 500) {
      return { valid: false, reason: `Erreur serveur ${res.status}` };
    }

    const html = await res.text();

    // Extraction du <title>
    const titleMatch = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : '';

    // Page sans titre → suspect
    if (!pageTitle || pageTitle.length < 3) {
      return { valid: false, reason: 'Titre de page manquant', pageTitle };
    }

    const pageTitleLower = pageTitle.toLowerCase();

    // Détection d'erreur dans le titre
    const errorKw = ERROR_KEYWORDS.find((kw) => pageTitleLower.includes(kw));
    if (errorKw) {
      return { valid: false, reason: `Titre indique erreur : "${errorKw}"`, pageTitle };
    }

    // Titre trop générique = redirection vers accueil sans contenu
    const isGeneric =
      GENERIC_TITLES.some((t) => pageTitleLower === t) ||
      pageTitleLower.split(/[\s|–-]+/).length <= 2;

    // Vérifier si le titre de la page a au moins un mot en commun avec l'article
    const articleWords = articleTitle
      .toLowerCase()
      .split(/[\s,;.!?'"«»()\-]+/)
      .filter((w) => w.length > 4);

    const matchCount = articleWords.filter((w) => pageTitleLower.includes(w)).length;

    if (isGeneric && matchCount === 0) {
      return {
        valid: false,
        reason: 'Page redirigée vers accueil (titre générique, aucun mot en commun)',
        pageTitle,
      };
    }

    return { valid: true, pageTitle };
  } catch (err: unknown) {
    // Timeout ou réseau inaccessible : on accepte par défaut
    // (évite de rejeter des articles valides à cause de sites restrictifs)
    if (err instanceof Error && err.name === 'AbortError') {
      return { valid: true, reason: 'Timeout — accepté par défaut' };
    }
    return { valid: true, reason: 'Erreur réseau — accepté par défaut' };
  }
}

/**
 * Valide un tableau d'articles en parallèle.
 * Retourne seulement les articles dont le lien est valide.
 * Plafonne à maxResults articles.
 */
export async function validateArticles<T extends { url: string; title: string }>(
  articles: T[],
  maxResults = 10
): Promise<T[]> {
  const results = await Promise.allSettled(
    articles.map(async (article) => {
      const result = await validateArticleUrl(article.url, article.title);
      return { article, valid: result.valid };
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<{ article: T; valid: boolean }> =>
        r.status === 'fulfilled' && r.value.valid
    )
    .map((r) => r.value.article)
    .slice(0, maxResults);
}
