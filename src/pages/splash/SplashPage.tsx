import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import myfitcoreWordmark from '@/assets/images/myfitcore-wordmark.svg?url';
import splashArtwork from '@/assets/images/splash-artwork.svg?url';

const SPLASH_DURATION_MS = 1500;

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(
      () => navigate('/login', { replace: true }),
      SPLASH_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main
      aria-label="마피코 스플래시"
      className="entry-safe-area box-border flex min-h-dvh items-center justify-center bg-white pb-[max(var(--entry-safe-bottom),clamp(24px,25dvh-159px,44px))]"
    >
      <div className="flex w-full max-w-[280px] flex-col items-center gap-[21px]">
        <img
          src={splashArtwork}
          alt=""
          width={214}
          height={225}
          className="h-auto w-[214px] max-w-full rounded-[54px]"
        />
        <img src={myfitcoreWordmark} alt="MyFitCore" width={156} height={52} />
      </div>
    </main>
  );
}
