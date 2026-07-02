import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

function checkUrl(urlStr: string): Promise<{url: string, status: number | 'error'}> {
  return new Promise((resolve) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, (res) => {
      // Drain response
      res.on('data', () => {});
      res.on('end', () => resolve({ url: urlStr, status: res.statusCode }));
    }).on('error', () => resolve({ url: urlStr, status: 'error' }))
    .setTimeout(3000, () => resolve({ url: urlStr, status: 'error' }));
  });
}

async function run() {
  const file = path.join(process.cwd(), 'generated', 'exercise-media-database.json');
  const db = require('../generated/exercise-media-database.json');
  
  const toCheck = [];
  const urlToRefs = new Map<string, any[]>();
  
  // Collect all unique urls
  for (const ex of db.exercises) {
    if (ex.media.remote && ex.media.remote.includes('gifdotreino')) {
        if (!urlToRefs.has(ex.media.remote)) {
            urlToRefs.set(ex.media.remote, []);
            toCheck.push(ex.media.remote);
        }
        urlToRefs.get(ex.media.remote).push(ex);
    }
  }

  console.log(`Checking ${toCheck.length} urls...`);
  
  const results = [];
  const concurrency = 20;
  for (let i = 0; i < toCheck.length; i += concurrency) {
      const batch = toCheck.slice(i, i + concurrency);
      const batchRes = await Promise.all(batch.map(url => checkUrl(url)));
      results.push(...batchRes);
      if (i % 100 === 0) console.log(`Progress: ${i}/${toCheck.length}`);
  }

  let broken = 0;
  for (const r of results) {
     if (r.status === 404 || r.status === 'error' || r.status >= 400) {
        broken++;
        const refs = urlToRefs.get(r.url);
        if (refs) {
            for (const ex of refs) {
               // Erase broken remote
               delete ex.media.remote;
               // Wait, if we delete remote, we might just fallback.
            }
        }
     }
  }

  fs.writeFileSync(file, JSON.stringify(db, null, 2));
  console.log(`Validated DB. Removed ${broken} broken URLs.`);
}

run();
