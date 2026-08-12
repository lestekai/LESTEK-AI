const fs = require('fs');
const file = 'components/admin/AdminDatabase.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the amber warning block
content = content.replace(
  /<div className="bg-amber-500\/10 border border-amber-500\/20 p-6 rounded-2xl">[\s\S]*?<\/div>/,
  ''
);

fs.writeFileSync(file, content);
console.log("Patched AdminDatabase!");
