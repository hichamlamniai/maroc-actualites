export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  category: CategorySlug;
}

export type CategorySlug =
  | 'general'
  | 'politique'
  | 'culture'
  | 'tourisme'
  | 'economie'
  | 'sport'
  | 'technologie'
  | 'societe';

export interface Category {
  slug: CategorySlug;
  label: string;
  labelAr: string;
  icon: string;
  newsApiQuery: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'general',
    label: 'Actualités',
    labelAr: 'أخبار',
    icon: '📰',
    newsApiQuery: 'Maroc actualités',
    color: 'bg-red-600',
  },
  {
    slug: 'politique',
    label: 'Politique',
    labelAr: 'سياسة',
    icon: '🏛️',
    newsApiQuery: 'Maroc politique gouvernement',
    color: 'bg-blue-700',
  },
  {
    slug: 'culture',
    label: 'Culture',
    labelAr: 'ثقافة',
    icon: '🎭',
    newsApiQuery: 'Maroc culture art musique',
    color: 'bg-purple-600',
  },
  {
    slug: 'tourisme',
    label: 'Tourisme',
    labelAr: 'سياحة',
    icon: '✈️',
    newsApiQuery: 'Maroc tourisme voyage',
    color: 'bg-amber-500',
  },
  {
    slug: 'economie',
    label: 'Économie',
    labelAr: 'اقتصاد',
    icon: '💼',
    newsApiQuery: 'Maroc économie investissement',
    color: 'bg-green-700',
  },
  {
    slug: 'sport',
    label: 'Sport',
    labelAr: 'رياضة',
    icon: '⚽',
    newsApiQuery: 'Maroc sport football',
    color: 'bg-orange-500',
  },
  {
    slug: 'technologie',
    label: 'Technologie',
    labelAr: 'تكنولوجيا',
    icon: '💻',
    newsApiQuery: 'Maroc technologie numérique startup',
    color: 'bg-sky-600',
  },
  {
    slug: 'societe',
    label: 'Société',
    labelAr: 'مجتمع',
    icon: '🏘️',
    newsApiQuery: 'Maroc société social éducation',
    color: 'bg-teal-600',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
