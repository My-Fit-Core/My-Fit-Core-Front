import { useState } from 'react';
import CategoryBottomSheet from '@/components/closet/CategoryBottomSheet';
import CategoryFilterTrigger from '@/components/closet/CategoryFilterTrigger';
import CategoryRow from '@/components/closet/CategoryRow';
import ClosetEmptyState from '@/components/closet/ClosetEmptyState';
import ClosetItemCard from '@/components/closet/ClosetItemCard';
import { PREVIEW_CLOTHING_ITEMS } from '@/mocks/clothingPreview';
import type { ClothingCategoryFilter, ClothingClassification } from '@/types/clothing';

export default function ClosetComponentsPreviewPage() {
  const [isShirtSelected, setIsShirtSelected] = useState(true);
  const [isHatSelected, setIsHatSelected] = useState(false);
  const [filter, setFilter] = useState<ClothingCategoryFilter>({ kind: 'all' });
  const [classification, setClassification] = useState<ClothingClassification>({
    category: 'top',
    subcategory: 'shirt',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [lastEvent, setLastEvent] = useState('');

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[375px] bg-white px-[20px] py-8 text-black">
      <h1 className="text-subheading1-ko">Closet components</h1>
      <p role="status" aria-live="polite" className="mt-2 min-h-[20px] text-caption-ko">
        {lastEvent}
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-body1-ko">ClosetItemCard</h2>
        <p className="mb-2 text-caption-ko">Browse · 긴 이름</p>
        <div className="grid grid-cols-2 gap-3">
          <ClosetItemCard
            item={PREVIEW_CLOTHING_ITEMS.shirt}
            onOpen={(id) => setLastEvent(`상세: ${id}`)}
          />
          <ClosetItemCard
            item={PREVIEW_CLOTHING_ITEMS.longName}
            onOpen={(id) => setLastEvent(`상세: ${id}`)}
          />
        </div>
        <p className="mt-5 mb-2 text-caption-ko">Select · 선택됨 / 선택되지 않음</p>
        <div className="grid grid-cols-2 gap-3">
          <ClosetItemCard
            item={PREVIEW_CLOTHING_ITEMS.shirt}
            mode="select"
            selected={isShirtSelected}
            onToggleSelect={() => setIsShirtSelected((value) => !value)}
          />
          <ClosetItemCard
            item={PREVIEW_CLOTHING_ITEMS.hat}
            mode="select"
            selected={isHatSelected}
            onToggleSelect={() => setIsHatSelected((value) => !value)}
          />
        </div>
        <p className="mt-5 mb-2 text-caption-ko">Display · 이미지 없음</p>
        <div className="grid grid-cols-2 gap-3">
          <ClosetItemCard item={PREVIEW_CLOTHING_ITEMS.missingImage} mode="display" />
          <ClosetItemCard item={PREVIEW_CLOTHING_ITEMS.hat} mode="display" />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-body1-ko">CategoryFilterTrigger + CategoryBottomSheet</h2>
        <p className="mb-2 text-caption-ko">Filter · 즉시 반영</p>
        <CategoryFilterTrigger value={filter} onOpen={() => setIsFilterOpen(true)} />
        <p className="mt-5 mb-2 text-caption-ko">Edit · 적용하기 전까지 확정값 유지</p>
        <CategoryFilterTrigger
          value={{ kind: 'subcategory', classification }}
          onOpen={() => setIsEditOpen(true)}
        />
        <CategoryBottomSheet
          mode="filter"
          open={isFilterOpen}
          value={filter}
          onChange={setFilter}
          onClose={() => setIsFilterOpen(false)}
        />
        <CategoryBottomSheet
          mode="edit"
          open={isEditOpen}
          value={classification}
          onApply={setClassification}
          onClose={() => setIsEditOpen(false)}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-body1-ko">CategoryRow</h2>
        <div className="flex flex-col gap-px">
          <CategoryRow label="Default" state="default" onClick={() => setLastEvent('Default')} />
          <CategoryRow label="Selected" state="selected" onClick={() => setLastEvent('Selected')} />
          <CategoryRow
            label="Drilldown"
            state="drilldown"
            onClick={() => setLastEvent('Drilldown')}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-body1-ko">ClosetEmptyState</h2>
        <ClosetEmptyState onRegister={() => setLastEvent('옷 등록하기')} />
      </section>
    </main>
  );
}
