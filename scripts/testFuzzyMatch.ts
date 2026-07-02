import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';
import { EXERCISE_DATABASE } from '../lib/exerciseDatabase';
import { normalizeExerciseName } from '../lib/exerciseResolver';

let matched = 0;
for (const libEx of EXERCISE_LIBRARY) {
  const normLib = normalizeExerciseName(libEx.name);
  let found = EXERCISE_DATABASE.find(dbEx => 
    dbEx.normalizedName === normLib || dbEx.aliases.includes(normLib)
  );

  if (!found) {
    // Try fuzzy match
    found = EXERCISE_DATABASE.find(dbEx => {
       const dbNorm = dbEx.normalizedName;
       return dbNorm.includes(normLib) || normLib.includes(dbNorm);
    });
  }

  if (found) {
     matched++;
  } else {
     console.log("No match:", libEx.name);
  }
}
console.log("Matched", matched, "out of", EXERCISE_LIBRARY.length);
