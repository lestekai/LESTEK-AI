const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /await updateDoc\(doc\(db, 'profiles', editingUser.id\), \{[\s\S]*?\}\);/,
  `await updateDoc(doc(db, 'profiles', editingUser.id), {
        name: editingUser.name || '',
        username: editingUser.username || '',
        email: editingUser.email || '',
        role: editingUser.role || 'user',
        status: editingUser.status || 'active',
        xp: parseInt(editingUser.xp) || 0,
        avatar_level: parseInt(editingUser.avatar_level) || 1,
        equipped_cosmetics: {
          ...(editingUser.equipped_cosmetics || {}),
          plan: editingUser.plan || editingUser.equipped_cosmetics?.plan || 'base'
        }
      });`
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Patched AdminUsers Update!");
