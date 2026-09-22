const fs = require('fs');
let c = fs.readFileSync('app/ranking/page.tsx', 'utf8');

c = c.replace(
  /async function fetchRealUsers\(\) \{[\s\S]*?\}\s*if \(activeTab === 'global'\) \{/m,
  `async function fetchRealUsers() {
      try {
        const q = query(collection(db, 'profiles'), orderBy('xp', 'desc'), limit(20));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data) {
          setRealUsers(data.map((p: any) => {
             const equippedList = Object.values(p.equipped_cosmetics || {});
             const cosmeticAura = COSMETICS.find(c => equippedList.includes(c.id) && c.type === 'aura');
             
             return {
               id: p.id,
               name: p.name || p.username || 'Explorador',
               streak: p.streak || 0,
               xp: p.xp || 0,
               tasksCompleted: p.total_tasks_completed || 0,
               level: p.avatar_level || 1,
               isMe: p.id === profile?.id,
               planets: calculatePlanets(p.streak || 0),
               badges: (p.avatar_level >= 11 ? ['epic', 'legendary'] : p.avatar_level >= 5 ? ['rare', 'epic'] : p.avatar_level >= 3 ? ['rare'] : []),
               aura: cosmeticAura?.color || 'rgba(0,240,255,0.2)',
               plan: p.equipped_cosmetics?.plan || p.plan || 'base',
               score: p.xp || 0
             };
          }));
        }
      } catch (e) {
        console.warn("Ranking: O usuário não possui permissão para ver todos os perfis. As regras de segurança estão no modo Privado.");
      }
    }

    if (activeTab === 'global') {`
);

fs.writeFileSync('app/ranking/page.tsx', c);
console.log("Ranking 3 patched!");
