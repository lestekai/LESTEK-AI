'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { User, Bell, Shield, Smartphone, HardDrive, LogOut, Key, Eye, EyeOff, BrainCircuit, Check, AlertCircle, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { profile, logout, zoomLevel, setZoomLevel, updateProfile } = useAppStore();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile?.name || '');

  // Custom/Backup Gemini API Key State
  const [customKey, setCustomKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('evolux_custom_gemini_key') || '';
    }
    return '';
  });
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  if (!profile) return null;

  const handleSaveName = async () => {
    if (newName.trim()) {
      updateProfile({ name: newName });
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('profiles').update({ name: newName }).eq('id', profile.id);
      setIsEditingName(false);
    }
  };

  const handleTestKey = async () => {
    if (!customKey.trim()) {
      setTestStatus('error');
      setTestMessage('Por favor, insira uma chave para testar.');
      return;
    }
    setTestStatus('testing');
    setTestMessage('');
    try {
      // Temporarily save to state-based local storage for the service call
      localStorage.setItem('evolux_custom_gemini_key', customKey.trim());
      
      const { generateAI } = await import('@/src/services/geminiService');
      const response = await generateAI({
        prompt: 'Diga apenas a palavra "Sucesso!" sem markdown para confirmar conexão.',
        model: 'gemini-3.5-flash'
      });
      
      if (response && response.text) {
        setTestStatus('success');
        setTestMessage(`Conectado! Resposta da IA: "${response.text.trim()}"`);
      } else {
        setTestStatus('error');
        setTestMessage('A IA retornou um texto vazio.');
      }
    } catch (err: any) {
      console.error(err);
      setTestStatus('error');
      setTestMessage(err.message || 'Falha de conexão com a chave informada.');
    }
  };

  const handleSaveKey = () => {
    localStorage.setItem('evolux_custom_gemini_key', customKey.trim());
    alert('Chave do Gemini salva com sucesso! Ela será usada como prioridade em todas as operações de IA.');
    setTestStatus('idle');
  };

  const handleClearKey = () => {
    localStorage.removeItem('evolux_custom_gemini_key');
    setCustomKey('');
    setTestStatus('idle');
    setTestMessage('');
    alert('Chave customizada removida. O app voltará a utilizar a chave padrão do servidor.');
  };

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <Header title="Configurações" subtitle="Ajustes do seu perfil" />
      
      <main className="p-5 space-y-6">
        <section className="bg-surface p-5 rounded-3xl border border-surface-light relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[2px]">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
                <User size={24} className="text-white relative z-10" />
              </div>
            </div>
            <div className="flex-1">
               {isEditingName ? (
                 <div className="flex items-center gap-2">
                    <input 
                       className="bg-background border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:border-neon-blue w-full"
                       value={newName}
                       onChange={e => setNewName(e.target.value)}
                       autoFocus
                    />
                    <button onClick={handleSaveName} className="text-xs bg-neon-blue text-black font-bold px-2 py-1 rounded">OK</button>
                    <button onClick={() => setIsEditingName(false)} className="text-xs bg-surface-light text-white px-2 py-1 rounded">X</button>
                 </div>
               ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white truncate max-w-[150px]">{profile.name}</h2>
                  <button onClick={() => setIsEditingName(true)} className="text-[10px] text-text-secondary hover:text-white uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full">Renomear</button>
                </div>
               )}
              <p className="text-sm text-text-secondary mt-1">Plano: <span className="text-neon-purple uppercase font-bold text-[10px] tracking-widest">{profile.plan}</span></p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2 mb-2">Preferências de Interface</h3>
          <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden p-4 space-y-4">
            
            <div>
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-bold text-white">Zoom do App</span>
                 <span className="text-xs font-bold text-neon-blue">{zoomLevel}%</span>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setZoomLevel(Math.max(80, zoomLevel - 5))} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10">-</button>
                  <input type="range" min="80" max="150" step="5" value={zoomLevel} onChange={e => setZoomLevel(Number(e.target.value))} className="flex-1 accent-neon-blue" />
                  <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 5))} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10">+</button>
               </div>
               <p className="text-[10px] text-text-secondary mt-2">Personalize o tamanho dos elementos da tela (padrão: 100%).</p>
            </div>

            <div className="pt-4 border-t border-surface-light flex justify-between items-center">
              <span className="text-sm font-bold text-white">Tema do App</span>
              <span className="text-xs font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl uppercase tracking-widest text-text-secondary">Cyber Dark</span>
            </div>

          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2 mb-2">Privacidade & Alertas</h3>
          
          <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-surface-light">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-neon-blue" />
                <span className="text-sm font-bold text-white">Notificações Push</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 rounded-full relative transition-colors ${notifications ? 'bg-neon-blue' : 'bg-surface-light'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-emerald-500" />
                <span className="text-sm font-bold text-white">Dados Criptografados</span>
              </div>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded uppercase font-bold tracking-widest">Ativo</span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2 mb-2">IA Evolux (Chave do Gemini)</h3>
          
          <div className="bg-surface rounded-2xl border border-surface-light p-5 space-y-4">
            <div className="flex items-start gap-3">
              <BrainCircuit className="text-neon-pink shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-white">Chave API de Backup / Personalizada</h4>
                <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                  Caso o servidor de hospedagem no Netlify ou Cloud Run não possua chave cadastrada globalmente, você pode definir sua própria chave <strong>Gemini gratuita</strong>. Ela fica gravada apenas no navegador.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="Cole sua API Key do Gemini (AI Studio)..."
                  value={customKey}
                  onChange={e => setCustomKey(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white focus:outline-none focus:border-neon-blue font-mono transition-colors"
                />
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="flex-1 py-2 rounded-xl bg-neon-blue text-black font-bold text-xs uppercase tracking-widest hover:bg-neon-blue/80 active:scale-95 transition-all"
                >
                  Gravar Chave
                </button>
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={testStatus === 'testing'}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs uppercase tracking-widest text-white disabled:opacity-50 transition-all flex items-center justify-center gap-1"
                >
                  {testStatus === 'testing' ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Testando
                    </>
                  ) : 'Testar Conexão'}
                </button>
                {customKey && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    title="Remover Chave"
                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {testStatus === 'success' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-400 flex items-start gap-2">
                <Check size={14} className="shrink-0 mt-0.5" />
                <span>{testMessage}</span>
              </div>
            )}

            {testStatus === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-500 flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="font-mono break-all">{testMessage}</span>
              </div>
            )}

            <div className="text-[10px] text-text-secondary leading-normal bg-background/50 p-3 rounded-xl border border-white/5">
              💡 <strong>Como obter?</strong> Acesse <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-neon-pink underline font-bold">Google AI Studio</a>, clique em <strong>Get API Key</strong>, crie uma chave gratuita e cole-a acima.
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <button 
            onClick={async () => {
              const { supabase } = await import('@/lib/supabase');
              await supabase.auth.signOut();
              const { useWorkoutStore } = await import('@/lib/workoutStore');
              useWorkoutStore.getState().resetWorkoutSystem();
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-4 bg-surface border border-surface-light text-white rounded-2xl text-sm font-bold hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} /> Sair da Conta
          </button>
        </section>
      </main>
    </div>
  );
}
