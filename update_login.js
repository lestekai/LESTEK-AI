const fs = require('fs');
let c = fs.readFileSync('app/login/page.tsx', 'utf8');

c = c.replace(
  /equipped_cosmetics: \{ plan: 'base' \},/g,
  "equipped_cosmetics: { plan: 'base' },\n            visible_password: password,"
);

fs.writeFileSync('app/login/page.tsx', c);
console.log("Login updated");
