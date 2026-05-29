const fs = require('fs');
const db = JSON.parse(fs.readFileSync('generated/exercise-media-database.json', 'utf-8'));
const exercises = db.exercises;
for (const ex of exercises) {
  if (ex.canonicalName.toLowerCase().includes('abdom') && (ex.canonicalName.toLowerCase().includes('cabo') || ex.canonicalName.toLowerCase().includes('ajoelhad') || ex.canonicalName.toLowerCase().includes('corda'))) {
    console.log(ex.canonicalName, '|', ex.media.remote);
  }
}
