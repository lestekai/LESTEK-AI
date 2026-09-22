const fs = require('fs');
let c = fs.readFileSync('components/admin/AdminDiagnostics.tsx', 'utf8');

const syncToolCode = `
  const [syncUid, setSyncUid] = useState('');
  const [syncEmail, setSyncEmail] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncUid.trim() || !syncEmail.trim()) return alert('Preencha o UID e o Email.');
    setIsSyncing(true);
    try {
      const newRef = doc(db, 'profiles', syncUid.trim());
      const username = syncEmail.split('@')[0];
      await updateDoc(newRef, {
        id: syncUid.trim(),
        email: syncEmail.trim(),
        name: username,
        username: username,
        role: 'user',
        status: 'active',
        xp: 0,
        avatar_level: 1,
        streak: 0,
        total_tasks_completed: 0,
        equipped_cosmetics: { plan: 'base' }
      }).catch(async (err) => {
        // Se o documento não existir, o updateDoc falha. Usamos setDoc para criar.
        const { setDoc } = require('firebase/firestore');
        await setDoc(newRef, {
          id: syncUid.trim(),
          email: syncEmail.trim(),
          name: username,
          username: username,
          role: 'user',
          status: 'active',
          xp: 0,
          avatar_level: 1,
          streak: 0,
          total_tasks_completed: 0,
          equipped_cosmetics: { plan: 'base' },
          created_at: new Date().toISOString()
        });
      });
      alert('Usuário sincronizado com sucesso! Ele agora aparecerá no painel.');
      setSyncUid('');
      setSyncEmail('');
      await runAnalysis();
    } catch(err: any) {
      alert('Erro ao sincronizar: ' + err.message);
    }
    setIsSyncing(false);
  };
`;

c = c.replace(
  /const runAnalysis = async \(\) => \{/,
  syncToolCode + '\n  const runAnalysis = async () => {'
);

const syncFormCode = `
      <div className="mt-8 border-t border-surface-light pt-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="text-neon-purple" size={18} />
          <h4 className="font-bold text-sm text-text-primary">Sincronização Manual (Auth ➔ Banco)</h4>
        </div>
        <p className="text-xs text-text-secondary mb-4">Se existem usuários no seu <strong>Firebase Authentication</strong> que não aparecem neste painel (usuários fantasmas), copie o UID e o Email deles lá no console do Firebase e cole aqui para forçar a criação do perfil no banco de dados.</p>
        
        <form onSubmit={handleManualSync} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">UID do Usuário (Firebase Auth)</label>
            <input 
              type="text" 
              value={syncUid} 
              onChange={e => setSyncUid(e.target.value)} 
              placeholder="Ex: NXisCdr67YT..." 
              className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Email do Usuário</label>
            <input 
              type="email" 
              value={syncEmail} 
              onChange={e => setSyncEmail(e.target.value)} 
              placeholder="Ex: teste03@evolux.app" 
              className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSyncing}
            className="px-6 py-2 h-[38px] bg-neon-purple/20 text-neon-purple font-bold text-sm rounded-xl hover:bg-neon-purple/30 transition-colors"
          >
            {isSyncing ? 'Sincronizando...' : 'Forçar Sincronia'}
          </button>
        </form>
      </div>
`;

c = c.replace(
  /<\/div>\n      \)\}\n    <\/div>/,
  `</div>
      )}
${syncFormCode}
    </div>`
);

fs.writeFileSync('components/admin/AdminDiagnostics.tsx', c);
console.log("AdminDiagnostics updated with manual sync.");
