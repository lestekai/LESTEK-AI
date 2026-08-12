const fs = require('fs');
const files = [
  'components/admin/AdminNotifications.tsx',
  'components/admin/AdminLogs.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/, ,/g, ',');
  fs.writeFileSync(file, content);
}
console.log("Commas patched!");
