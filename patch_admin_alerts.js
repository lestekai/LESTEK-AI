const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /const authError = new Error\('Admin createUser is not supported on Firebase Client SDK'\);/g,
  "const authError = new Error('A criação de usuários por administradores exige integração com o Firebase Admin SDK (Requer Chave Privada no ambiente). Por segurança, o Client SDK bloqueia.');"
);

c = c.replace(
  /const error = new Error\('Admin password update is not supported on Firebase Client SDK'\);/g,
  "const error = new Error('A alteração de senhas por administradores exige integração com o Firebase Admin SDK (Requer Chave Privada). O Client SDK bloqueia por segurança.');"
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Alerts patched!");
