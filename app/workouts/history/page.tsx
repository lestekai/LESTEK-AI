'use client';

import { useWorkoutStore } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Clock, Activity, Award, Flame, Zap, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { workoutHistory } = useWorkoutStore();
  const { profile, showPremiumModal } = useAppStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | 'all'>('7d');
  const [chartMetric, setChartMetric] = useState<'duration' | 'volume'>('volume');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const totalXpEarned = workoutHistory.reduce((acc, log) => acc + (200 + (log.durationMinutes * 10)), 0);

  const chartData = useMemo(() => {
    if (workoutHistory.length === 0) return [];

    let daysToInclude = Infinity;
    if (chartPeriod === '7d') daysToInclude = 7;
    if (chartPeriod === '30d') daysToInclude = 30;

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - daysToInclude);

    const filtered = workoutHistory.filter(log => {
      if (daysToInclude === Infinity) return true;
      return new Date(log.date) >= limitDate;
    });

    const grouped: Record<string, { date: string, volume: number, duration: number }> = {};

    filtered.forEach(log => {
      const d = new Date(log.date);
      const dayKey = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (!grouped[dayKey]) {
        grouped[dayKey] = { date: dayKey, volume: 0, duration: 0 };
      }
      grouped[dayKey].volume += log.totalVolume;
      grouped[dayKey].duration += log.durationMinutes;
    });

    // Make sure we have a chronological array
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      const [dayA, monthA] = a.split('/');
      const [dayB, monthB] = b.split('/');
      return new Date(2024, parseInt(monthA) - 1, parseInt(dayA)).getTime() - new Date(2024, parseInt(monthB) - 1, parseInt(dayB)).getTime();
    });

    const finalData = sortedDates.map(date => grouped[date]);
    return finalData;
  }, [workoutHistory, chartPeriod]);

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-x-hidden">
      <header className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-20 flex justify-between items-center border-b border-surface-light">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-white p-2 shrink-0 bg-surface rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold font-display text-white tracking-wide">Histórico & Gráficos</h1>
        </div>
      </header>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <main className="p-6 relative z-10 space-y-10">
        {workoutHistory.length === 0 ? (
           <div className="bg-surface/50 border border-surface-light border-dashed p-8 rounded-[2rem] text-center flex flex-col items-center mt-10">
             <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
               <Clock size={32} className="text-text-secondary opacity-30" />
             </div>
             <h2 className="text-2xl font-display font-bold text-white mb-2">Página em Branco</h2>
             <p className="text-sm text-text-secondary max-w-[200px] mx-auto">Reescreva sua história. Comece o seu primeiro treino agora.</p>
           </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               <div className="bg-surface/80 backdrop-blur-sm border border-surface-light p-5 rounded-2xl relative overflow-hidden box-glow-blue">
                 <p className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-bold">Total Concluídos</p>
                 <p className="text-3xl font-bold text-white flex items-end gap-2 font-display">
                   {workoutHistory.length}
                   <span className="text-xs text-neon-blue lowercase mb-1 relative top-[-4px]">treinos</span>
                 </p>
                 <Activity size={32} className="text-neon-blue/20 absolute bottom-3 right-3" />
               </div>
               
               <div className="bg-surface/80 backdrop-blur-sm border border-surface-light p-5 rounded-2xl relative overflow-hidden box-glow-purple">
                 <p className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-bold">Tempo Investido</p>
                 <p className="text-3xl font-bold text-white flex items-end gap-2 font-display">
                   {Math.floor(workoutHistory.reduce((acc, curr) => acc + curr.durationMinutes, 0) / 60)}
                   <span className="text-xs text-neon-purple lowercase mb-1 relative top-[-4px]">horas</span>
                 </p>
                 <Clock size={32} className="text-neon-purple/20 absolute bottom-3 right-3" />
               </div>

               <div className="col-span-2 md:col-span-1 bg-surface/80 backdrop-blur-sm border border-surface-light p-5 rounded-2xl relative overflow-hidden flex items-center justify-between">
                 <div>
                   <p className="text-[10px] uppercase text-text-secondary tracking-widest mb-2 font-bold">Carga Total</p>
                   <p className="text-3xl font-bold text-white flex items-end gap-2 font-display">
                     {workoutHistory.reduce((acc, log) => acc + (log.totalVolume || 0), 0)}
                     <span className="text-xs text-amber-500 uppercase mb-1 relative top-[-4px] tracking-widest">Kg</span>
                   </p>
                 </div>
                 <Zap size={40} className="text-amber-500 absolute right-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
               </div>
            </div>

            {/* Charts Section */}
            <div className="bg-surface border border-surface-light p-5 rounded-3xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                 <h2 className="text-lg font-bold text-white flex items-center gap-2">
                   <BarChart2 size={20} className="text-neon-blue" /> Desempenho
                 </h2>
                 <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="flex bg-background border border-surface-light p-1 rounded-lg">
                      <button 
                        onClick={() => setChartMetric('volume')}
                        className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${chartMetric === 'volume' ? 'bg-surface-light text-white' : 'text-text-secondary hover:text-white'}`}
                      >
                        Carga Total (Kg)
                      </button>
                      <button 
                        onClick={() => setChartMetric('duration')}
                        className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${chartMetric === 'duration' ? 'bg-surface-light text-white' : 'text-text-secondary hover:text-white'}`}
                      >
                        Tempo (min)
                      </button>
                    </div>
                    <div className="flex bg-background border border-surface-light p-1 rounded-lg">
                      <button 
                        onClick={() => setChartPeriod('7d')}
                        className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${chartPeriod === '7d' ? 'bg-surface-light text-white' : 'text-text-secondary hover:text-white'}`}
                      >
                        7 Dias
                      </button>
                      <button 
                        onClick={() => setChartPeriod('30d')}
                        className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${chartPeriod === '30d' ? 'bg-surface-light text-white' : 'text-text-secondary hover:text-white'}`}
                      >
                        30 Dias
                      </button>
                      <button 
                        onClick={() => {
                          if (profile?.plan === 'base') {
                            showPremiumModal("Histórico acima de 30 dias disponível apenas no plano Orbit ou superior.");
                          } else {
                            setChartPeriod('all');
                          }
                        }}
                        className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${chartPeriod === 'all' ? 'bg-surface-light text-white' : 'text-text-secondary hover:text-white'}`}
                      >
                        Tudo
                        {profile?.plan === 'base' && <span className="ml-1 text-neon-blue">★</span>}
                      </button>
                    </div>
                 </div>
              </div>

              {chartData.length > 0 ? (
                <div className="h-[250px] w-full">
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#8892b0', fontSize: 10 }}
                          dy={10}
                        />
                        <YAxis 
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: '#8892b0', fontSize: 10 }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                          contentStyle={{ backgroundColor: '#112240', border: '1px solid #233554', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                          labelStyle={{ color: '#8892b0', fontSize: '10px', marginBottom: '4px' }}
                        />
                        <Bar 
                          dataKey={chartMetric} 
                          fill={chartMetric === 'volume' ? '#f59e0b' : '#00f0ff'} 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center border border-surface-light border-dashed rounded-xl">
                  <p className="text-sm text-text-secondary">Poucos dados neste período.</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="relative pl-6">
              {/* Timeline Line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-surface-light rounded-full" />

              <div className="space-y-6">
                {[...workoutHistory].reverse().map((log, i) => {
                  if (profile?.plan === 'base') {
                     const isOlderThan30Days = (new Date().getTime() - new Date(log.date).getTime()) > 30 * 24 * 60 * 60 * 1000;
                     if (isOlderThan30Days) return null;
                  }

                  const isExpanded = expandedIndex === i;
                  const d = new Date(log.date);
                  const xpEarned = 200 + (log.durationMinutes * 10);
                  
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[-29px] top-6 w-3 h-3 bg-neon-blue rounded-full border-4 border-background" />

                      <div className="bg-surface border border-surface-light rounded-2xl overflow-hidden transition-all hover:border-white/20 group cursor-pointer" onClick={() => setExpandedIndex(isExpanded ? null : i)}>
                        <div className="p-5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-background border border-surface-light rounded-xl flex flex-col items-center justify-center shrink-0">
                              <span className="text-base font-bold text-white font-display leading-none">{d.getDate()}</span>
                              <span className="text-[10px] uppercase text-text-secondary mt-1 tracking-widest leading-none">{d.toLocaleString('pt-BR', { month: 'short' })}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-base tracking-tight">{log.dayFocus}</h3>
                              <p className="text-xs text-text-secondary mt-1 flex gap-3">
                                <span className="flex items-center gap-1"><Clock size={10} /> {log.durationMinutes} min</span>
                                <span className="flex items-center gap-1"><Activity size={10} /> {log.exercisesCompleted} exs</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right flex flex-col items-end gap-2">
                             <div className="inline-flex items-center gap-1 bg-neon-blue/10 px-2 py-1 rounded text-[10px] font-bold text-neon-blue uppercase tracking-widest">
                               <Award size={12} /> Nvl {log.perceivedEffort}
                             </div>
                             <div className="inline-flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                               +{xpEarned} XP
                             </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-surface-light/30 border-t border-surface-light"
                            >
                              <div className="p-5 grid grid-cols-2 gap-4 text-sm mt-2">
                                 <div>
                                   <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Volume Estimado</p>
                                   <p className="text-white font-mono">{log.totalVolume > 0 ? log.totalVolume + ' Kg' : 'Não registrado'}</p>
                                 </div>
                                 <div>
                                   <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Impacto de Disciplina</p>
                                   <p className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1"><Flame size={12} /> Alta Relevância</p>
                                 </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
