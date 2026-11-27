# Issue #16 옷장 컴포넌트 사용법

- 기준: 2026-11-27 사용자 결정 8개 대분류·36개 소분류, Figma 최종 디자인 `2:6`.
- 구현: `src/constants/clothingCategories.ts`, `src/types/clothing.ts`, `src/components/closet/`.
- 데이터는 프론트엔드 UI용이며 실제 백엔드·AI API 응답 계약은 미확정이다.

## 개발 미리보기

`npm run dev` 실행 후 개발 서버 주소의 `/dev/closet-components`에 접속한다. 기본 Vite 포트라면 `http://localhost:5173/dev/closet-components`다. 375px 기준 폭에서 실제 컴포넌트만 나열하며 모바일 브라우저 폭에 따라 줄어든다. 필터 Trigger에서 8개 대분류와 36개 소분류를 직접 탐색하고 선택할 수 있다. 수정 Trigger에서는 임시 선택, 취소, 적용을 확인한다. Disabled 예시에서는 Trigger가 비활성화되어 시트를 열 수 없다. 미리보기 라우트는 `import.meta.env.DEV`에서만 생성되며 프로덕션 빌드에는 포함되지 않는다. 제거할 때는 `src/routes/AppRoutes.tsx`의 개발 전용 라우트와 `ClosetComponentsPreviewPage.tsx`, `src/mocks/clothingPreview.ts`, 미리보기 전용 의류 이미지만 정리한다. 실제 컴포넌트와 카테고리 정의는 유지한다.

## 카테고리와 타입

`CLOTHING_CATEGORIES`가 식별자·한글 표시명·소분류·두께 적용 여부의 단일 데이터 소스다. 대분류는 상의, 하의, 원피스, 아우터, 신발, 가방, 모자, 액세서리 순서다. 가방은 4종, 모자는 5종, 액세서리는 2종이다. 모자·가방·액세서리에는 두께 태그를 표시하지 않는다.

```tsx
import type {
  ClothingCategoryFilter,
  ClothingClassification,
  ClothingItem,
} from '@/types/clothing';

const classification: ClothingClassification = { category: 'hat', subcategory: 'baseball_cap' };
const filter: ClothingCategoryFilter = { kind: 'category', category: 'hat' }; // 모자 전체
const item: ClothingItem = { id: 'example', name: '볼캡', imageUrl: null, classification };
```

`ClothingClassification`은 유효한 대분류·소분류 쌍만 허용한다. `ClothingCategoryFilter`의 `{kind:'all'}`과 `{kind:'category', category:'hat'}`는 각각 전체 카테고리와 모자 전체 필터다. 이 필터 전용 값은 실제 의류 저장 분류에 넣지 않는다.

## 컴포넌트 Props와 예시

```tsx
import CategoryFilterTrigger from '@/components/closet/CategoryFilterTrigger';
import CategoryBottomSheet from '@/components/closet/CategoryBottomSheet';
import CategoryRow from '@/components/closet/CategoryRow';
import ClosetEmptyState from '@/components/closet/ClosetEmptyState';
import ClosetItemCard from '@/components/closet/ClosetItemCard';

<ClosetItemCard item={item} onOpen={(id) => openDetail(id)} />;
<ClosetItemCard
  item={item}
  mode="select"
  selected={isSelected}
  onToggleSelect={(id) => toggleItem(id)}
/>;
<ClosetItemCard item={item} mode="display" />;

<CategoryFilterTrigger value={filter} onOpen={() => openCategorySheet()} />;
<CategoryBottomSheet
  mode="filter"
  open={isOpen}
  value={filter}
  onChange={setFilter}
  onClose={() => setIsOpen(false)}
/>;
<CategoryBottomSheet
  mode="edit"
  open={isEditOpen}
  value={classification}
  onApply={setClassification}
  onClose={() => setIsEditOpen(false)}
/>;
<CategoryRow label="모자 전체" state="selected" onClick={() => selectCategory(filter)} />;
<CategoryRow label="모자" state="drilldown" onClick={() => openHatSubcategories()} />;
<CategoryRow label="볼캡" state="default" onClick={() => selectSubcategory(classification)} />;

<ClosetEmptyState onRegister={() => openRegistration()} />;
```

예시의 `openDetail`, `toggleItem` 등은 사용 페이지에서 제공하는 콜백이다. 컴포넌트는 API 요청이나 라우트 이동을 직접 수행하지 않는다. `ClosetItemCard` 기본 조회에는 체크가 없고, 선택 모드에서 `selected=true`일 때만 체크가 나온다. `ClosetEmptyState`는 옷장 전체가 비었을 때 사용한다. 필터 결과 0건은 별도 화면 상태로 처리한다. 모든 CTA는 현재 공통 `Button` 규격을 따른다.

`CategoryBottomSheet`의 `mode="filter"`는 전체·대분류 전체·소분류 선택을 즉시 `onChange`로 확정하고 닫는다. `mode="edit"`는 유효한 소분류만 임시 선택하며 `onApply` 전에는 외부 `value`를 바꾸지 않는다. 닫기·Escape·바깥 클릭은 임시 선택을 취소한다. 다시 열면 외부 확정값이 체크된 상태로 시작한다. 브라우저 네이티브 `<dialog>`로 모달 포커스와 배경 차단을 처리하며 OS 제스처 표시를 별도로 렌더링하지 않는다.

## Figma 근거와 후속 범위

- 구현 원본: ClosetItemCard `1039:19987`, CategoryFilterTrigger `1039:19985`, CategoryRow `587:10687`·`587:10689`·`587:10694`, ClosetEmptyState `1039:19986`.
- 닫기 글리프는 25px이며 터치 영역은 44×44px이다. [필터 닫기 `1083:15359`](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=1083-15359) · [편집 닫기 `1083:15417`](https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=1083-15417)
- 최신 분류 원본: 최상위 필터 `1083:14300`, 편집 `787:12842`; 상의 `1083:14336`·`1083:14366`, 하의 `1083:14395`·`1083:14421`, 원피스 `1083:14446`·`1083:14466`, 아우터 `1083:14485`·`1083:14511`, 신발 `1083:14536`·`1083:14564`, 가방 `1083:14591`·`1083:14615`, 액세서리 `1083:14638`·`1083:14660`, 모자 `1134:16510`·`1134:16523`.
- 사용 화면: 옷장 `1134:16823`, 갤러리 `1134:16895`, AI 검수 `1134:16967`, 정보 수정 `1134:17004`; 두께 QA `1084:18341`.
- 옷장 메인·AI 검수 페이지·실제 API 매핑은 후속 Issue다. 착용 아이템 선택 페이지 담당자에게 본 문서의 타입과 카드 Props를 전달한다.

Figma가 제공한 카드 이미지 자리표시 SVG는 경로가 비어 있어 브라우저에서 깨진 이미지로 표시됐다. 원본 참조 화면에는 안내 문구가 보이므로 현재는 `이미지 슬롯` 문구만 표시한다. 유효한 자리표시 원본이 제공되면 해당 아이콘을 추가 확인한다.
