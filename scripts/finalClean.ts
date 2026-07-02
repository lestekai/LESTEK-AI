import fs from 'fs';
import path from 'path';

// Read Library
const libFile = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
let libRaw = fs.readFileSync(libFile, 'utf8');

// Strip ALL gifUrl properties using regex just in case to force resolving via DB:
libRaw = libRaw.replace(/,\s*"gifUrl":\s*"[^"]+"/g, '');
fs.writeFileSync(libFile, libRaw);

// Re-import after stripping
const { EXERCISE_LIBRARY } = require('../lib/exerciseLibrary.ts');

const validExercises = [];
let removed = 0;

for (const ex of EXERCISE_LIBRARY) {
    const media = resolveExerciseMedia(ex.id, ex.gifPlaceholder || ex.name);
    // if the media is not a placeholder and has a remote url, it's valid
    if (media && media.url && !media.url.startsWith('/')) {
        validExercises.push(ex);
    } else {
        removed++;
        // console.log("Removing:", ex.name);
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
  gifUrl?: string; // Optional now, since we removed it
};

export const EXERCISE_LIBRARY: ExerciseDefinition[] = `;

const finalContent = header + JSON.stringify(validExercises, null, 2) + ';\n';
fs.writeFileSync(libFile, finalContent);

console.log(`Cleaned up! Removed ${removed} exercises from the library that had no valid DB gif.`);
