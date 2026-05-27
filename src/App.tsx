import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LevelUpNotification } from '../components/LevelUpNotification';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../lib/store';

// Pages
import SplashPage from '../app/page';
import LoginPage from '../app/login/page';
import OnboardingPage from '../app/onboarding/page';
import DashboardPage from '../app/dashboard/page';
import TasksPage from '../app/tasks/page';
import WorkoutsPage from '../app/workouts/page';
import RankingPage from '../app/ranking/page';
import FinancePage from '../app/finance/page';
import AvatarPage from '../app/avatar/page';
import ActiveWorkoutPage from '../app/workouts/active/page';
import PlansPage from '../app/plans/page';
import SettingsPage from '../app/settings/page';
import AdminDashboard from '../app/admin/page';
import CheckoutPage from '../app/checkout/page';
import SetupAppPage from '../app/setup/page';
import WorkoutHistoryPage from '../app/workouts/history/page';
import WorkoutLibraryPage from '../app/workouts/library/page';
import WorkoutTemplatesPage from '../app/workouts/templates/page';
import AICoachPage from '../app/ai-coach/page';

const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();
  const { zoomLevel, profile, updateProfile } = useAppStore();

  useEffect(() => {
    // Modify root font size (16px base) to scale the whole app layout proportionally
    document.documentElement.style.fontSize = `${(zoomLevel / 100) * 16}px`;
  }, [zoomLevel]);

  const hideNavRoutes = ['/', '/login', '/onboarding', '/workouts/active', '/checkout', '/setup', '/plans'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/workouts/active" element={<ActiveWorkoutPage />} />
        <Route path="/workouts/history" element={<WorkoutHistoryPage />} />
        <Route path="/workouts/library" element={<WorkoutLibraryPage />} />
        <Route path="/workouts/templates" element={<WorkoutTemplatesPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/setup" element={<SetupAppPage />} />
        <Route path="/ai-coach" element={<AICoachPage />} />
      </Routes>
      <LevelUpNotification />
      {showNav && <BottomNav />}
    </>
  );
}

import PremiumLockModal from '../components/PremiumLockModal';
import { AuthProvider } from '../components/AuthProvider';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout />
          <PremiumLockModal />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
