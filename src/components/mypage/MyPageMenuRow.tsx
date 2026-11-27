import { Link } from 'react-router-dom';
import Icon, { type IconName } from '@/components/common/Icon';

type MyPageMenuRowProps = {
  icon: IconName;
  label: string;
  description?: string;
  to?: string;
  onClick?: () => void;
};

export default function MyPageMenuRow({
  icon,
  label,
  description,
  to,
  onClick,
}: MyPageMenuRowProps) {
  const content = (
    <>
      <span className="flex w-[30px] shrink-0 items-center justify-center">
        <Icon name={icon} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-body2-ko text-[#1c1c1f]">{label}</span>
        {description && (
          <span className="block truncate text-caption-ko text-[#66666e]">{description}</span>
        )}
      </span>
      <span aria-hidden="true" className="text-xl text-[#66666e]">
        ›
      </span>
    </>
  );
  const className = 'flex min-h-[50px] w-full items-center gap-3 text-left';
  if (to)
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} disabled={!onClick} className={className}>
      {content}
    </button>
  );
}
