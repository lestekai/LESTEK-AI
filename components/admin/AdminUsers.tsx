import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAppStore } from '@/lib/store';
import { logAdminAction } from '@/lib/admin';
import { Users, Search, Edit2, Shield, Lock, Trash2, Ban, Target, LockKeyhole, ArrowRight } from 'lucide-react';

export default function AdminUsers() {
  const { profile } = useAppStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'profiles'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      if (data) setUsers(data);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (editingUser.isNew) {
      if (!editingUser.email) return alert('Email é necessário!');
      const authError = new Error('Admin createUser is not supported on Firebase Client SDK');
      const data = null;
      if (authError) return alert('Erro ao criar usuário: ' + authError.message);
      
      // Update the newly created profile
      if (data?.user) {
         /* mocked */
      }

      alert('Usuário criado com sucesso. Senha padrão: Evolux@123');
      if (profile) logAdminAction(profile.id, 'CREATE_USER', data?.user?.id || 'new', { email: editingUser.email, role: editingUser.role });
      setEditingUser(null);
      fetchUsers();
      return;
    }

    // Update profiles table
    let error = null;
    try {
      await updateDoc(doc(db, 'profiles', editingUser.id), {
        name: editingUser.name,
        username: editingUser.username,
        role: editingUser.role,
        status: editingUser.status,
        xp: parseInt(editingUser.xp) || 0,
        avatar_level: parseInt(editingUser.avatar_level) || 1,
        equipped_cosmetics: {
          ...(editingUser.equipped_cosmetics || {}),
          plan: editingUser.equipped_cosmetics?.plan || 'base'
        }
      });
    } catch(e) { error = e; }

    if (error) {
      alert('Erro ao atualizar usuário: ' + error.message);
    } else {
      alert('Usuário atualizado com sucesso.');
      if (profile) logAdminAction(profile.id, 'UPDATE_USER', editingUser.id, { role: editingUser.role, status: editingUser.status });
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleChangePassword = async (userId: string) => {
    const newPass = prompt('Digite a nova senha para o usuário:');
    if (!newPass || newPass.trim() === '') return;
    
    // Using admin client to change password bypassing old password req
    const error = new Error('Admin password update is not supported on Firebase Client SDK');
    if (error) {
      alert('Erro ao alterar senha: ' + error.message);
    } else {
      alert('Senha alterada com sucesso!');
      if (profile) logAdminAction(profile.id, 'RESET_PASSWORD', userId, {});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="text-neon-purple" size={24} />
          <h2 className="text-xl font-bold font-display">Gerenciamento de Usuários</h2>
        </div>
        <button onClick={() => setEditingUser({ isNew: true, name: '', username: '', email: '', plan: 'base', role: 'user', status: 'pending', xp: 0, avatar_level: 1 })} className="px-4 py-2 bg-neon-purple text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
          + Criar Usuário
        </button>
      </div>

      <div className="bg-surface border border-surface-light rounded-2xl p-4">
         <div className="flex items-center gap-3 bg-background border border-white/10 rounded-xl px-4 py-3 mb-6">
           <Search size={18} className="text-text-secondary" />
           <input 
             type="text" 
             placeholder="Buscar usuário por nome ou identificação..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-transparent border-none focus:outline-none flex-1 text-sm font-medium"
           />
         </div>

         {loading ? (
            <p className="text-sm text-text-secondary p-4">Carregando tropas...</p>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="text-[10px] uppercase tracking-widest text-text-secondary bg-background border-b border-white/5">
                 <tr>
                   <th className="px-4 py-4 font-bold">Soldado</th>
                   <th className="px-4 py-4 font-bold">Nível / XP</th>
                   <th className="px-4 py-4 font-bold">Cargo</th>
                   <th className="px-4 py-4 font-bold">Status</th>
                   <th className="px-4 py-4 font-bold">Plano</th>
                   <th className="px-4 py-4 font-bold">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredUsers.map(u => (
                   <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                     <td className="px-4 py-4">
                       <div className="font-bold flex items-center gap-2">
                         {u.name}
                       </div>
                       <div className="text-[10px] text-text-secondary">@{u.username}</div>
                     </td>
                     <td className="px-4 py-4">
                       Lvl {u.avatar_level} <span className="text-[10px] text-text-secondary">({u.xp} xp)</span>
                     </td>
                     <td className="px-4 py-4">
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${u.role === 'admin' ? 'text-neon-blue' : 'text-text-secondary'}`}>
                         {u.role}
                       </span>
                     </td>
                     <td className="px-4 py-4">
                       <span className={`text-[10px] font-bold uppercase tracking-widest ${
                         u.status === 'banned' ? 'text-red-500' : 
                         u.status === 'suspended' ? 'text-amber-500' :
                         u.status === 'pending' ? 'text-amber-300' : 'text-emerald-500'
                       }`}>
                         {u.status}
                       </span>
                     </td>
                     <td className="px-4 py-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10">
                         {u.equipped_cosmetics?.plan || 'base'}
                       </span>
                     </td>
                     <td className="px-4 py-4">
                       <button onClick={() => setEditingUser({...u, plan: u.equipped_cosmetics?.plan || 'base', plan_expires_at: u.equipped_cosmetics?.plan_expires_at || ''})} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white">
                         <Edit2 size={16} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-surface-light rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-6 border-b border-surface-light flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Shield size={20} className="text-neon-purple"/> Editando Soldado
                </h3>
                <button onClick={() => setEditingUser(null)} className="text-text-secondary hover:text-white">X</button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6">
                <form id="edit-user-form" onSubmit={handleUpdateUser} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Nome</label>
                       <input 
                         type="text" 
                         value={editingUser.name || ''} 
                         onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Username</label>
                       <input 
                         type="text" 
                         value={editingUser.username || ''} 
                         onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                   </div>

                   {editingUser.isNew && (
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Email</label>
                         <input 
                           type="email" 
                           value={editingUser.email || ''} 
                           onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                           className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                           required={editingUser.isNew}
                         />
                       </div>
                       <div>
                         <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Senha Opcional</label>
                         <input 
                           type="text" 
                           placeholder="Padrão: Evolux@123"
                           value={editingUser.password || ''} 
                           onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                           className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                         />
                       </div>
                     </div>
                   )}

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Plano de Assinatura</label>
                       <select 
                         value={editingUser.plan} 
                         onChange={e => setEditingUser({...editingUser, plan: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       >
                         <option value="base">Base (Comum)</option>
                         <option value="orbit">Orbit (Especial)</option>
                         <option value="nova">Nova (Premium)</option>
                         <option value="infinite">Infinite (Total)</option>
                       </select>
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Vencimento do Plano</label>
                       <input 
                         type="date"
                         value={editingUser.plan_expires_at || ''} 
                         onChange={e => setEditingUser({...editingUser, plan_expires_at: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue text-white"
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Cargo</label>
                       <select 
                         value={editingUser.role} 
                         onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       >
                         <option value="user">Usuário Comum</option>
                         <option value="moderator">Moderador</option>
                         <option value="admin">Administrador</option>
                       </select>
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">XP Atual</label>
                       <input 
                         type="number" 
                         value={editingUser.xp || 0} 
                         onChange={e => setEditingUser({...editingUser, xp: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Nível Avatar</label>
                       <input 
                         type="number" 
                         value={editingUser.avatar_level || 1} 
                         onChange={e => setEditingUser({...editingUser, avatar_level: e.target.value})}
                         className="w-full bg-background border border-white/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                   </div>

                   <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Status da Conta</label>
                       <select 
                         value={editingUser.status || 'pending'} 
                         onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                         className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none ${
                           editingUser.status === 'banned' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                           editingUser.status === 'suspended' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                           editingUser.status === 'pending' ? 'bg-amber-300/10 border-amber-300/30 text-amber-300' :
                           'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                         }`}
                       >
                         <option value="pending">⏳ Pendente (Aguardando Aprovação)</option>
                         <option value="active">🟢 Ativo (Sem restrições)</option>
                         <option value="suspended">🟡 Suspenso (Acesso limitado)</option>
                         <option value="banned">🔴 Banido (Sem acesso)</option>
                       </select>
                   </div>
                </form>

                <div className="mt-8 pt-6 border-t border-surface-light">
                   <h4 className="text-xs uppercase font-bold text-red-400 tracking-widest mb-4">Ações Críticas</h4>
                   <button 
                     type="button" 
                     onClick={() => handleChangePassword(editingUser.id)}
                     className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 transition-all text-sm mb-3"
                   >
                     <div className="flex items-center gap-2">
                       <LockKeyhole size={16} /> Redefinir Senha
                     </div>
                     <ArrowRight size={16} className="text-text-secondary" />
                   </button>
                   
                   <button 
                     type="button"
                     onClick={() => setEditingUser({...editingUser, xp: 0, avatar_level: 1})}
                     className="w-full flex items-center justify-between p-3 rounded-xl border border-red-500/20 hover:border-red-500/50 bg-red-500/5 transition-all text-sm text-red-400"
                   >
                     <div className="flex items-center gap-2">
                       <Trash2 size={16} /> Resetar Progresso (Zerar XP/Nível)
                     </div>
                   </button>
                </div>
             </div>

             <div className="p-4 border-t border-surface-light flex gap-3">
               <button onClick={() => setEditingUser(null)} className="flex-1 py-3 text-sm font-bold bg-white/5 rounded-xl hover:bg-white/10">Cancelar</button>
               <button form="edit-user-form" type="submit" className="flex-1 py-3 text-sm font-bold bg-neon-purple text-white rounded-xl hover:bg-neon-purple/80">Salvar Alterações</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
