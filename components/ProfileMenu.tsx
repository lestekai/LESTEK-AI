'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/lib/store';
import { useWorkoutStore } from '@/lib/workoutStore';
import { supabase } from '@/lib/supabase';
import { calculateAvatarLevel } from '@/lib/evolux';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, CreditCard, X, ChevronRight, BarChart3, Star, Flame } from 'lucide-react';

export function ProfileMenu() {
  const { profile, logout } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!profile) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    useWorkoutStore.getState().resetWorkoutSystem();
        localStorage.removeItem('workout_q_step');
    localStorage.removeItem('workout_q_data');
    localStorage.removeItem('onboarding_step');
    localStorage.removeItem('onboarding_answers');
    localStorage.removeItem('evolux_finance');
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Detalhes da Conta', onClick: () => { setIsOpen(false); navigate('/settings'); } },
    { icon: CreditCard, label: 'Meu Plano', onClick: () => { setIsOpen(false); navigate('/plans'); } },
    { icon: BarChart3, label: 'Dados de Evolução', onClick: () => { setIsOpen(false); navigate('/avatar'); } },
    { icon: Settings, label: 'Configurações', onClick: () => { setIsOpen(false); navigate('/settings'); } },
    // Only admins have access to the Admin Panel
    ...(profile.role === 'admin' ? [{ icon: Flame, label: 'Painel Admin', onClick: () => { setIsOpen(false); navigate('/admin'); } }] : [])
  ];

  const planLabels = {
    base: 'Evolux Base',
    orbit: 'Evolux Orbit',
    nova: 'Evolux Nova',
    infinite: 'Evolux Infinite',
  };

  const planColors = {
    base: 'text-text-secondary',
    orbit: 'text-neon-blue',
    nova: 'text-neon-purple',
    infinite: 'text-neon-pink',
  };

  return (
    <div className="relative">
      {/* Profile Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-surface-light border border-neon-blue/20 flex items-center justify-center overflow-hidden hover:border-neon-blue/60 transition-colors focus:outline-none"
      >
        <div className="w-full h-full bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 flex items-center justify-center text-neon-blue font-bold tracking-widest text-sm uppercase">
          {profile.name.charAt(0)}
        </div>
      </button>

      {/* Mini Profile Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-56 bg-surface/95 backdrop-blur-xl border border-white/5 rounded-2xl z-[100] shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] shrink-0">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold font-display text-white truncate">{profile.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                     <span className={`text-[9px] font-bold uppercase tracking-widest ${planColors[profile.plan]}`}>
                      {planLabels[profile.plan]}
                     </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 text-center border-b border-white/5 divide-x divide-white/5">
                <button onClick={() => { setIsOpen(false); navigate('/avatar'); }} className="px-2 py-3 hover:bg-white/[0.02] transition-colors w-full flex flex-col items-center">
                  <div className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mb-1">Nível</div>
                  <div className="font-bold text-neon-blue text-sm flex items-center justify-center gap-1"><Star size={12} className="fill-neon-blue"/> {profile.avatarLevel}</div>
                </button>
                <button onClick={() => { setIsOpen(false); navigate('/tasks'); }} className="px-2 py-3 hover:bg-white/[0.02] transition-colors w-full flex flex-col items-center">
                  <div className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mb-1">Streak</div>
                  <div className="font-bold text-neon-purple text-sm flex items-center justify-center gap-1"><Flame size={12} className="text-neon-purple"/> {profile.streak}</div>
                </button>
              </div>

              <div className="p-2 space-y-0.5">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={i}
                      onClick={item.onClick}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <Icon size={14} className="text-text-secondary group-hover:text-white transition-colors" />
                      <span className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="px-2 pb-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/5 text-red-500 rounded-lg text-[11px] uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 transition-colors font-bold"
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
