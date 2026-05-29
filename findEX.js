const fs = require('fs');
const db = JSON.parse(fs.readFileSync('generated/exercise-media-database.json', 'utf-8'));
const exercises = db.exercises;
for (const ex of exercises) {
  if (ex.canonicalName.toLowerCase().includes('abdut') || 
      ex.canonicalName.toLowerCase().includes('adutor') || 
      ex.canonicalName.toLowerCase().includes('gemeos') || 
      ex.canonicalName.toLowerCase().includes('gêmeos') || 
      ex.canonicalName.toLowerCase().includes('polia') || 
      ex.canonicalName.toLowerCase().includes('búlgaro') || 
      ex.canonicalName.toLowerCase().includes('bulgaro')) {
    console.log(ex.canonicalName, '|', ex.media.remote);
  }
}
