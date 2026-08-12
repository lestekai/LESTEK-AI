const fs = require('fs');

const file = 'components/admin/AdminSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { useAppStore }", 
  "import { doc, getDoc, setDoc } from 'firebase/firestore';\nimport { db } from '@/lib/firebase';\nimport { useAppStore }"
);

const newUseEffect = `
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'system', 'global_settings'));
        if (snap.exists()) {
          const parsed = snap.data();
          setMaintenance(parsed.maintenance ?? false);
          setVersion(parsed.version ?? '1.5.0-beta');
          if (parsed.features) setFeatures(parsed.features);
        }
      } catch (e) {
        console.error("Erro ao carregar configurações", e);
      }
    };
    loadSettings();
  }, []);
`;
content = content.replace(/useEffect\(\(\) => {[\s\S]*?}, \[\]\);/, newUseEffect.trim());

const newHandleSave = `
  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'system', 'global_settings'), {
        maintenance,
        version,
        features,
        updated_at: new Date().toISOString()
      }, { merge: true });
      if (profile) logAdminAction(profile.id, 'UPDATE_SETTINGS', 'global', { maintenance, version, features });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch(e) {
      alert("Erro ao salvar: " + (e as Error).message);
    }
  };
`;
content = content.replace(/const handleSave = \(\) => {[\s\S]*?setTimeout\(\(\) => setSaved\(false\), 3000\);\n  };/, newHandleSave.trim());

fs.writeFileSync(file, content);
console.log("Patched AdminSettings!");
