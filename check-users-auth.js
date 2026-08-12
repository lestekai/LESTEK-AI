const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const configStr = fs.readFileSync('firebase-applet-config.json', 'utf8');
const config = JSON.parse(configStr);

const firebaseConfig = {
  projectId: config.projectId,
  apiKey: config.apiKey,
  authDomain: config.authDomain
};

console.log("API Key:", firebaseConfig.apiKey ? "Present" : "Missing");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function check() {
  await signInWithEmailAndPassword(auth, 'lestek.sup@gmail.com', 'Evolux@123'); // guessing password
  const snap = await getDocs(collection(db, 'profiles'));
  console.log("Total users:", snap.docs.length);
  snap.forEach(doc => {
    console.log(doc.id, doc.data().email, doc.data().name);
  });
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
