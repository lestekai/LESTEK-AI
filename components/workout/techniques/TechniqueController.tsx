import { useState, useEffect, useCallback } from "react";
import { AdvancedTechniqueType } from "@/lib/techniques/types";
import { TechniqueState } from "@/lib/techniques/types";

interface Props {
  state: TechniqueState;
  onAdvance: (payload: { reps: number; weight: number }) => void;
  onComplete: () => void;
}

export function TechniqueController({ state, onAdvance, onComplete }: Props) {
  const [reps, setReps] = useState<string>(() => String(state.currentRepTarget || ""));
  const [weight, setWeight] = useState<string>(() => String(state.currentWeightSuggested || ""));
  const [internalTimeLeft, setInternalTimeLeft] = useState<number>(0);

  const [prevRepTarget, setPrevRepTarget] = useState<number | undefined>(state.currentRepTarget);
  const [prevWeightSuggested, setPrevWeightSuggested] = useState<number | undefined>(state.currentWeightSuggested);
  const [prevRestTimerSeconds, setPrevRestTimerSeconds] = useState<number | undefined>(state.restTimerSeconds);

  if (state.currentRepTarget !== prevRepTarget) {
    setPrevRepTarget(state.currentRepTarget);
    setReps(String(state.currentRepTarget || ""));
  }
  if (state.currentWeightSuggested !== prevWeightSuggested) {
    setPrevWeightSuggested(state.currentWeightSuggested);
    setWeight(String(state.currentWeightSuggested || ""));
  }
  if (state.restTimerSeconds !== prevRestTimerSeconds) {
    setPrevRestTimerSeconds(state.restTimerSeconds);
    setInternalTimeLeft(state.restTimerSeconds || 0);
  }

  const handleAdvance = useCallback(() => {
    onAdvance({
      reps: Number(reps) || state.currentRepTarget || 0,
      weight: Number(weight) || state.currentWeightSuggested || 0
    });
  }, [onAdvance, reps, weight, state.currentRepTarget, state.currentWeightSuggested]);

  // Handle Internal Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (internalTimeLeft > 0) {
      interval = setInterval(() => {
        setInternalTimeLeft((t) => {
          if (t <= 1) {
            handleAdvance(); // auto advance when rest is over
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [internalTimeLeft, handleAdvance]);

  if (!state.isActive || !state.type) return null;

  return (
    <div className="bg-surface border border-neon-blue/30 rounded-[20px] p-5 mt-4 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-neon-blue/20 text-neon-blue border border-neon-blue/40 px-2.5 py-1 rounded-lg uppercase font-black tracking-widest shadow-inner">
            {state.type.replace("_", " ")}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
            STAGE: {state.stage.replace(/_/g, " ")}
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-black bg-emerald-500/10 px-2 py-0.5 rounded-lg">
          {state.completedStages} / {state.totalStages}
        </span>
      </div>

      {state.stage !== "completed" && internalTimeLeft > 0 ? (
        <div className="flex flex-col items-center justify-center py-6 bg-background rounded-[16px] border border-white/5 shadow-inner">
            <span className="text-4xl font-black text-neon-blue tracking-tighter drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                {internalTimeLeft}s
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-2">
                Descanso Obrigatório
            </span>
            <button
                onClick={handleAdvance}
                className="text-[10px] mt-4 uppercase font-black text-slate-500 hover:text-white transition-colors tracking-widest bg-white/5 px-4 py-2 rounded-xl"
            >
                Pular Rest
            </button>
        </div>
      ) : state.stage !== "completed" && internalTimeLeft === 0 ? (
        <>
            <div className="flex items-center gap-3 w-full mt-2">
            <div className="flex-1">
                <label className="text-[9px] text-slate-400 uppercase mb-2 font-black tracking-widest block text-center">
                Reps Feitas
                </label>
                <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Reps"
                className="w-full bg-background border border-white/5 rounded-[16px] py-4 text-center text-white text-lg font-black focus:border-neon-blue/50 outline-none shadow-inner transition-colors"
                />
            </div>
            <div className="flex-1">
                <label className="text-[9px] text-slate-400 uppercase mb-2 font-black tracking-widest block text-center">
                Carga (kg)
                </label>
                <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Kg"
                className="w-full bg-background border border-white/5 rounded-[16px] py-4 text-center text-white text-lg font-black focus:border-neon-blue/50 outline-none shadow-inner transition-colors"
                />
            </div>
            </div>
            <button
                onClick={handleAdvance}
                className="w-full py-4 bg-neon-blue hover:brightness-110 text-black rounded-[16px] font-black text-xs uppercase tracking-widest mt-4 transition-all shadow-lg active:scale-95"
            >
                Avançar Etapa Técnica
            </button>
        </>
      ) : (
        <button
          onClick={onComplete}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-[16px] font-black text-xs uppercase tracking-widest mt-4 transition-all shadow-lg active:scale-95"
        >
          Finalizar Técnica
        </button>
      )}
    </div>
  );
}
