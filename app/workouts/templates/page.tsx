'use client';

import { useWorkoutStore, WorkoutPlan } from '@/lib/workoutStore';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Save, Activity, Upload, Download, Copy, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { PREMADE_TEMPLATES } from '@/lib/templates';

const generateId = () => typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { setPlan, currentPlan, hasCompletedQuestionnaire, setFreeWorkout } = useWorkoutStore();
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startFreeWorkoutFromTemplate = (day: any, templateName: string) => {
    const freeDay = {
      ...day,
      dayName: `Livre: ${day.focus}`,
      focus: day.focus || 'Treino Livre',
      exercises: (day.exercises || []).map((ex: any) => ({
        ...ex,
        sets: ex.sets || 3,
        reps: ex.reps || '10-12',
        restSeconds: ex.restSeconds || 60,
      }))
    };
    setFreeWorkout(freeDay);
    navigate('/workouts/active?free=true');
  };

  const applyTemplate = (template: any) => {
    const newId = generateId();
    const newPlan = {
      ...template,
      phaseId: newId,
      id: newId,
      generatedAt: new Date().toISOString()
    };
    setPlan(newPlan);
    navigate('/workouts');
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJson);
      if (!parsed.schedule || !Array.isArray(parsed.schedule)) {
        throw new Error("JSON inválido (Falta 'schedule' ou formato incorreto).");
      }
      applyTemplate(parsed);
    } catch (e: any) {
      setImportError(e.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        setImportJson(text);
        const parsed = JSON.parse(text);
        if (!parsed.schedule) throw new Error();
      } catch (err) {
        setImportError("Arquivo não contém um treino JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    if (!currentPlan) return;
    const jsonStr = JSON.stringify(currentPlan, null, 2);
    // Copy to clipboard
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Download file
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Evolux_${currentPlan.phaseName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden text-white font-sans">
      <header className="p-8 sticky top-0 bg-background/95 backdrop-blur-xl z-20 flex justify-between items-center border-b border-white/5 pt-12">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-white transition-all active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide">Templates</h1>
            <p className="text-[11px] font-black text-neon-blue uppercase tracking-widest mt-0.5">Sistemas de Treino</p>
          </div>
        </div>
      </header>

      <main className="p-5 max-w-3xl mx-auto relative z-10 space-y-12 mt-4">
         <section className="relative z-10">
            <h2 className="text-[11px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-2 mb-6">
              <Zap size={16} className="text-neon-blue" /> Protocolos Homologados
            </h2>
             <div className="space-y-4">
              {PREMADE_TEMPLATES.map((tpl, i) => {
                 const isExpanded = expandedIndex === i;
                 return (
                 <div key={i} className={`bg-surface transition-all duration-300 rounded-[32px] overflow-hidden border ${isExpanded ? 'border-neon-blue/50 shadow-lg shadow-neon-blue/10' : 'border-white/5 hover:border-white/20'}`}>
                    <div 
                      className="flex justify-between items-center cursor-pointer p-6 sm:p-8"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    >
                      <div className="pr-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Template {String(i+1).padStart(2, '0')}</span>
                        <h3 className={`text-xl font-black mb-2 leading-tight transition-colors ${isExpanded ? 'text-neon-blue' : 'text-white'}`}>{tpl.phaseName}</h3>
                        <p className={`text-sm text-slate-400 font-medium transition-all ${isExpanded ? '' : 'line-clamp-2'}`}>{tpl.planPromptDescription}</p>
                      </div>
                      <div className={`p-3 rounded-full border shrink-0 transition-all ${isExpanded ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue' : 'bg-white/5 border-white/10 text-slate-400 group-hover:border-white/20'}`}>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="p-6 sm:p-8 pt-0 space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Cronograma Semanal</h4>
                          <div className="grid gap-3">
                            {tpl.schedule.map((day: any, j: number) => (
                              <div key={j} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-background border border-white/5 relative overflow-hidden group gap-4">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/5 group-hover:bg-neon-blue/50 transition-colors" />
                                <div className="pl-3">
                                  <span className="font-black text-white block text-sm">{day.dayName.split('-')[0]}</span>
                                  <span className={`text-[11px] font-black uppercase tracking-widest ${day.isRest ? 'text-neon-purple' : 'text-slate-400'}`}>{day.focus}</span>
                                  
                                  {/* EXERCISE LIST (More Complete Display) */}
                                  {!day.isRest && day.exercises && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {day.exercises.slice(0, 4).map((ex: any, idx: number) => (
                                        <span key={idx} className="text-[10px] bg-white/5 border border-white/5 text-slate-300 px-2 py-1 rounded-md line-clamp-1 max-w-[120px]" title={ex.name}>
                                          {ex.sets}x {ex.name}
                                        </span>
                                      ))}
                                      {day.exercises.length > 4 && (
                                        <span className="text-[10px] bg-white/5 border border-white/5 text-slate-400 px-2 py-1 rounded-md">
                                          +{day.exercises.length - 4} exs
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col items-end gap-3 pl-3 sm:pl-0 mt-3 sm:mt-0">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-surface px-3 py-1.5 rounded-lg border border-white/5">{day.exercises?.length || 0} exs</span>
                                  {!day.isRest && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startFreeWorkoutFromTemplate(day, tpl.phaseName);
                                      }}
                                      className="py-1.5 px-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 shrink-0"
                                      title="Iniciar como Treino Livre"
                                    >
                                      <Activity size={12} /> Testar
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const newId = generateId();
                              const extraPlan = {
                                ...tpl,
                                phaseId: newId,
                                id: newId,
                                generatedAt: new Date().toISOString()
                              };
                              useWorkoutStore.getState().addUserTemplate(extraPlan as unknown as WorkoutPlan);
                              alert('Treino salvo nos Treinos Extras!');
                            }}
                            className="flex-1 py-4 rounded-[20px] bg-surface border border-white/10 text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white/5 transition-all shadow-lg active:scale-95"
                          >
                            <Save size={16}/> Salvar no Extra
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              applyTemplate(tpl);
                            }}
                            className="flex-[2] py-4 rounded-[20px] bg-neon-blue text-black font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg active:scale-95"
                          >
                            <Check size={16}/> Aplicar Template
                          </button>
                        </div>
                      </div>
                    )}
                 </div>
                 );
              })}
            </div>
         </section>

         <section className="border-t border-white/5 pt-10">
            <h2 className="text-[11px] font-black tracking-widest uppercase text-emerald-500 mb-6 flex items-center gap-2">
              <Download size={16} /> Exportar Treino
            </h2>
            {currentPlan ? (
              <div className="bg-surface border border-white/5 p-6 sm:p-8 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                 <div className="text-center sm:text-left">
                   <p className="font-black text-white text-lg">{currentPlan.phaseName}</p>
                   <p className="text-xs text-slate-400 font-medium mt-1">Gere um backup completo</p>
                 </div>
                 <button 
                   onClick={handleExport}
                   className="w-full sm:w-auto px-6 py-4 bg-background border border-white/10 rounded-[20px] text-white hover:border-neon-blue hover:text-neon-blue transition-all font-black uppercase tracking-widest text-[11px] flex gap-2 items-center justify-center shadow-inner"
                 >
                   {copied ? <Check size={16} className="text-emerald-500" /> : <Download size={16} />} Salvar JSON
                 </button>
              </div>
            ) : (
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-surface p-8 rounded-[32px] border border-white/5 border-dashed text-center">
                Você não possui um treino ativo para exportar.
              </div>
            )}
         </section>

         <section className="border-t border-white/5 pt-10 pb-10">
            <h2 className="text-[11px] font-black tracking-widest uppercase text-amber-500 mb-6 flex items-center gap-2">
              <Upload size={16} /> Importar Treino (JSON)
            </h2>
            <div className="bg-surface border border-white/5 p-6 sm:p-8 rounded-[32px] space-y-6 shadow-lg">
              <input 
                 type="file" 
                 accept=".json"
                 className="hidden"
                 ref={fileInputRef}
                 onChange={handleFileUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/10 text-slate-400 py-10 rounded-[24px] hover:border-amber-500/50 hover:bg-amber-500/5 hover:text-amber-500 transition-all text-sm font-black tracking-wider flex flex-col items-center gap-3"
              >
                 <Upload size={28} /> Escolher Arquivo .json
              </button>
              
              <div className="flex items-center gap-4 py-2 opacity-50">
                 <div className="h-px bg-white/10 flex-1" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Opção Manual</span>
                 <div className="h-px bg-white/10 flex-1" />
              </div>

              <textarea 
                value={importJson}
                onChange={e => { setImportJson(e.target.value); setImportError(''); }}
                className="w-full bg-background border border-white/5 rounded-[20px] p-5 text-white focus:border-amber-500 outline-none text-xs font-mono font-medium h-40 resize-none shadow-inner"
                placeholder="Cole o código JSON do treino aqui..."
              />
              {importError && (
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-500/10 p-3 rounded-lg border border-red-500/20">{importError}</p>
              )}
              <button 
                onClick={handleImport}
                disabled={!importJson.trim()}
                className="w-full bg-amber-500 text-black py-5 rounded-[20px] font-black text-sm uppercase tracking-widest disabled:opacity-30 transition-all active:scale-95"
              >
                Importar e Aplicar
              </button>
            </div>
         </section>
      </main>

      <BottomNav />
    </div>
  );
}
