const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminDatabase.tsx', 'utf8');

const regex = /<p className="text-sm text-text-secondary mb-4 leading-relaxed">[\s\S]*?<\/ul>\s*<\/div>/;
c = c.replace(regex, '');

fs.writeFileSync('components/admin/AdminDatabase.tsx', c);
console.log("Fixed");
