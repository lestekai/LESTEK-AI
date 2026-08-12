const fs = require('fs');
const file = 'components/admin/AdminUsers.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the "Criar Usuário" button
content = content.replace(
  /<button onClick=\{\(\) => setEditingUser\(\{ isNew: true, name: '', username: '', email: '', plan: 'base', role: 'user', status: 'pending', xp: 0, avatar_level: 1 \}\)\} className="px-4 py-2 bg-neon-purple text-text-primary rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">[\s\S]*?<\/button>/g,
  ''
);

fs.writeFileSync(file, content);
console.log("Patched AdminUsers!");
