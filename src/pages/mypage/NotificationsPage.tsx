import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import NotificationTimeDialog from '@/components/mypage/NotificationTimeDialog';
import NotificationTimeField from '@/components/mypage/NotificationTimeField';
import NotificationToggle from '@/components/mypage/NotificationToggle';
import { getNotificationSettings, saveNotificationSettings } from '@/mocks/notificationSettings';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(getNotificationSettings);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  function handleSave() {
    saveNotificationSettings(draft);
    navigate('/mypage');
  }

  return (
    <div className="flex min-h-dvh min-w-0 flex-col bg-white">
      <MyPageHeader title="알림 설정" onBack={() => navigate('/mypage')} />
      <main className="mx-5 min-w-0 flex-1 pt-[86px]">
        <section aria-labelledby="recommendation-notification-title">
          <div className="flex min-h-[34px] items-center justify-between gap-2">
            <h2 id="recommendation-notification-title" className="text-body1-ko text-[#1f1f24]">
              오늘의 코디 추천 알림
            </h2>
            <NotificationToggle
              checked={draft.enabled}
              onChange={(enabled) => setDraft((current) => ({ ...current, enabled }))}
            />
          </div>
          <p className="mt-2 text-caption-ko text-[#85858a]">매일 나에게 맞는 코디를 알려드려요</p>
        </section>
        <div className="mt-[54px] h-px bg-[#e0e0e3]" />
        <section aria-labelledby="notification-time-title" className="mt-[25px]">
          <h2 id="notification-time-title" className="text-body1-ko text-[#1f1f24]">
            알림 수신 시간
          </h2>
          <p className="mt-[9px] text-caption-ko text-[#85858a]">
            코디 추천 알림을 받을 시간을 선택해 주세요.
          </p>
          <div className="mt-[9px]">
            <NotificationTimeField
              value={draft.time}
              disabled={!draft.enabled}
              onOpen={() => setIsTimeOpen(true)}
            />
          </div>
          {!draft.enabled && (
            <p className="mt-[9px] text-caption-ko text-[#85858a]">
              알림이 꺼져 있어 수신 시간을 변경할 수 없어요.
            </p>
          )}
        </section>
      </main>
      <div className="mx-5 mb-8 mt-8 shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
        <Button
          variant="primary"
          size="long"
          state="selected"
          onClick={handleSave}
          aria-pressed={undefined}
        >
          저장하기
        </Button>
      </div>
      <NotificationTimeDialog
        open={isTimeOpen}
        value={draft.time}
        onCancel={() => setIsTimeOpen(false)}
        onApply={(time) => {
          setDraft((current) => ({ ...current, time }));
          setIsTimeOpen(false);
        }}
      />
    </div>
  );
}
