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
}

export interface WorkoutDayPlan {
  dayName: string; 
  focus: string; 
  isRest: boolean;
  warmup: string[];
  exercises: ExerciseDefinition[];
  cooldown: string[];
  intensity: string;
}

export interface WorkoutPlan {
  id: string;
  generatedAt: string;
  phaseId: string;
  phaseName: string;
  planPromptDescription: string;
  schedule: WorkoutDayPlan[]; 
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

interface WorkoutState {
  hasCompletedQuestionnaire: boolean;
  questionnaire: WorkoutQuestionnaire;
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutLog[];
  settings: WorkoutSettings;
  
  setQuestionnaireData: (data: Partial<WorkoutQuestionnaire>) => void;
  setPlan: (plan: WorkoutPlan) => void;
  updateDayPlan: (dayIndex: number, dayPlan: WorkoutDayPlan) => void;
  completeWorkout: (log: WorkoutLog) => void;
  resetWorkoutSystem: () => void;
  setWorkoutHistory: (history: WorkoutLog[]) => void;
  updateSettings: (settings: Partial<WorkoutSettings>) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      hasCompletedQuestionnaire: false,
      questionnaire: {},
      currentPlan: null,
      workoutHistory: [],
      settings: {
        preparationTimeSeconds: 15,
        preparationEnabled: true,
        restTimeEnabled: true,
        autoAdvanceEnabled: false,
        soundEnabled: true,
        vibrationEnabled: true,
        estimatedSetTimeSeconds: 45
      },

      setQuestionnaireData: (data) => set((state) => ({
        questionnaire: { ...state.questionnaire, ...data }
      })),

      setPlan: (plan) => set({
        currentPlan: plan,
        hasCompletedQuestionnaire: true
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
        workoutHistory: [...state.workoutHistory, log]
      })),
      
      setWorkoutHistory: (history) => set({
        workoutHistory: history
      }),

      resetWorkoutSystem: () => set({
        hasCompletedQuestionnaire: false,
        questionnaire: {},
        currentPlan: null,
        workoutHistory: []
      }),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      }))
    }),
    {
      name: 'evolux-workout-storage'
    }
  )
);
