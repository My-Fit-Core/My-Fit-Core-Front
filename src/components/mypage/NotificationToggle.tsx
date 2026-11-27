type NotificationToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
};

export default function NotificationToggle({
  checked,
  onChange,
  disabled,
}: NotificationToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-label="오늘의 코디 추천 알림"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors ${checked ? 'bg-green' : 'bg-gray'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 size-6 rounded-full bg-white shadow-sm transition-[left] ${checked ? 'left-6' : 'left-1'}`}
      />
    </button>
  );
}
