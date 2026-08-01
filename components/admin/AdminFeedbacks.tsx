import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { useAppStore } from '@/lib/store';
import { logAdminAction } from '@/lib/admin';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function AdminFeedbacks() {
  const { profile } = useAppStore();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseAdmin.from('feedbacks').select('*, profiles(name, username)').order('created_at', { ascending: false });
    if (data) setFeedbacks(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const updateFeedbackStatus = async (id: string, status: string) => {
    await supabaseAdmin.from('feedbacks').update({ status }).eq('id', id);
    if (profile) logAdminAction(profile.id, 'RESOLVE_FEEDBACK', id, { status });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-amber-500" size={24} />
        <h2 className="text-xl font-bold font-display">Central de Suporte</h2>
      </div>

      {loading ? (
        <p className="text-sm text-text-secondary">Sincronizando reportes...</p>
      ) : feedbacks.length === 0 ? (
        <div className="text-center p-12 bg-surface border border-surface-light rounded-2xl">
           <MessageSquare className="mx-auto text-text-secondary/50 mb-4" size={48} />
           <p className="text-text-secondary">Nenhum feedback ou denúncia recebida ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map(fb => (
            <div key={fb.id} className={`bg-surface p-5 rounded-2xl border ${
              fb.status === 'aberto' ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 
              fb.status === 'resolvido' ? 'border-emerald-500/30 opacity-75' : 'border-surface-light opacity-50'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded border ${
                     fb.category === 'denuncia' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                     fb.category === 'problema' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' :
                     'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
                  }`}>
                    {fb.category}
                  </span>
                  <p className="text-sm font-bold text-white">@{fb.profiles?.username || 'Usuário Desconhecido'}</p>
                </div>
                <span className="text-[10px] text-text-secondary">{new Date(fb.created_at).toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="bg-background border border-white/5 p-4 rounded-xl mb-4 text-sm text-white/90 leading-relaxed">
                {fb.message}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                   <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                     fb.status === 'aberto' ? 'text-amber-500' :
                     fb.status === 'resolvido' ? 'text-emerald-500' : 'text-text-secondary'
                   }`}>
                     {fb.status === 'aberto' ? '⏳ Aguardando Ação' : 
                      fb.status === 'resolvido' ? <><CheckCircle size={12}/> Resolvido</> : 
                      <><XCircle size={12}/> Ignorado</>}
                   </span>
                </div>
                {fb.status === 'aberto' && (
                  <div className="flex gap-2">
                    <button onClick={() => updateFeedbackStatus(fb.id, 'resolvido')} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-3 py-2 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/30 transition-colors">
                      <CheckCircle size={14}/> Marcar como Resolvido
                    </button>
                    <button onClick={() => updateFeedbackStatus(fb.id, 'ignorado')} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-white/5 text-text-secondary px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <XCircle size={14}/> Arquivar/Ignorar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
