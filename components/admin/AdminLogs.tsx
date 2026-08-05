import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Settings, FileText, Ghost } from 'lucide-react';

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, 'admin_logs'), orderBy('created_at', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        
        const profQ = await getDocs(collection(db, 'profiles'));
        const profiles: any = {};
        profQ.forEach(d => { profiles[d.id] = d.data(); });
  
        const data = snapshot.docs.map(d => {
          const log = d.data();
          return {
            id: d.id,
            ...log,
            profiles: log.user_id ? { name: profiles[log.user_id]?.name, username: profiles[log.user_id]?.username } : null
          };
        });
        setLogs(data);
      } catch (e) {
        console.warn('AdminLogs error or insufficient permissions:', e);
        setLogs([]);
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="text-text-secondary" size={24} />
        <h2 className="text-xl font-bold font-display">Logs de Sistema</h2>
      </div>

      <div className="bg-surface border border-surface-light rounded-2xl p-6 min-h-96 flex flex-col">
        {loading ? (
          <p className="text-sm text-text-secondary text-center pt-8">Buscando logs de auditoria...</p>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center flex-1">
             <Ghost size={48} className="text-white/10 mb-4" />
             <h3 className="text-lg font-bold mb-2 text-white/50">Nenhum evento registrado</h3>
             <p className="text-sm text-white/30">
               O sistema de logs de administrador está funcionando, mas não há eventos recentes.
             </p>
          </div>
        ) : (
          <div className="space-y-3">
             {logs.map(log => (
               <div key={log.id} className="p-3 bg-background border border-white/5 rounded-xl flex items-center justify-between text-sm">
                 <div>
                   <div className="font-bold text-white flex items-center gap-2">
                     <span className="text-text-secondary">[{new Date(log.created_at).toLocaleTimeString('pt-BR')}]</span> 
                     <span className="uppercase text-[9px] tracking-widest px-2 py-0.5 rounded bg-white/10 text-white">{log.action_type}</span>
                     @{log.profiles?.username || 'Sistema'}
                   </div>
                   <div className="text-xs text-text-secondary mt-1">Target ID: {log.target_id || 'N/A'}</div>
                 </div>
                 {log.details && (
                   <pre className="text-[10px] bg-black/50 p-2 rounded max-w-xs overflow-x-auto text-emerald-400">
                     {JSON.stringify(log.details)}
                   </pre>
                 )}
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
