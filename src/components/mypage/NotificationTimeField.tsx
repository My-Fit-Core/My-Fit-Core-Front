type NotificationTimeFieldProps = {
  value: string;
  disabled: boolean;
  onOpen: () => void;
};

function formatNotificationTime(value: string): string {
  const [hour, minute] = value.split(':').map(Number);
  return `${hour < 12 ? '오전' : '오후'} ${String(hour % 12 || 12).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export default function NotificationTimeField({
  value,
  disabled,
  onOpen,
}: NotificationTimeFieldProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onOpen}
      aria-label={`알림 수신 시간 ${formatNotificationTime(value)} 선택`}
      className={`flex h-[52px] w-full items-center justify-between rounded-[12px] border px-[15px] text-left text-body2-ko ${disabled ? 'border-[#e0e0e3] bg-[#f5f6f7] text-[#85858a]' : 'border-[#d1e8cf] bg-[#f9faf8] text-[#1f1f24]'}`}
    >
      <span>{disabled ? '비활성화' : formatNotificationTime(value)}</span>
      {!disabled && (
        <span aria-hidden="true" className="text-[25px] leading-none text-[#85858a]">
          ⌄
        </span>
      )}
    </button>
  );
}
