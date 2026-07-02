import { EXERCISE_LIBRARY } from '../lib/exerciseLibrary';

const ids = EXERCISE_LIBRARY.map(e => e.id);
const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicates:', [...new Set(dups)]);
