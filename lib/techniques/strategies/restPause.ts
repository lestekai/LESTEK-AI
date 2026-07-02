import { TechniqueStrategy } from "../engine";
import { TechniqueState } from "../types";

export const RestPauseStrategy: TechniqueStrategy = {
  type: "Rest Pause",
  
  initialize: (config: any, baseWeight: number, baseReps: number): TechniqueState => {
    const pauses = config?.pauses || 2;
    const pauseRestSeconds = config?.pauseRestSeconds || 15;
    
    return {
      isActive: true,
      type: "Rest Pause",
      stage: "main_set", 
      completedStages: 0,
      totalStages: pauses + 1, // Main set + N pause sets
      techniqueTotalVolume: 0,
      currentRepTarget: baseReps,
      currentWeightSuggested: baseWeight,
      metadata: {
        baseWeight,
        baseReps,
        pauses,
        pauseRestSeconds,
        currentPause: 0
      }
    };
  },

  advance: (state: TechniqueState, performanceData: any): TechniqueState => {
    if (!state.isActive || state.stage === 'completed') return state;

    const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
    const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;
    const volumeAdded = repsCompleted * weightUsed;
    const newTotalVolume = state.techniqueTotalVolume + volumeAdded;
    
    const nextCompletedStages = state.completedStages + 1;

    // Check if we finished
    if (nextCompletedStages >= state.totalStages) {
      return {
        ...state,
        stage: 'completed',
        completedStages: nextCompletedStages,
        techniqueTotalVolume: newTotalVolume,
        currentRepTarget: undefined,
        currentWeightSuggested: undefined,
        restTimerSeconds: undefined 
      };
    }

    // Enter rest phase before next mini-set
    const nextPause = state.metadata.currentPause + 1;

    return {
      ...state,
      stage: `pause_rest_${nextPause}`, // Internal rest phase
      // Don't mark stage as completed for the set yet, wait after rest
      completedStages: nextCompletedStages,
      techniqueTotalVolume: newTotalVolume,
      restTimerSeconds: state.metadata.pauseRestSeconds,
      currentRepTarget: Math.max(1, Math.floor(state.metadata.baseReps / 2)), // Usually you do fewer reps after rest pause
      metadata: {
        ...state.metadata,
        currentPause: nextPause
      }
    };
  },

  getTimers: (state: TechniqueState) => {
    if (state.stage.startsWith('pause_rest_')) {
      return state.metadata.pauseRestSeconds;
    }
    return null; 
  },

  getSummary: (state: TechniqueState) => {
    return {
      name: "Rest Pause",
      pausesCompleted: state.metadata?.currentPause || 0,
      totalVolumeAdded: state.techniqueTotalVolume
    };
  }
};
