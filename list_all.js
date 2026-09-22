const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  snap.docs.forEach(d => {
    console.log(`ID: ${d.id}`, d.data().username, d.data().name);
  });
  process.exit(0);
}
run();
