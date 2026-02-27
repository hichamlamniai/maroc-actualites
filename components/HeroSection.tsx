import Link from 'next/link';
import { CATEGORIES } from '@/types/news';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-morocco-red to-morocco-dark text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🇲🇦 Toute l&apos;actualité du Maroc
          </h1>
          <p className="text-red-200 text-base md:text-lg">
            Restez informé en temps réel — politique, culture, sport, économie et plus encore
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white ${cat.color} hover:opacity-90 transition-opacity shadow-md`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
