import type { ComponentPropsWithoutRef } from 'react';

type StyleTagType = 'text' | 'pill';
type StyleTagState = 'default' | 'selected';

export type StyleTagProps = Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'className'> & {
  /** text = 글자만 (Figma Tag=Default/Active), pill = 둥근 태그 (Figma Tag=Tag/TagSelected) */
  type?: StyleTagType;
  /** default = 선택 안 됨, selected = 선택됨 */
  state?: StyleTagState;
  /** 여백·위치 같은 배치용 클래스만 넘긴다. 색·크기·테두리는 바꾸지 않는다. */
  className?: string;
};

const BASE =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-40';

/* 글자색(text-black / text-white)은 겹치지 않도록 각 상태에만 넣는다 */
const STYLE: Record<StyleTagType, Record<StyleTagState, string>> = {
  text: {
    default: 'p-[10px] text-subheading1-ko text-black',
    selected: 'p-[10px] text-subheading1-ko text-black drop-shadow-tag text-shadow-tag',
  },
  pill: {
    default: 'h-[28px] px-[10px] rounded-full border border-gray/30 text-body1-ko text-black',
    selected:
      'h-[28px] px-[10px] rounded-full border border-gray/30 text-body1-ko bg-black text-white',
  },
};

/** Figma 디자인 시스템 Option 3 (504:12139). 폭은 글자 길이에 맞춰진다. */
export default function StyleTag({
  type = 'text',
  state = 'default',
  className,
  children,
  ...rest
}: StyleTagProps) {
  const classes = [BASE, STYLE[type][state], className].filter(Boolean).join(' ');

  return (
    <button type="button" aria-pressed={state === 'selected'} className={classes} {...rest}>
      {children}
    </button>
  );
}
