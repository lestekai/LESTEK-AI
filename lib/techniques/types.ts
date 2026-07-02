export type AdvancedTechniqueType =
  | "Drop Set"
  | "Rest Pause"
  | "Cluster Set"
  | "Myo Reps"
  | "FST-7"
  | "Circuito"
  | "Nenhuma";

export interface TechniqueState {
  isActive: boolean;
  type: AdvancedTechniqueType | null;
  stage: string; // The current internal stage of the technique (e.g., 'normal_set', 'drop_1', 'rest')
  currentRepTarget?: number;
  currentWeightSuggested?: number;
  restTimerSeconds?: number;
  completedStages: number;
  totalStages: number;
  techniqueTotalVolume: number;
  metadata?: any; // For flexible state matching different techniques
}

export interface TechniqueConfig {
  type: AdvancedTechniqueType;
  config?: any; 
}
