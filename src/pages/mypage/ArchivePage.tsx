import { useNavigate, useSearchParams } from 'react-router-dom';
import ArchiveCard from '@/components/mypage/ArchiveCard';
import ArchiveEmptyState from '@/components/mypage/ArchiveEmptyState';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import { getArchiveItems, type ArchiveKind } from '@/mocks/archive';

type ArchivePageProps = { kind: ArchiveKind };

export default function ArchivePage({ kind }: ArchivePageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEmpty = import.meta.env.DEV && searchParams.get('empty') === '1';
  const items = isEmpty ? [] : getArchiveItems(kind);
  const title = kind === 'likes' ? '좋아요한 코디' : '내가 올린 게시물';
  return (
    <div className="min-h-dvh min-w-0 bg-white">
      <MyPageHeader title={title} onBack={() => navigate('/mypage')} />
      <main className="mx-5 min-w-0 pt-[23px] pb-8">
        {items.length === 0 ? (
          <ArchiveEmptyState kind={kind} />
        ) : (
          <div className="grid grid-cols-2 gap-x-[15px] gap-y-4" aria-label={`${title} 목록`}>
            {items.map((item) => (
              <ArchiveCard key={item.id} item={item} liked={kind === 'likes'} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
