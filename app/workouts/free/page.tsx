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

function resolveExercise(query: string): ExerciseDefinition | null {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  
  // 1. Try exact name or id match
  let found = EXERCISE_LIBRARY.find(e => e.name.toLowerCase() === q || e.id.toLowerCase() === q);
  if (found) return found;

  // 2. Search using searchExercises query
  const results = searchExercises(query, 'Todos', 'Todas');
  if (results.length > 0) return results[0];

  return null;
}

export default function FreeWorkoutPage() {
  const navigate = useNavigate();
  const { setFreeWorkout, addUserTemplate } = useWorkoutStore();

  // Free Workout State
  const [workoutFocus, setWorkoutFocus] = useState('');
  const [addedExercises, setAddedExercises] = useState<ExerciseDefinition[]>([]);
  
  // Save Modal State
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

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
      reps: '10-12',
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
    const routines: Record<string, { title: string; exercises: string[] }> = {
      fullbody_1: {
        title: 'Full Body 1 - Força & Hipertrofia',
        exercises: ['Agachamento Livre', 'Supino Reto', 'Remada Curvada', 'Desenvolvimento Halter', 'Cadeira Extensora', 'Rosca Direta', 'Tríceps Pulley']
      },
      fullbody_2: {
        title: 'Full Body 2 - Cadeia Posterior & Core',
        exercises: ['Levantamento Terra Romeno', 'Supino Inclinado Halter', 'Puxada Alta', 'Elevação Lateral', 'Mesa Flexora', 'Rosca Martelo', 'Tríceps Testa']
      },
      push_1: {
        title: 'Empurrar (Push) 1 - Peito, Ombro & Tríceps',
        exercises: ['Supino Reto', 'Supino Inclinado Halter', 'Desenvolvimento Halter', 'Elevação Lateral', 'Tríceps Pulley', 'Tríceps Testa']
      },
      push_2: {
        title: 'Empurrar (Push) 2 - Ombro & Peito Inclinado',
        exercises: ['Desenvolvimento', 'Supino Inclinado Barra', 'Crucifixo', 'Elevação Lateral', 'Tríceps Corda', 'Flexão de Braço']
      },
      pull_1: {
        title: 'Puxar (Pull) 1 - Costas & Bíceps Largura',
        exercises: ['Puxada Alta', 'Remada Curvada', 'Remada Baixa', 'Crucifixo Inverso', 'Rosca Direta', 'Rosca Martelo']
      },
      pull_2: {
        title: 'Puxar (Pull) 2 - Costas & Bíceps Espessura',
        exercises: ['Barra Fixa', 'Remada Unilateral', 'Pulldown', 'Rosca Scott', 'Rosca Concentrada', 'Encolhimento']
      },
      legs_1: {
        title: 'Pernas (Legs) 1 - Quadríceps Dominante',
        exercises: ['Agachamento Livre', 'Leg Press', 'Cadeira Extensora', 'Stiff', 'Gêmeos em Pé', 'Abdominal']
      },
      legs_2: {
        title: 'Pernas (Legs) 2 - Posterior & Glúteo',
        exercises: ['Levantamento Terra Romeno', 'Cadeira Flexora', 'Elevação Pélvica', 'Afundos', 'Cadeira Abdutora', 'Panturrilha']
      },
      upper: {
        title: 'Membros Superiores Completo',
        exercises: ['Supino Inclinado Halter', 'Remada Curvada', 'Desenvolvimento Halter', 'Puxada Alta', 'Rosca Direta', 'Tríceps Testa']
      },
      lower: {
        title: 'Membros Inferiores Completo',
        exercises: ['Agachamento Livre', 'Levantamento Terra Romeno', 'Leg Press', 'Mesa Flexora', 'Panturrilha em Pé', 'Abdominal']
      }
    };
    
    const selected = routines[type];
    if (!selected) return;

    const newExs = selected.exercises.map(name => {
      const found = resolveExercise(name);
      if (!found) return null;
      return {
        id: found.id,
        name: found.name,
        sets: 3,
        reps: '10-12',
        restSeconds: 60,
        instructions: found.instructions,
        targetMuscles: found.targetMuscles,
        equipment: found.equipment,
        difficulty: found.difficulty,
      } as ExerciseDefinition;
    }).filter(Boolean) as ExerciseDefinition[];

    setAddedExercises(newExs);
    setWorkoutFocus(selected.title);
  };

  // Start Free Workout
  const handleStartWorkout = () => {
    if (addedExercises.length === 0) return;
    
    const freePlan: WorkoutDayPlan = {
      dayName: 'Treino Livre',
      focus: workoutFocus || 'Treino Personalizado',
      isRest: false,
      exercises: addedExercises,
      warmup: [],
      cooldown: [],
      intensity: 'Média',
    };

    setFreeWorkout(freePlan);
    navigate('/workouts/active?free=true');
  };

  const handleOpenSaveModal = () => {
    if (addedExercises.length === 0) return;
    setSaveTitle(workoutFocus || 'Treino Extra Personalizado');
    setShowSaveModal(true);
  };

  const handleConfirmSaveAsExtra = () => {
    if (addedExercises.length === 0) return;
    
    const finalTitle = saveTitle.trim() || 'Treino Extra Personalizado';
    const freePlan: WorkoutDayPlan = {
      dayName: 'Treino Livre',
      focus: finalTitle,
      isRest: false,
      exercises: addedExercises,
      warmup: [],
      cooldown: [],
      intensity: 'Média',
    };

    const newTemplate = {
      id: `user-extra-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      phaseName: finalTitle,
      planPromptDescription: `${addedExercises.length} exercícios personalizados`,
      schedule: [freePlan]
    };

    addUserTemplate(newTemplate);
    setShowSaveModal(false);
    setSaveSuccessMessage(`Treino "${finalTitle}" salvo com sucesso nos Treinos Extras!`);
  };

  return (
    <div className="min-h-screen bg-background pb-32 text-text-primary relative flex flex-col">
      {/* Sticky Header */}
      <header className="p-5 sticky top-0 bg-background/95 backdrop-blur-xl z-30 border-b border-surface-light flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/workouts')}
            className="w-12 h-12 flex items-center justify-center bg-text-primary/5 border border-surface-light rounded-full text-text-secondary hover:text-text-primary transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-text-primary">Treino Rápido</h1>
            <p className="text-[11px] text-[#e57d3b] font-bold uppercase tracking-widest mt-0.5">Monte e Inicie</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 max-w-2xl mx-auto w-full space-y-4">

        {/* Workout Focus / Title Input */}
        <div className="bg-surface/50 border border-surface-light rounded-2xl p-4 space-y-2">
          <label className="text-[10px] uppercase font-black tracking-widest text-text-secondary block">
            Nome do Treino / Foco Muscular
          </label>
          <input 
            type="text"
            placeholder="Ex: Treino A - Peito, Ombro e Tríceps"
            value={workoutFocus}
            onChange={(e) => setWorkoutFocus(e.target.value)}
            className="w-full bg-background border border-surface-light rounded-xl p-3 font-black text-text-primary text-base focus:border-[#e57d3b] focus:outline-none transition-colors"
          />
        </div>

        {/* Quick Starts */}
        {addedExercises.length === 0 && (
          <section className="space-y-4 animate-fade-in bg-surface/30 p-5 rounded-2xl border border-surface-light">
            <button 
              onClick={() => setIsQuickTemplatesOpen(!isQuickTemplatesOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xs font-black uppercase tracking-widest text-[#e57d3b] flex items-center gap-2">
                <Zap size={16} /> Templates Rápidos (Treinos Prontos)
              </h2>
              {isQuickTemplatesOpen ? <ArrowUp size={16} className="text-text-secondary" /> : <ArrowDown size={16} className="text-text-secondary" />}
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
                      <h3 className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2">Corpo Inteiro (Full Body)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('fullbody_1')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Força & Hipertrofia</span>
                          <span className="text-[10px] text-text-secondary font-mono">7 exercícios</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('fullbody_2')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Cadeia Posterior & Core</span>
                          <span className="text-[10px] text-text-secondary font-mono">7 exercícios</span>
                        </button>
                      </div>
                    </div>
                    {/* Push */}
                    <div>
                      <h3 className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2">Empurrar (Push)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('push_1')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Peito, Ombro & Tríceps</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('push_2')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Ombro & Peito Inclinado</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                      </div>
                    </div>
                    {/* Pull */}
                    <div>
                      <h3 className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2">Puxar (Pull)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('pull_1')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Costas & Bíceps (Largura)</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('pull_2')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Costas & Bíceps (Espessura)</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                      </div>
                    </div>
                    {/* Legs */}
                    <div>
                      <h3 className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2">Pernas (Legs)</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('legs_1')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Quadríceps Dominante</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('legs_2')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Posterior & Glúteo</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                      </div>
                    </div>
                    {/* Upper & Lower */}
                    <div>
                      <h3 className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-2">Superiores / Inferiores</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => loadQuickRoutine('upper')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Membros Superiores</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
                        </button>
                        <button onClick={() => loadQuickRoutine('lower')} className="p-3.5 rounded-2xl bg-surface border border-surface-light text-left hover:border-[#e57d3b]/50 active:scale-95 transition-all group">
                          <span className="block text-text-primary font-bold text-sm mb-1 group-hover:text-[#e57d3b] transition-colors">Membros Inferiores</span>
                          <span className="text-[10px] text-text-secondary font-mono">6 exercícios</span>
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
            <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
              Lista Atual <span className="bg-text-primary/10 px-2 py-0.5 rounded-md text-text-primary">{addedExercises.length}</span>
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
                  className="bg-surface border border-surface-light rounded-[24px] p-5 shadow-lg relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shrink-0 border border-surface-light bg-background/50 relative">
                      <ExerciseMedia exerciseNameOrId={ex.id || ex.name} fallbackMuscle={ex.targetMuscles?.[0]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-text-primary text-[15px] leading-tight break-words mb-1">{idx + 1}. {ex.name}</h4>
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

                  <div className="grid grid-cols-2 gap-3 bg-background/50 rounded-2xl p-3 border border-surface-light">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold mb-1">Séries</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateExerciseParam(idx, 'sets', Math.max(1, (ex.sets || 3) - 1))}
                          className="w-8 h-8 rounded-full bg-surface text-lg flex items-center justify-center font-black active:scale-90 transition-transform"
                        >-</button>
                        <span className="font-black text-xl w-6 text-center text-text-primary">{ex.sets}</span>
                        <button 
                          onClick={() => updateExerciseParam(idx, 'sets', (ex.sets || 3) + 1)}
                          className="w-8 h-8 rounded-full bg-surface text-lg flex items-center justify-center font-black active:scale-90 transition-transform"
                        >+</button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold mb-1">Reps</span>
                      <input 
                        type="text" 
                        value={ex.reps}
                        onChange={(e) => updateExerciseParam(idx, 'reps', e.target.value)}
                        className="w-16 bg-surface rounded-xl text-center font-black text-xl text-text-primary outline-none py-1 border border-transparent focus:border-[#e57d3b]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {addedExercises.length === 0 && (
              <div className="border border-dashed border-surface-light bg-surface/30 py-12 rounded-2xl text-center text-text-secondary space-y-3">
                <Dumbbell size={32} className="mx-auto text-text-secondary/30" />
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input 
              type="text" 
              placeholder="Ex: supino, rosca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-light rounded-[20px] py-3 pl-12 pr-4 text-text-primary text-base font-bold outline-none focus:border-[#e57d3b] transition-colors"
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
                  <div key={ex.id} className="p-3 bg-surface border border-surface-light rounded-2xl flex justify-between items-center text-left">
                    <div className="w-[104px] h-[104px] rounded-xl overflow-hidden shrink-0 border border-surface-light bg-background/50 relative mr-4">
                      <ExerciseMedia exerciseNameOrId={ex.id} fallbackMuscle={ex.targetMuscles?.[0]} />
                    </div>
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-bold text-[15px] text-text-primary break-words leading-tight mb-1">{ex.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-text-secondary mt-0.5 truncate">
                        {ex.targetMuscles.join(', ')}
                      </p>
                    </div>

                    <button 
                      onClick={() => addExercise(ex)}
                      className="w-10 h-10 bg-text-primary/5 hover:bg-text-primary/10 text-text-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 shrink-0 transition-transform"
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
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background/95 backdrop-blur-2xl border-t border-surface-light z-40">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button 
            onClick={handleOpenSaveModal}
            disabled={addedExercises.length === 0}
            className="flex-1 py-3.5 bg-surface border border-surface-light text-text-primary rounded-[20px] font-bold uppercase tracking-widest text-xs sm:text-sm disabled:opacity-50 hover:bg-text-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            SALVAR NOS EXTRAS
          </button>
          <button 
            onClick={handleStartWorkout}
            disabled={addedExercises.length === 0}
            className="flex-[2] py-3.5 bg-gradient-to-r from-[#e57d3b] to-amber-500 disabled:from-surface disabled:to-surface disabled:text-text-secondary text-black rounded-[20px] font-black uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(229,125,59,0.3)] disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play size={18} fill="currentColor" /> INICIAR AGORA
          </button>
        </div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-surface-light p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl"
            >
              <h3 className="text-lg font-black text-text-primary">Salvar nos Treinos Extras</h3>
              <p className="text-xs text-text-secondary">
                Este treino ficará salvo no seu banco de Treinos Extras para você reutilizar quando quiser.
              </p>

              <div>
                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest block mb-1">
                  Nome do Treino
                </label>
                <input 
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="Ex: Treino de Peito Personalizado"
                  className="w-full bg-background border border-surface-light rounded-2xl p-3 font-bold text-text-primary text-sm focus:border-[#e57d3b] focus:outline-none"
                />
              </div>

              <div className="bg-background/60 p-3 rounded-2xl border border-surface-light flex items-center justify-between text-xs">
                <span className="text-text-secondary font-medium">Exercícios Incluídos</span>
                <span className="font-black text-[#e57d3b]">{addedExercises.length} exercícios</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 py-3 bg-text-primary/5 border border-surface-light text-text-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-text-primary/10 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmSaveAsExtra}
                  className="flex-1 py-3 bg-gradient-to-r from-[#e57d3b] to-amber-500 text-black rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:brightness-110 transition-all"
                >
                  Confirmar Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast / Banner */}
      <AnimatePresence>
        {saveSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto bg-surface border-2 border-[#e57d3b] p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center space-y-3"
          >
            <p className="text-sm font-black text-text-primary">{saveSuccessMessage}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/workouts')}
                className="flex-1 py-2 bg-text-primary/10 hover:bg-text-primary/20 text-text-primary text-xs font-bold rounded-xl transition-colors"
              >
                Ver em Meus Treinos
              </button>
              <button
                onClick={() => {
                  setSaveSuccessMessage(null);
                  handleStartWorkout();
                }}
                className="flex-1 py-2 bg-background text-black text-xs font-black rounded-xl hover:brightness-110 transition-colors"
              >
                Iniciar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

