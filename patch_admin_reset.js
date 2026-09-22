const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /const handleChangePassword = async \(userId: string\) => \{[\s\S]*?\}\n  \};\n\n  return/m,
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
  };

  return`
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Admin Users reset patched!");
