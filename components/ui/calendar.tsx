"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  Flame,
  PlaySquare,
  Search,
  Replace,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useWorkoutStore,
  ExerciseDefinition,
  WorkoutDayPlan,
  WorkoutLog,
  ExerciseSetConfig,
} from "@/lib/workoutStore";
import {
  searchExercises,
  ExerciseLibraryItem,
} from "@/lib/exerciseLibrary";
import { getProgressionStats } from "@/lib/loadProgression";
import { ExerciseMedia } from "@/components/workout/ExerciseMedia";

const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const fullDayNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatDateKey(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

interface CalendarDayProps {
  day: number | string;
  isHeader?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  hasCompletedLog?: boolean;
  hasPlannedActivity?: boolean;
  isRestDay?: boolean;
  onClick?: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isHeader,
  isSelected,
  isToday,
  hasCompletedLog,
  hasPlannedActivity,
  onClick,
}) => {
  if (isHeader) {
    return (
      <div className="col-span-1 row-span-1 flex h-8 w-full items-center justify-center">
        <span className="font-mono text-[10px] font-black tracking-wider text-text-secondary uppercase">
          {day}
        </span>
      </div>
    );
  }

  let dayStyle =
    "bg-background/40 text-text-secondary hover:bg-surface-light hover:text-text-primary border border-transparent";

  if (isSelected) {
    dayStyle =
      "bg-neon-blue text-black font-black shadow-[0_0_20px_rgba(0,210,255,0.45)] border border-neon-blue scale-105 z-10";
  } else if (hasCompletedLog) {
    dayStyle =
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-black hover:bg-emerald-500/30";
  } else if (hasPlannedActivity) {
    dayStyle =
      "bg-neon-blue/12 text-neon-blue border border-neon-blue/30 font-bold hover:bg-neon-blue/20";
  }

  if (isToday && !isSelected) {
    dayStyle += " ring-2 ring-neon-purple/80";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`col-span-1 row-span-1 relative flex h-10 sm:h-11 w-full flex-col items-center justify-center rounded-xl transition-all duration-150 cursor-pointer active:scale-95 ${dayStyle}`}
    >
      <span className="text-xs sm:text-sm font-mono tabular-nums leading-none">
        {day}
      </span>

      {/* Activity Marker Dots */}
      <div className="mt-1 flex items-center gap-0.5 h-1.5">
        {hasCompletedLog && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isSelected ? "bg-black" : "bg-emerald-400 shadow-[0_0_6px_#34d399]"
            }`}
          />
        )}
        {!hasCompletedLog && hasPlannedActivity && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isSelected ? "bg-black/70" : "bg-neon-blue"
            }`}
          />
        )}
      </div>
    </button>
  );
};

interface CalendarProps {
  onOpenRoutineEditor?: (dayIndex: number) => void;
  className?: string;
}

export function Calendar({ onOpenRoutineEditor, className = "" }: CalendarProps) {
  const navigate = useNavigate();
  const {
    currentPlan,
    workoutHistory: rawHistory,
  } = useWorkoutStore();

  const workoutHistory = useMemo(
    () => (Array.isArray(rawHistory) ? rawHistory : []),
    [rawHistory]
  );

  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [isDayEditorOpen, setIsDayEditorOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleGoToToday = () => {
    const now = new Date();
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
    setSelectedDate(now);
  };

  // Map a JS Date to the plan schedule index (Monday = 0 ... Sunday = 6)
  const getPlanDayIndex = (date: Date): number => {
    const jsDay = date.getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  };

  // Find workout log for a specific Date
  const getLogForDate = (date: Date): WorkoutLog | undefined => {
    const targetKey = formatDateKey(date);
    return workoutHistory.find((log) => {
      if (!log.date) return false;
      const d = new Date(log.date);
      return formatDateKey(d) === targetKey;
    });
  };

  // Find planned workout for a specific Date (checking dateOverrides first, then weekly schedule)
  const getPlannedDayForDate = (date: Date): WorkoutDayPlan | undefined => {
    if (!currentPlan) return undefined;
    const key = formatDateKey(date);
    if (currentPlan.dateOverrides && currentPlan.dateOverrides[key]) {
      return currentPlan.dateOverrides[key];
    }
    const schedule = currentPlan.schedule || [];
    if (schedule.length === 0) return undefined;
    const idx = getPlanDayIndex(date);
    return schedule[idx] || schedule[0];
  };

  // Monthly statistics
  const monthStats = useMemo(() => {
    let completedCount = 0;
    let activeScheduledDays = 0;
    let totalMonthVolume = 0;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(viewYear, viewMonth, d);
      const log = getLogForDate(dateObj);
      const planned = getPlannedDayForDate(dateObj);

      if (log) {
        completedCount++;
        totalMonthVolume += log.totalVolume || 0;
      }
      if (planned && !planned.isRest && (planned.exercises?.length || 0) > 0) {
        activeScheduledDays++;
      }
    }

    return { completedCount, activeScheduledDays, totalMonthVolume };
  }, [viewYear, viewMonth, daysInMonth, workoutHistory, currentPlan]);

  const selectedLog = useMemo(
    () => getLogForDate(selectedDate),
    [selectedDate, workoutHistory]
  );
  const selectedPlanDay = useMemo(
    () => getPlannedDayForDate(selectedDate),
    [selectedDate, currentPlan]
  );
  const selectedPlanIndex = getPlanDayIndex(selectedDate);

  // Build preview list of exercises with weights & reps for the selected date
  const selectedDayExercisesPreview = useMemo(() => {
    if (selectedLog && selectedLog.exerciseLogs && selectedLog.exerciseLogs.length > 0) {
      return selectedLog.exerciseLogs.map((exLog) => {
        const validSets = (exLog.setsLog || []).filter((s) => s.setNumber !== 99);
        const maxWeight =
          validSets.length > 0
            ? Math.max(...validSets.map((s) => s.weight || 0))
            : 0;
        const repsSummary =
          validSets.length > 0
            ? validSets.map((s) => s.reps).join("/")
            : "10";
        return {
          id: exLog.exerciseId,
          name: exLog.exerciseName,
          setsCount: validSets.length || 3,
          repsDisplay: `${ repsSummary } reps`,
          weightDisplay: `${maxWeight} kg`,
          isFromLog: true,
        };
      });
    }

    if (selectedPlanDay && !selectedPlanDay.isRest && selectedPlanDay.exercises) {
      return selectedPlanDay.exercises.map((ex) => {
        let configuredWeight = ex.weight;
        if (
          (configuredWeight === undefined || configuredWeight === null) &&
          ex.setDetails &&
          ex.setDetails.length > 0
        ) {
          configuredWeight = Math.max(...ex.setDetails.map((s) => s.weight || 0));
        }
        if (configuredWeight === undefined || configuredWeight === null) {
          const stats = getProgressionStats(ex.name, ex.reps, workoutHistory);
          configuredWeight = stats.lastWeight ?? stats.suggestedWeight ?? 0;
        }

        return {
          id: ex.id,
          name: ex.name,
          setsCount: ex.sets || 3,
          repsDisplay: `${ex.reps || "10-12"} reps`,
          weightDisplay: `${configuredWeight} kg`,
          isFromLog: false,
        };
      });
    }

    return [];
  }, [selectedLog, selectedPlanDay, workoutHistory]);

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek)
        .fill(null)
        .map((_, i) => (
          <div
            key={`empty-start-${i}`}
            className="col-span-1 row-span-1 h-10 sm:h-11 w-full"
          />
        )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => {
          const dayNumber = i + 1;
          const dateObj = new Date(viewYear, viewMonth, dayNumber);
          const isSelected =
            formatDateKey(dateObj) === formatDateKey(selectedDate);
          const isToday = formatDateKey(dateObj) === formatDateKey(today);
          const log = getLogForDate(dateObj);
          const planned = getPlannedDayForDate(dateObj);
          const hasPlannedActivity = Boolean(
            planned && !planned.isRest && (planned.exercises?.length || 0) > 0
          );

          return (
            <CalendarDay
              key={`date-${dayNumber}`}
              day={dayNumber}
              isSelected={isSelected}
              isToday={isToday}
              hasCompletedLog={Boolean(log)}
              hasPlannedActivity={hasPlannedActivity}
              isRestDay={Boolean(planned?.isRest)}
              onClick={() => setSelectedDate(dateObj)}
            />
          );
        }),
    ];

    return days;
  };

  return (
    <>
      <BentoCard height="h-auto" className={className} showHoverGradient>
        {/* Save Feedback Toast */}
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} />
                <span>{saveToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setSaveToast(null)}
                className="text-emerald-400/70 hover:text-emerald-300"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid h-full gap-4">
          {/* Top Header & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-neon-blue mb-1">
                <CalendarIcon size={14} />
                <span>Agenda & Controle de Cargas</span>
                <span aria-hidden="true">·</span>
                <span className="text-text-secondary font-mono tabular-nums">
                  {monthStats.completedCount} concluídos no mês
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-text-primary tracking-tight font-display">
                Calendário de Treinos
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Selecione qualquer dia para editar treinos, séries, cargas (kg) e repetições permanentemente.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                onClick={() => setIsDayEditorOpen(true)}
                className="rounded-xl gap-1.5 text-xs px-3.5 py-2 h-10"
              >
                <Edit3 size={14} />
                <span>Editar Cargas & Dia</span>
              </Button>
              {onOpenRoutineEditor && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenRoutineEditor(selectedPlanIndex)}
                  className="rounded-xl gap-1.5 text-xs px-3 py-2 h-10"
                >
                  <Dumbbell size={14} />
                  <span>Ficha Completa</span>
                </Button>
              )}
            </div>
          </div>

          {/* Calendar Box with App Identity */}
          <div className="w-full transition-all duration-300 ease-out">
            <div className="h-full w-full rounded-[24px] border border-surface-light bg-background/60 p-2 transition-colors duration-200 group-hover:border-neon-blue/40">
              <div
                className="h-full rounded-2xl border border-surface-light/80 bg-surface/70 p-3 sm:p-4"
                style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
              >
                {/* Calendar Month Navigation Bar */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-surface-light">
                  <div className="flex items-center gap-2">
                    <p className="text-sm sm:text-base font-black text-text-primary font-display tracking-tight">
                      {monthNames[viewMonth]}{" "}
                      <span className="text-neon-blue font-mono tabular-nums">
                        {viewYear}
                      </span>
                    </p>
                    <span className="h-1 w-1 rounded-full bg-text-secondary/50" />
                    <p className="text-[11px] font-mono tabular-nums text-text-secondary">
                      {monthStats.activeScheduledDays} dias ativos
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {(viewMonth !== today.getMonth() ||
                      viewYear !== today.getFullYear() ||
                      formatDateKey(selectedDate) !== formatDateKey(today)) && (
                      <button
                        type="button"
                        onClick={handleGoToToday}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-neon-blue/10 text-neon-blue border border-neon-blue/25 hover:bg-neon-blue/20 transition-colors mr-1 cursor-pointer"
                      >
                        Hoje
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      aria-label="Mês anterior"
                      className="h-8 w-8 rounded-xl bg-background/80 border border-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-neon-blue/40 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      aria-label="Próximo mês"
                      className="h-8 w-8 rounded-xl bg-background/80 border border-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-neon-blue/40 transition-colors cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Days Grid */}
                <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
                  {renderCalendarDays()}
                </div>

                {/* Legend */}
                <div className="mt-3 pt-2.5 border-t border-surface-light/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-secondary">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Concluído</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-neon-blue" />
                      <span>Treino Planejado</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-neon-purple" />
                      <span>Hoje</span>
                    </span>
                  </div>
                  {monthStats.totalMonthVolume > 0 && (
                    <span className="font-mono tabular-nums text-[11px] text-text-secondary">
                      Vol. Mês:{" "}
                      <strong className="text-text-primary">
                        {monthStats.totalMonthVolume.toLocaleString("pt-BR")} kg
                      </strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Day Details & Direct Exercise/Load Inspector */}
          <div className="rounded-2xl border border-surface-light bg-background/50 p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="font-bold text-text-primary">
                    {fullDayNames[selectedDate.getDay()]},{" "}
                    {selectedDate.getDate().toString().padStart(2, "0")}/
                    {(selectedDate.getMonth() + 1).toString().padStart(2, "0")}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {selectedLog
                      ? "Atividade Concluída"
                      : selectedPlanDay?.isRest
                        ? "Dia de Descanso"
                        : "Treino Planejado"}
                  </span>
                  {selectedLog && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-emerald-400 font-bold">
                        {selectedLog.totalVolume.toLocaleString("pt-BR")} kg
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-text-primary mt-0.5 tracking-tight">
                  {selectedLog
                    ? selectedLog.dayFocus
                    : selectedPlanDay?.isRest
                      ? "Recuperação Muscular"
                      : selectedPlanDay?.focus || "Treino Personalizado"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {!selectedPlanDay?.isRest &&
                  (selectedPlanDay?.exercises?.length || 0) > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/workouts/active?dayIndex=${selectedPlanIndex}`)
                      }
                      className="px-3 py-2 rounded-xl bg-surface border border-surface-light hover:border-neon-blue/50 text-text-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <PlaySquare size={14} className="text-neon-blue" />
                      <span>Treinar</span>
                    </button>
                  )}
                <button
                  type="button"
                  onClick={() => setIsDayEditorOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-neon-blue/15 hover:bg-neon-blue text-neon-blue hover:text-black border border-neon-blue/30 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Edit3 size={14} />
                  <span>Editar Cargas & Reps</span>
                </button>
              </div>
            </div>

            {/* Exercises & Loads Summary List */}
            {selectedDayExercisesPreview.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-text-secondary px-2">
                  <span>Exercício ({selectedDayExercisesPreview.length})</span>
                  <span>Séries · Reps · Carga</span>
                </div>
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {selectedDayExercisesPreview.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => setIsDayEditorOpen(true)}
                      className="flex items-center justify-between gap-2 rounded-xl bg-surface/90 border border-surface-light px-3 py-2 hover:border-neon-blue/40 transition-colors cursor-pointer group/row"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] font-bold text-text-secondary w-5 tabular-nums">
                          {(idx + 1).toString().padStart(2, "0")}.
                        </span>
                        <span className="text-xs font-bold text-text-primary truncate group-hover/row:text-neon-blue transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 font-mono text-xs tabular-nums">
                        <span className="text-text-secondary">
                          {item.setsCount}×{item.repsDisplay.replace(" reps", "")}
                        </span>
                        <span aria-hidden="true" className="text-text-secondary/40">
                          ·
                        </span>
                        <span className="font-black text-neon-blue">
                          {item.weightDisplay}
                        </span>
                        <Edit3
                          size={12}
                          className="text-text-secondary/50 group-hover/row:text-neon-blue transition-colors ml-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-surface-light p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <p className="text-xs font-bold text-text-primary">
                    {selectedPlanDay?.isRest
                      ? "Este dia está configurado como descanso."
                      : "Nenhum exercício registrado para este dia."}
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Você pode transformar este dia em treino ativo ou registrar cargas manualmente.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsDayEditorOpen(true)}
                  className="shrink-0 gap-1.5"
                >
                  <Plus size={14} />
                  <span>Adicionar Treino</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </BentoCard>

      {/* Complete Day Workout, Loads & Repetitions Editor Modal */}
      {isDayEditorOpen && (
        <CalendarDayEditorModal
          date={selectedDate}
          onClose={() => setIsDayEditorOpen(false)}
          onSaved={(msg) => {
            setSaveToast(msg);
            setTimeout(() => setSaveToast(null), 4000);
          }}
        />
      )}
    </>
  );
}

interface CalendarDayEditorModalProps {
  date: Date;
  onClose: () => void;
  onSaved?: (message: string) => void;
}

interface EditableExerciseItem extends ExerciseDefinition {
  _uid: string;
  setDetails: ExerciseSetConfig[];
}

export function CalendarDayEditorModal({
  date,
  onClose,
  onSaved,
}: CalendarDayEditorModalProps) {
  const {
    currentPlan,
    workoutHistory: rawHistory,
    updateDayPlan,
    updateDateOverride,
    upsertWorkoutLogForDate,
    removeWorkoutLog,
    setPlan,
  } = useWorkoutStore();

  const workoutHistory = useMemo(
    () => (Array.isArray(rawHistory) ? rawHistory : []),
    [rawHistory]
  );

  const dateKey = formatDateKey(date);
  const jsDay = date.getDay();
  const planDayIndex = jsDay === 0 ? 6 : jsDay - 1;

  const existingLog = useMemo(() => {
    return workoutHistory.find((log) => {
      if (!log.date) return false;
      return formatDateKey(new Date(log.date)) === dateKey;
    });
  }, [workoutHistory, dateKey]);

  const baseDayPlan: WorkoutDayPlan = useMemo(() => {
    if (currentPlan?.dateOverrides?.[dateKey]) {
      return currentPlan.dateOverrides[dateKey];
    }
    if (currentPlan?.schedule?.[planDayIndex]) {
      return currentPlan.schedule[planDayIndex];
    }
    return {
      dayName: fullDayNames[jsDay],
      focus: existingLog?.dayFocus || "Treino Personalizado",
      isRest: false,
      warmup: [],
      exercises: [],
      cooldown: [],
      intensity: "Alta",
    };
  }, [currentPlan, dateKey, planDayIndex, jsDay, existingLog]);

  // Build initial editable exercises combining planned exercises and any existing log sets
  const [focus, setFocus] = useState<string>(
    existingLog?.dayFocus || baseDayPlan.focus || "Treino do Dia"
  );
  const [isRest, setIsRest] = useState<boolean>(
    existingLog ? false : Boolean(baseDayPlan.isRest)
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(
    existingLog?.durationMinutes || 50
  );

  const [exercises, setExercises] = useState<EditableExerciseItem[]>(() => {
    const sourceExercises = baseDayPlan.exercises || [];

    // If there is a workout log on this date and either no planned exercises or user logged specific exercises
    if (existingLog?.exerciseLogs && existingLog.exerciseLogs.length > 0) {
      return existingLog.exerciseLogs.map((exLog, idx) => {
        const matchedPlanEx = sourceExercises.find(
          (pe) =>
            pe.id === exLog.exerciseId ||
            pe.name.toLowerCase().trim() ===
              exLog.exerciseName.toLowerCase().trim()
        );
        const validSets = (exLog.setsLog || []).filter(
          (s) => s.setNumber !== 99
        );
        const setsCount =
          validSets.length || matchedPlanEx?.sets || 3;
        const setDetails: ExerciseSetConfig[] = Array.from({
          length: setsCount,
        }).map((_, sIdx) => {
          const loggedSet = validSets[sIdx];
          return {
            setNumber: sIdx + 1,
            reps: String(
              loggedSet?.reps ??
                matchedPlanEx?.setDetails?.[sIdx]?.reps ??
                (parseInt(matchedPlanEx?.reps || "10", 10) || 10)
            ),
            weight:
              loggedSet?.weight ??
              matchedPlanEx?.setDetails?.[sIdx]?.weight ??
              matchedPlanEx?.weight ??
              0,
          };
        });

        const maxWeight =
          setDetails.length > 0
            ? Math.max(...setDetails.map((s) => s.weight || 0))
            : 0;

        return {
          id: exLog.exerciseId || matchedPlanEx?.id || `ex-${idx}`,
          name: exLog.exerciseName,
          sets: setsCount,
          reps:
            matchedPlanEx?.reps ||
            String(setDetails[0]?.reps || "10-12"),
          weight: maxWeight,
          setDetails,
          restSeconds: matchedPlanEx?.restSeconds || 60,
          rest: matchedPlanEx?.rest || `${matchedPlanEx?.restSeconds || 60}s`,
          instructions: matchedPlanEx?.instructions || "",
          targetMuscles: matchedPlanEx?.targetMuscles || ["Geral"],
          advancedTechnique:
            exLog.advancedTechnique || matchedPlanEx?.advancedTechnique || "",
          supersetGroup:
            exLog.supersetGroup || matchedPlanEx?.supersetGroup || "",
          _uid: `${exLog.exerciseId || idx}-${Math.random().toString(36).slice(2, 7)}`,
        };
      });
    }

    return sourceExercises.map((ex, idx) => {
      const stats = getProgressionStats(ex.name, ex.reps, workoutHistory);
      const defaultWeight =
        ex.weight ?? stats.lastWeight ?? stats.suggestedWeight ?? 0;
      const defaultReps = ex.reps || "10-12";
      const setsCount = Math.max(1, ex.sets || 3);

      const setDetails: ExerciseSetConfig[] = Array.from({
        length: setsCount,
      }).map((_, sIdx) => ({
        setNumber: sIdx + 1,
        reps:
          ex.setDetails?.[sIdx]?.reps !== undefined
            ? String(ex.setDetails[sIdx].reps)
            : defaultReps,
        weight:
          ex.setDetails?.[sIdx]?.weight !== undefined
            ? Number(ex.setDetails[sIdx].weight)
            : defaultWeight,
      }));

      return {
        ...ex,
        sets: setsCount,
        reps: defaultReps,
        weight: defaultWeight,
        setDetails,
        _uid: `${ex.id || idx}-${Math.random().toString(36).slice(2, 7)}`,
      };
    });
  });

  // Persistence options
  const [saveToWeeklyPlan, setSaveToWeeklyPlan] = useState<boolean>(true);
  const [markAsCompletedOnDate, setMarkAsCompletedOnDate] = useState<boolean>(
    Boolean(existingLog) || date <= new Date()
  );

  // Library search / replace / add state
  const [pickerMode, setPickerMode] = useState<
    { type: "add" } | { type: "replace"; index: number } | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const libraryResults = useMemo(
    () => searchExercises(searchQuery).slice(0, 60),
    [searchQuery]
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleUpdateExerciseField = (
    idx: number,
    updates: Partial<EditableExerciseItem>
  ) => {
    setExercises((prev) => {
      const next = [...prev];
      const item = { ...next[idx], ...updates };

      // If sets count changed, resize setDetails
      if (updates.sets !== undefined) {
        const count = Math.max(1, Math.min(20, updates.sets));
        const currentDetails = item.setDetails || [];
        const fallbackWeight = item.weight ?? 0;
        const fallbackReps = item.reps || "10";
        item.sets = count;
        item.setDetails = Array.from({ length: count }).map((_, sIdx) => ({
          setNumber: sIdx + 1,
          reps: currentDetails[sIdx]?.reps ?? fallbackReps,
          weight: currentDetails[sIdx]?.weight ?? fallbackWeight,
        }));
      }

      // If default weight changed, update all sets that had the old default weight or sync all sets
      if (updates.weight !== undefined) {
        const newW = Number(updates.weight) || 0;
        item.weight = newW;
        item.setDetails = (item.setDetails || []).map((s) => ({
          ...s,
          weight: newW,
        }));
      }

      // If default reps changed, sync all sets
      if (updates.reps !== undefined) {
        item.reps = updates.reps;
        item.setDetails = (item.setDetails || []).map((s) => ({
          ...s,
          reps: updates.reps as string,
        }));
      }

      next[idx] = item;
      return next;
    });
  };

  const handleUpdateSingleSet = (
    exIdx: number,
    setIdx: number,
    field: "weight" | "reps",
    val: string
  ) => {
    setExercises((prev) => {
      const next = [...prev];
      const item = { ...next[exIdx] };
      const details = [...(item.setDetails || [])];
      if (!details[setIdx]) return prev;

      if (field === "weight") {
        const num = parseFloat(val);
        details[setIdx] = {
          ...details[setIdx],
          weight: isNaN(num) ? 0 : num,
        };
        item.weight = Math.max(...details.map((d) => d.weight || 0));
      } else {
        details[setIdx] = {
          ...details[setIdx],
          reps: val,
        };
      }

      item.setDetails = details;
      next[exIdx] = item;
      return next;
    });
  };

  const handleMoveExercise = (idx: number, direction: "up" | "down") => {
    setExercises((prev) => {
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
  };

  const handleRemoveExercise = (idx: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSelectFromLibrary = (libItem: ExerciseLibraryItem) => {
    const stats = getProgressionStats(libItem.name, "10-12", workoutHistory);
    const initialWeight = stats.lastWeight ?? stats.suggestedWeight ?? 10;

    const newItem: EditableExerciseItem = {
      id: libItem.id,
      libraryId: libItem.id,
      name: libItem.name,
      sets: 3,
      reps: "10-12",
      weight: initialWeight,
      setDetails: [
        { setNumber: 1, reps: "10", weight: initialWeight },
        { setNumber: 2, reps: "10", weight: initialWeight },
        { setNumber: 3, reps: "10", weight: initialWeight },
      ],
      restSeconds: 60,
      rest: "60s",
      instructions: libItem.instructions,
      targetMuscles: libItem.targetMuscles,
      difficulty: libItem.difficulty,
      equipment: libItem.equipment,
      gifPlaceholder: libItem.gifPlaceholder,
      _uid: `${libItem.id}-${Math.random().toString(36).slice(2, 7)}`,
    };

    if (pickerMode?.type === "replace") {
      const targetIdx = pickerMode.index;
      setExercises((prev) => {
        const copy = [...prev];
        const old = copy[targetIdx];
        if (old) {
          newItem.sets = old.sets;
          newItem.reps = old.reps;
          newItem.setDetails = Array.from({ length: old.sets }).map(
            (_, sIdx) => ({
              setNumber: sIdx + 1,
              reps: old.setDetails?.[sIdx]?.reps || old.reps || "10",
              weight: initialWeight,
            })
          );
        }
        copy[targetIdx] = newItem;
        return copy;
      });
    } else {
      setExercises((prev) => [...prev, newItem]);
      setIsRest(false);
    }

    setPickerMode(null);
    setSearchQuery("");
  };

  const handleSaveAll = () => {
    const cleanedExercises: ExerciseDefinition[] = isRest
      ? []
      : exercises.map((ex) => {
          const { _uid, ...rest } = ex;
          return {
            ...rest,
            sets: ex.setDetails.length || ex.sets || 3,
            weight:
              ex.setDetails.length > 0
                ? Math.max(...ex.setDetails.map((s) => Number(s.weight) || 0))
                : Number(ex.weight) || 0,
            setDetails: ex.setDetails,
          };
        });

    const updatedDayPlan: WorkoutDayPlan = {
      ...baseDayPlan,
      dayName: baseDayPlan.dayName || `Dia ${planDayIndex + 1}`,
      focus: isRest ? "Descanso" : focus.trim() || "Treino Personalizado",
      isRest,
      exercises: cleanedExercises,
      intensity: baseDayPlan.intensity || "Alta",
    };

    // 1. Save to currentPlan (weekly schedule & date override)
    if (!currentPlan) {
      const newSchedule: WorkoutDayPlan[] = Array.from({ length: 7 }).map(
        (_, i) =>
          i === planDayIndex
            ? updatedDayPlan
            : {
                dayName: `Dia ${i + 1}`,
                focus: "Descanso",
                isRest: true,
                exercises: [],
                intensity: "Leve",
              }
      );
      setPlan({
        id: `plan_${Date.now()}`,
        generatedAt: new Date().toISOString(),
        phaseName: "Plano Personalizado",
        schedule: newSchedule,
      });
    } else {
      if (saveToWeeklyPlan) {
        updateDayPlan(planDayIndex, updatedDayPlan);
      }
      updateDateOverride(dateKey, updatedDayPlan);
    }

    // 2. Save or update WorkoutLog in workoutHistory for this date
    if (markAsCompletedOnDate && !isRest && cleanedExercises.length > 0) {
      let totalVolume = 0;
      const exerciseLogs = cleanedExercises.map((ex) => {
        const setsLog = (ex.setDetails || []).map((s, sIdx) => {
          const repsNum = parseInt(String(s.reps).replace(/\D/g, ""), 10) || 10;
          const weightNum = Number(s.weight) || 0;
          totalVolume += repsNum * weightNum;
          return {
            setNumber: sIdx + 1,
            reps: repsNum,
            weight: weightNum,
          };
        });

        return {
          exerciseId: ex.id,
          exerciseName: ex.name,
          advancedTechnique: ex.advancedTechnique || undefined,
          supersetGroup: ex.supersetGroup || undefined,
          setsLog,
        };
      });

      const logDateIso = existingLog?.date || new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
        0,
        0
      ).toISOString();

      const updatedLog: WorkoutLog = {
        id: existingLog?.id || `log_${dateKey}_${Date.now()}`,
        date: logDateIso,
        dayFocus: updatedDayPlan.focus,
        durationMinutes: Number(durationMinutes) || 45,
        exercisesCompleted: cleanedExercises.length,
        totalVolume,
        perceivedEffort: existingLog?.perceivedEffort || 8,
        phaseIndex: currentPlan?.currentPhaseIndex || 0,
        weekIndex: currentPlan?.currentWeekIndex || 0,
        phaseName: currentPlan?.phaseName || "Treino",
        exerciseLogs,
      };

      upsertWorkoutLogForDate(dateKey, updatedLog);
    } else if (!markAsCompletedOnDate && existingLog) {
      removeWorkoutLog(existingLog.id);
    }

    onSaved?.("Treino, cargas e repetições salvos permanentemente!");
    onClose();
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] bg-background/95 backdrop-blur-2xl flex flex-col font-sans text-text-primary">
      {/* Sticky Top Header */}
      <div className="flex-shrink-0 border-b border-surface-light bg-surface/90 px-4 sm:px-6 pt-8 sm:pt-6 pb-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-neon-blue font-bold">
              <CalendarIcon size={13} />
              <span>
                {fullDayNames[jsDay]},{" "}
                {date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-text-primary tracking-tight font-display truncate mt-0.5">
              Editar Treino, Cargas & Repetições
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-2xl bg-background border border-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-36 space-y-5">
          {pickerMode !== null ? (
            /* Exercise Library Picker */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-text-primary">
                    {pickerMode.type === "replace"
                      ? "Substituir Exercício"
                      : "Adicionar Exercício ao Dia"}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Escolha um exercício da biblioteca para configurar séries, cargas e repetições.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPickerMode(null);
                    setSearchQuery("");
                  }}
                >
                  Voltar
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou músculo (ex: Supino, Agachamento, Panturrilha)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-surface-light rounded-2xl py-3 pl-11 pr-4 text-sm text-text-primary font-medium focus:border-neon-blue focus:outline-none"
                />
              </div>

              <div className="space-y-2.5">
                {libraryResults.map((lib) => (
                  <button
                    key={lib.id}
                    type="button"
                    onClick={() => handleSelectFromLibrary(lib)}
                    className="w-full text-left bg-surface border border-surface-light p-3.5 rounded-2xl flex items-center justify-between hover:border-neon-blue/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-background relative shrink-0 border border-surface-light">
                        <ExerciseMedia
                          exerciseNameOrId={lib.name || lib.id}
                          name={lib.name}
                          id={lib.id}
                          fallbackMuscle={lib.targetMuscles[0]}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-text-primary text-sm group-hover:text-neon-blue transition-colors truncate">
                          {lib.name}
                        </h4>
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                          {lib.targetMuscles.join(" · ")} — {lib.equipment}
                        </p>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-neon-blue/10 text-neon-blue flex items-center justify-center group-hover:bg-neon-blue group-hover:text-black transition-colors shrink-0 ml-2">
                      <Plus size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Main Day & Load Editor */
            <>
              {/* Workout Title & Persistence Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface border border-surface-light rounded-2xl p-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Foco / Nome do Treino
                  </label>
                  <input
                    type="text"
                    value={focus}
                    disabled={isRest}
                    onChange={(e) => setFocus(e.target.value)}
                    placeholder="Ex: Peito, Ombros e Tríceps"
                    className="w-full bg-background border border-surface-light rounded-xl px-3.5 py-2.5 text-sm font-black text-text-primary focus:outline-none focus:border-neon-blue disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-text-secondary block mb-1.5">
                    Duração Estimada (min)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={300}
                    value={durationMinutes}
                    disabled={isRest}
                    onChange={(e) =>
                      setDurationMinutes(parseInt(e.target.value, 10) || 45)
                    }
                    className="w-full bg-background border border-surface-light rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-text-primary focus:outline-none focus:border-neon-blue disabled:opacity-50 tabular-nums"
                  />
                </div>

                {/* Persistence Toggles */}
                <div className="sm:col-span-3 pt-2 border-t border-surface-light grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-background/60 border border-surface-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveToWeeklyPlan}
                      onChange={(e) => setSaveToWeeklyPlan(e.target.checked)}
                      className="w-4 h-4 accent-neon-blue rounded"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Fixar na rotina de <strong>{fullDayNames[jsDay]}</strong>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-background/60 border border-surface-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={markAsCompletedOnDate}
                      disabled={isRest}
                      onChange={(e) =>
                        setMarkAsCompletedOnDate(e.target.checked)
                      }
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Marcar dia como <strong>Treino Concluído</strong>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-background/60 border border-surface-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRest}
                      onChange={(e) => {
                        setIsRest(e.target.checked);
                        if (e.target.checked) setMarkAsCompletedOnDate(false);
                      }}
                      className="w-4 h-4 accent-neon-purple rounded"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Dia de <strong>Descanso</strong>
                    </span>
                  </label>
                </div>
              </div>

              {/* Exercises List with Set-by-Set Weight & Reps Editor */}
              {!isRest && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-text-primary">
                        Exercícios, Séries, Cargas (kg) & Repetições
                      </h3>
                      <p className="text-xs text-text-secondary">
                        Ajuste a carga padrão ou edite cada série individualmente.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setPickerMode({ type: "add" })}
                      className="gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Novo Exercício</span>
                    </Button>
                  </div>

                  {exercises.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-surface-light p-8 text-center space-y-3">
                      <Dumbbell
                        size={32}
                        className="mx-auto text-text-secondary/50"
                      />
                      <div>
                        <p className="text-sm font-bold text-text-primary">
                          Nenhum exercício neste dia
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          Adicione exercícios da biblioteca para configurar cargas e repetições.
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setPickerMode({ type: "add" })}
                        className="gap-1.5"
                      >
                        <Plus size={15} />
                        <span>Adicionar Primeiro Exercício</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {exercises.map((ex, exIdx) => (
                        <div
                          key={ex._uid}
                          className="rounded-2xl bg-surface border border-surface-light p-4 space-y-4 shadow-lg"
                        >
                          {/* Exercise Top Row */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-background border border-surface-light shrink-0">
                                <ExerciseMedia
                                  exerciseNameOrId={ex.name || ex.id}
                                  name={ex.name}
                                  id={ex.id}
                                  fallbackMuscle={ex.targetMuscles?.[0]}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-neon-blue font-bold">
                                  <span>#{(exIdx + 1).toString().padStart(2, "0")}</span>
                                  {ex.targetMuscles?.[0] && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span className="text-text-secondary truncate">
                                        {ex.targetMuscles.join(", ")}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  value={ex.name}
                                  onChange={(e) =>
                                    handleUpdateExerciseField(exIdx, {
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full bg-transparent border-b border-dashed border-surface-light focus:border-neon-blue text-sm sm:text-base font-black text-text-primary focus:outline-none py-0.5"
                                />
                              </div>
                            </div>

                            {/* Reorder / Swap / Delete Controls */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveExercise(exIdx, "up")}
                                disabled={exIdx === 0}
                                title="Mover para cima"
                                className="h-8 w-8 rounded-lg bg-background border border-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowUp size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleMoveExercise(exIdx, "down")
                                }
                                disabled={exIdx === exercises.length - 1}
                                title="Mover para baixo"
                                className="h-8 w-8 rounded-lg bg-background border border-surface-light flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowDown size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPickerMode({
                                    type: "replace",
                                    index: exIdx,
                                  })
                                }
                                title="Trocar exercício"
                                className="h-8 w-8 rounded-lg bg-background border border-surface-light flex items-center justify-center text-text-secondary hover:text-neon-blue hover:border-neon-blue/40 cursor-pointer"
                              >
                                <Replace size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveExercise(exIdx)}
                                title="Remover exercício"
                                className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Quick Master Controls (Sets, Reps Target, Default Weight kg, Rest) */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            <div className="bg-background rounded-xl p-2.5 border border-surface-light">
                              <span className="text-[10px] font-bold text-text-secondary block mb-1">
                                Total de Séries
                              </span>
                              <input
                                type="number"
                                min={1}
                                max={20}
                                value={ex.sets}
                                onChange={(e) =>
                                  handleUpdateExerciseField(exIdx, {
                                    sets: parseInt(e.target.value, 10) || 1,
                                  })
                                }
                                className="w-full bg-transparent font-mono font-black text-sm text-text-primary focus:outline-none tabular-nums"
                              />
                            </div>

                            <div className="bg-background rounded-xl p-2.5 border border-surface-light">
                              <span className="text-[10px] font-bold text-text-secondary block mb-1">
                                Repetições (Meta)
                              </span>
                              <input
                                type="text"
                                value={ex.reps}
                                onChange={(e) =>
                                  handleUpdateExerciseField(exIdx, {
                                    reps: e.target.value,
                                  })
                                }
                                placeholder="10-12"
                                className="w-full bg-transparent font-mono font-black text-sm text-text-primary focus:outline-none tabular-nums"
                              />
                            </div>

                            <div className="bg-background rounded-xl p-2.5 border border-neon-blue/30">
                              <span className="text-[10px] font-bold text-neon-blue block mb-1">
                                Carga Base (kg)
                              </span>
                              <input
                                type="number"
                                step="0.5"
                                min={0}
                                value={ex.weight ?? 0}
                                onChange={(e) =>
                                  handleUpdateExerciseField(exIdx, {
                                    weight: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-transparent font-mono font-black text-sm text-neon-blue focus:outline-none tabular-nums"
                              />
                            </div>

                            <div className="bg-background rounded-xl p-2.5 border border-surface-light">
                              <span className="text-[10px] font-bold text-text-secondary block mb-1">
                                Descanso (seg)
                              </span>
                              <input
                                type="number"
                                step="5"
                                min={0}
                                value={ex.restSeconds || 60}
                                onChange={(e) => {
                                  const secs = parseInt(e.target.value, 10) || 60;
                                  handleUpdateExerciseField(exIdx, {
                                    restSeconds: secs,
                                    rest: `${secs}s`,
                                  });
                                }}
                                className="w-full bg-transparent font-mono font-black text-sm text-text-primary focus:outline-none tabular-nums"
                              />
                            </div>
                          </div>

                          {/* Per-Set Detailed Load & Reps Table */}
                          <div className="rounded-xl bg-background/60 border border-surface-light p-3 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-text-secondary px-1">
                              <span>Série Individual</span>
                              <span>Carga (kg) × Repetições</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {(ex.setDetails || []).map((setItem, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex items-center justify-between gap-2 rounded-lg bg-surface border border-surface-light px-2.5 py-1.5"
                                >
                                  <span className="font-mono text-xs font-bold text-text-secondary w-14 shrink-0 tabular-nums">
                                    Série {sIdx + 1}
                                  </span>

                                  <div className="flex items-center gap-1.5 flex-1 justify-end">
                                    <div className="relative flex items-center">
                                      <input
                                        type="number"
                                        step="0.5"
                                        min={0}
                                        value={setItem.weight}
                                        onChange={(e) =>
                                          handleUpdateSingleSet(
                                            exIdx,
                                            sIdx,
                                            "weight",
                                            e.target.value
                                          )
                                        }
                                        className="w-20 bg-background border border-surface-light focus:border-neon-blue rounded-lg px-2 py-1 text-xs font-mono font-black text-center text-neon-blue focus:outline-none tabular-nums"
                                      />
                                      <span className="ml-1 text-[10px] font-mono text-text-secondary">
                                        kg
                                      </span>
                                    </div>

                                    <span className="text-xs text-text-secondary font-mono">
                                      ×
                                    </span>

                                    <div className="relative flex items-center">
                                      <input
                                        type="text"
                                        value={setItem.reps}
                                        onChange={(e) =>
                                          handleUpdateSingleSet(
                                            exIdx,
                                            sIdx,
                                            "reps",
                                            e.target.value
                                          )
                                        }
                                        className="w-16 bg-background border border-surface-light focus:border-neon-blue rounded-lg px-2 py-1 text-xs font-mono font-black text-center text-text-primary focus:outline-none tabular-nums"
                                      />
                                      <span className="ml-1 text-[10px] font-mono text-text-secondary">
                                        reps
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => setPickerMode({ type: "add" })}
                        className="w-full py-3.5 rounded-2xl border-2 border-dashed border-surface-light hover:border-neon-blue/40 text-text-secondary hover:text-neon-blue font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Plus size={16} />
                        <span>Adicionar Outro Exercício</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      {pickerMode === null && (
        <div className="fixed bottom-0 left-0 right-0 z-[130] border-t border-surface-light bg-surface/95 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-1/3 h-12 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSaveAll}
              className="flex-1 h-12 rounded-xl gap-2 text-sm font-black"
            >
              <Save size={16} />
              <span>Salvar Permanentemente</span>
            </Button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  rowSpan = 8,
  colSpan = 7,
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-2xl border border-surface-light bg-surface p-4 sm:p-6 shadow-2xl transition-colors hover:border-neon-blue/30 ${
        hideOverflow ? "overflow-hidden" : ""
      } ${height} row-span-${rowSpan} col-span-${colSpan} ${className}`}
    >
      {/* Ambient App Identity Glows */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-neon-blue/10 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-neon-purple/15 blur-[60px]" />

      {linkTo && (
        <div className="absolute bottom-4 right-6 z-[999] flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-neon-blue text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-6px] group-hover:rotate-0 group-hover:opacity-100 shadow-lg">
          <svg
            className="h-5 w-5 text-black"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            />
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-10 bg-gradient-to-tl from-neon-blue/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link to={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
