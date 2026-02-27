'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes en ms

export default function AutoRefresh() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000);
  const nextRefreshAt = useRef(Date.now() + REFRESH_INTERVAL);

  useEffect(() => {
    // Compte à rebours affiché
    const ticker = setInterval(() => {
      const remaining = Math.ceil((nextRefreshAt.current - Date.now()) / 1000);
      if (remaining <= 0) {
        setCountdown(REFRESH_INTERVAL / 1000);
        nextRefreshAt.current = Date.now() + REFRESH_INTERVAL;
        router.refresh(); // Refetch les Server Components sans rechargement complet
      } else {
        setCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, [router]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400" title="Actualisation automatique toutes les 15 minutes">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span>
        Actualisation dans{' '}
        <span className="font-medium text-gray-600 tabular-nums">
          {minutes}:{String(seconds).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}
