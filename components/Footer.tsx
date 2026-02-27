import Link from 'next/link';
import { CATEGORIES } from '@/types/news';

export default function Footer() {
  return (
    <footer className="bg-morocco-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🇲🇦</span>
              <div>
                <div className="text-xl font-bold">Maroc Actualités</div>
                <div className="text-xs text-gray-400">L&apos;information en temps réel</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Votre portail d&apos;actualités sur le Maroc. Restez informés des dernières nouvelles
              dans tous les secteurs : politique, économie, culture, sport et bien plus.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-semibold text-red-300 mb-3 uppercase text-sm tracking-wider">
              Sections
            </h3>
            <ul className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-red-300 mb-3 uppercase text-sm tracking-wider">
              À propos
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Agrégateur de news du Maroc</li>
              <li>Sources : presse nationale & internationale</li>
              <li>Mis à jour toutes les heures</li>
              <li className="pt-2 text-xs">
                Powered by{' '}
                <a
                  href="https://newsapi.org"
                  className="text-red-400 hover:text-red-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NewsAPI.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Maroc Actualités — Tous droits réservés</div>
          <div className="flex items-center gap-1">
            <span>🇲🇦</span>
            <span>Fait avec fierté pour le Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
