import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'short' | 'long';
type ButtonState = 'default' | 'selected';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'className'> & {
  /** primary = 초록, secondary = 회색 */
  variant?: ButtonVariant;
  /** short = 62×23, long = 부모 폭 × 43 */
  size?: ButtonSize;
  /** default = 선택 안 됨, selected = 선택됨 (Figma의 Disabled / Abled) */
  state?: ButtonState;
  /** 여백·위치 같은 배치용 클래스만 넘긴다. 색·크기·테두리는 바꾸지 않는다. */
  className?: string;
};

const BASE =
  'inline-flex shrink-0 items-center justify-center px-[10px] rounded-btn border text-body2-ko text-black whitespace-nowrap';

const SIZE: Record<ButtonSize, string> = {
  short: 'h-[23px] w-[62px]',
  long: 'h-[43px] w-full',
};

/* Figma 레이어 순서: 배경 채움 → 흰색 덮개 → 안쪽 그림자 → 글자 (CSS 배경색 → 배경 그림 → inset 그림자 → 글자와 같음) */
const OVERLAY: Record<ButtonState, string> = {
  default: 'bg-linear-to-b from-white/90 to-white/90',
  selected: 'bg-linear-to-b from-white/70 to-white/70',
};

const VARIANT: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default: 'border-green inset-shadow-btn-primary',
    selected: 'border-green bg-green inset-shadow-btn-primary-selected',
  },
  secondary: {
    default: 'border-gray inset-shadow-btn-secondary',
    selected: 'border-gray bg-gray inset-shadow-btn-secondary',
  },
};

/* 임시: Figma에 "누를 수 없음" 디자인이 없어서 미리보기로 확인 후 결정 */
const DISABLED = 'disabled:cursor-not-allowed disabled:opacity-40';

export default function Button({
  variant = 'primary',
  size = 'long',
  state = 'default',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [BASE, SIZE[size], OVERLAY[state], VARIANT[variant][state], DISABLED, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      aria-pressed={state === 'selected' ? true : undefined}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
