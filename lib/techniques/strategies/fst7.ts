import { TechniqueStrategy } from "../engine";
import { TechniqueState } from "../types";

export const FST7Strategy: TechniqueStrategy = {
  type: "FST-7",
  
  initialize: (config: any, baseWeight: number, baseReps: number): TechniqueState => {
    const totalSets = config?.sets || 7;
    const restBetweenSets = config?.restBetweenSets || 35; // optimal fascia stretch pause
    const repsPerSet = config?.repsPerSet || 10;

    return {
      isActive: true,
      type: "FST-7",
      stage: "fst7_1", 
      completedStages: 0,
      totalStages: totalSets * 2 - 1, 
      techniqueTotalVolume: 0,
      currentRepTarget: repsPerSet,
      currentWeightSuggested: baseWeight,
      metadata: {
        baseWeight,
        baseReps,
        totalSets,
        restBetweenSets,
        repsPerSet,
        currentSet: 1
      }
    };
  },

  advance: (state: TechniqueState, performanceData: any): TechniqueState => {
    if (!state.isActive || state.stage === 'completed') return state;

    const nextCompletedStages = state.completedStages + 1;

    if (nextCompletedStages >= state.totalStages) {
      // Final set done
      const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
      const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;
      
      return {
        ...state,
        stage: 'completed',
        completedStages: nextCompletedStages,
        techniqueTotalVolume: state.techniqueTotalVolume + (repsCompleted * weightUsed),
        currentRepTarget: undefined,
        currentWeightSuggested: undefined,
        restTimerSeconds: undefined 
      };
    }

    if (state.stage.startsWith('fst7_')) {
      // Finished a set, entering stretch rest
      const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
      const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;

      return {
        ...state,
        stage: `stretch_rest_${state.metadata.currentSet}`,
        completedStages: nextCompletedStages,
        techniqueTotalVolume: state.techniqueTotalVolume + (repsCompleted * weightUsed),
        restTimerSeconds: state.metadata.restBetweenSets,
        currentRepTarget: 0, 
      };
    } else {
      // Finished rest, entering next FST-7 set
      const nextSet = state.metadata.currentSet + 1;
      return {
        ...state,
        stage: `fst7_${nextSet}`,
        completedStages: nextCompletedStages,
        restTimerSeconds: 0, // Reset rest timer for the working set
        currentRepTarget: state.metadata.repsPerSet,
        metadata: {
          ...state.metadata,
          currentSet: nextSet
        }
      };
    }
  },

  getTimers: (state: TechniqueState) => {
    if (state.stage.startsWith('stretch_rest_')) return state.metadata.restBetweenSets;
    return null; 
  },

  getSummary: (state: TechniqueState) => {
    return {
      name: "FST-7",
      setsCompleted: state.metadata?.currentSet || 0,
      totalVolumeAdded: state.techniqueTotalVolume
    };
  }
};
