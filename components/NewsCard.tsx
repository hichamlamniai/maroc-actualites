import Image from 'next/image';
import Link from 'next/link';
import { Article, CATEGORIES } from '@/types/news';
import { timeAgo } from '@/lib/newsApi';

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop';

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const category = CATEGORIES.find((c) => c.slug === article.category);
  const imageUrl = article.urlToImage || FALLBACK_IMAGE;

  if (featured) {
    return (
      <a
        href={article.url}
        target={article.url === '#' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="group block relative rounded-xl overflow-hidden shadow-lg h-80 md:h-96"
      >
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {category && (
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-2 ${category.color}`}>
              {category.icon} {category.label}
            </span>
          )}
          <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-red-300 transition-colors line-clamp-3">
            {article.title}
          </h2>
          <div className="flex items-center gap-3 text-xs text-gray-300">
            <span className="font-medium">{article.source.name}</span>
            <span>•</span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target={article.url === '#' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {category && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold text-white ${category.color}`}>
            {category.icon} {category.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-morocco-red transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1 leading-relaxed">
          {article.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
          <span className="font-medium truncate max-w-[60%]">{article.source.name}</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}
