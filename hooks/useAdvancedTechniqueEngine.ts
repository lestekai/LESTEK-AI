import { useState, useCallback } from "react";
import { TechniqueState, TechniqueConfig } from "../lib/techniques/types";
import { createTechniqueState, advanceTechniqueState } from "../lib/techniques/engine";

export interface AdvancedTechniqueEngine {
  state: TechniqueState;
  initializeTechnique: (technique: TechniqueConfig, baseWeight: number, baseReps: number) => void;
  advanceStage: (performanceData?: any) => void;
  resetTechnique: () => void;
  updateTimer: (remainingSeconds: number) => void;
  restoreState: (state: TechniqueState) => void;
}

export const useAdvancedTechniqueEngine = (): AdvancedTechniqueEngine => {
  const [state, setState] = useState<TechniqueState>({
    isActive: false,
    type: null,
    stage: 'idle',
    completedStages: 0,
    totalStages: 0,
    techniqueTotalVolume: 0,
  });

  const resetTechnique = useCallback(() => {
    setState({
      isActive: false,
      type: null,
      stage: 'idle',
      completedStages: 0,
      totalStages: 0,
      techniqueTotalVolume: 0,
    });
  }, []);

  const initializeTechnique = useCallback((technique: TechniqueConfig, baseWeight: number, baseReps: number) => {
    const initialState = createTechniqueState(technique, baseWeight, baseReps);
    setState(initialState);
  }, []);

  const advanceStage = useCallback((performanceData?: any) => {
    setState(prev => advanceTechniqueState(prev, performanceData));
  }, []);

  const updateTimer = useCallback((remaining: number) => {
    setState(prev => ({ ...prev, restTimerSeconds: remaining }));
  }, []);

  const restoreState = useCallback((savedState: TechniqueState) => {
    setState(savedState);
  }, []);

  return {
    state,
    initializeTechnique,
    advanceStage,
    resetTechnique,
    updateTimer,
    restoreState
  };
};

