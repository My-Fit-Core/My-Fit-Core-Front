import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountConfirmationDialog, {
  type AccountIntent,
} from '@/components/mypage/AccountConfirmationDialog';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageMenuRow from '@/components/mypage/MyPageMenuRow';
import ProfileAvatar from '@/components/mypage/ProfileAvatar';
import { PURSUIT_STYLES } from '@/constants/pursuitStyles';
import { getProfile } from '@/mocks/profile';
import { getPursuitPreferences } from '@/mocks/pursuitPreferences';

export default function MyPage() {
  const navigate = useNavigate();
  const [profile] = useState(getProfile);
  const [preferences] = useState(getPursuitPreferences);
  const [accountIntent, setAccountIntent] = useState<AccountIntent | null>(null);
  const submittingRef = useRef(false);

  function handleAccountConfirm() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setAccountIntent(null);
    navigate('/login');
  }
  return (
    <div className="flex min-h-dvh min-w-0 flex-col bg-white">
      <MyPageHeader title="마이페이지" onBack={() => navigate('/home')} />
      <main className="mx-5 min-w-0 flex-1 overflow-y-auto pb-[82px] pt-2">
        <Link
          to="/mypage/profile"
          className="flex h-[126px] items-center gap-[14px] rounded-[18px] bg-pink/20 p-4"
        >
          <ProfileAvatar src={profile.avatarUrl} size={60} />
          <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
            <strong className="truncate text-subheading1-ko font-bold text-[#1c1c1f]">
              {profile.nickname}
            </strong>
            <span className="truncate text-caption-ko text-[#66666e]">
              대표 추구미 · {PURSUIT_STYLES[preferences.primaryStyle]}
            </span>
            <span className="text-body2-ko text-[#1c1c1f]">내 프로필 보기&nbsp; ›</span>
          </span>
        </Link>
        <section aria-labelledby="my-styles-title" className="mt-4">
          <div className="flex min-h-11 items-center justify-between gap-2">
            <h2 id="my-styles-title" className="text-body1-ko font-bold text-[#1c1c1f]">
              나의 추구미
            </h2>
            <Link to="/mypage/styles" className="shrink-0 text-body2-ko text-[#66666e]">
              관리하기&nbsp; ›
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 py-1">
            <span className="rounded-full bg-black px-[10px] py-1 text-body1-ko text-white">
              {PURSUIT_STYLES[preferences.primaryStyle]}
            </span>
            {preferences.secondaryStyles.map((style) => (
              <span
                key={style}
                className="rounded-full border border-gray/30 px-[10px] py-1 text-body1-ko"
              >
                {PURSUIT_STYLES[style]}
              </span>
            ))}
          </div>
          <p className="mt-2 text-caption-ko text-[#63636e]">대표 1개 · 보조 최대 2개</p>
        </section>
        <div className="my-4 h-px bg-[#e7e8ea]" />
        <section aria-labelledby="archive-title">
          <h2 id="archive-title" className="text-body1-ko font-bold text-[#1c1c1f]">
            아카이브
          </h2>
          <div className="mt-[6px]">
            <MyPageMenuRow icon="like" label="좋아요한 코디" />
            <MyPageMenuRow icon="archive" label="내가 올린 게시물" />
          </div>
        </section>
        <div className="my-4 h-px bg-[#e7e8ea]" />
        <section aria-labelledby="settings-title">
          <h2 id="settings-title" className="text-body1-ko font-bold text-[#1c1c1f]">
            설정
          </h2>
          <div className="mt-[6px]">
            <MyPageMenuRow
              icon="setting"
              label="알림 설정"
              description="코디 추천 알림 및 수신 시간"
              to="/mypage/notifications"
            />
            <MyPageMenuRow
              icon="logout"
              label="로그아웃"
              description="현재 계정에서 로그아웃"
              onClick={() => setAccountIntent('logout')}
            />
            <MyPageMenuRow
              icon="delete"
              label="회원탈퇴"
              description="탈퇴 전 안내를 확인하세요"
              onClick={() => setAccountIntent('withdrawal')}
            />
          </div>
        </section>
      </main>
      <div
        aria-hidden="true"
        className="h-[82px] shrink-0 bg-white"
        data-navigation-slot="pending"
      />
      <AccountConfirmationDialog
        intent={accountIntent ?? 'logout'}
        open={accountIntent !== null}
        onCancel={() => setAccountIntent(null)}
        onConfirm={handleAccountConfirm}
      />
    </div>
  );
}
