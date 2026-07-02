import { TechniqueStrategy } from "../engine";
import { TechniqueState } from "../types";

export const DropSetStrategy: TechniqueStrategy = {
  type: "Drop Set",
  
  initialize: (config: any, baseWeight: number, baseReps: number): TechniqueState => {
    const drops = config?.drops || 2;
    const dropPercentage = config?.dropPercentage || 0.2; // 20% drop each time
    
    return {
      isActive: true,
      type: "Drop Set",
      stage: "main_set", // starts with the main set
      completedStages: 0,
      totalStages: drops + 1, // Main set + N drops
      techniqueTotalVolume: 0,
      currentRepTarget: baseReps,
      currentWeightSuggested: baseWeight,
      metadata: {
        baseWeight,
        baseReps,
        drops,
        dropPercentage,
        currentDrop: 0
      }
    };
  },

  advance: (state: TechniqueState, performanceData: any): TechniqueState => {
    if (!state.isActive || state.stage === 'completed') return state;

    // Calculate volume added in this stage
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
        restTimerSeconds: undefined // Technique is over
      };
    }

    // We have another drop
    const nextDrop = state.metadata.currentDrop + 1;
    const nextWeight = Math.max(
      0, 
      Math.round(state.metadata.baseWeight * Math.pow(1 - state.metadata.dropPercentage, nextDrop))
    );

    return {
      ...state,
      stage: `drop_${nextDrop}`,
      completedStages: nextCompletedStages,
      techniqueTotalVolume: newTotalVolume,
      currentWeightSuggested: nextWeight,
      // Drops often go to failure, but we can set target to baseReps or keep it flexible
      currentRepTarget: state.metadata.baseReps, 
      restTimerSeconds: 0, // Drop sets have no rest
      metadata: {
        ...state.metadata,
        currentDrop: nextDrop
      }
    };
  },

  getTimers: (state: TechniqueState) => {
    // Drop set has NO rest between internal stages
    if (state.stage.startsWith('drop_')) return 0;
    return null; // For main transitions, rely on default behavior
  },

  getSummary: (state: TechniqueState) => {
    return {
      name: "Drop Set",
      dropsCompleted: state.metadata?.currentDrop || 0,
      totalVolumeAdded: state.techniqueTotalVolume
    };
  }
};
