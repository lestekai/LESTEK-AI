import fs from 'fs';
import path from 'path';

const libFile = path.join(process.cwd(), 'lib', 'exerciseLibrary.ts');
let libRaw = fs.readFileSync(libFile, 'utf8');

// Strip ALL gifUrl properties using regex just in case to force resolving via DB:
libRaw = libRaw.replace(/,\s*"gifUrl":\s*"[^"]+"/g, '');
fs.writeFileSync(libFile, libRaw);
console.log('Stripped gifUrl');
