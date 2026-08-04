const fs = require('fs');

const files = [
  'components/admin/AdminUsers.tsx',
  'components/admin/AdminPlans.tsx',
  'components/admin/AdminAI.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file === 'components/admin/AdminUsers.tsx') {
    content = content.replace(
      /const fetchUsers = async \(\) => \{\n\s*setLoading\(true\);\n\s*const q = query\(collection\(db, 'profiles'\), orderBy\('created_at', 'desc'\)\);\n\s*const snapshot = await getDocs\(q\);\n\s*const data = snapshot\.docs\.map\(d => \(\{ id: d\.id, \.\.\.d\.data\(\) \}\)\);\n\s*if \(data\) setUsers\(data\);\n\s*setLoading\(false\);\n\s*\};/,
      `const fetchUsers = async () => {\n    setLoading(true);\n    try {\n      const q = query(collection(db, 'profiles'), orderBy('created_at', 'desc'));\n      const snapshot = await getDocs(q);\n      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));\n      if (data) setUsers(data);\n    } catch(e) {\n      console.error(e);\n    }\n    setLoading(false);\n  };`
    );
  } else if (file === 'components/admin/AdminPlans.tsx') {
    content = content.replace(
      /const fetchUsers = async \(\) => \{\n\s*setLoading\(true\);\n\s*const q = query\(collection\(db, 'profiles'\), orderBy\('created_at', 'desc'\)\);\n\s*const snapshot = await getDocs\(q\);\n\s*const data = snapshot\.docs\.map\(d => \(\{ id: d\.id, \.\.\.d\.data\(\) \}\)\);\n\s*if \(data\) setUsers\(data\);\n\s*setLoading\(false\);\n\s*\};/,
      `const fetchUsers = async () => {\n    setLoading(true);\n    try {\n      const q = query(collection(db, 'profiles'), orderBy('created_at', 'desc'));\n      const snapshot = await getDocs(q);\n      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));\n      if (data) setUsers(data);\n    } catch(e) {\n      console.error(e);\n    }\n    setLoading(false);\n  };`
    );
  } else if (file === 'components/admin/AdminAI.tsx') {
    content = content.replace(
      /const fetchHistory = async \(\) => \{\n\s*setLoading\(true\);\n\s*const snapshot = await getDocs\(collection\(db, 'ai_history'\)\);\n\s*const data = snapshot\.docs\.map\(d => \(\{ id: d\.id, \.\.\.d\.data\(\) \}\)\);\n\s*if \(data\) setHistory\(data\);\n\s*setLoading\(false\);\n\s*\};/,
      `const fetchHistory = async () => {\n    setLoading(true);\n    try {\n      const snapshot = await getDocs(collection(db, 'ai_history'));\n      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));\n      if (data) setHistory(data);\n    } catch(e) {\n      console.error(e);\n    }\n    setLoading(false);\n  };`
    );
  }
  
  fs.writeFileSync(file, content);
}
console.log('patched');
