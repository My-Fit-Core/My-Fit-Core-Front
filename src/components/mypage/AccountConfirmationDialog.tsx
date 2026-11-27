import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

export type AccountIntent = 'logout' | 'withdrawal';

type AccountConfirmationDialogProps = {
  intent: AccountIntent;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
};

export default function AccountConfirmationDialog({
  intent,
  open,
  onCancel,
  onConfirm,
  isSubmitting = false,
}: AccountConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const isWithdrawal = intent === 'withdrawal';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="account-dialog-title"
      aria-describedby="account-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        if (!isSubmitting) onCancel();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current && !isSubmitting) onCancel();
      }}
      className="m-auto w-[min(311px,calc(100vw-32px))] max-w-none rounded-[18px] border-0 bg-white p-0 text-[#1f1f24] shadow-xl backdrop:bg-black/40"
    >
      <div
        className={`flex flex-col items-center gap-[10px] px-5 py-[18px] ${isWithdrawal ? 'min-h-[235px]' : 'min-h-[219px]'}`}
      >
        <span
          className={`flex size-10 items-center justify-center rounded-full ${isWithdrawal ? 'bg-[#f9dfec]' : 'bg-[#f7f7f8]'}`}
        >
          <Icon name={isWithdrawal ? 'delete' : 'logout'} />
        </span>
        <h2 id="account-dialog-title" className="text-center text-subheading1-ko">
          {isWithdrawal ? '정말 탈퇴하시겠어요?' : '로그아웃하시겠어요?'}
        </h2>
        <p id="account-dialog-description" className="text-center text-caption-ko text-[#787880]">
          {isWithdrawal
            ? '탈퇴 시 계정과 관련 데이터가 삭제될 수 있으며, 복구가 어려울 수 있어요.'
            : '다시 로그인해야 서비스를 이용할 수 있어요'}
        </p>
        <div className="mt-auto flex w-full gap-3 pt-[5px]">
          <Button
            variant="secondary"
            size="long"
            className="flex-1"
            disabled={isSubmitting}
            onClick={onCancel}
            aria-pressed={undefined}
          >
            취소
          </Button>
          {isWithdrawal ? (
            <button
              type="button"
              className="h-[43px] flex-1 rounded-[1px] bg-[#f9dfec] text-body2-ko text-[#993b5e] disabled:opacity-40"
              disabled={isSubmitting}
              onClick={onConfirm}
            >
              확인
            </button>
          ) : (
            <Button
              variant="primary"
              size="long"
              className="flex-1"
              disabled={isSubmitting}
              onClick={onConfirm}
              aria-pressed={undefined}
            >
              확인
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}
