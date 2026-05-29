'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXERCISE_LIBRARY, searchExercises, ExerciseLibraryItem } from '@/lib/exerciseLibrary';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Search, Dumbbell, Tag, Info, AlertTriangle, ArrowLeft, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBodyPartImageUrl } from '@/lib/utils';
import { ExerciseMedia } from '@/components/workout/ExerciseMedia';

import { getCommonErrorsForExercise } from '@/lib/errorGenerator';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseLibraryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const loadingRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const allMuscles = Array.from(new Set(EXERCISE_LIBRARY.flatMap(ex => ex.targetMuscles)));
  const results = searchExercises(searchQuery, selectedMuscle ? [selectedMuscle] : undefined);
  const visibleResults = results.slice(0, visibleCount);

  // Reset pagination when search or filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(10);
  }, [searchQuery, selectedMuscle]);

  // We no longer use IntersectionObserver for infinite scrolling, user requested to load 10 at a time manually
  // or simply keep the state simple.


  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-20 flex flex-col pt-12 pb-4 border-b border-surface-light">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-white p-2 shrink-0 bg-surface rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide">Biblioteca</h1>
            <p className="text-xs text-text-secondary mt-0.5">Conhecimento é poder na máquina.</p>
          </div>
        </div>
      </header>
      
      <main className="p-4 pt-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input 
            type="text"
            placeholder="Buscar por nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-light rounded-2xl py-4 pl-12 pr-4 text-white focus:border-neon-blue focus:outline-none placeholder:text-text-secondary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleResults.map(ex => (
            <button 
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="bg-surface border border-surface-light p-4 rounded-2xl text-left hover:border-white/20 transition-all group flex gap-4 items-center"
            >
                <div className="w-24 shrink-0 aspect-video bg-surface rounded-xl overflow-hidden border border-surface-light relative z-10 flex items-center justify-center group-hover:border-neon-blue transition-colors pointer-events-none">
                   <ExerciseMedia 
                     exerciseNameOrId={ex.id}
                     fallbackMuscle={ex.targetMuscles[0] || 'Corpo Todo'}
                     priority={false}
                     className="w-full h-full"
                   />
                </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col items-start gap-2 mb-3 mt-1 w-full">
                  <h3 className="font-bold text-white text-sm md:text-base group-hover:text-neon-blue transition-colors leading-tight whitespace-normal break-words w-full">{ex.name}</h3>
                  <span className={`shrink-0 text-[9px] md:text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    ex.difficulty === 'Iniciante' ? 'bg-emerald-500/20 text-emerald-500' :
                    ex.difficulty === 'Intermediário' ? 'bg-amber-500/20 text-amber-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ex.targetMuscles.map(m => (
                    <span key={m} className="text-[10px] bg-background border border-surface-light text-text-secondary px-2 py-1 rounded-md flex items-center gap-1">
                      <Dumbbell size={10} /> {m}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-secondary">
              Nenhum exercício encontrado.
            </div>
          )}
        </div>
        
        {visibleCount < results.length && (
          <div className="mt-8 flex justify-center py-6">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="px-6 py-3 bg-surface border border-surface-light text-text-secondary hover:text-white rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
            >
              Carregar Mais
            </button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedExercise && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col overflow-y-auto"
          >
             <div className="sticky top-0 bg-background/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-surface-light">
               <button onClick={() => setSelectedExercise(null)} className="p-2 bg-surface rounded-full text-white">
                 <ArrowLeft size={20} />
               </button>
               <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Detalhes</span>
               <div className="w-10"></div>
             </div>

             <div className="p-6 pb-24 space-y-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-2">{selectedExercise.name}</h2>
                  <div className="flex gap-2">
                    <span className="bg-surface border border-surface-light text-xs font-bold text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                      <Dumbbell size={14} className="text-neon-blue" />
                      {selectedExercise.equipment}
                    </span>
                    <span className={`border text-xs font-bold px-3 py-1.5 rounded-full ${
                      selectedExercise.difficulty === 'Iniciante' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                      selectedExercise.difficulty === 'Intermediário' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                      'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}>
                      {selectedExercise.difficulty}
                    </span>
                  </div>
                </div>

                <div className="bg-background border border-surface-light rounded-2xl overflow-hidden aspect-video relative p-0 shadow-inner group">
                  <ExerciseMedia 
                     exerciseNameOrId={selectedExercise.id}
                     fallbackMuscle={selectedExercise.targetMuscles[0] || 'Corpo Todo'}
                     priority={true}
                     className="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm pt-2 pb-2 border-t border-white/10 text-center pointer-events-none">
                      <p className="text-[10px] text-neon-blue uppercase tracking-widest flex justify-center items-center gap-1">
                        <Activity size={12} /> Demonstração Visual
                      </p>
                  </div>
                </div>

                {selectedExercise.description && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Activity className="text-neon-blue" size={14} /> Resumo
                    </h3>
                    <ul className="space-y-2 text-xs text-text-secondary bg-surface border border-surface-light p-3 rounded-xl">
                      {selectedExercise.description.split('.').map(s => s.trim()).filter(s => s.length > 5).map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neon-blue mt-0.5">•</span> <span>{desc}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Tag className="text-neon-purple" size={14} /> Execução
                  </h3>
                  <ul className="space-y-2 text-xs text-text-secondary bg-surface border border-surface-light p-3 rounded-xl">
                    {selectedExercise.instructions.split('.').map(s => s.trim()).filter(s => s.length > 5).map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neon-purple mt-0.5">•</span> <span>{inst}.</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle className="text-amber-500" size={14} /> Erros Comuns
                  </h3>
                  <ul className="space-y-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    {(selectedExercise.commonErrors?.length ? selectedExercise.commonErrors : getCommonErrorsForExercise(selectedExercise.name, selectedExercise.targetMuscles)).map((err, i) => (
                      <li key={i} className="text-xs text-amber-200 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span> <span>{err}</span>
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
