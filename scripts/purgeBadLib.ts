import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { resolveExerciseMedia } from '../lib/exerciseResolver';
import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve({ url: urlStr, status: res.statusCode }));
    }).on('error', () => resolve({ url: urlStr, status: 'error' }))
    .setTimeout(3500, () => resolve({ url: urlStr, status: 'error' }));
  });
}

async function run() {
  const libFile = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
  const validExercises = [];
  const removedNames = [];
  const checked = new Map();

  console.log(`Checking ${EXERCISE_LIBRARY.length} urls...`);
  
  const concurrency = 20;
  for (let i = 0; i < EXERCISE_LIBRARY.length; i += concurrency) {
      const batch = EXERCISE_LIBRARY.slice(i, i + concurrency);
      
      await Promise.all(batch.map(async ex => {
          const media = resolveExerciseMedia(ex.id, ex.gifPlaceholder || ex.name);
          const urlStr = media?.url;
          if (!urlStr || urlStr.startsWith('/')) {
              removedNames.push(ex.name);
              return;
          }
          
          let isValid = false;
          if (checked.has(urlStr)) {
              isValid = checked.get(urlStr);
          } else {
              const res = await checkUrl(urlStr);
              isValid = res.status === 200;
              checked.set(urlStr, isValid);
          }

          if (isValid) {
              validExercises.push(ex);
          } else {
              removedNames.push(ex.name);
          }
      }));

      if (i % 100 === 0) console.log(`Progress: ${Math.min(i + concurrency, EXERCISE_LIBRARY.length)}/${EXERCISE_LIBRARY.length}`);
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
  fs.writeFileSync(libFile, finalContent);

  console.log(`Validated DB. Removed ${removedNames.length} broken/placeholder exercises.`);
  const sample = removedNames.slice(0, 10);
  if (sample.length > 0) console.log("Some removed:", sample.join(", "));
}

run();
