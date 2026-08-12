'use client';

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, TrendingUp, Sparkles, Dumbbell, Download, FolderDown, Upload, 
  Trash2, ArrowRight, AlertTriangle, CheckCircle2, X 
} from 'lucide-react';
import { useWorkoutStore, WorkoutPlan } from '@/lib/workoutStore';

export function WorkoutManagementSection() {
  const { currentPlan, deleteCurrentPlan } = useWorkoutStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Export full backup JSON
  const handleExportBackup = () => {
    const store = useWorkoutStore.getState();
    const backupData = {
      appName: 'EVOLUX',
      type: 'workout_backup',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      currentPlan: store.currentPlan,
      questionnaire: store.questionnaire,
      workoutHistory: store.workoutHistory || [],
      userTemplates: store.userTemplates || [],
      settings: store.settings
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evolux_backup_completo_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup completo baixado com sucesso!');
  };

  // Export active workout plan JSON
  const handleExportCurrentPlan = () => {
    const store = useWorkoutStore.getState();
    if (!store.currentPlan) {
      showToast('Nenhum treino ativo para exportar.', 'error');
      return;
    }
    const planData = {
      appName: 'EVOLUX',
      type: 'workout_plan',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      plan: store.currentPlan
    };

    const jsonStr = JSON.stringify(planData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const planName = (store.currentPlan.phaseName || store.currentPlan.programName || 'treino')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    a.download = `evolux_treino_${planName}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Treino salvo em arquivo JSON!');
  };

  // Import JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const store = useWorkoutStore.getState();

        if (parsed.type === 'workout_backup' || (parsed.currentPlan || parsed.userTemplates || parsed.workoutHistory)) {
          if (parsed.currentPlan) store.setPlan(parsed.currentPlan);
          if (parsed.questionnaire) store.setQuestionnaireData(parsed.questionnaire);
          if (parsed.workoutHistory && Array.isArray(parsed.workoutHistory)) store.setWorkoutHistory(parsed.workoutHistory);
          if (parsed.userTemplates && Array.isArray(parsed.userTemplates)) store.setUserTemplates(parsed.userTemplates);
          if (parsed.settings) store.updateSettings(parsed.settings);

          showToast('Backup completo importado com sucesso!');
        } else if (parsed.type === 'workout_plan' && parsed.plan) {
          store.setPlan(parsed.plan);
          showToast(`Treino "${parsed.plan.phaseName || 'Importado'}" carregado!`);
        } else if (parsed.schedule && Array.isArray(parsed.schedule)) {
          store.setPlan(parsed as WorkoutPlan);
          showToast('Plano de treino importado com sucesso!');
        } else if (parsed.exercises && Array.isArray(parsed.exercises)) {
          const customPlan: WorkoutPlan = {
            id: `imported_${Date.now()}`,
            generatedAt: new Date().toISOString(),
            phaseName: parsed.focus || parsed.dayName || 'Treino Importado',
            schedule: [parsed],
          };
          store.setPlan(customPlan);
          showToast('Treino avulso importado com sucesso!');
        } else {
          showToast('Formato JSON não reconhecido.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Erro ao ler arquivo JSON. Verifique o arquivo.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section className="pb-6 space-y-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold shadow-xl border ${
              toast.type === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
              <span>{toast.text}</span>
            </div>
            <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-2">
        <h2 className="text-xl font-black text-text-primary font-display tracking-tight">
          Ações & Ferramentas
        </h2>
        <span className="text-[10px] uppercase font-mono font-bold text-text-secondary bg-surface border border-surface-light px-2.5 py-1 rounded-full">
          Opções de Treino
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* 1. Opção Manual (Treino Personalizado) */}
        <Link 
          to="/workouts/free" 
          className="bg-surface rounded-2xl border border-surface-light p-4 flex items-center justify-between gap-3 hover:bg-surface-light transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0">
              <Zap size={20} className="text-neon-blue group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-text-primary">Opção Manual (Treino Personalizado)</h3>
                <span className="text-[9px] bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-full font-bold uppercase">Manual</span>
              </div>
              <p className="text-text-secondary text-xs font-medium mt-0.5">Monte do zero ou monte treinos avulsos sem IA.</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-secondary group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
        </Link>

        {/* 2. Meu Progresso */}
        <Link 
          to="/workouts/history" 
          className="bg-surface rounded-2xl border border-surface-light p-4 flex items-center justify-between gap-3 hover:bg-surface-light transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center shrink-0">
              <TrendingUp size={20} className="text-neon-purple group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-sm font-black text-text-primary">Meu Progresso</h3>
              <p className="text-text-secondary text-xs font-medium mt-0.5">Histórico, carga acumulada e PRs dos seus treinos.</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-secondary group-hover:text-neon-purple group-hover:translate-x-1 transition-all" />
        </Link>

        {/* 3. Treinos Prontos */}
        <Link 
          to="/workouts/templates" 
          className="bg-surface rounded-2xl border border-surface-light p-4 flex items-center justify-between gap-3 hover:bg-surface-light transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-neon-blue group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-sm font-black text-text-primary">Treinos Prontos</h3>
              <p className="text-text-secondary text-xs font-medium mt-0.5">Explore fichas de treino criadas por especialistas.</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-secondary group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
        </Link>

        {/* 4. Biblioteca de Movimentos */}
        <Link 
          to="/workouts/library" 
          className="bg-surface rounded-2xl border border-surface-light p-4 flex items-center justify-between gap-3 hover:bg-surface-light transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-text-primary/5 border border-text-primary/10 flex items-center justify-center shrink-0">
              <Dumbbell size={20} className="text-text-secondary group-hover:text-text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-black text-text-primary">Biblioteca de Movimentos</h3>
              <p className="text-text-secondary text-xs font-medium mt-0.5">Consulte execuções e músculos de +100 exercícios.</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
        </Link>

        {/* SECTION BREAK: EXPORT / IMPORT / BACKUP */}
        <div className="pt-2">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary mb-2">
            Exportação & Backup JSON
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Salvar JSON (Exportar Treino Ativo) */}
            <button
              onClick={handleExportCurrentPlan}
              disabled={!currentPlan}
              className={`p-4 bg-surface rounded-2xl border border-surface-light flex flex-col justify-between text-left transition-all ${
                currentPlan 
                  ? 'hover:border-emerald-500/40 hover:bg-emerald-500/5 active:scale-[0.98]' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Download size={18} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-text-primary/5 text-text-secondary">.json</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-text-primary">Salvar JSON</h4>
                <p className="text-text-secondary text-[11px] font-medium mt-0.5">Exportar o treino atual em JSON.</p>
              </div>
            </button>

            {/* Gere um Backup Completo */}
            <button
              onClick={handleExportBackup}
              className="p-4 bg-surface rounded-2xl border border-surface-light flex flex-col justify-between text-left hover:border-cyan-500/40 hover:bg-cyan-500/5 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <FolderDown size={18} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-text-primary/5 text-text-secondary">Backup</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-text-primary">Gere um Backup Completo</h4>
                <p className="text-text-secondary text-[11px] font-medium mt-0.5">Salvar plano, histórico e templates em JSON.</p>
              </div>
            </button>
          </div>
        </div>

        {/* IMPORT / DELETE SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Importar Treino (JSON) / Escolher Arquivo .json */}
          <div className="p-4 bg-surface rounded-2xl border border-surface-light flex flex-col justify-between text-left hover:border-amber-500/40 transition-all">
            <input 
              type="file" 
              ref={fileInputRef} 
              accept=".json" 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Upload size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Importar</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-text-primary mb-1">Importar Treino (JSON)</h4>
              <p className="text-text-secondary text-[11px] font-medium mb-3">Restaure backup ou carregue treino .json enviado.</p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Upload size={14} />
                Escolher Arquivo .json
              </button>
            </div>
          </div>

          {/* Excluir Treino Atual */}
          <div className="p-4 bg-surface rounded-2xl border border-surface-light flex flex-col justify-between text-left hover:border-red-500/40 transition-all">
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <Trash2 size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-400">Excluir</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-text-primary mb-1">Excluir Treino Atual</h4>
              <p className="text-text-secondary text-[11px] font-medium mb-3">
                {currentPlan ? 'Excluir o plano ativo e criar um novo.' : 'Nenhum treino ativo no momento.'}
              </p>

              <button
                onClick={() => setConfirmDeleteModal(true)}
                disabled={!currentPlan}
                className={`w-full py-2 px-3 font-bold text-xs rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  currentPlan
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30 cursor-pointer'
                    : 'bg-text-primary/5 text-text-secondary border-surface-light cursor-not-allowed opacity-50'
                }`}
              >
                <Trash2 size={14} />
                Excluir Treino
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <AnimatePresence>
        {confirmDeleteModal && (
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
              className="bg-surface w-full max-w-sm rounded-2xl p-5 border border-surface-light shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-text-primary">Excluir Treino Ativo</h3>
                <p className="text-text-secondary text-xs mt-1.5 leading-relaxed">
                  Tem certeza que deseja excluir seu plano de treino atual? Isso redefinirá seu plano principal, permitindo criar ou carregar outro. Seu histórico de treinos concluídos continuará salvo.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    deleteCurrentPlan();
                    setConfirmDeleteModal(false);
                    showToast('Plano de treino excluído com sucesso!');
                  }}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-text-primary font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Sim, Excluir Treino
                </button>
                <button
                  onClick={() => setConfirmDeleteModal(false)}
                  className="w-full py-3 bg-text-primary/5 hover:bg-text-primary/10 text-text-secondary font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
