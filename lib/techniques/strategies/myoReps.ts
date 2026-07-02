import { TechniqueStrategy } from "../engine";
import { TechniqueState } from "../types";

export const MyoRepsStrategy: TechniqueStrategy = {
  type: "Myo Reps",
  
  initialize: (config: any, baseWeight: number, baseReps: number): TechniqueState => {
    const miniSets = config?.miniSets || 4;
    const restBetweenMiniSets = config?.restBetweenMiniSets || 5; 
    const repsPerMiniSet = config?.repsPerMiniSet || 4;

    return {
      isActive: true,
      type: "Myo Reps",
      stage: "activation_set", 
      completedStages: 0,
      totalStages: miniSets * 2 + 1, // activation -> rest -> mini -> rest -> mini...
      techniqueTotalVolume: 0,
      currentRepTarget: baseReps,
      currentWeightSuggested: baseWeight,
      metadata: {
        baseWeight,
        baseReps,
        miniSets,
        restBetweenMiniSets,
        repsPerMiniSet,
        currentMiniSet: 0
      }
    };
  },

  advance: (state: TechniqueState, performanceData: any): TechniqueState => {
    if (!state.isActive || state.stage === 'completed') return state;

    const nextCompletedStages = state.completedStages + 1;

    if (nextCompletedStages >= state.totalStages) {
      // Final mini set done
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

    if (state.stage === 'activation_set' || state.stage.startsWith('mini_set_')) {
      // Finished a set, entering rest
      const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
      const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;

      return {
        ...state,
        stage: `rest_before_${state.metadata.currentMiniSet + 1}`,
        completedStages: nextCompletedStages,
        techniqueTotalVolume: state.techniqueTotalVolume + (repsCompleted * weightUsed),
        restTimerSeconds: state.metadata.restBetweenMiniSets,
        currentRepTarget: 0, 
      };
    } else {
      // Finished rest, entering next mini set
      const nextMiniSet = state.metadata.currentMiniSet + 1;
      return {
        ...state,
        stage: `mini_set_${nextMiniSet}`,
        completedStages: nextCompletedStages,
        restTimerSeconds: 0,
        currentRepTarget: state.metadata.repsPerMiniSet,
        metadata: {
          ...state.metadata,
          currentMiniSet: nextMiniSet
        }
      };
    }
  },

  getTimers: (state: TechniqueState) => {
    if (state.stage.startsWith('rest_before_')) return state.metadata.restBetweenMiniSets;
    return null; 
  },

  getSummary: (state: TechniqueState) => {
    return {
      name: "Myo Reps",
      miniSetsCompleted: state.metadata?.currentMiniSet || 0,
      totalVolumeAdded: state.techniqueTotalVolume
    };
  }
};
