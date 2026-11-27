import { useState } from 'react';
import Icon from '@/components/common/Icon';

type ProfileAvatarProps = { src: string | null; size: 60 | 84 };

export default function ProfileAvatar({ src, size }: ProfileAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src && src !== failedSrc);
  return (
    <span
      aria-label={showImage ? '프로필 사진' : '기본 프로필 이미지'}
      role="img"
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-pink bg-pink/20"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src ?? undefined}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <Icon name="profile" />
      )}
    </span>
  );
}
