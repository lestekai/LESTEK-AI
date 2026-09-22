import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LevelUpNotification } from '../components/LevelUpNotification';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton } from '../components/Skeleton';
import PremiumLockModal from '../components/PremiumLockModal';
import { AuthProvider } from '../components/AuthProvider';

// Lazy Loaded Pages
const SplashPage = lazy(() => import('../app/page'));
const LoginPage = lazy(() => import('../app/login/page'));
const OnboardingPage = lazy(() => import('../app/onboarding/page'));
const DashboardPage = lazy(() => import('../app/dashboard/page'));
const TasksPage = lazy(() => import('../app/tasks/page'));
const WorkoutsPage = lazy(() => import('../app/workouts/page'));
const RankingPage = lazy(() => import('../app/ranking/page'));
const FinancePage = lazy(() => import('../app/finance/page'));
const AvatarPage = lazy(() => import('../app/avatar/page'));
const ActiveWorkoutPage = lazy(() => import('../app/workouts/active/page'));
const PlansPage = lazy(() => import('../app/plans/page'));
const SettingsPage = lazy(() => import('../app/settings/page'));
const AdminDashboard = lazy(() => import('../app/admin/page'));
const CheckoutPage = lazy(() => import('../app/checkout/page'));
const SetupAppPage = lazy(() => import('../app/setup/page'));
const WorkoutHistoryPage = lazy(() => import('../app/workouts/history/page'));
const WorkoutLibraryPage = lazy(() => import('../app/workouts/library/page'));
const WorkoutTemplatesPage = lazy(() => import('../app/workouts/templates/page'));
const WorkoutFreePage = lazy(() => import('../app/workouts/free/page'));
const ProgressionPage = lazy(() => import('../app/workouts/progression/page'));
const AICoachPage = lazy(() => import('../app/ai-coach/page'));

const queryClient = new QueryClient();

function GlobalSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col p-6 space-y-6 max-w-7xl mx-auto w-full pt-12"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-[200px] w-full rounded-2xl" />
        <Skeleton className="h-[120px] w-full rounded-2xl" />
      </div>
    </motion.div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 w-full flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  const location = useLocation();
  const { zoomLevel } = useAppStore();

  useEffect(() => {
    // Modify root font size (16px base) to scale the whole app layout proportionally
    document.documentElement.style.fontSize = `${(zoomLevel / 100) * 16}px`;
  }, [zoomLevel]);

  const hideNavRoutes = ['/', '/login', '/onboarding', '/workouts/active', '/checkout', '/setup', '/plans'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><SplashPage /></Suspense></PageTransition>} />
          <Route path="/login" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><LoginPage /></Suspense></PageTransition>} />
          <Route path="/onboarding" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><OnboardingPage /></Suspense></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><DashboardPage /></Suspense></PageTransition>} />
          <Route path="/tasks" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><TasksPage /></Suspense></PageTransition>} />
          <Route path="/workouts" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><WorkoutsPage /></Suspense></PageTransition>} />
          <Route path="/workouts/active" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><ActiveWorkoutPage /></Suspense></PageTransition>} />
          <Route path="/workouts/history" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><WorkoutHistoryPage /></Suspense></PageTransition>} />
          <Route path="/workouts/library" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><WorkoutLibraryPage /></Suspense></PageTransition>} />
          <Route path="/workouts/templates" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><WorkoutTemplatesPage /></Suspense></PageTransition>} />
          <Route path="/workouts/free" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><WorkoutFreePage /></Suspense></PageTransition>} />
          <Route path="/workouts/progression" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><ProgressionPage /></Suspense></PageTransition>} />
          <Route path="/ranking" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><RankingPage /></Suspense></PageTransition>} />
          <Route path="/finance" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><FinancePage /></Suspense></PageTransition>} />
          <Route path="/avatar" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><AvatarPage /></Suspense></PageTransition>} />
          <Route path="/plans" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><PlansPage /></Suspense></PageTransition>} />
          <Route path="/settings" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><SettingsPage /></Suspense></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><AdminDashboard /></Suspense></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><CheckoutPage /></Suspense></PageTransition>} />
          <Route path="/setup" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><SetupAppPage /></Suspense></PageTransition>} />
          <Route path="/ai-coach" element={<PageTransition><Suspense fallback={<GlobalSkeleton />}><AICoachPage /></Suspense></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <LevelUpNotification />
      {showNav && <BottomNav />}
    </>
  );
}

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
