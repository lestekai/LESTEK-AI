import fs from 'fs';
import path from 'path';

async function checkUrl(urlObj) {
  const https = require('https');
  const urlStr = urlObj.url;
  return new Promise((resolve) => {
    https.get(urlStr, (res) => {
      resolve({ url: urlStr, status: res.statusCode });
    }).on('error', () => resolve({ url: urlStr, status: 'error' }));
  });
}

async function run() {
  const { EXERCISE_LIBRARY } = require('../lib/exerciseLibrary.ts');
  const file = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
  
  let validCount = 0;
  let invalidCount = 0;
  for (const ex of EXERCISE_LIBRARY) {
    if (ex.gifUrl) {
      if (ex.gifUrl.includes('gifdotreino')) {
          const res = await checkUrl({url: ex.gifUrl});
          if (res.status === 404 || res.status === 'error') {
             delete ex.gifUrl;
             invalidCount++;
             console.log("Removed broken GIF:", ex.id);
          } else {
             validCount++;
          }
      } else {
          validCount++;
      }
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

  const result = header + JSON.stringify(EXERCISE_LIBRARY, null, 2) + ';\n';
  fs.writeFileSync(file, result);
  console.log("Validated. Kept " + validCount + ", removed " + invalidCount + " broken URLs.");
}

run();
