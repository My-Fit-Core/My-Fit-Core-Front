export type MockKakaoLoginResult = 'success' | 'failure' | 'cancel';

export const MOCK_KAKAO_LOGIN_DELAY_MS = 1000;

export function getMockKakaoLoginResult(search: string): MockKakaoLoginResult {
  if (import.meta.env.DEV) {
    const scenario = new URLSearchParams(search).get('mock');
    if (scenario === 'failure' || scenario === 'cancel') return scenario;
  }

  return 'success';
}
