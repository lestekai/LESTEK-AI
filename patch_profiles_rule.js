const fs = require('fs');
let c = fs.readFileSync('firestore.rules', 'utf8');

c = c.replace(
  /match \/profiles\/\{userId\} \{\n\s*allow read: if isSignedIn\(\);\n\s*allow create:/,
  "match /profiles/{userId} {\n      allow read: if isOwner(userId) || isAdmin();\n      allow create:"
);

fs.writeFileSync('firestore.rules', c);
console.log("Profiles rule patched!");
