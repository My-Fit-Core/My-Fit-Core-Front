import { useState } from 'react';
import Icon from '@/components/common/Icon';
import type { ArchiveItem } from '@/mocks/archive';

type ArchiveCardProps = { item: ArchiveItem; liked: boolean };

export default function ArchiveCard({ item, liked }: ArchiveCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const showImage = Boolean(item.imageUrl && !hasImageError);
  return (
    <article className="min-w-0">
      <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-[#f5f6f7]">
        {showImage ? (
          <img
            src={item.imageUrl ?? undefined}
            alt="코디 이미지"
            className="h-full w-full object-cover"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <span
            role="img"
            aria-label="코디 이미지 준비 중"
            className="text-center text-caption-ko text-[#85858a]"
          >
            이미지 준비 중
          </span>
        )}
      </div>
      {liked && (
        <div className="mt-[6px] flex h-10 items-center gap-1">
          <span className="min-w-0 flex-1 truncate text-[11.5px] text-[#6b6b70]">
            {item.author}
          </span>
          <span
            aria-label="좋아요한 코디"
            className="flex h-10 w-11 shrink-0 items-center justify-center"
          >
            <Icon name="like" size={19} />
          </span>
        </div>
      )}
    </article>
  );
}
