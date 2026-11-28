import { Route, Routes } from 'react-router-dom';
import CalendarPage from '@/pages/calendar/CalendarPage';
import ClosetPage from '@/pages/closet/ClosetPage';
import FeedPage from '@/pages/feed/FeedPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import MyPage from '@/pages/mypage/MyPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import SplashPage from '@/pages/splash/SplashPage';
import NotFoundPage from '@/pages/NotFoundPage';

import '@/styles/entry.css';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/splash" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/closet" element={<ClosetPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
