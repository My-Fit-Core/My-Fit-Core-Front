import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import CategoryRow from '@/components/closet/CategoryRow';
import {
  CLOTHING_CATEGORIES,
  CLOTHING_CATEGORY_IDS,
  isClothingClassification,
} from '@/constants/clothingCategories';
import type { ClothingCategoryId } from '@/constants/clothingCategories';
import type { ClothingCategoryFilter, ClothingClassification } from '@/types/clothing';

type BaseProps = { open: boolean; onClose: () => void };

export type CategoryBottomSheetProps = BaseProps &
  (
    | {
        mode: 'filter';
        value: ClothingCategoryFilter;
        onChange: (value: ClothingCategoryFilter) => void;
      }
    | {
        mode: 'edit';
        value: ClothingClassification | null;
        onApply: (value: ClothingClassification) => void;
      }
  );

function getInitialCategory(props: CategoryBottomSheetProps): ClothingCategoryId | null {
  if (props.mode === 'edit') return props.value?.category ?? null;
  if (props.value.kind === 'all') return null;
  return props.value.kind === 'category'
    ? props.value.category
    : props.value.classification.category;
}

function OpenCategoryBottomSheet(props: CategoryBottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [category, setCategory] = useState<ClothingCategoryId | null>(() =>
    getInitialCategory(props),
  );
  const [draft, setDraft] = useState<ClothingClassification | null>(
    props.mode === 'edit' ? props.value : null,
  );
  const isFilter = props.mode === 'filter';
  const isTopLevel = category === null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    headingRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  function handleFilterSelect(value: ClothingCategoryFilter) {
    if (props.mode !== 'filter') return;
    props.onChange(value);
    props.onClose();
  }

  function handleSubcategorySelect(subcategory: string) {
    if (!category) return;
    const next = { category, subcategory };
    if (!isClothingClassification(next)) return;
    if (props.mode === 'filter') handleFilterSelect({ kind: 'subcategory', classification: next });
    else setDraft(next);
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientX < rect.left || event.clientX > rect.right) {
      props.onClose();
    }
  }

  const title = isTopLevel
    ? isFilter
      ? '카테고리 선택'
      : '카테고리 수정'
    : `${CLOTHING_CATEGORIES[category].label} 세부 분류`;
  const description = isTopLevel
    ? isFilter
      ? '전체 또는 대분류를 선택해 주세요'
      : '대분류를 선택한 후 세부 분류를 선택해 주세요'
    : isFilter
      ? '전체 또는 세부 분류를 선택해 주세요'
      : '세부 분류를 선택한 후 적용해 주세요';

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        props.onClose();
      }}
      onClick={handleBackdropClick}
      className={[
        'fixed top-auto right-0 bottom-0 left-0 m-0 flex max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-none flex-col overflow-hidden border-0 bg-white p-0 text-black backdrop:bg-[#262630]/32',
        isFilter || !isTopLevel ? 'rounded-t-[20px]' : 'rounded-t-[23px]',
        isTopLevel ? (isFilter ? 'h-[626px]' : 'h-[596px]') : 'h-[577px]',
      ].join(' ')}
    >
      <header className="relative h-[120px] shrink-0">
        <span
          aria-hidden="true"
          className="absolute top-[14px] left-1/2 h-[5px] w-[49px] -translate-x-1/2 rounded-[4px] bg-[#d6d6db]"
        />
        {!isTopLevel && (
          <button
            type="button"
            aria-label="대분류 목록으로 돌아가기"
            onClick={() => setCategory(null)}
            className="absolute top-[30px] left-[10px] flex size-[44px] items-center justify-center border-0 bg-transparent p-0"
          >
            <Icon name="prev" size={24} />
          </button>
        )}
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={[
            'absolute top-[42px] right-[60px] text-subheading1-ko text-[#27272c] [&:focus-visible]:outline-none',
            isTopLevel ? 'left-[21px]' : 'left-[62px]',
          ].join(' ')}
        >
          {title}
        </h2>
        <p className="absolute top-[80px] right-[20px] left-[21px] text-caption-ko text-[#757880]">
          {description}
        </p>
        <button
          type="button"
          aria-label="카테고리 선택 닫기"
          onClick={props.onClose}
          className="absolute top-[30px] right-[16px] flex size-[44px] items-center justify-center border-0 bg-transparent p-0 text-[30px] leading-none text-[#27272c]"
        >
          ×
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[20px] pb-[32px]">
        <div className="flex flex-col gap-px">
          {isTopLevel ? (
            <>
              {isFilter && (
                <CategoryRow
                  label="전체"
                  state={props.value.kind === 'all' ? 'selected' : 'default'}
                  onClick={() => handleFilterSelect({ kind: 'all' })}
                />
              )}
              {CLOTHING_CATEGORY_IDS.map((id) => (
                <CategoryRow
                  key={id}
                  label={CLOTHING_CATEGORIES[id].label}
                  state="drilldown"
                  onClick={() => setCategory(id)}
                />
              ))}
            </>
          ) : (
            <>
              {isFilter && (
                <CategoryRow
                  label={`${CLOTHING_CATEGORIES[category].label} 전체`}
                  state={
                    props.value.kind === 'category' && props.value.category === category
                      ? 'selected'
                      : 'default'
                  }
                  onClick={() => handleFilterSelect({ kind: 'category', category })}
                />
              )}
              {Object.entries(CLOTHING_CATEGORIES[category].subcategories).map(([id, label]) => {
                const selected = isFilter
                  ? props.value.kind === 'subcategory' &&
                    props.value.classification.category === category &&
                    props.value.classification.subcategory === id
                  : draft?.category === category && draft.subcategory === id;
                return (
                  <CategoryRow
                    key={id}
                    label={label}
                    state={selected ? 'selected' : 'default'}
                    onClick={() => handleSubcategorySelect(id)}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>

      {!isFilter && !isTopLevel && (
        <footer className="h-[80px] shrink-0 px-[20px] pt-[1px]">
          <Button
            variant="primary"
            size="long"
            state="selected"
            disabled={!draft || draft.category !== category}
            onClick={() => {
              if (draft && props.mode === 'edit') {
                props.onApply(draft);
                props.onClose();
              }
            }}
          >
            적용하기
          </Button>
        </footer>
      )}
    </dialog>,
    document.body,
  );
}

/** 바깥의 확정값과 안쪽의 탐색·임시 선택 상태를 분리한다. */
export default function CategoryBottomSheet(props: CategoryBottomSheetProps) {
  if (!props.open) return null;
  return <OpenCategoryBottomSheet {...props} />;
}
