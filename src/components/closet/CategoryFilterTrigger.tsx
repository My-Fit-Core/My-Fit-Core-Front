import categoryFilterIcon from '@/assets/icons/closet-category-filter.svg';
import Icon from '@/components/common/Icon';
import {
  getClothingCategoryLabel,
  getClothingSubcategoryLabel,
} from '@/constants/clothingCategories';
import type { ClothingCategoryFilter } from '@/types/clothing';

export type CategoryFilterTriggerProps = {
  value: ClothingCategoryFilter;
  onOpen: () => void;
  disabled?: boolean;
  className?: string;
};

function getFilterLabel(value: ClothingCategoryFilter): string {
  if (value.kind === 'all') return '전체 카테고리';
  if (value.kind === 'category') return `${getClothingCategoryLabel(value.category)} 전체`;
  return `${getClothingCategoryLabel(value.classification.category)} > ${getClothingSubcategoryLabel(value.classification)}`;
}

export default function CategoryFilterTrigger({
  value,
  onOpen,
  disabled = false,
  className,
}: CategoryFilterTriggerProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onOpen}
      className={[
        'flex h-[48px] w-full min-w-0 items-center gap-[8px] rounded-[12px] border border-[#e3e3e8] bg-white px-[14px] text-left disabled:cursor-not-allowed disabled:opacity-40',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img src={categoryFilterIcon} alt="" className="size-[20px] shrink-0" />
      <span className="min-w-0 flex-1 truncate text-body2-ko text-[#28272e]">
        {getFilterLabel(value)}
      </span>
      <Icon name="prev" size={24} className="shrink-0 -rotate-90 text-[#28272e]" />
    </button>
  );
}
