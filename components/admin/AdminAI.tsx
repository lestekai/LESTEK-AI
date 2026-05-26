import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity, BrainCircuit, BarChart3, MessageSquare } from 'lucide-react';

export default function AdminAI() {
  const [stats, setStats] = useState({ totalCalls: 0, usersUsingAI: 0, totalTokens: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from('ai_history').select('user_id, tokens_used');
      if (data) {
        const uniqueUsers = new Set(data.map(d => d.user_id)).size;
        const sumTokens = data.reduce((acc, curr) => acc + (curr.tokens_used || 0), 0);
        setStats({ totalCalls: data.length, usersUsingAI: uniqueUsers, totalTokens: sumTokens });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-neon-pink" size={24} />
        <h2 className="text-xl font-bold font-display">Monitoramento Mestre (IA)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Total Prompts</span>
            <MessageSquare size={16} className="text-neon-pink" />
          </div>
          <div className="text-3xl font-black">{stats.totalCalls}</div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Usuários Gerando IA</span>
            <BrainCircuit size={16} className="text-neon-blue" />
          </div>
          <div className="text-3xl font-black">{stats.usersUsingAI}</div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Tokens Estimados</span>
            <BarChart3 size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black">{stats.totalTokens}</div>
        </div>
      </div>

      <div className="bg-surface border border-surface-light rounded-2xl p-6">
         <div className="flex flex-col items-center justify-center p-12 text-center">
            <BrainCircuit size={48} className="text-neon-pink/50 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold mb-2">Treinamento do Modelo Evolux</h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
              As análises preditivas de telemetria da IA e gráficos detalhados estarão disponíveis na próxima atualização do painel.
            </p>
         </div>
      </div>
    </div>
  );
}
