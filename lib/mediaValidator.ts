import { EXERCISE_DATABASE } from './exerciseDatabase';
import { EXERCISE_LIBRARY } from './exerciseLibrary';

export type ValidationReport = {
  totalUniqueExercises: number;
  totalAliases: number;
  missingMedia: string[];
  duplicatedExercises: string[];
  brokenLinks: string[];
  conflictingAliases: string[];
  mediaCoveragePercent: number;
  totalFallbacksUsed: number;
};

/**
 * Validates the current state of the exercise database regarding media and duplicates.
 * This should generally be run offline or in an admin environment.
 */
export function validateExerciseDatabase(): ValidationReport {
  const masterList = EXERCISE_DATABASE;
  
  const report: ValidationReport = {
    totalUniqueExercises: masterList.length,
    totalAliases: 0,
    missingMedia: [],
    duplicatedExercises: [], // Identified by potential near-matches
    brokenLinks: [], 
    conflictingAliases: [],
    mediaCoveragePercent: 0,
    totalFallbacksUsed: 0
  };

  let validMediaCount = 0;

  const aliasMap = new Map<string, string>(); // alias -> canonicalName

  masterList.forEach((ex: any) => {
    report.totalAliases += ex.aliases.length;

    // Conflicting aliases
    ex.aliases.forEach((alias: string) => {
      if (aliasMap.has(alias) && aliasMap.get(alias) !== ex.canonicalName) {
        report.conflictingAliases.push(`${alias} is claimed by ${ex.canonicalName} and ${aliasMap.get(alias)}`);
      }
      aliasMap.set(alias, ex.canonicalName);
    });

    // Media
    const hasPrimary = !!ex.media.local;
    const hasFallback = !!ex.media.remote;
    
    if (hasPrimary || hasFallback) {
      validMediaCount++;
    } else {
      report.missingMedia.push(ex.canonicalName);
    }

    if (!hasPrimary && hasFallback) {
       report.totalFallbacksUsed++;
    }
  });

  report.mediaCoveragePercent = Math.round((validMediaCount / masterList.length) * 100);

  // Duplication heuristics
  const nameSet = new Set<string>();
  masterList.forEach((ex: any) => {
     const normalized = ex.aliases[0]; // The simplest normalized name
     if (nameSet.has(normalized)) {
        report.duplicatedExercises.push(ex.canonicalName);
     }
     nameSet.add(normalized);
  });

  return report;
}

export function detectMediaType(url: string | null | undefined): 'video' | 'image' | 'placeholder' | 'unknown' {
  if (!url) return 'unknown';
  if (url.includes('/anatomy/') || url.includes('/placeholder') || url.includes('/bodyPart/') || url.endsWith('.svg')) return 'placeholder';
  if (url.endsWith('.mp4') || url.endsWith('.webm')) return 'video';
  if (url.endsWith('.gif') || url.endsWith('.webp') || url.endsWith('.png') || url.endsWith('.jpg')) return 'image';
  return 'image'; // default assumption
}

export function getMediaSourcePriority(url: string | null | undefined): string {
  if (!url) return 'placeholder';
  if (url.startsWith('/')) return 'local-cdn';
  if (url.includes('gifdotreino.com')) return 'gifdotreino';
  if (url.includes('smartworkout.app')) return 'smartworkout';
  if (url.includes('storage.googleapis.com') || url.includes('firebasestorage.googleapis.com')) return 'storage';
  return 'external';
}
