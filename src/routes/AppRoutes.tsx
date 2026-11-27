import { Navigate, Route, Routes } from 'react-router-dom';
import CalendarPage from '@/pages/calendar/CalendarPage';
import ClosetPage from '@/pages/closet/ClosetPage';
import FeedPage from '@/pages/feed/FeedPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import MyPage from '@/pages/mypage/MyPage';
import NotificationsPage from '@/pages/mypage/NotificationsPage';
import ProfilePage from '@/pages/mypage/ProfilePage';
import MyStylesPage from '@/pages/mypage/MyStylesPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import NotFoundPage from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/closet" element={<ClosetPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/notifications" element={<NotificationsPage />} />
      <Route path="/mypage/profile" element={<ProfilePage />} />
      <Route path="/mypage/styles" element={<MyStylesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
