import { EXERCISE_DATABASE } from './exerciseDatabase';
import { EXERCISE_LIBRARY } from './exerciseLibrary';
import aliasesMapping from '../generated/aliases.json';
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

// Tokenizes terms while dropping general prepositions, articles, and connectors
export function getCleanTokens(text: string): string[] {
  if (!text) return [];
  const normalized = normalizeExerciseName(text);
  const stopwords = new Set([
    'de', 'do', 'da', 'em', 'para', 'com', 'no', 'na', 'o', 'a', 'os', 'as', 'e', 'um', 'uma', 'dos', 'das', 'no', 'na'
  ]);
  return normalized
    .split(/\s+/)
    .filter(token => token.length > 1 && !stopwords.has(token));
}

// Media failure cache tracking to avoid hitting 404s/broken images over and over
const _mediaFailureCache = new Set<string>();

const KNOWN_LOCAL_MP4 = [
  '/exercises/cardio/bicicleta-ergometrica',
  '/exercises/cardio/esteira',
  '/exercises/panturrilha/gemeos-sentado',
  '/exercises/posterior/stiff-com-barra',
  '/exercises/quadriceps/agachamento-livre',
  '/exercises/quadriceps/cadeira-extensora',
  '/exercises/quadriceps/leg-press-45',
];

export function markMediaAsFailed(url: string) {
  if (url) _mediaFailureCache.add(url);
}

export function hasMediaFailed(url: string): boolean {
  if (!url) return true;
  return _mediaFailureCache.has(url);
}

const MANUAL_ALIASES: Record<string, string> = {
  ...aliasesMapping,
  'spino reto com halteres': 'supino com halteres',
  'supino reto com halteres': 'supino com halteres',
  'pxada articlada': 'puxada alta com alavanca',
  'puxada articulada': 'puxada alta com alavanca',
  'spino declinado cabo': 'supino declinado no cabo',
  'supino declinado cabo': 'supino declinado no cabo',
  'spino declinado barra': 'supino declinado com barra',
  'supino declinado barra': 'supino declinado com barra',
  'spino declinado halter': 'supino declinado com halteres',
  'supino declinado halter': 'supino declinado com halteres',
  'spino declinado maquina': 'supino declinado na maquina smith',
  'spino declinado máqina': 'supino declinado na maquina smith',
  'supino declinado maquina': 'supino declinado na maquina smith',
  'crciixo halter': 'crucifixo no chao com halteres',
  'crucifixo halter': 'crucifixo no chao com halteres',
  'crciixo barra': 'crucifixo na maquina',
  'crucifixo barra': 'crucifixo na maquina',
  'crciixo máqina': 'crucifixo na maquina',
  'crucifixo maquina': 'crucifixo na maquina',
  'peck deck máqina': 'voador no pec deck',
  'peck deck maquina': 'voador no pec deck',
  'peck deck': 'voador no pec deck'
};

export function resolveExerciseMedia(exerciseNameOrId: string, fallbackMuscle?: string): ResolvedMedia {
  if (!exerciseNameOrId) {
    return {
      url: getBodyPartImageUrl(fallbackMuscle || '') || '',
      type: 'placeholder',
      sourcePriority: 'fallback'
    };
  }

  let normalizedInput = normalizeExerciseName(exerciseNameOrId);
  if (MANUAL_ALIASES[normalizedInput]) {
     normalizedInput = MANUAL_ALIASES[normalizedInput];
  } else if (MANUAL_ALIASES[exerciseNameOrId.toLowerCase()]) {
     normalizedInput = MANUAL_ALIASES[exerciseNameOrId.toLowerCase()];
  }
  
  // 1. Strict Search in Database
  let matchedExercise = EXERCISE_DATABASE.find(ex => 
    ex.normalizedName === normalizedInput || 
    ex.aliases.includes(normalizedInput) ||
    ex.canonicalName.toLowerCase() === normalizedInput
  );

  // Fallback to startsWith for highly similar basic names if exact fails
  if (!matchedExercise) {
     matchedExercise = EXERCISE_DATABASE.find(ex => {
        const dbNorm = ex.normalizedName;
        // only match if input starts with database name and the database name is significant
        if (dbNorm.length > 8 && normalizedInput.startsWith(dbNorm)) return true;
        // only match if input words exactly match database words in same order
        return false;
     });
  }

  // Fallback to adaptive token-based fuzzy overlap matching to resolve slightly rearranged,
  // renamed, or equipment-variant exercise entries safely without showing the blank mannequin.
  if (!matchedExercise) {
    const inputTokens = getCleanTokens(normalizedInput);
    if (inputTokens.length >= 2) {
      let bestScore = 0;
      let bestCandidate: any = null;

      for (const ex of EXERCISE_DATABASE) {
        // We match against both the canonical name and its aliases
        const candidateNames = [ex.canonicalName, ...(ex.aliases || [])];
        for (const candidateName of candidateNames) {
          const candidateTokens = getCleanTokens(candidateName);
          
          let overlap = 0;
          for (const token of inputTokens) {
            if (candidateTokens.includes(token)) {
              overlap++;
            }
          }

          // Score is relative to the input length to avoid long descriptive items matching short queries
          const score = overlap / inputTokens.length;

          // Require a substantial token match (e.g., at least 2 tokens and >= 60% of query tokens matched)
          if (score > bestScore && score >= 0.6 && overlap >= 2) {
            bestScore = score;
            bestCandidate = ex;
          }
        }
      }

      if (bestCandidate) {
        matchedExercise = bestCandidate;
      }
    }
  }

  if (matchedExercise) {
    let localUrl = matchedExercise.media.local;
    let localType: string = matchedExercise.media.type;

    if (localUrl) {
      // If the local file is physically one of the known high-perf MP4 videos,
      // rewrite extension to .mp4 and type to 'mp4' dynamically 
      // so we don't hit 404 for the legacy .gif mappings.
      const urlWithoutExtension = localUrl.replace(/\.[^/.]+$/, "");
      if (KNOWN_LOCAL_MP4.includes(urlWithoutExtension)) {
        localUrl = `${urlWithoutExtension}.mp4`;
        localType = 'mp4';
      }
    }

    // Use local if it's a real downloaded video/gif (not a generated svg placeholder)
    const isRealLocal = localUrl && !localUrl.endsWith('.svg');

    if (isRealLocal && !hasMediaFailed(localUrl)) {
      return {
        url: localUrl,
        type: localType === 'mp4' ? 'video' : 'image',
        sourcePriority: 'local'
      };
    }
    
    if (matchedExercise.media.remote && !hasMediaFailed(matchedExercise.media.remote)) {
       return {
        url: matchedExercise.media.remote,
        type: matchedExercise.media.remote.endsWith('.mp4') ? 'video' : 'image',
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
