const fs = require('fs');
let code = fs.readFileSync('app/workouts/active/page.tsx', 'utf8');

const lines = code.split('\n');
console.log(lines.slice(1795, 1820).map((l, i) => `${1795 + i}: ${l}`).join('\n'));
