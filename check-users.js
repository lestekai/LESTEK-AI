const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query } = require('firebase/firestore');

const firebaseConfig = {
  projectId: 'ai-studio-evoluxlestek-093a1ef6-11dd-4cf9-adf7-5547dd62bebf'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const snap = await getDocs(collection(db, 'profiles'));
  console.log("Total users:", snap.docs.length);
  snap.forEach(doc => {
    console.log(doc.id, doc.data().email, doc.data().name);
  });
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });
