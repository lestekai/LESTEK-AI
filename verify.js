const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);
async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  console.log("Current DB profiles:");
  snap.docs.forEach(d => console.log(d.id, d.data().email));
  process.exit(0);
}
run();
