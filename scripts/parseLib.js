const fs = require('fs');
const content = fs.readFileSync('lib/exerciseLibrary.ts', 'utf-8');
const startIndex = content.indexOf('export const EXERCISE_LIBRARY');
const arrayStart = content.indexOf('[', startIndex);
const jsCode = content.substring(arrayStart);
// just use eval to parse it after stripping export
const codeToEval = jsCode.replace(/export\s+const\s+[^=]+=\s*/, '');
// Wait, we can't eval easily if it's TypeScript. Let's just write a script that compiles it with ts-node or just import it.
