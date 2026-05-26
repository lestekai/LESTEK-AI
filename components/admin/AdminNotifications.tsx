import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Send, Users, Activity, CheckCircle, Search, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AdminNotifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20);
    if (data) setHistory(data);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchHistory();
  }, []);

  const { profile } = useAppStore();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    setLoading(true);

    try {
      const { data: users, error: fetchErr } = await supabaseAdmin.from('profiles').select('id');
      if (fetchErr) throw fetchErr;
      
      const notifications = users.map(u => ({
        title,
        message,
        type: 'system',
        user_id: u.id,
        is_read: false
      }));

      const { error } = await supabaseAdmin.from('notifications').insert(notifications);

      if (error) throw error;
      alert('Notificação enviada com sucesso para todos os usuários!');
      setTitle('');
      setMessage('');
      fetchHistory();
    } catch (err: any) {
      alert('Erro: ' + err.message);
    }
    setLoading(false);
  };

  const deleteNotification = async (id: string) => {
    if(!confirm("Deletar notificação?")) return;
    await supabaseAdmin.from('notifications').delete().eq('id', id);
    fetchHistory();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Send className="text-neon-purple" size={24} />
        <h2 className="text-xl font-bold font-display">Notificações Globais</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-light rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Nova Notificação</h3>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Título</label>
              <input 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-purple"
                placeholder="Ex: Atualização do Sistema"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Mensagem</label>
              <textarea 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm h-32 focus:border-neon-purple resize-none"
                placeholder="Escreva a mensagem para todos os usuários..."
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-neon-purple text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              {loading ? <Activity className="animate-spin" size={18}/> : <Send size={18} />}
              Disparar para Todos
            </button>
          </form>
        </div>

        <div className="bg-surface border border-surface-light rounded-2xl p-6 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Últimos Envios</h3>
          <div className="flex-1 overflow-y-auto space-y-3">
            {history.length === 0 ? (
              <p className="text-xs text-text-secondary">Nenhuma notificação enviada ainda.</p>
            ) : (
              history.map(n => (
                <div key={n.id} className="bg-background border border-white/5 p-4 rounded-xl relative group">
                  <h4 className="font-bold text-sm text-white mb-1">{n.title}</h4>
                  <p className="text-xs text-text-secondary">{n.message}</p>
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
