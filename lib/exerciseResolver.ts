import { normalizeText } from './utils';
import { EXERCISE_DATABASE } from './exerciseDatabase';
import { EXERCISE_LIBRARY } from './exerciseLibrary';
import { getBodyPartImageUrl } from './utils';

export type ResolvedMedia = {
  url: string;
  type: 'video' | 'image' | 'placeholder';
  sourcePriority: string;
};

// Extremely simple and fast normalized match
export function normalizeExerciseName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize('NFD') // Decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accentes
    .replace(/[-_()]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

// Media failure cache tracking to avoid hitting 404s/broken images over and over
const _mediaFailureCache = new Set<string>();

export function markMediaAsFailed(url: string) {
  if (url) _mediaFailureCache.add(url);
}

export function hasMediaFailed(url: string): boolean {
  if (!url) return true;
  return _mediaFailureCache.has(url);
}

export function resolveExerciseMedia(exerciseNameOrId: string, fallbackMuscle?: string): ResolvedMedia {
  if (!exerciseNameOrId) {
    return {
      url: getBodyPartImageUrl(fallbackMuscle || '') || '',
      type: 'placeholder',
      sourcePriority: 'fallback'
    };
  }

  const normalizedInput = normalizeExerciseName(exerciseNameOrId);
  
  // 1. Strict Search in Database
  const matchedExercise = EXERCISE_DATABASE.find(ex => 
    ex.normalizedName === normalizedInput || 
    ex.aliases.includes(normalizedInput) ||
    ex.canonicalName.toLowerCase() === normalizedInput
  );

  if (matchedExercise) {
    // Priority: Local -> Remote -> Fallback
    if (matchedExercise.media.local && !hasMediaFailed(matchedExercise.media.local)) {
      return {
        url: matchedExercise.media.local,
        type: matchedExercise.media.type === 'mp4' ? 'video' : 'image',
        sourcePriority: 'local'
      };
    }
    
    if (matchedExercise.media.remote && !hasMediaFailed(matchedExercise.media.remote)) {
       return {
        url: matchedExercise.media.remote,
        type: matchedExercise.media.type === 'mp4' ? 'video' : 'image',
        sourcePriority: matchedExercise.source
      };
    }
  }

  // 1.5. Check standard library for hardcoded gifUrls
  const libMatch = EXERCISE_LIBRARY.find(ex => ex.id === exerciseNameOrId || normalizeExerciseName(ex.name) === normalizedInput);
  if (libMatch && libMatch.gifUrl && !hasMediaFailed(libMatch.gifUrl)) {
    return {
      url: libMatch.gifUrl,
      type: libMatch.gifUrl.endsWith('.mp4') ? 'video' : 'image',
      sourcePriority: 'library'
    };
  }

  // 2. Absolute final fallback (Body part image or UI placeholder)

  const fallbackUrl = getBodyPartImageUrl(fallbackMuscle || matchedExercise?.muscleGroup || '');
  return {
    url: fallbackUrl || '',
    type: 'placeholder',
    sourcePriority: 'fallback'
  };
}
