import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity, BrainCircuit, BarChart3, MessageSquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAI() {
  const [stats, setStats] = useState({ totalCalls: 0, usersUsingAI: 0, totalTokens: 0 });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from('ai_history').select('user_id, tokens_used, created_at');
      if (data) {
        const uniqueUsers = new Set(data.map(d => d.user_id)).size;
        const sumTokens = data.reduce((acc, curr) => acc + (curr.tokens_used || 0), 0);
        setStats({ totalCalls: data.length, usersUsingAI: uniqueUsers, totalTokens: sumTokens });

        // Group by day for the last 15 days
        const now = new Date();
        const grouped = [];
        for (let i = 14; i >= 0; i--) {
          const d = new Date();
          d.setDate(now.getDate() - i);
          const dateString = d.toLocaleDateString('en-CA');
          const displayDate = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

          const dayData = data.filter(item => {
             return new Date(item.created_at).toLocaleDateString('en-CA') === dateString;
          });

          grouped.push({
            date: displayDate,
            calls: dayData.length,
            tokens: dayData.reduce((acc, curr) => acc + (curr.tokens_used || 0), 0)
          });
        }
        setChartData(grouped);
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
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Uso de IA (Últimos 15 dias)</h3>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-text-secondary">Analisando telemetria...</p>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00a0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff00a0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#ff00a0' }}
                />
                <Area type="monotone" dataKey="calls" stroke="#ff00a0" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
