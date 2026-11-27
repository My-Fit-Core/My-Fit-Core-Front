import shirtImage from '@/assets/images/closet-preview-shirt.png';
import type { ClothingItem } from '@/types/clothing';

/** 개발 전용 미리보기 데이터. 실제 API 응답이나 사용자 의류가 아니다. */
export const PREVIEW_CLOTHING_ITEMS = {
  shirt: {
    id: 'preview-shirt',
    name: '스트라이프 셔츠',
    imageUrl: shirtImage,
    classification: { category: 'top', subcategory: 'shirt' },
  },
  longName: {
    id: 'preview-long-name',
    name: '스트라이프가 들어간 아주 긴 이름의 셔츠',
    imageUrl: shirtImage,
    classification: { category: 'top', subcategory: 'shirt' },
  },
  missingImage: {
    id: 'preview-missing-image',
    name: '이미지 없는 의류',
    imageUrl: null,
    classification: { category: 'bottom', subcategory: 'jeans' },
  },
  hat: {
    id: 'preview-hat',
    name: '베이지 볼캡',
    imageUrl: null,
    classification: { category: 'hat', subcategory: 'baseball_cap' },
  },
} satisfies Record<string, ClothingItem>;
