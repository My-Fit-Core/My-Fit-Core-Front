import type { ComponentPropsWithoutRef } from 'react';

type WeatherChipType = 'text' | 'pill';
type WeatherChipState = 'default' | 'selected';

export type WeatherChipProps = Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'className'> & {
  /** text = 글자만 (Figma Chip=Default/Active), pill = 둥근 칩 (Figma Chip=Chip/TagSelected) */
  type?: WeatherChipType;
  /** default = 선택 안 됨, selected = 선택됨 */
  state?: WeatherChipState;
  /** 여백·위치 같은 배치용 클래스만 넘긴다. 색·크기·테두리는 바꾸지 않는다. */
  className?: string;
};

const BASE =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap text-caption-ko disabled:cursor-not-allowed disabled:opacity-40';

/* 글자색(text-black / text-white)은 겹치지 않도록 각 상태에만 넣는다 */
const STYLE: Record<WeatherChipType, Record<WeatherChipState, string>> = {
  text: {
    default: 'p-[10px] text-black',
    selected: 'p-[10px] text-black text-shadow-chip',
  },
  pill: {
    default: 'px-[12px] py-[4px] rounded-full border border-gray/30 text-black',
    selected: 'px-[12px] py-[4px] rounded-full border border-gray/30 bg-black text-white',
  },
};

/** Figma 디자인 시스템 Option 4 (646:4153). 폭은 글자 길이에 맞춰진다. */
export default function WeatherChip({
  type = 'text',
  state = 'default',
  className,
  children,
  ...rest
}: WeatherChipProps) {
  const classes = [BASE, STYLE[type][state], className].filter(Boolean).join(' ');

  return (
    <button type="button" aria-pressed={state === 'selected'} className={classes} {...rest}>
      {children}
    </button>
  );
}
