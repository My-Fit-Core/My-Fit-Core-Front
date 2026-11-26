import type { SVGProps } from 'react';
import Add from '@/assets/icons/add.svg?react';
import Archive from '@/assets/icons/archive.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import Camera from '@/assets/icons/camera.svg?react';
import CameraAdd from '@/assets/icons/camera-add.svg?react';
import Check from '@/assets/icons/check.svg?react';
import Checkbox from '@/assets/icons/checkbox.svg?react';
import CheckboxChecked from '@/assets/icons/checkbox-checked.svg?react';
import Closet from '@/assets/icons/closet.svg?react';
import Delete from '@/assets/icons/delete.svg?react';
import Filter from '@/assets/icons/filter.svg?react';
import FilterOff from '@/assets/icons/filter-off.svg?react';
import GalleryAdd from '@/assets/icons/gallery-add.svg?react';
import GalleryMultiple from '@/assets/icons/gallery-multiple.svg?react';
import Like from '@/assets/icons/like.svg?react';
import Loading from '@/assets/icons/loading.svg?react';
import Logout from '@/assets/icons/logout.svg?react';
import Menu from '@/assets/icons/menu.svg?react';
import Prev from '@/assets/icons/prev.svg?react';
import Price from '@/assets/icons/price.svg?react';
import Profile from '@/assets/icons/profile.svg?react';
import Search from '@/assets/icons/search.svg?react';
import Setting from '@/assets/icons/setting.svg?react';
import Social from '@/assets/icons/social.svg?react';
import Stylemixer from '@/assets/icons/stylemixer.svg?react';
import Temperature from '@/assets/icons/temperature.svg?react';
import WeatherCold from '@/assets/icons/weather-cold.svg?react';
import WeatherPartlyCloudy from '@/assets/icons/weather-partly-cloudy.svg?react';
import WeatherRainy from '@/assets/icons/weather-rainy.svg?react';
import WeatherSlightlySunny from '@/assets/icons/weather-slightly-sunny.svg?react';
import WeatherSnowy from '@/assets/icons/weather-snowy.svg?react';
import WeatherSnowyRainy from '@/assets/icons/weather-snowy-rainy.svg?react';
import WeatherSunny from '@/assets/icons/weather-sunny.svg?react';

/* Figma Icons 프레임(82:346)의 컴포넌트 아이콘. 이름 규칙은 design-notes 4번 */
const ICONS = {
  menu: Menu,
  search: Search,
  add: Add,
  like: Like,
  check: Check,
  prev: Prev,
  closet: Closet,
  stylemixer: Stylemixer,
  social: Social,
  calendar: Calendar,
  setting: Setting,
  profile: Profile,
  loading: Loading,
  price: Price,
  archive: Archive,
  'camera-add': CameraAdd,
  camera: Camera,
  'gallery-add': GalleryAdd,
  'gallery-multiple': GalleryMultiple,
  logout: Logout,
  checkbox: Checkbox,
  'checkbox-checked': CheckboxChecked,
  delete: Delete,
  filter: Filter,
  'filter-off': FilterOff,
  temperature: Temperature,
  'weather-sunny': WeatherSunny,
  'weather-slightly-sunny': WeatherSlightlySunny,
  'weather-partly-cloudy': WeatherPartlyCloudy,
  'weather-rainy': WeatherRainy,
  'weather-snowy': WeatherSnowy,
  'weather-snowy-rainy': WeatherSnowyRainy,
  'weather-cold': WeatherCold,
} as const;

export type IconName = keyof typeof ICONS;

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  name: IconName;
  /** px. 기본 24 (Figma 기준) */
  size?: number;
  /** 아이콘만으로 뜻을 전할 때 읽어 줄 이름. 없으면 장식용으로 보고 화면 읽기에서 숨긴다. */
  label?: string;
};

/**
 * 색은 글자색(currentColor)을 따른다. 예: `<Icon name="closet" className="text-white" />`
 */
export default function Icon({ name, size = 24, label, ...rest }: IconProps) {
  const Svg = ICONS[name];

  return (
    <Svg
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    />
  );
}
