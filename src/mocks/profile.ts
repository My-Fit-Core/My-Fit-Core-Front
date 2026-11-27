export type Profile = {
  nickname: string;
  avatarUrl: string | null;
  socialLinks: { label: string; url: string }[];
};

// UI 개발 전용 예시 데이터. 실제 사용자 API 계약과 무관하다.
export function getProfile(): Profile {
  return {
    nickname: '닉네임',
    avatarUrl: null,
    socialLinks: [
      { label: '인스타그램', url: 'https://instagram.com/mapiko' },
      { label: '블로그', url: 'https://blog.naver.com/mapiko' },
    ],
  };
}
