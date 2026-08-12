const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'ai-studio-evoluxlestek-093a1ef6-11dd-4cf9-adf7-5547dd62bebf'
});
const db = getFirestore(app);

async function check() {
  const snap = await db.collection('profiles').get();
  console.log("Total admin users:", snap.docs.length);
  snap.docs.forEach(doc => {
    console.log(doc.id, doc.data().email, doc.data().name);
  });
}
check().catch(console.error);
