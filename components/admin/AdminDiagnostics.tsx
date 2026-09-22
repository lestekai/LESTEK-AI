import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Activity, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminDiagnostics() {
  const [analyzing, setAnalyzing] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [results, setResults] = useState<any>(null);

  
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

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const snap = await getDocs(collection(db, 'profiles'));
      const profiles = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      let missingUsername = 0;
      let invalidRole = 0;
      let invalidStatus = 0;
      const issues: any[] = [];
      
      profiles.forEach((p: any) => {
        let isInvalid = false;
        if (!p.username) {
          missingUsername++;
          isInvalid = true;
        }
        if (!['user', 'moderator', 'admin'].includes(p.role)) {
          invalidRole++;
          isInvalid = true;
        }
        if (!['active', 'pending', 'suspended', 'banned'].includes(p.status)) {
          invalidStatus++;
          isInvalid = true;
        }
        
        // Check for missing core fields
        if (p.xp === undefined || p.avatar_level === undefined || !p.email || !p.equipped_cosmetics) {
          isInvalid = true;
        }
        
        if (isInvalid) {
          issues.push({ id: p.id, type: 'needs_normalization', user: p.name || p.email || p.id, profile: p });
        }
      });
      
      setResults({
        total: profiles.length,
        missingUsername,
        invalidRole,
        invalidStatus,
        issues
      });
    } catch(e) {
      console.error(e);
      alert('Erro ao analisar: ' + (e as Error).message);
    }
    setAnalyzing(false);
  };

  const runFix = async () => {
    if (!results || results.issues.length === 0) return;
    setFixing(true);
    try {
      for (const issue of results.issues) {
        const ref = doc(db, 'profiles', issue.id);
        const p = issue.profile;
        const updates: any = {};
        
        if (!p.username) {
           updates.username = 'user_' + issue.id.substring(0, 5).toLowerCase();
        }
        if (!p.name) {
           updates.name = p.username || updates.username || 'Explorador';
        }
        if (!['user', 'moderator', 'admin'].includes(p.role)) updates.role = 'user';
        if (!['active', 'pending', 'suspended', 'banned'].includes(p.status)) updates.status = 'active';
        if (p.xp === undefined) updates.xp = 0;
        if (p.avatar_level === undefined) updates.avatar_level = 1;
        if (p.streak === undefined) updates.streak = 0;
        if (p.total_tasks_completed === undefined) updates.total_tasks_completed = 0;
        if (!p.email) updates.email = (p.username || updates.username || issue.id) + '@evolux.app';
        if (!p.equipped_cosmetics) updates.equipped_cosmetics = { plan: 'base' };
        
        await updateDoc(ref, updates);
      }
      alert('Correção aplicada com sucesso!');
      await runAnalysis();
    } catch(e) {
      console.error(e);
      alert('Erro ao corrigir: ' + (e as Error).message);
    }
    setFixing(false);
  };

  return (
    <div className="bg-surface border border-surface-light p-6 rounded-2xl mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-neon-blue" size={20} />
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Diagnóstico de Profiles (Firestore)</h3>
      </div>
      
      {!results ? (
        <div className="text-center py-6">
          <p className="text-sm text-text-secondary mb-4">Analise os perfis do banco para encontrar dados inconsistentes com as regras de segurança (ex: username ausente, status/roles inválidos).</p>
          <button onClick={runAnalysis} disabled={analyzing} className="px-6 py-3 bg-neon-blue/10 text-neon-blue rounded-xl text-sm font-bold hover:bg-neon-blue/20 transition-all flex items-center justify-center gap-2 mx-auto">
            {analyzing ? <RefreshCw className="animate-spin" size={16} /> : <ShieldAlert size={16} />}
            {analyzing ? 'Analisando...' : 'Rodar Análise de Integridade'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-3 bg-background border border-text-primary/5 rounded-xl text-center">
               <div className="text-2xl font-black text-text-primary">{results.total}</div>
               <div className="text-[10px] text-text-secondary uppercase tracking-widest">Total Profiles</div>
             </div>
             <div className="p-3 bg-background border border-text-primary/5 rounded-xl text-center">
               <div className="text-2xl font-black text-amber-500">{results.missingUsername}</div>
               <div className="text-[10px] text-text-secondary uppercase tracking-widest">Sem Username</div>
             </div>
             <div className="p-3 bg-background border border-text-primary/5 rounded-xl text-center">
               <div className="text-2xl font-black text-red-500">{results.invalidRole}</div>
               <div className="text-[10px] text-text-secondary uppercase tracking-widest">Cargo Inválido</div>
             </div>
             <div className="p-3 bg-background border border-text-primary/5 rounded-xl text-center">
               <div className="text-2xl font-black text-red-500">{results.invalidStatus}</div>
               <div className="text-[10px] text-text-secondary uppercase tracking-widest">Status Inválido</div>
             </div>
           </div>
           
           <div className="mt-6 border-t border-surface-light pt-6 flex justify-between items-center">
             <div>
               <h4 className="font-bold text-sm">Aviso Importante: Firebase Auth</h4>
               <p className="text-xs text-text-secondary mt-1 max-w-md">Para listar ou manipular os usuários originais do <strong>Firebase Authentication</strong> a partir deste painel, é necessário ter a chave privada (Admin SDK) injetada nas configurações de ambiente do AI Studio.</p>
             </div>
             
             {results.issues.length > 0 ? (
                <button onClick={runFix} disabled={fixing} className="px-6 py-3 bg-amber-500/10 text-amber-500 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-all flex items-center gap-2">
                  {fixing ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                  {fixing ? 'Corrigindo...' : 'Normalizar Profiles'}
                </button>
             ) : (
                <div className="px-6 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-sm font-bold flex items-center gap-2">
                  <CheckCircle size={16} /> Tudo OK!
                </div>
             )}
           </div>
        </div>
      )}

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

    </div>
  );
}
