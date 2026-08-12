'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useWorkoutStore, ExerciseDefinition, WorkoutDayPlan } from '@/lib/workoutStore';
import { EXERCISE_LIBRARY, ExerciseLibraryItem, searchExercises } from '@/lib/exerciseLibrary';
import { X, Save, Edit3, Trash2, Plus, Search, Replace, Info, PlaySquare, GripVertical } from 'lucide-react';
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExerciseMedia } from './ExerciseMedia';

type EditorExercise = ExerciseDefinition & { _dndId?: string };

interface WorkoutEditorProps {
  fullPlan?: WorkoutPlan;
  dayIndex?: number;
  initialDayPlan?: WorkoutDayPlan;
  onSavePlan?: (plan: WorkoutDayPlan) => void;
  onSaveFullPlan?: (plan: WorkoutPlan) => void;
  onClose: () => void;
}

export function WorkoutEditor({ fullPlan, dayIndex = 0, initialDayPlan, onSavePlan, onSaveFullPlan, onClose }: WorkoutEditorProps) {
  const { currentPlan, updateDayPlan, updateUserTemplate } = useWorkoutStore();
  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Initialize schedule array and active day index
  const [schedule, setSchedule] = useState<WorkoutDayPlan[]>(() => {
    if (fullPlan?.schedule && fullPlan.schedule.length > 0) {
      return fullPlan.schedule;
    }
    if (initialDayPlan) {
      return [initialDayPlan];
    }
    if (currentPlan?.schedule && currentPlan.schedule.length > 0) {
      return currentPlan.schedule;
    }
    return [{ dayName: 'Dia 1', focus: 'Treino A', isRest: false, warmup: [], cooldown: [], exercises: [], intensity: 'Média' }];
  });

  const [programName, setProgramName] = useState<string>(
    fullPlan?.phaseName || currentPlan?.phaseName || 'Programa de Treino'
  );

  const [activeDayIdx, setActiveDayIdx] = useState<number>(() => {
    if (dayIndex >= 0 && dayIndex < schedule.length) return dayIndex;
    return 0;
  });

  // Current active day plan state
  const activeDay = schedule[activeDayIdx] || {
    dayName: `Dia ${activeDayIdx + 1}`,
    focus: 'Geral',
    isRest: false,
    warmup: [],
    cooldown: [],
    exercises: [],
    intensity: 'Média'
  };

  const [dayPlan, setDayPlan] = useState<WorkoutDayPlan & { exercises: EditorExercise[] }>(() => {
    return {
      ...activeDay,
      exercises: (activeDay.exercises || []).map((ex, i) => ({
        ...ex,
        _dndId: ex.id ? `${ex.id}-${i}-${Math.random().toString(36).substring(2, 6)}` : `ex-${i}-${Math.random().toString(36).substring(2, 6)}`
      }))
    };
  });

  // Sync active day changes back to schedule array when switching days or saving
  const syncCurrentDayToSchedule = (dayToSync: WorkoutDayPlan & { exercises: EditorExercise[] }) => {
    const cleanedDay: WorkoutDayPlan = {
      ...dayToSync,
      exercises: dayToSync.exercises.map(e => {
        const { _dndId, ...ex } = e;
        return ex as ExerciseDefinition;
      })
    };

    setSchedule(prev => {
      const copy = [...prev];
      copy[activeDayIdx] = cleanedDay;
      return copy;
    });

    return cleanedDay;
  };

  // Handle switching day tabs
  const handleSwitchDay = (targetIdx: number) => {
    if (targetIdx === activeDayIdx) return;

    // First save changes of current active day to schedule state
    const cleaned = syncCurrentDayToSchedule(dayPlan);
    const updatedSchedule = [...schedule];
    updatedSchedule[activeDayIdx] = cleaned;

    // Load target day
    const nextDay = updatedSchedule[targetIdx] || {
      dayName: `Dia ${targetIdx + 1}`,
      focus: 'Geral',
      isRest: false,
      warmup: [],
      cooldown: [],
      exercises: [],
      intensity: 'Média'
    };

    setDayPlan({
      ...nextDay,
      exercises: (nextDay.exercises || []).map((ex, i) => ({
        ...ex,
        _dndId: ex.id ? `${ex.id}-${i}-${Math.random().toString(36).substring(2, 6)}` : `ex-${i}-${Math.random().toString(36).substring(2, 6)}`
      }))
    });

    setActiveDayIdx(targetIdx);
    setReplacementTarget(null);
    setIsAddingMode(false);
  };

  // Add new day to schedule
  const handleAddDay = () => {
    // Sync current active day first
    const cleaned = syncCurrentDayToSchedule(dayPlan);
    const updatedSchedule = [...schedule];
    updatedSchedule[activeDayIdx] = cleaned;

    const newDayNum = updatedSchedule.length + 1;
    const newDay: WorkoutDayPlan = {
      dayName: `Dia ${newDayNum}`,
      focus: `Treino ${String.fromCharCode(64 + newDayNum)}`, // Treino A, B, C, D...
      isRest: false,
      warmup: [],
      cooldown: [],
      exercises: [],
      intensity: 'Média'
    };

    const newSchedule = [...updatedSchedule, newDay];
    setSchedule(newSchedule);

    // Switch to new day
    setActiveDayIdx(newSchedule.length - 1);
    setDayPlan({
      ...newDay,
      exercises: []
    });
    setReplacementTarget(null);
    setIsAddingMode(false);
  };

  // Delete day from schedule
  const handleDeleteDay = (idxToDelete: number) => {
    if (schedule.length <= 1) return; // Keep at least 1 day

    const updatedSchedule = schedule.filter((_, i) => i !== idxToDelete);
    setSchedule(updatedSchedule);

    let nextActive = activeDayIdx;
    if (idxToDelete === activeDayIdx) {
      nextActive = Math.max(0, idxToDelete - 1);
    } else if (idxToDelete < activeDayIdx) {
      nextActive = activeDayIdx - 1;
    }

    setActiveDayIdx(nextActive);
    const nextDay = updatedSchedule[nextActive];
    setDayPlan({
      ...nextDay,
      exercises: (nextDay.exercises || []).map((ex, i) => ({
        ...ex,
        _dndId: ex.id ? `${ex.id}-${i}-${Math.random().toString(36).substring(2, 6)}` : `ex-${i}-${Math.random().toString(36).substring(2, 6)}`
      }))
    });
  };

  const [replacementTarget, setReplacementTarget] = useState<number | null>(null);
  const [isAddingMode, setIsAddingMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDayPlan((dayPlan) => {
        const oldIndex = dayPlan.exercises.findIndex((ex) => (ex as EditorExercise)._dndId === active.id);
        const newIndex = dayPlan.exercises.findIndex((ex) => (ex as EditorExercise)._dndId === over.id);

        return {
          ...dayPlan,
          exercises: arrayMove(dayPlan.exercises, oldIndex, newIndex),
        };
      });
    }
  };

  const handleSave = () => {
    // 1. Clean current day plan
    const cleanedActiveDay = {
      ...dayPlan,
      exercises: dayPlan.exercises.map((e) => {
        const { _dndId, ...ex } = e as EditorExercise;
        return ex as ExerciseDefinition;
      })
    };

    // 2. Assemble full updated schedule
    const updatedSchedule = [...schedule];
    updatedSchedule[activeDayIdx] = cleanedActiveDay;

    // 3. Assemble full updated plan object
    const updatedFullPlan: WorkoutPlan = {
      id: fullPlan?.id || currentPlan?.id || `plan_${Date.now()}`,
      generatedAt: fullPlan?.generatedAt || new Date().toISOString(),
      phaseName: programName || 'Programa de Treino',
      planPromptDescription: fullPlan?.planPromptDescription || `${updatedSchedule.length} dias de treino`,
      schedule: updatedSchedule,
    };

    // 4. Callback execution
    if (onSaveFullPlan) {
      onSaveFullPlan(updatedFullPlan);
    } else if (fullPlan?.id) {
      updateUserTemplate(fullPlan.id, updatedFullPlan);
    } else if (onSavePlan) {
      onSavePlan(cleanedActiveDay);
    } else if (dayIndex !== undefined) {
      updateDayPlan(activeDayIdx, cleanedActiveDay);
    }

    onClose();
  };

  const handleUpdateExercise = (index: number, updates: Partial<ExerciseDefinition>) => {
    const newEx = [...dayPlan.exercises];
    newEx[index] = { ...newEx[index], ...updates };
    setDayPlan({ ...dayPlan, exercises: newEx });
  };

  const handleRemoveExercise = (index: number) => {
    const newEx = dayPlan.exercises.filter((_, i) => i !== index);
    setDayPlan({ ...dayPlan, exercises: newEx });
  };

  const commitReplacement = (libItem: ExerciseLibraryItem) => {
    // eslint-disable-next-line react-hooks/purity
    const nonce = Math.random();
    const newExercise: EditorExercise = {
      id: libItem.id,
      name: libItem.name,
      sets: 3,
      reps: "8-12",
      restSeconds: 60,
      instructions: libItem.instructions,
      targetMuscles: libItem.targetMuscles,
      difficulty: libItem.difficulty,
      gifPlaceholder: libItem.gifPlaceholder,
      equipment: libItem.equipment,
      _dndId: `${libItem.id}-${nonce}`
    };

    if (replacementTarget !== null) {
      const oldEx = dayPlan.exercises[replacementTarget];
      newExercise.sets = oldEx.sets;
      newExercise.reps = oldEx.reps;
      
      const newExArray = [...dayPlan.exercises];
      newExArray[replacementTarget] = newExercise;
      setDayPlan({ ...dayPlan, exercises: newExArray });
      setReplacementTarget(null);
    } else if (isAddingMode) {
      setDayPlan({ ...dayPlan, exercises: [...dayPlan.exercises, newExercise], isRest: false });
      setIsAddingMode(false);
    }
    setSearchQuery('');
  };

  const libraryResults = searchExercises(searchQuery);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex flex-col font-sans text-text-primary">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 border-b border-surface-light bg-background/98 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pt-10 sm:pt-8 px-4 sm:px-6 pb-3">
        {/* Top Row: Program Name and Close button */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-black uppercase text-neon-blue tracking-widest block mb-0.5">
              Editar Programa de Treino
            </span>
            <input 
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="Nome do Programa"
              className="font-black text-text-primary text-lg sm:text-xl bg-transparent border-b border-text-primary/10 focus:border-neon-blue focus:outline-none w-full py-0.5 transition-colors line-clamp-1"
            />
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center bg-text-primary/5 border border-surface-light rounded-2xl text-text-secondary hover:text-text-primary transition-all active:scale-95 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Day Switcher Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 pt-1 -mx-2 px-2">
          {schedule.map((dayItem, idx) => {
            const isActive = idx === activeDayIdx;
            return (
              <div 
                key={idx}
                className={`flex items-center shrink-0 rounded-xl transition-all border ${
                  isActive 
                    ? 'bg-neon-blue text-black border-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.3)]' 
                    : 'bg-surface text-text-secondary border-surface-light hover:text-text-primary hover:border-text-primary/20'
                }`}
              >
                <button
                  onClick={() => handleSwitchDay(idx)}
                  className="px-3.5 py-1.5 font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>{dayItem.dayName || `Dia ${idx + 1}`}</span>
                  {dayItem.focus && (
                    <span className={`text-[10px] opacity-80 max-w-[80px] truncate ${isActive ? 'text-black/80 font-bold' : 'text-text-secondary'}`}>
                      • {dayItem.focus}
                    </span>
                  )}
                </button>

                {schedule.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDay(idx);
                    }}
                    title="Excluir este dia"
                    className={`pr-2.5 pl-1 py-1.5 rounded-r-xl transition-colors ${
                      isActive ? 'hover:text-red-900 text-black/60' : 'hover:text-red-400 text-text-secondary/50'
                    }`}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={handleAddDay}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>Novo Dia</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
        <div className="p-4 pb-32 max-w-3xl mx-auto w-full">
          {(replacementTarget !== null || isAddingMode) ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col w-full">
              <div className="flex justify-between items-center mb-3">
             <h3 className="font-black text-text-primary text-lg">Biblioteca de Exercícios</h3>
             <button onClick={() => { setReplacementTarget(null); setIsAddingMode(false); }} className="text-neon-blue text-[10px] uppercase font-black tracking-widest bg-neon-blue/10 px-3 py-1.5 rounded-lg">Voltar</button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
            <input 
              type="text"
              placeholder="Buscar exercício..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-light rounded-2xl py-3 pl-12 pr-4 text-sm text-text-primary font-medium focus:border-neon-blue/50 focus:outline-none placeholder:text-text-secondary shadow-inner"
            />
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
             {libraryResults.map(lib => (
               <button 
                 key={lib.id}
                 onClick={() => commitReplacement(lib)}
                 className="w-full text-left bg-surface border border-surface-light p-4 rounded-2xl flex items-center justify-between hover:border-text-primary/20 transition-all active:scale-95 shadow-lg group"
               >
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-xl overflow-hidden bg-background relative shrink-0 border border-surface-light">
                     <ExerciseMedia exerciseNameOrId={lib.id} fallbackMuscle={lib.targetMuscles[0]} />
                   </div>
                   <div>
                     <h4 className="font-black text-text-primary text-sm group-hover:text-neon-blue transition-colors">{lib.name}</h4>
                     <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">{lib.targetMuscles.join(', ')} • {lib.equipment}</p>
                   </div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-text-primary/5 flex items-center justify-center text-text-secondary group-hover:bg-neon-blue group-hover:text-black transition-all shrink-0 ml-2">
                   <Plus size={18} />
                 </div>
               </button>
             ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4 flex-1 max-w-3xl mx-auto w-full">
          {/* Foco e Tipo */}
          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-black uppercase text-text-secondary tracking-widest mb-2 block">Foco Muscular / Nome</label>
              <input 
                type="text" 
                value={dayPlan.focus} 
                onChange={(e) => setDayPlan({ ...dayPlan, focus: e.target.value })}
                className="w-full bg-surface border border-surface-light rounded-2xl p-4 text-sm font-black text-text-primary focus:outline-none focus:border-neon-blue/50 shadow-inner transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 bg-surface border border-surface-light p-4 rounded-2xl">
              <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest block flex-1">Marcar como Dia de Descanso?</label>
              <input 
                type="checkbox" 
                checked={dayPlan.isRest} 
                onChange={(e) => setDayPlan({ ...dayPlan, isRest: e.target.checked, exercises: e.target.checked ? [] : dayPlan.exercises })}
                className="w-5 h-5 accent-neon-blue bg-background border border-surface-light rounded"
              />
            </div>
          </div>

          {!dayPlan.isRest && (
            <div className="pb-8">
              <div className="flex items-center justify-between mb-3 mt-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-neon-blue flex items-center gap-2">
                  <PlaySquare size={14} /> Rotina de Exercícios
                </h3>
              </div>
              
              <div className="space-y-4">
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={dayPlan.exercises.map(ex => (ex as EditorExercise)._dndId as string)}
                    strategy={verticalListSortingStrategy}
                  >
                    {dayPlan.exercises.map((ex, idx) => (
                      <SortableExerciseItem 
                        key={(ex as EditorExercise)._dndId} 
                        ex={ex as EditorExercise} 
                        idx={idx} 
                        handleUpdateExercise={handleUpdateExercise}
                        setReplacementTarget={setReplacementTarget}
                        handleRemoveExercise={handleRemoveExercise}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                <button 
                  onClick={() => setIsAddingMode(true)}
                  className="w-full py-3 border-2 border-dashed border-surface-light rounded-2xl text-text-secondary hover:text-neon-blue hover:border-neon-blue/30 hover:bg-neon-blue/5 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px] transition-all mt-4"
                >
                  <Plus size={18} /> Adicionar Novo Exercício
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
        </div>
      </div>

      {replacementTarget === null && !isAddingMode && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-surface-light flex items-center gap-3 z-[110]">
           <button onClick={onClose} className="w-1/3 py-3 bg-surface border border-surface-light text-text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-text-primary/5 transition-all active:scale-95 shadow-lg">
              Cancelar
           </button>
           <button onClick={handleSave} className="flex-1 py-3 bg-neon-blue text-black rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:brightness-110 flex justify-center items-center gap-2 transition-all active:scale-95">
              <Save size={16} /> Salvar Alterações
           </button>
        </div>
      )}
    </div>,
    document.body
  );
}

interface SortableExerciseItemProps {
  ex: EditorExercise;
  idx: number;
  handleUpdateExercise: (index: number, updates: Partial<ExerciseDefinition>) => void;
  setReplacementTarget: (index: number) => void;
  handleRemoveExercise: (index: number) => void;
}

function SortableExerciseItem({ ex, idx, handleUpdateExercise, setReplacementTarget, handleRemoveExercise }: SortableExerciseItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ex._dndId as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? 'relative' as const : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-surface border border-surface-light rounded-2xl p-4 flex flex-col mb-4 shadow-lg">
      <div className="flex gap-3 items-start w-full">
        <div {...attributes} {...listeners} className="flex flex-col justify-center cursor-grab text-text-secondary hover:text-text-primary active:cursor-grabbing mt-2 transition-colors">
          <GripVertical size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="min-w-0 pr-3 flex-1">
              <textarea 
                rows={2}
                value={ex.name} 
                onChange={(e) => handleUpdateExercise(idx, { name: e.target.value })}
                className="font-black text-text-primary text-[15px] bg-transparent border-b border-dashed border-text-primary/20 pb-0.5 focus:outline-none focus:border-neon-blue w-full max-w-full transition-colors resize-none overflow-hidden leading-tight"
                style={{ minHeight: '44px' }}
              />
              <p className="text-[9px] font-medium text-text-secondary mt-1 max-w-full truncate">{ex.instructions || 'Nenhuma instrução'}</p>
            </div>
            <div className="flex gap-1.5 flex-shrink-0 mt-1">
              <button onClick={() => setReplacementTarget(idx)} className="w-8 h-8 bg-text-primary/5 border border-surface-light rounded-lg flex items-center justify-center text-text-secondary hover:text-neon-blue hover:border-neon-blue/30 transition-all active:scale-95">
                <Replace size={14} />
              </button>
              <button onClick={() => handleRemoveExercise(idx)} className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-text-primary transition-all active:scale-95">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-row gap-3">
            <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-surface-light bg-background/50 relative self-center">
              <ExerciseMedia exerciseNameOrId={ex.id || ex.name} fallbackMuscle={ex.targetMuscles?.[0]} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
                   <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1">Séries</span>
                   <input type="number" value={ex.sets ?? ""} onChange={(e) => handleUpdateExercise(idx, { sets: parseInt(e.target.value)||0 })} className="w-full bg-transparent text-text-primary font-black text-xs focus:outline-none" />
                </div>
                <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
                   <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1">Reps</span>
                   <input type="text" value={ex.reps ?? ""} onChange={(e) => handleUpdateExercise(idx, { reps: e.target.value })} className="w-full bg-transparent text-text-primary font-black text-xs focus:outline-none" />
                </div>
                <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
                   <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1">Descanso</span>
                   <input type="text" placeholder="60s" value={ex.rest || ''} onChange={(e) => handleUpdateExercise(idx, { rest: e.target.value })} className="w-full bg-transparent text-text-primary font-black text-xs focus:outline-none" />
                </div>
                <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
                   <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1">Tempo</span>
                   <input type="text" placeholder="3010" value={ex.tempo || ''} onChange={(e) => handleUpdateExercise(idx, { tempo: e.target.value })} className="w-full bg-transparent text-text-primary font-black text-xs focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="col-span-2 bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
               <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1">RIR (Rep na Reserva)</span>
               <input type="text" placeholder="0-2" value={ex.rir || ''} onChange={(e) => handleUpdateExercise(idx, { rir: e.target.value })} className="w-full bg-transparent text-text-primary font-black text-xs focus:outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
               <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1 block">Técnica</span>
               <select 
                  value={ex.advancedTechnique || ''} 
                  onChange={(e) => handleUpdateExercise(idx, { advancedTechnique: e.target.value })} 
                  className="w-full bg-transparent text-text-primary font-black text-[9px] uppercase outline-none border-none cursor-pointer p-0 appearance-none"
                >
                  <option value="" className="bg-surface text-text-primary">Nenhuma</option>
                  <option value="Drop Set" className="bg-surface text-text-primary">Drop Set</option>
                  <option value="Rest Pause" className="bg-surface text-text-primary">Rest Pause</option>
                  <option value="Cluster Set" className="bg-surface text-text-primary">Cluster Set</option>
                  <option value="Myo Reps" className="bg-surface text-text-primary">Myo Reps</option>
                  <option value="FST-7" className="bg-surface text-text-primary">FST-7</option>
                </select>
            </div>
            <div className="bg-background rounded-lg p-2 border border-surface-light flex flex-col justify-center shadow-inner">
               <span className="text-[8px] uppercase text-text-secondary font-black tracking-widest mb-1 block">Superset</span>
               <select 
                  value={ex.supersetGroup || ''} 
                  onChange={(e) => handleUpdateExercise(idx, { supersetGroup: e.target.value })} 
                  className="w-full bg-transparent text-text-primary font-black text-[9px] uppercase outline-none border-none cursor-pointer p-0 appearance-none"
                >
                  <option value="" className="bg-surface text-text-primary">Nenhum</option>
                  <option value="A1" className="bg-surface text-text-primary">Grupo A1</option>
                  <option value="A2" className="bg-surface text-text-primary">Grupo A2</option>
                  <option value="A3" className="bg-surface text-text-primary">Grupo A3</option>
                  <option value="B1" className="bg-surface text-text-primary">Grupo B1</option>
                  <option value="B2" className="bg-surface text-text-primary">Grupo B2</option>
                  <option value="B3" className="bg-surface text-text-primary">Grupo B3</option>
                </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
