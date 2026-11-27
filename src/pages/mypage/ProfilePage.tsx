import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import ProfileAvatar from '@/components/mypage/ProfileAvatar';
import { PURSUIT_STYLES } from '@/constants/pursuitStyles';
import { getProfile } from '@/mocks/profile';
import { getPursuitPreferences } from '@/mocks/pursuitPreferences';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile] = useState(getProfile);
  const [preferences] = useState(getPursuitPreferences);
  return (
    <div className="min-h-dvh min-w-0 bg-white">
      <MyPageHeader title="내 프로필" onBack={() => navigate('/mypage')} />
      <main className="mx-5 min-w-0 pt-4 pb-8">
        <section
          aria-label="프로필 요약"
          className="flex min-h-[196px] flex-col items-center justify-center gap-[11px]"
        >
          <ProfileAvatar src={profile.avatarUrl} size={84} />
          <h2 className="max-w-full truncate text-body1-ko font-bold text-[#1f1f24]">
            {profile.nickname}
          </h2>
          <span className="rounded-full bg-black px-[10px] py-1 text-body1-ko text-white">
            {PURSUIT_STYLES[preferences.primaryStyle]}
          </span>
          {preferences.secondaryStyles.length > 0 && (
            <p className="text-caption-ko text-[#63636b]">
              보조 추구미 ·{' '}
              {preferences.secondaryStyles.map((style) => PURSUIT_STYLES[style]).join(' · ')}
            </p>
          )}
        </section>
        <Button
          variant="primary"
          size="long"
          state="selected"
          disabled
          aria-pressed={undefined}
          title="프로필 수정은 추후 구현 예정"
        >
          프로필 수정
        </Button>
        <section aria-labelledby="social-links-title" className="mt-[37px]">
          <h2 id="social-links-title" className="text-body1-ko font-bold text-[#1f1f24]">
            외부 SNS
          </h2>
          <dl className="mt-[10px] space-y-[10px]">
            {profile.socialLinks.map(({ label, url }) => (
              <div key={label} className="min-w-0">
                <dt className="text-caption-ko text-[#63636b]">{label}</dt>
                <dd className="m-0 truncate text-body2-ko text-[#1f1f24]">
                  {url.replace(/^https?:\/\//, '')}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-[15px]">
            <Button
              variant="primary"
              size="long"
              state="selected"
              disabled
              aria-pressed={undefined}
              title="SNS 링크 관리는 추후 구현 예정"
            >
              SNS 링크 관리
            </Button>
          </div>
        </section>
        <p className="mt-3 text-caption-ko text-[#85858a]">
          프로필 수정과 SNS 링크 관리는 추후 제공됩니다.
        </p>
      </main>
    </div>
  );
}
