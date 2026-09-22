const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, updateDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app);

// Auth UIDs we want to keep (the ones from the screenshot)
const VALID_UIDS = [
  'XGSS9fGH99aX3OkQbmGz0Mddcu43', // testuser1786537498532@evolux.app
  'tRJ4ilIqb8NEIFPnhza1jgulpPq2', // testuser1786537484821@evolux.app
  'D7FvZTCMLPRYcGPdztaTqcqhulA3', // testsecondary...
  'xGdkWrx8LdghITux1knrCIvX0Lo1'  // lestek.sup@gmail.com
];

// teste03@evolux.app has a UID starting with NXisCdr... we don't know the rest.
// If there's a profile with email teste03@evolux.app, we will delete it so that when they log in it is recreated with the true UID.

async function run() {
  const snap = await getDocs(collection(db, 'profiles'));
  for (const d of snap.docs) {
    const data = d.data();
    if (!VALID_UIDS.includes(d.id)) {
      console.log(`Deleting ghost profile: ${d.id} (${data.email})`);
      await deleteDoc(doc(db, 'profiles', d.id));
    } else {
      console.log(`Keeping valid profile: ${d.id} (${data.email})`);
    }
  }

  // Ensure lestek.sup@gmail.com is ADMIN
  await updateDoc(doc(db, 'profiles', 'xGdkWrx8LdghITux1knrCIvX0Lo1'), {
    role: 'admin',
    status: 'active'
  });
  console.log("Forced admin role for lestek.sup@gmail.com");

  // Ensure testsecondary has a profile
  await setDoc(doc(db, 'profiles', 'D7FvZTCMLPRYcGPdztaTqcqhulA3'), {
    id: 'D7FvZTCMLPRYcGPdztaTqcqhulA3',
    name: 'Test Secondary',
    username: 'testsecondary',
    email: 'testsecondary1786536000000@evolux.app', // placeholder since it's cut off
    role: 'user',
    status: 'active',
    xp: 0,
    avatar_level: 1,
    streak: 0,
    total_tasks_completed: 0,
    equipped_cosmetics: { plan: 'base' }
  }, { merge: true });
  console.log("Created profile for testsecondary");

  process.exit(0);
}
run();
