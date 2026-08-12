const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('firebase-applet-config.json'));
const app = initializeApp(config);
const db = getFirestore(app);

async function check() {
  const snap = await getDocs(collection(db, 'profiles'));
  snap.forEach(doc => {
    console.log(doc.id, doc.data().email, doc.data().name, doc.data().role);
  });
  process.exit(0);
}
check().catch(e => { console.error(e); process.exit(1); });
