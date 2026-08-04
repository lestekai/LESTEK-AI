'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { BottomNav } from '@/components/BottomNav';
import { Trophy, Flame, Star, Crown, Shield, Zap, Target, Lock, Gift, Eye, Sword, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/Header';
import { PLANET_MISSIONS, getRankTier, getRankFrameStyle, getPlanetTextureStyle, COSMETICS, ACHIEVEMENTS, calculateAvatarLevel, calculatePlanets, calculateEvoluxScore } from '@/lib/evolux';
import { MiniCosmicAvatar } from '@/components/MiniCosmicAvatar';



export default function RankingPage() {
  const { profile } = useAppStore();
  const [activeTab, setActiveTab] = useState<'meu_imperio' | 'global'>('meu_imperio');
  const [activeCosmeticTab, setActiveCosmeticTab] = useState<string>('todos');
  const [inspectUser, setInspectUser] = useState<any>(null);
  const [realUsers, setRealUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRealUsers() {
      const q = query(collection(db, 'profiles'), orderBy('xp', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const error = null;
        
      if (data && !error) {
        setRealUsers(data.map(p => {
           const equippedList = Object.values(p.equipped_cosmetics || {});
           const cosmeticAura = COSMETICS.find(c => equippedList.includes(c.id) && c.type === 'aura');
           
           return {
             id: p.id,
             name: p.name || p.username || 'Explorador',
             streak: p.streak || 0,
             xp: p.xp || 0,
             tasksCompleted: p.total_tasks_completed || 0,
             level: p.avatar_level || 1,
             isMe: p.id === profile?.id,
             planets: calculatePlanets(p.streak || 0),
             badges: (p.avatar_level >= 11 ? ['epic', 'legendary'] : p.avatar_level >= 5 ? ['rare', 'epic'] : p.avatar_level >= 3 ? ['rare'] : []),
             aura: cosmeticAura?.color || 'rgba(0,240,255,0.2)',
             score: calculateEvoluxScore(p.streak || 0, p.xp || 0, p.total_tasks_completed || 0),
             plan: p.equipped_cosmetics?.plan || 'base'
           };
        }));
      }
    }
    
    if (activeTab === 'global') {
      fetchRealUsers();
    }
  }, [activeTab, profile?.id]);

  if (!profile) return null;

  const unlockedCosmeticIds = [
    ...COSMETICS.filter(c => c.unlockCondition.toLowerCase() === 'padrão').map(c => c.id),
    ...ACHIEVEMENTS.filter(a => 
      profile.unlockedAchievements?.includes(a.id) || a.requirement(profile)
    ).map(a => a.rewardCosmeticId).filter(Boolean)
  ];
  const equippedCosmetics = COSMETICS.filter(c => Object.values(profile.equippedCosmetics || {}).includes(c.id));
  
  // Calculate strict level based on planets fully owned by streak
  const myStrictLevel = profile.avatarLevel; // Use profile.avatarLevel which is XP based
  const myPlanets = calculatePlanets(profile.streak);
  const myBadges = myStrictLevel >= 11 ? ['epic', 'legendary'] : myStrictLevel >= 5 ? ['rare', 'epic'] : myStrictLevel >= 3 ? ['rare'] : [];
  
  // Try to find the best aura, or fallback to the current
  const myAuraColor = equippedCosmetics.find(c => c.type === 'aura')?.color || 'rgba(0,240,255,0.2)';
  
  const myScore = calculateEvoluxScore(profile.streak, profile.xp || 0, profile.totalTasksCompleted || 0);

  // Combine real users (with simulated fallback if needed) with current user
  const otherUsers = realUsers.filter(u => u.id !== profile.id);

  const allUsers = [
    ...otherUsers,
    { 
      id: profile.id, 
      name: profile.name, 
      streak: profile.streak, 
      xp: profile.xp || 0,
      tasksCompleted: profile.totalTasksCompleted || 0,
      level: myStrictLevel, 
      isMe: true, 
      planets: myPlanets, 
      badges: myBadges, 
      aura: myAuraColor,
      score: myScore,
      plan: profile.plan
    }
  ];

  // Sort by score 
  allUsers.sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden relative">
      <Header title="Hub Global" subtitle="A máquina não para." />

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Banner Control */}
      <div className="px-4 mt-6 relative z-20 flex justify-center">
        <div className="flex bg-surface-light rounded-full p-1 border border-white/5 w-full max-w-sm">
          <button 
            onClick={() => setActiveTab('meu_imperio')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 ${activeTab === 'meu_imperio' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(150,0,255,0.4)]' : 'text-text-secondary'}`}
          >
            <Star size={16} /> Meu Império
          </button>
          <button 
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 ${activeTab === 'global' ? 'bg-neon-blue text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-text-secondary'}`}
          >
            <Trophy size={16} /> Supremacia
          </button>
        </div>
      </div>

      <main className="p-4 pt-8 space-y-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MEU IMPERIO */}
          {activeTab === 'meu_imperio' && (
            <motion.div
              key="tab-meu_imperio"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {/* SEU AVATAR EM DESTAQUE */}
              <section className="flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-20 mt-10 flex justify-center"
                >
                  <div className="relative">
                    <div className="relative flex items-center justify-center">
                      <MiniCosmicAvatar streak={profile.streak} auraColor={myAuraColor} size={160} cosmetics={equippedCosmetics} />
                    </div>
                    
                    {/* Info Badge overlay */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface border border-white/10 px-6 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3 z-30">
                      <Star size={18} className={getRankTier(myStrictLevel).color} />
                      <span className="text-sm font-bold text-white tracking-widest">{profile.name}</span>
                      <span className="text-xs text-text-secondary font-mono">NVL {myStrictLevel}</span>
                    </div>
                  </div>
                </motion.div>
                
                <div className="text-center mt-8">
                  <span className="text-xs text-text-secondary uppercase tracking-widest block mb-1">Poder Evolux</span>
                  <div className="text-5xl font-black font-display tracking-tighter" style={{ color: '#fff', textShadow: `0 0 20px ${myAuraColor}, 0 0 40px ${myAuraColor}` }}>
                     {myScore.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 mt-6 bg-surface/40 p-5 rounded-3xl border border-surface-light w-full max-w-sm backdrop-blur-sm shadow-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Streak</span>
                    <span className="text-xl font-bold text-amber-500 flex items-center gap-1"><Flame size={18}/> {profile.streak}</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Missões</span>
                    <span className="text-xl font-bold text-neon-purple flex items-center gap-1">{profile.totalTasksCompleted || 0} <Target size={18}/></span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Classe</span>
                    <span className={`text-base flex items-center gap-1 font-black uppercase tracking-tighter ${getRankTier(myStrictLevel).color}`}>
                      {getRankTier(myStrictLevel).name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </section>

              {/* GALÁXIA DO USUÁRIO (PLANETAS) */}
              <section>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Crown size={18} className="text-amber-500" />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Sistema Solar</h3>
                    <p className="text-[10px] text-text-secondary">Expanda seu império mantendo a constância.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PLANET_MISSIONS.map((planet, i) => {
                    const isUnlocked = profile.streak >= planet.streakReq;
                    return (
                      <motion.div 
                        key={planet.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`relative overflow-hidden p-4 rounded-2xl border flex items-center gap-4 group transition-all ${isUnlocked ? 'bg-surface/50 border-white/10 hover:border-white/20' : 'bg-background border-surface-light/50 opacity-70 grayscale'}`}
                      >
                        {isUnlocked && <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] pointer-events-none opacity-20" style={{ backgroundColor: planet.color }} />}
                        
                        {/* Realistic Planet Visual */}
                        <div className="w-16 h-16 rounded-full relative shrink-0 flex items-center justify-center">
                           {!isUnlocked && <Lock size={20} className="text-white/20 absolute z-30" />}
                           {isUnlocked && <div className="absolute inset-0 rounded-full blur-[10px] opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: planet.color }} />}
                           <div 
                             className={`absolute ${isUnlocked ? 'inset-1' : 'inset-0'} rounded-full overflow-hidden flex items-center justify-center`} 
                             style={{ 
                               backgroundColor: isUnlocked ? planet.color : '#111',
                               boxShadow: isUnlocked ? `inset -6px -6px 12px rgba(0,0,0,0.8), inset 3px 3px 8px rgba(255,255,255,0.5), 0 0 15px ${planet.color}` : 'inset -2px -2px 8px rgba(0,0,0,0.8)' 
                             }} 
                           >
                              {/* Texture overlay via CSS repeating linear gradient to simulate stripes */}
                              {isUnlocked && (
                                <>
                                  <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 30% 30%, transparent 30%, rgba(0,0,0,0.9) 90%)` }} />
                                  <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={getPlanetTextureStyle(planet.name)} />
                                </>
                              )}
                           </div>
                        </div>

                        <div className="flex-1 min-w-0 z-10">
                          <h4 className={`font-black text-sm uppercase tracking-wider ${isUnlocked ? 'text-white' : 'text-text-secondary blur-[2px]'}`} style={isUnlocked ? { textShadow: `0 0 10px ${planet.color}` } : {}}>
                            {isUnlocked ? planet.name : 'Desconhecido'}
                          </h4>
                          <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">
                            {isUnlocked ? `Nível ${planet.level}` : 'Restrito'} 
                            <span className="mx-2 text-white/10">|</span> 
                            <span className={isUnlocked ? 'text-amber-500' : ''}>{planet.streakReq} dias</span>
                          </p>
                          <p className={`text-xs text-text-secondary italic line-clamp-2 ${isUnlocked ? '' : 'blur-[3px]'}`}>
                            &quot;{isUnlocked ? planet.phrase : 'A constância revelará os segredos deste corpo celeste oculto no vazio.'}&quot;
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </section>

              {/* ARMÁRIO EVOLUX (INVENTÁRIO COMPLETO) */}
              <section id="armario">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-neon-blue" />
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Equipamento Atual</h3>
                      <p className="text-[10px] text-text-secondary">O seu loadout cósmico.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-10 px-2">
                   {['aura', 'coroa', 'olhos', 'armadura', 'arma', 'satelite', 'particula'].map(slot => {
                      const equippedItem = equippedCosmetics.find(c => c.type === slot);
                      
                      return (
                        <div key={slot} className="bg-surface/50 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none" />
                           <span className="text-[8px] font-bold text-text-secondary uppercase mb-2 block tracking-widest">{slot}</span>
                           <div className="w-10 h-10 rounded shadow-inner bg-black/50 border border-white/5 flex items-center justify-center mb-2" style={{ borderColor: equippedItem ? equippedItem.color || 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}>
                             {equippedItem ? (
                               <>
                                 {slot === 'aura' && <Sparkles size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'coroa' && <Crown size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'olhos' && <Eye size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'armadura' && <Shield size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'arma' && <Sword size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'satelite' && <Cpu size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                                 {slot === 'particula' && <Star size={16} style={{ color: equippedItem.color || '#fff' }} className="drop-shadow-lg" />}
                               </>
                             ) : (
                               <div className="w-2 h-2 bg-white/10 rounded-full" />
                             )}
                           </div>
                           {equippedItem ? (
                             <span className="text-[9px] font-bold text-white truncate w-full">{equippedItem.name}</span>
                           ) : (
                             <span className="text-[9px] text-text-secondary">Vazio</span>
                           )}
                        </div>
                      )
                   })}
                </div>

                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-neon-purple" />
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Armazém Evolux</h3>
                      <p className="text-[10px] text-text-secondary">Colete, evolua e equipe itens únicos.</p>
                    </div>
                  </div>
                </div>

                {/* Categorias */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-2 px-2 mask-linear">
                  {['Todos', 'Aura', 'Coroa', 'Olhos', 'Armadura', 'Arma', 'Satelite', 'Particula'].map(tab => (
                     <button
                       key={tab}
                       onClick={() => setActiveCosmeticTab(tab.toLowerCase())}
                       className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors border ${activeCosmeticTab === tab.toLowerCase() ? 'bg-white text-black border-white' : 'bg-surface border-white/10 text-text-secondary hover:text-white hover:border-white/30'}`}
                     >
                       {tab}
                     </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COSMETICS.filter(c => activeCosmeticTab === 'todos' || c.type === activeCosmeticTab.replace('á', 'a').replace('í', 'i')).map((cosmetic, i) => {
                    // Check if unlocked (defaults or by achievement)
                    const isDefault = cosmetic.unlockCondition.toLowerCase() === 'padrão';
                    const achievementReward = ACHIEVEMENTS.find(a => a.rewardCosmeticId === cosmetic.id);
                    const unlocked = isDefault || (achievementReward && profile.unlockedAchievements?.includes(achievementReward.id));
                    
                    const isMythic = cosmetic.rarity === 'legendary';
                    const isLegendary = cosmetic.rarity === 'legendary';
                    const isEpic = cosmetic.rarity === 'epic';
                    const isRare = cosmetic.rarity === 'rare';
                    
                    const rarityStyle = isMythic ? 'bg-background border-[#ff003c] shadow-[0_0_20px_rgba(255,0,60,0.3)]'
                      : isLegendary ? 'bg-background border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                      : isEpic ? 'bg-background border-neon-purple shadow-[0_0_10px_rgba(150,0,255,0.1)]'
                      : isRare ? 'bg-background border-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                      : 'bg-background border-[#444] shadow-sm';

                    const isEquipped = profile.equippedCosmetics?.[cosmetic.type] === cosmetic.id;

                    return (
                      <motion.div 
                        key={cosmetic.id} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-4 rounded-2xl border flex flex-col relative overflow-hidden group ${rarityStyle} ${!unlocked ? 'opacity-80' : ''}`}
                      >
                         {/* Neon rarity line at the top */}
                         <div 
                           className={`absolute top-0 left-0 w-full h-1.5 z-20 ${!unlocked ? 'opacity-50' : ''}`} 
                           style={{ 
                             backgroundColor: isMythic ? '#ff003c' : isLegendary ? '#f59e0b' : isEpic ? '#9d00ff' : isRare ? '#00f0ff' : '#444',
                             boxShadow: isMythic ? '0 0 10px #ff003c, 0 0 20px #ff003c' : isLegendary ? '0 0 10px #f59e0b, 0 0 20px #f59e0b' : isEpic ? '0 0 10px #9d00ff, 0 0 20px #9d00ff' : isRare ? '0 0 10px #00f0ff, 0 0 20px #00f0ff' : 'none'
                           }} 
                         />

                         {isLegendary && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen" />}
                         {isEpic && <div className="absolute inset-0 bg-neon-purple/5 opacity-50 pointer-events-none mix-blend-screen pulse-slow" />}
                         
                         {!unlocked && (
                           <div className="absolute top-4 right-4 z-30">
                             <Lock size={16} className="text-white/50 drop-shadow-md" />
                           </div>
                         )}
                         {isEquipped && (
                           <div className="absolute top-0 right-0 bg-white text-black text-[8px] font-bold px-3 py-1 rounded-bl-xl z-20">
                             EQUIPADO
                           </div>
                         )}

                         <div className="flex gap-4">
                           {/* Cosmetic Visualizer (Realistic) */}
                           <div 
                              className={`w-16 h-16 rounded-xl shrink-0 relative flex items-center justify-center overflow-hidden flex-col ${!unlocked ? 'grayscale opacity-70' : ''}`}
                              style={{ 
                                backgroundColor: '#000',
                                border: `1px solid ${isMythic ? '#ff003c50' : isLegendary ? '#f59e0b50' : isEpic ? '#9d00ff50' : isRare ? '#00f0ff50' : '#44444450'}`,
                                boxShadow: isMythic ? 'inset 0 0 20px rgba(255,0,60,0.3)' : isLegendary ? 'inset 0 0 15px rgba(245,158,11,0.2)' : isEpic ? 'inset 0 0 15px rgba(157,0,255,0.2)' : isRare ? 'inset 0 0 10px rgba(0,240,255,0.1)' : 'inset 0 0 10px rgba(0,0,0,0.5)'
                              }}
                           >
                             <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none z-0" />
                             <div className="relative z-10 drop-shadow-lg" style={{ color: cosmetic.color || '#fff' }}>
                               {cosmetic.type === 'aura' && <Sparkles size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'coroa' && <Crown size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'arma' && <Sword size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'olhos' && <Eye size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'armadura' && <Shield size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'satelite' && <Cpu size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                               {cosmetic.type === 'particula' && <Star size={28} className="drop-shadow-[0_0_10px_currentColor]" />}
                             </div>
                           </div>

                           <div className="relative z-10 flex-1 flex flex-col justify-center min-w-0">
                             <div className="flex justify-between items-start mb-1">
                               <div className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${isLegendary ? 'text-amber-400 border-amber-900 bg-amber-900/20' : isEpic ? 'text-neon-purple border-purple-900 bg-purple-900/20' : isRare ? 'text-neon-blue border-blue-900 bg-blue-900/20': 'text-text-secondary border-white/10'}`}>
                                 {cosmetic.rarity}
                               </div>
                               <div className="text-[8px] font-bold uppercase tracking-widest text-text-secondary ml-2">
                                 {cosmetic.type}
                               </div>
                             </div>
                             
                             <h4 className={`text-sm font-bold truncate ${unlocked && isLegendary ? 'text-amber-500' : unlocked && isEpic ? 'text-neon-purple' : 'text-white'}`}>{cosmetic.name}</h4>
                           </div>
                         </div>

                         <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 relative z-10">
                           <p className="text-[10px] text-text-secondary leading-tight italic line-clamp-2">&quot;{cosmetic.description}&quot;</p>
                           
                           <div className="flex flex-col gap-1 mt-1">
                              <span className="text-[8px] font-bold text-text-secondary tracking-widest uppercase">Requisitos</span>
                              <div className="flex flex-wrap gap-1">
                                {cosmetic.requirements?.map((req, idx) => (
                                  <span key={idx} className="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded text-[8px] text-white/80 whitespace-nowrap">
                                    {req}
                                  </span>
                                ))}
                              </div>
                           </div>

                           <p className="text-[9px] text-text-secondary font-mono bg-black/40 p-1.5 rounded border border-white/5 truncate mt-1">
                             <span className="opacity-50 text-neon-blue">🔑 Como obter:</span> {cosmetic.unlockCondition}
                           </p>

                           {unlocked && (
                             <button
                               onClick={() => useAppStore.getState().equipCosmetic(cosmetic.type, cosmetic.id)}
                               className={`mt-2 w-full py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isEquipped ? 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10' : 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:scale-[1.02]'}`}
                             >
                               {isEquipped ? 'Desequipar (Test Mode)' : 'Equipar'}
                             </button>
                           )}
                         </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 2: GLOBAL */}
          {activeTab === 'global' && (
             <motion.div
              key="tab-global"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* FULL LIST */}
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Trophy size={16} className="text-amber-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Supremacia Global</h3>
                </div>
                {allUsers.map((user, index) => {
                  const isTop3 = index < 3;
                  const rank = getRankTier(user.level);
                  
                  let rankMedal = null;
                  if (index === 0) rankMedal = <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(234,179,8,0.5)] border border-yellow-500">1</div>;
                  else if (index === 1) rankMedal = <div className="w-8 h-8 rounded-full bg-slate-300/20 text-slate-300 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(203,213,225,0.4)] border border-slate-300">2</div>;
                  else if (index === 2) rankMedal = <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-600 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(180,83,9,0.4)] border border-amber-700">3</div>;

                  return (
                    <motion.div
                      key={user.id}
                      onClick={() => setInspectUser(user)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center p-4 cursor-pointer rounded-2xl border transition-all ${
                        user.isMe 
                          ? 'bg-neon-blue/5 border-neon-blue box-glow-blue relative overflow-hidden' 
                          : isTop3 
                            ? 'bg-surface/80 border-white/20 hover:bg-surface' 
                            : 'bg-surface border-surface-light hover:border-white/10'
                      }`}
                    >
                      {user.isMe && <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-transparent pointer-events-none" />}
                      
                      <div className="w-12 h-12 flex justify-center shrink-0 relative z-10 rounded-full border-2 bg-background flex items-center justify-center font-bold text-sm shadow-md" style={getRankFrameStyle(rank.frame)}>
                        {rankMedal || index + 1}
                      </div>
                      
                      <div className="flex-1 ml-4 relative z-10">
                        <div className="flex items-center gap-2">
                           <p className={`font-bold transition-all ${
                             user.plan === 'infinite' 
                               ? 'text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,127,0.5)] text-base' 
                               : user.isMe 
                               ? 'text-neon-blue text-base' 
                               : isTop3 
                               ? 'text-white text-base' 
                               : 'text-white text-sm'
                           }`}>
                              {user.name} {user.isMe && <span className="text-[10px] uppercase font-normal text-text-secondary tracking-widest ml-1">(Você)</span>}
                           </p>
                           {user.plan === 'infinite' && (
                             <div className="bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter animate-pulse">
                               Fundador
                             </div>
                           )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-text-secondary">
                            <Star size={12} className={rank.color} /> Nvl {user.level}
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${rank.color}`}>
                             {rank.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                           <div className="flex items-center gap-0.5" title="Planetas dominados">
                             {Array.from({ length: Math.min(10, user.planets) }).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-neon-blue box-glow-blue" />
                             ))}
                             {user.planets > 10 && <span className="text-[8px] text-neon-blue ml-1">+{user.planets - 10}</span>}
                           </div>

                           <div className="flex items-center gap-1 ml-2 border-l border-surface-light pl-2" title="Relíquias raras">
                              {user.badges.map((badge, i) => {
                                 const bColor = badge === 'common' ? 'text-gray-400' : badge === 'rare' ? 'text-neon-blue' : badge === 'epic' ? 'text-neon-purple' : 'text-amber-500';
                                 return <Shield key={i} size={10} className={bColor} />;
                              })}
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 relative z-10">
                         <div className={`font-black font-display tracking-tighter ${isTop3 || user.isMe ? 'text-2xl' : 'text-lg'}`} style={{ color: user.isMe ? '#00f0ff' : 'white', textShadow: user.isMe ? '0 0 10px rgba(0,240,255,0.5)' : isTop3 ? '0 0 10px rgba(255,255,255,0.2)' : 'none' }}>
                           {user.score.toLocaleString()}
                         </div>
                         <div className="flex items-center gap-2 text-[9px] text-text-secondary uppercase mt-1 bg-surface-light px-2 py-0.5 rounded-full border border-white/5">
                           <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Flame size={10} /> {user.streak}</span>
                           <span className="w-px h-2 bg-white/20" />
                           <span className="flex items-center gap-0.5 text-neon-purple font-bold">{user.tasksCompleted} <Target size={10} /></span>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* INSPECT PLAYER MODAL */}
      <AnimatePresence>
        {inspectUser && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-5 backdrop-blur-xl"
            onClick={() => setInspectUser(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border-2 w-full max-w-sm rounded-[2rem] p-6 text-center shadow-2xl relative overflow-hidden"
              style={getRankFrameStyle(getRankTier(inspectUser.level).frame)}
            >
              <button 
                onClick={() => setInspectUser(null)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full z-20 hover:bg-white/20 transition-colors"
               >
                X
              </button>

              <div className="absolute top-0 right-[-10%] w-32 h-32 blur-[40px] pointer-events-none opacity-50" style={{ backgroundColor: inspectUser.aura || '#00f0ff' }} />
              
              <div className="flex justify-center mb-6 relative">
                 <MiniCosmicAvatar streak={inspectUser.streak} auraColor={inspectUser.aura || '#00f0ff'} size={120} />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-1" style={{ textShadow: `0 0 10px ${inspectUser.aura || '#00f0ff'}` }}>{inspectUser.name}</h3>
              <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${getRankTier(inspectUser.level).color}`}>{getRankTier(inspectUser.level).name}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Streak</span>
                  <span className="text-lg font-bold text-amber-500 font-mono">{inspectUser.streak}</span>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Poder Global</span>
                  <span className="text-lg font-bold text-white font-mono">{inspectUser.score.toLocaleString()}</span>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Planetas</span>
                  <span className="text-lg font-bold text-neon-blue font-mono">{inspectUser.planets}</span>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Missões</span>
                  <span className="text-lg font-bold text-neon-purple font-mono">{inspectUser.tasksCompleted}</span>
                </div>
              </div>

              <div className="text-left mt-4 border-t border-white/10 pt-4 relative z-10">
                 <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest block mb-2">Relíquias Equipadas</span>
                 <div className="flex gap-2">
                    {inspectUser.badges.length > 0 ? inspectUser.badges.map((badge: string, i: number) => {
                       const bColor = badge === 'common' ? 'text-gray-400' : badge === 'rare' ? 'text-neon-blue' : badge === 'epic' ? 'text-neon-purple' : 'text-amber-500';
                       return (
                         <div key={i} className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-black/50">
                           <Shield size={14} className={bColor} />
                         </div>
                       );
                    }) : (
                      <span className="text-xs text-text-secondary">Nenhuma relíquia</span>
                    )}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
