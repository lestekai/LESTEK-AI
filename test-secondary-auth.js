const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));

const app2 = initializeApp(config, 'SecondaryApp');
const auth2 = getAuth(app2);

// Try creating a fake user
createUserWithEmailAndPassword(auth2, 'testsecondary' + Date.now() + '@evolux.app', 'senha123')
  .then((cred) => {
    console.log("Success! Created user:", cred.user.uid);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
