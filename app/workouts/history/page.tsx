'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate } from 'react-router-dom';

import { useWorkoutStore } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { BottomNav } from '@/components/BottomNav';
import { EXERCISE_LIBRARY } from '@/lib/exerciseLibrary';
import { 
  ArrowLeft, 
  Clock, 
  Activity, 
  Award, 
  Flame, 
  Zap, 
  BarChart2, 
  Calendar, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Sparkles, 
  Percent,
  Dumbbell,
  Target
} from 'lucide-react';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from 'recharts';

function getMusclesForExercise(exerciseName: string): string[] {
  if (!exerciseName || typeof exerciseName !== 'string') return ['Geral'];
  const normName = exerciseName.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  
  const found = EXERCISE_LIBRARY.find(ex => {
    if (!ex || !ex.name) return false;
    const exNorm = ex.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    return exNorm === normName || (exNorm && normName && (normName.includes(exNorm) || exNorm.includes(normName)));
  });
  
  if (found && found.targetMuscles && found.targetMuscles.length > 0) {
    return found.targetMuscles;
  }

  const muscles: string[] = [];
  if (normName.includes('supino') || normName.includes('peito') || normName.includes('peitoral') || normName.includes('crucifixo') || normName.includes('voador') || normName.includes('flexao')) muscles.push('Peitoral');
  if (normName.includes('rosca') || normName.includes('biceps') || normName.includes('braco') || normName.includes('concentrada')) muscles.push('Bíceps');
  if (normName.includes('triceps') || normName.includes('paralelas') || normName.includes('testa') || normName.includes('pulley')) muscles.push('Tríceps');
  if (normName.includes('agachamento') || normName.includes('leg press') || normName.includes('quadriceps') || normName.includes('extensora') || normName.includes('perna') || normName.includes('abdutor') || normName.includes('adutor') || normName.includes('flexora') || normName.includes('passada') || normName.includes('avanço') || normName.includes('stiff')) muscles.push('Quadríceps', 'Isquiotibiais', 'Glúteos');
  if (normName.includes('puxada') || normName.includes('remada') || normName.includes('costas') || normName.includes('dorsal') || normName.includes('lombar') || normName.includes('barra fixa')) muscles.push('Costas');
  if (normName.includes('ombro') || normName.includes('desenvolvimento') || normName.includes('lateral') || normName.includes('deltoide') || normName.includes('elevação')) muscles.push('Ombros');
  if (normName.includes('gemeos') || normName.includes('panturrilha') || normName.includes('soleo')) muscles.push('Panturrilhas');
  if (normName.includes('abdominal') || normName.includes('abd') || normName.includes('prancha') || normName.includes('infra') || normName.includes('supra')) muscles.push('Abdômen');

  return muscles.length > 0 ? muscles : ['Geral'];
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { workoutHistory: rawHistory, currentPlan } = useWorkoutStore();
  const workoutHistory = useMemo(() => Array.isArray(rawHistory) ? rawHistory : [], [rawHistory]);
  const { profile } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<'timeline' | 'calendar' | 'metrics' | 'history_chart' | 'prs'>('timeline');
  const [isMounted, setIsMounted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [selectedEvolutionEx, setSelectedEvolutionEx] = useState<string>('');

  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const statsVolume = useMemo(() => {
    const now = new Date();
    let dailyVolume = 0; let weeklyVolume = 0; let monthlyVolume = 0;
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(now.getDate() - 7);
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(now.getDate() - 30);

    workoutHistory.forEach(log => {
      const logDate = new Date(log.date);
      const logVol = log.totalVolume || 0;
      if (logDate >= startOfToday) dailyVolume += logVol;
      if (logDate >= sevenDaysAgo) weeklyVolume += logVol;
      if (logDate >= thirtyDaysAgo) monthlyVolume += logVol;
    });

    return { dailyVolume, weeklyVolume, monthlyVolume };
  }, [workoutHistory]);

  const muscleGroupsStats = useMemo(() => {
    const setsByMuscle: Record<string, number> = {};
    const volByMuscle: Record<string, number> = {};

    workoutHistory.forEach(log => {
      if (!log.exerciseLogs) return;
      log.exerciseLogs.forEach(exLog => {
        const muscles = getMusclesForExercise(exLog.exerciseName);
        const setQuantity = exLog.setsLog?.length || 0;
        const exerciseTotalVol = exLog.setsLog?.reduce((sum, s) => sum + (s.reps * (s.weight || 0)), 0) || 0;

        muscles.forEach(m => {
          setsByMuscle[m] = (setsByMuscle[m] || 0) + setQuantity;
          volByMuscle[m] = (volByMuscle[m] || 0) + exerciseTotalVol;
        });
      });
    });

    return Object.keys(setsByMuscle).map(muscle => ({
      muscle,
      sets: setsByMuscle[muscle],
      volume: volByMuscle[muscle]
    })).sort((a, b) => b.sets - a.sets);
  }, [workoutHistory]);

  const uniqueExercisesInHistory = useMemo(() => {
    const list = new Set<string>();
    workoutHistory.forEach(log => {
      log.exerciseLogs?.forEach(el => {
        if (el.exerciseName) list.add(el.exerciseName);
      });
    });
    return Array.from(list).sort();
  }, [workoutHistory]);

  const activeExToUse = selectedEvolutionEx || uniqueExercisesInHistory[0] || '';

  const exerciseEvolutionData = useMemo(() => {
    if (!activeExToUse) return [];
    const normSelected = activeExToUse.toLowerCase().trim();
    const timelineData: { date: string; maxWeight: number; totalVolume: number }[] = [];

    workoutHistory.forEach(log => {
      const match = log.exerciseLogs?.find(el => el.exerciseName.toLowerCase().trim() === normSelected);
      if (match && match.setsLog && match.setsLog.length > 0) {
        const maxWeightInSession = Math.max(...match.setsLog.map(s => s.weight || 0));
        const sessionVolume = match.setsLog.reduce((sum, s) => sum + (s.reps * (s.weight || 0)), 0);
        const d = new Date(log.date);
        const dateStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        timelineData.push({ date: dateStr, maxWeight: maxWeightInSession, totalVolume: sessionVolume });
      }
    });

    return timelineData;
  }, [workoutHistory, activeExToUse]);

  const exercisePRs = useMemo(() => {
    const prRecords: Record<string, { exerciseName: string; maxWeight: number; maxReps: number; maxVolume: number }> = {};
    workoutHistory.forEach(log => {
      log.exerciseLogs?.forEach(exLog => {
        const name = exLog.exerciseName;
        if (!prRecords[name]) prRecords[name] = { exerciseName: name, maxWeight: 0, maxReps: 0, maxVolume: 0 };
        let currentSessionVolume = 0;
        exLog.setsLog.forEach(s => {
          if (s.weight > prRecords[name].maxWeight) prRecords[name].maxWeight = s.weight;
          if (s.reps > prRecords[name].maxReps) prRecords[name].maxReps = s.reps;
          currentSessionVolume += s.reps * s.weight;
        });
        if (currentSessionVolume > prRecords[name].maxVolume) prRecords[name].maxVolume = currentSessionVolume;
      });
    });
    return Object.values(prRecords).sort((a, b) => b.maxWeight - a.maxWeight);
  }, [workoutHistory]);

  const calendarDays = useMemo(() => {
    const year = calendarYear; const month = calendarMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysArray: { day: number; date: Date; isCurrentMonth: boolean }[] = [];
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      daysArray.push({ day: prevDay, date: new Date(year, month - 1, prevDay), isCurrentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ day, date: new Date(year, month, day), isCurrentMonth: true });
    }
    return daysArray;
  }, [calendarMonth, calendarYear]);

  const calendarMetrics = useMemo(() => {
    const now = new Date();
    const isCurrentMonth = calendarMonth === now.getMonth() && calendarYear === now.getFullYear();
    const maxDay = isCurrentMonth ? now.getDate() : new Date(calendarYear, calendarMonth + 1, 0).getDate();

    let completedThisMonth = 0; let plannedWorkoutDays = 0; let absencesCount = 0;
    const schedule = currentPlan?.schedule || [];
    const hasPlan = schedule.length > 0;

    for (let d = 1; d <= maxDay; d++) {
      const loopDate = new Date(calendarYear, calendarMonth, d);
      const hasWorkoutCompleted = workoutHistory.some(log => {
        const dLog = new Date(log.date);
        return dLog.getDate() === d && dLog.getMonth() === calendarMonth && dLog.getFullYear() === calendarYear;
      });

      if (hasWorkoutCompleted) completedThisMonth++;

      if (hasPlan) {
        const jsDay = loopDate.getDay();
        const planIndex = jsDay === 0 ? 6 : jsDay - 1;
        const dayPlan = schedule[planIndex];
        if (dayPlan && !dayPlan.isRest) {
          plannedWorkoutDays++;
          if (!hasWorkoutCompleted) absencesCount++;
        }
      }
    }

    const frequencyRate = plannedWorkoutDays > 0 ? Math.round((completedThisMonth / plannedWorkoutDays) * 100) : (completedThisMonth > 0 ? 100 : 0);
    return { completedThisMonth, plannedWorkoutDays, absencesCount, frequencyRate };
  }, [workoutHistory, calendarMonth, calendarYear, currentPlan]);

  const getWorkoutDetailsOnDate = (date: Date) => {
    return workoutHistory.find(log => {
      const d = new Date(log.date);
      return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    });
  };

  const clickedDayWorkout = selectedCalendarDate ? getWorkoutDetailsOnDate(selectedCalendarDate) : null;

  const prevMonth = () => {
    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); } else { setCalendarMonth(m => m - 1); }
    setSelectedCalendarDate(null);
  };
  const nextMonth = () => {
    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); } else { setCalendarMonth(m => m + 1); }
    setSelectedCalendarDate(null);
  };

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const navItems = [
    { id: 'timeline', label: 'Feed' },
    { id: 'calendar', label: 'Calendário' },
    { id: 'metrics', label: 'Métricas' },
    { id: 'history_chart', label: 'Cargas' },
    { id: 'prs', label: 'PRs' },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-x-hidden text-text-primary font-sans">
      <header className="p-5 sticky top-0 bg-background/95 backdrop-blur-xl z-30 flex items-center justify-between border-b border-surface-light">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-text-primary/5 border border-surface-light rounded-full text-text-secondary hover:text-text-primary transition-all active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-text-primary">Histórico</h1>
            <p className="text-[11px] text-[#e57d3b] font-bold uppercase tracking-widest mt-0.5">Sua Jornada</p>
          </div>
        </div>
      </header>

      <main className="p-5 max-w-2xl mx-auto relative z-10 space-y-4">
        {/* Sleek Tabs Navigation */}
        <div className="flex bg-surface p-1.5 rounded-[20px] border border-surface-light overflow-x-auto scrollbar-hide gap-1 sticky top-[80px] z-20">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[70px] px-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === item.id 
                ? 'bg-text-primary text-black shadow-lg' 
                : 'text-text-secondary hover:text-text-primary hover:bg-text-primary/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {workoutHistory.length === 0 ? (
          <div className="bg-surface/30 backdrop-blur-md border border-surface-light border-dashed p-10 rounded-2xl text-center flex flex-col items-center justify-center mt-4">
            <div className="w-24 h-24 bg-surface border border-surface-light rounded-full flex items-center justify-center mb-4 shadow-xl">
              <Dumbbell size={40} className="text-text-secondary/50" />
            </div>
            <h2 className="text-2xl font-black text-text-primary mb-2">Sem histórico</h2>
            <p className="text-sm text-text-secondary max-w-[280px] leading-relaxed mx-auto font-medium">
              Sua evolução começará a ser exibida assim que concluir seu primeiro treino.
            </p>
            <button 
              onClick={() => navigate('/workouts')}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-[#e57d3b] to-amber-500 text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
            >
              Começar Treino
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* 1. TIMELINE FEED */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative space-y-4"
              >
                {[...workoutHistory].reverse().map((log, i) => {
                  const isExpanded = expandedIndex === i;
                  const d = new Date(log.date);
                  const xpEarned = 200 + (log.durationMinutes * 10);
                  
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-surface border border-surface-light rounded-[24px] overflow-hidden transition-all hover:border-surface-light cursor-pointer shadow-lg"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    >
                      <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-background border border-surface-light rounded-[20px] flex flex-col items-center justify-center shrink-0 shadow-inner">
                            <span className="text-xl font-black text-text-primary leading-none">{d.getDate()}</span>
                            <span className="text-[10px] font-bold uppercase text-[#e57d3b] mt-1 tracking-widest leading-none">
                              {d.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-primary text-base tracking-tight mb-1">{log.dayFocus}</h3>
                            <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                              <span className="flex items-center gap-1.5"><Clock size={12} className="text-text-secondary" /> {log.durationMinutes}m</span>
                              <span className="flex items-center gap-1.5"><Activity size={12} className="text-text-secondary" /> {log.exercisesCompleted} exs</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                            +{xpEarned} XP
                          </div>
                          <div className="text-[10px] font-bold text-text-secondary flex items-center gap-1 uppercase tracking-wider">
                            <Target size={10} /> Vol: {log.totalVolume.toLocaleString('pt-BR')}kg
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-background/50 border-t border-surface-light"
                          >
                            <div className="p-5 space-y-4">
                              {log.exerciseLogs && log.exerciseLogs.length > 0 ? (
                                <div className="space-y-3">
                                  <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block mb-2">Exercícios Executados</span>
                                  {log.exerciseLogs.map((el, elIdx) => (
                                    <div key={elIdx} className="flex justify-between items-center gap-2 py-2 border-b border-surface-light last:border-0 last:pb-0">
                                      <span className="text-sm text-text-primary font-bold max-w-[65%] truncate">
                                        {el.exerciseName}
                                      </span>
                                      <span className="font-mono text-[#e57d3b] font-black text-xs">
                                        {el.setsLog.filter(s => s.setNumber !== 99).length}s / {el.setsLog.reduce((acc, s) => acc + (s.weight * s.reps), 0).toLocaleString('pt-BR')}kg
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-text-secondary font-medium italic">Detalhes não encontrados.</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* 2. CALENDAR */}
            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] text-center shadow-lg">
                    <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1 mt-1">Treinos</span>
                    <span className="text-3xl font-black text-text-primary">{calendarMetrics.completedThisMonth}</span>
                  </div>
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] text-center shadow-lg">
                    <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1 mt-1">Frequência</span>
                    <span className="text-3xl font-black text-emerald-400">{calendarMetrics.frequencyRate}%</span>
                  </div>
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] text-center shadow-lg">
                    <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1 mt-1">Faltas</span>
                    <span className="text-3xl font-black text-red-400">{calendarMetrics.absencesCount}</span>
                  </div>
                </div>

                <div className="bg-surface border border-surface-light p-5 sm:p-4 rounded-2xl space-y-4 shadow-xl">
                  <div className="flex justify-between items-center bg-background/50 p-2 rounded-2xl border border-surface-light">
                    <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-text-primary/10 text-text-primary rounded-xl transition-colors">
                      <ChevronLeft size={18} />
                    </button>
                    <h3 className="font-black text-sm uppercase tracking-wider text-text-primary">
                      {monthNames[calendarMonth]} <span className="text-[#e57d3b]">{calendarYear}</span>
                    </h3>
                    <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-text-primary/10 text-text-primary rounded-xl transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center font-black text-[10px] text-text-secondary uppercase tracking-widest mb-2">
                    <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((dayItem, idx) => {
                      const details = getWorkoutDetailsOnDate(dayItem.date);
                      const isToday = new Date().toDateString() === dayItem.date.toDateString();
                      const isPastDay = dayItem.date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                      
                      let isFalta = false;
                      const schedule = currentPlan?.schedule || [];
                      if (schedule.length > 0 && dayItem.isCurrentMonth && isPastDay && !details) {
                        const jsDay = dayItem.date.getDay();
                        const planIndex = jsDay === 0 ? 6 : jsDay - 1;
                        if (schedule[planIndex] && !schedule[planIndex].isRest) isFalta = true;
                      }

                      const isSelected = selectedCalendarDate?.toDateString() === dayItem.date.toDateString();

                      return (
                        <button
                          key={idx}
                          onClick={() => { if (dayItem.isCurrentMonth) setSelectedCalendarDate(dayItem.date); }}
                          disabled={!dayItem.isCurrentMonth}
                          className={`aspect-square rounded-2xl text-[11px] font-black flex flex-col items-center justify-center relative transition-all ${
                            !dayItem.isCurrentMonth ? 'opacity-10 cursor-not-allowed' :
                            isSelected ? 'bg-text-primary text-black scale-105 shadow-xl shadow-white/10 border-2 border-text-primary' :
                            isToday ? 'bg-background/10 text-[#e57d3b] border-2 border-[#e57d3b]/50' :
                            details ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            isFalta ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-background border border-surface-light text-text-secondary hover:border-text-primary/20'
                          }`}
                        >
                          {dayItem.day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {selectedCalendarDate && clickedDayWorkout && (
                    <motion.div
                      key={selectedCalendarDate.toDateString()}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background text-black p-4 rounded-2xl shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1 block">Treino Realizado</span>
                          <h4 className="font-black text-xl tracking-tight">{clickedDayWorkout.dayFocus}</h4>
                        </div>
                        <div className="bg-black/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-black/10">
                          {clickedDayWorkout.durationMinutes} min
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 block">Exercícios Concluídos</span>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                          {clickedDayWorkout.exerciseLogs?.map((ex, i) => (
                            <div key={i} className="bg-text-primary/20 px-3 py-2 rounded-xl text-xs font-black truncate border border-surface-light shadow-sm text-black">
                              {ex.exerciseName}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 3. METRICS */}
            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] flex items-center justify-between shadow-lg">
                    <div>
                      <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">Volume Hoje</span>
                      <span className="text-2xl font-black text-text-primary">{statsVolume.dailyVolume.toLocaleString('pt-BR')} <span className="text-xs text-text-secondary uppercase tracking-widest">kg</span></span>
                    </div>
                    <Flame size={28} className="text-[#e57d3b]" />
                  </div>
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] flex items-center justify-between shadow-lg">
                    <div>
                      <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">Vol. Semanal</span>
                      <span className="text-2xl font-black text-text-primary">{statsVolume.weeklyVolume.toLocaleString('pt-BR')} <span className="text-xs text-text-secondary uppercase tracking-widest">kg</span></span>
                    </div>
                    <Zap size={28} className="text-amber-500" />
                  </div>
                  <div className="bg-surface border border-surface-light p-4 rounded-[24px] flex items-center justify-between shadow-lg">
                    <div>
                      <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">Vol. Mensal</span>
                      <span className="text-2xl font-black text-[#e57d3b]">{statsVolume.monthlyVolume.toLocaleString('pt-BR')} <span className="text-xs tracking-widest uppercase">kg</span></span>
                    </div>
                    <TrendingUp size={28} className="text-[#e57d3b]" />
                  </div>
                </div>

                <div className="bg-surface border border-surface-light p-4 rounded-2xl space-y-4 shadow-xl">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#e57d3b]">
                      Esforço por Músculo (Estimado)
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {muscleGroupsStats.length === 0 ? (
                      <p className="text-xs text-text-secondary font-bold mb-4">Sem dados musculares.</p>
                    ) : (
                      muscleGroupsStats.map((item, idx) => {
                        const maxSets = Math.max(...muscleGroupsStats.map(m => m.sets)) || 1;
                        const percentage = maxSets > 0 ? Math.max(5, Math.round((item.sets / maxSets) * 100)) : 5;

                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-end text-xs">
                              <span className="font-black text-text-primary tracking-wide">{item.muscle}</span>
                              <div className="flex gap-3 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                                <span><span className="text-text-primary">{item.sets}</span> s</span>
                                <span><span className="text-[#e57d3b]">{item.volume.toLocaleString('pt-BR')}</span> kg</span>
                              </div>
                            </div>
                            <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-surface-light">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.05 }}
                                className={`h-full rounded-full ${idx === 0 ? 'bg-background' : 'bg-amber-600'}`}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. EVOLUTION / HISTORY CHART */}
            {activeTab === 'history_chart' && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="bg-surface border border-surface-light p-4 rounded-2xl space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="w-full">
                      <h3 className="text-xs font-black uppercase tracking-widest text-text-primary mb-3">Evolução de Cargas</h3>
                      {uniqueExercisesInHistory.length > 0 && (
                        <select
                          value={activeExToUse}
                          onChange={(e) => setSelectedEvolutionEx(e.target.value)}
                          className="bg-background border border-surface-light px-4 py-3.5 rounded-[20px] text-xs font-black text-[#e57d3b] uppercase tracking-wider outline-none w-full cursor-pointer hover:border-text-primary/20 transition-all appearance-none"
                        >
                          {uniqueExercisesInHistory.map((ex, idx) => (
                            <option key={idx} value={ex} className="font-bold bg-surface text-text-primary">{ex}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {activeExToUse ? (
                    <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background/80 p-4 rounded-2xl border border-surface-light">
                          <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">Max Carga</span>
                          <span className="text-2xl font-black text-text-primary">{exerciseEvolutionData.length > 0 ? Math.max(...exerciseEvolutionData.map(d => d.maxWeight)) : 0} <span className="text-[10px] text-text-secondary uppercase tracking-widest">kg</span></span>
                        </div>
                         <div className="bg-background/80 p-4 rounded-2xl border border-surface-light">
                          <span className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">Max Volume</span>
                          <span className="text-2xl font-black text-[#e57d3b]">{exerciseEvolutionData.length > 0 ? Math.max(...exerciseEvolutionData.map(d => d.totalVolume)).toLocaleString('pt-BR') : 0} <span className="text-[10px] text-amber-500/50 uppercase tracking-widest">kg</span></span>
                        </div>
                      </div>

                      {exerciseEvolutionData.length > 0 ? (
                        <div className="h-[280px] w-full pt-4">
                          {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={exerciseEvolutionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px' }}
                                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '900' }}
                                  labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 800 }}
                                />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 800, marginTop: '20px' }} />
                                <Line name="Carga (kg)" type="monotone" dataKey="maxWeight" stroke="#e57d3b" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }} activeDot={{ r: 8 }} />
                              </LineChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      ) : (
                        <div className="p-5 border border-surface-light border-dashed rounded-[24px] text-center text-[10px] font-black text-text-secondary uppercase tracking-widest">
                          Dados insuficientes.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-5 text-center text-[10px] font-black text-text-secondary uppercase tracking-widest border border-surface-light border-dashed rounded-[24px]">
                      Nenhum exercício selecionado.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 5. PRs (Personal Records) */}
            {activeTab === 'prs' && (
              <motion.div
                key="prs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {exercisePRs.length === 0 ? (
                  <p className="text-[10px] font-black text-text-secondary text-center py-10 uppercase tracking-widest border border-surface-light border-dashed rounded-2xl">Sem recordes no momento.</p>
                ) : (
                  exercisePRs.map((pr, idx) => (
                    <div key={idx} className="bg-surface border border-surface-light p-5 rounded-[24px] shadow-lg relative overflow-hidden">
                      {idx === 0 && (
                        <div className="absolute top-0 right-0 bg-text-primary text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl z-10 shadow-lg">
                          Melhor Marca
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-inner ${idx === 0 ? 'bg-neon-blue/20 text-neon-blue' : 'bg-text-primary/5 text-text-secondary'}`}>
                          {idx === 0 ? '🏆' : idx + 1}
                        </div>
                        <span className={`font-black text-base max-w-[70%] truncate ${idx === 0 ? 'text-neon-blue' : 'text-text-primary'}`}>{pr.exerciseName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background/80 p-3 rounded-2xl flex flex-col items-center justify-center border border-surface-light">
                          <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1 mt-1">Carga Máxima</span>
                          <span className={`text-xl font-black ${idx === 0 ? 'text-text-primary' : 'text-text-primary'}`}>{pr.maxWeight} kg</span>
                        </div>
                        <div className="bg-background/80 p-3 rounded-2xl flex flex-col items-center justify-center border border-surface-light">
                          <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1 mt-1">Sessões / Volume</span>
                          <span className="text-xl font-black text-text-primary">{pr.maxReps} r</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

          </AnimatePresence>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
