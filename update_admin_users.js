const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminUsers.tsx', 'utf8');

c = c.replace(
  /total_tasks_completed: 0,\n\s*equipped_cosmetics:/g,
  "total_tasks_completed: 0,\n          visible_password: editingUser.password || 'Evolux@123',\n          equipped_cosmetics:"
);

c = c.replace(
  /<div>\n\s*<label className="text-\[10px\] uppercase font-bold tracking-widest text-text-secondary block mb-2">Senha Opcional<\/label>\n\s*<input \n\s*type="text" \n\s*placeholder="Padrão: Evolux@123"\n\s*value=\{editingUser\.password \|\| ''\} \n\s*onChange=\{e => setEditingUser\(\{\.\.\.editingUser, password: e\.target\.value\}\)\}\n\s*className="w-full bg-background border border-text-primary\/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"\n\s*\/>\n\s*<\/div>/g,
  `<div>
                         <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Senha (Visível no Banco)</label>
                         <input 
                           type="text" 
                           placeholder="Padrão: Evolux@123"
                           value={editingUser.password !== undefined ? editingUser.password : (editingUser.visible_password || '')} 
                           onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                           className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                         />
                         <span className="text-[9px] text-text-secondary block mt-1">Ao alterar aqui, mudamos o registro visível (não altera a senha real do Auth).</span>
                       </div>`
);

c = c.replace(
  /status: editingUser\.status \|\| 'active',\n\s*xp: parseInt\(editingUser\.xp\) \|\| 0,/g,
  "status: editingUser.status || 'active',\n        visible_password: editingUser.password !== undefined ? editingUser.password : editingUser.visible_password,\n        xp: parseInt(editingUser.xp) || 0,"
);

fs.writeFileSync('components/admin/AdminUsers.tsx', c);
console.log("Admin Users updated");
