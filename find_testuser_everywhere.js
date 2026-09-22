const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);

async function checkDb(dbInstance, dbName) {
  console.log(`=== Checking Database: ${dbName} ===`);
  const collections = ['profiles', 'users', 'accounts', 'members'];
  for (const col of collections) {
    try {
      const snap = await getDocs(collection(dbInstance, col));
      console.log(`Collection '${col}': ${snap.docs.length} docs`);
      snap.docs.forEach(d => {
        const data = d.data();
        console.log(`  Doc ID: ${d.id} | Email: ${data.email} | Name: ${data.name} | Username: ${data.username}`);
      });
    } catch(e) {
      console.log(`  Collection '${col}' error: ${e.message}`);
    }
  }
}

async function run() {
  const dbConfigured = getFirestore(app); // uses firestoreDatabaseId from config
  await checkDb(dbConfigured, config.firestoreDatabaseId || 'configured');
  
  const dbDefault = getFirestore(app, '(default)');
  await checkDb(dbDefault, '(default)');

  process.exit(0);
}
run();
