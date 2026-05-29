import fs from 'fs';
import path from 'path';
import https from 'https';
import { normalizeExerciseName } from '../lib/exerciseResolver';

const OUT_DIR = path.join(process.cwd(), 'generated');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const DB_PATH = path.join(OUT_DIR, 'exercise-media-database.json');

const folderToMuscle: Record<string, string> = {
  'Antebraços': 'antebraço',
  'Bíceps': 'biceps',
  'Calistenia': 'corpo-todo',
  'Cardio': 'cardio',
  'Costas': 'costas',
  'Crossfit': 'corpo-todo',
  'Eretor Lombar': 'posterior',
  'Funcional e HIT': 'corpo-todo',
  'Glúteos': 'gluteos',
  'Mobilidade': 'corpo-todo',
  'Ombros': 'ombro',
  'Panturrilhas': 'panturrilha',
  'Peitoral': 'peito',
  'Pernas': 'quadriceps',
  'Trapézio': 'costas',
  'Tríceps': 'triceps'
};

async function fetchGifDoTreinoPage(page: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    https.get(`https://www.gifdotreino.com/search_gifs.php?q=&page=${page}`, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Starting massive import from GifDoTreino...');
  
  // Load existing database
  let db = { exercises: [] as any[], aliases: {} as any, stats: { totalExercises: 0, totalMedia: 0, duplicatedResolved: 0, unresolvedExercises: 0, invalidMedia: 0 } };
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  }

  const nameSet = new Set<string>();
  for (const ex of db.exercises) {
    nameSet.add(ex.normalizedName);
    ex.aliases.forEach((a: string) => nameSet.add(a));
  }

  let page = 1;
  let hasMore = true;
  let importedCount = 0;

  while (hasMore) {
    const items = await fetchGifDoTreinoPage(page);
    if (items.length === 0) {
      hasMore = false;
      break;
    }

    for (const item of items) {
      const canonicalName = item.name.trim();
      const normName = normalizeExerciseName(canonicalName);
      
      if (nameSet.has(normName)) {
        db.stats.duplicatedResolved++;
        continue;
      }
      
      nameSet.add(normName);

      // Extract muscle group from path: Exercicios/Glúteos/Abdução...
      const parts = item.path.split('/');
      const folder = parts.length > 1 ? parts[1] : 'Funcional e HIT';
      const mGroup = folderToMuscle[folder] || 'outros';
      
      const remoteUrl = `https://www.gifdotreino.com/${item.path.split('/').map(encodeURIComponent).join('/')}`;
      const ext = item.path.endsWith('.mp4') ? 'mp4' : 'gif';
      
      const newEx = {
        canonicalName,
        normalizedName: normName,
        aliases: [normName],
        muscleGroup: mGroup,
        equipment: 'desconhecido',
        movementPattern: 'unknown',
        media: {
          local: `/exercises/${mGroup}/${normName.replace(/\s+/g, '-')}.${ext}`,
          remote: remoteUrl,
          type: ext
        },
        source: 'gifdotreino'
      };

      db.exercises.push(newEx);
      db.aliases[normName] = canonicalName;
      importedCount++;
      db.stats.totalMedia++;
    }

    console.log(`Page ${page} processed. Imported ${items.length} items. Total: ${db.exercises.length}`);
    page++;
  }

  db.stats.totalExercises = db.exercises.length;
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  console.log('Import finished.');
  console.log(`Total exercises: ${db.stats.totalExercises}`);
  console.log(`Duplicated/Skipped: ${db.stats.duplicatedResolved}`);
  console.log(`Total Media: ${db.stats.totalMedia}`);
}

run();
