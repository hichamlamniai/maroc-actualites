import { Article, Category, CategorySlug } from '@/types/news';

const MAX_ARTICLES = 10;       // Maximum d'articles conservés par rubrique
const FETCH_EXTRA   = 18;      // On récupère plus pour compenser les liens morts

// ── Validation de lien ────────────────────────────────────────────────────

/**
 * Vérifie si une URL est accessible (HEAD request, timeout 4s).
 * Retourne false si l'URL est vide, '#', ou renvoie une erreur HTTP.
 */
async function isUrlReachable(url: string): Promise<boolean> {
  if (!url || url === '#') return false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timer);
    return res.status < 400; // 2xx et 3xx = OK
  } catch {
    return false; // timeout, réseau, CORS, etc.
  }
}

/**
 * Filtre une liste d'articles en vérifiant chaque URL en parallèle.
 * Ne garde que les articles dont le lien répond correctement (< 400).
 * Plafonne à MAX_ARTICLES.
 */
async function filterValidArticles(articles: Article[]): Promise<Article[]> {
  const results = await Promise.allSettled(
    articles.map(async (article) => ({
      article,
      valid: await isUrlReachable(article.url),
    }))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<{ article: Article; valid: boolean }> =>
        r.status === 'fulfilled' && r.value.valid
    )
    .map((r) => r.value.article)
    .slice(0, MAX_ARTICLES);
}

// ── Mock articles (fallback si pas de clé API) ────────────────────────────

const MOCK_ARTICLES: Article[] = [
  // Actualités
  {
    id: 'mock-1',
    title: 'Le Maroc renforce ses investissements dans les énergies renouvelables',
    description:
      "Le Royaume du Maroc annonce un plan ambitieux pour atteindre 52% d'énergie renouvelable d'ici 2030, avec de nouveaux partenariats internationaux.",
    content: "Le Maroc continue d'affirmer son leadership africain en matière d'énergies propres...",
    url: 'https://le360.ma/economie',
    urlToImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Rédaction',
    category: 'general',
  },
  {
    id: 'mock-2',
    title: "Casablanca : nouveau record d'affluence à l'aéroport Mohammed V",
    description:
      "L'aéroport de Casablanca enregistre plus de 10 millions de passagers en 2025, un record historique.",
    content: "L'ONDA annonce des chiffres record pour l'aéroport Mohammed V...",
    url: 'https://www.medias24.com/transport',
    urlToImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Correspondant',
    category: 'general',
  },
  // Politique
  {
    id: 'mock-3',
    title: "Conseil du gouvernement : adoption de nouveaux projets de loi",
    description:
      "Le Conseil du gouvernement a adopté plusieurs projets de loi relatifs à la réforme de l'administration publique.",
    content: 'Lors de sa réunion hebdomadaire, le gouvernement a examiné...',
    url: 'https://www.map.ma/fr/sections/politique',
    urlToImage:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'MAP',
    category: 'politique',
  },
  {
    id: 'mock-4',
    title: "Diplomatie : le Maroc renforce ses liens avec l'Union Européenne",
    description:
      "Un nouveau partenariat stratégique entre le Maroc et l'UE a été signé lors du sommet de Bruxelles.",
    content: "Le Maroc et l'Union Européenne ont signé un accord-cadre historique...",
    url: 'https://ledesk.ma/politique',
    urlToImage:
      'https://images.unsplash.com/photo-1485811055483-1c09e64d4576?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Bureau de Bruxelles',
    category: 'politique',
  },
  // Culture
  {
    id: 'mock-5',
    title: 'Festival de Fès : la musique sacrée du monde illumine la médina',
    description:
      'La 29e édition du Festival de Fès des Musiques Sacrées du Monde accueille des artistes de 40 pays.',
    content: 'Sous les étoiles de la cité spirituelle, le festival attire...',
    url: 'https://telquel.ma/culture',
    urlToImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Rédaction Culture',
    category: 'culture',
  },
  {
    id: 'mock-6',
    title: 'Le cinéma marocain brille à Cannes avec trois films sélectionnés',
    description:
      'Trois productions marocaines figurent dans la sélection officielle du Festival de Cannes 2025.',
    content: 'La délégation marocaine au Festival de Cannes est plus forte que jamais...',
    url: 'https://www.hespress.com/culture',
    urlToImage:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Équipe Culture',
    category: 'culture',
  },
  // Tourisme
  {
    id: 'mock-7',
    title: 'Marrakech élue meilleure destination touristique en Afrique',
    description:
      'La ville ocre remporte le prix de la meilleure destination touristique africaine aux World Travel Awards 2025.',
    content: "Pour la troisième année consécutive, Marrakech s'impose comme...",
    url: 'https://www.visitmorocco.com/fr/voyage/marrakech',
    urlToImage:
      'https://images.unsplash.com/photo-1597212618440-806262de4f4b?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Tourisme Maroc' },
    author: 'Rédaction Tourisme',
    category: 'tourisme',
  },
  {
    id: 'mock-8',
    title: "Le désert du Sahara : nouvel eldorado du tourisme d'aventure",
    description:
      'Les arrivées touristiques dans la région de Drâa-Tafilalet ont augmenté de 35% en 2025.',
    content: "Le sud marocain attire de plus en plus d'aventuriers en quête d'authenticité...",
    url: 'https://www.visitmorocco.com/fr/voyage/merzouga',
    urlToImage:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Maroc Hebdo' },
    author: 'Reporter',
    category: 'tourisme',
  },
  // Économie
  {
    id: 'mock-9',
    title: 'PIB du Maroc : croissance de 3,8% au premier trimestre 2026',
    description:
      "Le Haut-Commissariat au Plan annonce une croissance économique de 3,8% pour le début de l'année.",
    content: "L'économie marocaine confirme sa résilience avec des chiffres solides...",
    url: 'https://www.leconomiste.com/economie',
    urlToImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: "L'Économiste" },
    author: 'Analyste',
    category: 'economie',
  },
  {
    id: 'mock-10',
    title: 'Bourse de Casablanca : le MASI franchit les 14 000 points',
    description:
      "L'indice phare de la Bourse de Casablanca atteint un nouveau record historique porté par les valeurs bancaires.",
    content: 'Dans un contexte favorable, la Bourse de Casablanca continue sa progression...',
    url: 'https://www.medias24.com/bourse',
    urlToImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Économie',
    category: 'economie',
  },
  // Sport
  {
    id: 'mock-11',
    title: "CAN 2025 : les Lions de l'Atlas se qualifient pour les quarts de finale",
    description:
      "L'équipe nationale du Maroc s'impose 2-0 face à la Tunisie et se qualifie pour les quarts de la CAN.",
    content: "Dans un match tendu et dominé du début à la fin par les Lions de l'Atlas...",
    url: 'https://www.sport.ma/football/equipe-nationale',
    urlToImage:
      'https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Sport.ma' },
    author: 'Équipe Sport',
    category: 'sport',
  },
  {
    id: 'mock-12',
    title: 'Coupe du Monde 2030 : les stades marocains en pleine construction',
    description:
      'Les travaux de construction et de rénovation des stades marocains avancent à grande vitesse.',
    content: 'A quatre ans de la Coupe du Monde, le Maroc intensifie ses chantiers sportifs...',
    url: 'https://www.hespress.com/sport',
    urlToImage:
      'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress Sport' },
    author: 'Reporter Sport',
    category: 'sport',
  },
  // Technologie
  {
    id: 'mock-13',
    title: 'Casablanca Tech City : 200 startups marocaines lancées en 2025',
    description:
      "L'écosystème startup marocain explose avec 200 nouvelles entreprises technologiques créées en un an.",
    content: "Le dynamisme de l'écosystème numérique marocain ne se dément pas...",
    url: 'https://le360.ma/techno',
    urlToImage:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TechMa' },
    author: 'Desk Tech',
    category: 'technologie',
  },
  {
    id: 'mock-14',
    title: 'IA au Maroc : le gouvernement lance une stratégie nationale pour 2030',
    description:
      'Le ministère de la Transition Numérique dévoile la feuille de route nationale pour l\'intelligence artificielle.',
    content: "Le Maroc s'engage résolument dans la révolution de l'intelligence artificielle...",
    url: 'https://www.medias24.com/tech',
    urlToImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24 Tech' },
    author: 'Rédaction Tech',
    category: 'technologie',
  },
  // Société
  {
    id: 'mock-15',
    title: "Réforme de l'éducation : hausse de 20% du budget alloué aux écoles publiques",
    description:
      "Le gouvernement annonce une hausse significative des dépenses éducatives pour améliorer la qualité de l'enseignement.",
    content: "Dans le cadre de la réforme du système éducatif, le gouvernement...",
    url: 'https://le360.ma/societe',
    urlToImage:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Desk Social',
    category: 'societe',
  },
  {
    id: 'mock-16',
    title: 'Santé : le Maroc étend la couverture médicale à 95% de la population',
    description:
      "La généralisation de l'AMO progresse : 95% des Marocains bénéficient désormais d'une couverture médicale.",
    content: 'Le chantier royal de la protection sociale porte ses fruits...',
    url: 'https://www.map.ma/fr/sections/societe',
    urlToImage:
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'Rédaction Santé',
    category: 'societe',
  },
];

// ── NewsAPI integration ───────────────────────────────────────────────────

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

function mapNewsAPIArticle(article: NewsAPIArticle, category: CategorySlug, index: number): Article {
  return {
    id: `api-${category}-${index}-${Date.now()}`,
    title: article.title,
    description: article.description ?? 'Pas de description disponible.',
    content: article.content ?? '',
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source,
    author: article.author,
    category,
  };
}

// ── Fonctions publiques ───────────────────────────────────────────────────

export async function fetchArticlesByCategory(category: Category): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    // Mode démo : articles mock, validation des liens, max 10
    const mock = MOCK_ARTICLES.filter((a) => a.category === category.slug);
    return filterValidArticles(mock);
  }

  try {
    const params = new URLSearchParams({
      q: category.newsApiQuery,
      language: 'fr',
      sortBy: 'publishedAt',
      pageSize: String(FETCH_EXTRA), // on récupère plus pour compenser les liens morts
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 }, // 30 min
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) {
      const mock = MOCK_ARTICLES.filter((a) => a.category === category.slug);
      return filterValidArticles(mock);
    }

    const articles = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, category.slug, i));

    // Validation des liens + cap à 10
    const valid = await filterValidArticles(articles);

    // Fallback sur le mock si trop peu d'articles valides
    if (valid.length < 2) {
      const mock = MOCK_ARTICLES.filter((a) => a.category === category.slug);
      return filterValidArticles(mock);
    }

    return valid;
  } catch {
    const mock = MOCK_ARTICLES.filter((a) => a.category === category.slug);
    return filterValidArticles(mock);
  }
}

export async function fetchLatestArticles(pageSize: number = 7): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return filterValidArticles(MOCK_ARTICLES.slice(0, Math.min(pageSize + 5, MOCK_ARTICLES.length)));
  }

  try {
    const params = new URLSearchParams({
      q: 'Maroc',
      language: 'fr',
      sortBy: 'publishedAt',
      pageSize: String(FETCH_EXTRA),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 }, // 30 min
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) {
      return filterValidArticles(MOCK_ARTICLES.slice(0, pageSize + 5));
    }

    const articles = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));

    const valid = await filterValidArticles(articles);
    return valid.slice(0, pageSize);
  } catch {
    return filterValidArticles(MOCK_ARTICLES.slice(0, pageSize + 5));
  }
}

export async function searchArticles(query: string, pageSize: number = 12): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  const fullQuery = `Maroc ${query}`;

  if (!apiKey) {
    const results = MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
    );
    return filterValidArticles(results);
  }

  try {
    const params = new URLSearchParams({
      q: fullQuery,
      language: 'fr',
      sortBy: 'relevancy',
      pageSize: String(pageSize + 5),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);
    const data: NewsAPIResponse = await res.json();
    if (data.status !== 'ok') return [];

    const articles = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));

    return filterValidArticles(articles);
  } catch {
    return [];
  }
}

// ── Utilitaires date ──────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-MA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  return `Il y a ${diffD} jour${diffD > 1 ? 's' : ''}`;
}
