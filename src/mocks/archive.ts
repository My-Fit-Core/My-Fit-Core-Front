export type ArchiveKind = 'likes' | 'posts';

export type ArchiveItem = {
  id: string;
  imageUrl: string | null;
  author?: string;
};

// Figma 원본 이미지 다운로드가 차단되어 URL은 미설정 상태다.
const likedItems: ArchiveItem[] = [
  { id: 'like-1', imageUrl: null, author: '@fashion_user1' },
  { id: 'like-2', imageUrl: null, author: '@fashion_user3' },
  { id: 'like-3', imageUrl: null, author: '@very_long_fashion_username_example' },
  { id: 'like-4', imageUrl: null, author: '@fashion_user1' },
  { id: 'like-5', imageUrl: null, author: '@fashion_user3' },
  { id: 'like-6', imageUrl: '/missing-archive-image.png', author: '@fashion_user1' },
];

const postedItems: ArchiveItem[] = Array.from({ length: 6 }, (_, index) => ({
  id: `post-${index + 1}`,
  imageUrl: null,
}));

export function getArchiveItems(kind: ArchiveKind): ArchiveItem[] {
  return [...(kind === 'likes' ? likedItems : postedItems)];
}
