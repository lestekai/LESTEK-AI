'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { User, Bell, Shield, Smartphone, HardDrive, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';



export default function SettingsPage() {
  const { profile, logout, zoomLevel, setZoomLevel, updateProfile } = useAppStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const [notifications, setNotifications] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profile?.name || '');

  if (!profile) return null;

  const handleSaveName = async () => {
    if (newName.trim()) {
      updateProfile({ name: newName });
      const { db } = await import('@/lib/firebase');
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'profiles', profile.id), { name: newName });
      setIsEditingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <Header title="Configurações" subtitle="Ajustes do seu perfil" />
      
      <main className="p-5 space-y-6">
        <section className="bg-surface p-5 rounded-3xl border border-surface-light relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[2px]">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
                <User size={24} className="text-text-primary relative z-10" />
              </div>
            </div>
            <div className="flex-1">
               {isEditingName ? (
                 <div className="flex items-center gap-2">
                    <input 
                       className="bg-background border border-text-primary/10 rounded-lg px-2 py-1 text-sm text-text-primary focus:border-neon-blue w-full"
                       value={newName}
                       onChange={e => setNewName(e.target.value)}
                       autoFocus
                    />
                    <button onClick={handleSaveName} className="text-xs bg-neon-blue text-black font-bold px-2 py-1 rounded">OK</button>
                    <button onClick={() => setIsEditingName(false)} className="text-xs bg-surface-light text-text-primary px-2 py-1 rounded">X</button>
                 </div>
               ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-text-primary truncate max-w-[150px]">{profile.name}</h2>
                  <button onClick={() => setIsEditingName(true)} className="text-[10px] text-text-secondary hover:text-text-primary uppercase tracking-widest bg-text-primary/5 px-2 py-1 rounded-full">Renomear</button>
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
                 <span className="text-sm font-bold text-text-primary">Zoom do App</span>
                 <span className="text-xs font-bold text-neon-blue">{zoomLevel}%</span>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 5))} className="w-8 h-8 rounded-full bg-text-primary/5 border border-text-primary/10 flex items-center justify-center font-bold text-text-primary hover:bg-text-primary/10">-</button>
                  <input type="range" min="50" max="150" step="5" value={zoomLevel} onChange={e => setZoomLevel(Number(e.target.value))} className="flex-1 accent-neon-blue" />
                  <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 5))} className="w-8 h-8 rounded-full bg-text-primary/5 border border-text-primary/10 flex items-center justify-center font-bold text-text-primary hover:bg-text-primary/10">+</button>
               </div>
               <p className="text-[10px] text-text-secondary mt-2">Personalize o tamanho dos elementos da tela (padrão: 100%).</p>
            </div>

            <div className="pt-4 border-t border-surface-light flex flex-col gap-3">
              <span className="text-sm font-bold text-text-primary">Tema do App</span>
              <div className="flex items-center gap-2">
                {mounted && (
                  <>
                    <button 
                      onClick={() => setTheme('light')} 
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-colors ${theme === 'light' ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' : 'bg-surface border-surface-light text-text-secondary hover:text-text-primary'}`}
                    >
                      <Sun size={16} /> Claro
                    </button>
                    <button 
                      onClick={() => setTheme('dark')} 
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-colors ${theme === 'dark' ? 'bg-neon-purple/10 border-neon-purple text-neon-purple' : 'bg-surface border-surface-light text-text-secondary hover:text-text-primary'}`}
                    >
                      <Moon size={16} /> Escuro
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2 mb-2">Privacidade & Alertas</h3>
          
          <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-surface-light">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-neon-blue" />
                <span className="text-sm font-bold text-text-primary">Notificações Push</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 rounded-full relative transition-colors ${notifications ? 'bg-neon-blue' : 'bg-surface-light'}`}
              >
                <div className={`w-4 h-4 bg-text-primary rounded-full absolute top-1 transition-transform ${notifications ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-text-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-emerald-500" />
                <span className="text-sm font-bold text-text-primary">Dados Criptografados</span>
              </div>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded uppercase font-bold tracking-widest">Ativo</span>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <button 
            onClick={async () => {
              const { auth } = await import('@/lib/firebase');
              await auth.signOut();
              const { useWorkoutStore } = await import('@/lib/workoutStore');
              useWorkoutStore.getState().resetWorkoutSystem();
              logout();
                  localStorage.removeItem('workout_q_step');
    localStorage.removeItem('workout_q_data');
    localStorage.removeItem('onboarding_step');
    localStorage.removeItem('onboarding_answers');
    localStorage.removeItem('evolux_finance');
    navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-4 bg-surface border border-surface-light text-text-primary rounded-2xl text-sm font-bold hover:bg-text-primary/5 transition-colors"
          >
            <LogOut size={18} /> Sair da Conta
          </button>
        </section>
      </main>
    </div>
  );
}
