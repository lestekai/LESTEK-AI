const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, '(default)');

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  snap.docs.forEach(d => {
    const data = d.data();
    if (data.name === 'LuisTST' || data.username === 'LuisTST' || data.email === 'lestek.sup@gmail.com') {
      console.log(`ID: ${d.id} | Email: ${data.email} | Name: ${data.name} | Username: ${data.username} | Role: ${data.role} | XP: ${data.xp}`);
    }
  });
  process.exit(0);
}
run();
