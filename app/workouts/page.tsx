'use client';

import { useState } from 'react';
import { useWorkoutStore, WorkoutPlan } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { getBodyPartImageUrl } from '@/lib/utils';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Target, Clock, Activity, Shield, ArrowRight, ArrowLeft, Save, PlaySquare, Edit3, GripHorizontal, AlertTriangle, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableDayItemProps {
  day: any;
  idx: number;
  todayIndex: number;
  setEditingDayIndex: (idx: number) => void;
}

function SortableDayItem({ day, idx, todayIndex, setEditingDayIndex }: SortableDayItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: day._dndId || `${day.dayName}-${idx}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 10 : 0,
    position: isDragging ? 'relative' as const : undefined,
  };

  const isToday = idx === todayIndex;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`flex-shrink-0 w-28 p-3 rounded-2xl flex flex-col justify-between h-28 transition-all duration-300 ${
        isToday 
          ? 'bg-neon-blue text-background shadow-lg shadow-neon-blue/20' 
          : 'bg-surface border border-surface-light hover:border-white/20'
      }`}
    >
      <div className="flex justify-between items-start w-full">
        <span className={`text-[9px] font-bold uppercase tracking-wider ${isToday ? 'text-background/80' : 'text-text-secondary'}`}>
          {day.dayName.substring(0, 3)}
        </span>
        <div className="flex gap-1">
           <button onClick={() => setEditingDayIndex(idx)} className={`p-1 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity ${isToday ? 'text-background' : 'text-text-secondary'}`}>
              <Edit3 size={10} />
           </button>
           <button {...attributes} {...listeners} className={`p-1 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity ${isToday ? 'text-background' : 'text-text-secondary'}`}>
              <GripHorizontal size={12} />
           </button>
        </div>
      </div>
      <div>
         {day.isRest ? (
           <p className={`text-[11px] font-bold leading-tight line-clamp-2 text-amber-500`}>Descanso</p>
         ) : (
           <p className={`text-[11px] font-bold leading-tight line-clamp-2 ${isToday ? 'text-background' : 'text-white'}`}>
             {day.exercises?.length > 0 
               ? Array.from(new Set(day.exercises.flatMap((e:any) => e.targetMuscles || []))).slice(0, 3).join(', ') || day.focus
               : day.focus}
           </p>
         )}
         {!day.isRest && day.exercises && (
           <p className={`text-[9px] mt-1 ${isToday ? 'text-background/80' : 'text-text-secondary'}`}>{day.exercises.length} Exercícios</p>
         )}
      </div>
    </div>
  );
}

// Wizard & Editor
import { QuestionnaireWizard } from '@/components/workout/QuestionnaireWizard';
import { WorkoutEditor } from '@/components/workout/WorkoutEditor';
import { EXERCISE_LIBRARY, findExerciseInLibrary } from '@/lib/exerciseLibrary';

// Attach library to global for easiest lookup without passing large sets around if needed 
if (typeof globalThis !== 'undefined') {
  (globalThis as any).EXERCISE_LIBRARY_CACHE = EXERCISE_LIBRARY;
}

export default function WorkoutsPage() {
  const { hasCompletedQuestionnaire, currentPlan } = useWorkoutStore();
  const { profile } = useAppStore();

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <Header title="Treino" subtitle="Sua jornada de evolução contínua" />
      
      <main className="p-5">
        {!hasCompletedQuestionnaire || !currentPlan ? (
          <div className="max-w-xl mx-auto">
             <QuestionnaireWizard />
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
             <WorkoutDashboard plan={currentPlan} />
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function WorkoutDashboard({ plan }: { plan: any }) {
  const { workoutHistory, resetWorkoutSystem, setPlan } = useWorkoutStore();
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIdStr = String(active.id);
      const overIdStr = String(over.id);

      const oldIndex = plan.schedule.findIndex((day: any, i: number) => (day._dndId || `${day.dayName}-${i}`) === activeIdStr);
      const newIndex = plan.schedule.findIndex((day: any, i: number) => (day._dndId || `${day.dayName}-${i}`) === overIdStr);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newSchedule = arrayMove(plan.schedule, oldIndex, newIndex);
        
        const standardNames = plan.schedule.map((d: any) => d.dayName);
        const renamedSchedule = newSchedule.map((d: any, i: number) => ({
          ...d,
          dayName: standardNames[i]
        }));

        setPlan({
          ...plan,
          schedule: renamedSchedule
        });
      }
    }
  };

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayPlan = plan.schedule[todayIndex] || plan.schedule[0];

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
          >
             <motion.div 
               initial={{ scale: 0.95, y: 10 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 10 }}
               className="bg-surface border border-surface-light p-8 rounded-3xl max-w-sm w-full relative overflow-hidden shadow-2xl"
             >
                <div className="flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                     <AlertTriangle size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Novo Ciclo?</h3>
                   <p className="text-sm text-text-secondary mb-8">
                     Isso irá gerar um novo planejamento do zero. Seu histórico será mantido.
                   </p>
                   <div className="flex gap-3 w-full">
                     <button 
                       onClick={() => setShowResetConfirm(false)}
                       className="flex-1 py-3 rounded-xl bg-surface-light text-white font-bold hover:bg-white/10 transition-colors"
                     >
                       Cancelar
                     </button>
                     <button 
                       onClick={() => {
                         setShowResetConfirm(false);
                         resetWorkoutSystem();
                       }}
                       className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                     >
                       Confirmar
                     </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {editingDayIndex !== null && (
        <WorkoutEditor dayIndex={editingDayIndex} onClose={() => setEditingDayIndex(null)} />
      )}

      {/* Header Actions */}
      <div className="flex justify-between items-center bg-surface p-2 pl-4 rounded-2xl border border-surface-light">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{plan.phaseName}</span>
        </div>
        <div className="flex gap-1">
          <Link to="/workouts/templates" className="p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-surface-light">
            <Save size={18} />
          </Link>
          <Link to="/workouts/library" className="p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-surface-light">
            <Dumbbell size={18} />
          </Link>
          <button onClick={() => setShowResetConfirm(true)} className="p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-surface-light">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Hero Section - The Daily Mission */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface p-6 rounded-3xl border border-surface-light relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-neon-blue uppercase tracking-widest mb-1 block">Hoje • {todayPlan.dayName}</span>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-display font-bold text-white leading-tight">{todayPlan.focus}</h2>
                  <button onClick={() => setEditingDayIndex(todayIndex)} className="p-1.5 bg-surface-light rounded-lg text-text-secondary hover:text-white transition-colors">
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {todayPlan.isRest ? (
              <div className="py-6 border-t border-surface-light flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                  <Shield size={24} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Recuperação</h4>
                  <p className="text-sm text-text-secondary">Descanse e prepare-se para o próximo desafio.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-6 mb-8 pt-4 border-t border-surface-light">
                   <div>
                     <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-1">Volume</p>
                     <p className="text-lg font-bold text-white">
                       {todayPlan.exercises?.length || 0} exercícios
                     </p>
                   </div>
                   <div>
                     <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-1">Intensidade</p>
                     <p className="text-lg font-bold text-white capitalize">{todayPlan.intensity}</p>
                   </div>
                </div>

                <Link to={`/workouts/active?dayIndex=${todayIndex}`} className="block">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-neon-blue text-background font-bold text-lg flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(0,240,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,240,255,0.23)] hover:bg-[#00d5ff] transition-all"
                  >
                    <PlaySquare size={20} /> 
                    <span>Começar Treino</span>
                  </motion.div>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Weekly Timeline */}
      <section>
         <h3 className="text-base font-bold text-white mb-4 px-1">Semana</h3>
         <DndContext
           sensors={sensors}
           collisionDetection={closestCenter}
           onDragEnd={handleDragEnd}
         >
           <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory px-1">
             <SortableContext
               items={plan.schedule.map((day: any, i: number) => day._dndId || `${day.dayName}-${i}`)}
               strategy={horizontalListSortingStrategy}
             >
               {plan.schedule.map((day: any, idx: number) => (
                 <motion.div key={day._dndId || `${day.dayName}-${idx}`} className="snap-center">
                    <SortableDayItem 
                      day={day}
                      idx={idx}
                      todayIndex={todayIndex}
                      setEditingDayIndex={setEditingDayIndex}
                    />
                 </motion.div>
               ))}
             </SortableContext>
           </div>
         </DndContext>
      </section>

      {/* Routine Detail List */}
      {!todayPlan.isRest && todayPlan.exercises?.length > 0 && (
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-base font-bold text-white">Exercícios de Hoje</h3>
          </div>
          
          <div className="space-y-4">
            {todayPlan.exercises?.map((ex: any, i: number) => {
              // Try to find the full exercise details from library to get the gifUrl
              const libraryEx = findExerciseInLibrary(ex.libraryId) || findExerciseInLibrary(ex.name) || findExerciseInLibrary(ex.id);
              
              // Fallback URL mechanism similar to smartworkout.app/pt patterns
              const fallbackMuscle = libraryEx?.targetMuscles?.[0] || ex.targetMuscles?.[0] || ex.target || 'Corpo Todo';
              const imageUrl = libraryEx?.gifUrl || getBodyPartImageUrl(fallbackMuscle);

              return (
              <div 
                key={ex.id || i}
                className="bg-surface border border-surface-light p-4 rounded-2xl flex items-center gap-4 group hover:border-white/20 transition-all overflow-hidden relative"
              >
                  <div className="w-24 shrink-0 aspect-video bg-surface rounded-xl overflow-hidden border border-surface-light relative z-10 flex items-center justify-center group-hover:border-neon-blue transition-colors pointer-events-none">
                    {imageUrl ? (
                      imageUrl.endsWith('.mp4') ? (
                         <video 
                           src={imageUrl} 
                           autoPlay 
                           loop 
                           muted 
                           playsInline
                           className="w-full h-full object-cover object-center opacity-80" 
                           onError={(e) => {
    (e.target as HTMLElement).style.opacity = '0';
  }}
                         />
                      ) : (
                        <img 
                          src={imageUrl} 
                          alt={ex.name}
                          loading="lazy"
                          fetchPriority="low"
                          className="w-full h-full object-contain p-1 opacity-80" 
                          onError={(e) => {
    (e.target as HTMLElement).style.opacity = '0';
  }}
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-surface/50 text-text-secondary/50">
                        <Dumbbell size={20} />
                      </div>
                    )}
                  </div>
                 <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-md bg-surface-light flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0">
                        {i + 1}
                      </div>
                      <p className="font-bold text-white text-sm truncate leading-tight">{ex.name}</p>
                    </div>
                    <p className="text-xs text-text-secondary flex items-center gap-2 mt-1">
                      <span className="bg-background px-2 py-0.5 rounded text-neon-blue font-bold">{ex.sets}x</span> 
                      <span>{ex.reps} reps</span>
                    </p>
                 </div>
              </div>
            )})}
          </div>
        </section>
      )}

      {/* History Shortcut */}
      <section className="pt-4 pb-4">
        <Link to="/workouts/history" className="flex items-center justify-between bg-surface p-5 rounded-2xl border border-surface-light group hover:border-neon-blue/50 transition-colors">
          <div>
            <h3 className="font-bold text-white text-lg">Histórico & Gráficos</h3>
            <p className="text-sm text-text-secondary">Acompanhe sua progressão e volume</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-colors">
             <ChevronRight size={20} />
          </div>
        </Link>
      </section>
    </div>
  );
}

