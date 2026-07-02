const fs = require('fs');
let content = fs.readFileSync('./lib/exerciseLibrary.ts', 'utf8');

const regex = /,\s*"gifUrl":\s*"https:\/\/www\.gifdotreino\.com\/Exercicios\/Costas\/Remada%20Baixa\.gif"/g;
const newContent = content.replace(regex, '');

fs.writeFileSync('./lib/exerciseLibrary.ts', newContent);
console.log('Fixed remada baixa');
