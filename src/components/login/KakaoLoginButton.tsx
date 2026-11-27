import kakaoButton from '@/assets/images/kakao_login_kr_medium.svg?url';
import kakaoSymbol from '@/assets/images/kakao-symbol.svg?url';

export type KakaoLoginButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export default function KakaoLoginButton({
  onClick,
  isLoading = false,
  disabled = false,
}: KakaoLoginButtonProps) {
  return (
    <button
      type="button"
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-kakao bg-kakao px-2.5 font-[system-ui] text-base font-medium text-[#191919] aria-disabled:cursor-wait disabled:cursor-not-allowed"
      disabled={disabled}
      aria-disabled={isLoading || undefined}
      aria-busy={isLoading}
      onClick={isLoading || disabled ? undefined : onClick}
    >
      {isLoading ? (
        <>
          <img src={kakaoSymbol} alt="" width={13} height={13} />
          로그인 중…
        </>
      ) : (
        <>
          <img src={kakaoButton} alt="" width={224} height={46} className="h-auto" />
          <span className="sr-only">카카오 로그인</span>
        </>
      )}
    </button>
  );
}
