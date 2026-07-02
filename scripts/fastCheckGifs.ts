import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve({ url: urlStr, status: res.statusCode }));
    }).on('error', () => resolve({ url: urlStr, status: 'error' }))
    .setTimeout(2500, () => resolve({ url: urlStr, status: 'error' }));
  });
}

async function run() {
  let { EXERCISE_LIBRARY } = require('../lib/exerciseLibrary.ts');
  const file = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
  
  const checked = new Map();
  console.log(`Checking ${EXERCISE_LIBRARY.length} exercises for broken gifUrls...`);

  let removedGifUrlCount = 0;
  const batchSize = 10;
  for (let i = 0; i < EXERCISE_LIBRARY.length; i += batchSize) {
    const batch = EXERCISE_LIBRARY.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (ex) => {
      if (ex.gifUrl) {
         if (ex.gifUrl.startsWith('/')) return; // ignore local

         let isValid = false;
         if (checked.has(ex.gifUrl)) {
           isValid = checked.get(ex.gifUrl);
         } else {
           const res = await checkUrl(ex.gifUrl);
           isValid = res.status === 200;
           checked.set(ex.gifUrl, isValid);
         }

         if (!isValid) {
            delete ex.gifUrl;
            removedGifUrlCount++;
         }
      }
    }));

    console.log(`Progress: ${Math.min(i + batchSize, EXERCISE_LIBRARY.length)}/${EXERCISE_LIBRARY.length}`);
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

  const contentStr = header + JSON.stringify(EXERCISE_LIBRARY, null, 2) + ';\n';
  fs.writeFileSync(file, contentStr);
  
  console.log(`Removed broken gifUrl from ${removedGifUrlCount} items.`);
}

run();
