const fs = require('fs');
let c = fs.readFileSync('lib/firebase.ts', 'utf8');

if (!c.includes('export const getSecondaryAuth')) {
  c += `

export const getSecondaryAuth = () => {
  const apps = getApps();
  let secondaryApp = apps.find(a => a.name === 'SecondaryApp');
  if (!secondaryApp) {
    secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
  }
  return getAuth(secondaryApp);
};
`;
  fs.writeFileSync('lib/firebase.ts', c);
  console.log("Firebase patched!");
}
