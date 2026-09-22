const fs = require('fs');

const content = `'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getSecondaryAuth } from '@/lib/firebase';
import { useAppStore } from '@/lib/store';
import { logAdminAction } from '@/lib/admin';
import { Users, Search, Edit2, Shield, Lock, Trash2, Ban, Target, LockKeyhole, ArrowRight, UserPlus } from 'lucide-react';

export default function AdminUsers() {
  const { profile } = useAppStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'profiles'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      const sortedData = [...data].sort((a: any, b: any) => {
        const getMs = (val: any) => {
          if (!val) return 0;
          if (val.toMillis) return val.toMillis();
          if (val.seconds) return val.seconds * 1000;
          const parsed = new Date(val).getTime();
          return isNaN(parsed) ? 0 : parsed;
        };
        return getMs(b.created_at) - getMs(a.created_at);
      });
      setUsers(sortedData);
    } catch(e) {
      console.error("Fetch users error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUsers();
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userToDelete: any) => {
    if (!userToDelete || !userToDelete.id) return;
    const confirmName = prompt(\`Para confirmar a exclusão de "\${userToDelete.name || userToDelete.username || userToDelete.email}", digite DELETAR:\`);
    if (confirmName !== 'DELETAR') {
      alert('Exclusão cancelada.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'profiles', userToDelete.id));
      alert('Usuário removido com sucesso!');
      if (profile) logAdminAction(profile.id, 'DELETE_USER', userToDelete.id, { email: userToDelete.email });
      if (editingUser?.id === userToDelete.id) setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      alert('Erro ao excluir usuário: ' + err.message);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (editingUser.isNew) {
      if (!editingUser.email) return alert('Email é necessário!');
      
      try {
        const secondaryAuth = getSecondaryAuth();
        const initialPass = editingUser.password || 'Evolux@123';
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, editingUser.email, initialPass);
        const newUid = userCredential.user.uid;
        
        await setDoc(doc(db, 'profiles', newUid), {
          id: newUid,
          name: editingUser.name || editingUser.username || editingUser.email.split('@')[0],
          username: editingUser.username || editingUser.email.split('@')[0],
          email: editingUser.email || '',
          role: editingUser.role || 'user',
          status: editingUser.status || 'active',
          xp: 0,
          avatar_level: 1,
          streak: 0,
          total_tasks_completed: 0,
          visible_password: initialPass,
          equipped_cosmetics: {
            plan: editingUser.plan || 'base'
          },
          created_at: new Date().toISOString()
        });
        
        alert(\`Usuário criado com sucesso! Senha registrada: \${initialPass}\`);
        if (profile) logAdminAction(profile.id, 'CREATE_USER', newUid, { email: editingUser.email, role: editingUser.role });
        setEditingUser(null);
        fetchUsers();
      } catch (err: any) {
        alert('Erro ao criar usuário: ' + err.message);
      }
      return;
    }

    // Update profiles table
    let error = null;
    try {
      await updateDoc(doc(db, 'profiles', editingUser.id), {
        name: editingUser.name || '',
        username: editingUser.username || '',
        email: editingUser.email || '',
        role: editingUser.role || 'user',
        status: editingUser.status || 'active',
        visible_password: editingUser.password !== undefined ? editingUser.password : (editingUser.visible_password || 'Não registrada'),
        xp: parseInt(editingUser.xp) || 0,
        avatar_level: parseInt(editingUser.avatar_level) || 1,
        equipped_cosmetics: {
          ...(editingUser.equipped_cosmetics || {}),
          plan: editingUser.plan || editingUser.equipped_cosmetics?.plan || 'base'
        }
      });
    } catch(e) { error = e; }

    if (error) {
      alert('Erro ao atualizar usuário: ' + (error as Error).message);
    } else {
      alert('Usuário atualizado com sucesso.');
      if (profile) logAdminAction(profile.id, 'UPDATE_USER', editingUser.id, { role: editingUser.role, status: editingUser.status });
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleChangePassword = async (email: string) => {
    if (!email) return alert("Usuário sem email cadastrado.");
    if (confirm('Enviar link de redefinição de senha para ' + email + '?')) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Link enviado com sucesso para ' + email);
        if (profile) logAdminAction(profile.id, 'RESET_PASSWORD', editingUser?.id, { email });
      } catch (err: any) {
        alert('Erro ao enviar link: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="text-neon-purple" size={24} />
          <h2 className="text-xl font-bold font-display">Gerenciamento de Usuários</h2>
        </div>
        <button
          onClick={() => setEditingUser({ isNew: true, role: 'user', status: 'active', plan: 'base', xp: 0, avatar_level: 1, email: '', password: 'Evolux@123' })}
          className="flex items-center gap-2 px-4 py-2 bg-neon-purple text-text-primary rounded-xl font-bold text-sm hover:bg-neon-purple/80 transition-all shadow-lg shadow-neon-purple/20"
        >
          <UserPlus size={16} /> Novo Usuário
        </button>
      </div>

      <div className="bg-surface border border-surface-light rounded-2xl p-4">
         <div className="flex items-center gap-3 bg-background border border-text-primary/10 rounded-xl px-4 py-3 mb-6">
           <Search size={18} className="text-text-secondary" />
           <input 
             type="text" 
             placeholder="Buscar usuário por nome, username ou email..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-transparent border-none focus:outline-none flex-1 text-sm font-medium"
           />
         </div>

         {loading ? (
            <p className="text-sm text-text-secondary p-4">Carregando usuários...</p>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="text-[10px] uppercase tracking-widest text-text-secondary bg-background border-b border-text-primary/5">
                 <tr>
                   <th className="px-4 py-4 font-bold">Usuário</th>
                   <th className="px-4 py-4 font-bold">Nível / XP</th>
                   <th className="px-4 py-4 font-bold">Cargo</th>
                   <th className="px-4 py-4 font-bold">Status</th>
                   <th className="px-4 py-4 font-bold">Plano</th>
                   <th className="px-4 py-4 font-bold">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredUsers.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="px-4 py-8 text-center text-text-secondary">
                       Nenhum usuário encontrado.
                     </td>
                   </tr>
                 ) : (
                   filteredUsers.map(u => (
                     <tr key={u.id} className="hover:bg-text-primary/[0.02] transition-colors">
                       <td className="px-4 py-4">
                         <div className="font-bold flex items-center gap-2">
                           {u.name || u.username || 'Sem nome'}
                         </div>
                         <div className="text-[10px] text-text-secondary">@{u.username || 'sem_username'} • {u.email}</div>
                       </td>
                       <td className="px-4 py-4">
                         Lvl {u.avatar_level || 1} <span className="text-[10px] text-text-secondary">({u.xp || 0} xp)</span>
                       </td>
                       <td className="px-4 py-4">
                         <span className={\`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-text-primary/5 \${u.role === 'admin' ? 'text-neon-blue' : 'text-text-secondary'}\`}>
                           {u.role}
                         </span>
                       </td>
                       <td className="px-4 py-4">
                         <span className={\`text-[10px] font-bold uppercase tracking-widest \${
                           u.status === 'banned' ? 'text-red-500' : 
                           u.status === 'suspended' ? 'text-amber-500' :
                           u.status === 'pending' ? 'text-amber-300' : 'text-emerald-500'
                         }\`}>
                           {u.status}
                         </span>
                       </td>
                       <td className="px-4 py-4">
                         <span className="text-[10px] font-bold uppercase tracking-widest bg-text-primary/5 px-2 py-1 rounded border border-text-primary/10">
                           {u.equipped_cosmetics?.plan || 'base'}
                         </span>
                       </td>
                       <td className="px-4 py-4">
                         <div className="flex items-center gap-1">
                           <button 
                             onClick={() => setEditingUser({...u, plan: u.equipped_cosmetics?.plan || 'base', plan_expires_at: u.equipped_cosmetics?.plan_expires_at || ''})} 
                             className="p-2 hover:bg-text-primary/10 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                             title="Editar Usuário / Ver Senha"
                           >
                             <Edit2 size={16} />
                           </button>
                           <button 
                             onClick={() => handleDeleteUser(u)} 
                             className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                             title="Excluir Usuário"
                           >
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))
                 )}
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
                  <Shield size={20} className="text-neon-purple"/> {editingUser.isNew ? 'Novo Usuário' : 'Editando Usuário'}
                </h3>
                <button onClick={() => setEditingUser(null)} className="text-text-secondary hover:text-text-primary font-bold px-2 py-1">✕</button>
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
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Username</label>
                       <input 
                         type="text" 
                         value={editingUser.username || ''} 
                         onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Email</label>
                       <input 
                         type="email" 
                         value={editingUser.email || ''} 
                         onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                         required
                       />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Senha (Visível no Banco)</label>
                       <input 
                         type="text" 
                         placeholder="Padrão: Evolux@123"
                         value={editingUser.password !== undefined ? editingUser.password : (editingUser.visible_password || 'Não registrada')} 
                         onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue font-mono"
                       />
                       <span className="text-[9px] text-text-secondary block mt-1">Ao alterar e salvar, o registro de senha visível é atualizado.</span>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Plano de Assinatura</label>
                       <select 
                         value={editingUser.plan || 'base'} 
                         onChange={e => setEditingUser({...editingUser, plan: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
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
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue text-text-primary"
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Cargo</label>
                       <select 
                         value={editingUser.role || 'user'} 
                         onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
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
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                     <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Nível Avatar</label>
                       <input 
                         type="number" 
                         value={editingUser.avatar_level || 1} 
                         onChange={e => setEditingUser({...editingUser, avatar_level: e.target.value})}
                         className="w-full bg-background border border-text-primary/10 rounded-xl px-3 py-2 text-sm focus:border-neon-blue"
                       />
                     </div>
                   </div>

                   <div>
                       <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Status da Conta</label>
                       <select 
                         value={editingUser.status || 'active'} 
                         onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                         className={\`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none \${
                           editingUser.status === 'banned' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                           editingUser.status === 'suspended' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                           editingUser.status === 'pending' ? 'bg-amber-300/10 border-amber-300/30 text-amber-300' :
                           'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                         }\`}
                       >
                         <option value="pending">⏳ Pendente (Aguardando Aprovação)</option>
                         <option value="active">🟢 Ativo (Sem restrições)</option>
                         <option value="suspended">🟡 Suspenso (Acesso limitado)</option>
                         <option value="banned">🔴 Banido (Sem acesso)</option>
                       </select>
                   </div>
                </form>

                <div className="mt-8 pt-6 border-t border-surface-light space-y-3">
                   <h4 className="text-xs uppercase font-bold text-red-400 tracking-widest mb-4">Ações Críticas</h4>
                   <button 
                     type="button" 
                     onClick={() => handleChangePassword(editingUser.email)}
                     className="w-full flex items-center justify-between p-3 rounded-xl border border-text-primary/10 hover:border-text-primary/30 bg-text-primary/5 transition-all text-sm"
                   >
                     <div className="flex items-center gap-2">
                       <LockKeyhole size={16} /> Redefinir Senha via Email
                     </div>
                     <ArrowRight size={16} className="text-text-secondary" />
                   </button>
                   
                   <button 
                     type="button"
                     onClick={() => setEditingUser({...editingUser, xp: 0, avatar_level: 1})}
                     className="w-full flex items-center justify-between p-3 rounded-xl border border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5 transition-all text-sm text-amber-400"
                   >
                     <div className="flex items-center gap-2">
                       <Trash2 size={16} /> Resetar Progresso (Zerar XP/Nível)
                     </div>
                   </button>

                   {!editingUser.isNew && (
                     <button 
                       type="button"
                       onClick={() => handleDeleteUser(editingUser)}
                       className="w-full flex items-center justify-between p-3 rounded-xl border border-red-500/30 hover:border-red-500/60 bg-red-500/10 transition-all text-sm text-red-400 font-bold"
                     >
                       <div className="flex items-center gap-2">
                         <Trash2 size={16} /> Excluir Usuário Definitivamente
                       </div>
                     </button>
                   )}
                </div>
             </div>

             <div className="p-4 border-t border-surface-light flex gap-3">
               <button onClick={() => setEditingUser(null)} className="flex-1 py-3 text-sm font-bold bg-text-primary/5 rounded-xl hover:bg-text-primary/10">Cancelar</button>
               <button form="edit-user-form" type="submit" className="flex-1 py-3 text-sm font-bold bg-neon-purple text-text-primary rounded-xl hover:bg-neon-purple/80">Salvar Alterações</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('components/admin/AdminUsers.tsx', content);
console.log("AdminUsers.tsx updated successfully!");
