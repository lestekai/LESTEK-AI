'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppStore } from '@/lib/store';
import { useWorkoutStore } from '@/lib/workoutStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProfile, setTasks, setGoals, setTransactions, profile, tasks, goals, transactions } = useAppStore();
  const { 
    setPlan, setQuestionnaireData, setWorkoutHistory, setFreeWorkout, setUserTemplates, updateSettings, setSelectedProgressionWeek,
    currentPlan, workoutHistory, questionnaire, userTemplates, activeFreeWorkout, settings, selectedProgressionWeek
   } = useWorkoutStore();
  
  // Track last loaded state to prevent redundant sync loops
  const syncLock = useRef(false);

  const fetchProfile = useCallback(async function doFetch(userId: string, retryCount = 0) {
    syncLock.current = true;
    try {
      const docRef = doc(db, 'profiles', userId);
      let docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === userId) {
          const defaultUsername = currentUser.email ? currentUser.email.split('@')[0] : 'user';
          const defaultName = currentUser.displayName || defaultUsername;
          const initialProfile = {
            id: userId,
            username: defaultUsername,
            name: defaultName,
            email: currentUser.email || `${defaultUsername}@evolux.app`,
            role: 'user',
            status: 'active',
            avatar_level: 1,
            xp: 0,
            streak: 0,
            total_tasks_completed: 0,
            equipped_cosmetics: { plan: 'base' },
            created_at: new Date().toISOString()
          };
          await setDoc(docRef, initialProfile, { merge: true });
          docSnap = await getDoc(docRef);
        } else if (retryCount < 5) {
          setTimeout(() => doFetch(userId, retryCount + 1), 500);
          return;
        } else {
          syncLock.current = false;
          return;
        }
      }

      const pData = { id: docSnap.id, ...docSnap.data() } as any;

      let currentPlanStr = pData.equipped_cosmetics?.plan || 'base';
      const expiresAt = pData.equipped_cosmetics?.plan_expires_at;

      // Handle plan expiration automatically
      if (expiresAt && currentPlanStr !== 'base') {
        const today = new Date();
        const expDate = new Date(expiresAt);
        if (today > expDate) {
          currentPlanStr = 'base';
          await setDoc(docRef, {
            equipped_cosmetics: {
              ...(pData.equipped_cosmetics || {}),
              plan: 'base',
              plan_expires_at: ''
            }
          }, { merge: true });
          
          pData.equipped_cosmetics = {
            ...(pData.equipped_cosmetics || {}),
            plan: 'base',
            plan_expires_at: ''
          };
        }
      }

      setProfile({
        id: pData.id,
        email: pData.email || '',
        name: pData.name || pData.username || 'Usuário',
        avatarLevel: pData.avatar_level || 1,
        streak: pData.streak || 0,
        totalTasksCompleted: pData.total_tasks_completed || 0,
        lastLoginDate: pData.updated_at || new Date().toISOString(),
        plan: currentPlanStr,
        plan_expires_at: pData.equipped_cosmetics?.plan_expires_at,
        xp: pData.xp || 0,
        unlockedAchievements: pData.unlocked_achievements || [],
        unlockedCosmetics: pData.unlocked_cosmetics || ['aura_base', 'tex_carbon', 'part_none', 'eye_blue'],
        equippedCosmetics: pData.equipped_cosmetics || {},
        isOnboarded: true,
        role: pData.role || 'user',
        status: pData.status || 'active',
      });

      // Hydrate state from JSON blob in equipped_cosmetics temporarily until full table migration
      const backup = pData.equipped_cosmetics?._backup;
      if (backup) {
        if (backup.tasks) setTasks(backup.tasks);
        if (backup.goals) setGoals(backup.goals);
        if (backup.transactions) setTransactions(backup.transactions);
        if (backup.workoutPlan !== undefined) setPlan(backup.workoutPlan);
        if (backup.workoutHistory) setWorkoutHistory(Array.isArray(backup.workoutHistory) ? backup.workoutHistory : []);
        if (backup.questionnaire) setQuestionnaireData(backup.questionnaire);
        if (backup.userTemplates) setUserTemplates(backup.userTemplates);
        if (backup.activeFreeWorkout !== undefined) setFreeWorkout(backup.activeFreeWorkout);
        if (backup.settings) updateSettings(backup.settings);
        if (backup.selectedProgressionWeek !== undefined) setSelectedProgressionWeek(backup.selectedProgressionWeek);
      }
    } catch (error) {
      console.error(`Error fetching profile (retry ${retryCount}):`, error);
      if (retryCount < 5) {
        setTimeout(() => doFetch(userId, retryCount + 1), 500);
      }
    }
    syncLock.current = false;
  }, [setGoals, setPlan, setProfile, setQuestionnaireData, setTasks, setWorkoutHistory, setUserTemplates, setFreeWorkout, updateSettings, setSelectedProgressionWeek, setTransactions]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user.uid);
      } else {
        const { logout } = useAppStore.getState();
        const { resetWorkoutSystem } = useWorkoutStore.getState();
        logout();
        resetWorkoutSystem();
        localStorage.removeItem('workout_q_step');
        localStorage.removeItem('workout_q_data');
        localStorage.removeItem('onboarding_step');
        localStorage.removeItem('onboarding_answers');
        localStorage.removeItem('evolux_finance');
        if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/plans') { 
          navigate('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname, fetchProfile]);

  // SYNC UP: Whenever local state changes, push to database
  useEffect(() => {
    const currentUid = auth.currentUser?.uid;
    if (syncLock.current || !profile?.id || !currentUid || profile.id !== currentUid) return;
    
    const syncBackup = async () => {
      try {
        const docRef = doc(db, 'profiles', profile.id);
        const docSnap = await getDoc(docRef);
        
        let currentCosmetics = {};
        if (docSnap.exists()) {
           currentCosmetics = docSnap.data()?.equipped_cosmetics || {};
        }
        
        const backupData = JSON.parse(JSON.stringify({
          tasks: tasks || [], 
          goals: goals || [],
          transactions: transactions || [],
          workoutPlan: currentPlan || null,
          workoutHistory: workoutHistory || [],
          questionnaire: questionnaire || null,
          userTemplates: userTemplates || [],
          activeFreeWorkout: activeFreeWorkout || null,
          settings: settings || {},
          selectedProgressionWeek: selectedProgressionWeek || 1
        }));

        const payload: any = {
          id: profile.id,
          name: profile.name || 'Usuário',
          email: profile.email || auth.currentUser?.email || '',
          role: profile.role || 'user',
          status: profile.status || 'active',
          xp: profile.xp || 0,
          streak: profile.streak || 0,
          total_tasks_completed: profile.totalTasksCompleted || 0,
          avatar_level: profile.avatarLevel || 1,
          equipped_cosmetics: {
            ...currentCosmetics,
            _backup: backupData
          }
        };

        // Strip undefined values completely
        const stripUndefined = (obj: any) => {
          if (obj === null || typeof obj !== 'object') return obj;
          if (Array.isArray(obj)) return obj.map(stripUndefined);
          const newObj: any = {};
          for (const key in obj) {
            if (obj[key] !== undefined) {
              newObj[key] = stripUndefined(obj[key]);
            }
          }
          return newObj;
        };

        await setDoc(docRef, stripUndefined(payload), { merge: true });
      } catch (err) {
        console.error('Failed to sync state', err);
      }
    };

    const debounce = setTimeout(syncBackup, 2000); // 2 second debounce
    return () => clearTimeout(debounce);
  }, [tasks, goals, transactions, currentPlan, workoutHistory, questionnaire, userTemplates, activeFreeWorkout, settings, selectedProgressionWeek, profile?.id, profile?.name, profile?.email, profile?.role, profile?.status, profile?.xp, profile?.streak, profile?.totalTasksCompleted, profile?.avatarLevel]);

  return <>{children}</>;
}
