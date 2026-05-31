'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CosmeticType, calculateAvatarLevel } from './evolux';

export type TaskCategory = 'routine' | 'workout' | 'finance' | 'goal' | 'custom' | 'long_term';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  category?: TaskCategory;
  xpReward?: number;
  
  // New Fields
  targetAmount?: number;
  currentAmount?: number;
  unit?: string;
  subTasks?: { id: string; title: string; completed: boolean }[];
  isLongTerm?: boolean;
  isRecurring?: boolean;
  baseDate?: string;
};

export type Goal = {
  id: string;
  title: string;
  type: 'short' | 'long';
  completed: boolean;
};

export type UserProfile = {
  name: string;
  username?: string;
  email?: string;
  avatarLevel: number;
  streak: number;
  totalTasksCompleted: number;
  lastLoginDate: string;
  plan: 'base' | 'orbit' | 'nova' | 'infinite';
  plan_expires_at?: string;
  
  // New Evolux Data
  xp: number;
  unlockedAchievements: string[];
  unlockedCosmetics: string[];
  equippedCosmetics: Partial<Record<CosmeticType, string>>;
  isOnboarded?: boolean;
  role?: string;
  status?: string;
  id?: string;
  ai_personality?: string;
};

interface AppState {
  profile: UserProfile | null;
  tasks: Task[];
  goals: Goal[];
  premiumModalOpen: boolean;
  premiumModalMessage: string;
  login: (name: string, plan: UserProfile['plan']) => void;
  logout: () => void;
  completeOnboarding: (tasks: Task[]) => void;
  addTask: (taskData: Partial<Task>) => void;
  updateTaskProgress: (id: string, amount: number) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
  toggleTask: (id: string) => void;
  addGoal: (title: string, type: 'short' | 'long') => void;
  toggleGoal: (id: string) => void;
  checkStreak: () => void;
  addXp: (amount: number) => void;
  equipCosmetic: (type: CosmeticType, id: string) => void;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  showPremiumModal: (message?: string) => void;
  hidePremiumModal: () => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  setTasks: (tasks: Task[]) => void;
  setGoals: (goals: Goal[]) => void;
}

export function getLocalDateStr(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      tasks: [],
      goals: [],
      premiumModalOpen: false,
      premiumModalMessage: '',
      zoomLevel: 100,

      setTasks: (tasks) => {
        const seenIds = new Set<string>();
        const sanitizedTasks = (tasks || []).map((t) => {
          let id = t.id;
          if (!id || seenIds.has(id)) {
            id = `${id || 'task'}-${Math.random().toString(36).substr(2, 9)}`;
          }
          seenIds.add(id);
          return { ...t, id };
        });
        set({ tasks: sanitizedTasks });
      },
      setGoals: (goals) => {
        const seenIds = new Set<string>();
        const sanitizedGoals = (goals || []).map((g) => {
          let id = g.id;
          if (!id || seenIds.has(id)) {
            id = `${id || 'goal'}-${Math.random().toString(36).substr(2, 9)}`;
          }
          seenIds.add(id);
          return { ...g, id };
        });
        set({ goals: sanitizedGoals });
      },

      setZoomLevel: (zoom) => set({ zoomLevel: zoom }),

      showPremiumModal: (message = 'Essa funcionalidade é exclusiva para assinantes Premium. Faça um upgrade de plano para desbloquear.') => set({ premiumModalOpen: true, premiumModalMessage: message }),
      hidePremiumModal: () => set({ premiumModalOpen: false, premiumModalMessage: '' }),

      login: (name, plan) => {
        const today = getLocalDateStr(new Date());
        set({
          profile: {
            name,
            avatarLevel: 1,
            streak: 1,
            totalTasksCompleted: 0,
            lastLoginDate: today,
            plan,
            xp: 0,
            unlockedAchievements: [],
            unlockedCosmetics: ['aura_base', 'tex_carbon', 'part_none', 'eye_blue'],
            equippedCosmetics: {
              aura: 'aura_base',
              particula: 'part_none',
              armadura: 'tex_carbon',
              olhos: 'eye_blue',
              symbol: ''
            },
            isOnboarded: false
          }
        });
      },

      logout: () => set({ profile: null, tasks: [], goals: [] }),
      
      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),

      completeOnboarding: (initialTasks) => set((state) => ({
        profile: state.profile ? { ...state.profile, isOnboarded: true } : null,
        tasks: [...state.tasks, ...initialTasks],
      })),

      checkStreak: () => {
        const { profile, tasks } = get();
        if (!profile) return;
        
        const today = getLocalDateStr(new Date());
        if (profile.lastLoginDate !== today) {
          const lastDate = new Date(profile.lastLoginDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          
          let newStreak = profile.streak;
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }

          set({
            profile: {
              ...profile,
              streak: newStreak,
              lastLoginDate: today,
            },
            tasks: tasks.map(t => {
              if (t.isRecurring) {
                const base = t.baseDate || t.date;
                if (base <= today) {
                  return { ...t, completed: false, currentAmount: 0, date: today, subTasks: t.subTasks?.map(st => ({...st, completed: false})) };
                }
              }
              return t;
            })
          });
        }
      },

      equipCosmetic: (type, id) => set((state) => {
        if (!state.profile) return state;
        return {
          profile: {
            ...state.profile,
            equippedCosmetics: {
              ...state.profile.equippedCosmetics,
              [type]: id
            }
          }
        };
      }),

      toggleTask: (id) => set((state) => {
        let profileUpdate: Partial<UserProfile> = {};
        const newTasks = state.tasks.map(t => {
          if (t.id === id) {
            const completed = !t.completed;
            if (state.profile && !t.subTasks?.length && !t.targetAmount) {
              const reward = t.xpReward || 10;
              // XP formula: base reward * streak multiplier (cap at x3)
              const multiplier = 1 + Math.min(2, state.profile.streak / 10);
              const xpChange = completed ? Math.floor(reward * multiplier) : -Math.floor(reward * multiplier);
              const newXp = Math.max(0, state.profile.xp + xpChange);
              const newLevel = calculateAvatarLevel(newXp);
              const newTotal = state.profile.totalTasksCompleted + (completed ? 1 : -1);
              
              profileUpdate = {
                xp: newXp,
                avatarLevel: newLevel,
                totalTasksCompleted: Math.max(0, newTotal)
              };
            }
            return { ...t, completed };
          }
          return t;
        });

        return {
          profile: state.profile ? { ...state.profile, ...profileUpdate } : state.profile,
          tasks: newTasks
        };
      }),

      updateTaskProgress: (id, amount) => set((state) => {
        let profileUpdate: Partial<UserProfile> = {};
        const newTasks = state.tasks.map(t => {
          if (t.id === id) {
            const newAmount = Math.max(0, Math.min((t.currentAmount || 0) + amount, t.targetAmount || 100));
            const completedNow = t.targetAmount ? newAmount >= t.targetAmount : t.completed;
            
            if (state.profile && completedNow && !t.completed) {
              const reward = t.xpReward || 10;
              const multiplier = 1 + Math.min(2, state.profile.streak / 10);
              const newXp = Math.max(0, state.profile.xp + Math.floor(reward * multiplier));
              profileUpdate = {
                xp: newXp,
                avatarLevel: calculateAvatarLevel(newXp),
                totalTasksCompleted: state.profile.totalTasksCompleted + 1
              };
            }
            return { ...t, currentAmount: newAmount, completed: completedNow };
          }
          return t;
        });
        return {
          profile: state.profile ? { ...state.profile, ...profileUpdate } : state.profile,
          tasks: newTasks
        };
      }),

      toggleSubTask: (taskId, subTaskId) => set((state) => {
        let profileUpdate: Partial<UserProfile> = {};
        const newTasks = state.tasks.map(t => {
          if (t.id === taskId && t.subTasks) {
            const subTaskWasCompleted = t.subTasks.find(st => st.id === subTaskId)?.completed;
            const newSubTasks = t.subTasks.map(st => st.id === subTaskId ? { ...st, completed: !st.completed } : st);
            const allCompleted = newSubTasks.every(st => st.completed);
            
            if (state.profile) {
              const multiplier = 1 + Math.min(2, state.profile.streak / 10);
              let xpChange = subTaskWasCompleted ? -5 : 5; // 5 XP per sub task
              
              if (allCompleted && !t.completed) {
                const reward = t.xpReward || 10;
                xpChange += Math.floor(reward * multiplier);
              } else if (!allCompleted && t.completed) {
                const reward = t.xpReward || 10;
                xpChange -= Math.floor(reward * multiplier);
              }
              
              const newXp = Math.max(0, state.profile.xp + xpChange);
              profileUpdate = {
                xp: newXp,
                avatarLevel: calculateAvatarLevel(newXp),
                totalTasksCompleted: state.profile.totalTasksCompleted + (allCompleted && !t.completed ? 1 : (!allCompleted && t.completed ? -1 : 0))
              };
            }
            return { ...t, subTasks: newSubTasks, completed: allCompleted };
          }
          return t;
        });
        return {
          profile: state.profile ? { ...state.profile, ...profileUpdate } : state.profile,
          tasks: newTasks
        };
      }),

      addTask: (taskData) => {
        const today = getLocalDateStr(new Date());
        
        let calculatedReward = taskData.xpReward || 10;
        if (!taskData.xpReward) {
           switch(taskData.category) {
              case 'routine': calculatedReward = 15; break;
              case 'workout': calculatedReward = 100; break;
              case 'goal': 
              case 'long_term': calculatedReward = 50; break;
              case 'finance': calculatedReward = 20; break;
              default: calculatedReward = 10; break;
           }
        }

        const newTask: Task = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: taskData.title || 'Nova Missão',
          completed: false,
          date: taskData.isLongTerm ? 'long_term' : (taskData.date || today),
          baseDate: taskData.date || today,
          category: taskData.category || 'custom',
          xpReward: calculatedReward,
          targetAmount: taskData.targetAmount,
          currentAmount: taskData.currentAmount || 0,
          unit: taskData.unit,
          subTasks: taskData.subTasks,
          isLongTerm: taskData.isLongTerm,
          isRecurring: taskData.isRecurring
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      addGoal: (title, type) => set((state) => ({
        goals: [...state.goals, { id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, title, type, completed: false }]
      })),

      toggleGoal: (id) => set((state) => {
        let profileUpdate: Partial<UserProfile> = {};
        const newGoals = state.goals.map(g => {
          if (g.id === id) {
             const wasCompleted = g.completed;
             if (state.profile) {
                const xpChange = wasCompleted ? -200 : 200;
                const newXp = Math.max(0, state.profile.xp + xpChange);
                profileUpdate = {
                   xp: newXp,
                   avatarLevel: calculateAvatarLevel(newXp),
                };
             }
             return { ...g, completed: !wasCompleted };
          }
          return g;
        });

        return {
          profile: state.profile ? { ...state.profile, ...profileUpdate } : state.profile,
          goals: newGoals
        };
      }),

      addXp: (amount) => set((state) => {
        if (!state.profile) return state;
        const newXp = Math.max(0, state.profile.xp + amount);
        const newLevel = calculateAvatarLevel(newXp);
        return {
          profile: {
            ...state.profile,
            xp: newXp,
            avatarLevel: newLevel,
          }
        };
      })
    }),
    {
      name: 'evolux_storage',
      // We can map the old localstorage keys inside a custom storage or just use the new one.
      // Since it's local storage, we'll just let Zustand create the unified 'evolux_storage' key.
    }
  )
);
