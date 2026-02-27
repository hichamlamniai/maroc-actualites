import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryBySlug } from '@/types/news';
import { fetchArticlesByCategory } from '@/lib/newsApi';
import NewsGrid from '@/components/NewsGrid';
import CategoryNav from '@/components/CategoryNav';
import type { Metadata } from 'next';

export const revalidate = 1800; // 30 minutes

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Catégorie introuvable' };
  return {
    title: `${cat.icon} ${cat.label} — Maroc Actualités`,
    description: `Toutes les actualités ${cat.label.toLowerCase()} du Maroc en temps réel.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const articles = await fetchArticlesByCategory(cat);

  return (
    <div>
      {/* Category hero */}
      <div className={`${cat.color} text-white py-8 px-4`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">{cat.icon}</span>
            {cat.label}
            <span className="text-sm font-normal opacity-75">— {cat.labelAr}</span>
          </h1>
          <p className="mt-1 text-white/80 text-sm">
            {articles.length} article{articles.length > 1 ? 's' : ''} disponible
            {articles.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryNav activeSlug={cat.slug} />
        <NewsGrid articles={articles} showFeatured={articles.length >= 4} />
      </div>
    </div>
  );
}
