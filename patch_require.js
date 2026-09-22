const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminDiagnostics.tsx', 'utf8');

c = c.replace(
  /import \{ collection, getDocs, doc, updateDoc \} from 'firebase\/firestore';/,
  "import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';"
);

c = c.replace(
  /const \{ setDoc \} = require\('firebase\/firestore'\);/,
  ""
);

fs.writeFileSync('components/admin/AdminDiagnostics.tsx', c);
console.log("Fixed require");
