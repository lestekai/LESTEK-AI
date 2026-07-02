'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore, ExerciseDefinition, WorkoutDayPlan } from '@/lib/workoutStore';
import { EXERCISE_LIBRARY, searchExercises } from '@/lib/exerciseLibrary';
import { 
  ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown, 
  Dumbbell, Search, Play, BookOpen, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExerciseMedia } from '@/components/workout/ExerciseMedia';

export default function FreeWorkoutPage() {
  const navigate = useNavigate();
  const { setFreeWorkout } = useWorkoutStore();

  // Free Workout State
  const [workoutFocus, setWorkoutFocus] = useState('');
  const [addedExercises, setAddedExercises] = useState<ExerciseDefinition[]>([]);
  
  // Library Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLimit, setSearchLimit] = useState(15);

  const searchResults = searchExercises(searchQuery, 'Todos', 'Todas').slice(0, searchLimit);

  // Add Exercise Helper
  const addExercise = (ex: any) => {
    const newEx: ExerciseDefinition = {
      id: ex.id,
      name: ex.name,
      sets: 3,
      reps: '10',
      restSeconds: 60,
      instructions: ex.instructions,
      targetMuscles: ex.targetMuscles,
      equipment: ex.equipment,
      difficulty: ex.difficulty,
    };
    setAddedExercises(prev => [...prev, newEx]);
    setSearchQuery('');
  };

  const removeExercise = (index: number) => {
    setAddedExercises(prev => prev.filter((_, i) => i !== index));
  };

  const updateExerciseParam = (index: number, field: keyof ExerciseDefinition, value: any) => {
    setAddedExercises(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const [isQuickTemplatesOpen, setIsQuickTemplatesOpen] = useState(true);

  const loadQuickRoutine = (type: string) => {
    const routines: Record<string, string[]> = {
      fullbody_1: ['Agachamento Livre', 'Supino Reto', 'Remada Curvada', 'Desenvolvimento com Halteres'],
      fullbody_2: ['Levantamento Terra Romeno', 'Supino Inclinado com Halteres', 'Puxada na Polia para Dorsais', 'Elevação Lateral'],
      push_1: ['Supino Reto', 'Desenvolvimento com Halteres', 'Tríceps Testa', 'Elevação Lateral'],
      push_2: ['Supino Inclinado com Halteres', 'Crucifixo no Cabo deitado', 'Elevação Lateral com Cabo', 'Extensão de Tríceps na Máquina'],
      pull_1: ['Puxada Alta', 'Remada Curvada', 'Rosca Direta', 'Crucifixo Inverso'],
      pull_2: ['Barra Fixa (Pull-up)', 'Remada Unilateral no Cabo', 'Rosca Martelo Alternada com Halteres', 'Crucifixo Invertido no Cabo para Deltoides Posterior'],
      legs_1: ['Agachamento Livre', 'Leg Press', 'Cadeira Extensora', 'Mesa Flexora'],
      legs_2: ['Levantamento Terra Romeno', 'Afundos Laterais', 'Cadeira Flexora', 'Elevação de Tibial Anterior em Pé']
    };
    
    const selectedNames = routines[type];
    const newExs = selectedNames.map(name => {
      const found = EXERCISE_LIBRARY.find(e => e.name === name);
      if (!found) return null;
      return {
        id: found.id,
        name: found.name,
        sets: 3,
        reps: '10',
        restSeconds: 60,
        instructions: found.instructions,
        targetMuscles: found.targetMuscles,
      } as ExerciseDefinition;
    }).filter(Boolean) as ExerciseDefinition[];

    setAddedExercises(newExs);
    setWorkoutFocus(`Rotina Rápida: ${type.toUpperCase()}`);
  };

  // Start Free Workout
  const handleStartWorkout = () => {
    if (addedExercises.length === 0) return;
    
    const freePlan: WorkoutDayPlan = {
      dayName: 'Treino Livre',
      focus: workoutFocus || 'Treino Rápido',
      isRest: false,
      exercises: addedExercises,
      warmup: [],
      cooldown: [],
      intensity: 'Média',
    };

    setFreeWorkout(freePlan);
    navigate('/workouts/active?free=true');
  };

  const handleSaveAsExtra = () => {
    if (addedExercises.length === 0) return;
    
    const freePlan: WorkoutDayPlan = {
      dayName: 'Treino Livre',
      focus: workoutFocus || 'Treino Extra',
      isRest: false,
      exercises: addedExercises,
      warmup: [],
      cooldown: [],
      intensity: 'Média',
    };

    const newTemplate = {
      id: `user-extra-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      phaseName: workoutFocus || 'Treino Extra Personalizado',
      planPromptDescription: `${addedExercises.length} exercícios selecionados manualmente`,
      schedule: [freePlan]
    };

    useWorkoutStore.getState().addUserTemplate(newTemplate);
    alert('Treino salvo nos Treinos Extras!');
  };

  return (
    <div className="min-h-screen bg-background pb-32 text-white relative flex flex-col">
      {/* Sticky Header */}
      <header className="p-5 sticky top-0 bg-background/95 backdrop-blur-xl z-30 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/workouts')}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-white">Treino Rápido</h1>
            <p className="text-[11px] text-[#e57d3b] font-bold uppercase tracking-widest mt-0.5">Monte e Inicie</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 max-w-2xl mx-auto w-full space-y-8">

        {/* Quick Starts */}
        {addedExercises.length === 0 && (
          <section className="space-y-4 animate-fade-in bg-surface/30 p-5 rounded-3xl border border-white/5">
            <button 
              onClick={() => setIsQuickTemplatesOpen(!isQuickTemplatesOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xs font-black uppercase tracking-widest text-[#e57d3b] flex items-center gap-2">
                <Zap size={16} /> Templates Rápidos
              </h2>
              {isQuickTemplatesOpen ? <ArrowUp size={16} className="text-slate-400" /> : <ArrowDown size={16} className="text-slate-400" />}
            </button>
            
            <AnimatePresence>
              {isQuickTemplatesOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 mt-4">
                    {/* Full Body */}
                    <div>
                      <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Corpo Inteiro (Full Body)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('fullbody_1')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Básico</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('fullbody_2')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Variação 2</span>
                        </button>
                      </div>
                    </div>
                    {/* Push */}
                    <div>
                      <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Empurrar (Push)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('push_1')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Foco Peito</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('push_2')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Foco Ombro</span>
                        </button>
                      </div>
                    </div>
                    {/* Pull */}
                    <div>
                      <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Puxar (Pull)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('pull_1')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Foco Costas</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('pull_2')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Foco Bíceps</span>
                        </button>
                      </div>
                    </div>
                    {/* Legs */}
                    <div>
                      <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Pernas (Legs)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('legs_1')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Foco Quadríceps</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('legs_2')} className="p-3 rounded-2xl bg-surface border border-white/5 text-left hover:border-white/20 active:scale-95 transition-all">
                          <span className="block text-white font-bold text-sm mb-1">Posterior / Glúteo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {/* Step 2: Added exercises / current routine */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
              Lista Atual <span className="bg-white/10 px-2 py-0.5 rounded-md text-white">{addedExercises.length}</span>
            </h2>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {addedExercises.map((ex, idx) => (
                <motion.div 
                  key={`${ex.id}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface border border-white/5 rounded-[24px] p-5 shadow-lg relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shrink-0 border border-white/10 bg-background/50 relative">
                      <ExerciseMedia exerciseNameOrId={ex.id || ex.name} fallbackMuscle={ex.targetMuscles?.[0]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-[15px] leading-tight break-words mb-1">{idx + 1}. {ex.name}</h4>
                      <span className="text-[10px] uppercase font-bold text-[#e57d3b]">
                        {(ex.targetMuscles || [])[0]}
                      </span>
                    </div>

                    <button 
                      onClick={() => removeExercise(idx)}
                      className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 hover:bg-red-500/20 active:scale-90 transition-all ml-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-background/50 rounded-2xl p-3 border border-white/5">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-1">Séries</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateExerciseParam(idx, 'sets', Math.max(1, (ex.sets || 3) - 1))}
                          className="w-8 h-8 rounded-full bg-surface text-lg flex items-center justify-center font-black active:scale-90 transition-transform"
                        >-</button>
                        <span className="font-black text-xl w-6 text-center text-white">{ex.sets}</span>
                        <button 
                          onClick={() => updateExerciseParam(idx, 'sets', (ex.sets || 3) + 1)}
                          className="w-8 h-8 rounded-full bg-surface text-lg flex items-center justify-center font-black active:scale-90 transition-transform"
                        >+</button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-1">Reps</span>
                      <input 
                        type="text" 
                        value={ex.reps}
                        onChange={(e) => updateExerciseParam(idx, 'reps', e.target.value)}
                        className="w-16 bg-surface rounded-xl text-center font-black text-xl text-white outline-none py-1 border border-transparent focus:border-[#e57d3b]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {addedExercises.length === 0 && (
              <div className="border border-dashed border-white/10 bg-surface/30 py-12 rounded-[32px] text-center text-slate-400 space-y-3">
                <Dumbbell size={32} className="mx-auto text-slate-500/30" />
                <p className="text-sm font-medium px-8">Sem exercícios. Adicione manualmente ou escolha um template acima.</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#e57d3b] flex items-center gap-2">
            <Search size={16} /> Buscar Exercício
          </h2>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Ex: supino, rosca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-[20px] py-4 pl-12 pr-4 text-white text-base font-bold outline-none focus:border-[#e57d3b] transition-colors"
            />
          </div>

          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {searchResults.map(ex => (
                  <div key={ex.id} className="p-3 bg-surface border border-white/5 rounded-2xl flex justify-between items-center text-left">
                    <div className="w-[104px] h-[104px] rounded-xl overflow-hidden shrink-0 border border-white/10 bg-background/50 relative mr-4">
                      <ExerciseMedia exerciseNameOrId={ex.id} fallbackMuscle={ex.targetMuscles?.[0]} />
                    </div>
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-bold text-[15px] text-white break-words leading-tight mb-1">{ex.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 truncate">
                        {ex.targetMuscles.join(', ')}
                      </p>
                    </div>

                    <button 
                      onClick={() => addExercise(ex)}
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 shrink-0 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Floating Bottom Active Launcher */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background/95 backdrop-blur-2xl border-t border-white/5 z-40">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button 
            onClick={handleSaveAsExtra}
            disabled={addedExercises.length === 0}
            className="flex-1 py-4 bg-surface border border-white/10 text-white rounded-[20px] font-bold uppercase tracking-widest text-sm disabled:opacity-50 hover:bg-white/5 active:scale-95 transition-all"
          >
            SALVAR NO EXTRA
          </button>
          <button 
            onClick={handleStartWorkout}
            disabled={addedExercises.length === 0}
            className="flex-[2] py-4 bg-gradient-to-r from-[#e57d3b] to-amber-500 disabled:from-surface disabled:to-surface disabled:text-slate-500 text-black rounded-[20px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(229,125,59,0.3)] disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play size={18} fill="currentColor" /> INICIAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
}

