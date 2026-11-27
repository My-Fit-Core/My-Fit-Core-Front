import Icon from '@/components/common/Icon';

type MyPageHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function MyPageHeader({ title, onBack }: MyPageHeaderProps) {
  return (
    <header className="mx-5 mt-2 flex h-12 items-center gap-[7px]">
      <button
        type="button"
        aria-label="마이페이지로 돌아가기"
        onClick={onBack}
        className="flex size-11 shrink-0 items-center justify-center"
      >
        <Icon name="prev" />
      </button>
      <h1 className="text-subheading1-ko min-w-0 text-[#1f1f24]">{title}</h1>
    </header>
  );
}
