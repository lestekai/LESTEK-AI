import fs from 'fs';
import path from 'path';
import { resolveExerciseMedia } from '../lib/exerciseResolver';
import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';

const validExercises = [];
let removed = [];

for (const ex of EXERCISE_LIBRARY) {
    const media = resolveExerciseMedia(ex.id, ex.gifPlaceholder || ex.name);
    if (media && media.url && media.url !== '' && !media.url.startsWith('/')) {
        validExercises.push(ex);
    } else {
        removed.push(ex.name);
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

export const EXERCISE_LIBRARY: ExerciseDefinition[] = `;

const finalContent = header + JSON.stringify(validExercises, null, 2) + ';\n';
const libFile = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
fs.writeFileSync(libFile, finalContent);

console.log(`Cleaned up! Removed ${removed.length} exercises from the library that had no valid DB gif.`);
if (removed.length < 50) console.log("Removed:", removed.join(", "));
