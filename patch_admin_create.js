const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /import \{ onAuthStateChanged \} from 'firebase\/auth';/,
  "import { onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';\nimport { getSecondaryAuth } from '@/lib/firebase';"
);

c = c.replace(
  /if \(editingUser\.isNew\) \{[\s\S]*?return;\n    \}/,
  `if (editingUser.isNew) {
      if (!editingUser.email) return alert('Email é necessário!');
      
      try {
        const secondaryAuth = getSecondaryAuth();
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, editingUser.email, 'Evolux@123');
        const newUid = userCredential.user.uid;
        
        await setDoc(doc(db, 'profiles', newUid), {
          id: newUid,
          name: editingUser.name || editingUser.username || '',
          username: editingUser.username || '',
          email: editingUser.email || '',
          role: editingUser.role || 'user',
          status: editingUser.status || 'active',
          xp: 0,
          avatar_level: 1,
          equipped_cosmetics: {
            plan: editingUser.plan || 'base'
          },
          created_at: new Date().toISOString()
        });
        
        alert('Usuário criado com sucesso! Senha padrão: Evolux@123');
        if (profile) logAdminAction(profile.id, 'CREATE_USER', newUid, { email: editingUser.email, role: editingUser.role });
        setEditingUser(null);
        fetchUsers();
      } catch (err: any) {
        alert('Erro ao criar usuário: ' + err.message);
      }
      return;
    }`
);

// We also need to import setDoc since it's used above
c = c.replace(
  /import \{ collection, query, getDocs, doc, updateDoc \} from 'firebase\/firestore';/,
  "import { collection, query, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';"
);

c = c.replace(
  /const handleChangePassword = async \(userId: string\) => \{[\s\S]*?fetchUsers\(\);\n    \}\n  \};/,
  `const handleChangePassword = async (email: string) => {
    if (!email) return alert("Usuário sem email cadastrado.");
    if (confirm('Enviar link de redefinição de senha para ' + email + '?')) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Link enviado com sucesso para ' + email);
        if (profile) logAdminAction(profile.id, 'RESET_PASSWORD', editingUser.id, { email });
      } catch (err: any) {
        alert('Erro ao enviar link: ' + err.message);
      }
    }
  };`
);

c = c.replace(
  /onClick=\{\(\) => handleChangePassword\(editingUser\.id\)\}/,
  "onClick={() => handleChangePassword(editingUser.email)}"
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Admin Users patched for Create/Reset!");
