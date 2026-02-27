import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/types/news';
import { fetchArticlesByCategory, fetchLatestArticles, searchArticles } from '@/lib/newsApi';

export const revalidate = 900; // Cache 15 min

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const pageSize = parseInt(searchParams.get('pageSize') ?? '12', 10); // utilisé pour search et latest

  try {
    if (query) {
      const articles = await searchArticles(query, pageSize);
      return NextResponse.json({ articles });
    }

    if (category) {
      const cat = getCategoryBySlug(category);
      if (!cat) {
        return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 });
      }
      const articles = await fetchArticlesByCategory(cat);
      return NextResponse.json({ articles });
    }

    // Default: latest news
    const articles = await fetchLatestArticles(pageSize);
    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
