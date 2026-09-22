const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  console.log("Total Profiles in AI Studio db:", snap.docs.length);
  snap.docs.forEach(d => {
    const data = d.data();
    console.log(`ID: ${d.id} | Email: ${data.email} | Name: ${data.name} | Role: ${data.role} | XP: ${data.xp}`);
  });
  process.exit(0);
}
run();
