import { NavLink } from 'react-router-dom';
import Icon, { type IconName } from '@/components/common/Icon';

type NavItem = { to: string; label: string; icon: IconName };

/* Figma Navigation Bar(334:23367) 순서: 옷장 · 캘린더 · CORE · 스타일믹서 · 소셜 */
const LEFT_ITEMS: NavItem[] = [
  { to: '/closet', label: '옷장', icon: 'closet' },
  { to: '/calendar', label: '캘린더', icon: 'calendar' },
];

const RIGHT_ITEMS: NavItem[] = [
  { to: '/stylemixer', label: '스타일믹서', icon: 'stylemixer' },
  { to: '/feed', label: '소셜', icon: 'social' },
];

/** 항목 31×29. 선택됨 = 지름 37 검정 원 + 흰 아이콘 (Figma 40×37 타원을 정원으로) */
function NavItemLink({ to, label, icon }: NavItem) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className="relative flex h-[29px] w-[31px] items-center justify-center"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 size-[37px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
            />
          )}
          <Icon name={icon} className={`relative ${isActive ? 'text-white' : 'text-black'}`} />
        </>
      )}
    </NavLink>
  );
}

/** CORE = 홈. 지름 24 원, 선택 안 됨 gray 10% + 회색 빛 / 선택됨 gray + 분홍 빛 */
function CoreLink() {
  return (
    <NavLink
      to="/home"
      aria-label="홈"
      className="flex h-[24px] w-[25px] items-center justify-center"
    >
      {({ isActive }) => (
        <span
          aria-hidden
          className={`flex size-[24px] items-center justify-center rounded-full font-en text-[8px] leading-none font-bold text-pink uppercase ${
            isActive ? 'bg-gray shadow-core-selected drop-shadow-core' : 'bg-gray/10 shadow-core'
          }`}
        >
          Core
        </span>
      )}
    </NavLink>
  );
}

/**
 * 하단 탭바. 화면 아래 45px 위에 고정, 좌우 여백 20 (375 화면에서 폭 335).
 * 현재 주소에 맞는 항목이 자동으로 선택된다 (React Router NavLink).
 */
export default function NavBar() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed inset-x-5 bottom-[45px] z-10 flex h-[45px] items-center justify-evenly rounded-full border border-pink/40 bg-white/10 shadow-navbar"
    >
      {LEFT_ITEMS.map((item) => (
        <NavItemLink key={item.to} {...item} />
      ))}
      <CoreLink />
      {RIGHT_ITEMS.map((item) => (
        <NavItemLink key={item.to} {...item} />
      ))}
    </nav>
  );
}
