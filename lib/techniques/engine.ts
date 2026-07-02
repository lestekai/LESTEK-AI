import { AdvancedTechniqueType, TechniqueState, TechniqueConfig } from "./types";
import { DropSetStrategy } from "./strategies/dropSet";
import { RestPauseStrategy } from "./strategies/restPause";
import { ClusterSetStrategy } from "./strategies/clusterSet";
import { MyoRepsStrategy } from "./strategies/myoReps";

export interface TechniqueStrategy {
  type: AdvancedTechniqueType;
  initialize: (config: any, baseWeight: number, baseReps: number) => TechniqueState;
  advance: (state: TechniqueState, performanceData: any) => TechniqueState;
  getTimers: (state: TechniqueState) => number | null; // returns seconds for custom timer, or null
  getSummary: (state: TechniqueState) => any;
}

// ============================================
// BASE REGISTRY FOR ENGINE
// ============================================

const strategies: Record<string, TechniqueStrategy> = {};

export function registerTechnique(strategy: TechniqueStrategy) {
  strategies[strategy.type] = strategy;
}

// Pre-register known techniques
registerTechnique(DropSetStrategy);
registerTechnique(RestPauseStrategy);
registerTechnique(ClusterSetStrategy);
registerTechnique(MyoRepsStrategy);

export function getTechniqueStrategy(type: AdvancedTechniqueType): TechniqueStrategy | null {
  return strategies[type] || null;
}


// ============================================
// ENGINE EXECUTOR
// ============================================

export function createTechniqueState(config: TechniqueConfig, baseWeight: number, baseReps: number): TechniqueState {
  const strategy = getTechniqueStrategy(config.type);
  if (!strategy) {
    return {
      isActive: true,
      type: config.type,
      stage: 'unsupported',
      completedStages: 0,
      totalStages: 1,
      techniqueTotalVolume: 0
    };
  }
  return strategy.initialize(config.config, baseWeight, baseReps);
}

export function advanceTechniqueState(state: TechniqueState, performanceData?: any): TechniqueState {
  if (!state.type) return state;
  const strategy = getTechniqueStrategy(state.type);
  if (!strategy) return state;
  return strategy.advance(state, performanceData);
}
