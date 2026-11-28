import type { ComponentPropsWithoutRef } from 'react';

export type TextFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
  /** 여백·위치 같은 배치용 클래스만 넘긴다. 색·크기·테두리는 바꾸지 않는다. */
  className?: string;
};

/*
 * Figma 디지털 옷장 "의류 정보 수정" 입력창(878:18196) 디자인 + TypeBar(500:1817) 모서리 5px
 * - 테두리 gray 60% (옷장 입력창 #D6D4DB와 비슷한 밝기), 좌우 여백 14, placeholder gray 90%
 * - 글자는 16px(body1-ko): 16px보다 작으면 아이폰이 입력할 때 화면을 확대한다
 * - 포커스 표시는 테두리를 더 짙은 gray 100%로 (global.css의 공통 외곽선은 끈다)
 */
const CLASSES =
  'h-[48px] w-full rounded-box border border-gray/60 bg-white px-[14px] text-body1-ko text-black placeholder:text-gray/90 focus:border-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40';

/**
 * 화면 읽기용 이름이 꼭 필요하다: `aria-label`을 넘기거나, 화면의 `<label htmlFor>`와 `id`로 연결한다.
 * placeholder는 입력을 시작하면 사라지므로 이름 대신 쓰지 않는다.
 */
export default function TextField({ className, type = 'text', ...rest }: TextFieldProps) {
  const classes = [CLASSES, className].filter(Boolean).join(' ');

  return <input type={type} className={classes} {...rest} />;
}
