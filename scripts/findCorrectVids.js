const fs = require('fs');
const content = fs.readFileSync('lib/exerciseLibrary.ts', 'utf-8');
const exercises = [];
const regex = /{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",[^}]*?"gifUrl":\s*"([^"]+)"\s*}/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  exercises.push({ id: match[1], name: match[2], url: match[3] });
}
console.log(exercises.filter(e => e.name.toLowerCase().includes('agachamento') || e.name.toLowerCase().includes('squat')).slice(0, 10));
console.log(exercises.filter(e => e.name.toLowerCase().includes('leg press')).slice(0, 10));
console.log(exercises.filter(e => e.name.toLowerCase().includes('stiff')).slice(0, 10));
console.log(exercises.filter(e => e.name.toLowerCase().includes('extens')).slice(0, 10));
console.log(exercises.filter(e => e.name.toLowerCase().includes('gêmeo') || e.name.toLowerCase().includes('panturrilh')).slice(0, 10));
console.log(exercises.filter(e => e.name.toLowerCase().includes('bicicleta') || e.name.toLowerCase().includes('bike')).slice(0, 10));
