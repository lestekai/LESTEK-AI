const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  /allow create: if isOwner\(userId\) && \(!\('role' in incoming\(\)\) \|\| incoming\(\)\.role == 'user'\) && \(!\('status' in incoming\(\)\) \|\| incoming\(\)\.status == 'active'\);/,
  "allow create: if (isOwner(userId) && (!('role' in incoming()) || incoming().role == 'user') && (!('status' in incoming()) || incoming().status == 'active')) || isAdmin();"
);

fs.writeFileSync('firestore.rules', rules);
console.log("Rules patched!");
