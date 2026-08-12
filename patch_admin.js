const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = [
  'components/admin/AdminPlans.tsx',
  'components/admin/AdminFeedbacks.tsx',
  'components/admin/AdminNotifications.tsx',
  'components/admin/AdminLogs.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Remove orderBy from query if it targets created_at
  content = content.replace(/orderBy\('created_at',\s*'desc'\)/g, '');
  // Clean up empty commas like `query(collection(db, 'profiles'), )`
  content = content.replace(/,\s*\)/g, ')');
  fs.writeFileSync(file, content);
}
console.log("Patched!");
