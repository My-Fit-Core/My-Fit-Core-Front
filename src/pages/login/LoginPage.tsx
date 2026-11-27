import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import loginArtwork from '@/assets/images/login-artwork.svg?url';
import KakaoLoginButton from '@/components/login/KakaoLoginButton';
import { getMockKakaoLoginResult, MOCK_KAKAO_LOGIN_DELAY_MS } from '@/mocks/kakaoLogin';

type LoginState = 'idle' | 'loading' | 'failure' | 'cancel' | 'success';

export default function LoginPage() {
  const { search } = useLocation();
  const [state, setState] = useState<LoginState>('idle');
  const requestTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (requestTimer.current !== null) window.clearTimeout(requestTimer.current);
    };
  }, []);

  function handleLogin() {
    if (requestTimer.current !== null) return;
    const result = getMockKakaoLoginResult(search);
    setState('loading');
    requestTimer.current = window.setTimeout(() => {
      requestTimer.current = null;
      setState(result);
    }, MOCK_KAKAO_LOGIN_DELAY_MS);
  }

  return (
    <main className="entry-safe-area login-page min-h-dvh bg-white">
      <div className="mx-auto flex min-h-full w-full max-w-[327px] grow flex-col">
        <header className="flex flex-col gap-3.5">
          <h1 className="text-heading1-ko leading-[42px] text-[#181818]">
            오늘의 추구미,
            <br />내 옷장 안에서.
          </h1>
          <p className="text-body1-ko leading-[19px] text-[#616161]">
            가진 옷을 AI로 정리하고,
            <br />
            원하는 무드로 오늘을 입어보세요.
          </p>
        </header>
        <img
          className="login-artwork h-auto max-w-none"
          src={loginArtwork}
          alt=""
          width={328}
          height={246}
        />
        <div className="mt-auto pt-2">
          {state === 'failure' && (
            <p role="alert" className="mb-2 text-body1-ko leading-[19px] text-[#616161]">
              로그인하지 못했어요
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
          )}
          <KakaoLoginButton onClick={handleLogin} isLoading={state === 'loading'} />
          <p role="status" className="sr-only">
            {state === 'loading' && '로그인 중입니다.'}
            {state === 'cancel' && '로그인이 취소되었습니다.'}
            {state === 'success' && '로그인 Mock 테스트가 완료되었습니다.'}
          </p>
        </div>
      </div>
    </main>
  );
}
