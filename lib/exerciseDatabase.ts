import generatedDb from '../generated/exercise-media-database.json';

export interface ExerciseMediaDatabaseItem {
  canonicalName: string;
  normalizedName: string;
  aliases: string[];
  muscleGroup: string;
  equipment: string;
  movementPattern: string;
  media: {
    local: string;
    remote: string;
    type: 'gif' | 'mp4' | 'image';
  };
  source: string;
}

export const EXERCISE_DATABASE: ExerciseMediaDatabaseItem[] = generatedDb.exercises as any;
