import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Maroc Actualités — Toutes les news du Maroc',
  description:
    'Le portail d\'actualités du Maroc : politique, économie, culture, tourisme, sport et technologie. Restez informé en temps réel.',
  keywords: 'Maroc, actualités, news, politique, économie, culture, tourisme, sport',
  openGraph: {
    title: 'Maroc Actualités',
    description: 'Toutes les actualités du Maroc par secteur',
    locale: 'fr_MA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased min-h-screen flex flex-col bg-background`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
