const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  const docSnap = await getDoc(doc(db, 'profiles', 'xGdkWrx8LdghlTux1knrCIvXOlo1'));
  if (docSnap.exists()) {
    console.log("Found in AI Studio DB:", docSnap.data());
  } else {
    console.log("NOT FOUND IN AI STUDIO DB!");
  }
  
  const db2 = getFirestore(app, '(default)');
  const docSnap2 = await getDoc(doc(db2, 'profiles', 'xGdkWrx8LdghlTux1knrCIvXOlo1'));
  if (docSnap2.exists()) {
    console.log("Found in (default) DB:", docSnap2.data());
  } else {
    console.log("NOT FOUND IN (DEFAULT) DB!");
  }
  process.exit(0);
}
run();
