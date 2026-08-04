const fs = require('fs');
let code = fs.readFileSync('app/login/page.tsx', 'utf8');

code = code.replace(
  /const safeUsername = username\.toLowerCase\(\)\.trim\(\)\.replace\(\/\[\^a-z0-9_.-]\/g, ''\);\n\s*const email = `\$\{safeUsername\}@evolux\.app`;/,
  `let email = '';
    if (username.includes('@')) {
      email = username.trim();
    } else {
      const safeUsername = username.toLowerCase().trim().replace(/[^a-z0-9_.-]/g, '');
      email = \`\${safeUsername}@evolux.app\`;
    }`
);

fs.writeFileSync('app/login/page.tsx', code);
