const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  let found = false;
  for (const d of snap.docs) {
    const data = d.data();
    if (data.username === 'testuser123' || data.name === 'Test User' || data.email === 'testuser1@example.com') {
      console.log(`Found matching profile. ID: ${d.id}, Username: ${data.username}, Name: ${data.name}`);
      await deleteDoc(doc(db, 'profiles', d.id));
      console.log("Deleted successfully.");
      found = true;
    }
  }
  
  if (!found) {
    console.log("Profile not found. It might have already been removed or the username is slightly different.");
  }
  process.exit(0);
}
run();
