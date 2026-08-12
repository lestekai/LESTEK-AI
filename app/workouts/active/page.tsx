'use client';

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWorkoutStore, ExerciseDefinition } from "@/lib/workoutStore";
import {
  getProgressionStats,
  getPersonalRecords,
  calculate1RM,
} from "@/lib/loadProgression";
import { adjustExerciseForWeek } from "@/lib/progressionSystem";
import { useAppStore } from "@/lib/store";
import {
  EXERCISE_LIBRARY,
  searchExercises,
  findExerciseInLibrary,
} from "@/lib/exerciseLibrary";
import { getCommonErrorsForExercise } from "@/lib/errorGenerator";
import { ExerciseMedia } from "@/components/workout/ExerciseMedia";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  CheckCircle,
  ArrowLeft,
  Clock,
  Dumbbell,
  AlertTriangle,
  FastForward,
  Plus,
  X,
  Search,
  Settings,
  Zap,
  Activity,
} from "lucide-react";
import confetti from "canvas-confetti";

import { useAdvancedTechniqueEngine } from "@/hooks/useAdvancedTechniqueEngine";
import { TechniqueController } from "@/components/workout/techniques/TechniqueController";

const generateId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15);

function ActiveWorkoutContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dayIndex = parseInt(searchParams.get("dayIndex") || "0", 10);
  const isFree = searchParams.get("free") === "true";

  const {
    currentPlan,
    completeWorkout,
    updateDayPlan,
    settings,
    updateSettings,
    activeFreeWorkout,
    updateFreeWorkout,
    workoutHistory: rawWorkoutHistory,
    setWorkoutHistory,
    selectedProgressionWeek,
    questionnaire,
    setSelectedProgressionWeek,
    activeWorkoutSession,
    setActiveWorkoutSession,
    updateActiveWorkoutSession
  } = useWorkoutStore();
  const workoutHistory = Array.isArray(rawWorkoutHistory) ? rawWorkoutHistory : [];
  const { profile, addXp } = useAppStore();

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(activeWorkoutSession?.activeExerciseIndex || 0);
  const [completedSetsMap, setCompletedSetsMap] = useState<Record<number, number[]>>(activeWorkoutSession?.completedSetsMap || {});
  const [completedSets, setCompletedSets] = useState<number[]>(
    activeWorkoutSession?.completedSetsMap?.[activeWorkoutSession?.activeExerciseIndex || 0] || []
  );
  const [setLogs, setSetLogs] = useState<Record<string, { reps: string; weight: string }>>(activeWorkoutSession?.setLogs || {});
  
  const [seedingFeedback, setSeedingFeedback] = useState<string | null>(null);
  const [prCelebration, setPrCelebration] = useState<{
    type: string;
    val: number;
    name: string;
  } | null>(null);

  const techniqueEngine = useAdvancedTechniqueEngine();
  
  // Initialization of persisted state
  useEffect(() => {
    if (activeWorkoutSession && activeWorkoutSession.techniqueState) {
      techniqueEngine.restoreState(activeWorkoutSession.techniqueState);
    }
  }, []);


  // Snapshot of exercises for this session. We update the store immediately when adding.
  const todayPlan = isFree
    ? activeFreeWorkout
    : currentPlan?.schedule?.[dayIndex] || currentPlan?.schedule?.[0];
  const daysPerWeek = questionnaire?.daysPerWeek || 4;
  const autoWeek = (Math.floor(workoutHistory.length / daysPerWeek) % 4) + 1;
  const currentWeek =
    selectedProgressionWeek === 0 ? autoWeek : selectedProgressionWeek;

  const rawExercises = todayPlan?.exercises || [];
  const exercises = rawExercises.map((ex) =>
    adjustExerciseForWeek(ex, currentWeek, questionnaire?.mainGoal),
  );
  const currentExercise = exercises[activeExerciseIndex];

  // Helper to parse superset labels e.g. "A1", "A2", "B1"
  const getExerciseGroup = (ex: ExerciseDefinition | undefined) => {
    if (!ex || !ex.supersetGroup) return null;
    const groupStr = ex.supersetGroup.trim().toUpperCase();
    if (groupStr.length < 2) return null;
    const prefix = groupStr[0]; // e.g., 'A'
    const pos = parseInt(groupStr.slice(1), 10) || 1; // e.g., 1
    return { prefix, pos };
  };

  const seedPhase4Scenario = (tech: string) => {
    if (!todayPlan) return;
    const updatedExercises = [...exercises];
    
    if (tech === "superset") {
      const isSupersetActive = updatedExercises[0]?.supersetGroup === "A1";
      if (isSupersetActive) {
        if (updatedExercises[0]) updatedExercises[0] = { ...updatedExercises[0], supersetGroup: "" };
        if (updatedExercises[1]) updatedExercises[1] = { ...updatedExercises[1], supersetGroup: "" };
        if (updatedExercises[2]) updatedExercises[2] = { ...updatedExercises[2], supersetGroup: "" };
        setSeedingFeedback("Superset A1-A2 desativado.");
      } else {
        if (updatedExercises[0]) {
          updatedExercises[0] = {
            ...updatedExercises[0],
            supersetGroup: "A1",
            advancedTechnique: "",
          };
        }
        if (updatedExercises[1]) {
          updatedExercises[1] = {
            ...updatedExercises[1],
            supersetGroup: "A2",
            advancedTechnique: "",
          };
        }
        setSeedingFeedback(
          "Superset A1-A2 configurado nos 2 exercícios iniciais!",
        );
      }
    } else {
      if (updatedExercises[activeExerciseIndex]) {
        const currentTech = updatedExercises[activeExerciseIndex].advancedTechnique;
        const isTurningOff = currentTech === tech;

        if (isTurningOff) {
          updatedExercises[activeExerciseIndex] = {
            ...updatedExercises[activeExerciseIndex],
            advancedTechnique: "",
            sets: 3,
            restSeconds: 60,
          };
          setSeedingFeedback(`Técnica '${tech}' removida do exercício.`);
        } else {
          updatedExercises[activeExerciseIndex] = {
            ...updatedExercises[activeExerciseIndex],
            advancedTechnique: tech,
            sets:
              tech === "FST-7"
                ? 7
                : updatedExercises[activeExerciseIndex].sets || 3,
            restSeconds:
              tech === "Rest Pause" || tech === "Myo Reps"
                ? 15
                : tech === "FST-7"
                  ? 30
                  : 60,
          };
          setSeedingFeedback(`Técnica '${tech}' aplicada!`);
        }
      }
    }

    if (isFree) {
      updateFreeWorkout({ ...todayPlan, exercises: updatedExercises });
    } else {
      updateDayPlan(dayIndex, {
        ...todayPlan,
        exercises: updatedExercises,
      } as any);
    }
  };

  // Engine initialization triggered on exercise change
  useEffect(() => {
    if (!currentExercise) return;
    techniqueEngine.resetTechnique();
    
    // Auto-inject if the user selected a supported technique
    if (currentExercise.advancedTechnique && currentExercise.advancedTechnique !== 'Nenhuma') {
      techniqueEngine.initializeTechnique(
        { type: currentExercise.advancedTechnique as any, config: {} }, 
        progressionStats?.suggestedWeight || 0,
        currentExercise.reps && Number(currentExercise.reps) ? Number(currentExercise.reps) : 10
      );
    }
  }, [activeExerciseIndex, currentExercise?.advancedTechnique]);

  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const seedScenario = (scenario: "novo" | "intermediario" | "avancado") => {
    if (!currentExercise) return;
    
    if (activeScenario === scenario) {
      // Toggle off
      setWorkoutHistory([]);
      setActiveScenario(null);
      setSeedingFeedback("Cenário simulado removido. Histórico limpo.");
      return;
    }
    
    setActiveScenario(scenario);

    if (scenario === "novo") {
      setWorkoutHistory([]);
      setSeedingFeedback(
        "Cenário 'Iniciante' Ativado! O histórico foi totalmente limpo para simular a primeira execução do exercício.",
      );
    } else if (scenario === "intermediario") {
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - 3); // 3 days ago

      const mockLog: any = {
        id: "mock-inter-1",
        date: baseDate.toISOString(),
        dayFocus: todayPlan.focus || "Treino",
        durationMinutes: 45,
        exercisesCompleted: 1,
        totalVolume: 1200,
        perceivedEffort: 8,
        exerciseLogs: [
          {
            exerciseId: currentExercise.id,
            exerciseName: currentExercise.name,
            setsLog: [
              { setNumber: 1, reps: 10, weight: 40 },
              { setNumber: 2, reps: 10, weight: 40 },
              { setNumber: 3, reps: 10, weight: 40 },
            ],
          },
        ],
      };

      setWorkoutHistory([mockLog]);
      setSeedingFeedback(
        "Cenário 'Usuário Intermediário' Ativado! Última carga do exercício: 40 kg há 3 dias (completou todas as reps alvo). Sugestão deve subir para 42 kg.",
      );
    } else if (scenario === "avancado") {
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - 20); // 20 days ago (long layoff!)

      const mockLog: any = {
        id: "mock-advanced-1",
        date: baseDate.toISOString(),
        dayFocus: todayPlan.focus || "Treino Avançado",
        durationMinutes: 50,
        exercisesCompleted: 1,
        totalVolume: 1500,
        perceivedEffort: 9,
        exerciseLogs: [
          {
            exerciseId: currentExercise.id,
            exerciseName: currentExercise.name,
            setsLog: [
              { setNumber: 1, reps: 12, weight: 50 },
              { setNumber: 2, reps: 10, weight: 50 },
              { setNumber: 3, reps: 10, weight: 50 },
            ],
          },
        ],
      };

      setWorkoutHistory([mockLog]);
      setSeedingFeedback(
        "Cenário 'Usuário Avançado (Layoff)' Ativado! Última carga: 50 kg, porém há 20 dias (>14 dias de repouso). Sugestão de deload de 10% aplicada por segurança: 45 kg.",
      );
    }
  };

  // Timers
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [prepTimer, setPrepTimer] = useState(
    settings?.preparationTimeSeconds || 15,
  );
  const [isPreparing, setIsPreparing] = useState(false);
  const [execTimer, setExecTimer] = useState(
    settings?.estimatedSetTimeSeconds || 45,
  );
  const [isExecutingAuto, setIsExecutingAuto] = useState(false);

  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [workoutSeconds, setWorkoutSeconds] = useState(0);

  // Sync state to activeWorkoutSession
  useEffect(() => {
    if (workoutFinished) {
      setActiveWorkoutSession(null);
      return;
    }
    updateActiveWorkoutSession({
      activeExerciseIndex,
      completedSetsMap,
      setLogs,
      techniqueState: techniqueEngine.state,
      restTimer,
      isResting
    });
  }, [activeExerciseIndex, completedSetsMap, setLogs, techniqueEngine.state, workoutFinished, restTimer, isResting]);

  // Modal Settings
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // For adding exercises mid-workout
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [fullscreenExercise, setFullscreenExercise] = useState<ExerciseDefinition | null>(null);
  const [addSearchQuery, setAddSearchQuery] = useState("");

  const [showDemo, setShowDemo] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [tempInstructions, setTempInstructions] = useState("");
  const [tempErrorsText, setTempErrorsText] = useState("");

  const [floatingXps, setFloatingXps] = useState<
    { id: number; xp: number; x: number; y: number }[]
  >([]);
  const xpIdCounter = useRef(0);

  const addResults = searchExercises(addSearchQuery).slice(0, 50);

  const playSound = (type: "prep" | "exec" | "rest") => {
    if (!settings?.soundEnabled) return;
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "prep") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      } else if (type === "exec") {
        osc.type = "square";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      }

      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.log("Audio disabled by browser", e);
    }
  };

  const triggerVibration = (type: "prep" | "exec" | "rest") => {
    if (!settings?.vibrationEnabled || !navigator.vibrate) return;
    if (type === "prep") navigator.vibrate([100]);
    if (type === "exec") navigator.vibrate([200, 100, 200]);
    if (type === "rest") navigator.vibrate([300]);
  };

  // Phase Handlers
  function startPrep() {
    if (settings?.preparationEnabled) {
      setPrepTimer(settings.preparationTimeSeconds);
      setIsPreparing(true);
      playSound("prep");
      triggerVibration("prep");
    } else {
      startExec();
    }
  }

  function startExec() {
    setIsPreparing(false);
    if (settings?.autoAdvanceEnabled) {
      setExecTimer(settings.estimatedSetTimeSeconds);
      setIsExecutingAuto(true);
      playSound("exec");
      triggerVibration("exec");
    }
  }

  const handlePhaseChange = () => {
    // This effect handles the countdowns based on active state flags
  };

  useEffect(() => {
    setShowDemo(false);
  }, [activeExerciseIndex]);

  // Identifica o exercício atual na biblioteca para pegar GIF e erros comuns
  const getLibraryMatch = () => {
    if (!currentExercise) return null;
    const target =
      currentExercise.targetMuscles?.[0] || currentExercise.target || "";
    return (
      findExerciseInLibrary(currentExercise.libraryId, target) ||
      findExerciseInLibrary(currentExercise.name, target) ||
      findExerciseInLibrary(currentExercise.id, target) ||
      null
    );
  };

  const libraryExercise = getLibraryMatch();
  const progressionStats = currentExercise
    ? getProgressionStats(
        currentExercise.name,
        currentExercise.reps,
        workoutHistory,
      )
    : null;

  // Overview / Edit Mode
  const [showOverview, setShowOverview] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleEditExercise = (index: number, field: string, value: any) => {
    if (!todayPlan) return;
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };

    if (isFree) {
      updateFreeWorkout({ ...todayPlan, exercises: updatedExercises });
    } else {
      updateDayPlan(dayIndex, {
        ...todayPlan,
        exercises: updatedExercises,
      } as any);
    }
  };

  // Global Workout Timer
  useEffect(() => {
    if (workoutFinished) return;
    const interval = setInterval(() => setWorkoutSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [workoutFinished]);

  useEffect(() => {
    const isPlanMissing = isFree
      ? !activeFreeWorkout
      : !currentPlan || !todayPlan;
    if (isPlanMissing || exercises.length === 0 || !currentExercise) {
      navigate("/workouts");
    }
  }, [
    isFree,
    activeFreeWorkout,
    currentPlan,
    todayPlan,
    exercises.length,
    currentExercise,
    navigate,
  ]);

  // Phase Timers logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // RESTING
    if (isResting && restTimer > 0) {
      interval = setInterval(() => setRestTimer((t) => t - 1), 1000);
    } else if (isResting && restTimer === 0) {
      setIsResting(false);
      startPrep(); // Move to prep for next set
    }
    // PREPARING
    else if (isPreparing && prepTimer > 0) {
      interval = setInterval(() => setPrepTimer((t) => t - 1), 1000);
    } else if (isPreparing && prepTimer === 0) {
      setIsPreparing(false);
      startExec(); // Move to execution
    }
    // EXECUTING (Auto)
    else if (isExecutingAuto && execTimer > 0) {
      interval = setInterval(() => setExecTimer((t) => t - 1), 1000);
    } else if (isExecutingAuto && execTimer === 0) {
      setIsExecutingAuto(false);
      const nextSetId = completedSets.length + 1;
      handleCompleteSet(nextSetId);
    }

    return () => clearInterval(interval);
  }, [
    isResting,
    restTimer,
    isPreparing,
    prepTimer,
    isExecutingAuto,
    execTimer,
    startPrep,
    startExec,
    completedSets.length,
    handleCompleteSet,
  ]);

  const isPlanMissing = isFree
    ? !activeFreeWorkout
    : !currentPlan || !todayPlan;
  if (isPlanMissing || exercises.length === 0 || !currentExercise) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4 text-center pb-24">
        <Dumbbell size={48} className="text-surface-light mb-4" />
        <h1 className="text-xl font-bold text-text-primary mb-2">
          Treino não encontrado
        </h1>
        <p className="text-text-secondary text-sm mb-4">
          Não foi possível carregar os exercícios de hoje.
        </p>
        <button
          onClick={() => navigate("/workouts")}
          className="px-4 py-3 bg-neon-blue text-background font-bold rounded-xl active:scale-95 transition-all"
        >
          Voltar aos Treinos
        </button>
      </div>
    );
  }

  if (!exercises.length || workoutFinished) {
    return (
      <div className="min-h-[100dvh] bg-background p-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(0,210,255,0.4)] border border-neon-blue/40"
        >
          <CheckCircle size={48} className="text-black" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-text-primary tracking-tight mb-2">
          Treino Concluído!
        </h1>
        <p className="text-sm text-text-secondary font-medium mb-4 px-4 max-w-sm">
          Excelente trabalho! Você deu mais um passo em direção ao seu objetivo. O descanso agora é fundamental.
        </p>

        <div className="p-5 rounded-2xl w-full max-w-sm flex justify-around bg-surface border border-surface-light shadow-xl mb-4">
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase text-[10px] font-black text-neon-blue tracking-wider">
              Tempo Total
            </span>
            <span className="font-bold text-text-primary text-2xl font-mono">
              {Math.floor(workoutSeconds / 60)} min
            </span>
          </div>
          <div className="w-px bg-text-primary/10" />
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase text-[10px] font-black text-neon-blue tracking-wider">
              Exercícios
            </span>
            <span className="font-bold text-text-primary text-2xl font-mono">
              {exercises.length}
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => {
              const namePrompt = prompt("Nome para salvar nos Treinos Extras:", todayPlan?.focus || "Treino Realizado");
              if (namePrompt) {
                const newTemplate = {
                  id: `user-extra-${Date.now()}`,
                  generatedAt: new Date().toISOString(),
                  phaseName: namePrompt,
                  planPromptDescription: `${exercises.length} exercícios concluídos`,
                  schedule: [{
                    dayName: 'Treino A',
                    focus: namePrompt,
                    isRest: false,
                    exercises: exercises,
                    warmup: [],
                    cooldown: [],
                    intensity: 'Média'
                  }]
                };
                useWorkoutStore.getState().addUserTemplate(newTemplate);
                alert(`Treino "${namePrompt}" salvo com sucesso nos Treinos Extras!`);
              }
            }}
            className="w-full py-3 rounded-2xl uppercase tracking-widest cursor-pointer bg-surface border border-surface-light hover:bg-text-primary/5 text-text-primary font-bold text-xs transition-all active:scale-98"
          >
            ★ Salvar nos Treinos Extras
          </button>

          <button
            onClick={() => navigate("/workouts")}
            className="w-full py-3.5 rounded-2xl uppercase tracking-widest cursor-pointer bg-gradient-to-r from-neon-blue to-neon-purple text-black font-black text-sm shadow-[0_10px_30px_rgba(0,210,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            VOLTAR AOS TREINOS
          </button>
        </div>
      </div>
    );
  }

  const spawnXp = (xpAmount: number) => {
    const id = xpIdCounter.current++;
    // Spawn somewhat centered, slight random offset
    const x = window.innerWidth / 2 + (Math.random() * 40 - 20);
    const y = window.innerHeight / 2 + (Math.random() * 40 - 20);

    setFloatingXps((prev) => [...prev, { id, x, y, xp: xpAmount }]);
    setTimeout(() => {
      setFloatingXps((prev) => prev.filter((fx) => fx.id !== id));
    }, 1500);
  };

  const handleLogChange = ({
    exerciseIndex,
    setNumber,
    field,
    value,
  }: {
    exerciseIndex: number;
    setNumber: number;
    field: "reps" | "weight";
    value: string;
  }) => {
    const key = `${exerciseIndex}-${setNumber}`;
    setSetLogs((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { reps: "", weight: "" }),
        [field]: value,
      },
    }));
  };

  function handleCompleteSet(setNumber: number) {
    if (!completedSets.includes(setNumber)) {
      // Auto-fill logs with target reps and suggested weight if not filled out manually
      const logKey = `${activeExerciseIndex}-${setNumber}`;
      const currentLog = setLogs[logKey] || { reps: "", weight: "" };

      let repsVal = currentLog.reps;
      let weightVal = currentLog.weight;

      if (!repsVal) {
        const parsed = currentExercise.reps?.split("-")[0] || "10";
        repsVal = parsed.replace(/\D/g, "") || "10";
      }

      if (!weightVal) {
        const stats = getProgressionStats(
          currentExercise.name,
          currentExercise.reps,
          workoutHistory,
        );
        weightVal =
          stats.suggestedWeight > 0 ? String(stats.suggestedWeight) : "0";
      }

      setSetLogs((prev) => ({
        ...prev,
        [logKey]: {
          reps: repsVal,
          weight: weightVal,
        },
      }));

      // PR Records check
      const previousMaxValues = getPersonalRecords(
        currentExercise.name,
        workoutHistory,
      );
      const weightNum = parseFloat(weightVal) || 0;
      const repsNum = parseInt(repsVal) || 0;

      let gotPr = false;
      let prType = "";
      let prVal = 0;

      if (
        previousMaxValues.maxWeight > 0 &&
        weightNum > previousMaxValues.maxWeight
      ) {
        gotPr = true;
        prType = "Carga Máxima";
        prVal = weightNum;
      } else if (
        previousMaxValues.maxReps > 0 &&
        repsNum > previousMaxValues.maxReps
      ) {
        gotPr = true;
        prType = "Repetições";
        prVal = repsNum;
      }

      if (gotPr) {
        setPrCelebration({
          type: prType,
          val: prVal,
          name: currentExercise.name,
        });
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff9800", "#f59e0b", "#ffffff"],
        });
        setTimeout(() => {
          setPrCelebration(null);
        }, 4000);
      }

      const nextCompleted = [...completedSets, setNumber];
      setCompletedSets(nextCompleted);

      const newCompletedMap = {
        ...completedSetsMap,
        [activeExerciseIndex]: nextCompleted,
      };
      setCompletedSetsMap(newCompletedMap);
      setIsExecutingAuto(false); // Stop execution phase if active

      // Dopamine hit: popup XP text
      const isAdvanced =
        currentExercise.advancedTechnique &&
        currentExercise.advancedTechnique !== "Nenhuma";
      const xpGiven = isAdvanced ? 25 : 10;
      spawnXp(xpGiven);

      // Check for Superset Group Configuration e.g. A1, A2, A3
      const currentGroup = getExerciseGroup(currentExercise);
      if (currentGroup) {
        const groupPrefix = currentGroup.prefix;
        const groupItems = exercises
          .map((ex, idx) => ({ ex, idx, g: getExerciseGroup(ex) }))
          .filter((item) => item.g && item.g.prefix === groupPrefix)
          .sort((a, b) => (a.g?.pos || 0) - (b.g?.pos || 0));

        const currentSortedIndex = groupItems.findIndex(
          (item) => item.idx === activeExerciseIndex,
        );

        // A) Is there a subsequent exercise in the group to perform for this same set?
        if (currentSortedIndex < groupItems.length - 1) {
          const nextGroupItem = groupItems[currentSortedIndex + 1];
          setTimeout(() => {
            setActiveExerciseIndex(nextGroupItem.idx);
            setCompletedSets(newCompletedMap[nextGroupItem.idx] || []);

            // Brief 5 seconds machine transfer pause
            if (settings?.restTimeEnabled) {
              setRestTimer(5);
              setIsResting(true);
              playSound("prep");
            } else {
              startPrep();
            }
          }, 800);
          return;
        }

        // B) This was the last exercise in the group series. Check if we have more sets left in this group
        const maxSetsInGroup = Math.max(
          ...groupItems.map((item) => item.ex.sets),
        );
        if (setNumber < maxSetsInGroup) {
          const firstGroupItem = groupItems[0];
          setTimeout(() => {
            setActiveExerciseIndex(firstGroupItem.idx);
            setCompletedSets(newCompletedMap[firstGroupItem.idx] || []);

            if (settings?.restTimeEnabled) {
              const sharedRest =
                currentExercise.restSeconds ||
                firstGroupItem.ex.restSeconds ||
                60;
              setRestTimer(sharedRest);
              setIsResting(true);
              playSound("rest");
              triggerVibration("rest");
            } else {
              startPrep();
            }
          }, 800);
          return;
        }

        // C) All sets of the Superset Group are completed! Clean transition to the next exercises
        const lastGroupIdx = Math.max(...groupItems.map((item) => item.idx));
        const nextExIdx = lastGroupIdx + 1;

        if (nextExIdx < exercises.length) {
          setTimeout(() => {
            setActiveExerciseIndex(nextExIdx);
            setCompletedSets(newCompletedMap[nextExIdx] || []);

            if (settings?.restTimeEnabled) {
              setRestTimer((exercises[nextExIdx].restSeconds || 60) + 15);
              setIsResting(true);
              playSound("rest");
              triggerVibration("rest");
            } else {
              startPrep();
            }
          }, 800);
        } else {
          setTimeout(() => finishWorkout(), 800);
        }
        return;
      }

      // Standard Non-superset exercise transitions
      if (setNumber < currentExercise.sets) {
        if (settings?.restTimeEnabled) {
          let customRest = currentExercise.restSeconds || 60;
          setRestTimer(customRest);
          setIsResting(true);
          playSound("rest");
          triggerVibration("rest");
        } else {
          startPrep();
        }
      } else {
        // Exercise completed entirely
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00f0ff", "#ffffff"],
        });
        spawnXp(50);

        if (activeExerciseIndex < exercises.length - 1) {
          setTimeout(() => {
            const nextIdx = activeExerciseIndex + 1;
            setActiveExerciseIndex(nextIdx);
            setCompletedSets(newCompletedMap[nextIdx] || []);

            if (settings?.restTimeEnabled) {
              setRestTimer((exercises[nextIdx].restSeconds || 60) + 30);
              setIsResting(true);
              playSound("rest");
              triggerVibration("rest");
            } else {
              startPrep();
            }
          }, 800);
        } else {
          setTimeout(() => finishWorkout(), 800);
        }
      }
    }
  }

  const finishWorkout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#8e2de2", "#10b981"],
    });
    setWorkoutFinished(true);

    // Calculate total volume
    let tVol = 0;
    Object.values(setLogs).forEach((log) => {
      const reps = parseInt(log.reps) || 0;
      const weight = parseFloat(log.weight) || 0;
      tVol += reps * weight;
    });

    const exerciseLogs = exercises
      .map((ex, exIdx) => {
        const setsLog: { setNumber: number; reps: number; weight: number }[] =
          [];
        for (let i = 0; i < ex.sets; i++) {
          const setNumber = i + 1;
          const logKey = `${exIdx}-${setNumber}`;
          const log = setLogs[logKey];
          if (log) {
            setsLog.push({
              setNumber,
              reps: parseInt(log.reps) || 0,
              weight: parseFloat(log.weight) || 0,
            });
          }
        }

        // Capture Drop Set sub-series
        Object.keys(setLogs).forEach((key) => {
          if (key.startsWith(`${exIdx}-drop-`)) {
            const log = setLogs[key];
            if (log) {
              setsLog.push({
                setNumber: 99, // 99 represents Drop Set sub-series
                reps: parseInt(log.reps) || 0,
                weight: parseFloat(log.weight) || 0,
              });
            }
          }
        });

        return {
          exerciseId: ex.id,
          exerciseName: ex.name,
          advancedTechnique: ex.advancedTechnique || undefined,
          supersetGroup: ex.supersetGroup || undefined,
          setsLog,
        };
      })
      .filter((el) => el.setsLog.length > 0);

    completeWorkout({
      id: generateId(),
      date: new Date().toISOString(),
      dayFocus: todayPlan.focus,
      durationMinutes: Math.floor(workoutSeconds / 60) || 1,
      exercisesCompleted: exercises.length,
      totalVolume: tVol,
      perceivedEffort: 8,
      phaseIndex: currentPlan?.currentPhaseIndex || 0,
      weekIndex: currentPlan?.currentWeekIndex || 0,
      phaseName: currentPlan?.phases?.[currentPlan.currentPhaseIndex || 0]?.name || currentPlan?.phaseName || 'Treino',
      exerciseLogs,
    });
    addXp(200 + Math.floor(workoutSeconds / 60) * 10);
  };

  const formatedWorkoutTimer = () => {
    const m = Math.floor(workoutSeconds / 60);
    const s = workoutSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAddExercise = (exItem: any) => {
    const newEx: ExerciseDefinition = {
      id: exItem.id,
      name: exItem.name,
      sets: 3,
      reps: "10-12",
      restSeconds: 60,
      instructions: exItem.instructions,
      targetMuscles: exItem.targetMuscles,
    };

    // Add to the current plan or free plan
    const updatedExercises = [...todayPlan.exercises, newEx];
    if (isFree) {
      updateFreeWorkout({
        ...todayPlan,
        exercises: updatedExercises,
      });
    } else {
      updateDayPlan(dayIndex, {
        ...todayPlan,
        exercises: updatedExercises,
      } as any);
    }

    setShowAddMenu(false);
    setAddSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col text-sm">
      {/* FLOATING XP */}
      <AnimatePresence>
        {floatingXps.map((fx) => (
          <motion.div
            key={fx.id}
            initial={{ opacity: 1, y: fx.y, x: fx.x, scale: 0.5 }}
            animate={{ opacity: 0, y: fx.y - 80, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed z-50 font-black pointer-events-none drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] text-amber-400"
          >
            +{fx.xp} XP
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 🏆 PR CELEBRATION */}
      <AnimatePresence>
        {prCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="bg-surface border border-amber-500/40 rounded-2xl p-4 w-full max-w-xs shadow-[0_0_30px_rgba(245,158,11,0.25)] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-amber-500 font-extrabold text-base uppercase tracking-wider">
                Novo Recorde!
              </h2>
              <p className="text-xs text-text-secondary mt-1 uppercase font-bold tracking-widest truncate">
                {prCelebration.name}
              </p>
              <div className="mt-4 bg-background/50 border border-surface-light p-3 rounded-xl flex flex-col items-center">
                <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">
                  {prCelebration.type}
                </span>
                <span className="text-xl font-extrabold font-mono text-text-primary">
                  {prCelebration.val} {prCelebration.type === "Repetições" ? "Reps" : "kg"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER COMPACT */}
      <div className="bg-surface/90 backdrop-blur-md border-b border-surface-light flex items-center justify-between sticky top-0 z-40 px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCancelModal(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-text-primary/5 text-text-primary hover:bg-text-primary/10 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex flex-col">
            <h3 className="font-bold uppercase tracking-widest text-[11px] text-neon-blue">
              {todayPlan?.dayName || "Treino Livre"}
            </h3>
            <span className="font-mono flex items-center gap-1 text-[10px] text-text-secondary">
              <Clock size={10} /> {formatedWorkoutTimer()}
            </span>
          </div>
        </div>
                
        <div className="flex items-center gap-3">
           <span
              className="font-extrabold cursor-pointer transition-colors text-[10px] text-text-primary bg-text-primary/5 border border-surface-light px-2 py-1 rounded hover:bg-text-primary/10 flex items-center gap-1"
              onClick={() => setShowOverview(true)}
            >
              {activeExerciseIndex + 1}/{exercises.length} <Search size={10} />
            </span>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary bg-text-primary/5 rounded-full transition-colors"
          >
            <Settings size={14} />
          </button>
          <button
            onClick={finishWorkout}
            className="text-[10px] text-black bg-emerald-500 font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:bg-emerald-400 transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>

      {/* MAIN WORKOUT VIEW */}
      <div className="flex-1 overflow-y-auto px-2 py-3 pb-32 space-y-2">
         {exercises.map((currentExercise, index) => {
            const isExpanded = activeExerciseIndex === index;
            const isCompletedBefore = index < activeExerciseIndex;
            const libraryExercise = EXERCISE_LIBRARY.find(
              (ex) =>
                ex.id === currentExercise.libraryId ||
                ex.name.toLowerCase() === currentExercise.name.toLowerCase()
            );

            return (
              <div key={`${currentExercise.id}-${index}`} className={`bg-surface/60 border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-neon-blue/30 rounded-2xl shadow-[0_0_15px_rgba(0,210,255,0.05)]' : 'border-surface-light rounded-xl opacity-80'}`}>
                
                {/* Accordion Header */}
                <div 
                  onClick={() => {
                    setActiveExerciseIndex(index);
                    setCompletedSets(completedSetsMap[index] || []);
                  }}
                  className={`flex items-stretch gap-3 p-2 cursor-pointer transition-colors ${isExpanded ? 'bg-text-primary/5' : 'hover:bg-text-primary/[0.02]'}`}
                >
                  <div 
                    className="w-12 h-12 rounded-lg shrink-0 relative overflow-hidden bg-background border border-surface-light group flex items-center justify-center"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setFullscreenExercise(currentExercise);
                    }}
                  >
                     <ExerciseMedia
                        exerciseNameOrId={currentExercise.libraryId || currentExercise.name || currentExercise.id}
                        fallbackMuscle={currentExercise.targetMuscles?.[0] || currentExercise.target || "Corpo Todo"}
                        priority={isExpanded}
                     />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play size={16} className="text-text-primary" />
                     </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                     <h3 className={`text-xs font-bold truncate ${isExpanded ? 'text-neon-blue' : isCompletedBefore ? 'text-emerald-500' : 'text-text-primary'}`}>{currentExercise.name}</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                       <p className="text-[9px] text-text-secondary uppercase font-bold tracking-widest">{currentExercise.sets}x{currentExercise.reps}</p>
                       {currentExercise.supersetGroup && (
                          <span className="text-[8px] bg-neon-blue/20 text-neon-blue uppercase px-1 rounded font-extrabold">
                             🔄 {currentExercise.supersetGroup}
                          </span>
                       )}
                       {currentExercise.advancedTechnique && currentExercise.advancedTechnique !== "Nenhuma" && (
                          <span className="text-[8px] bg-red-500/20 text-red-500 uppercase px-1 rounded font-extrabold">
                             🔥 {currentExercise.advancedTechnique}
                          </span>
                       )}
                     </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center w-8 text-text-primary/30">
                    {isCompletedBefore ? (
                       <CheckCircle size={16} className="text-emerald-500" />
                    ) : (
                       <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                       </motion.div>
                    )}
                  </div>
                </div>

                {/* Accordion Body */}
                <AnimatePresence>
                   {isExpanded && (
                      <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="border-t border-surface-light bg-background/20"
                      >
                         <div className="p-3">
                            <div className="flex items-center justify-between mb-3">
                               <div className="flex gap-4">
                                 <div className="flex flex-col">
                                   <span className="text-[9px] uppercase text-text-secondary font-bold mb-0.5">Repetições</span>
                                   <span className="text-sm font-black text-text-primary">{currentExercise.reps}</span>
                                 </div>
                                 <div className="flex flex-col">
                                   <span className="text-[9px] uppercase text-text-secondary font-bold mb-0.5">Descanso</span>
                                   <span className="text-sm font-black text-text-primary">{currentExercise.restSeconds || 60}s</span>
                                 </div>
                               </div>
                               <button
                                  onClick={(e) => { e.stopPropagation(); setFullscreenExercise(currentExercise); }}
                                  className="text-[9px] uppercase font-bold text-neon-blue border border-neon-blue/30 px-2 py-1 rounded bg-neon-blue/10 flex items-center gap-1"
                               >
                                  <Play size={10} /> Dicas
                               </button>
                            </div>

                            {/* SETS */}
                            <div className="space-y-1.5">
                              {/* Headers */}
                              <div className="flex items-center text-[9px] font-bold text-text-secondary uppercase px-2 mb-1">
                                <div className="w-8 text-center">Série</div>
                                <div className="flex-1 text-center">Metas</div>
                                <div className="flex-1 text-center">Realizado</div>
                                <div className="w-10"></div>
                              </div>
                              {Array.from({ length: currentExercise.sets }).map((_, i) => {
                                const setNumber = i + 1;
                                const isCompleted = completedSets.includes(setNumber);
                                const isCurrent = !isCompleted && (completedSets.length === i || (i === 0 && completedSets.length === 0));
                                
                                const logKey = `${index}-${setNumber}`;
                                const log = setLogs[logKey] || { reps: "", weight: "" };
                                
                                const pStats = getProgressionStats(
                                  currentExercise.libraryId || currentExercise.name,
                                  setNumber
                                );
                                
                                // Simplified progression targets
                                let targetWeight = pStats?.weight ? pStats.weight : "";
                                let targetReps = pStats?.reps ? pStats.reps : (parseInt(currentExercise.reps) || "");
                                
                                if (currentPlan?.phases && currentPlan.currentPhaseIndex !== undefined && currentPlan.currentWeekIndex !== undefined) {
                                  const cPhase = currentPlan.phases[currentPlan.currentPhaseIndex];
                                  const wRatio = selectedProgressionWeek === 0
                                    ? ((currentPlan.currentWeekIndex + 1) / (cPhase.durationWeeks || 4))
                                    : (selectedProgressionWeek / (cPhase.durationWeeks || 4));
                                  const adj = adjustExerciseForWeek(
                                    currentExercise.reps,
                                    currentExercise.sets,
                                    wRatio,
                                    cPhase.progressionType || "linear",
                                    currentExercise.advancedTechnique
                                  );
                                  targetReps = adj.reps;
                                }

                                return (
                                  <div
                                    key={i}
                                    className={`flex items-stretch rounded-lg border transition-colors ${
                                      isCompleted 
                                        ? "bg-emerald-500/10 border-emerald-500/20" 
                                        : isCurrent 
                                          ? "bg-surface border-neon-blue/50" 
                                          : "bg-surface-light border-surface-light opacity-60"
                                    }`}
                                  >
                                    <div className="w-8 flex items-center justify-center text-xs font-bold text-text-primary/50 border-r border-surface-light">
                                      {setNumber}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center items-center text-[10px] text-text-secondary border-r border-surface-light">
                                       <span className="font-mono">{targetWeight ? `${targetWeight}kg` : '-'}</span>
                                       <span>{targetReps} reps</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-1 px-2 py-1">
                                      <input
                                        type="number"
                                        inputMode="decimal"
                                        placeholder="kg"
                                        value={log.weight ?? ""}
                                        onChange={(e) => {
                                          setSetLogs(prev => ({
                                            ...prev,
                                            [logKey]: { ...prev[logKey], weight: e.target.value }
                                          }));
                                        }}
                                        className="w-1/2 bg-background border border-surface-light rounded px-1 py-1.5 text-xs text-center text-text-primary outline-none focus:border-neon-blue"
                                      />
                                      <span className="text-text-secondary text-[10px]">x</span>
                                      <input
                                        type="number"
                                        inputMode="numeric"
                                        placeholder="reps"
                                        value={log.reps ?? ""}
                                        onChange={(e) => {
                                          setSetLogs(prev => ({
                                            ...prev,
                                            [logKey]: { ...prev[logKey], reps: e.target.value }
                                          }));
                                        }}
                                        className="w-1/2 bg-background border border-surface-light rounded px-1 py-1.5 text-xs text-center text-text-primary outline-none focus:border-neon-blue"
                                      />
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (isCompleted) {
                                          const newSets = completedSets.filter(s => s !== setNumber);
                                          setCompletedSets(newSets);
                                          setCompletedSetsMap(prev => ({ ...prev, [activeExerciseIndex]: newSets }));
                                        } else {
                                          handleCompleteSet(setNumber);
                                        }
                                      }}
                                      className={`w-10 flex items-center justify-center transition-colors rounded-r-lg ${
                                        isCompleted ? "bg-emerald-500 text-text-primary" : "bg-text-primary/5 text-text-primary/40 hover:bg-text-primary/10"
                                      }`}
                                    >
                                      <CheckCircle size={14} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {techniqueEngine.state.isActive && (
                               <div className="mt-4 border-t border-surface-light pt-4">
                                 <TechniqueController
                                    state={techniqueEngine.state}
                                    onAdvance={techniqueEngine.advance}
                                    onComplete={techniqueEngine.complete}
                                 />
                               </div>
                            )}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
              </div>
            );
          })}
          
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAddMenu(true)}
              className="flex items-center gap-2 text-[10px] font-bold text-text-secondary hover:text-text-primary uppercase tracking-widest bg-surface px-4 py-2.5 rounded-xl border border-surface-light hover:border-text-primary/20 transition-all"
            >
              <Plus size={14} />
              Adicionar Exercício
            </button>
          </div>
      </div>

      {/* PHASE TIMERS */}
      <AnimatePresence>
        {isResting && (
           <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-3 bg-surface/95 backdrop-blur-xl border-t border-surface-light shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-50 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
               <div className="bg-neon-blue/10 text-neon-blue p-2 rounded-lg">
                 <Clock size={18} />
               </div>
               <div>
                  <h3 className="font-bold text-text-secondary text-[9px] tracking-widest uppercase mb-0.5">
                    Descanso
                  </h3>
                  <div className="font-mono font-black text-xl text-neon-blue leading-none">
                    {formatTime(restTimer)}
                  </div>
               </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRestTimer((t) => t + 15)}
                className="rounded-lg font-bold transition-colors cursor-pointer bg-text-primary/5 border border-surface-light px-3 py-1.5 text-text-primary text-[10px] hover:bg-text-primary/10"
              >
                +15s
              </button>
              <button
                onClick={() => {
                  setIsResting(false);
                  startPrep();
                }}
                className="rounded-lg uppercase font-black tracking-wider transition-transform cursor-pointer bg-neon-blue text-black px-4 py-1.5 text-[10px] shadow-lg active:scale-95"
              >
                Pular
              </button>
            </div>
          </motion.div>
        )}
        {isPreparing && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-3 bg-neon-blue/10 backdrop-blur-xl border-t border-neon-blue/50 shadow-[0_-10px_30px_rgba(0,210,255,0.2)] z-50 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-neon-blue/20 text-neon-blue p-2 rounded-lg animate-pulse">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-neon-blue/70 text-[9px] tracking-widest uppercase mb-0.5">
                  Preparar
                </h3>
                <div className="font-mono font-black text-xl text-neon-blue leading-none">
                  {formatTime(prepTimer)}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsPreparing(false);
                startExec();
              }}
              className="rounded-lg uppercase font-black tracking-wider transition-transform cursor-pointer bg-neon-blue text-black px-4 py-1.5 text-[10px] shadow-lg active:scale-95 flex items-center gap-1"
            >
              <Play size={10} /> INICIAR
            </button>
          </motion.div>
        )}
        {isExecutingAuto && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-3 bg-red-900/20 backdrop-blur-xl border-t border-red-500/50 shadow-[0_-10px_30px_rgba(239,68,68,0.2)] z-50 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-500/20 text-red-500 p-2 rounded-lg animate-pulse">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-red-500/70 text-[9px] tracking-widest uppercase mb-0.5">
                  Execução
                </h3>
                <div className="font-mono font-black text-xl text-red-500 leading-none">
                  {formatTime(execTimer)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERVIEW MODAL */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-surface border border-surface-light w-full max-w-md rounded-t-3xl sm:rounded-2xl p-4 max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  <Activity size={16} className="text-neon-blue" /> Visão Geral
                </h2>
                <button
                  onClick={() => setShowOverview(false)}
                  className="w-8 h-8 rounded-full bg-text-primary/5 flex items-center justify-center text-text-secondary hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {exercises.map((ex, idx) => {
                  const isCur = idx === activeExerciseIndex;
                  const isDone = idx < activeExerciseIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveExerciseIndex(idx);
                        setCompletedSets(completedSetsMap[idx] || []);
                        setShowOverview(false);
                      }}
                      className={`p-2 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                        isDone
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                          : isCur
                          ? "bg-neon-blue/10 border-neon-blue text-text-primary"
                          : "bg-surface-light border-surface-light text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-surface-light bg-background/50">
                        <ExerciseMedia exerciseNameOrId={ex.id || ex.name} fallbackMuscle={ex.targetMuscles?.[0]} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[11px] truncate">{ex.name}</h4>
                        <p className="text-[9px] uppercase tracking-widest">{ex.sets} séries</p>
                      </div>
                      {isDone && <CheckCircle size={14} />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CANCEL MODAL */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-surface border border-surface-light rounded-2xl p-5 max-w-xs w-full shadow-2xl text-center"
            >
              <AlertTriangle size={36} className="text-red-500 mx-auto mb-3" />
              <h2 className="text-text-primary font-bold text-sm mb-1">Encerrar Treino?</h2>
              <p className="text-text-secondary text-xs mb-3">
                Seu progresso até aqui não será salvo.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2 bg-surface-light rounded-lg text-text-primary font-bold text-xs"
                >
                  Continuar
                </button>
                <button
                  onClick={() => navigate("/workouts")}
                  className="flex-1 py-2 bg-red-500/20 text-red-500 rounded-lg font-bold text-xs"
                >
                  Sair
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-surface border border-surface-light rounded-2xl p-4 max-w-sm w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-text-primary font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                  <Settings size={14} className="text-neon-blue" /> Ajustes Rápidos
                </h2>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-secondary">Sons de Alerta</span>
                  <button
                    onClick={() => updateSettings({ soundEnabled: !settings?.soundEnabled })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${settings?.soundEnabled ? "bg-neon-blue" : "bg-surface-light"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-text-primary transition-transform ${settings?.soundEnabled ? "left-5" : "left-1"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-secondary">Temporizador Auto</span>
                  <button
                    onClick={() => updateSettings({ restTimeEnabled: !settings?.restTimeEnabled })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${settings?.restTimeEnabled ? "bg-neon-blue" : "bg-surface-light"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-text-primary transition-transform ${settings?.restTimeEnabled ? "left-5" : "left-1"}`} />
                  </button>
                </div>
                <div className="pt-2 border-t border-surface-light">
                  <button
                    onClick={() => { setShowSettingsModal(false); setShowConsole(true); }}
                    className="w-full py-2 bg-surface-light text-text-secondary hover:text-text-primary rounded-lg text-xs font-bold transition-colors"
                  >
                    🔧 Console de Testes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONSOLE MODAL (Replacing inline console) */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-surface border border-surface-light rounded-2xl p-4 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-text-primary font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                  🚀 Console de Testes
                </h2>
                <button onClick={() => setShowConsole(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Testar Técnicas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => seedPhase4Scenario("superset")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Superset A1-A2</button>
                    <button onClick={() => seedPhase4Scenario("Drop Set")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Drop Set</button>
                    <button onClick={() => seedPhase4Scenario("Rest Pause")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Rest Pause</button>
                    <button onClick={() => seedPhase4Scenario("Cluster Set")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Cluster Set</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Nível do Atleta</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => seedScenario("novo")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Iniciante</button>
                    <button onClick={() => seedScenario("intermediario")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Intermediário</button>
                    <button onClick={() => seedScenario("avancado")} className="py-2 bg-surface-light hover:bg-text-primary/10 text-text-primary rounded-lg text-[10px] font-bold">Avançado</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD EXERCISE MENU */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-surface-light">
              <h2 className="text-text-primary font-bold text-sm">Adicionar Exercício</h2>
              <button
                onClick={() => setShowAddMenu(false)}
                className="p-1.5 text-text-secondary hover:text-text-primary bg-surface-light rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3 bg-surface border-b border-surface-light">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
                <input
                  type="text"
                  placeholder="Buscar exercício..."
                  value={addSearchQuery}
                  onChange={(e) => setAddSearchQuery(e.target.value)}
                  className="w-full bg-background border border-surface-light text-text-primary rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-neon-blue"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {addResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {addResults.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleAddExercise(ex)}
                      className="bg-surface border border-surface-light p-2 rounded-xl flex items-center gap-3 text-left hover:border-neon-blue/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded bg-background flex items-center justify-center shrink-0 border border-surface-light">
                        <Dumbbell size={14} className="text-text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-text-primary truncate group-hover:text-neon-blue transition-colors">
                          {ex.name}
                        </h4>
                        <p className="text-[9px] text-text-secondary uppercase">
                          {ex.targetMuscles.join(", ")}
                        </p>
                      </div>
                      <Plus size={14} className="text-text-secondary group-hover:text-neon-blue shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-text-secondary">
                  Nenhum exercício encontrado
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN MEDIA MODAL */}
      <AnimatePresence>
        {fullscreenExercise && (() => {
          const fsLibraryMatch = EXERCISE_LIBRARY.find(ex => ex.id === fullscreenExercise.libraryId || ex.name.toLowerCase() === fullscreenExercise.name.toLowerCase());
          const inst = fullscreenExercise.instructions || fsLibraryMatch?.instructions;
          const errs = fullscreenExercise.commonErrors && fullscreenExercise.commonErrors.length > 0 
            ? fullscreenExercise.commonErrors 
            : (fsLibraryMatch?.commonErrors && fsLibraryMatch.commonErrors.length > 0 ? fsLibraryMatch.commonErrors : getCommonErrorsForExercise(fullscreenExercise.name, fullscreenExercise.targetMuscles || []));
            
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center bg-black/80 sticky top-0 z-10 border-b border-surface-light">
               <h3 className="text-text-primary font-bold text-sm">{fullscreenExercise.name}</h3>
               <button onClick={() => setFullscreenExercise(null)} className="w-8 h-8 rounded-full bg-text-primary/10 flex items-center justify-center text-text-primary hover:bg-text-primary/20 transition-colors cursor-pointer shrink-0">
                 <X size={16} />
               </button>
            </div>
            
            <div className="flex-1 w-full flex flex-col p-4 overflow-y-auto space-y-4 pb-24">
              <div className="w-full max-w-4xl mx-auto aspect-video relative rounded-2xl overflow-hidden border border-surface-light shadow-2xl bg-black shrink-0">
                 <ExerciseMedia
                    exerciseNameOrId={fullscreenExercise.libraryId || fullscreenExercise.name || fullscreenExercise.id}
                    fallbackMuscle={fullscreenExercise.targetMuscles?.[0] || fullscreenExercise.target || "Corpo Todo"}
                    priority={true}
                 />
              </div>

              {inst && (
                 <div className="w-full max-w-4xl mx-auto bg-surface/50 border-l-2 border-neon-blue p-4 rounded-r-xl">
                   <h4 className="font-bold text-neon-blue uppercase tracking-widest text-[10px] mb-2">Instruções de Execução</h4>
                   <p className="text-xs text-text-primary/80 leading-relaxed whitespace-pre-wrap">{inst}</p>
                 </div>
              )}
              {errs && errs.length > 0 && (
                 <div className="w-full max-w-4xl mx-auto bg-red-900/20 border-l-2 border-red-500 p-4 rounded-r-xl">
                   <h4 className="font-bold text-red-500 uppercase tracking-widest text-[10px] mb-2">Evite Estes Erros</h4>
                   <ul className="list-disc pl-4 space-y-1.5 text-xs text-red-200/80 marker:text-red-500">
                     {errs.map((e, i) => <li key={i}>{e}</li>)}
                   </ul>
                 </div>
              )}
            </div>
          </motion.div>
        )})()}
      </AnimatePresence>
    </div>
  );
}

export default function ActiveWorkoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-primary font-mono text-sm">Carregando treino...</div>}>
      <ActiveWorkoutContent />
    </Suspense>
  );
}
