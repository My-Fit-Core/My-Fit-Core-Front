import type { ClothingClassification } from '@/types/clothing';

/** 프론트엔드 UI 분류. 백엔드·AI API 식별자와의 매핑은 계약 확정 후 별도로 정의한다. */
export const CLOTHING_CATEGORIES = {
  top: {
    label: '상의',
    supportsThickness: true,
    subcategories: {
      tshirt: '티셔츠',
      shirt: '셔츠',
      blouse: '블라우스',
      knit: '니트',
      hoodie: '후드티',
      sweatshirt: '맨투맨',
      sleeveless: '민소매',
    },
  },
  bottom: {
    label: '하의',
    supportsThickness: true,
    subcategories: {
      jeans: '청바지',
      slacks: '슬랙스',
      shorts: '반바지',
      mini_skirt: '미니스커트',
      long_skirt: '롱스커트',
    },
  },
  dress: {
    label: '원피스',
    supportsThickness: true,
    subcategories: { mini_dress: '미니 원피스', long_dress: '롱 원피스' },
  },
  outerwear: {
    label: '아우터',
    supportsThickness: true,
    subcategories: {
      jacket: '재킷',
      blazer: '블레이저',
      coat: '코트',
      cardigan: '가디건',
      padding: '패딩',
    },
  },
  shoes: {
    label: '신발',
    supportsThickness: true,
    subcategories: {
      sneakers: '운동화',
      flats: '플랫슈즈',
      loafers: '로퍼',
      heels: '힐',
      boots: '부츠',
      sandals: '샌들',
    },
  },
  bag: {
    label: '가방',
    supportsThickness: false,
    subcategories: {
      shoulder_bag: '숄더백',
      tote_bag: '토트백',
      backpack: '백팩',
      crossbody_bag: '크로스백',
    },
  },
  hat: {
    label: '모자',
    supportsThickness: false,
    subcategories: {
      baseball_cap: '볼캡',
      bucket_hat: '버킷햇',
      beanie: '비니',
      beret: '베레모',
      wide_brim_hat: '챙 넓은 모자',
    },
  },
  accessory: {
    label: '액세서리',
    supportsThickness: false,
    subcategories: { scarf: '스카프·머플러', jewelry: '주얼리' },
  },
} as const;

export type ClothingCategoryId = keyof typeof CLOTHING_CATEGORIES;
export type ClothingSubcategoryId<C extends ClothingCategoryId> =
  keyof (typeof CLOTHING_CATEGORIES)[C]['subcategories'];

export const CLOTHING_CATEGORY_IDS = Object.keys(CLOTHING_CATEGORIES) as ClothingCategoryId[];

export function getClothingCategoryLabel(category: ClothingCategoryId): string {
  return CLOTHING_CATEGORIES[category].label;
}

export function getClothingSubcategoryLabel(classification: ClothingClassification): string {
  const subcategories: Record<string, string> =
    CLOTHING_CATEGORIES[classification.category].subcategories;
  return subcategories[classification.subcategory];
}

/** 동적으로 렌더링한 소분류 ID를 확정 분류 타입으로 안전하게 좁힌다. */
export function isClothingClassification(value: {
  category: ClothingCategoryId;
  subcategory: string;
}): value is ClothingClassification {
  return Object.hasOwn(CLOTHING_CATEGORIES[value.category].subcategories, value.subcategory);
}
