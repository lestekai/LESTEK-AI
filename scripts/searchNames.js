const fs = require('fs');
const content = fs.readFileSync('lib/templates.ts', 'utf-8');
const names = [...content.matchAll(/"name"\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log([...new Set(names.filter(n => n.toLowerCase().includes('leg')))].join('\n'));
console.log([...new Set(names.filter(n => n.toLowerCase().includes('agachamento')))].join('\n'));
console.log([...new Set(names.filter(n => n.toLowerCase().includes('stiff')))].join('\n'));
console.log([...new Set(names.filter(n => n.toLowerCase().includes('extensor')))].join('\n'));
console.log([...new Set(names.filter(n => n.toLowerCase().includes('gemeo')))].join('\n'));
console.log([...new Set(names.filter(n => n.toLowerCase().includes('panturrilha')))].join('\n'));
