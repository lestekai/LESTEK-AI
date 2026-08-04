import { useNavigate } from 'react-router-dom';
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import { EXERCISE_LIBRARY, searchExercises, ExerciseDefinition } from '@/lib/exerciseLibrary';
import { BottomNav } from '@/components/BottomNav';
import { Search, Dumbbell, Tag, Info, AlertTriangle, ArrowLeft, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBodyPartImageUrl } from '@/lib/utils';
import { ExerciseMedia } from '@/components/workout/ExerciseMedia';

import { getCommonErrorsForExercise } from '@/lib/errorGenerator';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDefinition | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);
  const loadingRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const allMuscles = Array.from(new Set(EXERCISE_LIBRARY.flatMap(ex => ex.targetMuscles)));
  const results = searchExercises(searchQuery, selectedMuscle ? [selectedMuscle] : undefined);
  const visibleResults = results.slice(0, visibleCount);

  // Reset pagination when search or filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(15);
  }, [searchQuery, selectedMuscle]);

  return (
    <div className="min-h-screen bg-background pb-32 text-text-primary">
      <header className="p-5 sticky top-0 bg-background/95 backdrop-blur-xl z-20 flex flex-col pt-12 pb-6 border-b border-surface-light">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-surface-light rounded-full text-text-secondary hover:text-text-primary transition-all active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-text-primary tracking-wide">Biblioteca</h1>
            <p className="text-[11px] font-black text-neon-blue uppercase tracking-widest mt-0.5">Mecânica do Corpo</p>
          </div>
        </div>
      </header>
      
      <main className="p-5 max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input 
            type="text"
            placeholder="Buscar por nome ou músculo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-light rounded-[24px] py-3 pl-12 pr-4 text-text-primary font-bold outline-none focus:border-neon-blue transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {visibleResults.map(ex => (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="bg-surface border border-surface-light p-4 rounded-[24px] text-left hover:border-white/20 transition-all group flex gap-4 items-center shadow-lg"
              >
                  <div className="w-20 sm:w-24 shrink-0 aspect-square bg-background rounded-xl overflow-hidden border border-surface-light relative z-10 flex items-center justify-center group-hover:border-neon-blue/50 transition-colors pointer-events-none">
                     <ExerciseMedia 
                       exerciseNameOrId={ex.id}
                       fallbackMuscle={ex.targetMuscles[0] || 'Corpo Todo'}
                       priority={false}
                       className="w-full h-full object-cover"
                     />
                  </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex flex-col items-start gap-1 mb-2 w-full">
                    <h3 className="font-black text-text-primary text-sm group-hover:text-neon-blue transition-colors leading-tight truncate w-full">{ex.name}</h3>
                    <span className={`shrink-0 text-[9px] uppercase font-black px-2 py-0.5 rounded-md ${
                      ex.difficulty === 'Iniciante' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      ex.difficulty === 'Intermediário' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {ex.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ex.targetMuscles.map((m, i) => i < 2 && (
                      <span key={m} className="text-[9px] font-bold bg-white/5 border border-surface-light text-text-secondary px-2 py-0.5 rounded-md">
                        {m}
                      </span>
                    ))}
                    {ex.targetMuscles.length > 2 && <span className="text-[9px] font-bold text-text-secondary">+{ex.targetMuscles.length - 2}</span>}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {results.length === 0 && (
            <div className="col-span-full py-16 px-4 bg-surface border border-surface-light border-dashed rounded-2xl text-center text-text-secondary font-bold uppercase tracking-widest text-[10px]">
              Nenhum exercício encontrado.
            </div>
          )}
        </div>
        
        {visibleCount < results.length && (
          <div className="mt-4 flex justify-center py-3">
            <button 
              onClick={() => setVisibleCount(prev => prev + 15)}
              className="px-8 py-3 bg-surface border border-surface-light hover:border-white/20 hover:text-text-primary rounded-full font-black transition-all text-[11px] uppercase tracking-widest shadow-lg"
            >
              Carregar Mais ({results.length - visibleCount})
            </button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedExercise && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto"
          >
             <div className="sticky top-0 bg-background/95 backdrop-blur-xl p-4 flex flex-col gap-4 border-b border-surface-light z-20">
               <div className="flex items-center justify-between">
                 <button onClick={() => setSelectedExercise(null)} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-surface-light rounded-full text-text-secondary hover:text-text-primary transition-all active:scale-95">
                   <ArrowLeft size={20} />
                 </button>
                 <span className="text-[10px] font-black uppercase tracking-widest text-neon-blue">Detalhes</span>
                 <div className="w-12 h-12"></div>
               </div>
               
               <div>
                  <h2 className="text-2xl font-black text-text-primary leading-tight mb-3">{selectedExercise.name}</h2>
                  <div className="flex gap-2">
                    <span className="bg-surface border border-surface-light text-[10px] font-black uppercase tracking-widest text-text-secondary px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Dumbbell size={12} className="text-neon-blue" />
                      {selectedExercise.equipment}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                      selectedExercise.difficulty === 'Iniciante' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      selectedExercise.difficulty === 'Intermediário' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                      'bg-red-500/10 border-red-500/20 text-red-500'
                    }`}>
                      {selectedExercise.difficulty}
                    </span>
                  </div>
                </div>
             </div>

             <div className="p-4 pb-24 space-y-4 max-w-3xl mx-auto w-full">
                <div className="bg-surface border border-surface-light rounded-2xl overflow-hidden aspect-video relative shadow-2xl p-2 group">
                  <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                    <ExerciseMedia 
                       exerciseNameOrId={selectedExercise.id}
                       fallbackMuscle={selectedExercise.targetMuscles[0] || 'Corpo Todo'}
                       priority={true}
                       className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedExercise.description && (
                    <div className="space-y-4 bg-surface p-4 rounded-2xl border border-surface-light">
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-neon-blue flex items-center gap-2">
                        <Activity size={16} /> Foco / Resumo
                      </h3>
                      <ul className="space-y-3">
                        {selectedExercise.description.split('.').map(s => s.trim()).filter(s => s.length > 5).map((desc, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary font-medium">
                            <span className="text-neon-blue text-lg leading-none mt-[-2px]">•</span> <span>{desc}.</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-4 bg-surface p-4 rounded-2xl border border-surface-light">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-neon-blue flex items-center gap-2">
                      <Tag size={16} /> Guias de Execução
                    </h3>
                    <ul className="space-y-3">
                      {selectedExercise.instructions.split('.').map(s => s.trim()).filter(s => s.length > 5).map((inst, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary font-medium">
                          <span className="text-neon-blue text-lg leading-none mt-[-2px]">•</span> <span>{inst}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-red-400 flex items-center gap-2">
                    <AlertTriangle size={16} /> Alertas de Erro
                  </h3>
                  <ul className="space-y-3">
                    {(selectedExercise.commonErrors?.length ? selectedExercise.commonErrors : getCommonErrorsForExercise(selectedExercise.name, selectedExercise.targetMuscles)).map((err, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-red-200/80 font-medium">
                        <span className="text-red-500 text-lg leading-none mt-[-2px]">•</span> <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
