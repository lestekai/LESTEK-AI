'use client';

import { useState } from 'react';
import { useWorkoutStore, WorkoutPlan } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Target, Clock, Activity, Shield, PlaySquare, Edit3, Settings, TrendingUp, Sparkles, History, Calendar, Flame, Zap, Plus, ArrowRight, List, Trash2, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getProgressionPhase } from '@/lib/progressionSystem';
import { PREMADE_TEMPLATES } from '@/lib/templates';

import { QuestionnaireWizard } from '@/components/workout/QuestionnaireWizard';
import { WorkoutEditor } from '@/components/workout/WorkoutEditor';
import { EXERCISE_LIBRARY } from '@/lib/exerciseLibrary';

// Attach library to global for easiest lookup without passing large sets around if needed 
if (typeof globalThis !== 'undefined') {
  (globalThis as any).EXERCISE_LIBRARY_CACHE = EXERCISE_LIBRARY;
}

export default function WorkoutsPage() {
  const { hasCompletedQuestionnaire, currentPlan } = useWorkoutStore();
  const { profile } = useAppStore();

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-28 overflow-x-hidden font-sans">
      <Header title="Treinos" subtitle="Seja consistente, a evolução é consequência." />
      
      <main className="px-4 sm:px-0 max-w-xl mx-auto space-y-4 mt-2">
        {!hasCompletedQuestionnaire || !currentPlan ? (
           <QuestionnaireWizard />
        ) : (
           <WorkoutDashboard plan={currentPlan} />
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function WorkoutDashboard({ plan }: { plan: any }) {
  const { 
    workoutHistory: rawWorkoutHistory, 
    questionnaire,
    selectedProgressionWeek,
    userTemplates,
    setFreeWorkout,
    setPlan
  } = useWorkoutStore();
  
  const workoutHistory = Array.isArray(rawWorkoutHistory) ? rawWorkoutHistory : [];
  
  const navigate = useNavigate();
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<{ id: string, dayIndex: number } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ title: string, message: string, onConfirm: () => void, isDestructive?: boolean } | null>(null);

  const daysPerWeek = questionnaire.daysPerWeek || 4;
  const autoWeek = Math.floor(workoutHistory.length / daysPerWeek) % 4 + 1;
  const currentWeek = selectedProgressionWeek === 0 ? autoWeek : selectedProgressionWeek;
  
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayPlan = plan.schedule[todayIndex] || plan.schedule[0];

  // New Phase System Logic
  const phases = plan.phases || [];
  const currentPhaseIndex = plan.currentPhaseIndex || 0;
  const currentWeekIndex = plan.currentWeekIndex || 0;
  
  const currentPhase = phases[currentPhaseIndex] || { 
    name: plan.phaseName || 'Fase Única', 
    durationWeeks: 4, 
    description: plan.planPromptDescription 
  };
  
  const displayWeek = currentWeekIndex + 1;
  const totalWeeks = currentPhase.durationWeeks || 4;
  
  // Progression calculation
  // Base progress on days completed vs total days in phase
  const workoutsInPhase = (plan.schedule?.filter((s: any) => !s.isRest).length || 0) * totalWeeks;
  // A rough estimate if we don't have exact phase tracking yet, but let's do a simple calculation based on currentWeek
  const progressPercent = Math.min(100, Math.round(((currentWeekIndex) / totalWeeks) * 100));

  return (
    <div className="space-y-4">
      
      {/* HEADER SECTION - RESUMO IMEDIATO */}
      <section className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-text-primary tracking-tight font-display">Pronto para o topo?</h2>
           <p className="text-sm text-text-secondary mt-1 font-medium flex items-center gap-2">
             <Flame size={16} className="text-neon-blue" />
             <span>Semana {displayWeek} de {totalWeeks} • {currentPhase.name}</span>
           </p>
        </div>
      </section>

      {/* CARD PRINCIPAL - TREINO DO DIA */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-surface border border-surface-light shadow-2xl"
        >
           {/* Grafismos de fundo Premium */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] pointer-events-none" />
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/20 rounded-full blur-[60px] pointer-events-none" />
           
           <div className="relative p-4 z-10 flex flex-col min-h-[200px]">
              <div className="flex justify-between items-start mb-3">
                 <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-text-primary rounded-full text-[10px] font-bold tracking-wider mb-2 backdrop-blur-md border border-surface-light">
                      <Target size={14} className="text-neon-blue" /> {questionnaire.mainGoal === 'hypertrophy' ? 'Hipertrofia' : questionnaire.mainGoal === 'strength' ? 'Força' : 'Condicionamento'}
                    </span>
                    <h3 className="text-2xl font-black text-text-primary leading-none tracking-tight mt-1">
                       {todayPlan.isRest ? 'Recuperação' : todayPlan.focus}
                    </h3>
                    <p className="text-text-secondary mt-2 font-medium text-sm">
                       {todayPlan.isRest ? 'Descanse hoje para crescer amanhã. Músculo cresce no descanso.' : plan.phaseName}
                    </p>
                 </div>
                 {!todayPlan.isRest && (
                   <button onClick={(e) => { e.stopPropagation(); navigate('/workouts/progression'); }} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/15 text-text-primary transition-colors rounded-full backdrop-blur border border-surface-light shadow-lg">
                      <List size={18} />
                   </button>
                 )}
              </div>

              {!todayPlan.isRest && (
                <div className="mt-auto pt-4 flex flex-col gap-4 border-t border-surface-light">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-text-secondary">Progresso da Fase</span>
                     <span className="text-xs font-bold text-neon-blue">{progressPercent}% Concluído</span>
                   </div>
                   <div className="w-full h-2 bg-background rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" 
                      />
                   </div>
                   
                   <button 
                     onClick={() => navigate(`/workouts/active?dayIndex=${todayIndex}`)}
                     className="w-full mt-2 py-3 bg-neon-blue rounded-2xl text-black font-black text-sm flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(0,210,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
                   >
                     <PlaySquare size={20} className="fill-black/10" />
                     INICIAR TREINO DO DIA
                   </button>
                   
                   <button 
                     onClick={() => setEditingDayIndex(todayIndex)}
                     className="w-full py-3 bg-transparent border-2 border-dashed border-surface-light text-text-secondary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-white/30 hover:text-text-primary transition-all"
                   >
                     <Edit3 size={16} />
                     Editar Treino de Hoje
                   </button>
                </div>
              )}
              {todayPlan.isRest && (
                <div className="mt-auto pt-5">
                  <div className="bg-neon-blue/10 border border-neon-blue/20 px-4 py-3 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center shrink-0">
                      <Shield size={20} className="text-neon-blue" />
                    </div>
                    <div>
                      <p className="font-bold text-base text-text-primary">Dia Off</p>
                      <p className="text-text-secondary text-xs font-medium mt-0.5">Aproveite para focar em alongamento ou cardio leve.</p>
                    </div>
                  </div>
                </div>
              )}
           </div>
        </motion.div>
      </section>

      {/* TREINOS EXTRAS */}
      <section>
        <div className="flex items-center justify-between mb-3">
           <h2 className="text-xl font-black text-text-primary font-display tracking-tight flex items-center gap-2">
             <span>Treinos Extras</span>
             {userTemplates && userTemplates.length > 0 && (
               <span className="text-xs font-bold text-text-secondary bg-surface border border-surface-light px-2 py-0.5 rounded-full font-mono">
                 {userTemplates.length}
               </span>
             )}
           </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 -mx-5 px-4 custom-scrollbar snap-x snap-mandatory">
          {/* CREATE CARD */}
          <button 
            onClick={() => navigate('/workouts/free')} 
            className="snap-start shrink-0 w-[220px] h-[140px] bg-gradient-to-br from-surface/50 to-surface border-2 border-dashed border-neon-purple/20 hover:border-neon-purple/50 rounded-2xl flex flex-col items-center justify-center p-4 text-center hover:bg-neon-purple/5 active:scale-95 transition-all group relative overflow-hidden"
          >
             {/* Neon Glow on hover */}
             <div className="absolute inset-0 bg-neon-purple/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <div className="w-10 h-10 rounded-full bg-neon-purple/10 group-hover:bg-neon-purple flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:scale-110">
                <Plus size={20} className="text-neon-purple group-hover:text-black transition-colors duration-300" />
             </div>
             <p className="text-text-primary font-black text-base tracking-tight mb-1">Criar Treino Extra</p>
             <p className="text-text-secondary text-[11px] font-medium max-w-[200px] leading-snug"> Monte livremente ou use inteligência artificial para gerar.</p>
          </button>

          {/* USER TEMPLATES */}
          {(userTemplates || []).map((tpl, i) => {
            const isSingleDay = tpl.schedule && tpl.schedule.length === 1;
            const exercisesCount = isSingleDay ? (tpl.schedule[0]?.exercises?.length || 0) : tpl.schedule.reduce((acc: number, day: any) => acc + (day.exercises?.length || 0), 0);
            const activeDaysCount = tpl.schedule ? tpl.schedule.filter((day: any) => !day.isRest).length : 0;

            return (
              <div 
                 key={`user-${i}`}
                 className="snap-start shrink-0 w-[220px] h-[140px] relative group"
              >
                {/* Buttons (floating top-right) */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTemplate({ id: tpl.id, dayIndex: 0 });
                    }}
                    title="Editar Treino Extra"
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-neon-blue/20 text-text-primary/40 hover:text-neon-blue backdrop-blur-md flex items-center justify-center border border-surface-light hover:border-neon-blue/30 transition-all active:scale-90"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmAction({
                        title: 'Excluir Treino',
                        message: 'Tem certeza que deseja excluir este treino extra? Você perderá o treino selecionado.',
                        isDestructive: true,
                        onConfirm: () => {
                          useWorkoutStore.getState().removeUserTemplate(tpl.id);
                        }
                      });
                    }}
                    title="Excluir Treino Extra"
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-red-500/20 text-text-primary/40 hover:text-red-400 backdrop-blur-md flex items-center justify-center border border-surface-light hover:border-red-500/30 transition-all active:scale-90"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    if (isSingleDay) {
                      // It's a single day workout (e.g., saved from Free Workout)
                      setFreeWorkout(tpl.schedule[0]);
                      navigate('/workouts/active?free=true');
                    } else {
                      // It's a multi-day program (e.g., saved from Pre-made Templates)
                      setConfirmAction({
                        title: 'Aplicar Programa',
                        message: `Deseja aplicar o programa "${tpl.phaseName}" como seu plano principal? Isso substituirá seu plano atual.`,
                        onConfirm: () => {
                          setPlan(tpl);
                        }
                      });
                    }
                  }}
                  className="w-full h-full text-left bg-surface rounded-2xl border border-surface-light relative overflow-hidden p-4 flex flex-col justify-between hover:border-white/20 hover:bg-surface-light transition-all shadow-xl active:scale-95 duration-200"
                >
                  {/* Subtle Background Glow corresponding to card type */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isSingleDay ? 'bg-neon-blue/5' : 'bg-neon-purple/5'} rounded-full blur-[40px] pointer-events-none`} />

                  {/* Top row metadata */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSingleDay 
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/10' 
                        : 'bg-neon-purple/10 text-neon-purple-light border border-neon-purple/10'
                    }`}>
                      {isSingleDay ? 'Treino Avulso' : 'Programa'}
                    </span>
                  </div>

                  {/* Body information */}
                  <div className="mt-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-black text-text-primary text-base leading-tight tracking-tight line-clamp-1 group-hover:text-neon-blue transition-colors">
                      {tpl.phaseName}
                    </h3>
                    
                    {/* Dynamic exercise list previews for single day */}
                    {isSingleDay && tpl.schedule[0]?.exercises && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tpl.schedule[0].exercises.slice(0, 2).map((ex: any, idx: number) => (
                          <span key={idx} className="text-[10px] bg-white/5 text-text-secondary px-1.5 py-0.5 rounded-md border border-surface-light max-w-[100px] truncate">
                            {ex.name}
                          </span>
                        ))}
                        {tpl.schedule[0].exercises.length > 2 && (
                          <span className="text-[10px] text-text-secondary font-bold self-center">
                            +{tpl.schedule[0].exercises.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Program description for multi-day templates */}
                    {!isSingleDay && (
                      <p className="text-text-secondary text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {tpl.planPromptDescription}
                      </p>
                    )}
                  </div>

                  {/* Footer metadata & Action CTA */}
                  <div className="mt-4 pt-3 border-t border-surface-light flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                      <Dumbbell size={11} className="text-text-secondary" />
                      <span>
                        {isSingleDay ? `${exercisesCount} Exs` : `${activeDaysCount} Dias de Treino`}
                      </span>
                    </span>
                    
                    <span className="text-[10px] font-black text-neon-blue group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-widest">
                      <span>{isSingleDay ? 'Treinar' : 'Aplicar'}</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* AÇÕES E BIBLIOTECAS */}
      <section className="pb-4 space-y-3">
         {/* 1 Treino Personalizado */}
         <Link to="/workouts/free" className="bg-surface rounded-2xl border border-surface-light p-5 flex items-center gap-4 hover:bg-surface-light transition-all group">
            <div className="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0">
               <Zap size={20} className="text-neon-blue group-hover:scale-110 transition-transform" />
            </div>
            <div>
               <h3 className="text-base font-black text-text-primary">Treino Personalizado</h3>
               <p className="text-text-secondary text-xs font-medium mt-1">Crie e monte treinos personalizados com IA.</p>
            </div>
         </Link>

         {/* 2 Meu Progresso */}
         <Link to="/workouts/history" className="bg-surface rounded-2xl border border-surface-light p-5 flex items-center gap-4 hover:bg-surface-light transition-all group">
            <div className="w-10 h-10 rounded-full bg-neon-purple/10 flex items-center justify-center shrink-0">
               <TrendingUp size={20} className="text-neon-purple group-hover:scale-110 transition-transform" />
            </div>
            <div>
               <h3 className="text-base font-black text-text-primary">Meu Progresso</h3>
               <p className="text-text-secondary text-xs font-medium mt-1">Histórico, PRs e estatísticas da sua evolução.</p>
            </div>
         </Link>

         {/* 3 Treinos Prontos */}
         <Link to="/workouts/templates" className="bg-surface rounded-2xl border border-surface-light p-5 flex items-center gap-4 hover:bg-surface-light transition-all group">
            <div className="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0">
               <Sparkles size={20} className="text-neon-blue group-hover:scale-110 transition-transform" />
            </div>
            <div>
               <h3 className="text-base font-black text-text-primary">Treinos Prontos</h3>
               <p className="text-text-secondary text-xs font-medium mt-1">Explore templates criados por especialistas.</p>
            </div>
         </Link>

         {/* 4 Biblioteca de Movimentos */}
         <Link to="/workouts/library" className="bg-surface rounded-2xl border border-surface-light p-5 flex items-center gap-4 hover:bg-surface-light transition-all group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
               <Dumbbell size={20} className="text-text-secondary group-hover:text-text-primary transition-colors" />
            </div>
            <div>
               <h3 className="text-base font-black text-text-primary">Biblioteca de Movimentos</h3>
               <p className="text-text-secondary text-xs font-medium mt-1">Consulte pesos e execuções corretas de +100 exercícios.</p>
            </div>
         </Link>
      </section>

      <AnimatePresence>
        {confirmAction && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-sm rounded-2xl p-4 border border-surface-light shadow-2xl"
            >
              <h3 className={`text-xl font-black mb-2 flex items-center gap-2 ${confirmAction.isDestructive ? 'text-red-400' : 'text-text-primary'}`}>
                {confirmAction.isDestructive && <AlertTriangle size={20} />}
                {confirmAction.title}
              </h3>
              <p className="text-text-secondary text-sm font-medium mb-4 leading-relaxed">
                {confirmAction.message}
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    confirmAction.onConfirm();
                    setConfirmAction(null);
                  }}
                  className={`w-full py-3 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                    confirmAction.isDestructive 
                      ? 'bg-red-500 text-text-primary shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
                      : 'bg-neon-blue text-black shadow-[0_0_20px_rgba(0,210,255,0.3)]'
                  }`}
                >
                  {confirmAction.isDestructive ? 'Sim, Excluir' : 'Confirmar'}
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-text-primary font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {editingDayIndex !== null && (
        <WorkoutEditor dayIndex={editingDayIndex} onClose={() => setEditingDayIndex(null)} />
      )}
      
      {editingTemplate !== null && (
        <TemplateEditor 
           templateId={editingTemplate.id} 
           initialDayIndex={editingTemplate.dayIndex} 
           onClose={() => setEditingTemplate(null)} 
        />
      )}
    </div>
  );
}

function TemplateEditor({ templateId, initialDayIndex, onClose }: { templateId: string, initialDayIndex: number, onClose: () => void }) {
  const { userTemplates, updateUserTemplate } = useWorkoutStore();
  const [dayIndex, setDayIndex] = useState(initialDayIndex);
  
  const template = userTemplates?.find(t => t.id === templateId);
  
  if (!template) {
    onClose();
    return null;
  }
  
  const isMultiDay = template.schedule.length > 1;
  
  const handleSavePlan = (updatedDayPlan: any) => {
    const updatedSchedule = [...template.schedule];
    updatedSchedule[dayIndex] = updatedDayPlan;
    
    updateUserTemplate(templateId, {
      ...template,
      schedule: updatedSchedule
    });
  };

  return (
    <>
      <WorkoutEditor 
        // Force remount when dayIndex changes
        key={`editor-${templateId}-${dayIndex}`}
        initialDayPlan={template.schedule[dayIndex]} 
        onSavePlan={handleSavePlan}
        onClose={onClose} 
      />
      {isMultiDay && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-surface border border-surface-light rounded-full px-2 py-1 flex gap-1 shadow-2xl backdrop-blur-md">
          {template.schedule.map((_, i) => (
            <button
              key={i}
              onClick={() => setDayIndex(i)}
              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                i === dayIndex ? 'bg-neon-blue text-black' : 'bg-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

