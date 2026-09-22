const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /xp: 0,\s*avatar_level: 1,\s*equipped_cosmetics/m,
  `xp: 0,
          avatar_level: 1,
          streak: 0,
          total_tasks_completed: 0,
          equipped_cosmetics`
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Admin Users create user patched!");
