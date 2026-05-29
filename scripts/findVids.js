const fs = require('fs');
const templatesFile = fs.readFileSync('lib/exerciseLibrary.ts', 'utf-8');

const regex = /name\s*:\s*['"]([^'"]+)['"][^}]*?gifUrl\s*:\s*['"]([^'"]+)['"]/gs;
let match;
const results = [];
while ((match = regex.exec(templatesFile)) !== null) {
   const name = match[1];
   if (name.match(/agachamento|leg press|stiff|cadeira|gemeos|gêmeos|bicicleta/i)) {
      results.push(name + " => " + match[2]);
   }
}
console.log(results.join('\n'));
