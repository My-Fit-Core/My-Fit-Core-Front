import type { ClothingCategoryId, ClothingSubcategoryId } from '@/constants/clothingCategories';

/** 실제 의류의 확정 분류. 대분류와 다른 소분류를 조합할 수 없다. */
export type ClothingClassification = {
  [C in ClothingCategoryId]: { category: C; subcategory: ClothingSubcategoryId<C> };
}[ClothingCategoryId];

/** 전체·대분류 전체는 필터 전용이며 ClothingClassification에 들어가지 않는다. */
export type ClothingCategoryFilter =
  | { kind: 'all' }
  | { kind: 'category'; category: ClothingCategoryId }
  | { kind: 'subcategory'; classification: ClothingClassification };

/** 화면과 Mock에서 쓰는 최소 의류 데이터. 실제 API 응답 타입이 아니다. */
export type ClothingItem = {
  id: string;
  name: string;
  imageUrl?: string | null;
  classification: ClothingClassification;
};
