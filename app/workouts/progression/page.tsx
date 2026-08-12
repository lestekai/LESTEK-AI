'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '@/lib/workoutStore';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, Circle, Flame, ChevronRight, Activity, Calendar, Zap, RotateCcw, ArrowRight, Trophy, ArrowLeft, ChevronUp, ChevronDown, Check, Clock, Dumbbell, Info } from 'lucide-react';

import { BottomNav } from '@/components/BottomNav';

function CircularProgress({ progress }: { progress: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center bg-surface border border-surface-light rounded-full shadow-inner shrink-0">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-text-primary/5"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-[#e57d3b] transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-text-primary">{progress}%</span>
    </div>
  );
}

export default function ProgressionPage() {
  const { currentPlan, workoutHistory: rawWorkoutHistory, advanceWeek, repeatWeek, advancePhase, restartPhase } = useWorkoutStore();
  const workoutHistory = Array.isArray(rawWorkoutHistory) ? rawWorkoutHistory : [];
  const navigate = useNavigate();
  
  const currentPhaseIndex = currentPlan?.currentPhaseIndex || 0;
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(currentPhaseIndex);

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 font-sans">
        <h2 className="text-2xl font-black text-text-primary mb-2">Sem plano ativo</h2>
        <button onClick={() => navigate('/workouts')} className="bg-background text-black px-4 py-3 rounded-xl font-black uppercase text-sm">Criar Treino</button>
      </div>
    );
  }

  const phases = currentPlan.phases || [{
    id: 'fase_1',
    name: currentPlan.phaseName || 'Fase Única',
    description: currentPlan.planPromptDescription || 'Evolução contínua.',
    durationWeeks: 4,
    schedule: currentPlan.schedule
  }];

  const currentWeekIndex = currentPlan.currentWeekIndex || 0;

  const selectedPhase = phases[selectedPhaseIndex] || phases[0];

  // Overall progress calculation
  const totalWeeksAllPhases = phases.reduce((acc, p) => acc + p.durationWeeks, 0);
  let completedWeeksAllPhases = 0;
  for (let i = 0; i < currentPhaseIndex; i++) {
    completedWeeksAllPhases += phases[i].durationWeeks;
  }
  completedWeeksAllPhases += currentWeekIndex;
  const overallProgress = totalWeeksAllPhases > 0 ? Math.round((completedWeeksAllPhases / totalWeeksAllPhases) * 100) : 0;

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden font-sans">
      <header className="p-5 sticky top-0 bg-background/95 backdrop-blur-xl z-20 flex justify-between items-center border-b border-surface-light pt-12">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button onClick={() => navigate(-1)} className="w-12 h-12 shrink-0 flex items-center justify-center bg-text-primary/5 border border-surface-light rounded-full text-text-secondary hover:text-text-primary transition-all active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0 pr-2">
            <h1 className="text-lg font-black text-text-primary tracking-wide truncate">{currentPlan.programName || "Treino Personalizado"}</h1>
            <p className="text-[11px] font-black text-[#e57d3b] uppercase tracking-widest mt-0.5 truncate">{currentPlan.phaseName || "Evolução"}</p>
          </div>
        </div>
        <CircularProgress progress={overallProgress} />
      </header>

      <main className="px-4 max-w-xl mx-auto space-y-10 mt-4">
        
        {/* Fases do Treino Scroll Horizontal */}
        <section>
          <h3 className="text-[11px] font-black uppercase text-text-secondary tracking-widest mb-4">Fases do Treino</h3>
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x custom-scrollbar">
            {phases.map((p, idx) => {
              const isSelected = selectedPhaseIndex === idx;
              const isCompleted = idx < currentPhaseIndex;
              const isActive = idx === currentPhaseIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPhaseIndex(idx)}
                  className={`shrink-0 snap-start w-40 p-4 rounded-[20px] border transition-all text-left ${isSelected ? 'bg-surface border-[#e57d3b] shadow-[0_0_15px_rgba(229,125,59,0.1)]' : 'bg-surface border-surface-light opacity-70 hover:opacity-100 hover:border-text-primary/20'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-black truncate pr-2 ${isSelected ? 'text-[#e57d3b]' : 'text-text-primary'}`}>{idx + 1}: {p.name.replace(/^Fase \d+:\s*/i, '')}</span>
                    {isCompleted && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                    {isActive && <Flame size={14} className="text-[#e57d3b] shrink-0" />}
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">{p.durationWeeks} Semanas</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Detalhes da Fase Selecionada */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-black text-text-primary">Fase {selectedPhaseIndex + 1}: {selectedPhase.name.replace(/^Fase \d+:\s*/i, '')}</h2>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">
                {selectedPhaseIndex === currentPhaseIndex ? `${currentWeekIndex + 1} de ${selectedPhase.durationWeeks} Semanas` : `${selectedPhase.durationWeeks} Semanas`}
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-text-primary/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
              <Info size={18} />
            </button>
          </div>
          
          <div className="h-1.5 bg-text-primary/5 rounded-full overflow-hidden w-full">
             <div 
               className="h-full bg-background rounded-full transition-all duration-1000"
               style={{ width: selectedPhaseIndex < currentPhaseIndex ? '100%' : selectedPhaseIndex === currentPhaseIndex ? `${(currentWeekIndex / selectedPhase.durationWeeks) * 100}%` : '0%' }}
             />
          </div>
        </section>

        {/* Accordion de Semanas */}
        <section className="space-y-4">
          {Array.from({ length: selectedPhase.durationWeeks }).map((_, weekNum) => {
            const isCompleted = selectedPhaseIndex < currentPhaseIndex || (selectedPhaseIndex === currentPhaseIndex && weekNum < currentWeekIndex);
            const isActive = selectedPhaseIndex === currentPhaseIndex && weekNum === currentWeekIndex;
            
            return (
              <PhaseWeekItem 
                key={weekNum}
                weekNum={weekNum + 1}
                isCompleted={isCompleted}
                isActive={isActive}
                phase={selectedPhase}
                phaseIndex={selectedPhaseIndex}
                isLastWeek={weekNum === selectedPhase.durationWeeks - 1}
                isLastPhase={selectedPhaseIndex === phases.length - 1}
                advanceWeek={advanceWeek}
                repeatWeek={repeatWeek}
                advancePhase={advancePhase}
                workoutHistory={workoutHistory}
              />
            );
          })}
        </section>

      </main>
      <BottomNav />
    </div>
  );
}

function PhaseWeekItem({ 
  weekNum, 
  isCompleted, 
  isActive, 
  phase, 
  phaseIndex,
  isLastWeek,
  isLastPhase,
  advanceWeek, 
  repeatWeek,
  advancePhase,
  workoutHistory
}: any) {
  const [expanded, setExpanded] = useState(isActive);
  
  const trainingDays = phase.schedule.filter((s: any) => !s.isRest);
  const totalExercises = trainingDays.reduce((acc: number, d: any) => acc + (d.exercises?.length || 0), 0);
  
  const weekLogs = workoutHistory.filter((log: any) => log.phaseIndex === phaseIndex && log.weekIndex === (weekNum - 1));
  const realWorkoutsCount = weekLogs.length;
  
  return (
    <div className={`bg-transparent rounded-2xl overflow-hidden transition-all duration-300 border-b border-surface-light`}>
      <div 
        onClick={() => setExpanded(!expanded)}
        className="py-3 cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <h4 className={`text-base font-black ${isCompleted ? 'text-emerald-500' : isActive ? 'text-[#e57d3b]' : 'text-text-primary'}`}>Semana {weekNum}</h4>
          {isActive && <Flame size={14} className="text-[#e57d3b]" />}
        </div>
        {expanded ? <ChevronUp size={20} className="text-text-secondary" /> : <ChevronDown size={20} className="text-text-secondary" />}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2">
               
               {/* Timeline of Days */}
               <div className="relative pl-4 space-y-4 mb-4">
                 {/* Timeline Line */}
                 <div className="absolute left-[23px] top-4 bottom-4 w-px bg-text-primary/5" />
                 
                 {trainingDays.map((day: any, i: number) => {
                   const isDayCompleted = isCompleted || (isActive && i < realWorkoutsCount);
                   
                   return (
                     <div key={i} className="relative flex items-center gap-4 z-10">
                       <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-2 ${isDayCompleted ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-background border-surface-light'}`}>
                         {isDayCompleted && <Check size={10} strokeWidth={4} />}
                       </div>
                       
                       <div className={`flex-1 bg-surface rounded-[20px] p-5 border transition-colors ${isDayCompleted ? 'border-emerald-500/20' : 'border-surface-light'}`}>
                         <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${isDayCompleted ? 'text-emerald-500/70' : 'text-[#e57d3b]'}`}>{day.dayName}</span>
                         <div className="flex justify-between items-center">
                           <h5 className="font-bold text-text-primary text-base">{day.focus}</h5>
                           {isDayCompleted && <Check size={18} className="text-emerald-500" />}
                         </div>
                         <div className="flex items-center gap-4 mt-3">
                           <span className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                             <Activity size={12} className={isDayCompleted ? 'text-emerald-500' : 'text-text-secondary'} /> {day.intensity || 'Média'}
                           </span>
                           <span className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                             <Clock size={12} className={isDayCompleted ? 'text-emerald-500' : 'text-text-secondary'} /> {(day.exercises?.length || 0) * 8} min
                           </span>
                           <span className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                             <Dumbbell size={12} className={isDayCompleted ? 'text-emerald-500' : 'text-text-secondary'} /> {day.exercises?.length || 0} ex
                           </span>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>

               {/* Stats & Actions Box */}
               <div className="bg-surface rounded-[24px] p-4 border border-surface-light shadow-lg">
                 <div className="space-y-5 mb-4">
                   <div className="flex justify-between items-center border-b border-surface-light pb-4">
                     <span className="text-[11px] font-black uppercase text-text-secondary tracking-widest">Treinos</span>
                     <span className="text-sm font-black text-text-primary">{isCompleted ? trainingDays.length : Math.min(realWorkoutsCount, trainingDays.length)} / {trainingDays.length}</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-surface-light pb-4">
                     <span className="text-[11px] font-black uppercase text-text-secondary tracking-widest">Exercícios</span>
                     <span className="text-sm font-black text-text-primary">{totalExercises} totais</span>
                   </div>
                   <div className="flex justify-between items-center pb-1">
                     <span className="text-[11px] font-black uppercase text-text-secondary tracking-widest">Volume (Kg)</span>
                     <span className={`text-sm font-black ${isCompleted ? 'text-emerald-500' : 'text-[#e57d3b]'}`}>{weekLogs.reduce((acc: number, log: any) => acc + log.totalVolume, 0).toLocaleString() || '0'}</span>
                   </div>
                 </div>

                 {isActive && (
                   <div className="flex gap-3">
                     <button onClick={repeatWeek} className="flex-1 py-3 bg-background border border-[#e57d3b]/30 rounded-[16px] text-[#e57d3b] font-black uppercase tracking-widest text-[10px] hover:bg-background/10 transition-all active:scale-95 text-center">
                       Repetir Semana
                     </button>
                     {!isLastWeek ? (
                       <button onClick={advanceWeek} className="flex-1 py-3 bg-background text-black rounded-[16px] font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-amber-400 transition-all active:scale-95 text-center">
                         Próxima Semana
                       </button>
                     ) : !isLastPhase ? (
                       <button onClick={advancePhase} className="flex-1 py-3 bg-background text-black rounded-[16px] font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-amber-400 transition-all active:scale-95 text-center">
                         Avançar Fase
                       </button>
                     ) : (
                       <button className="flex-1 py-3 bg-neon-purple text-black rounded-[16px] font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-fuchsia-400 transition-all active:scale-95 text-center">
                         Finalizar Prog.
                       </button>
                     )}
                   </div>
                 )}
                 {isCompleted && (
                    <div className="flex justify-center">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl">
                            <CheckCircle2 size={14} /> Semana Concluída
                        </span>
                    </div>
                 )}
               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
