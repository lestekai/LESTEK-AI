import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
let content = fs.readFileSync(file, 'utf8');

// The exported array looks like: export const EXERCISE_LIBRARY: ExerciseDefinition[] = [ ... ];
// We can just parse the json from it and then serialize back ??
// Wait, actually, let's just use string replace. But wait, we can require it, dedupe it, and write it formatting beautifully.
const { EXERCISE_LIBRARY } = require('../lib/exerciseLibrary.ts');

const unique = [];
const seenIds = new Set();
for (const ex of EXERCISE_LIBRARY) {
  if (!seenIds.has(ex.id)) {
    unique.push(ex);
    seenIds.add(ex.id);
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
  gifUrl?: string; // We will map this property
};

export const EXERCISE_LIBRARY: ExerciseDefinition[] = `;

const result = header + JSON.stringify(unique, null, 2) + `;\n`;
fs.writeFileSync(file, result);
console.log("Successfully deduped exerciseLibrary.ts");
