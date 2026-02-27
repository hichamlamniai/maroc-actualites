'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES, Category } from '@/types/news';

interface CategoryNavProps {
  activeSlug?: string;
}

export default function CategoryNav({ activeSlug }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
          pathname === '/'
            ? 'bg-morocco-red text-white border-morocco-red shadow'
            : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600'
        }`}
      >
        🏠 Accueil
      </Link>

      {CATEGORIES.map((cat: Category) => {
        const isActive = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              isActive
                ? `${cat.color} text-white border-transparent shadow`
                : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600'
            }`}
          >
            {cat.icon} {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
