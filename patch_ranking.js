const fs = require('fs');
let c = fs.readFileSync('app/ranking/page.tsx', 'utf8');

c = c.replace(
  /async function fetchRealUsers\(\) \{[\s\S]*?if \(data && !error\) \{/,
  `async function fetchRealUsers() {
      try {
        const q = query(collection(db, 'profiles'), orderBy('xp', 'desc'), limit(20));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data) {`
);
c = c.replace(
  /\s*\}\s*\}\s*fetchRealUsers\(\);/,
  `        }
      } catch (e) {
        console.warn("Ranking: O usuário não possui permissão para ver todos os perfis. As regras de segurança estão no modo Privado.");
      }
    }
    fetchRealUsers();`
);

fs.writeFileSync('app/ranking/page.tsx', c);
console.log("Ranking patched!");
