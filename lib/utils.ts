import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBodyPartImageUrl(muscle: string): string | null {
  if (!muscle) return null;
  const cleanMuscle = muscle.toLowerCase().trim();
  
  if (cleanMuscle.includes('cardio') || cleanMuscle.includes('esteira') || cleanMuscle.includes('bicicleta') || cleanMuscle.includes('elíptico')) return null;

  // Mapping patterns rather than strict equality
  if (cleanMuscle.includes('peit')) return 'https://smartworkout.app/assets/images/bodyPart/chest_male_dark.png';
  if (cleanMuscle.includes('costas') || cleanMuscle.includes('dorsal')) return 'https://smartworkout.app/assets/images/bodyPart/back_male_dark.png';
  if (cleanMuscle.includes('ombr') || cleanMuscle.includes('delto')) return 'https://smartworkout.app/assets/images/bodyPart/shoulders_male_dark.png';
  if (cleanMuscle.includes('pern') || cleanMuscle.includes('coxa') || cleanMuscle.includes('panturrilha') || cleanMuscle.includes('quad')) return 'https://smartworkout.app/assets/images/bodyPart/legs_male_dark.png';
  if (cleanMuscle.includes('glúte') || cleanMuscle.includes('glute')) return 'https://smartworkout.app/assets/images/bodyPart/gluteus_male_dark.png';
  if (cleanMuscle.includes('bíc') || cleanMuscle.includes('bic')) return 'https://smartworkout.app/assets/images/bodyPart/biceps_male_dark.png';
  if (cleanMuscle.includes('tríc') || cleanMuscle.includes('tric')) return 'https://smartworkout.app/assets/images/bodyPart/triceps_male_dark.png';
  if (cleanMuscle.includes('braç') || cleanMuscle.includes('brac')) return 'https://smartworkout.app/assets/images/bodyPart/biceps_male_dark.png';
  if (cleanMuscle.includes('antebraç') || cleanMuscle.includes('antebr')) return 'https://smartworkout.app/assets/images/bodyPart/forearms_male_dark.png';
  if (cleanMuscle.includes('abd') || cleanMuscle.includes('core')) return 'https://smartworkout.app/assets/images/bodyPart/abs_male_dark.png';
  
  // If no match but it evaluates to "Corpo Todo"
  return 'https://smartworkout.app/assets/images/bodyPart/chest_male_dark.png'; // default fallback that is wider
}
