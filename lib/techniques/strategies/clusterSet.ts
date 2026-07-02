import { TechniqueStrategy } from "../engine";
import { TechniqueState } from "../types";

export const ClusterSetStrategy: TechniqueStrategy = {
  type: "Cluster Set",
  
  initialize: (config: any, baseWeight: number, baseReps: number): TechniqueState => {
    const clusters = config?.clusters || 3;
    const restBetweenClusters = config?.restBetweenClusters || 20; // Default 20 sec
    const repsPerCluster = config?.repsPerCluster || 3;

    return {
      isActive: true,
      type: "Cluster Set",
      stage: "cluster_1", 
      completedStages: 0,
      totalStages: clusters * 2 - 1, // cluster -> rest -> cluster -> rest -> cluster
      techniqueTotalVolume: 0,
      currentRepTarget: repsPerCluster,
      currentWeightSuggested: baseWeight,
      metadata: {
        baseWeight,
        baseReps,
        clusters,
        restBetweenClusters,
        repsPerCluster,
        currentCluster: 1
      }
    };
  },

  advance: (state: TechniqueState, performanceData: any): TechniqueState => {
    if (!state.isActive || state.stage === 'completed') return state;

    const nextCompletedStages = state.completedStages + 1;

    // Check if we finished
    if (nextCompletedStages >= state.totalStages) {
      // Final cluster done
      const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
      const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;
      const volumeAdded = repsCompleted * weightUsed;
      
      return {
        ...state,
        stage: 'completed',
        completedStages: nextCompletedStages,
        techniqueTotalVolume: state.techniqueTotalVolume + volumeAdded,
        currentRepTarget: undefined,
        currentWeightSuggested: undefined,
        restTimerSeconds: undefined 
      };
    }

    if (state.stage.startsWith('cluster_')) {
      // Just finished a cluster, entering rest
      const repsCompleted = performanceData?.reps || state.currentRepTarget || 0;
      const weightUsed = performanceData?.weight || state.currentWeightSuggested || 0;
      const volumeAdded = repsCompleted * weightUsed;

      return {
        ...state,
        stage: `rest_${state.metadata.currentCluster}`,
        completedStages: nextCompletedStages,
        techniqueTotalVolume: state.techniqueTotalVolume + volumeAdded,
        restTimerSeconds: state.metadata.restBetweenClusters,
        currentRepTarget: 0, // No reps in rest
      };
    } else {
      // Just finished rest, entering next cluster
      const nextCluster = state.metadata.currentCluster + 1;
      return {
        ...state,
        stage: `cluster_${nextCluster}`,
        completedStages: nextCompletedStages,
        restTimerSeconds: 0,
        currentRepTarget: state.metadata.repsPerCluster,
        metadata: {
          ...state.metadata,
          currentCluster: nextCluster
        }
      };
    }
  },

  getTimers: (state: TechniqueState) => {
    if (state.stage.startsWith('rest_')) return state.metadata.restBetweenClusters;
    return null; 
  },

  getSummary: (state: TechniqueState) => {
    return {
      name: "Cluster Set",
      clustersCompleted: state.metadata?.currentCluster || 0,
      totalVolumeAdded: state.techniqueTotalVolume
    };
  }
};
