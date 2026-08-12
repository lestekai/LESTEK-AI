const fs = require('fs');

function injectSort(file, setVar, mapLine) {
  let content = fs.readFileSync(file, 'utf8');
  
  const sortLogic = `
      data.sort((a, b) => {
        const getMs = (val) => {
          if (!val) return 0;
          if (val.toMillis) return val.toMillis();
          if (val.seconds) return val.seconds * 1000;
          const parsed = new Date(val).getTime();
          return isNaN(parsed) ? 0 : parsed;
        };
        return getMs(b.created_at) - getMs(a.created_at);
      });
`;
  
  if (content.includes('data.sort((a, b) =>')) return; // Already patched
  
  content = content.replace(mapLine, mapLine + sortLogic);
  fs.writeFileSync(file, content);
}

injectSort('components/admin/AdminFeedbacks.tsx', 'setFeedbacks', '        return { id: d.id, ...fb, profiles: fb.user_id ? { name: profiles[fb.user_id]?.name, username: profiles[fb.user_id]?.username } : null };\n      });');
injectSort('components/admin/AdminPlans.tsx', 'setUsers', "const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));");
injectSort('components/admin/AdminNotifications.tsx', 'setNotifications', "const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));");
injectSort('components/admin/AdminLogs.tsx', 'setLogs', "const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));");

console.log("Sorts injected!");
