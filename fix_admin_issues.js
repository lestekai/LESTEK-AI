const fs = require('fs');

// 1. Fix AdminUsers.tsx undefined payload
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');
c = c.replace(
  /visible_password: editingUser\.password !== undefined \? editingUser\.password : editingUser\.visible_password,/g,
  "visible_password: editingUser.password !== undefined ? editingUser.password : (editingUser.visible_password || 'Não registrada'),"
);
fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("AdminUsers.tsx fixed");

// 2. Fix AdminOverview.tsx ResponsiveContainer
let o = fs.readFileSync('components/admin/AdminOverview.tsx', 'utf8');
o = o.replace(
  /<ResponsiveContainer width="100%" height="100%">/g,
  '<ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>'
);
fs.writeFileSync('components/admin/AdminOverview.tsx', o);
console.log("AdminOverview.tsx fixed");

// 3. Fix AdminAI.tsx ResponsiveContainer
let a = fs.readFileSync('components/admin/AdminAI.tsx', 'utf8');
a = a.replace(
  /<ResponsiveContainer width="100%" height="100%">/g,
  '<ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>'
);
fs.writeFileSync('components/admin/AdminAI.tsx', a);
console.log("AdminAI.tsx fixed");

