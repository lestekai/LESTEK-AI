import fs from 'fs';
import path from 'path';
import { resolveExerciseMedia } from '../lib/exerciseResolver';
import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
    if (res.status === 200 || res.status === 405) return true;
    
    // retry with GET
    const resGet = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(3000) });
    return resGet.status === 200;
  } catch (e) {
    return false;
  }
}

async function run() {
  const validExercises = [];
  const removed = [];
  
  console.log(`Checking ${EXERCISE_LIBRARY.length} exercises...`);
  
  for (const ex of EXERCISE_LIBRARY) {
     const media = resolveExerciseMedia(ex.id, ex.gifPlaceholder || ex.name);
     if (media.type === 'placeholder' || !media.url || media.url === '' || media.url.startsWith('/')) {
        removed.push(ex.name);
     } else {
        validExercises.push(ex);
     }
  }

  const header = `export type ExerciseDefinition = {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment?: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  instructions: string;
  commonErrors?: string[];
  substitutions?: string[];
  gifPlaceholder?: string;
  gifUrl?: string;
};

export function findExerciseInLibrary(id: string): ExerciseDefinition | undefined {
  return EXERCISE_LIBRARY.find(ex => ex.id === id);
}

export function searchExercises(query: string, muscleFilter: string = "Todos", difficultyFilter: string = "Todas"): ExerciseDefinition[] {
  let results = EXERCISE_LIBRARY;
  if (muscleFilter !== "Todos") {
    results = results.filter(ex => ex.targetMuscles.includes(muscleFilter));
  }
  if (difficultyFilter !== "Todas") {
    results = results.filter(ex => ex.difficulty === difficultyFilter);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(ex => ex.name.toLowerCase().includes(q) || ex.targetMuscles.some(m => m.toLowerCase().includes(q)));
  }
  return results;
}

export const EXERCISE_LIBRARY: ExerciseDefinition[] = `;

  const finalContent = header + JSON.stringify(validExercises, null, 2) + ';\n';
  const libFile = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
  fs.writeFileSync(libFile, finalContent);

  console.log(`Kept ${validExercises.length}, Removed ${removed.length}`);
  fs.writeFileSync('removed_log.txt', removed.join('\n'));
}

run();
