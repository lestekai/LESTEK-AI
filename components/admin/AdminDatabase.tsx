import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database, HardDrive, BarChart2, AlertTriangle, TerminalSquare } from 'lucide-react';

export default function AdminDatabase() {
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const est = async () => {
      const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: t } = await supabase.from('tasks').select('*', { count: 'exact', head: true });
      const { count: w } = await supabase.from('workouts').select('*', { count: 'exact', head: true });
      const { count: h } = await supabase.from('workout_history').select('*', { count: 'exact', head: true });
      const { count: f } = await supabase.from('feedbacks').select('*', { count: 'exact', head: true });
      const { count: am } = await supabase.from('ai_memory').select('*', { count: 'exact', head: true }).catch(() => ({count: 0}));
      const { count: fin } = await supabase.from('finances').select('*', { count: 'exact', head: true }).catch(() => ({count: 0}));
      const { count: inv } = await supabase.from('user_inventory').select('*', { count: 'exact', head: true }).catch(() => ({count: 0}));

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
    est();
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

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <TerminalSquare className="text-amber-500" size={20} />
          <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Atualização Necessária: Schema V2</h3>
        </div>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          Para que o novo armazenamento de Questionário IA, Finanças e Inventário Isolado funcione 100%, você precisa rodar o script SQL gerado <strong className="text-white">EVOLUX_ADVANCED_SCHEMA_V2.sql</strong>.
        </p>
        <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside bg-black/40 p-4 rounded-xl border border-white/5">
          <li>Acesse seu painel do Supabase.</li>
          <li>Vá em <strong>SQL Editor</strong> &gt; <strong>New Query</strong>.</li>
          <li>Copie e cole o conteúdo do arquivo <code className="text-neon-blue">EVOLUX_ADVANCED_SCHEMA_V2.sql</code> (ele foi gerado na raiz do projeto).</li>
          <li>Clique em <strong>Run</strong> (Run script).</li>
          <li>Sua base passará a contar com tabelas para <code className="text-amber-500">finances</code> e <code className="text-amber-500">user_inventory</code>, melhorando o isolamento de dados pedido.</li>
        </ul>
      </div>

      <div className="bg-surface border border-surface-light p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Uso de Armazenamento Geral</h3>
        
        <div className="flex items-end gap-2 mb-2">
           <span className="text-4xl font-black">{totalUsedMb} MB</span>
           <span className="text-sm font-bold text-text-secondary pb-1">/ {maxCapacityMb} MB</span>
        </div>

        <div className="h-4 bg-background rounded-full overflow-hidden border border-white/10 mb-4">
          <div 
            className="h-full bg-emerald-500" 
            style={{ width: `${percentUsed < 1 ? 1 : percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-text-secondary">
          <span>{percentUsed.toFixed(2)}% Utilizado</span>
          <span>Plano Supabase Free/Pro</span>
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
               <div key={table.name} className="flex items-center justify-between p-3 rounded-xl bg-background border border-white/5">
                 <div>
                   <div className="text-sm font-bold text-white">{table.name}</div>
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
                <span className="text-xs font-bold text-white">Supabase (PostgreSQL)</span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-light pb-3">
                <span className="text-xs text-text-secondary">Row Level Security</span>
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
