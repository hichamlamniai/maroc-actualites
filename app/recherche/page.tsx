import { searchArticles } from '@/lib/newsApi';
import NewsGrid from '@/components/NewsGrid';
import CategoryNav from '@/components/CategoryNav';
import type { Metadata } from 'next';

export const revalidate = 1800;

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Recherche — Maroc Actualités` : 'Recherche — Maroc Actualités',
  };
}

export default async function RecherchePage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const articles = query ? await searchArticles(query, 12) : [];

  return (
    <div>
      <div className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🔍 Résultats de recherche
          </h1>
          {query && (
            <p className="mt-1 text-gray-300 text-sm">
              {articles.length} résultat{articles.length > 1 ? 's' : ''} pour &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryNav />

        {!query ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">Entrez un terme de recherche</p>
            <p className="text-sm mt-1">Utilisez la barre de recherche pour trouver des articles.</p>
          </div>
        ) : (
          <NewsGrid articles={articles} />
        )}
      </div>
    </div>
  );
}
