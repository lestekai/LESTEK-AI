/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
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

export default function ActiveWorkoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dayIndex = parseInt(searchParams?.get("dayIndex") || "0", 10);
  const isFree = searchParams?.get("free") === "true";

  const {
    currentPlan,
    completeWorkout,
    updateDayPlan,
    settings,
    updateSettings,
    activeFreeWorkout,
    updateFreeWorkout,
    workoutHistory,
    setWorkoutHistory,
    selectedProgressionWeek,
    questionnaire,
    setSelectedProgressionWeek,
    activeWorkoutSession,
    setActiveWorkoutSession,
    updateActiveWorkoutSession
  } = useWorkoutStore();
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
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6 text-center pb-24">
        <Dumbbell size={48} className="text-surface-light mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">
          Treino não encontrado
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          Não foi possível carregar os exercícios de hoje.
        </p>
        <button
          onClick={() => navigate("/workouts")}
          className="px-6 py-3 bg-neon-blue text-background font-bold rounded-xl active:scale-95 transition-all"
        >
          Voltar aos Treinos
        </button>
      </div>
    );
  }

  if (!exercises.length || workoutFinished) {
    return (
      <div className="min-h-[100dvh] bg-background p-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,210,255,0.4)] border border-neon-blue/40"
        >
          <CheckCircle size={48} className="text-black" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Treino Concluído!
        </h1>
        <p className="text-sm text-slate-300 font-medium mb-6 px-4 max-w-sm">
          Excelente trabalho! Você deu mais um passo em direção ao seu objetivo. O descanso agora é fundamental.
        </p>

        <div className="p-5 rounded-3xl w-full max-w-sm flex justify-around bg-surface border border-white/10 shadow-xl mb-8">
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase text-[10px] font-black text-neon-blue tracking-wider">
              Tempo Total
            </span>
            <span className="font-bold text-white text-2xl font-mono">
              {Math.floor(workoutSeconds / 60)} min
            </span>
          </div>
          <div className="w-px bg-white/10" />
          <div className="flex flex-col items-center gap-1">
            <span className="uppercase text-[10px] font-black text-neon-blue tracking-wider">
              Exercícios
            </span>
            <span className="font-bold text-white text-2xl font-mono">
              {exercises.length}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/workouts")}
          className="w-full max-w-sm py-4 rounded-3xl uppercase tracking-widest cursor-pointer bg-gradient-to-r from-neon-blue to-neon-purple text-black font-black text-sm shadow-[0_10px_30px_rgba(0,210,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          VOLTAR AOS TREINOS
        </button>
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
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* FLOATING XP */}
      <AnimatePresence>
        {floatingXps.map((fx) => (
          <motion.div
            key={fx.id}
            initial={{ opacity: 1, y: fx.y, x: fx.x, scale: 0.5 }}
            animate={{ opacity: 0, y: fx.y - 100, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed z-50 font-bold font-display pointer-events-none drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] text-amber-400"
            style={{ textShadow: "0 0 10px rgba(245,158,11,0.8)" }}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
          >
            <div className="bg-surface border border-amber-500/40 rounded-3xl p-6 w-full max-w-xs shadow-[0_0_30px_rgba(245,158,11,0.25)] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-3xl">🏆</span>
              </div>
              <h2 className="text-amber-500 font-extrabold text-lg uppercase tracking-wider">
                Novo Recorde !
              </h2>
              <p className="text-[11px] text-text-secondary mt-1 uppercase font-bold tracking-widest">
                {prCelebration.name}
              </p>
              <div className="mt-4 bg-background/50 border border-white/5 p-3 rounded-xl">
                <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">
                  Novo Marco de {prCelebration.type}
                </span>
                <span className="text-2xl font-extrabold font-mono text-white">
                  {prCelebration.val}{" "}
                  {prCelebration.type === "Repetições" ? "Reps" : "kg"}
                </span>
              </div>
              <p className="text-[10px] text-text-secondary mt-3 leading-relaxed">
                Você superou seus limites do passado. Continue subindo de nível!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="bg-surface/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between sticky top-0 z-40 shadow-sm px-5 py-4">
        <button
          onClick={() => setShowCancelModal(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="text-center flex flex-col items-center">
          {currentPlan?.phases && currentPlan.phases.length > 0 && (
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 bg-white/5 px-2 py-0.5 rounded">
              Fase {(currentPlan.currentPhaseIndex || 0) + 1} • Sem {(currentPlan.currentWeekIndex || 0) + 1}
            </span>
          )}
          <h3 className="font-black uppercase tracking-widest leading-none mb-1 text-[13px] text-neon-blue">
            {todayPlan.dayName}
          </h3>
          <div className="flex gap-2 items-center">
            <span className="font-mono flex items-center gap-1.5 text-xs text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-2 py-0.5 rounded font-bold">
              <Clock size={12} /> {formatedWorkoutTimer()}
            </span>
            <span
              className="font-extrabold cursor-pointer transition-colors text-xs text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded hover:bg-white/10"
              onClick={() => setShowOverview(true)}
            >
              {activeExerciseIndex + 1} / {exercises.length}{" "}
              <Search size={12} className="inline ml-1" />
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-white bg-white/5 border border-white/5 hover:bg-white/10 rounded-full transition-all focus:outline-none"
          >
            <Settings size={20} />
          </button>
          
          <button
            onClick={finishWorkout}
            className="text-[11px] text-white bg-gradient-to-r from-emerald-500 to-emerald-600 font-extrabold uppercase tracking-widest px-4 py-3 rounded-2xl shadow-[0_2px_10px_rgba(16,185,129,0.3)] hover:brightness-110 transition-colors active:scale-95"
          >
            CONCLUIR
          </button>
        </div>
      </div>

      {/* MAIN WORKOUT VIEW */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* CONSOLE DE TESTES (SIMPLIFICADO) */}
        <div className="mb-4 bg-surface border border-surface-light rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setShowConsole(!showConsole)}
            className="w-full p-4 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-bold uppercase tracking-wider flex items-center gap-2">
                🚀 Controle de Testes
              </span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
              {showConsole ? "Ocultar" : "Mostrar"}
            </div>
          </button>

          <motion.div
            initial={false}
            animate={{
              opacity: showConsole ? 1 : 0,
              height: showConsole ? "auto" : 0,
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-6 border-t border-surface-light">
              
              {/* TÉCNICAS RÁPIDAS */}
              <div className="space-y-3 pt-4">
                <label className="text-xs text-text-secondary font-bold uppercase tracking-wider">
                  Testar Técnicas Avançadas
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => seedPhase4Scenario("superset")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${exercises[0]?.supersetGroup === "A1" ? "bg-neon-blue text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Superset A1-A2
                  </button>
                  <button
                    onClick={() => seedPhase4Scenario("Drop Set")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${currentExercise?.advancedTechnique === "Drop Set" ? "bg-neon-purple text-white" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Drop Set
                  </button>
                  <button
                    onClick={() => seedPhase4Scenario("Rest Pause")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${currentExercise?.advancedTechnique === "Rest Pause" ? "bg-white text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Rest Pause
                  </button>
                  <button
                    onClick={() => seedPhase4Scenario("Cluster Set")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${currentExercise?.advancedTechnique === "Cluster Set" ? "bg-emerald-500 text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Cluster Set
                  </button>
                  <button
                    onClick={() => seedPhase4Scenario("Myo Reps")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${currentExercise?.advancedTechnique === "Myo Reps" ? "bg-amber-500 text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Myo Reps
                  </button>
                  <button
                    onClick={() => seedPhase4Scenario("FST-7")}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-colors ${currentExercise?.advancedTechnique === "FST-7" ? "bg-red-500 text-white" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    FST-7
                  </button>
                </div>
              </div>

              {/* SIMULAR HISTÓRICO */}
              <div className="space-y-3 pt-2 border-t border-surface-light/30">
                <label className="text-xs text-text-secondary font-bold uppercase tracking-wider">
                  Simular Nível do Atleta
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => seedScenario("novo")}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${activeScenario === "novo" ? "bg-neon-blue text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Iniciante
                  </button>
                  <button
                    onClick={() => seedScenario("intermediario")}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${activeScenario === "intermediario" ? "bg-amber-500 text-black" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Intermediário
                  </button>
                  <button
                    onClick={() => seedScenario("avancado")}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${activeScenario === "avancado" ? "bg-red-500 text-white" : "bg-surface-light hover:bg-white/10 text-white"}`}
                  >
                    Avançado
                  </button>
                </div>
              </div>

              {/* AJUSTES RELÂMPAGO DO EXERCÍCIO */}
              {currentExercise && (
                <div className="space-y-4 pt-2 border-t border-surface-light/30">
                  <label className="text-xs text-text-secondary font-bold uppercase tracking-wider">
                    Ajustar Exercício Atual ({currentExercise.name})
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-light rounded-xl p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-text-secondary mb-2">Séries</span>
                      <div className="flex w-full items-center justify-between">
                        <button
                          onClick={() => handleEditExercise(activeExerciseIndex, "sets", Math.max(1, (currentExercise.sets || 3) - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          -
                        </button>
                        <span className="text-white font-bold text-lg">{currentExercise.sets}</span>
                        <button
                          onClick={() => handleEditExercise(activeExerciseIndex, "sets", (currentExercise.sets || 3) + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-lg text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-surface-light rounded-xl p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-text-secondary mb-2">Repetições</span>
                      <input
                        type="text"
                        value={currentExercise.reps || ""}
                        onChange={(e) => handleEditExercise(activeExerciseIndex, "reps", e.target.value)}
                        className="w-full bg-transparent text-white font-bold text-center text-lg outline-none placeholder:text-white/30"
                        placeholder="Ex: 10"
                      />
                    </div>

                    <div className="bg-surface-light rounded-xl p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-text-secondary mb-2">Descanso (s)</span>
                      <input
                        type="number"
                        value={currentExercise.restSeconds || 0}
                        onChange={(e) => handleEditExercise(activeExerciseIndex, "restSeconds", parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent text-white font-bold text-center text-lg outline-none placeholder:text-white/30"
                        placeholder="60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setCompletedSets([]);
                        const newCompletedMap = { ...completedSetsMap, [activeExerciseIndex]: [] };
                        setCompletedSetsMap(newCompletedMap);
                        setSeedingFeedback("Séries apagadas.");
                      }}
                      className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold transition-colors"
                    >
                      Zerar Progresso
                    </button>
                    
                    <button
                      onClick={() => {
                        const w = selectedProgressionWeek >= 4 ? 0 : selectedProgressionWeek + 1;
                        setSelectedProgressionWeek(w);
                      }}
                      className="py-3 bg-surface-light hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-colors"
                    >
                      Ciclo: {selectedProgressionWeek === 0 ? "Auto" : `Semana ${selectedProgressionWeek}`}
                    </button>
                  </div>
                </div>
              )}

              {seedingFeedback && (
                <div className="bg-emerald-500/10 text-emerald-500 p-3 rounded-xl text-sm text-center font-medium">
                  {seedingFeedback}
                </div>
              )}
            </div>
          </motion.div>
        </div>

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
                {/* TECHNIQUE & SUPERSET BADGES */}
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {currentExercise.supersetGroup && (
                    <span className="text-[10px] bg-neon-blue/20 border border-neon-blue text-neon-blue font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                      🔄 Execução Combinada ({currentExercise.supersetGroup})
                    </span>
                  )}
                  {currentExercise.advancedTechnique &&
                    currentExercise.advancedTechnique !== "Nenhuma" && (
                      <span className="text-[10px] bg-red-500/20 border border-red-500 text-red-500 font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
                        🔥 Técnica Otimizada: {currentExercise.advancedTechnique}
                      </span>
                    )}
                </div>
                <h1 className="text-3xl font-black text-white mb-1.5 leading-tight px-4 drop-shadow-md">
                  {currentExercise.name}
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Foco Primário: <span className="text-neon-blue">{currentExercise.targetMuscles?.join(", ") || "Corpo Todo"}</span>
                </p>
              </div>

              <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-2 shadow-xl">
                <div className="text-[9px] uppercase tracking-widest text-slate-400 font-black">
                  🎯 OBJETIVO DA SÉRIE
                </div>
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase text-neon-blue font-black mb-1">Repetições</span>
                    <span className="text-3xl font-black text-white drop-shadow-md">{currentExercise.reps}</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase text-neon-blue font-black mb-1">Descanso</span>
                    <span className="text-2xl font-black text-neon-blue mt-0.5">{currentExercise.restSeconds || 60}s</span>
                  </div>
                </div>
              </div>

              {/* Botão de Como Realizar */}
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="w-full py-3 bg-surface border border-surface-light hover:border-white/20 transition-all rounded-xl text-sm font-bold text-text-secondary flex items-center justify-center gap-2"
              >
                <Play size={16} className={showDemo ? "text-neon-blue" : ""} />{" "}
                {showDemo ? "Ocultar Instruções" : "Como Realizar?"}
              </button>

              <motion.div
                initial={false}
                animate={{
                  opacity: showDemo ? 1 : 0,
                  height: showDemo ? "auto" : 0,
                }}
                className="space-y-4 overflow-hidden"
              >
                {/* Video Demonstrativo / Visual Placeholder */}
                <div className="bg-background border border-surface-light rounded-2xl overflow-hidden aspect-video relative p-0 shadow-inner group mt-4">
                  <ExerciseMedia
                    exerciseNameOrId={
                      currentExercise.libraryId ||
                      currentExercise.name ||
                      currentExercise.id
                    }
                    fallbackMuscle={
                      libraryExercise?.targetMuscles?.[0] ||
                      currentExercise.targetMuscles?.[0] ||
                      currentExercise.target ||
                      "Corpo Todo"
                    }
                    priority={true}
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-[10px] font-bold text-neon-blue uppercase backdrop-blur-sm shadow border border-neon-blue/20">
                    Demonstração
                  </div>
                </div>

                {/* Interactive Mode Selector: View vs Edit */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mt-2">
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                    Guia de Exercício
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setIsEditingInstructions(false);
                      }}
                      className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                        !isEditingInstructions
                          ? "bg-neon-blue/15 text-neon-blue border border-neon-blue/20"
                          : "bg-surface text-text-secondary hover:text-white"
                      }`}
                    >
                      📖 Aula
                    </button>
                    <button
                      onClick={() => {
                        const actualInst = currentExercise.instructions || libraryExercise?.instructions || "";
                        const actualErrors = currentExercise.commonErrors && currentExercise.commonErrors.length > 0
                          ? currentExercise.commonErrors
                          : libraryExercise?.commonErrors && libraryExercise.commonErrors.length > 0
                            ? libraryExercise.commonErrors
                            : getCommonErrorsForExercise(currentExercise.name, currentExercise.targetMuscles || []);

                        setTempInstructions(actualInst);
                        setTempErrorsText(actualErrors.join("\n"));
                        setIsEditingInstructions(true);
                      }}
                      className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                        isEditingInstructions
                          ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/20"
                          : "bg-surface text-text-secondary hover:text-white"
                      }`}
                    >
                      ✏️ Editar Guia
                    </button>
                  </div>
                </div>

                {!isEditingInstructions ? (
                  <>
                    {/* VIEW MODE */}
                    {(currentExercise.instructions || libraryExercise?.instructions) && (
                      <div className="bg-surface/50 border-l-2 border-neon-purple p-3 rounded-r text-xs text-text-secondary">
                        <span className="font-bold text-neon-purple uppercase tracking-widest block mb-1">
                          Instruções de Execução
                        </span>
                        <ul className="space-y-1">
                          {(currentExercise.instructions || libraryExercise?.instructions)
                            ?.split(".")
                            .map((s: string) => s.trim())
                            .filter((s: string) => s.length > 5)
                            .map((inst: string, i: number) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-neon-purple mt-0.5">•</span>{" "}
                                <span>{inst}.</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-surface/50 border-l-2 border-amber-500 p-3 rounded-r text-text-secondary text-xs">
                      <span className="font-bold text-amber-500 uppercase tracking-widest block mb-1 flex items-center gap-1">
                        <AlertTriangle size={12} /> Erros Comuns
                      </span>
                      <ul className="space-y-1">
                        {(currentExercise.commonErrors && currentExercise.commonErrors.length > 0
                          ? currentExercise.commonErrors
                          : libraryExercise?.commonErrors && libraryExercise.commonErrors.length > 0
                            ? libraryExercise.commonErrors
                            : getCommonErrorsForExercise(
                                currentExercise.name,
                                currentExercise.targetMuscles || [],
                              )
                        ).map((error, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-amber-500 mt-0.5">•</span>{" "}
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  /* EDIT MODE */
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] text-neon-purple font-extrabold uppercase tracking-widest block">
                        Instruções (separando os passos com pontos finais)
                      </label>
                      <textarea
                        value={tempInstructions}
                        onChange={(e) => setTempInstructions(e.target.value)}
                        rows={4}
                        className="w-full bg-background border border-surface-light rounded-xl p-2.5 text-xs text-white outline-none focus:border-neon-purple font-sans leading-relaxed"
                        placeholder="Ex: Mantenha as escápulas retraídas. Desça a barra de forma controlada até o peito. Empurre explosivamente."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">
                        Erros Comuns (um erro por linha)
                      </label>
                      <textarea
                        value={tempErrorsText}
                        onChange={(e) => setTempErrorsText(e.target.value)}
                        rows={3}
                        className="w-full bg-background border border-surface-light rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-sans leading-relaxed"
                        placeholder="Ex: Tirar glúteos do banco&#10;Bater a barra no peito&#10;Desalinhar ombros"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const errorsList = tempErrorsText
                            .split("\n")
                            .map((s) => s.trim())
                            .filter((s) => s.length > 2);

                          handleEditExercise(activeExerciseIndex, "instructions", tempInstructions);
                          handleEditExercise(activeExerciseIndex, "commonErrors", errorsList);
                          setIsEditingInstructions(false);
                        }}
                        className="flex-1 py-2 bg-gradient-to-r from-neon-purple to-neon-blue text-background font-black text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity cursor-pointer text-center"
                      >
                        💾 Salvar Alterações
                      </button>
                      <button
                        onClick={() => setIsEditingInstructions(false)}
                        className="px-4 py-2 bg-surface-light hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* SISTEMA DE PROGRESSÃO INTELIGENTE DE CARGA EVOLUX */}
              {progressionStats && (
                <div className="bg-surface border border-surface-light rounded-2xl p-4 space-y-4 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-[30px] pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue">
                        <Zap size={12} className="fill-neon-blue/20" />
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        Sugestão Evolux
                      </span>
                    </div>
                    {progressionStats.status === "new" ? (
                      <span className="text-[9px] font-extrabold uppercase bg-surface-light border border-white/10 px-2 py-0.5 rounded text-text-secondary animate-pulse">
                        Estágio Inicial
                      </span>
                    ) : progressionStats.status === "progressed" ? (
                      <span className="text-[9px] font-extrabold uppercase bg-neon-blue/10 border border-neon-blue/30 px-2 py-0.5 rounded text-neon-blue animate-pulse">
                        Sinal de Evolução
                      </span>
                    ) : progressionStats.status === "maintain" ||
                      progressionStats.status === "maintained" ? (
                      <span className="text-[9px] font-extrabold uppercase bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-amber-500">
                        Estabilização
                      </span>
                    ) : (
                      <span className="text-[9px] font-extrabold uppercase bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded text-rose-400">
                        Regeneração
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-background/40 p-2.5 rounded-xl border border-surface-light/40">
                      <span className="block text-[8px] font-bold text-text-secondary uppercase mb-1">
                        Última Carga
                      </span>
                      <span className="text-sm font-bold font-mono text-white">
                        {progressionStats.lastWeight !== null
                          ? `${progressionStats.lastWeight} kg`
                          : "--"}
                      </span>
                    </div>
                    <div className="bg-background/40 p-2.5 rounded-xl border border-surface-light/40">
                      <span className="block text-[8px] font-bold text-text-secondary uppercase mb-1">
                        Melhor Carga
                      </span>
                      <span className="text-sm font-bold font-mono text-white">
                        {progressionStats.bestWeight !== null
                          ? `${progressionStats.bestWeight} kg`
                          : "--"}
                      </span>
                    </div>
                    <div
                      className={`p-2.5 rounded-xl border ${
                        progressionStats.status === "progressed"
                          ? "bg-neon-blue/10 border-neon-blue/30 text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                          : progressionStats.status === "deload"
                            ? "bg-rose-500/15 border-rose-500/20 text-rose-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      }`}
                    >
                      <span className="block text-[8px] font-bold uppercase mb-1 opacity-70">
                        Sugestão
                      </span>
                      <span className="text-sm font-extrabold font-mono">
                        {progressionStats.suggestedWeight} kg
                      </span>
                    </div>
                  </div>

                  <div className="p-2 px-3 bg-background/60 rounded-xl border border-surface-light text-[11px] text-text-secondary flex items-start gap-2">
                    <div className="mt-0.5 text-amber-500">
                      <AlertTriangle size={12} />
                    </div>
                    <p className="leading-normal">{progressionStats.reason}</p>
                  </div>
                </div>
              )}

              {/* ⚡ INTERACTIVE CONSOLE FOR ADVANCED TECHNICAL PROTOCOLS */}
              {techniqueEngine.state.isActive && techniqueEngine.state.type !== null && techniqueEngine.state.type !== "Nenhuma" && (
                <div className="mb-4">
                  <TechniqueController
                    state={techniqueEngine.state}
                    onAdvance={(payload) => {
                      // Optional: save to internal logs so History can extract it later
                      const stepKey = `${activeExerciseIndex}-tech-${techniqueEngine.state.completedStages}`;
                      setSetLogs(prev => ({
                        ...prev,
                        [stepKey]: { reps: String(payload.reps), weight: String(payload.weight) }
                      }));

                      techniqueEngine.advanceStage(payload);
                      spawnXp(25);
                      confetti({
                        particleCount: 30,
                        spread: 40,
                        colors: ["#b026ff", "#00f0ff"],
                      });
                    }}
                    onComplete={() => {
                      // Finalize the whole set inside the system
                      handleCompleteSet(completedSets.length + 1);
                      techniqueEngine.resetTechnique();
                    }}
                  />
                </div>
              )}

              {/* Sets List */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-neon-blue">
                    Execução de Séries
                  </h4>
                  <span className="font-bold text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded-lg">
                    Série {completedSets.length + 1} de {currentExercise.sets}
                  </span>
                </div>
                {Array.from({ length: currentExercise.sets }).map((_, i) => {
                  const isCompleted = completedSets.includes(i + 1);
                  const isCurrent = !isCompleted && completedSets.length === i; // The one you should be doing next
                  const logKey = `${activeExerciseIndex}-${i + 1}`;
                  const log = setLogs[logKey] || { reps: "", weight: "" };

                  return (
                    <div
                      key={i}
                      className={`flex flex-col rounded-2xl border transition-all duration-300 ${
                        isCompleted 
                          ? "bg-emerald-950/20 border-emerald-500/50 p-3 opacity-80" 
                          : isCurrent 
                            ? "bg-surface-light border-neon-blue border p-4 shadow-[0_0_20px_rgba(0,210,255,0.15)] transform scale-[1.01] z-10" 
                            : "bg-surface/30 border-white/5 p-3 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-mono font-black text-sm uppercase tracking-wider ${isCompleted ? "text-emerald-400" : isCurrent ? "text-neon-blue" : "text-slate-500"}`}
                        >
                          SÉRIE {i + 1}
                        </span>
                        {isCompleted ? (
                          <div className="font-bold uppercase flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] text-emerald-400">
                            <CheckCircle size={12} /> Salvo
                          </div>
                        ) : isCurrent ? (
                          <div className="font-bold uppercase flex items-center gap-1 animate-pulse text-xs text-neon-blue">
                            🎯 Fazer Agora
                          </div>
                        ) : null}
                      </div>

                      <div className={`flex items-center ${isCurrent ? "flex-col gap-3" : "gap-3"}`}>
                        <div className="flex-1 flex flex-col relative group w-full">
                          <label className="uppercase mb-1 font-bold tracking-widest text-[9px] text-slate-400">
                            Repetições
                          </label>
                          <input
                            type="number"
                            value={log.reps}
                            onChange={(e) =>
                              handleLogChange({
                                exerciseIndex: activeExerciseIndex,
                                setNumber: i + 1,
                                field: "reps",
                                value: e.target.value,
                              })
                            }
                            placeholder={
                              currentExercise.reps?.split("-")[0] || ""
                            }
                            className={`bg-background/80 backdrop-blur-sm border rounded-xl text-white font-mono font-bold outline-none transition-all w-full text-center ${
                              isCurrent 
                                ? "px-3 py-2.5 text-lg border-neon-blue/50 focus:border-neon-blue shadow-inner" 
                                : "px-2.5 py-2 text-sm border-white/10 focus:border-white/30"
                            }`}
                          />
                        </div>

                        <div className="flex-1 flex flex-col relative group w-full">
                          <label className="uppercase mb-1 font-bold tracking-widest flex items-center justify-between w-full text-[9px] text-slate-400">
                            <span>Carga (kg)</span>
                            {!isCompleted &&
                              progressionStats?.suggestedWeight > 0 && (
                                <span className="bg-neon-blue/10 px-1.5 rounded text-[9px] text-neon-blue font-black border border-neon-blue/20">
                                  Rec: {progressionStats.suggestedWeight}
                                </span>
                              )}
                          </label>
                          <input
                            type="number"
                            value={log.weight}
                            onChange={(e) =>
                              handleLogChange({
                                exerciseIndex: activeExerciseIndex,
                                setNumber: i + 1,
                                field: "weight",
                                value: e.target.value,
                              })
                            }
                            placeholder={
                              progressionStats?.suggestedWeight > 0
                                ? String(progressionStats.suggestedWeight)
                                : "--"
                            }
                            className={`bg-background/80 backdrop-blur-sm border rounded-xl text-white font-mono font-bold outline-none transition-all w-full text-center ${
                              isCurrent 
                                ? "px-3 py-2.5 text-lg border-neon-blue/50 focus:border-neon-blue shadow-inner" 
                                : "px-2.5 py-2 text-sm border-white/10 focus:border-white/30"
                            }`}
                          />
                        </div>

                        {!isCurrent && (
                          <button
                            onClick={() => handleCompleteSet(i + 1)}
                            disabled={isCompleted}
                            className={`mt-[18px] self-end p-2 h-[34px] w-[34px] shrink-0 flex items-center justify-center rounded-xl font-bold uppercase tracking-widest transition-all ${isCompleted ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 opacity-50 cursor-not-allowed" : "bg-surface-light text-slate-400 hover:text-white border border-white/10 hover:border-white/30"}`}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                      </div>

                      {/* GIGANTIC BUTTON FOR CURRENT SET */}
                      {isCurrent && (
                        <button
                          onClick={() => handleCompleteSet(i + 1)}
                          className="w-full mt-3 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-black rounded-xl font-black tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,210,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <CheckCircle size={18} /> SALVAR SÉRIE {i + 1} ⚡
                        </button>
                      )}

                      {/* 1RM Display below inputs */}
                      {log.reps &&
                        log.weight &&
                        !isCompleted &&
                        parseInt(log.reps) > 0 &&
                        parseFloat(log.weight) > 0 && (
                          <div className="mt-3 flex justify-between items-center text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                            <span className="text-slate-400 uppercase tracking-widest font-bold">
                              Força Máxima Estimada
                            </span>
                            <span className="text-neon-blue font-mono font-bold text-xs">
                              {Math.round(
                                calculate1RM(
                                  parseFloat(log.weight) || 0,
                                  parseInt(log.reps) || 0,
                                ),
                              )}{" "}
                              kg
                            </span>
                          </div>
                        )}

                      {isCompleted &&
                        log.reps &&
                        log.weight &&
                        parseInt(log.reps) > 0 &&
                        parseFloat(log.weight) > 0 && (
                          <div className="mt-3 flex justify-between items-center text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                            <span className="text-emerald-500/70 uppercase tracking-widest font-bold">
                              1RM
                            </span>
                            <span className="text-emerald-400 font-mono font-bold text-xs">
                              {Math.round(
                                calculate1RM(
                                  parseFloat(log.weight) || 0,
                                  parseInt(log.reps) || 0,
                                ),
                              )}{" "}
                              kg
                            </span>
                          </div>
                        )}
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
      {/* PHASE TIMERS - COMPACT BARS */}
      <AnimatePresence>
        {isResting && (
           <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-surface/95 backdrop-blur-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-50 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
               <div className="bg-neon-blue/10 text-neon-blue p-3 rounded-2xl">
                 <Clock size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-400 text-[10px] tracking-widest uppercase mb-0.5">
                    Descanso
                  </h3>
                  <div className="font-mono font-black tracking-tighter text-2xl text-neon-blue">
                    {formatTime(restTimer)}
                  </div>
               </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setRestTimer((t) => t + 15)}
                className="rounded-xl font-bold transition-colors cursor-pointer bg-white/5 border border-white/10 px-4 py-2 text-white text-xs hover:bg-white/10"
              >
                +15s
              </button>
              <button
                onClick={() => {
                  setIsResting(false);
                  startPrep();
                }}
                className="rounded-xl uppercase font-black tracking-wider flex items-center justify-center transition-transform cursor-pointer bg-gradient-to-r from-neon-blue to-neon-purple text-black px-6 py-2 text-xs shadow-lg active:scale-95"
              >
                PULAR
              </button>
            </div>
          </motion.div>
        )}

        {isPreparing && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-neon-blue/10 backdrop-blur-3xl border-t border-neon-blue/50 shadow-[0_-10px_30px_rgba(0,210,255,0.2)] z-50 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
               <div className="bg-neon-blue/20 text-neon-blue p-3 rounded-2xl animate-pulse">
                 <AlertTriangle size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-neon-blue/70 text-[10px] tracking-widest uppercase mb-0.5">
                    Prepare-se
                  </h3>
                  <div className="font-mono font-black tracking-tighter text-2xl text-neon-blue">
                    {formatTime(prepTimer)}
                  </div>
               </div>
            </div>

            <button
                onClick={() => {
                  setIsPreparing(false);
                  startExec();
                }}
                className="rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-transform cursor-pointer bg-neon-blue px-8 py-2 text-black text-xs shadow-lg active:scale-95"
              >
                COMEÇAR
              </button>
          </motion.div>
        )}

        {isExecutingAuto && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-950/80 backdrop-blur-3xl border-t border-emerald-500/50 shadow-[0_-10px_30px_rgba(16,185,129,0.2)] z-50 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
               <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl">
                 <Dumbbell size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-emerald-400/70 text-[10px] tracking-widest uppercase mb-0.5">
                    Executando
                  </h3>
                  <div className="font-mono font-black tracking-tighter text-2xl text-emerald-400">
                    {formatTime(execTimer)}
                  </div>
               </div>
            </div>

            <button
                onClick={() => {
                  setIsExecutingAuto(false);
                  handleCompleteSet(completedSets.length + 1);
                }}
                className="rounded-xl font-black uppercase flex items-center justify-center gap-2 tracking-wider transition-transform cursor-pointer bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-2 text-black text-xs shadow-lg active:scale-95"
              >
                <CheckCircle size={16} /> CONCLUIR
              </button>
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
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface w-full max-w-sm rounded-[32px] p-6 border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl font-black mb-2 flex items-center gap-2 text-red-400">
                <AlertTriangle size={20} />
                Sair do Treino
              </h3>
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                Tem certeza que deseja sair? O progresso não salvo deste treino será perdido e a sessão será encerrada.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setActiveWorkoutSession(null);
                    navigate("/workouts");
                  }}
                  className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-95 bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  Sim, Sair do Treino
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Continuar Treinando
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
          >
            <div className="bg-surface border border-surface-light rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Cofigurações de Execução
              </h2>

              <div className="space-y-5">
                {/* Auto Advance Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">
                      Avanço Automático
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Fluidez Preparation → Execução → Descanso
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      updateSettings({
                        autoAdvanceEnabled: !settings?.autoAdvanceEnabled,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings?.autoAdvanceEnabled ? "bg-neon-blue" : "bg-surface-light"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.autoAdvanceEnabled ? "left-7" : "left-1"}`}
                    />
                  </button>
                </div>

                {/* Preparation Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">
                      Tempo de Preparação
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      updateSettings({
                        preparationEnabled: !settings?.preparationEnabled,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings?.preparationEnabled ? "bg-neon-blue" : "bg-surface-light"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.preparationEnabled ? "left-7" : "left-1"}`}
                    />
                  </button>
                </div>
                {settings?.preparationEnabled && (
                  <input
                    type="number"
                    value={settings?.preparationTimeSeconds || 15}
                    onChange={(e) =>
                      updateSettings({
                        preparationTimeSeconds: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-background rounded-xl p-3 text-white border border-surface-light text-sm"
                    placeholder="Segundos"
                  />
                )}

                {/* Execution Timer (Only visible if auto advance) */}
                {settings?.autoAdvanceEnabled && (
                  <div>
                    <p className="text-white font-bold text-sm mb-2">
                      Tempo Estimado de Execução (s)
                    </p>
                    <input
                      type="number"
                      value={settings?.estimatedSetTimeSeconds || 45}
                      onChange={(e) =>
                        updateSettings({
                          estimatedSetTimeSeconds:
                            parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-background rounded-xl p-3 text-white border border-surface-light text-sm"
                      placeholder="Segundos"
                    />
                  </div>
                )}

                {/* Sounds & Vibrations */}
                <div className="pt-4 border-t border-surface-light flex items-center justify-between">
                  <p className="text-white font-bold text-sm">Sons e Alertas</p>
                  <button
                    onClick={() =>
                      updateSettings({ soundEnabled: !settings?.soundEnabled })
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings?.soundEnabled ? "bg-neon-purple" : "bg-surface-light"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.soundEnabled ? "left-7" : "left-1"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold text-sm">
                    Vibração Haptic
                  </p>
                  <button
                    onClick={() =>
                      updateSettings({
                        vibrationEnabled: !settings?.vibrationEnabled,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings?.vibrationEnabled ? "bg-neon-purple" : "bg-surface-light"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings?.vibrationEnabled ? "left-7" : "left-1"}`}
                    />
                  </button>
                </div>

                {/* CONSOLE DE VALIDAÇÃO DE CARGAS - FASE 2 */}
                <div className="pt-4 border-t border-surface-light space-y-2">
                  <p className="text-neon-blue font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                    <Zap
                      size={12}
                      className="fill-neon-blue/10 animate-bounce"
                    />{" "}
                    Console de Testes Evolux
                  </p>
                  <p className="text-[10px] text-text-secondary leading-normal">
                    Selecione um cenário de validação para instanciar históricos
                    reais no banco de dados local e verificar o cálculo de
                    sugestões:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => seedScenario("novo")}
                      className="py-1.5 px-1 bg-surface-light hover:bg-white/10 rounded-lg text-[9px] font-bold text-white border border-white/5 uppercase transition-all"
                    >
                      Novo
                    </button>
                    <button
                      onClick={() => seedScenario("intermediario")}
                      className="py-1.5 px-1 bg-neon-blue/15 hover:bg-neon-blue/20 rounded-lg text-[9px] font-bold text-neon-blue border border-neon-blue/20 uppercase transition-all"
                    >
                      Intermediário
                    </button>
                    <button
                      onClick={() => seedScenario("avancado")}
                      className="py-1.5 px-1 bg-neon-purple/15 hover:bg-neon-purple/20 rounded-lg text-[9px] font-bold text-neon-purple border border-neon-purple/20 uppercase transition-all"
                    >
                      Avançado
                    </button>
                  </div>
                  {seedingFeedback && (
                    <div className="mt-2 bg-background/50 border border-white/5 p-2 rounded-xl text-[10px] text-text-secondary leading-relaxed">
                      <span className="text-white font-bold block mb-0.5">
                        Status do Simulador:
                      </span>
                      {seedingFeedback}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full mt-8 bg-white text-black py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200"
              >
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
              <button
                onClick={() => setShowOverview(false)}
                className="p-2 text-text-secondary hover:text-white bg-surface-light rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {todayPlan?.warmup && todayPlan.warmup.length > 0 && (
                <div className="p-4 rounded-xl border bg-surface border-surface-light mb-6">
                  <h3 className="font-bold text-white text-[15px] mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-amber-500" />
                    Aquecimento & Mobilidade
                  </h3>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                    {todayPlan.warmup.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {exercises.map((ex, idx) => (
                <div
                  key={`${ex.id}-${idx}`}
                  className={`p-4 rounded-xl border ${idx === activeExerciseIndex ? "bg-neon-blue/5 border-neon-blue" : idx < activeExerciseIndex ? "bg-emerald-500/5 border-emerald-500/30 opacity-70" : "bg-surface border-surface-light"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4 w-full">
                      <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shrink-0 border border-white/10 bg-background/50 relative">
                        <ExerciseMedia exerciseNameOrId={ex.id || ex.name} fallbackMuscle={ex.targetMuscles?.[0]} />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-bold text-white text-[15px] leading-tight break-words">{ex.name}</h4>
                        {idx === activeExerciseIndex && (
                          <span className="inline-block mt-1.5 text-[10px] text-neon-blue font-bold uppercase border border-neon-blue/30 px-2 py-0.5 rounded">
                            Atual
                          </span>
                        )}
                        {idx < activeExerciseIndex && (
                          <span className="inline-block mt-1.5 text-[10px] text-emerald-500 font-bold uppercase">
                            <CheckCircle size={14} className="inline mr-1" /> Concluído
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-background rounded-lg p-2 border border-white/5">
                      <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">
                        Séries
                      </label>
                      <input
                        type="number"
                        disabled={idx < activeExerciseIndex}
                        value={ex.sets}
                        onChange={(e) =>
                          handleEditExercise(
                            idx,
                            "sets",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="bg-background rounded-lg p-2 border border-white/5">
                      <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">
                        Reps
                      </label>
                      <input
                        type="text"
                        disabled={idx < activeExerciseIndex}
                        value={ex.reps}
                        onChange={(e) =>
                          handleEditExercise(idx, "reps", e.target.value)
                        }
                        className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="bg-background rounded-lg p-2 border border-white/5">
                      <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">
                        Descanso (s)
                      </label>
                      <input
                        type="number"
                        disabled={idx < activeExerciseIndex}
                        value={ex.restSeconds}
                        onChange={(e) =>
                          handleEditExercise(
                            idx,
                            "restSeconds",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-transparent text-white font-bold text-sm outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Advanced technique and superset manual config */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-background rounded-lg p-2 border border-white/5">
                      <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">
                        Técnica Avançada
                      </label>
                      <select
                        disabled={idx < activeExerciseIndex}
                        value={ex.advancedTechnique || ""}
                        onChange={(e) =>
                          handleEditExercise(
                            idx,
                            "advancedTechnique",
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent text-white font-extrabold text-[10px] outline-none border-none max-w-full disabled:opacity-50 cursor-pointer"
                      >
                        <option value="" className="bg-surface text-white">
                          Nenhuma
                        </option>
                        <option
                          value="Drop Set"
                          className="bg-surface text-white"
                        >
                          Drop Set
                        </option>
                        <option
                          value="Rest Pause"
                          className="bg-surface text-white"
                        >
                          Rest Pause
                        </option>
                        <option
                          value="Cluster Set"
                          className="bg-surface text-white"
                        >
                          Cluster Set
                        </option>
                        <option
                          value="Myo Reps"
                          className="bg-surface text-white"
                        >
                          Myo Reps
                        </option>
                        <option value="FST-7" className="bg-surface text-white">
                          FST-7
                        </option>
                        <option
                          value="Bi-set"
                          className="bg-surface text-white"
                        >
                          Bi-set
                        </option>
                        <option
                          value="Tri-set"
                          className="bg-surface text-white"
                        >
                          Tri-set
                        </option>
                        <option
                          value="Circuito"
                          className="bg-surface text-white"
                        >
                          Circuito
                        </option>
                      </select>
                    </div>
                    <div className="bg-background rounded-lg p-2 border border-white/5">
                      <label className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block mb-1">
                        Grupo Superset (ex: A1)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: A1, A2"
                        disabled={idx < activeExerciseIndex}
                        value={ex.supersetGroup || ""}
                        onChange={(e) =>
                          handleEditExercise(
                            idx,
                            "supersetGroup",
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent text-white font-bold text-[10px] outline-none disabled:opacity-50 placeholder-surface-light"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {todayPlan?.cooldown && todayPlan.cooldown.length > 0 && (
                <div className="p-4 rounded-xl border bg-surface border-surface-light mt-6">
                  <h3 className="font-bold text-white text-[15px] mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-neon-purple" />
                    Resfriamento & Alongamento
                  </h3>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                    {todayPlan.cooldown.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setShowAddMenu(true)}
                className="w-full bg-surface border border-surface-light py-4 rounded-xl text-xs font-bold uppercase text-text-secondary hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
              >
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
              <button
                onClick={() => setShowAddMenu(false)}
                className="p-2 text-text-secondary hover:text-white bg-surface-light rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-surface-light sticky top-[69px] z-10 border-b border-surface-light">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  size={18}
                />
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
                  {addResults.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleAddExercise(ex)}
                      className="bg-surface border border-surface-light p-3 rounded-xl flex items-center gap-4 text-left hover:border-neon-blue/50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded bg-background flex items-center justify-center shrink-0 border border-surface-light">
                        <Dumbbell size={16} className="text-text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate group-hover:text-neon-blue transition-colors">
                          {ex.name}
                        </h4>
                        <p className="text-[10px] text-text-secondary uppercase">
                          {ex.targetMuscles.join(", ")}
                        </p>
                      </div>
                      <Dumbbell
                        size={16}
                        className="text-text-secondary group-hover:text-white shrink-0"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-text-secondary">
                    Nenhum exercício encontrado
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
