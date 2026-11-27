import selectedCheck from '@/assets/icons/closet-selected-check.svg';

export type CategoryRowProps = {
  label: string;
  state: 'default' | 'selected' | 'drilldown';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function CategoryRow({
  label,
  state,
  onClick,
  disabled = false,
  className,
}: CategoryRowProps) {
  const isSelected = state === 'selected';
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === 'drilldown' ? undefined : isSelected}
      className={[
        'relative flex h-[48px] w-full min-w-0 items-center gap-[6px] px-[14px] text-left text-[13px] font-medium text-[#28272e] disabled:cursor-not-allowed disabled:opacity-40',
        isSelected ? 'rounded-[1px] bg-green' : 'rounded-[9px] bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isSelected && (
        <span className="pointer-events-none absolute inset-0 rounded-[1px] border border-green/20 bg-white/90" />
      )}
      <span className="relative min-w-0 flex-1 truncate">{label}</span>
      {isSelected && <img src={selectedCheck} alt="" className="relative size-[20px] shrink-0" />}
      {state === 'drilldown' && (
        <span
          aria-hidden="true"
          className="w-[20px] shrink-0 text-center text-[24px] font-normal text-[#70737a]"
        >
          ›
        </span>
      )}
    </button>
  );
}
