import { Link, useNavigate } from 'react-router-dom';
'use client';

import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/lib/store';
import { useWorkoutStore } from '@/lib/workoutStore';
import { BottomNav } from '@/components/BottomNav';
import { Flame, Star, ChevronRight, CheckCircle2, Circle, Dumbbell, Trophy, Cpu, Target, Shield, Zap, Activity, Globe, Rocket, ArrowRight } from 'lucide-react';

import { ProfileMenu } from '@/components/ProfileMenu';
import { MiniCosmicAvatar } from '@/components/MiniCosmicAvatar';
import { getUnlockedPlanets, calculateEvoluxScore, getRankTier, getRankFrameStyle, getPlanetTextureStyle, PLANET_MISSIONS, COSMETICS } from '@/lib/evolux';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, tasks, checkStreak, toggleTask } = useAppStore();
  const { currentPlan } = useWorkoutStore();
  const [feedbackState, setFeedbackState] = useState<{status: 'idle'|'loading'|'success'|'error', message: string}>({status: 'idle', message: ''});

  useEffect(() => {
    if (!profile) {
      navigate('/login');
    } else if (!profile.isOnboarded) {
      navigate('/onboarding');
    } else {
      checkStreak();
      
      // Sanitizar tarefas com IDs duplicados para evitar erros de renderização (React Keys)
      const { tasks: currentTasks, goals: currentGoals, setTasks, setGoals } = useAppStore.getState();
      const hasDuplicateTasks = currentTasks.some((t, i) => currentTasks.findIndex(o => o.id === t.id) !== i);
      if (hasDuplicateTasks) {
        setTasks(currentTasks);
      }
      const hasDuplicateGoals = currentGoals.some((g, i) => currentGoals.findIndex(o => o.id === g.id) !== i);
      if (hasDuplicateGoals) {
        setGoals(currentGoals);
      }

      const hasRecurringTasks = currentTasks.some(t => t.isRecurring);
      if (!hasRecurringTasks && currentTasks.length === 0) {
        // Fallback: se o usuário já completou onboarding e não tem tarefas fixas
        const { addTask } = useAppStore.getState();
        addTask({ title: '💧 Hidratação Diária (2L+)', category: 'routine', xpReward: 10, isRecurring: true });
        addTask({ title: '🔥 Protocolo Físico (Treino ou Cardio Livre)', category: 'workout', xpReward: 25, isRecurring: true });
        addTask({ title: '🧠 Foco Total / Leitura (Sem distrações)', category: 'routine', xpReward: 20, isRecurring: true });
        addTask({ title: '🌙 Higiene do Sono (Telas off 1h antes)', category: 'routine', xpReward: 20, isRecurring: true });
      }
    }
  }, [profile, navigate, checkStreak, tasks]);

  if (!profile) return null;

  const getLocalDateStr = (d: Date) => {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };

  const todayStr = getLocalDateStr(new Date());
  const todaysTasks = tasks.filter(t => !t.isLongTerm && (
    t.date === todayStr ||
    (t.isRecurring && (t.baseDate ? t.baseDate <= todayStr : t.date <= todayStr))
  ));
  const completedTasks = todaysTasks.filter(t => t.completed).length;
  const progress = todaysTasks.length > 0 ? (completedTasks / todaysTasks.length) * 100 : 0;

  const pendingTask = todaysTasks.find(t => !t.completed);

  // Level & XP
  const level = profile.avatarLevel;
  const currentXp = profile.xp;
  const prevLevelXp = Math.pow(level - 1, 2) * 50;
  const nextLevelXp = Math.pow(level, 2) * 50;
  const xpIntoCurrentLevel = currentXp - prevLevelXp;
  const xpNeededForNext = nextLevelXp - prevLevelXp;
  const rawProgress = xpNeededForNext > 0 ? (xpIntoCurrentLevel / xpNeededForNext) * 100 : 0;
  const levelProgress = Math.max(0, Math.min(100, isNaN(rawProgress) ? 0 : rawProgress));

  // Determine today's workout
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0 para Segunda
  const todaysWorkout = currentPlan?.schedule?.[todayIndex];

  // AI Guidance Logic
  let aiMessage = "A constância é a sua maior arma. Mantenha os sistemas ativos.";
  if (profile.streak === 0) {
    aiMessage = "Sistemas reiniciados. A queda faz parte da simulação. Foque na velocidade do seu retorno hoje inciando uma nova ofensiva.";
  } else if (profile.streak < 3) {
    aiMessage = `Aquecimento dos motores. Constância atual: ${profile.streak} dias. Cumpra suas missões hoje para estabilizar sua órbita.`;
  } else if (profile.streak >= 7 && profile.streak < 14) {
    aiMessage = `Órbita terrestre superada. Você já liquidou ${profile.totalTasksCompleted} missões até agora. Mantenha a disciplina implacável.`;
  } else {
    aiMessage = `Poder confirmado: Ofensiva de ${profile.streak} dias. Sua execução perfeita de ${profile.totalTasksCompleted} missões eleva o seu percentual de dominância no sistema.`;
  }

  // Rank & Planet Data
  const evoluxScore = calculateEvoluxScore(profile.streak, profile.xp, profile.totalTasksCompleted);
  const rank = getRankTier(level);
  const frameStyle = getRankFrameStyle(rank.frame);
  const unlockedPlanets = getUnlockedPlanets(profile.streak);
  const currentPlanet = unlockedPlanets.length > 0 ? unlockedPlanets[unlockedPlanets.length - 1] : { name: 'Órbita Inicial', color: '#555555' };
  const nextPlanet = PLANET_MISSIONS.find(p => p.streakReq > profile.streak) || PLANET_MISSIONS[0];
  
  const equippedCosmetics = COSMETICS.filter(c => Object.values(profile.equippedCosmetics || {}).includes(c.id));
  const myAuraColor = equippedCosmetics.find(c => c.type === 'aura')?.color || 'rgba(0,240,255,0.2)';

  return (
    <div className="min-h-screen bg-background pb-28 overflow-x-hidden selection:bg-neon-blue/30 selection:text-white">
      {/* Premium Header / Status */}
      <header className="px-6 pt-12 pb-8 bg-surface relative z-[60] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-b-[2rem] border-b border-white/5">
        <div className="absolute inset-0 rounded-b-[2rem] overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="absolute top-0 left-[-10%] w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px] -translate-y-1/2" />
        </div>
        
        <div className="relative z-50 flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            
            {/* Level / Avatar Area */}
            <div className="relative group cursor-pointer" onClick={() => navigate('/avatar')}>
              <div className="absolute inset-0 bg-neon-blue/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-14 w-14 rounded-2xl bg-background border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group-hover:border-neon-blue/50 transition-colors">
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay rotate-12" />
                <span className="text-[9px] text-text-secondary uppercase font-bold tracking-widest mb-[1px] relative z-10">Lvl</span>
                <span className="text-xl font-black text-white font-mono leading-none relative z-10">{level}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-text-secondary font-display tracking-[0.2em] uppercase mb-1">Operador Atual</p>
              <h1 className="text-xl font-bold font-display tracking-tight text-white leading-none mb-2">{profile.name}</h1>
              <div className="flex items-center gap-2">
                 <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-background border border-white/5 ${rank.color} shadow-sm`}>{rank.name}</span>
                 <span className="text-[9px] font-bold text-neon-blue uppercase tracking-widest px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20">{evoluxScore} PTS</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 z-50">
            <ProfileMenu />
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="relative z-10 w-full mt-2">
           <div className="flex justify-between items-center mb-2 px-1">
             <span className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">Progressão de Nível</span>
             <span className="text-[10px] font-mono text-white/50">{currentXp} <span className="text-white/20">/</span> {nextLevelXp} XP</span>
           </div>
           <div className="h-1.5 bg-background/80 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${levelProgress}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute top-0 left-0 h-full bg-neon-blue box-glow-blue"
             >
                <div className="absolute top-0 right-0 w-8 h-full bg-white/50 blur-[2px]" />
             </motion.div>
           </div>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-6 -mt-4 relative z-50">
        
        {/* IA Insight Card */}
        <motion.section 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
        >
           <Link to="/ai-coach" className="block bg-background border border-neon-blue/20 hover:border-neon-blue/50 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)] group transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center shrink-0 box-glow-blue group-hover:scale-105 transition-transform">
                 <Cpu size={20} className="text-neon-blue" />
              </div>
              <div className="flex-1">
                 <div className="text-[9px] font-bold text-neon-blue uppercase tracking-widest mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Zap size={10} /> IA Evolux Online</span>
                    <span className="text-[8px] bg-neon-blue/15 px-2 py-0.5 rounded border border-neon-blue/30 text-white flex items-center gap-1 font-mono transition-colors group-hover:bg-neon-blue/30">Converse Agora <ArrowRight size={8} /></span>
                 </div>
                 <p className="text-xs text-white leading-relaxed">{aiMessage}</p>
              </div>
           </Link>
        </motion.section>

        {/* Status Grid (O COMO ESTOU) */}
        <section>
           <h2 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 px-2 flex items-center gap-2">
              <Activity size={12} className="text-white" />
              Métricas do Dia
           </h2>
           <div className="grid grid-cols-2 gap-3">
              <Link to="/tasks" className="bg-surface p-4 rounded-2xl border border-surface-light hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-neon-purple/5 to-transparent" />
                 <CheckCircle2 size={16} className="text-neon-purple mb-2" />
                 <span className="text-2xl font-bold text-white font-mono">{completedTasks} <span className="text-sm text-text-secondary">/ {todaysTasks.length}</span></span>
                 <span className="text-[9px] uppercase tracking-widest text-text-secondary mt-1">Missões Hoje</span>
              </Link>
              
              <div className="bg-surface p-4 rounded-2xl border border-surface-light flex flex-col relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />
                 <Flame size={16} className="text-amber-500 mb-2" />
                 <span className="text-2xl font-bold text-white font-mono">{profile.streak}</span>
                 <span className="text-[9px] uppercase tracking-widest text-text-secondary mt-1">Dias de Foco</span>
              </div>
           </div>
        </section>

        {/* Today's Tasks list */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] font-bold tracking-widest text-text-secondary uppercase flex items-center gap-2">
              <Target size={12} /> Missões do Dia
            </h2>
            <Link to="/tasks" className="text-[10px] font-bold tracking-widest text-neon-purple uppercase hover:text-white transition-colors">
              Gerenciar
            </Link>
          </div>
          
          <div className="bg-surface p-5 rounded-2xl border border-surface-light shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{completedTasks} de {todaysTasks.length} tarefas</span>
              <span className="text-lg font-bold font-mono text-neon-purple">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-background rounded-full overflow-hidden mb-5 border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-neon-purple box-glow-purple relative"
              >
                <div className="absolute top-0 right-0 w-8 h-full bg-white/50 blur-[2px]" />
              </motion.div>
            </div>

            <div className="space-y-2">
              {todaysTasks.filter(t => !t.completed).length === 0 ? (
                <p className="text-[10px] uppercase tracking-widest text-text-secondary text-center py-6 bg-background rounded-xl border border-surface-light border-dashed">
                  {todaysTasks.length > 0 ? "Todas missões diárias concluídas" : "Nenhuma missão para hoje"}
                </p>
              ) : (
                todaysTasks.filter(t => !t.completed).slice(0, 5).map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:border-white/20 transition-all bg-background border-surface-light"
                  >
                    <Circle size={16} className="text-text-secondary shrink-0" />
                    <span className="text-[12px] font-bold text-white">
                      {task.title}
                    </span>
                  </div>
                ))
              )}
              {todaysTasks.length > 0 && progress === 100 && (
                <div className="mt-3 p-3 text-center bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
                  <p className="text-[10px] font-bold text-neon-purple uppercase tracking-widest shadow-sm">Protocolo Diário Concluído</p>
                </div>
              )}
              {todaysTasks.filter(t => !t.completed).length > 5 && (
                <Link to="/tasks" className="block text-center mt-3 text-[9px] font-bold text-text-secondary uppercase tracking-widest hover:text-white transition-colors">
                  +{todaysTasks.filter(t => !t.completed).length - 5} missões pendentes
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Workout section */}
        <section>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-[10px] font-bold tracking-widest uppercase text-neon-blue flex items-center gap-2">
               <Dumbbell size={12} /> Treino de Hoje
             </h2>
          </div>
          {currentPlan && todaysWorkout ? (
             <Link to="/workouts" className="block bg-surface p-5 rounded-2xl border border-surface-light shadow-lg hover:border-amber-500/50 transition-colors group relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] group-hover:bg-amber-500/20 transition-all" />
               <div className="flex justify-between items-start mb-2 relative z-10">
                 <div>
                   <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">{todaysWorkout.dayName}</p>
                   <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{todaysWorkout.focus}</h3>
                   <p className="text-xs text-text-secondary">
                     {todaysWorkout.isRest ? 'Dia de descanso sistêmico.' : `${todaysWorkout.exercises?.length || 0} exercícios • Intensidade ${todaysWorkout.intensity}`}
                   </p>
                 </div>
                 <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                   <Dumbbell size={24} />
                 </div>
               </div>
               <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
                 <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Acessar protocolo {'>'}</span>
                 {todaysWorkout.isRest ? (
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 uppercase">Repouso</span>
                 ) : (
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.2)]">Iniciar</span>
                 )}
               </div>
             </Link>
          ) : (
             <Link to="/workouts" className="block bg-surface border border-surface-light border-dashed p-6 rounded-2xl text-center hover:border-amber-500/50 transition-colors">
               <Dumbbell size={32} className="text-text-secondary mx-auto mb-3 opacity-50" />
               <h3 className="text-white font-bold mb-1">Nenhum treino ativo</h3>
               <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-4">Monte seu protocolo de treino</p>
               <span className="inline-block bg-amber-500/10 text-amber-500 text-[10px] font-bold px-4 py-2 rounded-lg border border-amber-500/20 uppercase tracking-widest">
                 Criar Treino
               </span>
             </Link>
          )}
        </section>

        {/* Império / Planet (O QUE POSSO CONQUISTAR) */}
        <motion.section 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
           <h2 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-3 px-2 flex items-center gap-2">
              <Globe size={12} className="text-blue-400" />
              Domínio Espacial
           </h2>
           <Link to="/ranking" className="block bg-surface border border-surface-light rounded-3xl p-1 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="bg-background rounded-2xl p-5 relative overflow-hidden z-10 flex items-center gap-5">
                 {/* Planet Visual */}
                 <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: currentPlanet.color, border: `1px solid ${currentPlanet.color}`, boxShadow: `inset -6px -6px 12px rgba(0,0,0,0.8), inset 3px 3px 8px rgba(255,255,255,0.5), 0 0 20px ${currentPlanet.color}` }}>
                       <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 30% 30%, transparent 30%, rgba(0,0,0,0.9) 90%)` }} />
                       <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={getPlanetTextureStyle(currentPlanet.name)} />
                    </div>
                 </div>
                 
                 <div className="flex-1">
                    <span className="inline-block bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase mb-1 border border-blue-500/20">Planeta Atual</span>
                    <h3 className="text-xl font-bold text-white mb-2">{currentPlanet.name}</h3>
                    
                    {nextPlanet ? (
                       <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[9px] text-text-secondary uppercase tracking-widest">Prox: {nextPlanet.name}</span>
                             <span className="text-[9px] text-white font-bold">{nextPlanet.streakReq - profile.streak} dias</span>
                          </div>
                          <div className="h-1 bg-black rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (profile.streak / nextPlanet.streakReq) * 100)}%` }} />
                          </div>
                       </div>
                    ) : (
                       <p className="text-[9px] text-neon-blue uppercase tracking-widest mt-2 px-2 py-1 bg-neon-blue/10 rounded-md border border-neon-blue/20 text-center">Império Dominado</p>
                    )}
                 </div>
              </div>
           </Link>
        </motion.section>

        {/* Feedback Section */}

        <section className="mb-8">
          <div className="bg-surface p-5 rounded-2xl border border-surface-light hover:border-amber-500/30 transition-colors">
            <h2 className="text-sm font-bold tracking-widest text-text-secondary uppercase mb-3">Centro de Comunicação</h2>
            <p className="text-xs text-text-secondary mb-4">Envie feedbacks, denúncias ou sugestões diretamente ao comando base.</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              const message = formData.get('message') as string;
              const category = formData.get('category') as string;
              
              if (message.trim()) {
                setFeedbackState({ status: 'loading', message: 'Transmitindo mensagem...' });
                try {
                  const { auth, db } = await import('@/lib/firebase');
const { collection, addDoc } = await import('firebase/firestore');
                  const user = auth.currentUser;
                  
                  if (sessionError) {
                    console.error("Session error:", sessionError);
                  }
                  
                  if (session) {
                    try {
                      await addDoc(collection(db, 'feedbacks'), {
                        user_id: user.uid,
                        message: feedbackText,
                        status: 'pending',
                        created_at: new Date().toISOString()
                      });
                    } catch(e) { throw e; }
                    
                    if (!error) {
                      setFeedbackState({ status: 'success', message: 'Feedback enviado com sucesso ao Centro de Comando!' });
                      form.reset();
                    } else {
                      console.error("Insert error:", error);
                      setFeedbackState({ status: 'error', message: `Erro ao enviar feedback: ${error.message}` });
                    }
                  } else {
                    // Fallback para usuário offline / convidado
                    setFeedbackState({ status: 'success', message: 'Feedback registrado no diário de bordo.' });
                    form.reset();
                  }
                } catch (err: any) {
                  console.error("Feedback catch error:", err);
                  setFeedbackState({ status: 'error', message: `Ocorreu um erro no módulo de comunicação.` });
                }
                
                // Limpar a mensagem de sucesso/erro após 5 segundos
                setTimeout(() => {
                  setFeedbackState(prev => prev.status !== 'loading' ? { status: 'idle', message: '' } : prev);
                }, 5000);
              }
            }} className="flex flex-col gap-3">
              {feedbackState.message && (
                <div className={`p-3 rounded-xl text-xs font-medium border ${feedbackState.status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : feedbackState.status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'} transition-opacity`}>
                  {feedbackState.message}
                </div>
              )}
              <select name="category" className="w-full bg-background border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                <option value="feedback">Feedback Geral</option>
                <option value="sugestao">Sugestão de Melhoria</option>
                <option value="problema">Reportar Bug / Problema</option>
                <option value="denuncia">Denúncia</option>
              </select>
              <textarea 
                name="message"
                placeholder="Descreva aqui sua mensagem..."
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-amber-500/50 resize-none h-24"
                required
              />
              <button 
                type="submit"
                className="w-full bg-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-amber-500/30 transition-colors border border-amber-500/30"
              >
                Transmitir Mensagem
              </button>
            </form>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
