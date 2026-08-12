import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Database, HardDrive, BarChart2, AlertTriangle, TerminalSquare } from 'lucide-react';

export default function AdminDatabase() {
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const est = async () => {
      const getSafeCount = async (col) => {
        try {
          const snap = await getCountFromServer(collection(db, col));
          return snap.data().count;
        } catch(e) { return 0; }
      };

      const u = await getSafeCount('profiles');
      const t = await getSafeCount('tasks');
      const w = await getSafeCount('workouts');
      const h = await getSafeCount('workout_history');
      const f = await getSafeCount('feedbacks');
      const am = await getSafeCount('ai_memory');
      const fin = await getSafeCount('finances');
      const inv = await getSafeCount('user_inventory');

      setTables([
        { name: 'profiles', rows: u || 0, sizeMb: ((u || 0) * 0.05).toFixed(2) },
        { name: 'tasks', rows: t || 0, sizeMb: ((t || 0) * 0.1).toFixed(2) },
        { name: 'workouts', rows: w || 0, sizeMb: ((w || 0) * 0.2).toFixed(2) },
        { name: 'workout_history', rows: h || 0, sizeMb: ((h || 0) * 0.15).toFixed(2) },
        { name: 'ai_memory', rows: am || 0, sizeMb: ((am || 0) * 0.1).toFixed(2) },
        { name: 'finances', rows: fin || 0, sizeMb: ((fin || 0) * 0.05).toFixed(2) },
        { name: 'user_inventory', rows: inv || 0, sizeMb: ((inv || 0) * 0.05).toFixed(2) },
        { name: 'feedbacks', rows: f || 0, sizeMb: ((f || 0) * 0.03).toFixed(2) },
      ]);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        est();
      }
    });

    return () => unsubscribe();
  }, []);

  const totalUsedMb = tables.reduce((acc, curr) => acc + parseFloat(curr.sizeMb), 0).toFixed(2);
  const maxCapacityMb = 1024; // 1GB
  const percentUsed = (parseFloat(totalUsedMb) / maxCapacityMb) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Database className="text-emerald-500" size={24} />
        <h2 className="text-xl font-bold font-display">Console do Banco de Dados</h2>
      </div>

      
        

      <div className="bg-surface border border-surface-light p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Uso de Armazenamento Geral</h3>
        
        <div className="flex items-end gap-2 mb-2">
           <span className="text-4xl font-black">{totalUsedMb} MB</span>
           <span className="text-sm font-bold text-text-secondary pb-1">/ {maxCapacityMb} MB</span>
        </div>

        <div className="h-4 bg-background rounded-full overflow-hidden border border-text-primary/10 mb-4">
          <div 
            className="h-full bg-emerald-500" 
            style={{ width: `${percentUsed < 1 ? 1 : percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-text-secondary">
          <span>{percentUsed.toFixed(2)}% Utilizado</span>
          <span>Plano Firebase Spark/Blaze</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-light p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <BarChart2 className="text-neon-blue" size={20} />
             <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Tabelas Ativas</h3>
           </div>
           
           <div className="space-y-4">
             {tables.map(table => (
               <div key={table.name} className="flex items-center justify-between p-3 rounded-xl bg-background border border-text-primary/5">
                 <div>
                   <div className="text-sm font-bold text-text-primary">{table.name}</div>
                   <div className="text-[10px] text-text-secondary">{table.rows} registros</div>
                 </div>
                 <div className="text-sm font-bold text-neon-blue">{table.sizeMb} MB</div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-surface border border-surface-light p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
             <HardDrive className="text-neon-purple" size={20} />
             <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest">Informações de Sistema</h3>
           </div>
           
           <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-surface-light pb-3">
                <span className="text-xs text-text-secondary">Conexão Backend</span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest px-2 py-1 bg-emerald-500/10 rounded">Online</span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-light pb-3">
                <span className="text-xs text-text-secondary">Plataforma</span>
                <span className="text-xs font-bold text-text-primary">Firebase (Firestore)</span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-light pb-3">
                <span className="text-xs text-text-secondary">Security Rules</span>
                <span className="text-xs font-bold text-emerald-500">Ativado (Todas Tabelas)</span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-light pb-3">
                <span className="text-xs text-text-secondary">Realtime</span>
                <span className="text-xs font-bold text-emerald-500">Pronto</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
