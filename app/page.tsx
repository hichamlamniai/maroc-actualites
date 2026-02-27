import { CATEGORIES } from '@/types/news';
import { fetchArticlesByCategory, fetchLatestArticles } from '@/lib/newsApi';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import CategoryNav from '@/components/CategoryNav';
import Link from 'next/link';

export const revalidate = 900; // 15 minutes

export default async function HomePage() {
  const latestArticles = await fetchLatestArticles(7);

  // Fetch 3 articles per category for section previews
  const categorySections = await Promise.all(
    CATEGORIES.slice(0, 4).map(async (cat) => ({
      category: cat,
      articles: await fetchArticlesByCategory(cat, 3),
    }))
  );

  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category nav */}
        <CategoryNav />

        {/* Latest news */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-7 bg-morocco-red rounded-full inline-block" />
              Dernières actualités
            </h2>
          </div>
          <NewsGrid articles={latestArticles} showFeatured />
        </section>

        {/* Category sections */}
        <div className="space-y-12">
          {categorySections.map(({ category, articles }) => (
            <section key={category.slug}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className={`w-1 h-6 rounded-full inline-block ${category.color}`} />
                  <span>{category.icon}</span>
                  {category.label}
                </h2>
                <Link
                  href={`/${category.slug}`}
                  className="text-sm font-medium text-morocco-red hover:text-morocco-dark flex items-center gap-1 group"
                >
                  Voir tout
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </Link>
              </div>
              <NewsGrid articles={articles} />
            </section>
          ))}
        </div>

        {/* All categories CTA */}
        <section className="mt-12 bg-gradient-to-r from-morocco-red to-morocco-dark rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Explorez toutes les catégories</h2>
          <p className="text-red-200 mb-6 text-sm">
            Politique, Culture, Tourisme, Économie, Sport, Technologie, Société…
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.slice(4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors border border-white/20"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
