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

export function calculateVolume(sets: { reps: number, weight: number }[]): number {
  return sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
}

export function getSuggestedLoad(
  exerciseName: string, 
  workoutHistory: any[]
): { weight: number | null, reps: number | null } {
  if (!workoutHistory || !Array.isArray(workoutHistory) || workoutHistory.length === 0) return { weight: null, reps: null };
  
  // Find the last time this exercise was performed
  for (let i = workoutHistory.length - 1; i >= 0; i--) {
    const session = workoutHistory[i];
    if (!session.exerciseLogs) continue;
    
    const exLog = session.exerciseLogs.find((log: any) => log.exerciseName === exerciseName);
    if (exLog && exLog.setsLog && exLog.setsLog.length > 0) {
      // Get the best set or last set from last session
      const validSets = exLog.setsLog.filter((s: any) => s.weight > 0 && s.reps > 0);
      if (validSets.length > 0) {
        const lastSet = validSets[validSets.length - 1]; // or max weight set
        
        // Suggest slightly more weight if reps were hit
        let suggestedWeight = lastSet.weight;
        // Simple progression logic: just suggest same weight to let user edit for now, 
        // or add 2.5kg if they did high reps.
        if (lastSet.reps >= 10) {
          suggestedWeight += 2.5; // simple overload
        }
        
        return {
          weight: suggestedWeight,
          reps: lastSet.reps
        };
      }
    }
  }
  
  return { weight: null, reps: null };
}
