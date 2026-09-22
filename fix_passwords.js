const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  for (const d of snap.docs) {
    const data = d.data();
    if (data.visible_password === undefined) {
      console.log('Updating', d.id);
      await updateDoc(doc(db, 'profiles', d.id), {
        visible_password: 'Não registrada'
      });
    }
  }
  process.exit(0);
}
run();
