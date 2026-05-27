"use client";

import { useState } from 'react';
import { generateAI } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { useWorkoutStore, WorkoutQuestionnaire } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { Download, BrainCircuit, Dumbbell, User, HeartPulse, Target, ShieldCheck, Zap, ArrowRight, ArrowLeft, PenTool, Type } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 'personal', title: 'Dados Pessoais', icon: User },
  { id: 'goal', title: 'Objetivo Principal', icon: Target },
  { id: 'specific', title: 'Detalhes da Meta', icon: Target },
  { id: 'customization', title: 'Personalização do Treino', icon: Dumbbell },
  { id: 'lifestyle', title: 'Estilo de Vida', icon: HeartPulse }
];

export function QuestionnaireWizard({ setStoreQuestionnaire, setPlan }: { setStoreQuestionnaire?: any, setPlan?: any }) {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const [method, setMethod] = useState<'ai' | 'manual' | null>(null);
  const [manualText, setManualText] = useState('');
  
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<WorkoutQuestionnaire>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const globalSetPlan = useWorkoutStore(s => s.setPlan);
  const globalSetStoreQuestionnaire = useWorkoutStore(s => s.setQuestionnaireData);

  const _setStoreQuestionnaire = setStoreQuestionnaire || globalSetStoreQuestionnaire;
  const _setPlan = setPlan || globalSetPlan;

  const checkAILimits = () => {
    // Basic limit simulation using localStorage and profile plan
    if (!profile) return true;
    const key = `evolux_ai_uses_${new Date().toDateString()}`;
    const uses = parseInt(localStorage.getItem(key) || '0');
    
    let maxUses = 3;
    if (profile.plan === 'orbit') maxUses = 20;
    if (profile.plan === 'nova' || profile.plan === 'infinite') return true;

    if (uses >= maxUses) {
      alert(`Limite de IA diário atingido (${maxUses} usos) para seu plano. Faça upgrade para continuar!`);
      return false;
    }
    localStorage.setItem(key, (uses + 1).toString());
    return true;
  };

  const update = (key: keyof WorkoutQuestionnaire, value: any) => setData(d => ({ ...d, [key]: value }));

  const currentStepInfo = STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(s => s + 1);
    } else {
      if (checkAILimits()) generatePlanAI(data);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(s => s - 1);
    else setMethod(null);
  };

  const handleManualSubmit = () => {
    if (!manualText.trim()) return;
    if (checkAILimits()) generatePlanManual(manualText);
  };

  const planSystemInstruction = `Você é o Evolux AI, um treinador de elite, estritamente técnico e inteligente.
Sua missão é criar ou parsear um plano de treinamento extremamente preciso e profissional.
IMPORTANTE: A quantidade de exercícios gerados DEVE ser proporcional ao tempo de treino solicitado (minutos por sessão). Para um treino de 60 minutos, forneça pelo menos 6-8 exercícios; para 45 minutos, 5-6 exercícios, etc. CADA exercício listado no treino DEVE ser completo. Se o usuário escolheu incluir Cardio (includeCardio: true), inclua um exercício de cardio no final ou no início do treino (ex: Esteira, Bicicleta Ergométrica, Elíptico) com Duração/Intensidade configuradas em 'reps' (Ex: 15min) e 'sets' como 1.
Forneça APENAS JSON estruturado, sem blocos de código.
{
  "phaseName": "Nome descritivo (Ex: Adaptação, Hipertrofia Base, Meu Treino)",
  "planPromptDescription": "Breve justificativa técnica ou resumo",
  "schedule": [
    {
      "dayName": "Dia X",
      "focus": "Foco do dia",
      "isRest": boolean,
      "warmup": ["Aquecimento específico 1"],
      "cooldown": ["Volta à calma 1"],
      "intensity": "Moderada, Alta, etc",
      "exercises": [
        {
          "id": "str",
          "name": "Nome",
          "sets": 3,
          "reps": "8-12",
          "restSeconds": 60,
          "instructions": "Instruções",
          "targetMuscles": ["Peito", "Costas"],
          "equipment": "Halteres/Polia/Barra",
          "difficulty": "Intermediário"
        }
      ]
    }
  ]
}`;

  const requestGemini = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const data = await generateAI({
        prompt,
        model: 'gemini-2.5-flash',
        systemInstruction: planSystemInstruction,
        responseMimeType: 'application/json'
      });

      const planItem = JSON.parse(data.text);
      _setPlan({
        ...planItem,
        id: crypto.randomUUID(),
        generatedAt: new Date().toISOString()
      });
      if (!setPlan) navigate('/workouts');
    } catch (e: any) {
      console.error('Gemini error:', e);
      alert(`Erro no Evolux AI: ${e.message || 'Erro ao conectar ao servidor'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePlanManual = async (text: string) => {
    _setStoreQuestionnaire({ specificGoal: "Importado Manualmente" });
    const prompt = `Parse o seguinte texto informando treinos, rotina e exercícios do usuário e transforme estritamente no esquema JSON.\nIdentifique divisões, os exercícios, e adapte repetições e séries onde encontrar ou defina 3x10 como padrão. Use nomes de exercícios padronizados.\nTexto do Usuário:\n"${text}"`;
    await requestGemini(prompt);
  };

  const generatePlanAI = async (finalData: WorkoutQuestionnaire) => {
    _setStoreQuestionnaire(finalData);
    const prompt = `Gere o treino hiper-preciso baseado neste perfil detalhado:\n${JSON.stringify(finalData, null, 2)}`;
    await requestGemini(prompt);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="mb-6">
          <BrainCircuit className="w-16 h-16 text-neon-blue" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Processando Informações...</h3>
        <p className="text-text-secondary text-sm leading-relaxed max-w-sm">Estruturando o plano ideal. Cada série, repetição e variável perfeitamente ajustada para seu perfil.</p>
      </div>
    );
  }

  if (!method) {
    return (
      <div className="max-w-2xl mx-auto w-full pt-12">
        <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Criação do Protocolo</h2>
        <p className="text-text-secondary text-center mb-12 text-sm font-mono uppercase tracking-widest">Selecione o método de inicialização</p>

        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => setMethod('ai')}
            className="bg-surface border border-white/5 p-8 rounded-[2rem] text-left hover:border-neon-blue/30 transition-all group flex flex-col items-start gap-6 shadow-lg active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-neon-blue/10 transition-colors">
              <BrainCircuit className="text-neon-blue" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Construção com IA</h3>
              <p className="text-xs text-text-secondary leading-relaxed opacity-60">Responda um questionário rápido e deixe nossa inteligência criar o treino perfeito para seu biotipo e rotina.</p>
            </div>
          </button>

          <button 
            onClick={() => setMethod('manual')}
            className="bg-surface border border-white/5 p-8 rounded-[2rem] text-left hover:border-neon-purple/30 transition-all group flex flex-col items-start gap-6 shadow-lg active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-neon-purple/10 transition-colors">
              <Type className="text-neon-purple" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Importar Fila de Treino em Texto</h3>
              <p className="text-xs text-text-secondary leading-relaxed opacity-60">Já tem um treino escrito? Cole o texto aqui e a IA converterá para o formato otimizado do sistema.</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (method === 'manual') {
    return (
      <div className="max-w-xl mx-auto w-full pt-8 px-4">
        <div className="mb-8 flex justify-between items-center">
           <div>
             <h2 className="text-xl font-bold text-white tracking-tight">Treino em Texto</h2>
             <p className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-widest">Módulo de Conversão</p>
           </div>
           <button onClick={() => setMethod(null)} className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-white rounded-xl bg-surface border border-white/5">
             <ArrowLeft size={18} />
           </button>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <p className="text-xs text-text-secondary mb-6 leading-relaxed opacity-70">Cole abaixo a sua ficha de treino. O processamento neural identificará divisões, exercícios e periodicidade.</p>
          <textarea 
            rows={10} 
            value={manualText} 
            onChange={(e) => setManualText(e.target.value)}
            className="w-full bg-background border border-white/5 rounded-[1.5rem] p-5 text-white focus:outline-none focus:border-neon-purple/50 leading-relaxed resize-none text-sm placeholder:text-white/10" 
            placeholder="Exemplo:&#10;Segunda: Peito e Tríceps&#10;- Supino Reto 4x10..." 
          />
        </div>

        <div className="flex justify-end mt-8">
          <button 
            onClick={handleManualSubmit}
            disabled={!manualText.trim()}
            className="w-full bg-white text-background py-5 rounded-[1.5rem] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all disabled:opacity-30 shadow-xl"
          >
            Processar Ficha <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const StepIcon = currentStepInfo.icon;

  return (
    <div className="max-w-xl mx-auto w-full pt-4 px-4">
       <div className="mb-10">
          <div className="flex justify-between items-end mb-6">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <StepIcon size={14} className="text-neon-blue" />
                 <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.2em]">Passo</span>
               </div>
               <h2 className="text-2xl font-bold text-white tracking-tight">
                 {currentStepInfo.title}
               </h2>
             </div>
             <span className="text-[10px] font-mono font-bold text-neon-blue bg-neon-blue/5 border border-neon-blue/20 px-3 py-1 rounded-full">{stepIndex + 1} / {STEPS.length}</span>
          </div>
          <div className="flex gap-2 w-full">
            {STEPS.map((s, i) => (
              <div key={s.id} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${i <= stepIndex ? 'bg-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.3)]' : ''}`}
                  initial={{ width: 0 }}
                  animate={{ width: i <= stepIndex ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
       </div>

       <AnimatePresence mode="wait">
          <motion.div
            key={currentStepInfo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-surface border border-white/5 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            {/* Subtle light effect inside the card */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-blue/5 blur-[50px] rounded-full pointer-events-none" />

            {stepIndex === 0 && ( /* Pessoais */
              <div className="space-y-8 relative z-10">
                 <div>
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3 block">Nome de Usuário</label>
                   <input type="text" value={data.name || ''} onChange={e => update('name', e.target.value)} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 transition-colors text-base" placeholder="Nome do Aluno" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-6">
                     <div>
                       <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3 block">Idade</label>
                       <input type="number" value={data.age || ''} onChange={e => update('age', parseInt(e.target.value))} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 text-base" placeholder="Idade" />
                     </div>
                     <div>
                       <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3 block">Altura (CM)</label>
                       <input type="number" value={data.height || ''} onChange={e => update('height', parseInt(e.target.value))} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 text-base" placeholder="Ex: 175" />
                     </div>
                   </div>
                   <div className="space-y-6">
                     <div>
                       <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3 block">Perfil Biológico</label>
                       <select value={data.gender || ''} onChange={e => update('gender', e.target.value)} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 appearance-none text-base">
                         <option value="">Selecione...</option>
                         <option value="Masculino">Masculino</option>
                         <option value="Feminino">Feminino</option>
                       </select>
                     </div>
                     <div>
                       <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-3 block">Peso (KG)</label>
                       <input type="number" value={data.weight || ''} onChange={e => update('weight', parseInt(e.target.value))} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 text-base" placeholder="Ex: 80" />
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {stepIndex === 1 && ( /* Objetivo Principal */
              <div className="space-y-3 relative z-10">
                 <p className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em] mb-8 text-center opacity-60">Objetivo Principal</p>
                 {[
                   { label: 'Emagrecimento & Definição', desc: 'Perda acelerada de gordura corporal.' },
                   { label: 'Hipertrofia Muscular', desc: 'Volume máximo, focado em quebra de fibras.' },
                   { label: 'Força Bruta', desc: 'Séries de baixa repetição e alta carga.' },
                   { label: 'Condicionamento / Saúde', desc: 'Bem-estar e preparo físico equilibrado.' }
                 ].map(opt => (
                   <button 
                     key={opt.label}
                     onClick={() => { update('mainGoal', opt.label); setTimeout(handleNext, 300) }}
                     className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${data.mainGoal === opt.label ? 'border-neon-blue/50 bg-neon-blue/5 shadow-[0_0_20px_rgba(0,240,255,0.05)]' : 'border-white/5 bg-background/50 hover:border-white/10'}`}
                   >
                     <h4 className={`text-base font-bold mb-1 ${data.mainGoal === opt.label ? 'text-neon-blue' : 'text-white'}`}>{opt.label}</h4>
                     <p className="text-[10px] text-text-secondary uppercase tracking-widest font-mono opacity-50">{opt.desc}</p>
                   </button>
                 ))}
              </div>
            )}

            {stepIndex === 2 && ( /* Meta Específica e Experiencia */
              <div className="space-y-10 relative z-10">
                 <div>
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-5 block">Nível de Experiência</label>
                   <div className="grid grid-cols-1 gap-3">
                     {['Iniciante (< 6 meses)', 'Intermediário (1-3 anos)', 'Avançado (3+ anos)', 'Retornando agora'].map(opt => (
                       <button
                         key={opt}
                         onClick={() => update('experienceLevel', opt)}
                         className={`p-5 rounded-2xl border text-sm font-bold transition-all text-left ${data.experienceLevel === opt ? 'bg-white text-background border-white' : 'bg-background border-white/5 text-text-secondary hover:border-white/10'}`}
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-4 block">Detalhes Adicionais (Opcional)</label>
                   <textarea rows={4} value={data.specificGoal || ''} onChange={e => update('specificGoal', e.target.value)} className="w-full bg-background border border-white/5 rounded-2xl p-5 text-white focus:outline-none focus:border-neon-blue/50 leading-relaxed resize-none text-sm placeholder:text-white/10" placeholder="Tem alguma especificidade? Dores ou restrições?" />
                 </div>
              </div>
            )}

            {stepIndex === 3 && ( /* Customization / Equipment */
              <div className="space-y-10 relative z-10">
                 <div>
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-5 block">Ambiente Principal de Treino</label>
                   <div className="grid grid-cols-1 gap-3">
                     {['Academia Completa', 'Academia de Prédio', 'Em Casa (Com Equipamento)', 'Em Casa (Sem Equipamento)'].map(opt => (
                       <button
                         key={opt}
                         onClick={() => update('location', opt)}
                         className={`p-5 rounded-2xl border text-sm font-bold transition-all text-left ${data.location === opt ? 'bg-neon-purple/20 text-neon-purple border-neon-purple' : 'bg-background border-white/5 text-text-secondary hover:border-white/10'}`}
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                 </div>

                 {['Academia de Prédio', 'Em Casa (Com Equipamento)'].includes(data.location || '') && (
                   <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 5 }}>
                     <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-5 block">Equipamentos Disponíveis</label>
                     <div className="flex flex-wrap gap-2">
                       {['Halteres', 'Barra', 'Anilhas', 'Banco Inclinável', 'Máquina Multifuncional', 'Elásticos', 'Kettlebell', 'Esteira'].map(opt => {
                         const isSelected = (data.equipment || []).includes(opt);
                         return (
                           <button
                             key={opt}
                             onClick={() => {
                               const eq = data.equipment || [];
                               update('equipment', isSelected ? eq.filter(e => e !== opt) : [...eq, opt]);
                             }}
                             className={`px-4 py-2 rounded-xl border text-[10px] font-mono font-bold transition-all uppercase tracking-wider ${isSelected ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-white/5 bg-background text-text-secondary opacity-60 hover:opacity-100'}`}
                           >
                             {opt}
                           </button>
                         )
                       })}
                     </div>
                   </motion.div>
                 )}
              </div>
            )}

            {stepIndex === 4 && ( /* Lifestyle / Frequency */
              <div className="space-y-10 relative z-10 text-center">
                 <div>
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-8 block font-center">Metas de Treino Semanais</label>
                   <div className="flex justify-center items-center gap-10 bg-background/50 rounded-[2rem] p-8 border border-white/5 w-full max-w-xs mx-auto shadow-inner">
                     <button 
                       onClick={() => update('daysPerWeek', Math.max(1, (data.daysPerWeek || 3) - 1))}
                       className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-2xl"
                     >-</button>
                     <div className="text-5xl font-bold text-white tracking-tighter">{data.daysPerWeek || 3}</div>
                     <button 
                       onClick={() => update('daysPerWeek', Math.min(7, (data.daysPerWeek || 3) + 1))}
                       className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-2xl"
                     >+</button>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 text-left">
                   <div>
                     <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.1em] mb-3 block">Duração (Min)</label>
                     <select value={data.minutesPerSession || ''} onChange={e => update('minutesPerSession', parseInt(e.target.value))} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 text-sm appearance-none">
                       <option value={30}>30 min</option>
                       <option value={45}>45 min</option>
                       <option value={60}>60 min</option>
                       <option value={90}>90 min</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.1em] mb-3 block">Nível de Energia</label>
                     <select value={data.energyLevel || ''} onChange={e => update('energyLevel', e.target.value)} className="w-full bg-background border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue/50 text-sm appearance-none">
                       <option value="Oscilante">Normal / Oscilante</option>
                       <option value="Energia Alta">Alta Perfomance</option>
                       <option value="Sempre Cansado">Sempre Cansado</option>
                     </select>
                   </div>
                 </div>

                 <div className="pt-4">
                   <label className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-[0.15em] mb-6 block">Incluir Cardio?</label>
                   <div className="grid grid-cols-2 gap-3">
                     {[
                       { value: true, label: 'Sim, incluir' },
                       { value: false, label: 'Não, apenas peso' }
                     ].map(opt => (
                       <button
                         key={opt.label}
                         onClick={() => update('includeCardio', opt.value)}
                         className={`p-5 rounded-2xl border text-[10px] font-mono font-bold tracking-[0.1em] uppercase transition-all flex flex-col items-center justify-center gap-3 ${data.includeCardio === opt.value ? 'bg-amber-500/10 text-amber-500 border-amber-500' : 'bg-background border-white/5 text-text-secondary opacity-60 hover:opacity-100'}`}
                       >
                         {opt.value && <HeartPulse size={18} className={data.includeCardio === opt.value ? 'text-amber-500' : 'text-text-secondary'} />}
                         {!opt.value && <Zap size={18} className={data.includeCardio === opt.value ? 'text-amber-500' : 'text-text-secondary'} />}
                         {opt.label}
                       </button>
                     ))}
                   </div>
                 </div>
              </div>
            )}
          </motion.div>
       </AnimatePresence>

       <div className="flex gap-4 items-center mt-12 pb-10">
         <button 
           onClick={handleBack}
           className="w-20 h-16 flex items-center justify-center text-text-secondary hover:text-white bg-surface border border-white/5 rounded-[1.5rem] transition-all active:scale-[0.9] overflow-hidden"
         >
           <ArrowLeft size={22} />
         </button>
         <button 
           onClick={handleNext}
           className="flex-1 h-16 bg-white text-background rounded-[1.5rem] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-neon-blue hover:text-white transition-all shadow-xl active:scale-[0.98]"
         >
           {stepIndex < STEPS.length - 1 ? 'Próxima Etapa' : 'Finalizar Treino'} <ArrowRight size={22} />
         </button>
       </div>
    </div>
  );
}

