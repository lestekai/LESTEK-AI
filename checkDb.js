const fs = require('fs');
const db = JSON.parse(fs.readFileSync('generated/exercise-media-database.json', 'utf8'));
const exercisesToFind = [
  "Supino reto barra",
  "Supino reto halter",
  "Supino reto máquina",
  "Supino reto cabo",
  // and some more to see if they exist
];
const found = {};
db.exercises.forEach(ex => {
  if(ex.canonicalName.toLowerCase().includes('supino reto')) {
    console.log("Supino reto match: " + ex.canonicalName + " -> " + ex.media.remote);
  }
});
