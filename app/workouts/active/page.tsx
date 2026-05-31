'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWorkoutStore, ExerciseDefinition } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { EXERCISE_LIBRARY, searchExercises, findExerciseInLibrary } from '@/lib/exerciseLibrary';
import { getCommonErrorsForExercise } from '@/lib/errorGenerator';
import { ExerciseMedia } from '@/components/workout/ExerciseMedia';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, CheckCircle, ArrowLeft, Clock, Dumbbell, AlertTriangle, FastForward, Plus, X, Search, Settings } from 'lucide-react';
import confetti from 'canvas-confetti';

const generateId = () => typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

export default function ActiveWorkoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dayIndex = parseInt(searchParams?.get('dayIndex') || '0', 10);
  
  const { currentPlan, completeWorkout, updateDayPlan, settings, updateSettings } = useWorkoutStore();
  const { profile, addXp } = useAppStore();
  
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [setLogs, setSetLogs] = useState<Record<string, { reps: string, weight: string }>>({});
  
  // Timers
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [prepTimer, setPrepTimer] = useState(settings?.preparationTimeSeconds || 15);
  const [isPreparing, setIsPreparing] = useState(false);
  const [execTimer, setExecTimer] = useState(settings?.estimatedSetTimeSeconds || 45);
  const [isExecutingAuto, setIsExecutingAuto] = useState(false);

  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [workoutSeconds, setWorkoutSeconds] = useState(0);

  // Modal Settings
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // For adding exercises mid-workout
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [addSearchQuery, setAddSearchQuery] = useState('');
  
  const [showDemo, setShowDemo] = useState(false);

  const [floatingXps, setFloatingXps] = useState<{id: number, xp: number, x: number, y: number}[]>([]);
  const xpIdCounter = useRef(0);

  const addResults = searchExercises(addSearchQuery).slice(0, 50);

  const playSound = (type: 'prep' | 'exec' | 'rest') => {
    if (!settings?.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'prep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      } else if (type === 'exec') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      }

      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.log('Audio disabled by browser', e);
    }
  };

  const triggerVibration = (type: 'prep' | 'exec' | 'rest') => {
    if (!settings?.vibrationEnabled || !navigator.vibrate) return;
    if (type === 'prep') navigator.vibrate([100]);
    if (type === 'exec') navigator.vibrate([200, 100, 200]);
    if (type === 'rest') navigator.vibrate([300]);
  };

  // Phase Handlers
  function startPrep() {
    if (settings?.preparationEnabled) {
      setPrepTimer(settings.preparationTimeSeconds);
      setIsPreparing(true);
      playSound('prep');
      triggerVibration('prep');
    } else {
      startExec();
    }
  }

  function startExec() {
    setIsPreparing(false);
    if (settings?.autoAdvanceEnabled) {
      setExecTimer(settings.estimatedSetTimeSeconds);
      setIsExecutingAuto(true);
      playSound('exec');
      triggerVibration('exec');
    }
  }

  const handlePhaseChange = () => {
    // This effect handles the countdowns based on active state flags
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowDemo(false);
  }, [activeExerciseIndex]);

  // Snapshot of exercises for this session. We update the store immediately when adding.
  const todayPlan = currentPlan?.schedule?.[dayIndex] || currentPlan?.schedule?.[0];
  const exercises = todayPlan?.exercises || [];
  const currentExercise = exercises[activeExerciseIndex];

  // Identifica o exercício atual na biblioteca para pegar GIF e erros comuns
  const getLibraryMatch = () => {
    if (!currentExercise) return null;
    const target = currentExercise.targetMuscles?.[0] || currentExercise.target || '';
    return findExerciseInLibrary(currentExercise.libraryId, target) || findExerciseInLibrary(currentExercise.name, target) || findExerciseInLibrary(currentExercise.id, target) || null;
  };

  const libraryExercise = getLibraryMatch();

  // Overview / Edit Mode
  const [showOverview, setShowOverview] = useState(false);

  const handleEditExercise = (index: number, field: string, value: any) => {
    if (!todayPlan) return;
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    updateDayPlan(dayIndex, { ...todayPlan, exercises: updatedExercises } as any);
  };

  // Global Workout Timer
  useEffect(() => {
    if (workoutFinished) return;
    const interval = setInterval(() => setWorkoutSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [workoutFinished]);

  useEffect(() => {
    if (!currentPlan || !todayPlan || exercises.length === 0 || !currentExercise) {
      navigate('/workouts');
    }
  }, [currentPlan, todayPlan, exercises.length, currentExercise, navigate]);

  // Phase Timers logic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // RESTING
    if (isResting && restTimer > 0) {
      interval = setInterval(() => setRestTimer(t => t - 1), 1000);
    } else if (isResting && restTimer === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsResting(false);
      startPrep(); // Move to prep for next set
    } 
    // PREPARING
    else if (isPreparing && prepTimer > 0) {
      interval = setInterval(() => setPrepTimer(t => t - 1), 1000);
    } else if (isPreparing && prepTimer === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPreparing(false);
      startExec(); // Move to execution
    }
    // EXECUTING (Auto)
    else if (isExecutingAuto && execTimer > 0) {
      interval = setInterval(() => setExecTimer(t => t - 1), 1000);
    } else if (isExecutingAuto && execTimer === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsExecutingAuto(false);
      const nextSetId = completedSets.length + 1;
      handleCompleteSet(nextSetId);
    }

    return () => clearInterval(interval);
  }, [isResting, restTimer, isPreparing, prepTimer, isExecutingAuto, execTimer]);

  if (!currentPlan || !todayPlan || exercises.length === 0 || !currentExercise) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6 text-center pb-24">
         <Dumbbell size={48} className="text-surface-light mb-4" />
         <h1 className="text-xl font-bold text-white mb-2">Treino não encontrado</h1>
         <p className="text-text-secondary text-sm mb-6">Não foi possível carregar os exercícios de hoje.</p>
         <button onClick={() => navigate('/workouts')} className="px-6 py-3 bg-neon-blue text-background font-bold rounded-xl active:scale-95 transition-all">
            Voltar aos Treinos
         </button>
      </div>
    );
  }

  if (!exercises.length || workoutFinished) {
    return (
      <div className="min-h-screen bg-background border-t-4 border-emerald-500 p-6 flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
           <CheckCircle size={48} className="text-emerald-500" />
        </motion.div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Treino Concluído!</h1>
        <p className="text-text-secondary mb-8">Máquina de execução imparável. O Titã agradece.</p>
        
        <div className="bg-surface p-4 rounded-xl mb-8 w-full max-w-sm flex justify-around">
          <div>
            <span className="block text-[10px] text-text-secondary uppercase">Duração</span>
            <span className="font-bold text-white text-xl">{Math.floor(workoutSeconds / 60)}m {workoutSeconds % 60}s</span>
          </div>
          <div>
            <span className="block text-[10px] text-text-secondary uppercase">Exercícios</span>
            <span className="font-bold text-white text-xl">{exercises.length}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/workouts')}
          className="w-full max-w-sm bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-gray-200"
        >
          Retornar ao Hub
        </button>
      </div>
    );
  }

  const spawnXp = (xpAmount: number) => {
    const id = xpIdCounter.current++;
    // Spawn somewhat centered, slight random offset
    const x = window.innerWidth / 2 + (Math.random() * 40 - 20);
    const y = window.innerHeight / 2 + (Math.random() * 40 - 20);
    
    setFloatingXps(prev => [...prev, { id, x, y, xp: xpAmount }]);
    setTimeout(() => {
      setFloatingXps(prev => prev.filter(fx => fx.id !== id));
    }, 1500);
  };

  const handleLogChange = ({ exerciseIndex, setNumber, field, value }: { exerciseIndex: number, setNumber: number, field: 'reps' | 'weight', value: string }) => {
    const key = `${exerciseIndex}-${setNumber}`;
    setSetLogs(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || { reps: '', weight: '' }),
        [field]: value
      }
    }));
  };

  function handleCompleteSet(setNumber: number) {
    if (!completedSets.includes(setNumber)) {
      setCompletedSets([...completedSets, setNumber]);
      setIsExecutingAuto(false); // Stop execution phase if active
      
      // Dopamine hit: popup XP text
      spawnXp(10);
      
      if (setNumber < currentExercise.sets) {
        if (settings?.restTimeEnabled) {
          setRestTimer(currentExercise.restSeconds || 60);
          setIsResting(true);
          playSound('rest');
          triggerVibration('rest');
        } else {
          startPrep(); // Go straight to next set prep
        }
      } else {
        // Exercicio completo
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00f0ff', '#ffffff']
        });
        spawnXp(50);
        
        if (activeExerciseIndex < exercises.length - 1) {
           setTimeout(() => {
             setActiveExerciseIndex(i => i + 1);
             setCompletedSets([]);
             
             // After advancing exercise, do we rest or prep? Usually rest first
             if (settings?.restTimeEnabled) {
               setRestTimer((currentExercise.restSeconds || 60) + 30); // slightly longer between exercises
               setIsResting(true);
               playSound('rest');
               triggerVibration('rest');
             } else {
               startPrep();
             }
           }, 800);
        } else {
           setTimeout(() => finishWorkout(), 800);
        }
      }
    }
  };

  const finishWorkout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#8e2de2', '#10b981']
    });
    setWorkoutFinished(true);
    
    // Calculate total volume
    let tVol = 0;
    Object.values(setLogs).forEach(log => {
      const reps = parseInt(log.reps) || 0;
      const weight = parseFloat(log.weight) || 0;
      tVol += reps * weight;
    });

    completeWorkout({
      id: generateId(),
      date: new Date().toISOString(),
      dayFocus: todayPlan.focus,
      durationMinutes: Math.floor(workoutSeconds / 60) || 1,
      exercisesCompleted: exercises.length,
      totalVolume: tVol, 
      perceivedEffort: 8
    });
    addXp(200 + Math.floor(workoutSeconds / 60) * 10);
  };

  const formatedWorkoutTimer = () => {
    const m = Math.floor(workoutSeconds / 60);
    const s = workoutSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddExercise = (exItem: any) => {
    const newEx: ExerciseDefinition = {
      id: exItem.id,
      name: exItem.name,
      sets: 3,
      reps: '10-12',
      restSeconds: 60,
      instructions: exItem.instructions,
      targetMuscles: exItem.targetMuscles,
    };
    
    // Add to the current schedule day
    updateDayPlan(dayIndex, {
      ...todayPlan,
      exercises: [...todayPlan.exercises, newEx]
    });
    
    setShowAddMenu(false);
    setAddSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* FLOATING XP */}
      <AnimatePresence>
        {floatingXps.map(fx => (
          <motion.div
            key={fx.id}
            initial={{ opacity: 1, y: fx.y, x: fx.x, scale: 0.5 }}
            animate={{ opacity: 0, y: fx.y - 100, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed z-50 font-bold font-display pointer-events-none drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] text-amber-400"
            style={{ textShadow: '0 0 10px rgba(245,158,11,0.8)' }}
          >
            +{fx.xp} XP
          </motion.div>
        ))}
      </AnimatePresence>

       {/* HEADER */}
       <div className="bg-background/80 backdrop-blur-md border-b border-surface-light px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
          <button onClick={() => navigate('/workouts')} className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-surface-light text-text-secondary hover:text-white hover:border-white/20 transition-all">
            <ArrowLeft size={18} />
          </button>
          <div className="text-center flex flex-col items-center">
             <h3 className="text-xs font-bold text-neon-blue uppercase tracking-widest leading-none mb-1 shadow-sm">{todayPlan.dayName}</h3>
             <div className="flex gap-2 items-center">
               <span className="text-[10px] text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-2 py-0.5 rounded-md font-mono flex items-center gap-1 shadow-sm"><Clock size={10} /> {formatedWorkoutTimer()}</span>
               <span className="text-[10px] font-bold text-text-secondary bg-surface px-2 py-0.5 rounded-md border border-surface-light cursor-pointer hover:bg-surface-light hover:text-white transition-colors" onClick={() => setShowOverview(true)}>
                 {activeExerciseIndex + 1} / {exercises.length} <Search size={10} className="inline ml-1"/>
               </span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSettingsModal(true)} className="p-2 text-text-secondary hover:text-white bg-surface border border-surface-light rounded-lg transition-all focus:outline-none">
              <Settings size={18} />
            </button>
            <button onClick={finishWorkout} className="text-[10px] text-amber-500 font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 px-3 py-2 rounded-lg hover:bg-amber-500 hover:text-background transition-colors">
              Encerrar
            </button>
          </div>
       </div>

       {/* MAIN WORKOUT VIEW */}
       <div className="flex-1 overflow-y-auto p-4 pb-48">
          
          <AnimatePresence mode="wait">
             {currentExercise && (
              <motion.div
                key={`${currentExercise.id}-${activeExerciseIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                 {/* Exercise Info */}
                 <div className="text-center mt-2 mb-4">
                   <h1 className="text-2xl font-bold font-display text-white mb-2 leading-tight px-4">{currentExercise.name}</h1>
                   <p className="text-sm text-text-secondary">Alvo: <span className="text-white font-bold">{currentExercise.targetMuscles?.join(', ') || 'Variado'}</span></p>
                 </div>

                 <div className="bg-surface-light border border-neon-blue/20 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(0,240,255,0.05)] text-center">
                    <div className="flex items-center justify-center gap-6">
                       <div>
                         <span className="block text-[10px] font-bold text-text-secondary uppercase mb-1">Reps alvo</span>
                         <span className="text-xl font-bold text-white">{currentExercise.reps}</span>
                       </div>
                       <div className="w-px h-8 bg-surface border-x" />
                       <div>
                         <span className="block text-[10px] font-bold text-text-secondary uppercase mb-1">Descanso</span>
                         <span className="text-xl font-bold text-neon-blue">{formatTime(currentExercise.restSeconds || 60)}</span>
                       </div>
                    </div>
                 </div>

                 {/* Botão de Como Realizar */}
                 <button
                   onClick={() => setShowDemo(!showDemo)}
                   className="w-full py-3 bg-surface border border-surface-light hover:border-white/20 transition-all rounded-xl text-sm font-bold text-text-secondary flex items-center justify-center gap-2"
                 >
                   <Play size={16} className={showDemo ? "text-neon-blue" : ""} /> {showDemo ? "Ocultar Instruções" : "Como Realizar?"}
                 </button>

                 <AnimatePresence>
                   {showDemo && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="space-y-4 overflow-hidden"
                     >
                       {/* Video Demonstrativo / Visual Placeholder */}
                       <div className="bg-background border border-surface-light rounded-2xl overflow-hidden aspect-video relative p-0 shadow-inner group">
                         <ExerciseMedia 
                           exerciseNameOrId={currentExercise.libraryId || currentExercise.name || currentExercise.id}
                           fallbackMuscle={libraryExercise?.targetMuscles?.[0] || currentExercise.targetMuscles?.[0] || currentExercise.target || 'Corpo Todo'}
                           priority={true}
                         />
                         <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-[10px] font-bold text-neon-blue uppercase backdrop-blur-sm shadow border border-neon-blue/20">
                           Demonstração
                         </div>
                       </div>

                       {/* Instructions & Erros Comuns */}
                       {(libraryExercise?.instructions || currentExercise.instructions) && (
                         <div className="bg-surface/50 border-l-2 border-neon-purple p-3 rounded-r text-xs text-text-secondary">
                           <span className="font-bold text-neon-purple uppercase tracking-widest block mb-1">Instruções de Execução</span>
                           <ul className="space-y-1">
                             {(libraryExercise?.instructions || currentExercise.instructions)?.split('.').map((s: string) => s.trim()).filter((s: string) => s.length > 5).map((inst: string, i: number) => (
                               <li key={i} className="flex items-start gap-1">
                                 <span className="text-neon-purple mt-0.5">•</span> <span>{inst}.</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}

                       <div className="bg-surface/50 border-l-2 border-amber-500 p-3 rounded-r text-text-secondary text-xs">
                         <span className="font-bold text-amber-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><AlertTriangle size={12} /> Erros Comuns</span>
                         <ul className="space-y-1">
                           {((libraryExercise?.commonErrors && libraryExercise.commonErrors.length > 0) ? libraryExercise.commonErrors : getCommonErrorsForExercise(currentExercise.name, currentExercise.targetMuscles || [])).map((error, i) => (
                             <li key={i} className="flex items-start gap-1">
                              <span className="text-amber-500 mt-0.5">•</span> <span>{error}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* Sets List */}
                 <div className="space-y-4 mt-8">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Execução de Séries</h4>
                      <span className="text-[10px] bg-neon-purple/10 border border-neon-purple/30 text-neon-purple px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(176,38,255,0.2)]">{completedSets.length} / {currentExercise.sets} Protocolos</span>
                    </div>
                    {Array.from({ length: currentExercise.sets }).map((_, i) => {
                      const isCompleted = completedSets.includes(i + 1);
                      const isCurrent = !isCompleted && (completedSets.length === i); // The one you should be doing next
                      const logKey = `${activeExerciseIndex}-${i + 1}`;
                      const log = setLogs[logKey] || { reps: '', weight: '' };
                      
                      return (
                        <div key={i} className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/30' : isCurrent ? 'bg-surface/80 border-neon-blue/50 shadow-[0_0_15px_rgba(0,240,255,0.1)] transform scale-[1.02] z-10' : 'bg-surface/50 border-surface-light opacity-60'}`}>
                           <div className="flex items-center justify-between mb-4">
                             <span className={`text-sm font-bold font-mono ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-neon-blue' : 'text-text-secondary'}`}>SÉRIE // {String(i + 1).padStart(2, '0')}</span>
                             {isCompleted ? (
                               <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                                  <CheckCircle size={12} /> Sincronizado
                               </div>
                             ) : isCurrent ? (
                               <div className="text-[10px] text-neon-blue font-bold uppercase flex items-center gap-1 animate-pulse">
                                  Próxima Execução
                               </div>
                             ) : null}
                           </div>
                           
                           <div className="flex items-center gap-3">
                             <div className="flex-1 flex flex-col relative group">
                               <label className="text-[9px] text-text-secondary uppercase mb-1.5 font-bold tracking-widest">Reps Feitas</label>
                               <input 
                                 type="number" 
                                 disabled={isCompleted}
                                 value={log.reps}
                                 onChange={(e) => handleLogChange({ exerciseIndex: activeExerciseIndex, setNumber: i + 1, field: 'reps', value: e.target.value })}
                                 placeholder={currentExercise.reps?.split('-')[0] || ''}
                                 className="bg-background/80 backdrop-blur-sm border border-surface-light rounded-xl px-4 py-3 text-white text-base font-display font-bold outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all disabled:opacity-50 w-full text-center"
                               />
                             </div>
                             <div className="flex-1 flex flex-col relative group">
                               <label className="text-[9px] text-text-secondary uppercase mb-1.5 font-bold tracking-widest">Carga (kg)</label>
                               <input 
                                 type="number" 
                                 disabled={isCompleted}
                                 value={log.weight}
                                 onChange={(e) => handleLogChange({ exerciseIndex: activeExerciseIndex, setNumber: i + 1, field: 'weight', value: e.target.value })}
                                 placeholder="--"
                                 className="bg-background/80 backdrop-blur-sm border border-surface-light rounded-xl px-4 py-3 text-white text-base font-display font-bold outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(176,38,255,0.2)] transition-all disabled:opacity-50 w-full text-center"
                               />
                             </div>
                             <button 
                               onClick={() => handleCompleteSet(i + 1)}
                               disabled={isCompleted}
                               className={`mt-[22px] self-end p-2 h-[46px] w-[46px] shrink-0 flex items-center justify-center rounded-xl font-bold uppercase tracking-widest transition-all ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 opacity-50 cursor-not-allowed' : isCurrent ? 'bg-neon-blue text-background shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-white' : 'bg-surface-light text-text-secondary hover:text-white border border-surface-light hover:border-white/20'}`}
                             >
                               {isCompleted ? <CheckCircle size={20} /> : <CheckCircle size={24} />}
                             </button>
                           </div>
                        </div>
                      );
                    })}
                 </div>

              </motion.div>
             )}
          </AnimatePresence>

          <div className="mt-12 flex justify-center pb-8 border-t border-surface-light pt-8">
             <button 
               onClick={() => setShowAddMenu(true)} 
               className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-white uppercase tracking-widest bg-surface px-4 py-3 rounded-xl border border-surface-light hover:border-white/20 transition-all"
             >
               <Plus size={16} />
               Adicionar Exercício
             </button>
          </div>

       </div>

       {/* OVERLAYS (Slide up from bottom) */}
       <AnimatePresence>
         {isResting && (
            <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               className="fixed bottom-0 left-0 right-0 max-h-[50vh] bg-surface border-t border-neon-blue shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-50 rounded-t-3xl p-6 px-4 md:px-8 flex flex-col items-center justify-center text-center"
            >
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Clock /> Descanso Ativo</h3>
               <div className="text-7xl font-mono font-bold text-neon-blue box-glow-blue mb-8 tracking-tighter">
                 {formatTime(restTimer)}
               </div>
               
               <div className="flex gap-4 w-full max-w-sm">
                 <button onClick={() => setRestTimer(t => t + 15)} className="flex-1 bg-surface-light border border-surface-light py-4 rounded-xl text-sm font-bold uppercase hover:bg-white/5 transition-colors">+15s</button>
                 <button onClick={() => { setIsResting(false); startPrep(); }} className="flex-1 bg-white text-black py-4 rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"><FastForward size={16} /> Pular</button>
               </div>
               <div className="mt-8 text-xs text-text-secondary px-8">
                 Pressione <span className="font-bold text-white">Pular</span> caso já esteja pronto para a próxima série.
               </div>
            </motion.div>
         )}
         
         {isPreparing && (
            <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               className="fixed bottom-0 left-0 right-0 max-h-[50vh] bg-surface border-t border-amber-500 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-50 rounded-t-3xl p-6 px-4 md:px-8 flex flex-col items-center justify-center text-center"
            >
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><AlertTriangle className="text-amber-500" /> Prepare-se</h3>
               <div className="text-7xl font-mono font-bold text-amber-500 mb-8 tracking-tighter" style={{ textShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}>
                 {formatTime(prepTimer)}
               </div>
               <div className="flex gap-4 w-full max-w-sm">
                 <button onClick={() => { setIsPreparing(false); startExec(); }} className="flex-1 bg-amber-500 text-black py-4 rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-1 hover:bg-amber-400 transition-colors"><Play size={16} /> Iniciar Agora</button>
               </div>
            </motion.div>
         )}

         {isExecutingAuto && (
            <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               className="fixed bottom-0 left-0 right-0 max-h-[50vh] bg-surface border-t border-emerald-500 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-50 rounded-t-3xl p-6 px-4 md:px-8 flex flex-col items-center justify-center text-center"
            >
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Dumbbell className="text-emerald-500" /> Em Execução</h3>
               <div className="text-7xl font-mono font-bold text-emerald-500 mb-8 tracking-tighter" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                 {formatTime(execTimer)}
               </div>
               <div className="flex gap-4 w-full max-w-sm">
                 <button onClick={() => { setIsExecutingAuto(false); handleCompleteSet(completedSets.length + 1); }} className="flex-1 bg-emerald-500 text-black py-4 rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-1 hover:bg-emerald-400 transition-colors"><CheckCircle size={16} /> Concluir Série</button>
               </div>
            </motion.div>
         )}
       </AnimatePresence>

       {/* SETTINGS MODAL */}
       <AnimatePresence>
         {showSettingsModal && (
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
           >
             <div className="bg-surface border border-surface-light rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
               <button onClick={() => setShowSettingsModal(false)} className="absolute top-4 right-4 text-text-secondary hover:text-white">
                 <X size={20} />
               </button>
               <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Cofigurações de Execução</h2>
               
               <div className="space-y-5">
                 {/* Auto Advance Toggle */}
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-white font-bold text-sm">Avanço Automático</p>
                     <p className="text-[10px] text-text-secondary">Fluidez Preparation → Execução → Descanso</p>
                   </div>
                   <button onClick={() => updateSettings({ autoAdvanceEnabled: !settings?.autoAdvanceEnabled })} className={`w-12 h-6 rounded-full transition-colors relative ${settings?.autoAdvanceEnabled ? 'bg-neon-blue' : 'bg-surface-light'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.autoAdvanceEnabled ? 'left-7' : 'left-1'}`} />
                   </button>
                 </div>

                 {/* Preparation Toggle */}
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-white font-bold text-sm">Tempo de Preparação</p>
                   </div>
                   <button onClick={() => updateSettings({ preparationEnabled: !settings?.preparationEnabled })} className={`w-12 h-6 rounded-full transition-colors relative ${settings?.preparationEnabled ? 'bg-neon-blue' : 'bg-surface-light'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.preparationEnabled ? 'left-7' : 'left-1'}`} />
                   </button>
                 </div>
                 {settings?.preparationEnabled && (
                   <input type="number" value={settings?.preparationTimeSeconds || 15} onChange={(e) => updateSettings({ preparationTimeSeconds: parseInt(e.target.value)||0 })} className="w-full bg-background rounded-xl p-3 text-white border border-surface-light text-sm" placeholder="Segundos" />
                 )}

                 {/* Execution Timer (Only visible if auto advance) */}
                 {settings?.autoAdvanceEnabled && (
                   <div>
                     <p className="text-white font-bold text-sm mb-2">Tempo Estimado de Execução (s)</p>
                     <input type="number" value={settings?.estimatedSetTimeSeconds || 45} onChange={(e) => updateSettings({ estimatedSetTimeSeconds: parseInt(e.target.value)||0 })} className="w-full bg-background rounded-xl p-3 text-white border border-surface-light text-sm" placeholder="Segundos" />
                   </div>
                 )}

                 {/* Sounds & Vibrations */}
                 <div className="pt-4 border-t border-surface-light flex items-center justify-between">
                   <p className="text-white font-bold text-sm">Sons e Alertas</p>
                   <button onClick={() => updateSettings({ soundEnabled: !settings?.soundEnabled })} className={`w-12 h-6 rounded-full transition-colors relative ${settings?.soundEnabled ? 'bg-neon-purple' : 'bg-surface-light'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.soundEnabled ? 'left-7' : 'left-1'}`} />
                   </button>
                 </div>
                 <div className="flex items-center justify-between">
                   <p className="text-white font-bold text-sm">Vibração Haptic</p>
                   <button onClick={() => updateSettings({ vibrationEnabled: !settings?.vibrationEnabled })} className={`w-12 h-6 rounded-full transition-colors relative ${settings?.vibrationEnabled ? 'bg-neon-purple' : 'bg-surface-light'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.vibrationEnabled ? 'left-7' : 'left-1'}`} />
                   </button>
                 </div>
               </div>
               
               <button onClick={() => setShowSettingsModal(false)} className="w-full mt-8 bg-white text-black py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200">
                 Salvar Ajustes
               </button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* OVERVIEW / EDIT MODAL */}
       <AnimatePresence>
         {showOverview && (
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 50 }}
             className="fixed inset-0 bg-background z-50 flex flex-col"
           >
             <div className="p-4 border-b border-surface-light flex items-center justify-between bg-surface sticky top-0 z-20">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Search size={20} className="text-neon-blue" />
                 Visão Geral do Treino
               </h2>
               <button onClick={() => setShowOverview(false)} className="p-2 text-text-secondary hover:text-white bg-surface-light rounded-full">
                 <X size={20} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {exercises.map((ex, idx) => (
                 <div key={`${ex.id}-${idx}`} className={`p-4 rounded-xl border ${idx === activeExerciseIndex ? 'bg-neon-blue/5 border-neon-blue' : idx < activeExerciseIndex ? 'bg-emerald-500/5 border-emerald-500/30 opacity-70' : 'bg-surface border-surface-light'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-white">{ex.name}</h4>
                      {idx === activeExerciseIndex && <span className="text-[10px] text-neon-blue font-bold uppercase border border-neon-blue/30 px-2 py-0.5 rounded">Atual</span>}
                      {idx < activeExerciseIndex && <span className="text-[10px] text-emerald-500 font-bold uppercase"><CheckCircle size={14} /></span>}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-background rounded-lg p-2 border border-white/5">
                        <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">Séries</label>
                        <input type="number" disabled={idx < activeExerciseIndex} value={ex.sets} onChange={(e) => handleEditExercise(idx, 'sets', parseInt(e.target.value) || 1)} className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50" />
                      </div>
                      <div className="bg-background rounded-lg p-2 border border-white/5">
                        <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">Reps</label>
                        <input type="text" disabled={idx < activeExerciseIndex} value={ex.reps} onChange={(e) => handleEditExercise(idx, 'reps', e.target.value)} className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50" />
                      </div>
                      <div className="bg-background rounded-lg p-2 border border-white/5">
                        <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">Descanso (s)</label>
                        <input type="number" disabled={idx < activeExerciseIndex} value={ex.restSeconds} onChange={(e) => handleEditExercise(idx, 'restSeconds', parseInt(e.target.value) || 0)} className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50" />
                      </div>
                    </div>
                 </div>
               ))}
               
               <button onClick={() => setShowAddMenu(true)} className="w-full bg-surface border border-surface-light py-4 rounded-xl text-xs font-bold uppercase text-text-secondary hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                 <Plus size={16} /> Adicionar Novo Exercício
               </button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* ADD EXERCISE MODAL (Full screen) */}
       <AnimatePresence>
         {showAddMenu && (
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 50 }}
             className="fixed inset-0 bg-background z-50 flex flex-col"
           >
             <div className="p-4 border-b border-surface-light flex items-center justify-between bg-surface sticky top-0">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Plus size={20} className="text-neon-blue" />
                 Adicionar ao Treino
               </h2>
               <button onClick={() => setShowAddMenu(false)} className="p-2 text-text-secondary hover:text-white bg-surface-light rounded-full">
                 <X size={20} />
               </button>
             </div>
             
             <div className="p-4 bg-surface-light sticky top-[69px] z-10 border-b border-surface-light">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar exercício..." 
                    value={addSearchQuery}
                    onChange={(e) => setAddSearchQuery(e.target.value)}
                    className="w-full bg-background border border-surface-light rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-neon-blue transition-colors placeholder:text-text-secondary"
                  />
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4">
               {addResults.length > 0 ? (
                 <div className="grid grid-cols-1 gap-3">
                   {addResults.map(ex => (
                     <button
                       key={ex.id}
                       onClick={() => handleAddExercise(ex)}
                       className="bg-surface border border-surface-light p-3 rounded-xl flex items-center gap-4 text-left hover:border-neon-blue/50 transition-colors group"
                     >
                       <div className="w-12 h-12 rounded bg-background flex items-center justify-center shrink-0 border border-surface-light">
                           <Dumbbell size={16} className="text-text-secondary" />
                         </div>
                       <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-sm text-white truncate group-hover:text-neon-blue transition-colors">{ex.name}</h4>
                         <p className="text-[10px] text-text-secondary uppercase">{ex.targetMuscles.join(', ')}</p>
                       </div>
                       <Dumbbell size={16} className="text-text-secondary group-hover:text-white shrink-0" />
                     </button>
                   ))}
                 </div>
               ) : (
                 <div className="py-12 text-center">
                   <p className="text-text-secondary">Nenhum exercício encontrado</p>
                 </div>
               )}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

