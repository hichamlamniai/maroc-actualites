'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export default function AutoRefresh() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000);
  const [justRefreshed, setJustRefreshed] = useState(false);
  const nextRefreshAt = useRef(Date.now() + REFRESH_INTERVAL);

  useEffect(() => {
    const ticker = setInterval(() => {
      const remaining = Math.ceil((nextRefreshAt.current - Date.now()) / 1000);

      if (remaining <= 0) {
        // Déclenche le rafraîchissement + validation des liens
        router.refresh();

        // Notification "Mise à jour" pendant 3s
        setJustRefreshed(true);
        setTimeout(() => setJustRefreshed(false), 3000);

        // Réinitialise le compteur
        nextRefreshAt.current = Date.now() + REFRESH_INTERVAL;
        setCountdown(REFRESH_INTERVAL / 1000);
      } else {
        setCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, [router]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  if (justRefreshed) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-green-300 animate-pulse">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="font-medium">Mise à jour ✓</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5 text-xs text-red-200"
      title="Actualisation automatique toutes les 30 min — liens invalides filtrés — 10 articles max par rubrique"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span>
        Actu dans{' '}
        <span className="font-medium text-white tabular-nums">
          {minutes}:{String(seconds).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}
