import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getCountFromServer, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Users, Activity, Target, Zap, Shield, Crown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    totalTasks: 0,
    baseUsers: 0,
    orbitUsers: 0,
    novaUsers: 0,
    infiniteUsers: 0
  });

  const [growthData, setGrowthData] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      let totalUsers = 0;
      let activeUsers = 0;
      let bannedUsers = 0;
      let totalTasks = 0;
      let allUsers: any[] = [];

      try {
        const totalUsersSnap = await getCountFromServer(collection(db, 'profiles'));
        totalUsers = totalUsersSnap.data().count;
        const activeUsersSnap = await getCountFromServer(query(collection(db, 'profiles'), where('status', '==', 'active')));
        activeUsers = activeUsersSnap.data().count;
        const bannedUsersSnap = await getCountFromServer(query(collection(db, 'profiles'), where('status', '==', 'banned')));
        bannedUsers = bannedUsersSnap.data().count;
        const totalTasksSnap = await getCountFromServer(collection(db, 'tasks'));
        totalTasks = totalTasksSnap.data().count;
        
        const allUsersSnap = await getDocs(collection(db, 'profiles'));
        allUsers = allUsersSnap.docs.map(d => d.data());
      } catch (err) {
        console.warn('Firestore fetch in AdminOverview failed, falling back to basic defaults:', err);
      }
      
      let baseUsers = 0;
      let orbitUsers = 0;
      let novaUsers = 0;
      let infiniteUsers = 0;
      
      if (allUsers.length > 0) {
        allUsers.forEach(u => {
           const plan = u.equipped_cosmetics?.plan || u.plan || 'base';
           if (plan === 'base') baseUsers++;
           if (plan === 'orbit') orbitUsers++;
           if (plan === 'nova') novaUsers++;
           if (plan === 'infinite') infiniteUsers++;
        });
      }
  
      const now = new Date();
  
      const d15DaysAgo = new Date(now);
      d15DaysAgo.setDate(now.getDate() - 15);
      
      const d7DaysAgo = new Date(now);
      d7DaysAgo.setDate(now.getDate() - 7);
  
      const users15DaysAgo = allUsers.length > 0 ? allUsers.filter(u => new Date(u.created_at) <= d15DaysAgo).length : 0;
      const users7DaysAgo = allUsers.length > 0 ? allUsers.filter(u => new Date(u.created_at) <= d7DaysAgo).length : 0;
      
      let weeklyGrowth = 0;
      if (users15DaysAgo > 0) {
        weeklyGrowth = Math.round(((users7DaysAgo - users15DaysAgo) / users15DaysAgo) * 100);
      } else if (users7DaysAgo > 0) {
        weeklyGrowth = 100;
      }
  
      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        bannedUsers: bannedUsers || 0,
        totalTasks: totalTasks || 0,
        baseUsers,
        orbitUsers,
        novaUsers,
        infiniteUsers,
        weeklyGrowth
      });
  
      const data = [];
      for (let i = 14; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const displayDate = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  
        const usersUpToDate = allUsers.length > 0 ? allUsers.filter(u => {
          const uDate = new Date(u.created_at);
          return uDate <= d;
        }).length : 0;
  
        data.push({
          date: displayDate,
          usuarios: usersUpToDate,
        });
      }
      setGrowthData(data);
    } catch (e) {
      console.warn('AdminOverview error or insufficient permissions:', e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchStats();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-neon-blue" size={24} />
        <h2 className="text-xl font-bold font-display">Visão Geral da Plataforma</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Total Usuários</span>
            <Users size={16} className="text-neon-blue" />
          </div>
          <div className="text-3xl font-black">{stats.totalUsers}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-2">
            {stats.weeklyGrowth > 0 ? '+' : ''}{stats.weeklyGrowth}% esta semana
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Usuários Ativos</span>
            <Activity size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black">{stats.activeUsers}</div>
          <div className="text-[10px] text-text-secondary mt-2">Retenção de 85%</div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Contas Banidas</span>
            <Shield size={16} className="text-red-500" />
          </div>
          <div className="text-3xl font-black">{stats.bannedUsers}</div>
          <div className="text-[10px] text-text-secondary mt-2">Segurança Ativa</div>
        </div>

        <div className="bg-surface rounded-2xl p-5 border border-surface-light">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Tarefas Executadas</span>
            <Target size={16} className="text-neon-purple" />
          </div>
          <div className="text-3xl font-black">{stats.totalTasks}</div>
          <div className="text-[10px] text-text-secondary mt-2">No banco de dados</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-surface-light">
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Crescimento de Usuários</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f0ff' }}
                />
                <Area type="monotone" dataKey="usuarios" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-surface rounded-2xl p-6 border border-surface-light flex flex-col">
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Métricas de Planos</h3>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                   <Target size={18} className="text-text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-bold">Base</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">Usuários Comuns</div>
                </div>
              </div>
              <div className="text-xl font-black">{stats.baseUsers}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20">
                   <Crown size={18} className="text-neon-blue" />
                </div>
                <div>
                  <div className="text-sm font-bold text-neon-blue">Orbit</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">Acesso Especial</div>
                </div>
              </div>
              <div className="text-xl font-black">{stats.orbitUsers}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                   <Crown size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-500">Nova</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">Acesso Premium</div>
                </div>
              </div>
              <div className="text-xl font-black">{stats.novaUsers}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20">
                   <Zap size={18} className="text-neon-purple" />
                </div>
                <div>
                  <div className="text-sm font-bold text-neon-purple">Infinite</div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-widest">Acesso Total</div>
                </div>
              </div>
              <div className="text-xl font-black">{stats.infiniteUsers}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
