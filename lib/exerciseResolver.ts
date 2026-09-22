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

const KNOWN_LOCAL_MP4: string[] = [
  '/exercises/panturrilha/panturrilhas-em-pe',
  '/exercises/panturrilha/gemeos-em-pe',
  '/exercises/panturrilha/gemeos-sentado',
  '/exercises/quadriceps/agachamento-livre',
  '/exercises/quadriceps/leg-press-45',
  '/exercises/quadriceps/cadeira-extensora',
  '/exercises/cardio/esteira',
  '/exercises/cardio/bicicleta-ergometrica',
  '/exercises/posterior/stiff-com-barra'
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
  'peck deck': 'voador no pec deck',
  'gemeos em pe': 'panturrilhas em pe',
  'gemeos em pe na maquina': 'panturrilhas em pe',
  'panturrilhas em pe na maquina': 'panturrilhas em pe',
  'panturrilha em pe': 'panturrilhas em pe',
  'panturrilha em pe na maquina': 'panturrilhas em pe',
  'elevacao de panturrilha em pe': 'panturrilhas em pe',
  'elevacao de panturrilha': 'panturrilhas em pe',
  'elevacao de gemeos': 'panturrilhas em pe',
  'elevacao de gemeos em pe': 'panturrilhas em pe',
  'gemeos sentado': 'gemeos sentado',
  'panturrilha sentado': 'gemeos sentado',
  'panturrilha sentada': 'gemeos sentado',
  'elevacao de panturrilha sentado': 'gemeos sentado',
  'abdominal': 'contracao abdominal',
  'abdominais': 'contracao abdominal',
  'abdominal crunch': 'contracao abdominal'
};

// Direct zero-latency local media cache for guaranteed immediate rendering
const DIRECT_LOCAL_MEDIA: Record<string, { url: string; type: 'video' | 'image'; sourcePriority: string }> = {
  'panturrilhas em pe': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'panturrilha em pe': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'panturrilhas em pe na maquina': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'panturrilha em pe na maquina': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'gemeos em pe': { url: '/exercises/panturrilha/gemeos-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'gemeos em pe na maquina': { url: '/exercises/panturrilha/gemeos-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'elevacao de panturrilha em pe': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'elevacao de panturrilha': { url: '/exercises/panturrilha/panturrilhas-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'elevacao de gemeos': { url: '/exercises/panturrilha/gemeos-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'elevacao de gemeos em pe': { url: '/exercises/panturrilha/gemeos-em-pe.mp4', type: 'video', sourcePriority: 'local' },
  'gemeos sentado': { url: '/exercises/panturrilha/gemeos-sentado.mp4', type: 'video', sourcePriority: 'local' },
  'panturrilha sentado': { url: '/exercises/panturrilha/gemeos-sentado.mp4', type: 'video', sourcePriority: 'local' },
  'panturrilha sentada': { url: '/exercises/panturrilha/gemeos-sentado.mp4', type: 'video', sourcePriority: 'local' },
  'elevacao de panturrilha sentado': { url: '/exercises/panturrilha/gemeos-sentado.mp4', type: 'video', sourcePriority: 'local' },
  'agachamento livre': { url: '/exercises/quadriceps/agachamento-livre.mp4', type: 'video', sourcePriority: 'local' },
  'agachamento': { url: '/exercises/quadriceps/agachamento-livre.mp4', type: 'video', sourcePriority: 'local' },
  'agachamento livre com barra': { url: '/exercises/quadriceps/agachamento-livre.mp4', type: 'video', sourcePriority: 'local' },
  'leg press 45': { url: '/exercises/quadriceps/leg-press-45.mp4', type: 'video', sourcePriority: 'local' },
  'leg press': { url: '/exercises/quadriceps/leg-press-45.mp4', type: 'video', sourcePriority: 'local' },
  'cadeira extensora': { url: '/exercises/quadriceps/cadeira-extensora.mp4', type: 'video', sourcePriority: 'local' },
  'extensora': { url: '/exercises/quadriceps/cadeira-extensora.mp4', type: 'video', sourcePriority: 'local' },
  'stiff com barra': { url: '/exercises/posterior/stiff-com-barra.mp4', type: 'video', sourcePriority: 'local' },
  'stiff': { url: '/exercises/posterior/stiff-com-barra.mp4', type: 'video', sourcePriority: 'local' },
  'esteira': { url: '/exercises/cardio/esteira.mp4', type: 'video', sourcePriority: 'local' },
  'bicicleta ergometrica': { url: '/exercises/cardio/bicicleta-ergometrica.mp4', type: 'video', sourcePriority: 'local' },
};

export function inferMuscleFromText(text: string): string {
  if (!text) return '';
  const norm = normalizeExerciseName(text);
  if (norm.includes('gemeos') || norm.includes('panturrilha') || norm.includes('panturrilhas')) return 'panturrilha';
  if (norm.includes('agachamento') || norm.includes('leg press') || norm.includes('extensora') || norm.includes('flexora') || norm.includes('stiff') || norm.includes('adutor') || norm.includes('abdutor') || norm.includes('passada') || norm.includes('afundo') || norm.includes('bulgaro')) return 'pernas';
  if (norm.includes('gluteo') || norm.includes('elevacao pelvica')) return 'gluteos';
  if (norm.includes('costas') || norm.includes('remada') || norm.includes('puxada') || norm.includes('dorsal') || norm.includes('barra fixa') || norm.includes('pulldown')) return 'costas';
  if (norm.includes('peito') || norm.includes('supino') || norm.includes('crucifixo') || norm.includes('flexao') || norm.includes('pec deck') || norm.includes('voador')) return 'peito';
  if (norm.includes('ombro') || norm.includes('desenvolvimento') || norm.includes('elevacao lateral') || norm.includes('elevacao frontal') || norm.includes('deltoide')) return 'ombros';
  if (norm.includes('biceps') || norm.includes('rosca')) return 'biceps';
  if (norm.includes('triceps') || norm.includes('frances') || norm.includes('testa') || norm.includes('mergulho')) return 'triceps';
  if (norm.includes('abdominal') || norm.includes('abs') || norm.includes('prancha') || norm.includes('crunch')) return 'abdomen';
  if (norm.includes('cardio') || norm.includes('esteira') || norm.includes('bicicleta')) return 'cardio';
  return '';
}

export function resolveExerciseMedia(exerciseNameOrId: string, fallbackMuscle?: string, secondaryIdentifier?: string): ResolvedMedia {
  if (!exerciseNameOrId && !secondaryIdentifier) {
    return {
      url: getBodyPartImageUrl(fallbackMuscle || '') || '',
      type: 'placeholder',
      sourcePriority: 'fallback'
    };
  }

  // Prioritize human-friendly name over arbitrary internal ID if both are available
  const isSyntheticId = (s?: string) => !s || s.startsWith('ex_') || s.startsWith('ex-') || /^[0-9a-f]{8}-/i.test(s);
  let inputToUse = exerciseNameOrId;
  if (isSyntheticId(exerciseNameOrId) && secondaryIdentifier && !isSyntheticId(secondaryIdentifier)) {
    inputToUse = secondaryIdentifier;
  } else if (!inputToUse && secondaryIdentifier) {
    inputToUse = secondaryIdentifier;
  }

  let normalizedInput = normalizeExerciseName(inputToUse);
  if (MANUAL_ALIASES[normalizedInput]) {
     normalizedInput = MANUAL_ALIASES[normalizedInput];
  } else if (inputToUse && typeof inputToUse === 'string' && MANUAL_ALIASES[inputToUse.toLowerCase()]) {
     normalizedInput = MANUAL_ALIASES[inputToUse.toLowerCase()];
  }

  // Check direct local media cache first for instant zero-latency loading
  if (DIRECT_LOCAL_MEDIA[normalizedInput] && !hasMediaFailed(DIRECT_LOCAL_MEDIA[normalizedInput].url)) {
    return { ...DIRECT_LOCAL_MEDIA[normalizedInput] };
  }
  
  // 1. Strict Search in Database
  let matchedExercise = EXERCISE_DATABASE.find(ex => 
    ex.normalizedName === normalizedInput || 
    (ex.aliases && Array.isArray(ex.aliases) && ex.aliases.includes(normalizedInput)) ||
    (ex.canonicalName && ex.canonicalName.toLowerCase() === normalizedInput)
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
  const libMatch = EXERCISE_LIBRARY.find(ex => ex.id === inputToUse || ex.id === exerciseNameOrId || normalizeExerciseName(ex.name) === normalizedInput);
  if (libMatch && libMatch.gifUrl && !hasMediaFailed(libMatch.gifUrl)) {
    return {
      url: libMatch.gifUrl,
      type: libMatch.gifUrl.endsWith('.mp4') ? 'video' : 'image',
      sourcePriority: 'library'
    };
  }

  // 1.8. If secondaryIdentifier is provided and differs from inputToUse, try it before falling back to placeholder
  if (secondaryIdentifier && secondaryIdentifier !== inputToUse) {
    const secondaryResolved = resolveExerciseMedia(secondaryIdentifier, fallbackMuscle);
    if (secondaryResolved.sourcePriority !== 'fallback') {
      return secondaryResolved;
    }
  }

  // 2. Absolute final fallback (Body part image or UI placeholder)
  const inferredMuscle = fallbackMuscle || inferMuscleFromText(inputToUse) || inferMuscleFromText(exerciseNameOrId) || (secondaryIdentifier ? inferMuscleFromText(secondaryIdentifier) : '') || matchedExercise?.muscleGroup || '';
  const fallbackUrl = getBodyPartImageUrl(inferredMuscle);
  return {
    url: fallbackUrl || '',
    type: 'placeholder',
    sourcePriority: 'fallback'
  };
}
