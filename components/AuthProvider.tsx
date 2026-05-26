import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { useAppStore } from '@/lib/store';
import { useWorkoutStore } from '@/lib/workoutStore';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { setProfile, setTasks, setGoals, profile, tasks, goals } = useAppStore();
  const { setPlan, setQuestionnaireData, setWorkoutHistory, currentPlan, workoutHistory, questionnaire } = useWorkoutStore();
  
  // Track last loaded state to prevent redundant sync loops
  const syncLock = useRef(false);

  const fetchProfile = useCallback(async function doFetch(userId: string, retryCount = 0) {
    syncLock.current = true;
    const { data: pData, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(`Error fetching profile (retry ${retryCount}):`, error);
      if (retryCount < 5) {
        // Retry after 500ms if row might not be created by trigger yet
        setTimeout(() => doFetch(userId, retryCount + 1), 500);
      } else {
        syncLock.current = false;
      }
      return;
    }

    if (pData) {
      let currentPlanStr = pData.equipped_cosmetics?.plan || 'base';
      const expiresAt = pData.equipped_cosmetics?.plan_expires_at;

      // Handle plan expiration automatically
      if (expiresAt && currentPlanStr !== 'base') {
        const today = new Date();
        const expDate = new Date(expiresAt);
        if (today > expDate) {
          currentPlanStr = 'base';
          await supabaseAdmin.from('profiles').update({
            equipped_cosmetics: {
              ...(pData.equipped_cosmetics || {}),
              plan: 'base',
              plan_expires_at: ''
            }
          }).eq('id', userId);
          
          pData.equipped_cosmetics = {
            ...(pData.equipped_cosmetics || {}),
            plan: 'base',
            plan_expires_at: ''
          };
        }
      }

      setProfile({
        id: pData.id,
        name: pData.name || pData.username,
        avatarLevel: pData.avatar_level,
        streak: pData.streak,
        totalTasksCompleted: pData.total_tasks_completed,
        lastLoginDate: pData.updated_at,
        plan: currentPlanStr,
        plan_expires_at: pData.equipped_cosmetics?.plan_expires_at,
        xp: pData.xp,
        unlockedAchievements: pData.unlocked_achievements || [],
        unlockedCosmetics: pData.unlocked_cosmetics || ['aura_base', 'tex_carbon', 'part_none', 'eye_blue'],
        equippedCosmetics: pData.equipped_cosmetics || {},
        isOnboarded: true,
        role: pData.role,
        status: pData.status,
      });

      // Hydrate state from JSON blob in equipped_cosmetics temporarily until full table migration
      const backup = pData.equipped_cosmetics?._backup;
      if (backup) {
        if (backup.tasks) setTasks(backup.tasks);
        if (backup.goals) setGoals(backup.goals);
        if (backup.workoutPlan) setPlan(backup.workoutPlan);
        if (backup.workoutHistory) setWorkoutHistory(backup.workoutHistory);
        if (backup.questionnaire) setQuestionnaireData(backup.questionnaire);
      }
    }
    syncLock.current = false;
  }, [setGoals, setPlan, setProfile, setQuestionnaireData, setTasks, setWorkoutHistory]);

  useEffect(() => {
    if (useAppStore.getState().profile?.id === 'test-admin-id') return;

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (useAppStore.getState().profile?.id === 'test-admin-id') return;
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        if (pathname !== '/' && pathname !== '/login' && pathname !== '/plans') {
           navigate('/login');
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (useAppStore.getState().profile?.id === 'test-admin-id') return;
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        if (pathname !== '/' && pathname !== '/login' && pathname !== '/plans') {
           navigate('/login');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, pathname, setProfile, fetchProfile]); 

  // SYNC UP: Whenever local state changes, push to database
  useEffect(() => {
    if (syncLock.current || !profile?.id) return;
    
    const syncBackup = async () => {
      try {
        const { data } = await supabaseAdmin.from('profiles').select('equipped_cosmetics').eq('id', profile.id).single();
        const currentCosmetics = data?.equipped_cosmetics || {};
        
        await supabaseAdmin.from('profiles').update({
          xp: profile.xp,
          streak: profile.streak,
          total_tasks_completed: profile.totalTasksCompleted,
          avatar_level: profile.avatarLevel,
          equipped_cosmetics: {
            ...currentCosmetics,
            _backup: {
              tasks, 
              goals,
              workoutPlan: currentPlan,
              workoutHistory,
              questionnaire
            }
          }
        }).eq('id', profile.id);
      } catch (err) {
        console.error('Failed to sync state', err);
      }
    };

    const debounce = setTimeout(syncBackup, 2000); // 2 second debounce
    return () => clearTimeout(debounce);
  }, [tasks, goals, currentPlan, workoutHistory, questionnaire, profile?.id]);

  return <>{children}</>;
}
