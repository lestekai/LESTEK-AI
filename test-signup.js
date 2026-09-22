const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const fs = require('fs');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

async function test() {
  const email = 'testuser' + Date.now() + '@evolux.app';
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, 'senha123');
    console.log("Signup success:", cred.user.uid);
    
    await setDoc(doc(db, 'profiles', cred.user.uid), {
      id: cred.user.uid,
      username: 'testuser',
      name: 'Test User',
      email: email,
      role: 'user',
      status: 'active'
    });
    console.log("Profile created");
    
    const docSnap = await getDoc(doc(db, 'profiles', cred.user.uid));
    console.log("Profile data:", docSnap.data());
    
  } catch (err) {
    console.error("Test failed:", err);
  }
  process.exit(0);
}

test();
