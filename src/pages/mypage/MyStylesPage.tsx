import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import StyleTag from '@/components/common/StyleTag';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import { PURSUIT_STYLES, type PursuitStyleId } from '@/constants/pursuitStyles';
import { getPursuitPreferences, savePursuitPreferences } from '@/mocks/pursuitPreferences';
import type { PursuitPreferences } from '@/types/pursuit';

const styleEntries = Object.entries(PURSUIT_STYLES) as [PursuitStyleId, string][];

function arePreferencesEqual(first: PursuitPreferences, second: PursuitPreferences): boolean {
  return (
    first.primaryStyle === second.primaryStyle &&
    first.secondaryStyles.length === second.secondaryStyles.length &&
    first.secondaryStyles.every((style) => second.secondaryStyles.includes(style))
  );
}

export default function MyStylesPage() {
  const navigate = useNavigate();
  const [savedPreferences] = useState(getPursuitPreferences);
  const [draft, setDraft] = useState<PursuitPreferences>(() => getPursuitPreferences());
  const hasChanges = !arePreferencesEqual(savedPreferences, draft);

  function handlePrimarySelect(style: PursuitStyleId) {
    setDraft((current) => ({
      primaryStyle: style,
      secondaryStyles: current.secondaryStyles.filter((selected) => selected !== style),
    }));
  }

  function handleSecondarySelect(style: PursuitStyleId) {
    setDraft((current) => {
      if (style === current.primaryStyle) return current;
      if (current.secondaryStyles.includes(style)) {
        return {
          ...current,
          secondaryStyles: current.secondaryStyles.filter((selected) => selected !== style),
        };
      }
      if (current.secondaryStyles.length >= 2) return current;
      return { ...current, secondaryStyles: [...current.secondaryStyles, style] };
    });
  }

  function handleSave() {
    if (
      !hasChanges ||
      !draft.primaryStyle ||
      draft.secondaryStyles.length > 2 ||
      draft.secondaryStyles.includes(draft.primaryStyle) ||
      new Set(draft.secondaryStyles).size !== draft.secondaryStyles.length
    ) {
      return;
    }
    savePursuitPreferences(draft);
    navigate('/mypage');
  }

  return (
    <div className="flex min-h-dvh min-w-0 flex-col bg-white text-black">
      <MyPageHeader title="내 추구미 관리" onBack={() => navigate('/mypage')} />
      <main className="mx-5 min-w-0 flex-1 pt-[30px]">
        <section aria-labelledby="primary-style-title" className="min-h-[202px] pt-[13px]">
          <h2 id="primary-style-title" className="text-body1-ko font-bold text-[#1f1f24]">
            대표 추구미
          </h2>
          <p className="text-body2-ko mt-[10px] text-[#63636b]">
            가장 좋아하는 스타일을 1개 선택하세요
          </p>
          <div className="mt-[10px] flex flex-wrap gap-2" aria-label="대표 추구미 선택">
            {styleEntries.map(([style, label]) => (
              <StyleTag
                key={style}
                type="pill"
                state={draft.primaryStyle === style ? 'selected' : 'default'}
                onClick={() => handlePrimarySelect(style)}
              >
                {label}
              </StyleTag>
            ))}
          </div>
        </section>
        <section aria-labelledby="secondary-style-title">
          <h2 id="secondary-style-title" className="text-body1-ko font-bold text-[#1f1f24]">
            보조 추구미
          </h2>
          <p className="text-body2-ko mt-[10px] text-[#63636b]">
            추가로 좋아하는 스타일을 최대 2개 선택하세요
          </p>
          <div className="mt-[10px] flex flex-wrap gap-2" aria-label="보조 추구미 선택">
            {styleEntries.map(([style, label]) => {
              const isSelected = draft.secondaryStyles.includes(style);
              const isDisabled =
                style === draft.primaryStyle || (draft.secondaryStyles.length >= 2 && !isSelected);
              return (
                <StyleTag
                  key={style}
                  type="pill"
                  state={isSelected ? 'selected' : 'default'}
                  disabled={isDisabled}
                  onClick={() => handleSecondarySelect(style)}
                >
                  {label}
                </StyleTag>
              );
            })}
          </div>
        </section>
      </main>
      <div className="mx-5 mb-8 mt-8 shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
        <Button
          variant="primary"
          size="long"
          state={hasChanges ? 'selected' : 'default'}
          disabled={!hasChanges}
          aria-pressed={undefined}
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
