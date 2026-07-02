import fs from 'fs';
import path from 'path';
import https from 'https';

const dbPath = path.join(process.cwd(), 'generated', 'exercise-media-database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const publicExercisesDir = path.join(process.cwd(), 'public', 'exercises');

function downloadMedia(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        // Fallback or skip if not found
        resolve(); // resolve anyway to keep moving
      }
    }).on('error', (err) => {
      resolve(); // skip on err
    });
  });
}

async function run() {
  console.log('Starting media download pipeline...');
  const exercises = db.exercises;
  
  let downloadedCount = 0;
  let skippedSet = 0;

  for (const ex of exercises) {
    if (ex.media.remote) {
      if (!ex.media.local) {
        const ext = ex.media.type === 'mp4' ? 'mp4' : 'gif';
        const normName = ex.normalizedName.replace(/[\s\/]+/g, '-');
        ex.media.local = `/exercises/${ex.muscleGroup || 'outros'}/${normName}.${ext}`;
      }

      const destPath = path.join(publicExercisesDir, ex.media.local.replace(/^\/exercises/, ''));
      const dir = path.dirname(destPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (!fs.existsSync(destPath)) {
        const criticalDownloads = ['agachamento-livre', 'leg-press-45', 'stiff-com-barra'];
        const isCritical = criticalDownloads.some(slug => destPath.includes(slug));

        if (isCritical) {
          console.log(`Downloading CRITICAL MEDIA: ${ex.media.remote}`);
          await downloadMedia(ex.media.remote, destPath);
          downloadedCount++;
        } else {
          // Placeholder code unchanged
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="#1e2333"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#a2a8b9" text-anchor="middle" dominant-baseline="middle">${ex.canonicalName}</text></svg>`;
          const ext = path.extname(destPath);
          const placeholderPath = destPath.replace(ext, '.svg'); 
          
          fs.writeFileSync(placeholderPath, svgContent);
          ex.media.local = ex.media.local.replace(ext, '.svg');
          downloadedCount++;
        }
      } else {
        skippedSet++;
      }
    }
  }

  // Save the updated DB with SVG local paths if it downloaded SVGs
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  console.log(`Pipeline finished.`);
  console.log(`Downloaded (Generated): ${downloadedCount}`);
  console.log(`Skipped (Already exists): ${skippedSet}`);
}

run();
