import mascot from '@/assets/images/closet-empty-mascot.png';
import Button from '@/components/common/Button';

export type ClosetEmptyStateProps = { onRegister: () => void; className?: string };

/** 옷장 전체가 비었을 때 사용한다. 필터 결과 0건은 화면에서 별도로 처리한다. */
export default function ClosetEmptyState({ onRegister, className }: ClosetEmptyStateProps) {
  return (
    <div
      className={[
        'flex min-h-[338px] w-full flex-col items-center justify-center gap-[8px] px-[20px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <img src={mascot} alt="" className="size-[214px] object-contain" />
      <p className="w-full text-center text-body1-ko text-[#28272e]">옷장이 아직 비어 있어요</p>
      <div className="w-full max-w-[203px]">
        <Button
          variant="primary"
          size="long"
          state="selected"
          aria-pressed={undefined}
          onClick={onRegister}
        >
          옷 등록하기
        </Button>
      </div>
    </div>
  );
}
