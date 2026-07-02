import { ExerciseDefinition } from './workoutStore';

export interface ProgressionPhaseInfo {
  week: number;
  phaseName: string;
  nextPhaseName: string;
  description: string;
  intensityLabel: string;
  weightModifier: number; // e.g. 1.0 = baseline, 1.05 = +5%
  evolutionForecast: string;
}

// 1. Core periodization configuration based on Goal
export function getProgressionPhase(week: number, goalStr: string = 'Hipertrofia Muscular'): ProgressionPhaseInfo {
  // Normalize goal
  const goal = goalStr || 'Hipertrofia Muscular';
  const nextWeek = week === 4 ? 1 : week + 1;

  const phasesMap: Record<number, { name: string; desc: string; intensity: string; weightMod: number }> = {
    1: {
      name: 'Adaptação & Técnica',
      desc: 'Foco na cadência perfeita, ativação neuromuscular básica e consolidação da técnica.',
      intensity: 'Moderado (70% 1RM)',
      weightMod: 1.0
    },
    2: {
      name: 'Sobrecarga de Volume',
      desc: 'Aumento da quantidade de séries de trabalho para induzir estresse metabólico e volume total.',
      intensity: 'Moderado-Alto (75% 1RM)',
      weightMod: 1.05
    },
    3: {
      name: 'Pico de Intensidade',
      desc: 'Tensão mecânica máxima com altíssima carga ou volume de esforço limite próximo à falha.',
      intensity: 'Máxima Potência (85% 1RM)',
      weightMod: 1.10
    },
    4: {
      name: 'Deload Ativo',
      desc: 'Remoção temporária do estresse acumulado para supercompensação regenerativa das articulações e SNC.',
      intensity: 'Recuperativo (55% 1RM)',
      weightMod: 0.80
    }
  };

  const currentPhase = phasesMap[week] || phasesMap[1];
  const nextPhase = phasesMap[nextWeek] || phasesMap[1];

  // Specific forecasts based on user's goal
  let forecastStr = '';
  if (goal.includes('Hipertrofia')) {
    forecastStr = week === 1 
      ? 'Ajuste neural. Esperado ganho de controle motor. Pump moderado.' 
      : week === 2
      ? 'Micro-lesão de fibras induzida por volume. Esperado hipertrofia miofibrilar e pump denso.'
      : week === 3
      ? 'Falha concêntrica no limite. Sobrecarga máxima de nutrientes e sinalização anabólica extrema.'
      : 'Supercompensação de glicogênio. Músculos se regeneram maiores e mais fortes sem fadiga crônica.';
  } else if (goal.includes('Força')) {
    forecastStr = week === 1
      ? 'Coordenação intramuscular inicial. Perfeito para calibrar as cargas máximas.'
      : week === 2
      ? 'Melhoria na taxa de desenvolvimento de força (RFD). Recrutamento de unidades motoras acelerado.'
      : week === 3
      ? 'Recordes Pessoais (PR). Foco total em força tensional absoluta. Fadiga neural no limite.'
      : 'Recuperação dos tendões e tecidos conjuntivos. Pronto para bater novos recordes no próximo ciclo.';
  } else if (goal.includes('Emagrecimento') || goal.includes('Definição')) {
    forecastStr = week === 1
      ? 'Grande gasto calórico inicial, ativação aeróbia e depleção básica de glicogênio.'
      : week === 2
      ? 'Aumento do estresse metabólico e lactato, promovendo liberação hormonal de queima lipídica.'
      : week === 3
      ? 'Densidade de treino extrema. EPOC (consumo pós-exercício de oxigênio) elevado por mais de 24 horas.'
      : 'Efeito rebote regenerativo. Preservação de massa magra mantendo o metabolismo acelerado.';
  } else {
    // Condicionamento / Saúde
    forecastStr = week === 1
      ? 'Condicionamento cardiorrespiratório básico e melhora na mobilidade articular geral.'
      : week === 2
      ? 'Aumento da endurance muscular local e capacidade de transporte de oxigênio.'
      : week === 3
      ? 'Capacidade aeróbia/anaeróbia sob máxima saturação. Excelente evolução do VO2 máximo.'
      : 'Equilíbrio homeostático recuperado. Redução dos níveis de cortisol livre e aumento da mobilidade.';
  }

  return {
    week,
    phaseName: `Semana ${week}: ${currentPhase.name}`,
    nextPhaseName: `Semana ${nextWeek}: ${nextPhase.name}`,
    description: currentPhase.desc,
    intensityLabel: currentPhase.intensity,
    weightModifier: currentPhase.weightMod,
    evolutionForecast: forecastStr
  };
}

// 2. Adjust exercise reps and sets based on Week and Goal
export function adjustExerciseForWeek(
  exercise: ExerciseDefinition, 
  week: number, 
  goalStr: string = 'Hipertrofia Muscular'
): ExerciseDefinition {
  const goal = goalStr || 'Hipertrofia Muscular';
  
  // Create a clean shallow copy of the exercise to prevent accidental side effects
  const adjusted = { ...exercise };

  // Helper to parse existing reps to a number representation if needed, e.g. "8-12" -> 10, "15" -> 15, "5" -> 5
  const getBaseReps = (repStr: string): number => {
    const parts = repStr.split('-');
    if (parts.length === 2) {
      const min = parseInt(parts[0], 10) || 10;
      const max = parseInt(parts[1], 10) || 10;
      return Math.round((min + max) / 2);
    }
    const val = parseInt(repStr, 10);
    return isNaN(val) ? 10 : val;
  };

  // Skip adjusting elements like Cardio (which might be marked by sets: 1, reps: "15min")
  if (exercise.reps.includes('min') || exercise.reps.includes('s')) {
    return adjusted;
  }

  const baseSets = exercise.sets || 3;
  const baseRepsVal = getBaseReps(exercise.reps);

  if (goal.includes('Hipertrofia')) {
    switch (week) {
      case 1: // 3x10 (Adaptation)
        adjusted.sets = baseSets;
        adjusted.reps = `${baseRepsVal}`;
        break;
      case 2: // 4x10 (Volume +1 set)
        adjusted.sets = baseSets + 1;
        adjusted.reps = `${baseRepsVal}`;
        break;
      case 3: // 4x12 (Intensity: +1 set & +2 reps)
        adjusted.sets = baseSets + 1;
        adjusted.reps = `${baseRepsVal + 2}`;
        break;
      case 4: // Deload: 3x8 (reduced reps)
        adjusted.sets = Math.max(2, baseSets);
        adjusted.reps = `${Math.max(6, baseRepsVal - 2)}`;
        break;
    }
  } else if (goal.includes('Força')) {
    switch (week) {
      case 1: // 3x5
        adjusted.sets = baseSets;
        adjusted.reps = '5';
        break;
      case 2: // 4x5
        adjusted.sets = baseSets + 1;
        adjusted.reps = '5';
        break;
      case 3: // 4x3 (Heavy intensity overload, lower reps)
        adjusted.sets = baseSets + 1;
        adjusted.reps = '3';
        break;
      case 4: // Deload: 2x5 (very low volume)
        adjusted.sets = Math.max(2, baseSets - 1);
        adjusted.reps = '5';
        break;
    }
  } else if (goal.includes('Emagrecimento') || goal.includes('Definição')) {
    switch (week) {
      case 1: // 3x15
        adjusted.sets = baseSets;
        adjusted.reps = '15';
        break;
      case 2: // 4x15
        adjusted.sets = baseSets + 1;
        adjusted.reps = '15';
        break;
      case 3: // 4x20 (Acid buildup and muscular endurance peak)
        adjusted.sets = baseSets + 1;
        adjusted.reps = '20';
        break;
      case 4: // Deload: 3x12
        adjusted.sets = Math.max(2, baseSets);
        adjusted.reps = '12';
        break;
    }
  } else {
    // Condicionamento / Saúde
    switch (week) {
      case 1: // 3x12
        adjusted.sets = baseSets;
        adjusted.reps = '12';
        break;
      case 2: // 4x12
        adjusted.sets = baseSets + 1;
        adjusted.reps = '12';
        break;
      case 3: // 4x15
        adjusted.sets = baseSets + 1;
        adjusted.reps = '15';
        break;
      case 4: // Deload: 2x10
        adjusted.sets = Math.max(2, baseSets - 1);
        adjusted.reps = '10';
        break;
    }
  }

  return adjusted;
}
