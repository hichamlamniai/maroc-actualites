'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/types/news';
import AutoRefresh from './AutoRefresh';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-morocco-red text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-morocco-dark py-1 px-4 text-xs flex items-center justify-between text-red-100">
        <span>
          {new Date().toLocaleDateString('fr-MA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <AutoRefresh />
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-2xl">🇲🇦</span>
            <div>
              <div className="text-xl font-bold leading-none tracking-tight">Maroc</div>
              <div className="text-xs font-light text-red-200 tracking-widest uppercase">
                Actualités
              </div>
            </div>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:flex">
          <div className="flex w-full rounded-lg overflow-hidden border border-red-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une actualité..."
              className="flex-1 px-3 py-2 text-sm text-gray-800 bg-white outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-morocco-green hover:bg-green-700 text-white text-sm font-medium transition-colors"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-md hover:bg-red-700"
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Category nav */}
      <nav className="bg-morocco-dark border-t border-red-800">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-0 overflow-x-auto scrollbar-hide">
            <li>
              <Link
                href="/"
                className="block px-3 py-2.5 text-sm font-medium text-red-100 hover:text-white hover:bg-red-900 whitespace-nowrap transition-colors"
              >
                🏠 Accueil
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="block px-3 py-2.5 text-sm font-medium text-red-100 hover:text-white hover:bg-red-900 whitespace-nowrap transition-colors"
                >
                  {cat.icon} {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile search */}
      {menuOpen && (
        <div className="sm:hidden bg-red-800 px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="flex-1 px-3 py-2 text-sm text-gray-800 bg-white rounded-lg outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-morocco-green hover:bg-green-700 text-white text-sm rounded-lg"
            >
              Chercher
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
