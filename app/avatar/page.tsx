'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { COSMETICS, ACHIEVEMENTS, PLANET_MISSIONS, getUnlockedPlanets, getRankTier, CosmeticType, calculateAvatarLevel } from '@/lib/evolux';
import { BottomNav } from '@/components/BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, Zap, Sparkles, Trophy, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { CosmicAvatar } from '@/components/CosmicAvatar';

export default function AvatarPage() {
  const { profile } = useAppStore();
  const [activeTab, setActiveTab] = useState<'status' | 'cosmetics' | 'achievements'>('status');

  if (!profile) return null;

  const strictLevel = profile.avatarLevel;
  const currentXp = profile.xp;
  const nextLevelXp = Math.pow(strictLevel, 2) * 50; 
  const prevLevelXp = Math.pow(strictLevel - 1, 2) * 50;
  const progress = Math.max(0, Math.min(100, ((currentXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));

  const rank = getRankTier(strictLevel);

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden relative">
      <Header title="Seu Avatar" subtitle="O reflexo da sua força de vontade" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-purple/10 via-background to-background pointer-events-none" />

      {/* Avatar Display */}
      <section className="relative pt-8 pb-12 overflow-hidden flex flex-col items-center">
        <CosmicAvatar profile={profile} />
        
        <div className="mt-[-20px] text-center z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-light/50 border border-surface-light backdrop-blur-md mb-3">
             <span className={`text-xs font-bold uppercase ${rank.color}`}>{rank.name}</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-glow-blue">Nvl {strictLevel}</h2>
          
          <div className="w-48 mx-auto mt-4">
             <div className="flex justify-between text-[10px] text-text-secondary uppercase mb-1 font-bold">
               <span>XP Atual</span>
               <span>Nvl {strictLevel + 1}</span>
             </div>
             <div className="h-1.5 w-full bg-surface-light rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className={`h-full ${rank.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} 
               />
             </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="px-6 relative z-20 mb-6">
        <div className="flex gap-2 p-1 bg-surface border border-surface-light rounded-2xl">
          {['status', 'cosmetics', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-xl transition-all ${
                activeTab === tab ? 'bg-surface-light text-white shadow-md' : 'text-text-secondary hover:text-white'
              }`}
            >
              {tab === 'status' ? 'Status' : tab === 'cosmetics' ? 'Cosméticos' : 'Conquistas'}
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 relative z-20">
        <AnimatePresence mode="wait">
          {/* TAB: STATUS */}
          {activeTab === 'status' && (
            <motion.div key="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface p-5 rounded-3xl border border-surface-light relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-neon-purple/10 rounded-full blur-xl" />
                  <Zap className="text-neon-purple mb-2" size={24} />
                  <p className="text-xs text-text-secondary uppercase tracking-widest">Disciplina</p>
                  <p className="text-3xl font-bold mt-1 text-white">{profile.streak} <span className="text-sm font-normal text-text-secondary">dias</span></p>
                </div>
                <div className="bg-surface p-5 rounded-3xl border border-surface-light relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-neon-blue/10 rounded-full blur-xl" />
                  <Star className="text-neon-blue mb-2" size={24} />
                  <p className="text-xs text-text-secondary uppercase tracking-widest">Ação</p>
                  <p className="text-3xl font-bold mt-1 text-white">{profile.totalTasksCompleted} <span className="text-sm font-normal text-text-secondary">tarefas</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-lg"><Sparkles className="text-amber-500" /> Domínio Cósmico</h3>
                <div className="space-y-3">
                  {PLANET_MISSIONS.map((planet) => {
                    const isUnlocked = profile.streak >= planet.streakReq;
                    return (
                      <div key={planet.id} className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${isUnlocked ? 'bg-surface border-surface-light hover:border-white/20' : 'bg-surface/30 border-surface-light/50 opacity-60 grayscale'}`}>
                        <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center border border-white/10" style={{ backgroundColor: isUnlocked ? planet.color : '#333', boxShadow: isUnlocked ? `inset 0 0 10px rgba(0,0,0,0.5), 0 0 15px ${planet.color}40` : 'none' }}>
                          {!isUnlocked && <Lock size={16} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{isUnlocked ? planet.name : 'Domínio Desconhecido'}</h4>
                          <p className="text-xs text-text-secondary italic mt-1">&quot;{isUnlocked ? planet.phrase : 'Sua determinação atual é fraca demais para acessar estes registros.'}&quot;</p>
                          <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-widest">{isUnlocked ? planet.atmosphere : `Desbloqueia aos ${planet.streakReq} dias de Streak`}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: COSMETICS */}
          {activeTab === 'cosmetics' && (
            <motion.div key="cosmet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              {['aura', 'coroa', 'olhos', 'armadura', 'arma', 'satelite', 'particula'].map(cat => {
                const title = cat === 'aura' ? 'Auras de Energia' : cat === 'coroa' ? 'Coroas Cósmicas' : cat === 'olhos' ? 'Visão Focal' : cat === 'armadura' ? 'Armaduras' : cat === 'arma' ? 'Armamentos' : cat === 'satelite' ? 'Satélites' : 'Partículas Orbitais';
                const items = COSMETICS.filter(c => c.type === cat);
                if (items.length === 0) return null;

                return (
                  <div key={cat}>
                    <h3 className="font-bold text-sm tracking-widest uppercase text-text-secondary mb-4">{title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {items.map(item => {
                        const isEquipped = profile.equippedCosmetics[cat as CosmeticType] === item.id;
                        const achievement = ACHIEVEMENTS.find(a => a.rewardCosmeticId === item.id);
                        const isUnlocked = item.unlockCondition.toLowerCase() === 'padrão' || (achievement && achievement.requirement(profile)) || profile.unlockedCosmetics?.includes(item.id);
                        
                        return (
                          <div 
                            key={item.id} 
                            onClick={() => {
                              if (isUnlocked) {
                                const { equipCosmetic } = useAppStore.getState();
                                equipCosmetic(cat as CosmeticType, item.id);
                              }
                            }}
                            className={`p-4 rounded-xl border flex flex-col justify-between min-h-[120px] relative overflow-hidden transition-all cursor-pointer ${
                              isEquipped ? 'bg-neon-blue/10 border-neon-blue box-glow-blue' : isUnlocked ? 'bg-surface border-surface-light hover:border-white/20' : 'bg-surface/30 border-surface-light/30 opacity-60 grayscale'
                            }`}
                          >
                            {!isUnlocked && (
                              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                <Lock size={20} className="text-white/40 mb-4" />
                              </div>
                            )}
                            {item.color && (
                               <div className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-40 rounded-full pointer-events-none" style={{ backgroundColor: item.color }} />
                            )}
                            <div className="relative z-10">
                               <p className={`text-[9px] font-bold uppercase tracking-widest mb-1 px-1.5 py-0.5 rounded-sm inline-block ${item.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' : item.rarity === 'rare' ? 'bg-blue-500/20 text-neon-blue' : item.rarity === 'epic' ? 'bg-purple-500/20 text-neon-purple' : 'bg-amber-500/20 text-amber-500'}`}>{item.rarity}</p>
                               <h4 className="font-bold text-sm text-white mt-1 leading-tight">{item.name}</h4>
                            </div>
                            <div className="relative z-10">
                              {isEquipped ? (
                                <div className="text-[10px] font-bold text-neon-blue uppercase mt-3 bg-neon-blue/20 py-1 px-2 rounded-md inline-block">Equipado</div>
                              ) : (
                                <p className="text-[9px] text-text-secondary mt-3 leading-tight opacity-80">{isUnlocked ? 'Clique para Equipar' : `Desbloqueio: ${item.unlockCondition}`}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <motion.div key="ach" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {ACHIEVEMENTS.map(ach => {
                const isUnlocked = ach.requirement(profile);
                const rarityColor = ach.rarity === 'common' ? 'text-gray-400' : ach.rarity === 'rare' ? 'text-neon-blue' : ach.rarity === 'epic' ? 'text-neon-purple' : 'text-amber-500';
                const borderColor = ach.rarity === 'common' ? 'border-surface-light' : ach.rarity === 'rare' ? 'border-neon-blue/30' : ach.rarity === 'epic' ? 'border-neon-purple/30' : 'border-amber-500/30';

                return (
                  <div key={ach.id} className={`p-5 rounded-2xl border relative overflow-hidden flex gap-4 items-center ${isUnlocked ? `bg-surface ${borderColor}` : 'bg-surface/30 border-surface-light/30 grayscale opacity-60'}`}>
                    {isUnlocked && (
                       <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl opacity-10 rounded-full bg-current ${rarityColor}`} />
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${isUnlocked ? `${borderColor} bg-background` : 'border-white/10 bg-white/5'}`}>
                      {isUnlocked ? <Trophy size={20} className={rarityColor.replace('text-', 'stroke-')} /> : <Lock size={20} className="text-text-secondary" />}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm">{ach.name}</h4>
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-current ${rarityColor}`}>{ach.rarity}</span>
                      </div>
                      <p className="text-xs text-text-secondary">{ach.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}
