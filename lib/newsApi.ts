import { Article, Category, CategorySlug } from '@/types/news';
import { validateArticles } from '@/lib/articleValidator';

const MAX_ARTICLES = 10; // plafond par rubrique
const MIN_ARTICLES = 6;  // minimum acceptable avant repli sur mock
const FETCH_EXTRA  = 30; // articles fetchés pour avoir assez après filtrage

// Retourne la date d'il y a 6 jours au format YYYY-MM-DD (filtre NewsAPI)
function getSixDaysAgo(): string {
  return new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

// ── Validation d'URL (format uniquement — rapide, pour les articles mock) ─

function isUrlValid(url: string): boolean {
  if (!url || url === '#' || url === '') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// Pour les articles mock : tri par date uniquement (fallback sans clé API)
function filterMockArticles(articles: Article[]): Article[] {
  return articles
    .filter((a) => isUrlValid(a.url))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ARTICLES);
}

// Pour les articles NewsAPI : validation complète par titre de page + tri par date
async function filterNewsApiArticles(articles: Article[]): Promise<Article[]> {
  const valid = await validateArticles(articles, MAX_ARTICLES);
  return valid.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// ── Articles mock enrichis (8 par rubrique) ───────────────────────────────

const MOCK_ARTICLES: Article[] = [
  // ── Actualités ──────────────────────────────────────────────────────────
  {
    id: 'mock-g1',
    title: 'Le Maroc renforce ses investissements dans les énergies renouvelables',
    description: "Le Royaume annonce un plan ambitieux pour atteindre 52% d'énergie renouvelable d'ici 2030.",
    content: '',
    url: 'https://le360.ma/economie',
    urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Rédaction',
    category: 'general',
  },
  {
    id: 'mock-g2',
    title: "Casablanca : nouveau record d'affluence à l'aéroport Mohammed V",
    description: "L'aéroport enregistre plus de 10 millions de passagers, un record historique.",
    content: '',
    url: 'https://www.medias24.com/transport',
    urlToImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Correspondant',
    category: 'general',
  },
  {
    id: 'mock-g3',
    title: 'Rabat accueille le sommet Afrique-France sur la coopération économique',
    description: 'Chefs d\'État et ministres se réunissent à Rabat pour renforcer les partenariats économiques.',
    content: '',
    url: 'https://www.hespress.com/monde',
    urlToImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Rédaction',
    category: 'general',
  },
  {
    id: 'mock-g4',
    title: 'Maroc : lancement du nouveau réseau ferroviaire à grande vitesse Casablanca-Agadir',
    description: 'Les travaux du TGV Casablanca-Agadir débutent, une ligne de 400 km pour 2030.',
    content: '',
    url: 'https://telquel.ma/economie',
    urlToImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Économie',
    category: 'general',
  },
  {
    id: 'mock-g5',
    title: 'Sécheresse : le Maroc mobilise 10 milliards pour la gestion de l\'eau',
    description: 'Face au stress hydrique, le gouvernement annonce un plan national de gestion des ressources en eau.',
    content: '',
    url: 'https://ledesk.ma/actu',
    urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Rédaction',
    category: 'general',
  },
  {
    id: 'mock-g6',
    title: 'Fès : ouverture du nouveau musée des civilisations méditerranéennes',
    description: 'Un musée de classe mondiale ouvre ses portes dans la médina de Fès.',
    content: '',
    url: 'https://www.map.ma/fr',
    urlToImage: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'MAP',
    category: 'general',
  },
  {
    id: 'mock-g7',
    title: 'Le Maroc rejoint le G20 comme membre observateur permanent',
    description: 'Une reconnaissance internationale de l\'influence croissante du Maroc sur la scène mondiale.',
    content: '',
    url: 'https://le360.ma/monde',
    urlToImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Bureau International',
    category: 'general',
  },
  {
    id: 'mock-g8',
    title: 'Dépenses sociales : le Maroc consacre 60% du budget aux secteurs sociaux',
    description: 'Santé, éducation et protection sociale dominent les priorités budgétaires 2026.',
    content: '',
    url: 'https://www.medias24.com/economie',
    urlToImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Social',
    category: 'general',
  },

  // ── Politique ───────────────────────────────────────────────────────────
  {
    id: 'mock-p1',
    title: 'Conseil du gouvernement : adoption de nouveaux projets de loi',
    description: 'Plusieurs projets de loi relatifs à la réforme de l\'administration publique adoptés.',
    content: '',
    url: 'https://www.map.ma/fr/sections/politique',
    urlToImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'MAP',
    category: 'politique',
  },
  {
    id: 'mock-p2',
    title: 'Diplomatie : le Maroc renforce ses liens avec l\'Union Européenne',
    description: 'Un nouveau partenariat stratégique Maroc-UE signé lors du sommet de Bruxelles.',
    content: '',
    url: 'https://ledesk.ma/politique',
    urlToImage: 'https://images.unsplash.com/photo-1485811055483-1c09e64d4576?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Bureau de Bruxelles',
    category: 'politique',
  },
  {
    id: 'mock-p3',
    title: 'Réforme de la justice : le Parlement adopte le nouveau code de procédure pénale',
    description: 'Une réforme historique modernisant la justice marocaine et renforçant les droits des citoyens.',
    content: '',
    url: 'https://telquel.ma/politique',
    urlToImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Politique',
    category: 'politique',
  },
  {
    id: 'mock-p4',
    title: 'Sahara marocain : nouvelles reconnaissances internationales en 2025',
    description: 'Vingt nouveaux pays reconnaissent la souveraineté du Maroc sur le Sahara occidental.',
    content: '',
    url: 'https://www.hespress.com/politique',
    urlToImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk Diplomatie',
    category: 'politique',
  },
  {
    id: 'mock-p5',
    title: 'Décentralisation : les régions marocaines gagnent de nouvelles compétences',
    description: 'La loi sur la régionalisation avancée transfère d\'importantes compétences aux collectivités.',
    content: '',
    url: 'https://le360.ma/politique',
    urlToImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Rédaction Politique',
    category: 'politique',
  },
  {
    id: 'mock-p6',
    title: 'Le Maroc préside le Conseil de Sécurité de l\'ONU pour 2025',
    description: 'Une présidence symbolique qui renforce le rôle diplomatique du Royaume sur la scène internationale.',
    content: '',
    url: 'https://www.map.ma/fr/sections/politique',
    urlToImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'Bureau New York',
    category: 'politique',
  },
  {
    id: 'mock-p7',
    title: 'Budget 2026 : déficit maîtrisé à 3,5% du PIB selon le HCP',
    description: 'Le Haut-Commissariat au Plan confirme la trajectoire de consolidation fiscale du Maroc.',
    content: '',
    url: 'https://www.medias24.com/politique',
    urlToImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Économie',
    category: 'politique',
  },
  {
    id: 'mock-p8',
    title: 'Elections communales 2026 : la préparation est lancée',
    description: 'Le ministère de l\'Intérieur annonce le calendrier des prochaines élections locales.',
    content: '',
    url: 'https://ledesk.ma/politique',
    urlToImage: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Rédaction',
    category: 'politique',
  },

  // ── Culture ─────────────────────────────────────────────────────────────
  {
    id: 'mock-c1',
    title: 'Festival de Fès : la musique sacrée du monde illumine la médina',
    description: 'La 29e édition accueille des artistes de 40 pays dans la cité spirituelle.',
    content: '',
    url: 'https://telquel.ma/culture',
    urlToImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Rédaction Culture',
    category: 'culture',
  },
  {
    id: 'mock-c2',
    title: 'Le cinéma marocain brille à Cannes avec trois films sélectionnés',
    description: 'Trois productions marocaines dans la sélection officielle du Festival de Cannes 2025.',
    content: '',
    url: 'https://www.hespress.com/culture',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Équipe Culture',
    category: 'culture',
  },
  {
    id: 'mock-c3',
    title: 'Nass El Ghiwane : le groupe légendaire fête ses 55 ans sur scène',
    description: 'Une tournée mondiale célèbre l\'héritage musical de ce groupe emblématique de la chanson marocaine.',
    content: '',
    url: 'https://le360.ma/culture',
    urlToImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Desk Culture',
    category: 'culture',
  },
  {
    id: 'mock-c4',
    title: 'Patrimoine : la ksar d\'Aït-Ben-Haddou restauré par l\'UNESCO',
    description: 'Des travaux de restauration majeurs préservent ce joyau du patrimoine mondial au Maroc.',
    content: '',
    url: 'https://www.map.ma/fr/sections/culture',
    urlToImage: 'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'MAP Culture',
    category: 'culture',
  },
  {
    id: 'mock-c5',
    title: 'Littérature marocaine : Leila Slimani remporte le Grand Prix de l\'Académie française',
    description: 'L\'auteure franco-marocaine couronnée pour son dernier roman salué par la critique internationale.',
    content: '',
    url: 'https://telquel.ma/culture',
    urlToImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Rédaction Littérature',
    category: 'culture',
  },
  {
    id: 'mock-c6',
    title: 'Gnaoua World Music Festival : Essaouira prête pour son édition record',
    description: '500 000 visiteurs attendus pour l\'édition 2025 du festival le plus emblématique du Maroc.',
    content: '',
    url: 'https://www.medias24.com/culture',
    urlToImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Culture',
    category: 'culture',
  },
  {
    id: 'mock-c7',
    title: 'Marrakech accueille la Biennale d\'art contemporain africain',
    description: 'Artistes du continent et de la diaspora exposent leurs œuvres dans les riads de la médina.',
    content: '',
    url: 'https://ledesk.ma/culture',
    urlToImage: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Correspondante culturelle',
    category: 'culture',
  },
  {
    id: 'mock-c8',
    title: 'Le zellige marocain inscrit au patrimoine immatériel de l\'UNESCO',
    description: 'L\'art ancestral de la mosaïque de céramique reçoit une reconnaissance mondiale méritée.',
    content: '',
    url: 'https://www.hespress.com/culture',
    urlToImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Rédaction',
    category: 'culture',
  },

  // ── Tourisme ────────────────────────────────────────────────────────────
  {
    id: 'mock-t1',
    title: 'Marrakech élue meilleure destination touristique en Afrique',
    description: 'La ville ocre remporte le prix aux World Travel Awards 2025 pour la 3e année consécutive.',
    content: '',
    url: 'https://www.visitmorocco.com/fr/voyage/marrakech',
    urlToImage: 'https://images.unsplash.com/photo-1597212618440-806262de4f4b?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Tourisme Maroc' },
    author: 'Rédaction Tourisme',
    category: 'tourisme',
  },
  {
    id: 'mock-t2',
    title: 'Le désert du Sahara : nouvel eldorado du tourisme d\'aventure',
    description: 'Les arrivées dans la région de Drâa-Tafilalet ont augmenté de 35% en 2025.',
    content: '',
    url: 'https://www.visitmorocco.com/fr/voyage/merzouga',
    urlToImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Maroc Hebdo' },
    author: 'Reporter',
    category: 'tourisme',
  },
  {
    id: 'mock-t3',
    title: '14,5 millions de touristes accueillis au Maroc en 2025, un record absolu',
    description: 'Le secteur touristique confirme son dynamisme avec une hausse de 22% par rapport à 2024.',
    content: '',
    url: 'https://www.medias24.com/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Tourisme',
    category: 'tourisme',
  },
  {
    id: 'mock-t4',
    title: 'Essaouira : la cité des alizés lance sa nouvelle offre de tourisme durable',
    description: 'Hébergements éco-responsables et circuits verts font d\'Essaouira un modèle de tourisme vert.',
    content: '',
    url: 'https://le360.ma/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Journaliste Tourisme',
    category: 'tourisme',
  },
  {
    id: 'mock-t5',
    title: 'Royal Air Maroc ouvre 12 nouvelles lignes internationales en 2025',
    description: 'La compagnie nationale renforce sa connectivité avec l\'Afrique subsaharienne et l\'Asie.',
    content: '',
    url: 'https://www.hespress.com/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk Transport',
    category: 'tourisme',
  },
  {
    id: 'mock-t6',
    title: 'Agadir : ouverture d\'un complexe hôtelier 5 étoiles sur la Corniche',
    description: 'Un investissement de 800 millions de dirhams pour renforcer l\'offre hôtelière du Souss.',
    content: '',
    url: 'https://www.medias24.com/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Correspondant Agadir',
    category: 'tourisme',
  },
  {
    id: 'mock-t7',
    title: 'Tourisme de santé : Ifrane et Azrou attirent une clientèle européenne en quête de bien-être',
    description: 'Les stations climatiques du Moyen Atlas se positionnent sur le créneau du tourisme wellness.',
    content: '',
    url: 'https://telquel.ma/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Rédaction',
    category: 'tourisme',
  },
  {
    id: 'mock-t8',
    title: 'Tanger : la perle du détroit réinvente son image touristique',
    description: 'Musées, galeries et restaurants gastronomiques transforment Tanger en destination culturelle.',
    content: '',
    url: 'https://ledesk.ma/tourisme',
    urlToImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Reporter',
    category: 'tourisme',
  },

  // ── Économie ────────────────────────────────────────────────────────────
  {
    id: 'mock-e1',
    title: 'PIB du Maroc : croissance de 3,8% au premier trimestre 2026',
    description: 'Le HCP confirme une trajectoire de croissance solide malgré un contexte mondial incertain.',
    content: '',
    url: 'https://www.leconomiste.com/economie',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: "L'Économiste" },
    author: 'Analyste',
    category: 'economie',
  },
  {
    id: 'mock-e2',
    title: 'Bourse de Casablanca : le MASI franchit les 14 000 points',
    description: 'Un record historique porté par les valeurs bancaires et les mines.',
    content: '',
    url: 'https://www.medias24.com/bourse',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Bourse',
    category: 'economie',
  },
  {
    id: 'mock-e3',
    title: 'Investissements directs étrangers : le Maroc attire 6 milliards de dollars en 2025',
    description: 'Le Royaume confirme sa place de 1er récepteur d\'IDE en Afrique du Nord.',
    content: '',
    url: 'https://www.leconomiste.com/investissement',
    urlToImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: "L'Économiste" },
    author: 'Desk IDE',
    category: 'economie',
  },
  {
    id: 'mock-e4',
    title: 'Inflation maîtrisée : Bank Al-Maghrib maintient son taux directeur à 2,75%',
    description: 'La banque centrale confirme la stabilité des prix et la solidité du dirham.',
    content: '',
    url: 'https://telquel.ma/economie',
    urlToImage: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Finances',
    category: 'economie',
  },
  {
    id: 'mock-e5',
    title: 'Tanger Med : premier port africain, trafic record de 10 millions de conteneurs',
    description: 'Le port de Tanger confirme sa position de hub logistique mondial en Afrique.',
    content: '',
    url: 'https://ledesk.ma/economie',
    urlToImage: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Desk Logistique',
    category: 'economie',
  },
  {
    id: 'mock-e6',
    title: 'Agriculture : le Maroc double ses exportations de produits bio vers l\'Europe',
    description: 'Tomates, agrumes et huile d\'olive bio marocains séduisent de plus en plus les marchés européens.',
    content: '',
    url: 'https://www.hespress.com/economie',
    urlToImage: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk Agri',
    category: 'economie',
  },
  {
    id: 'mock-e7',
    title: 'Mines : l\'OCP Group annonce un chiffre d\'affaires record de 12 milliards de dollars',
    description: 'Le géant des phosphates confirme sa domination mondiale et ses ambitions africaines.',
    content: '',
    url: 'https://www.medias24.com/economie',
    urlToImage: 'https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Entreprises',
    category: 'economie',
  },
  {
    id: 'mock-e8',
    title: 'Chômage en baisse : le taux descend à 9,5% au Maroc selon le HCP',
    description: 'La création d\'emplois s\'accélère dans l\'industrie, le BTP et les services.',
    content: '',
    url: 'https://www.leconomiste.com/emploi',
    urlToImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: "L'Économiste" },
    author: 'Analyste Emploi',
    category: 'economie',
  },

  // ── Sport ───────────────────────────────────────────────────────────────
  {
    id: 'mock-s1',
    title: "CAN 2025 : les Lions de l'Atlas en quarts de finale",
    description: "L'équipe nationale s'impose 2-0 face à la Tunisie et avance en quarts.",
    content: '',
    url: 'https://www.sport.ma/football/equipe-nationale',
    urlToImage: 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Sport.ma' },
    author: 'Équipe Sport',
    category: 'sport',
  },
  {
    id: 'mock-s2',
    title: 'Coupe du Monde 2030 : les stades marocains en pleine construction',
    description: 'Les chantiers avancent à grande vitesse pour être prêts avant l\'échéance mondiale.',
    content: '',
    url: 'https://www.hespress.com/sport',
    urlToImage: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress Sport' },
    author: 'Reporter Sport',
    category: 'sport',
  },
  {
    id: 'mock-s3',
    title: 'Achraf Hakimi élu meilleur joueur africain de l\'année 2025',
    description: 'Le défenseur du PSG et de l\'équipe nationale du Maroc reçoit le prestigieux trophée CAF.',
    content: '',
    url: 'https://www.sport.ma/football',
    urlToImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Sport.ma' },
    author: 'Rédaction Sport',
    category: 'sport',
  },
  {
    id: 'mock-s4',
    title: 'Wydad Casablanca remporte la Ligue des Champions de la CAF',
    description: 'Le WAC bat Al-Ahly en finale et s\'adjuge un 4e titre continental dans l\'histoire du club.',
    content: '',
    url: 'https://le360.ma/sport',
    urlToImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360 Sport' },
    author: 'Desk Football',
    category: 'sport',
  },
  {
    id: 'mock-s5',
    title: 'Athlétisme : Soufiane El Bakkali conserve son titre mondial au 3000m steeple',
    description: 'Le Marocain confirme sa domination mondiale sur l\'épreuve lors des championnats de Tokyo.',
    content: '',
    url: 'https://www.medias24.com/sport',
    urlToImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24 Sport' },
    author: 'Desk Athlétisme',
    category: 'sport',
  },
  {
    id: 'mock-s6',
    title: 'Coupe du Trône : le Raja Casablanca bat le FUS Rabat en finale',
    description: 'Un derby de prestige remporté aux tirs au but devant 60 000 spectateurs à Rabat.',
    content: '',
    url: 'https://telquel.ma/sport',
    urlToImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Football',
    category: 'sport',
  },
  {
    id: 'mock-s7',
    title: 'Surf : Ramzi Boukhiam qualifié pour les JO 2028 de Los Angeles',
    description: 'Le surfeur marocain confirme sa qualification olympique lors du World Surf League.',
    content: '',
    url: 'https://www.sport.ma/jeux-olympiques',
    urlToImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Sport.ma' },
    author: 'Desk Sports Nautiques',
    category: 'sport',
  },
  {
    id: 'mock-s8',
    title: 'Tennis : Ons Jabeur et l\'inspiration marocaine sur les courts mondiaux',
    description: 'La joueuse tunisienne d\'origine marocaine continue d\'inspirer la jeunesse du Maghreb.',
    content: '',
    url: 'https://www.hespress.com/sport',
    urlToImage: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk Tennis',
    category: 'sport',
  },

  // ── Technologie ─────────────────────────────────────────────────────────
  {
    id: 'mock-tech1',
    title: 'Casablanca Tech City : 200 startups marocaines lancées en 2025',
    description: "L'écosystème startup marocain explose avec 200 nouvelles entreprises tech en un an.",
    content: '',
    url: 'https://le360.ma/techno',
    urlToImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TechMa' },
    author: 'Desk Tech',
    category: 'technologie',
  },
  {
    id: 'mock-tech2',
    title: 'IA au Maroc : le gouvernement lance une stratégie nationale pour 2030',
    description: 'Le ministère du Numérique dévoile la feuille de route nationale pour l\'intelligence artificielle.',
    content: '',
    url: 'https://www.medias24.com/tech',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24 Tech' },
    author: 'Rédaction Tech',
    category: 'technologie',
  },
  {
    id: 'mock-tech3',
    title: '5G au Maroc : déploiement national prévu pour fin 2026',
    description: 'Maroc Telecom, Orange et Inwi annoncent leurs plans de déploiement de la 5G sur tout le territoire.',
    content: '',
    url: 'https://www.hespress.com/tech',
    urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress Tech' },
    author: 'Desk Télécoms',
    category: 'technologie',
  },
  {
    id: 'mock-tech4',
    title: 'e-Gov : 85% des services administratifs marocains disponibles en ligne',
    description: 'Le portail gov.ma recense désormais 1 200 services dématérialisés accessibles aux citoyens.',
    content: '',
    url: 'https://telquel.ma/tech',
    urlToImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Numérique',
    category: 'technologie',
  },
  {
    id: 'mock-tech5',
    title: 'Cybersécurité : le Maroc classé 1er en Afrique par l\'ITU',
    description: 'L\'Union Internationale des Télécommunications distingue le Maroc pour sa maturité cybersécurité.',
    content: '',
    url: 'https://ledesk.ma/tech',
    urlToImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk Tech' },
    author: 'Desk Cybersécurité',
    category: 'technologie',
  },
  {
    id: 'mock-tech6',
    title: 'Énergies vertes : des startups marocaines lèvent 50M$ sur les marchés internationaux',
    description: 'Trois jeunes pousses marocaines de la greentech attirent des fonds américains et européens.',
    content: '',
    url: 'https://www.medias24.com/startups',
    urlToImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Startups',
    category: 'technologie',
  },
  {
    id: 'mock-tech7',
    title: 'Formation tech : 50 000 ingénieurs formés par an d\'ici 2028',
    description: 'Le Maroc investit massivement dans les écoles d\'ingénieurs et les bootcamps numériques.',
    content: '',
    url: 'https://le360.ma/techno',
    urlToImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Desk Éducation-Tech',
    category: 'technologie',
  },
  {
    id: 'mock-tech8',
    title: 'Offshoring : le Maroc capte 15% des centres de données africains',
    description: 'Les datacenters de Casablanca et Rabat attirent les grandes entreprises mondiales.',
    content: '',
    url: 'https://www.hespress.com/tech',
    urlToImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk IT',
    category: 'technologie',
  },

  // ── Société ─────────────────────────────────────────────────────────────
  {
    id: 'mock-soc1',
    title: "Réforme de l'éducation : hausse de 20% du budget alloué aux écoles publiques",
    description: "Le gouvernement annonce une hausse significative des dépenses éducatives.",
    content: '',
    url: 'https://le360.ma/societe',
    urlToImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Desk Social',
    category: 'societe',
  },
  {
    id: 'mock-soc2',
    title: 'Santé : le Maroc étend la couverture médicale à 95% de la population',
    description: "L'AMO progresse : 95% des Marocains bénéficient d'une couverture médicale.",
    content: '',
    url: 'https://www.map.ma/fr/sections/societe',
    urlToImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'Rédaction Santé',
    category: 'societe',
  },
  {
    id: 'mock-soc3',
    title: 'Logement social : 100 000 unités livrées en 2025 dans les grandes villes',
    description: 'Le programme Al Omrane livre un nombre record de logements abordables à travers le Maroc.',
    content: '',
    url: 'https://www.medias24.com/societe',
    urlToImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Médias24' },
    author: 'Desk Immobilier',
    category: 'societe',
  },
  {
    id: 'mock-soc4',
    title: 'Droits des femmes : le Maroc révise son code de la famille (Moudawwana)',
    description: 'Une réforme historique renforce l\'égalité et les droits des femmes et des enfants.',
    content: '',
    url: 'https://telquel.ma/societe',
    urlToImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'TelQuel' },
    author: 'Desk Société',
    category: 'societe',
  },
  {
    id: 'mock-soc5',
    title: 'Migration : le Maroc renforce son soutien aux Marocains du monde',
    description: 'Un nouveau fonds d\'aide aux MRE facilite l\'investissement au pays et la retraite.',
    content: '',
    url: 'https://ledesk.ma/societe',
    urlToImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le Desk' },
    author: 'Desk MRE',
    category: 'societe',
  },
  {
    id: 'mock-soc6',
    title: 'Jeunesse : taux d\'analphabétisme au plus bas, 15% en milieu rural',
    description: 'Les programmes d\'alphabétisation portent leurs fruits, notamment chez les femmes rurales.',
    content: '',
    url: 'https://www.hespress.com/societe',
    urlToImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Hespress' },
    author: 'Desk Éducation',
    category: 'societe',
  },
  {
    id: 'mock-soc7',
    title: 'Handicap : la loi sur l\'inclusion professionnelle entre en vigueur',
    description: 'Les entreprises de plus de 20 salariés doivent employer au moins 2% de personnes en situation de handicap.',
    content: '',
    url: 'https://le360.ma/societe',
    urlToImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 27 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'Le360' },
    author: 'Rédaction',
    category: 'societe',
  },
  {
    id: 'mock-soc8',
    title: 'Ramadan 2026 : le Maroc entre tradition et modernité',
    description: 'Pratiques religieuses, solidarité sociale et économie du mois sacré au Maroc.',
    content: '',
    url: 'https://www.map.ma/fr/sections/societe',
    urlToImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 33 * 60 * 60 * 1000).toISOString(),
    source: { id: null, name: 'MAP' },
    author: 'Desk Société',
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
  const mockFallback = () =>
    filterMockArticles(MOCK_ARTICLES.filter((a) => a.category === category.slug));

  if (!apiKey) return mockFallback();

  try {
    const params = new URLSearchParams({
      q: category.newsApiQuery,
      language: 'fr',
      from: getSixDaysAgo(),   // uniquement les 6 derniers jours
      sortBy: 'publishedAt',
      pageSize: String(FETCH_EXTRA), // 30 articles pour avoir ≥6 après validation
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 }, // cache Next.js 30 min
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) return mockFallback();

    const candidates = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, category.slug, i));

    // Validation liens + tri par date → cible 6-10 articles
    const valid = await filterNewsApiArticles(candidates);

    // Si moins de MIN_ARTICLES (6) résultats valides → repli sur mock
    return valid.length >= MIN_ARTICLES ? valid : mockFallback();
  } catch {
    return mockFallback();
  }
}

export async function fetchLatestArticles(pageSize: number = 7): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    // Sans clé : 1-2 articles mock par rubrique triés par date
    const mixed = [...MOCK_ARTICLES]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, pageSize + 5);
    return filterMockArticles(mixed).slice(0, pageSize);
  }

  try {
    const params = new URLSearchParams({
      q: 'Maroc',
      language: 'fr',
      from: getSixDaysAgo(),   // uniquement les 6 derniers jours
      sortBy: 'publishedAt',
      pageSize: String(FETCH_EXTRA),
      apiKey,
    });

    const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);

    const data: NewsAPIResponse = await res.json();

    if (data.status !== 'ok' || !data.articles.length) {
      return filterMockArticles(
        [...MOCK_ARTICLES]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, pageSize + 5)
      ).slice(0, pageSize);
    }

    const candidates = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));

    const valid = await filterNewsApiArticles(candidates);
    return valid.slice(0, pageSize);
  } catch {
    return filterMockArticles(
      [...MOCK_ARTICLES]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, pageSize + 5)
    ).slice(0, pageSize);
  }
}

export async function searchArticles(query: string, pageSize: number = 12): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    const results = MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
    );
    return filterMockArticles(results);
  }

  try {
    const params = new URLSearchParams({
      q: `Maroc ${query}`,
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

    const candidates = data.articles
      .filter((a) => a.title && a.title !== '[Removed]' && a.url)
      .map((a, i) => mapNewsAPIArticle(a, 'general', i));

    return filterNewsApiArticles(candidates);
  } catch {
    return [];
  }
}

// ── Utilitaires date ──────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('fr-MA', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateStr));
}

export function timeAgo(dateStr: string): string {
  const diffMin = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diffMin < 1)  return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  return `Il y a ${diffD} jour${diffD > 1 ? 's' : ''}`;
}
