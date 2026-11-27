import { useState } from 'react';
import selectedCheck from '@/assets/icons/closet-selected-check.svg';
import { getClothingCategoryLabel } from '@/constants/clothingCategories';
import type { ClothingItem } from '@/types/clothing';

type BaseProps = { item: ClothingItem; className?: string };

export type ClosetItemCardProps = BaseProps &
  (
    | { mode: 'display'; onOpen?: never; onToggleSelect?: never; selected?: never }
    | { mode?: 'browse'; onOpen: (id: string) => void; onToggleSelect?: never; selected?: never }
    | { mode: 'select'; selected: boolean; onToggleSelect: (id: string) => void; onOpen?: never }
  );

/** 기본 조회에는 체크가 없고, 착용 선택 모드에서 선택된 카드에만 체크를 표시한다. */
export default function ClosetItemCard(props: ClosetItemCardProps) {
  const { item, className, mode = 'browse' } = props;
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const hasImage = Boolean(item.imageUrl && failedImageUrl !== item.imageUrl);
  const isSelected = mode === 'select' && props.selected;
  const classes = [
    'flex h-[221px] min-w-0 w-full flex-col overflow-hidden rounded-[14px] bg-white text-left',
    mode !== 'display' && 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className="relative h-[155px] w-full shrink-0 overflow-hidden rounded-[12px] border-2 border-green bg-[#f6f7f8]">
        {hasImage ? (
          <img
            src={item.imageUrl ?? undefined}
            alt={item.name}
            className="h-full w-full object-contain"
            onError={() => setFailedImageUrl(item.imageUrl ?? null)}
          />
        ) : (
          <span className="absolute top-[99px] right-[8px] left-[8px] text-center text-[10px] text-[#70737a]">
            이미지 슬롯
          </span>
        )}
        {isSelected && (
          <span className="absolute top-[4px] right-[4px] flex size-[30px] items-center justify-center rounded-full bg-green">
            <img src={selectedCheck} alt="" className="size-[20px]" />
          </span>
        )}
      </div>
      <div className="flex h-[66px] w-full min-w-0 flex-col gap-[4px] overflow-hidden bg-white px-[4px] pt-[9px]">
        <span className="block w-full truncate text-body2-ko text-[#28272e]" title={item.name}>
          {item.name}
        </span>
        <span className="block w-full truncate text-caption-ko text-[#70737a]">
          {getClothingCategoryLabel(item.classification.category)}
        </span>
      </div>
    </>
  );

  if (mode === 'display') return <div className={classes}>{content}</div>;
  return (
    <button
      type="button"
      className={classes}
      aria-label={
        mode === 'select'
          ? `${item.name} ${isSelected ? '선택 해제' : '선택'}`
          : `${item.name} 상세 보기`
      }
      aria-pressed={mode === 'select' ? isSelected : undefined}
      onClick={() => {
        if (props.mode === 'select') props.onToggleSelect(item.id);
        else if (props.mode !== 'display') props.onOpen(item.id);
      }}
    >
      {content}
    </button>
  );
}
