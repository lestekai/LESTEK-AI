import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { BookOpen, Search, Save, Calendar } from 'lucide-react';

export default function AdminPlans() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchUsers();
  }, []);

  const handleUpdatePlan = async (userId: string, newPlan: string, expiresAt: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    // Fetch latest user data to prevent overwriting their recent syncs (json backup)
    const { data: latestProfile } = await supabaseAdmin.from('profiles').select('equipped_cosmetics').eq('id', userId).single();
    if (!latestProfile) return;

    const equipped_cosmetics = {
       ...(latestProfile.equipped_cosmetics || {}),
       plan: newPlan,
       plan_expires_at: expiresAt,
       plan_request: '',
       plan_request_date: ''
    };

    const { error } = await supabaseAdmin.from('profiles')
      .update({ equipped_cosmetics })
      .eq('id', userId);

    if (error) {
      alert('Erro ao atualizar plano: ' + error.message);
    } else {
      alert('Plano atualizado com sucesso!');
      fetchUsers();
    }
  };

  const handleRejectPlan = async (userId: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    // Fetch latest user data to prevent overwriting their recent syncs
    const { data: latestProfile } = await supabaseAdmin.from('profiles').select('equipped_cosmetics').eq('id', userId).single();
    if (!latestProfile) return;

    const equipped_cosmetics = {
       ...(latestProfile.equipped_cosmetics || {}),
       plan_request: '',
       plan_request_date: ''
    };

    const { error } = await supabaseAdmin.from('profiles')
      .update({ equipped_cosmetics })
      .eq('id', userId);

    if (error) {
      alert('Erro ao recusar solicitação: ' + error.message);
    } else {
      alert('Solicitação recusada!');
      fetchUsers();
    }
  };

  const sortedFilteredUsers = [...users]
    .filter(u => 
      u.name?.toLowerCase().includes(search.toLowerCase()) || 
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aReq = a.equipped_cosmetics?.plan_request ? 1 : 0;
      const bReq = b.equipped_cosmetics?.plan_request ? 1 : 0;
      return bReq - aReq;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-neon-blue" size={24} />
        <h2 className="text-xl font-bold font-display">Solicitações de Planos</h2>
      </div>

      <div className="bg-surface border border-surface-light rounded-2xl p-4">
        <h3 className="text-sm font-bold text-white mb-4">Gerenciar Solicitações e Assinaturas</h3>
        <div className="relative mb-6">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
           <input 
             type="text" 
             placeholder="Buscar usuário por nome, email ou username..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             className="w-full bg-background border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-neon-blue transition-colors text-white"
           />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-surface-light text-text-secondary text-xs uppercase tracking-widest">
                 <th className="px-4 py-3 font-bold">Usuário</th>
                 <th className="px-4 py-3 font-bold">Email</th>
                 <th className="px-4 py-3 font-bold">Plano Atual</th>
                 <th className="px-4 py-3 font-bold text-amber-500">Solicitação</th>
                 <th className="px-4 py-3 font-bold">Vencimento (Dias/Data)</th>
                 <th className="px-4 py-3 font-bold">Ação</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-surface-light">
               {loading ? (
                 <tr>
                   <td colSpan={6} className="px-4 py-8 text-center text-text-secondary">Carregando usuários...</td>
                 </tr>
               ) : sortedFilteredUsers.map(u => {
                 const currentPlan = u.equipped_cosmetics?.plan || 'base';
                 const planExpiresAt = u.equipped_cosmetics?.plan_expires_at || '';
                 const planRequest = u.equipped_cosmetics?.plan_request || '';
                 const planRequestDate = u.equipped_cosmetics?.plan_request_date || '';
                 return (
                   <PlanRow 
                     key={u.id} 
                     user={u} 
                     initialPlan={currentPlan} 
                     initialExpiresAt={planExpiresAt} 
                     planRequest={planRequest}
                     planRequestDate={planRequestDate}
                     onSave={(plan: string, expiresAt: string) => handleUpdatePlan(u.id, plan, expiresAt)} 
                     onReject={(id: string) => handleRejectPlan(id)}
                   />
                 );
               })}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlanRow({ user, initialPlan, initialExpiresAt, planRequest, planRequestDate, onSave, onReject }: any) {
  const [plan, setPlan] = useState(initialPlan);
  const [expiresAt, setExpiresAt] = useState(initialExpiresAt);
  const [customDays, setCustomDays] = useState('');

  const addDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setExpiresAt(d.toISOString().split('T')[0]);
  };

  const handleCustomDays = () => {
    const days = parseInt(customDays);
    if (!isNaN(days) && days > 0) {
      addDays(days);
      setCustomDays('');
    }
  };

  const approveRequest = () => {
    setPlan(planRequest);
    addDays(30); // Default to 30 days when approving request
  };

  const hasChanges = plan !== initialPlan || expiresAt !== initialExpiresAt;

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-4 py-4">
        <div className="font-bold text-sm text-white">{user.name || user.username}</div>
        <div className="text-[10px] text-text-secondary">@{user.username}</div>
      </td>
      <td className="px-4 py-4 text-xs text-text-secondary">{user.email}</td>
      <td className="px-4 py-4">
        <select 
          value={plan} 
          onChange={e => setPlan(e.target.value)}
          className="bg-background border border-white/10 rounded-lg px-2 py-1 text-sm focus:border-neon-blue"
        >
          <option value="base">Base (Gratuito)</option>
          <option value="orbit">Orbit</option>
          <option value="nova">Nova</option>
          <option value="infinite">Infinite</option>
        </select>
      </td>
      <td className="px-4 py-4">
        {planRequest ? (
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded">
              Quer: {planRequest}
            </span>
            {planRequestDate && (
              <span className="text-[9px] text-text-secondary">{new Date(planRequestDate).toLocaleDateString('pt-BR')}</span>
            )}
            <div className="flex gap-1 w-full mt-1">
              <button onClick={approveRequest} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/20 flex-1 text-center font-bold">
                Aprovar
              </button>
              <button onClick={() => onReject(user.id)} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 text-center font-bold">
                Recusar
              </button>
            </div>
          </div>
        ) : (
          <span className="text-[10px] text-text-secondary">Nenhuma</span>
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          <input 
            type="date"
            value={expiresAt}
            onChange={e => setExpiresAt(e.target.value)}
            className="bg-background border border-white/10 rounded-lg px-2 py-1 text-sm focus:border-neon-blue"
          />
          <div className="flex flex-wrap gap-1">
            <button onClick={() => addDays(30)} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">+30d</button>
            <button onClick={() => addDays(90)} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">+90d</button>
            <button onClick={() => addDays(180)} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">+180d</button>
            <button onClick={() => addDays(365)} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">+365d</button>
            <button onClick={() => setExpiresAt('')} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20">Remover</button>
          </div>
          <div className="flex gap-1 mt-1">
            <input 
              type="number" 
              placeholder="Dias" 
              value={customDays}
              onChange={e => setCustomDays(e.target.value)}
              className="w-16 bg-background border border-white/10 rounded-lg px-2 py-1 text-[10px] focus:border-neon-blue"
            />
            <button onClick={handleCustomDays} className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">Personalizado</button>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <button 
          onClick={() => onSave(plan, expiresAt)}
          disabled={!hasChanges}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
            hasChanges ? 'bg-neon-blue text-black hover:scale-105' : 'bg-surface-light text-text-secondary opacity-50 cursor-not-allowed'
          }`}
        >
          <Save size={14} /> Salvar
        </button>
      </td>
    </tr>
  );
}
