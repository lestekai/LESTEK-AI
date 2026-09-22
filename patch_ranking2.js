const fs = require('fs');
let c = fs.readFileSync('app/ranking/page.tsx', 'utf8');

c = c.replace(
  /\} \}\s*if \(activeTab === 'global'\)/,
  `      }
    } catch (e) {
      console.warn("Ranking: O usuário não possui permissão para ver todos os perfis. As regras de segurança estão no modo Privado.");
    }
  }

  if (activeTab === 'global') {`
);

fs.writeFileSync('app/ranking/page.tsx', c);
console.log("Ranking patched again!");
