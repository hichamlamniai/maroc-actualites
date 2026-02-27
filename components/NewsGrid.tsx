import { Article } from '@/types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: Article[];
  showFeatured?: boolean;
}

export default function NewsGrid({ articles, showFeatured = false }: NewsGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-lg font-medium">Aucun article trouvé</p>
        <p className="text-sm mt-1">Revenez plus tard ou explorez d&apos;autres catégories.</p>
      </div>
    );
  }

  if (showFeatured && articles.length >= 3) {
    const [featured, ...rest] = articles;
    return (
      <div className="space-y-6">
        {/* Featured article */}
        <NewsCard article={featured} featured />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
