'use client';

import { useWorkoutStore, WorkoutPlan } from '@/lib/workoutStore';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Save, Activity, Upload, Download, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { PREMADE_TEMPLATES } from '@/lib/templates';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { setPlan, currentPlan, hasCompletedQuestionnaire } = useWorkoutStore();
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyTemplate = (template: any) => {
    const newPlan = {
      ...template,
      id: crypto.randomUUID(),
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
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <header className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-20 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-white p-2 shrink-0">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-display text-white">Treinos Prontos</h1>
        </div>
      </header>

      <main className="p-6 relative z-10 space-y-10">
         {/* Decorative Background */}
         <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

         <section className="relative z-10">
            <h2 className="text-xs font-bold tracking-widest uppercase text-text-secondary flex items-center gap-2 mb-4">
              <Activity size={14} className="text-neon-blue" /> Protocolos Homologados
            </h2>
             <div className="space-y-4">
              {PREMADE_TEMPLATES.map((tpl, i) => {
                 const isExpanded = expandedIndex === i;
                 return (
                 <div key={i} className={`bg-surface/80 backdrop-blur-sm border transition-all duration-300 rounded-2xl overflow-hidden ${isExpanded ? 'border-neon-blue/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'border-surface-light hover:border-white/20'}`}>
                    <div 
                      className="flex justify-between items-start cursor-pointer p-5"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    >
                      <div className="pr-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1 block">Template {String(i+1).padStart(2, '0')}</span>
                        <h3 className="text-xl font-bold font-display text-white mb-2 leading-tight">{tpl.phaseName}</h3>
                        <p className={`text-sm text-text-secondary transition-all ${isExpanded ? '' : 'line-clamp-2'}`}>{tpl.planPromptDescription}</p>
                      </div>
                      <div className={`p-2 rounded-xl border shrink-0 transition-all ${isExpanded ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' : 'bg-background border-surface-light text-text-secondary group-hover:border-white/20'}`}>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="p-5 pt-0 mt-2 space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Cronograma Semanal</h4>
                          <div className="grid gap-2">
                            {tpl.schedule.map((day: any, j: number) => (
                              <div key={j} className="flex justify-between items-center text-sm p-3 rounded-xl bg-background border border-surface-light relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-light group-hover:bg-neon-blue/50 transition-colors" />
                                <span className="font-bold text-white w-24 truncate pl-3">{day.dayName.split('-')[0]}</span>
                                <span className={`text-xs font-bold ${day.isRest ? 'text-amber-500' : 'text-neon-blue'}`}>{day.focus}</span>
                                <span className="text-[10px] text-text-secondary uppercase tracking-widest bg-surface px-2 py-1 rounded">{day.exercises?.length || 0} ex</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            applyTemplate(tpl);
                          }}
                          className="w-full py-4 rounded-xl bg-neon-blue text-background font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                        >
                          <Check size={18}/> Injetar este Treino
                        </button>
                      </div>
                    )}
                 </div>
                 );
              })}
            </div>
         </section>

         <section className="border-t border-white/5 pt-8">
            <h2 className="text-sm font-bold tracking-widest uppercase text-neon-purple mb-4">Exportar Treino Atual</h2>
            {currentPlan ? (
              <div className="bg-surface border border-surface-light p-5 rounded-2xl flex items-center justify-between">
                 <div>
                   <p className="font-bold text-white text-sm">{currentPlan.phaseName}</p>
                   <p className="text-xs text-text-secondary">Baixe ou copie o JSON</p>
                 </div>
                 <button 
                   onClick={handleExport}
                   className="p-3 bg-background border border-surface-light rounded-xl text-text-secondary hover:text-white hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-neon-purple shrink-0 flex gap-2 items-center"
                 >
                   {copied ? <Check size={18} className="text-emerald-500" /> : <Download size={18} />} Exportar
                 </button>
              </div>
            ) : (
              <div className="text-sm text-text-secondary bg-surface p-4 rounded-xl border border-surface-light">
                Nenhum treino ativo para exportar.
              </div>
            )}
         </section>

         <section className="border-t border-white/5 pt-8">
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-500 mb-4">Importar Treino (JSON)</h2>
            <div className="bg-surface border border-surface-light p-5 rounded-2xl space-y-4">
              <input 
                 type="file" 
                 accept=".json"
                 className="hidden"
                 ref={fileInputRef}
                 onChange={handleFileUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-surface-light text-text-secondary py-6 rounded-xl hover:border-white/20 hover:text-white transition-all text-sm font-bold tracking-wider flex flex-col items-center gap-2"
              >
                 <Upload size={24} /> Fazer upload de arquivo .json
              </button>
              
              <div className="flex items-center gap-4 py-2">
                 <div className="h-px bg-surface-light flex-1" />
                 <span className="text-xs font-bold text-text-secondary uppercase">Ou cole o código</span>
                 <div className="h-px bg-surface-light flex-1" />
              </div>

              <textarea 
                value={importJson}
                onChange={e => { setImportJson(e.target.value); setImportError(''); }}
                className="w-full bg-background border border-surface-light rounded-xl p-3 text-white focus:border-amber-500 outline-none text-xs font-mono h-32 resize-none"
                placeholder="Insira o JSON do treino aqui..."
              />
              {importError && (
                <p className="text-xs text-red-500">{importError}</p>
              )}
              <button 
                onClick={handleImport}
                disabled={!importJson.trim()}
                className="w-full bg-amber-500 text-background py-3 rounded-xl font-bold uppercase tracking-wider disabled:opacity-50"
              >
                Carregar Treino
              </button>
            </div>
         </section>
      </main>

      <BottomNav />
    </div>
  );
}
