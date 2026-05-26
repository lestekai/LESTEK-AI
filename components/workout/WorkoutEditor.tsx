'use client';

import { useState } from 'react';
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

type EditorExercise = ExerciseDefinition & { _dndId?: string };

interface WorkoutEditorProps {
  dayIndex: number;
  onClose: () => void;
}

export function WorkoutEditor({ dayIndex, onClose }: WorkoutEditorProps) {
  const { currentPlan, updateDayPlan } = useWorkoutStore();
  
  const [dayPlan, setDayPlan] = useState<WorkoutDayPlan & { exercises: EditorExercise[] }>(() => {
    const base = currentPlan?.schedule[dayIndex] || { dayName: 'Dia X', focus: 'Descanso', isRest: true, warmup: [], cooldown: [], exercises: [], intensity: 'Leve' };
    return {
      ...base,
      exercises: (base.exercises || []).map((ex, i) => ({
        ...ex,
        _dndId: ex.id ? `${ex.id}-${i}` : `ex-${i}-${Math.random()}`
      }))
    };
  });

  const [replacementTarget, setReplacementTarget] = useState<number | null>(null); // Index of exercise to replace
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
    const savedPlan = {
      ...dayPlan,
      exercises: dayPlan.exercises.map((e) => {
        const { _dndId, ...ex } = e as EditorExercise;
        return ex as ExerciseDefinition;
      })
    };
    updateDayPlan(dayIndex, savedPlan);
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

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col pt-12 px-4 pb-24 overflow-y-auto w-full custom-scrollbar">
      <div className="flex items-center justify-between py-4 border-b border-surface-light sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div>
          <h2 className="text-xl font-bold text-white leading-none">Editar: {dayPlan.dayName}</h2>
          <span className="text-xs text-text-secondary uppercase tracking-widest">{dayPlan.focus}</span>
        </div>
        <button onClick={onClose} className="p-2 bg-surface border border-surface-light rounded-full text-text-secondary hover:text-white">
          <X size={20} />
        </button>
      </div>

      {(replacementTarget !== null || isAddingMode) ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-white text-lg">Biblioteca de Exercícios</h3>
             <button onClick={() => { setReplacementTarget(null); setIsAddingMode(false); }} className="text-neon-blue text-sm uppercase font-bold tracking-widest">Voltar</button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
            <input 
              type="text"
              placeholder="Buscar exercício..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-light rounded-xl py-3 pl-10 pr-4 text-white focus:border-neon-blue focus:outline-none placeholder:text-text-secondary"
            />
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
             {libraryResults.map(lib => (
               <button 
                 key={lib.id}
                 onClick={() => commitReplacement(lib)}
                 className="w-full text-left bg-surface border border-surface-light p-4 rounded-xl flex items-center justify-between hover:border-white/20 transition-colors"
               >
                 <div>
                   <h4 className="font-bold text-sm text-white">{lib.name}</h4>
                   <p className="text-[10px] text-text-secondary mt-1">{lib.targetMuscles.join(', ')} • {lib.equipment}</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue">
                   <Plus size={16} />
                 </div>
               </button>
             ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6 flex-1">
          {/* Foco e Tipo */}
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase text-text-secondary tracking-widest font-bold mb-2 block">Foco Muscular / Nome</label>
              <input 
                type="text" 
                value={dayPlan.focus} 
                onChange={(e) => setDayPlan({ ...dayPlan, focus: e.target.value })}
                className="w-full bg-surface border border-surface-light rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neon-blue"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs uppercase text-text-secondary tracking-widest font-bold block">Dia de Descanso?</label>
              <input 
                type="checkbox" 
                checked={dayPlan.isRest} 
                onChange={(e) => setDayPlan({ ...dayPlan, isRest: e.target.checked, exercises: e.target.checked ? [] : dayPlan.exercises })}
                className="w-5 h-5 accent-amber-500 bg-surface border border-surface-light rounded"
              />
            </div>
          </div>

          {!dayPlan.isRest && (
            <div>
              <div className="flex items-center justify-between mb-4 mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
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
                  className="w-full py-4 border-2 border-dashed border-surface-light rounded-xl text-text-secondary hover:text-neon-blue hover:border-neon-blue/50 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors mt-2"
                >
                  <Plus size={16} /> Adicionar Exercício
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {replacementTarget === null && !isAddingMode && (
        <div className="sticky bottom-4 mt-8 bg-background/95 pt-4 border-t border-surface-light flex items-center gap-3">
           <button onClick={onClose} className="flex-1 py-4 border border-surface-light text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-surface">
              Cancelar
           </button>
           <button onClick={handleSave} className="flex-1 py-4 bg-neon-blue text-background rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:bg-white flex justify-center items-center gap-2">
              <Save size={16} /> Salvar Treino
           </button>
        </div>
      )}
    </div>
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
    <div ref={setNodeRef} style={style} className="bg-surface border border-surface-light rounded-xl p-4 flex gap-3 mb-4">
      <div {...attributes} {...listeners} className="flex flex-col justify-center cursor-grab text-text-secondary hover:text-neon-blue active:cursor-grabbing px-1">
        <GripVertical size={20} />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div className="min-w-0 pr-2">
            <input 
              type="text" 
              value={ex.name} 
              onChange={(e) => handleUpdateExercise(idx, { name: e.target.value })}
              className="font-bold text-white bg-transparent border-b border-dashed border-white/20 p-0 focus:outline-none focus:border-neon-blue w-full max-w-full"
            />
            <p className="text-[10px] text-text-secondary mt-1 max-w-[200px] truncate">{ex.instructions || 'Nenhuma instrução'}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => setReplacementTarget(idx)} className="p-1.5 bg-background border border-surface-light rounded flex items-center justify-center text-text-secondary hover:text-neon-blue">
              <Replace size={14} />
            </button>
            <button onClick={() => handleRemoveExercise(idx)} className="p-1.5 bg-red-900/20 border border-red-900/50 rounded flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex gap-3 mt-3">
          <div className="flex-1 bg-background rounded-lg p-2 border border-surface-light flex items-center justify-between">
             <span className="text-[10px] uppercase text-text-secondary">Séries</span>
             <input type="number" value={ex.sets} onChange={(e) => handleUpdateExercise(idx, { sets: parseInt(e.target.value)||0 })} className="w-10 bg-transparent text-right text-white font-bold text-sm focus:outline-none" />
          </div>
          <div className="flex-1 bg-background rounded-lg p-2 border border-surface-light flex items-center justify-between">
             <span className="text-[10px] uppercase text-text-secondary">Reps</span>
             <input type="text" value={ex.reps} onChange={(e) => handleUpdateExercise(idx, { reps: e.target.value })} className="w-20 bg-transparent text-right text-white font-bold text-sm focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
