import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkoutQuestionnaire {
  // 1. Dados
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  targetWeight?: number;
  gender?: string;

  // 2. Objetivo Principal
  mainGoal?: string; 

  // 3. Meta específica
  specificGoal?: string;

  // 4. Experiência
  experienceLevel?: string;

  // 5. Frequência
  daysPerWeek?: number;
  minutesPerSession?: number;
  preferredDays?: string[];

  // 6. Ambiente
  location?: string;

  // 7. Equipamentos
  equipment?: string[];

  // 8. Histórico 
  injuries?: string;
  limitations?: string;

  // 9. Preferências
  targetMuscles?: string[];
  avoidMuscles?: string[];
  likedExercises?: string;
  dislikedExercises?: string;

  // 10. Rotina
  sleepQuality?: string;
  stressLevel?: string;
  energyLevel?: string;

  // 11. Motivação
  motivationWhy?: string;
  motivationStruggle?: string;

  // 12. Cardio
  includeCardio?: boolean;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string;
  targetMuscles: string[];
  substitutions?: string[];
  difficulty?: string;
  equipment?: string;
  gifPlaceholder?: string; // e.g., URL for a mini animation
  advancedTechnique?: string; 
  supersetGroup?: string; 
  description?: string;
  rest?: string;
  tempo?: string;
  rir?: string;
}

export interface WorkoutDayPlan {
  dayName: string; 
  focus: string; 
  isRest: boolean;
  warmup?: string[];
  exercises: ExerciseDefinition[];
  cooldown?: string[];
  intensity: string;
}

export interface WorkoutPhaseDef {
  id: string;
  name: string; // e.g., "Fase 1: Hipertrofia Base"
  description: string;
  durationWeeks: number;
  schedule: WorkoutDayPlan[];
}

export interface WorkoutPlan {
  id: string;
  generatedAt: string;
  
  // Legacy fields
  phaseId?: string;
  phaseName?: string;
  planPromptDescription?: string;
  schedule: WorkoutDayPlan[]; 
  
  // New Program Structure
  programName?: string;
  phases?: WorkoutPhaseDef[];
  currentPhaseIndex?: number;
  currentWeekIndex?: number; // 0 to phases[currentPhaseIndex].durationWeeks - 1
}

export interface WorkoutSetDef {
  setId: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutLog {
  id: string;
  date: string;
  dayFocus: string;
  durationMinutes: number;
  exercisesCompleted: number;
  totalVolume: number;
  perceivedEffort: number;
  phaseIndex?: number;
  weekIndex?: number;
  phaseName?: string;
  exerciseLogs?: {
    exerciseId: string;
    exerciseName: string;
    advancedTechnique?: string;
    supersetGroup?: string;
    setsLog: {
      setNumber: number;
      reps: number;
      weight: number;
    }[];
  }[];
}

export interface WorkoutSettings {
  preparationTimeSeconds: number;
  preparationEnabled: boolean;
  restTimeEnabled: boolean;
  autoAdvanceEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  estimatedSetTimeSeconds: number;
}

export interface ActiveWorkoutSession {
  dayIndex?: number;
  isFree?: boolean;
  activeExerciseIndex: number;
  completedSetsMap: Record<number, number[]>;
  setLogs: Record<string, { reps: string; weight: string }>;
  restTimer: number;
  isResting: boolean;
  techniqueState: any; 
  startTime: number;
}

interface WorkoutState {
  hasCompletedQuestionnaire: boolean;
  questionnaire: WorkoutQuestionnaire;
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutLog[];
  settings: WorkoutSettings;
  activeFreeWorkout: WorkoutDayPlan | null;
  selectedProgressionWeek: number; // 0 = Auto, 1-4 = manual override
  userTemplates: WorkoutPlan[];
  activeWorkoutSession: ActiveWorkoutSession | null;
  
  setQuestionnaireData: (data: Partial<WorkoutQuestionnaire>) => void;
  setPlan: (plan: WorkoutPlan) => void;
  addUserTemplate: (plan: WorkoutPlan) => void;
  updateUserTemplate: (id: string, plan: WorkoutPlan) => void;
  removeUserTemplate: (id: string) => void;
  updateDayPlan: (dayIndex: number, dayPlan: WorkoutDayPlan) => void;
  completeWorkout: (log: WorkoutLog) => void;
  resetWorkoutSystem: () => void;
  setWorkoutHistory: (history: WorkoutLog[]) => void;
  updateSettings: (settings: Partial<WorkoutSettings>) => void;
  setFreeWorkout: (workout: WorkoutDayPlan | null) => void;
  updateFreeWorkout: (workout: WorkoutDayPlan) => void;
  setSelectedProgressionWeek: (week: number) => void;
  setActiveWorkoutSession: (session: ActiveWorkoutSession | null) => void;
  updateActiveWorkoutSession: (data: Partial<ActiveWorkoutSession>) => void;
  setUserTemplates: (templates: WorkoutPlan[]) => void;
  
  // Progression Controls
  advanceWeek: () => void;
  repeatWeek: () => void;
  advancePhase: () => void;
  restartPhase: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      hasCompletedQuestionnaire: false,
      questionnaire: {},
      currentPlan: null,
      workoutHistory: [],
      userTemplates: [],
      activeWorkoutSession: null,
      settings: {
        preparationTimeSeconds: 15,
        preparationEnabled: true,
        restTimeEnabled: true,
        autoAdvanceEnabled: false,
        soundEnabled: true,
        vibrationEnabled: true,
        estimatedSetTimeSeconds: 45
      },
      activeFreeWorkout: null,
      selectedProgressionWeek: 0,

      setQuestionnaireData: (data) => set((state) => ({
        questionnaire: { ...state.questionnaire, ...data }
      })),

      setPlan: (plan) => set({
        currentPlan: plan,
        hasCompletedQuestionnaire: true
      }),

      addUserTemplate: (plan) => set((state) => ({
        userTemplates: [...(state.userTemplates || []), plan]
      })),

      updateUserTemplate: (id, plan) => set((state) => ({
        userTemplates: (state.userTemplates || []).map(t => t.id === id ? plan : t)
      })),

      removeUserTemplate: (id) => set((state) => ({
        userTemplates: (state.userTemplates || []).filter(t => t.id !== id)
      })),

      setUserTemplates: (templates) => set({
        userTemplates: templates
      }),

      updateDayPlan: (dayIndex, dayPlan) => set((state) => {
        if (!state.currentPlan) return state;
        const newSchedule = [...state.currentPlan.schedule];
        newSchedule[dayIndex] = dayPlan;
        return {
          currentPlan: {
            ...state.currentPlan,
            schedule: newSchedule
          }
        };
      }),

      completeWorkout: (log) => set((state) => ({
        workoutHistory: [...(Array.isArray(state.workoutHistory) ? state.workoutHistory : []), log]
      })),
      
      setWorkoutHistory: (history) => set({
        workoutHistory: Array.isArray(history) ? history : []
      }),

                  resetWorkoutSystem: () => set({
        hasCompletedQuestionnaire: false,
        questionnaire: {},
        currentPlan: null,
        workoutHistory: [],
        selectedProgressionWeek: 0,
        userTemplates: [],
        activeFreeWorkout: null,
        activeWorkoutSession: null,
        settings: {
          preparationTimeSeconds: 15,
          preparationEnabled: true,
          restTimeEnabled: true,
          autoAdvanceEnabled: false,
          soundEnabled: true,
          vibrationEnabled: true,
          estimatedSetTimeSeconds: 45
        }
      }),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      setFreeWorkout: (workout) => set({
        activeFreeWorkout: workout
      }),

      updateFreeWorkout: (workout) => set({
        activeFreeWorkout: workout
      }),

      setSelectedProgressionWeek: (week) => set({
        selectedProgressionWeek: week
      }),
      
      setActiveWorkoutSession: (session) => set({
        activeWorkoutSession: session
      }),

      updateActiveWorkoutSession: (data) => set((state) => ({
        activeWorkoutSession: state.activeWorkoutSession 
          ? { ...state.activeWorkoutSession, ...data }
          : null
      })),

      advanceWeek: () => set((state) => {
        if (!state.currentPlan || !state.currentPlan.phases) return state;
        const plan = state.currentPlan;
        const phaseIdx = plan.currentPhaseIndex || 0;
        const phase = plan.phases[phaseIdx];
        const weekIdx = plan.currentWeekIndex || 0;

        if (weekIdx + 1 < phase.durationWeeks) {
          return { currentPlan: { ...plan, currentWeekIndex: weekIdx + 1 } };
        } else {
          // If no more weeks, maybe we wait for user to manually advance phase?
          // Or we auto-advance? The requirement says "Avançar Semana" and "Finalizar Fase" are actions.
          // Let's just clamp it or auto-advance. Let's clamp so user explicitly finishes phase.
          return state; 
        }
      }),

      repeatWeek: () => set((state) => {
        // Just logs it? No, it just means they do the same week again. We don't need to change indices, just maybe clear the logs for this week if we tracked them, but we track by date.
        // Actually, just keep currentWeekIndex as is.
        return state;
      }),

      advancePhase: () => set((state) => {
        if (!state.currentPlan || !state.currentPlan.phases) return state;
        const plan = state.currentPlan;
        const phaseIdx = plan.currentPhaseIndex || 0;

        if (phaseIdx + 1 < plan.phases.length) {
          const nextPhase = plan.phases[phaseIdx + 1];
          return { 
            currentPlan: { 
              ...plan, 
              currentPhaseIndex: phaseIdx + 1, 
              currentWeekIndex: 0,
              schedule: nextPhase.schedule // Update the active schedule
            } 
          };
        }
        return state;
      }),

      restartPhase: () => set((state) => {
        if (!state.currentPlan) return state;
        return { 
          currentPlan: { 
            ...state.currentPlan, 
            currentWeekIndex: 0 
          } 
        };
      })
    }),
    {
      name: 'evolux-workout-storage'
    }
  )
);
