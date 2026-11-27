import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';

type NotificationTimeDialogProps = {
  open: boolean;
  value: string;
  onCancel: () => void;
  onApply: (value: string) => void;
};

export default function NotificationTimeDialog({
  open,
  value,
  onCancel,
  onApply,
}: NotificationTimeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [period, setPeriod] = useState('오전');
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('30');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      const [savedHour, savedMinute] = value.split(':').map(Number);
      setPeriod(savedHour < 12 ? '오전' : '오후');
      setHour(String(savedHour % 12 || 12).padStart(2, '0'));
      setMinute(String(savedMinute).padStart(2, '0'));
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      previousFocus.current?.focus();
    }
  }, [open, value]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  function handleApply() {
    const hour24 = (Number(hour) % 12) + (period === '오후' ? 12 : 0);
    onApply(`${String(hour24).padStart(2, '0')}:${minute}`);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="notification-time-dialog-title"
      aria-describedby="notification-time-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onCancel();
      }}
      className="m-auto w-[min(311px,calc(100vw-32px))] max-w-none rounded-[18px] border-0 bg-white p-0 text-[#1f1f26] shadow-xl backdrop:bg-black/40"
    >
      <div className="p-5">
        <h2 id="notification-time-dialog-title" className="text-body2-ko font-bold">
          알림 수신 시간
        </h2>
        <p
          id="notification-time-dialog-description"
          className="mt-[14px] text-caption-ko text-[#7a7a82]"
        >
          알림을 받을 시간을 선택해 주세요.
        </p>
        <div className="relative mt-[18px] grid h-[113px] grid-cols-3 items-center gap-1 rounded-[12px] bg-[#f7f8f8] px-[7px]">
          <div
            aria-hidden="true"
            className="absolute inset-x-[7px] top-[39px] h-[35px] rounded-lg bg-green/65"
          />
          <label className="relative z-10 text-center text-caption-ko">
            오전/오후
            <select
              aria-label="오전 또는 오후"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="mt-1 w-full bg-transparent text-center text-body1-ko font-bold"
            >
              <option>오전</option>
              <option>오후</option>
            </select>
          </label>
          <label className="relative z-10 text-center text-caption-ko">
            시
            <select
              aria-label="시"
              value={hour}
              onChange={(event) => setHour(event.target.value)}
              className="mt-1 w-full bg-transparent text-center text-body1-ko font-bold"
            >
              {Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0')).map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </label>
          <label className="relative z-10 text-center text-caption-ko">
            분
            <select
              aria-label="분"
              value={minute}
              onChange={(event) => setMinute(event.target.value)}
              className="mt-1 w-full bg-transparent text-center text-body1-ko font-bold"
            >
              {Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0')).map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </label>
        </div>
        <div className="mt-6 flex gap-[7px]">
          <Button
            variant="secondary"
            size="long"
            className="flex-1"
            onClick={onCancel}
            aria-pressed={undefined}
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="long"
            state="selected"
            className="flex-1"
            onClick={handleApply}
            aria-pressed={undefined}
          >
            적용
          </Button>
        </div>
      </div>
    </dialog>
  );
}
