const fs = require('fs');
const db = JSON.parse(fs.readFileSync('generated/exercise-media-database.json', 'utf-8'));
const exercises = db.exercises;
for (const ex of exercises) {
  if (ex.canonicalName.toLowerCase().includes('adu')) {
    console.log(ex.canonicalName, '|', ex.media.remote);
  }
}
