const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminDiagnostics.tsx', 'utf8');

c = c.replace(
  /profiles\.forEach\(p => \{[\s\S]*?\}\);/,
  `profiles.forEach(p => {
        let isInvalid = false;
        if (!p.username) {
          missingUsername++;
          isInvalid = true;
        }
        if (!['user', 'moderator', 'admin'].includes(p.role)) {
          invalidRole++;
          isInvalid = true;
        }
        if (!['active', 'pending', 'suspended', 'banned'].includes(p.status)) {
          invalidStatus++;
          isInvalid = true;
        }
        
        // Check for missing core fields
        if (p.xp === undefined || p.avatar_level === undefined || !p.email || !p.equipped_cosmetics) {
          isInvalid = true;
        }
        
        if (isInvalid) {
          issues.push({ id: p.id, type: 'needs_normalization', user: p.name || p.email || p.id, profile: p });
        }
      });`
);

c = c.replace(
  /for \(const issue of results\.issues\) \{[\s\S]*?await updateDoc\(ref, updates\);\n      \}/,
  `for (const issue of results.issues) {
        const ref = doc(db, 'profiles', issue.id);
        const p = issue.profile;
        const updates: any = {};
        
        if (!p.username) {
           updates.username = 'user_' + issue.id.substring(0, 5).toLowerCase();
        }
        if (!p.name) {
           updates.name = p.username || updates.username || 'Explorador';
        }
        if (!['user', 'moderator', 'admin'].includes(p.role)) updates.role = 'user';
        if (!['active', 'pending', 'suspended', 'banned'].includes(p.status)) updates.status = 'active';
        if (p.xp === undefined) updates.xp = 0;
        if (p.avatar_level === undefined) updates.avatar_level = 1;
        if (p.streak === undefined) updates.streak = 0;
        if (p.total_tasks_completed === undefined) updates.total_tasks_completed = 0;
        if (!p.email) updates.email = (p.username || updates.username || issue.id) + '@evolux.app';
        if (!p.equipped_cosmetics) updates.equipped_cosmetics = { plan: 'base' };
        
        await updateDoc(ref, updates);
      }`
);

fs.writeFileSync('components/admin/AdminDiagnostics.tsx', c);
console.log("Diagnostics Patched!");
