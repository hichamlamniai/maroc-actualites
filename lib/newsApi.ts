import { Article, Category, CategorySlug } from '@/types/news';

// ── Mock articles (fallback if no API key) ─────────────────────────────────

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop';

const MOCK_ARTICLES: Article[] = [
  // Actualités
  {
    id: 'mock-1',
    title: 'Le Maroc renforce ses investissements dans les énergies renouvelables',
    description:
      'Le Royaume du Maroc annonce un plan ambitieux pour atteindre 52% d\'énergie renouvelable d\'ici 2030, avec de nouveaux partenariats internationaux.',
    content:
      'Le Maroc continue d\'affirmer son leadership africain en matière d\'énergies propres...',
    url: '#',
    urlToImage:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Rédaction',
    category: 'general',
  },
  {
    id: 'mock-2',
    title: 'Casablanca : nouveau record d\'affluence à l\'aéroport Mohammed V',
    description:
      'L\'aéroport de Casablanca enregistre plus de 10 millions de passagers en 2025, un record historique.',
    content: 'L\'ONDA annonce des chiffres record pour l\'aéroport Mohammed V...',
    url: '#',
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
    title: 'Conseil du gouvernement : adoption de nouveaux projets de loi',
    description:
      'Le Conseil du gouvernement a adopté plusieurs projets de loi relatifs à la réforme de l\'administration publique.',
    content: 'Lors de sa réunion hebdomadaire, le gouvernement a examiné...',
    url: '#',
    urlToImage:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'MAP',
    category: 'politique',
  },
  {
    id: 'mock-4',
    title: 'Diplomatie : le Maroc renforce ses liens avec l\'Union Européenne',
    description:
      'Un nouveau partenariat stratégique entre le Maroc et l\'UE a été signé lors du sommet de Bruxelles.',
    content: 'Le Maroc et l\'Union Européenne ont signé un accord-cadre historique...',
    url: '#',
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
    url: '#',
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
    url: '#',
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
    content: 'Pour la troisième année consécutive, Marrakech s\'impose comme...',
    url: '#',
    urlToImage:
      'https://images.unsplash.com/photo-1597212618440-806262de4f4b?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Tourisme Maroc' },
    author: 'Rédaction Tourisme',
    category: 'tourisme',
  },
  {
    id: 'mock-8',
    title: 'Le désert du Sahara : nouvel eldorado du tourisme d\'aventure',
    description:
      'Les arrivées touristiques dans la région de Drâa-Tafilalet ont augmenté de 35% en 2025.',
    content: 'Le sud marocain attire de plus en plus d\'aventuriers en quête d\'authenticité...',
    url: '#',
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
      'Le Haut-Commissariat au Plan annonce une croissance économique de 3,8% pour le début de l\'année.',
    content: 'L\'économie marocaine confirme sa résilience avec des chiffres solides...',
    url: '#',
    urlToImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'L\'Économiste' },
    author: 'Analyste',
    category: 'economie',
  },
  {
    id: 'mock-10',
    title: 'Bourse de Casablanca : le MASI franchit les 14 000 points',
    description:
      'L\'indice phare de la Bourse de Casablanca atteint un nouveau record historique porté par les valeurs bancaires.',
    content: 'Dans un contexte favorable, la Bourse de Casablanca continue sa progression...',
    url: '#',
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
    title: 'CAN 2025 : les Lions de l\'Atlas se qualifient pour les quarts de finale',
    description:
      'L\'équipe nationale du Maroc s\'impose 2-0 face à la Tunisie et se qualifie pour les quarts de la CAN.',
    content: 'Dans un match tendu et dominé du début à la fin par les Lions de l\'Atlas...',
    url: '#',
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
    url: '#',
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
      'L\'écosystème startup marocain explose avec 200 nouvelles entreprises technologiques créées en un an.',
    content: 'Le dynamisme de l\'écosystème numérique marocain ne se dément pas...',
    url: '#',
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
    content: 'Le Maroc s\'engage résolument dans la révolution de l\'intelligence artificielle...',
    url: '#',
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
    title: 'Réforme de l\'éducation : hausse de 20% du budget alloué aux écoles publiques',
    description:
      'Le gouvernement annonce une hausse significative des dépenses éducatives pour améliorer la qualité de l\'enseignement.',
    content: 'Dans le cadre de la réforme du système éducatif, le gouvernement...',
    url: '#',
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
      'La généralisation de l\'AMO progresse : 95% des Marocains bénéficient désormais d\'une couverture médicale.',
    content: 'Le chantier royal de la protection sociale porte ses fruits...',
    url: '#',
    urlToImage:
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'Rédaction Santé',
    category: 'societe',
  },
];

// ── NewsAPI integration ────────────────────────────────────────────────────

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
    id: `api-${category}-${index}`,
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

// ── Public API functions ───────────────────────────────────────────────────

export async function fetchArticlesByCategory(
  category: Category,
  pageSize: number = 12
): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    // Return filtered mock data
    return MOCK_ARTICLES.filter((a) => a.category === category.slug).slice(0, pageSize);
  }

  try {
    const params = new URLSearchParams({
      q: category.newsApiQuery,
      language: 'fr',
      sortBy: 'publishedAt',
      pageSize: String(pageSize),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) {
      return MOCK_ARTICLES.filter((a) => a.category === category.slug).slice(0, pageSize);
    }

    return data.articles
      .filter((a) => a.title && a.title !== '[Removed]')
      .map((a, i) => mapNewsAPIArticle(a, category.slug, i));
  } catch {
    return MOCK_ARTICLES.filter((a) => a.category === category.slug).slice(0, pageSize);
  }
}

export async function fetchLatestArticles(pageSize: number = 6): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return MOCK_ARTICLES.slice(0, pageSize);
  }

  try {
    const params = new URLSearchParams({
      q: 'Maroc',
      language: 'fr',
      sortBy: 'publishedAt',
      pageSize: String(pageSize),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) {
      return MOCK_ARTICLES.slice(0, pageSize);
    }

    return data.articles
      .filter((a) => a.title && a.title !== '[Removed]')
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));
  } catch {
    return MOCK_ARTICLES.slice(0, pageSize);
  }
}

export async function searchArticles(query: string, pageSize: number = 12): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  const fullQuery = `Maroc ${query}`;

  if (!apiKey) {
    return MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, pageSize);
  }

  try {
    const params = new URLSearchParams({
      q: fullQuery,
      language: 'fr',
      sortBy: 'relevancy',
      pageSize: String(pageSize),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);
    const data: NewsAPIResponse = await res.json();
    if (data.status !== 'ok') return [];

    return data.articles
      .filter((a) => a.title && a.title !== '[Removed]')
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));
  } catch {
    return [];
  }
}

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

  if (diffMin < 1) return 'À l\'instant';
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  return `Il y a ${diffD} jour${diffD > 1 ? 's' : ''}`;
}
