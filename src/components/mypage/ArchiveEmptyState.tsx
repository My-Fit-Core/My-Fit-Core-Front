import type { ArchiveKind } from '@/mocks/archive';

type ArchiveEmptyStateProps = { kind: ArchiveKind };

export default function ArchiveEmptyState({ kind }: ArchiveEmptyStateProps) {
  return (
    <div className="flex min-h-[calc(100dvh-104px)] flex-col items-center justify-center px-5 pb-12 text-center">
      <div
        role="img"
        aria-label="원본 마스코트 이미지 준비 중"
        className="flex size-[214px] items-center justify-center rounded-[54px] bg-[#f5f6f7] text-caption-ko text-[#85858a]"
      >
        이미지 준비 중
      </div>
      <p className="mt-3 text-body1-ko text-black">
        {kind === 'likes' ? '아직 좋아요한 코디가 없어요' : '아직 올린 게시물이 없어요'}
      </p>
    </div>
  );
}
