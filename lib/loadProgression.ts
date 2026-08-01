import { WorkoutLog, ExerciseDefinition } from './workoutStore';

export interface SetLog {
  setNumber: number;
  reps: number;
  weight: number;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  setsLog: SetLog[];
}

export interface ProgressionStats {
  lastWeight: number | null;
  bestWeight: number | null;
  suggestedWeight: number;
  status: 'new' | 'maintained' | 'progressed' | 'deload';
  reason: string;
  isNeutral: boolean;
}

// Utility to normalize strings for matching
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Parse target reps safely (e.g., "10-12" -> 10, "15" -> 15, "45s" -> 1)
export function parseTargetReps(repsStr: string): number {
  if (!repsStr) return 10; // default benchmark
  // If it's a timed hold like "45s" or similar
  if (repsStr.toLowerCase().includes('s') || repsStr.toLowerCase().includes('min')) {
    return 1; // standard time metric
  }
  const match = repsStr.match(/^(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 10;
}

/**
 * Calculates progression stats and suggestion based on exercise history
 */
export function getProgressionStats(
  exerciseName: string,
  targetRepsStr: string,
  history: WorkoutLog[]
): ProgressionStats {
  const normCurrent = normalizeName(exerciseName);
  const safeHistory = Array.isArray(history) ? history : [];
  
  // 1. Gather all logs for this specific exercise
  const exerciseHistory: { date: string; setsLog: SetLog[] }[] = [];
  
  for (const log of safeHistory) {
    const logs = (log as any).exerciseLogs as ExerciseLog[] | undefined;
    if (!logs) continue;
    
    // Find matching exercise log
    const match = logs.find(ex => normalizeName(ex.exerciseName) === normCurrent);
    if (match && match.setsLog && match.setsLog.length > 0) {
      exerciseHistory.push({
        date: log.date,
        setsLog: match.setsLog,
      });
    }
  }

  // Sort history chronologically (oldest to newest) to analyze sequence
  exerciseHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // If there are no logs -> Exercise without history
  if (exerciseHistory.length === 0) {
    // Check if it's bodyweight or cardio
    const isBodyweight = 
      normCurrent.includes('prancha') || 
      normCurrent.includes('flexao') || 
      normCurrent.includes('abdominal') || 
      normCurrent.includes('barra fixa') || 
      normCurrent.includes('corrida') || 
      normCurrent.includes('esteira') || 
      normCurrent.includes('alongamento') || 
      normCurrent.includes('recreativo') ||
      normCurrent.includes('recreativa') ||
      normCurrent.includes('caminhada') ||
      normCurrent.includes('caranguejo');

    const neutralWeight = isBodyweight ? 0 : 10; // 0 for bodyweight, 10kg as neutral starter weight

    return {
      lastWeight: null,
      bestWeight: null,
      suggestedWeight: neutralWeight,
      status: 'new',
      reason: isBodyweight 
        ? 'Exercício com peso do corpo livre. Carga neutra sugerida: 0 kg.' 
        : 'Recém adicionado. Carga neutra starter sugerida por segurança: 10 kg.',
      isNeutral: true,
    };
  }

  // 1. Calculate bestWeight across all history
  let bestWeight = 0;
  for (const session of exerciseHistory) {
    for (const s of session.setsLog) {
      if (s.weight > bestWeight) {
        bestWeight = s.weight;
      }
    }
  }

  // 2. Get the most recent session details
  const lastSession = exerciseHistory[exerciseHistory.length - 1];
  const lastWeights = lastSession.setsLog.map(s => s.weight);
  const lastWeight = Math.max(...lastWeights); // max weight from last session
  
  // 3. Analyze weekly frequency and layoff
  const lastDate = new Date(lastSession.date);
  const today = new Date();
  const diffDays = Math.max(0, Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  // If layoff is longer than 14 days, suggest a deload / safety maintain
  if (diffDays > 14) {
    const deloadWeight = Math.max(0, Math.round(lastWeight * 0.9 * 2) / 2); // 10% safety deload
    return {
      lastWeight,
      bestWeight,
      suggestedWeight: deloadWeight,
      status: 'deload',
      reason: `Retorno físico pós-intervalo de ${diffDays} dias: Carga reduzida em 10% por segurança contra lesões.`,
      isNeutral: false,
    };
  }

  // 4. Analyze reps and sets to see if progression requirements are met
  const targetBenchmark = parseTargetReps(targetRepsStr);
  
  // We count how many sets in the last session reached or exceeded target repetitions
  let hitCount = 0;
  for (const s of lastSession.setsLog) {
    if (s.reps >= targetBenchmark) {
      hitCount++;
    }
  }

  const allSetsMatched = hitCount === lastSession.setsLog.length;
  const majorSetsMatched = hitCount >= Math.ceil(lastSession.setsLog.length * 0.7);

  if (allSetsMatched && lastWeight > 0) {
    // Perfect: completed all sets at target reps. Suggest small progression.
    let increment = 2; // default
    if (lastWeight <= 14) {
      increment = 1; // light dumbbell additions
    } else if (lastWeight >= 60) {
      increment = 2.5; // compound lift additions
    } else if (lastWeight >= 100) {
      increment = 5; // advanced lifts
    }

    const suggestedWeight = lastWeight + increment;
    return {
      lastWeight,
      bestWeight,
      suggestedWeight,
      status: 'progressed',
      reason: `Consistência ideal: completou as ${lastSession.setsLog.length} séries no alvo (${targetBenchmark} reps). Progressão de +${increment} kg sugerida.`,
      isNeutral: false,
    };
  } else if (majorSetsMatched && lastWeight > 0) {
    // Satisfactory progression: completed majority sets. Suggest very slight progression (+1 kg flat or maintain depending on level)
    const increment = lastWeight <= 20 ? 1 : 2;
    const suggestedWeight = lastWeight + increment;
    return {
      lastWeight,
      bestWeight,
      suggestedWeight,
      status: 'progressed',
      reason: `Ótimo rendimento: atingiu a meta de reps em grande parte das séries. Progressão incremental de +${increment} kg sugerida.`,
      isNeutral: false,
    };
  } else {
    // Consolidated stage: keep current weight to master form and build muscle frequency stamina
    return {
      lastWeight,
      bestWeight,
      suggestedWeight: lastWeight,
      status: 'maintained',
      reason: lastWeight === 0 
        ? 'Exercício com peso do corpo livre mantido.' 
        : `Consolidação de repetições: mantenha os ${lastWeight} kg até completar o volume alvo por completo.`,
      isNeutral: false,
    };
  }
}

export interface PersonalRecords {
  maxWeight: number;
  maxReps: number;
  maxVolume: number;
}

/**
 * Calculates current personal records (Weight, Reps, Volume in one session) 
 * for a specific exercise from history
 */
export function calculate1RM(weight: number, reps: number): number {
  if (weight <= 0 || reps <= 0) return 0;
  if (reps === 1) return weight;
  // Apply Brzycki for < 6 reps, Epley for >= 6 reps
  if (reps < 6) {
    return weight * (36 / (37 - reps));
  } else {
    return weight * (1 + reps / 30);
  }
}

export function calculateVolume(sets: SetLog[]): number {
  return sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
}

export function getPersonalRecords(exerciseName: string, history: WorkoutLog[]): PersonalRecords {
  const normCurrent = normalizeName(exerciseName);
  let maxWeight = 0;
  let maxReps = 0;
  let maxVolume = 0;
  const safeHistory = Array.isArray(history) ? history : [];

  for (const log of safeHistory) {
    const logs = log.exerciseLogs;
    if (!logs) continue;
    const match = logs.find(ex => normalizeName(ex.exerciseName) === normCurrent);
    if (match && match.setsLog) {
      let sessionVolume = 0;
      for (const s of match.setsLog) {
        if (s.weight > maxWeight) maxWeight = s.weight;
        if (s.reps > maxReps) maxReps = s.reps;
        sessionVolume += s.reps * s.weight;
      }
      if (sessionVolume > maxVolume) {
        maxVolume = sessionVolume;
      }
    }
  }

  return { maxWeight, maxReps, maxVolume };
}

