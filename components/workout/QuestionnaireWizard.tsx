import { useNavigate } from 'react-router-dom';
"use client";

import { useState, useEffect } from 'react';
import { generateAI } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { useWorkoutStore, WorkoutQuestionnaire } from '@/lib/workoutStore';
import { useAppStore } from '@/lib/store';
import { EXERCISE_LIBRARY } from '@/lib/exerciseLibrary';
import { Download, BrainCircuit, Dumbbell, User, HeartPulse, Target, ShieldCheck, Zap, ArrowRight, ArrowLeft, PenTool, Type } from 'lucide-react';


const generateId = () => typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

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
  
  const [stepIndex, setStepIndex] = useState(() => {
    const saved = localStorage.getItem('workout_q_step');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [data, setData] = useState<WorkoutQuestionnaire>(() => {
    const saved = localStorage.getItem('workout_q_data');
    return saved ? JSON.parse(saved) : {};
  });
  
  useEffect(() => {
    localStorage.setItem('workout_q_step', stepIndex.toString());
  }, [stepIndex]);
  
  useEffect(() => {
    localStorage.setItem('workout_q_data', JSON.stringify(data));
  }, [data]);
  
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
    if (profile.role === 'admin' || profile.plan === 'nova' || profile.plan === 'infinite') return true;

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

  const planSystemInstruction = `Você é o Evolux AI, um Personal Trainer, Fisiologista e Treinador de Alta Performance de elite mundial.
Sua missão é criar o planejamento de treino mais estruturado, científico, biomecanicamente correto e eficiente possível para o usuário.
Você tem profundo conhecimento sobre periodização, hipertrofia, força, mobilidade e nutrição esportiva. 
Crie protocolos de nível profissional (com aquecimento específico, mobilidade, técnicas avançadas como Drop-set, Rest-Pause, Bi-set, etc., quando apropriado).
Seja técnico, direto, motivacional e focado na evolução absoluta.

IMPORTANTE: Responda APENAS E EXCLUSIVAMENTE com um objeto JSON estritamente válido, sem blocos de código markdown (\`\`\`) ou texto fora do JSON. Não inclua NENHUM texto de introdução ou conclusão. O primeiro caractere DEVE ser { e o último }.

REGRAS ESTRUTURAIS:
- "programName": Nome impactante do programa.
- "planPromptDescription": Uma descrição de alto impacto sobre o protocolo e a ciência por trás.
- Gere de 2 a 4 fases lógicas em "phases" (ex: Adaptação, Hipertrofia, Força).
- Cada fase deve ter "id", "name", "description", "durationWeeks" e "schedule".
- O "schedule" DEVE obrigatoriamente ser um array contendo os 7 dias da semana (ex: Segunda-feira a Domingo). Para os dias em que o usuário não treinar, marque "isRest": true e "focus": "Descanso".
- Adeque a quantidade de dias de treino (isRest: false) exatamente ao que foi pedido pelo usuário no campo "daysPerWeek".
- Dias de treino DEVEM incluir "warmup" (array de strings) e "cooldown" (array de strings).
- "exercises" DEVE ser um array detalhado. Inclua no mínimo de 4 a 8 exercícios por dia de treino ativo, preenchendo todos os campos, incluindo "instructions", "restSeconds", etc.
- Se "includeCardio" for verdadeiro, adicione um item em exercises (ex: "Esteira", "Corda") com "instructions" claras para o cardio (ex: 20 min HIIT).

FORMATO DO JSON EXIGIDO:
{
  "programName": "Nome do Programa",
  "planPromptDescription": "Descrição inspiradora e técnica geral.",
  "phases": [
    {
      "id": "fase_1",
      "name": "Fase 1: Tensão e Controle",
      "description": "Foco na execução, ativação neuromuscular e progressão de carga linear.",
      "durationWeeks": 4,
      "schedule": [
        {
          "dayName": "Segunda-feira",
          "focus": "Peitoral e Tríceps",
          "isRest": false,
          "intensity": "Alta",
          "warmup": ["Aquecimento Manguito Rotador 3x15", "Flexão escapular 2x12"],
          "cooldown": ["Alongamento peitoral na parede 2x30s"],
          "exercises": [
            {
              "id": "ex_1",
              "name": "Supino Reto com Barra",
              "sets": 4,
              "reps": "8-10",
              "restSeconds": 90,
              "targetMuscles": ["Peitoral Maior", "Tríceps", "Deltoide Anterior"],
              "instructions": "Desça controlando a carga por 3s. Pausa de 1s no peito. Explosão na concêntrica.",
              "substitutions": ["Supino Reto com Halteres", "Supino Máquina"],
              "difficulty": "Intermediário",
              "equipment": "Barra e Banco",
              "tempo": "3010",
              "rir": "1-2",
              "advancedTechnique": "",
              "supersetGroup": ""
            }
          ]
        },
        {
          "dayName": "Terça-feira",
          "focus": "Descanso Ativo",
          "isRest": true,
          "intensity": "Baixa",
          "warmup": [],
          "cooldown": [],
          "exercises": []
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

      let cleanText = data.text;
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```/g, '');
      }
      cleanText = cleanText.trim();

      const planItem = JSON.parse(cleanText);
      
      if (!planItem.phases) {
        planItem.phases = [{
          id: 'fase_1',
          name: planItem.phaseName || 'Fase 1',
          description: planItem.planPromptDescription || '',
          durationWeeks: 4,
          schedule: planItem.schedule || []
        }];
        planItem.programName = planItem.phaseName || 'Programa de Treino';
      }
      
      if (!planItem.schedule && planItem.phases && planItem.phases.length > 0) {
        planItem.schedule = planItem.phases[0].schedule;
      }
      
      planItem.currentPhaseIndex = 0;
      planItem.currentWeekIndex = 0;

      _setPlan({
        ...planItem,
        id: generateId(),
        generatedAt: new Date().toISOString()
      });
      localStorage.removeItem('workout_q_step');
      localStorage.removeItem('workout_q_data');
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
    
    // Obter todos os nomes válidos da biblioteca
    const validExerciseNames = EXERCISE_LIBRARY.map(ex => ex.name).join(', ');

    const prompt = `Parse o seguinte texto informando treinos, rotina e exercícios do usuário e transforme estritamente no esquema JSON.
Identifique divisões, os exercícios, e adapte repetições e séries onde encontrar ou defina 3x10 como padrão. 
IMPORTANTE: Todos os exercícios listados devem ser selecionados APENAS da seguinte lista de exercícios disponíveis no sistema. Encontre o mais próximo possível se o nome for diferente:
${validExerciseNames}

Texto do Usuário:
"${text}"`;
    await requestGemini(prompt);
  };

  const generatePlanAI = async (finalData: WorkoutQuestionnaire) => {
    _setStoreQuestionnaire(finalData);
    
    // Obter todos os nomes válidos da biblioteca
    const validExerciseNames = EXERCISE_LIBRARY.map(ex => ex.name).join(', ');

    const prompt = `Gere um protocolo de treinamento hiper-preciso, profissional e totalmente personalizado com base neste perfil do aluno:
    
- NOME: ${finalData.name || 'Aluno'}
- GÊNERO: ${finalData.gender || 'Não especificado'}
- IDADE: ${finalData.age || 'Não especificada'} anos
- PESO: ${finalData.weight || 'Não especificado'} kg
- ALTURA: ${finalData.height || 'Não especificada'} cm
- OBJETIVO PRINCIPAL: ${finalData.mainGoal || 'Não especificado'}
- EXPERIÊNCIA: ${finalData.experienceLevel || 'Não especificado'}
- OBJETIVO ESPECÍFICO/RESTRIÇÕES: ${finalData.specificGoal || 'Nenhuma'}
- LOCAL DE TREINO: ${finalData.location || 'Não especificado'}
- EQUIPAMENTOS: ${(finalData.equipment || []).join(', ') || 'Padrão do local'}
- DIAS POR SEMANA: ${finalData.daysPerWeek || 3}
- TEMPO POR SESSÃO: ${finalData.minutesPerSession || 60} minutos
- NÍVEL DE ENERGIA: ${finalData.energyLevel || 'Normal'}
- INCLUIR CARDIO: ${finalData.includeCardio ? 'Sim' : 'Não'}

INSTRUÇÕES FINAIS PARA A IA:
- Você DEVE retornar exatamente um JSON no formato especificado no seu system prompt.
- Garanta que o "schedule" de cada fase tenha EXATAMENTE 7 itens, representando os 7 dias da semana.
- Como o aluno selecionou treinar ${finalData.daysPerWeek || 3} dias por semana, haverão ${7 - (finalData.daysPerWeek || 3)} dias marcados com "isRest": true.
- Adeque os exercícios, séries e repetições estritamente para o objetivo principal (${finalData.mainGoal || ''}).
- IMPORTANTE: Todos os exercícios listados devem ser selecionados APENAS da seguinte lista de exercícios disponíveis no sistema. NUNCA crie exercícios que não estejam nesta lista:
${validExerciseNames}
`;
    
    await requestGemini(prompt);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="mb-4 bg-surface p-4 rounded-full border border-surface-light shadow-[0_0_50px_rgba(0,210,255,0.15)]">
          <BrainCircuit className="w-16 h-16 text-neon-blue" />
        </motion.div>
        <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">Processando Protocolo...</h3>
        <p className="text-text-secondary font-medium text-sm leading-relaxed max-w-sm">Estruturando o plano ideal. Cada série, repetição e variável sendo perfeitamente ajustada para seu perfil.</p>
      </div>
    );
  }

  if (!method) {
    return (
      <div className="max-w-3xl mx-auto w-full pt-12">
        <h2 className="text-3xl font-black text-text-primary mb-2 text-center tracking-tight">Criação do Protocolo</h2>
        <p className="text-neon-blue text-center mb-12 text-[11px] font-black uppercase tracking-widest">Selecione o método de inicialização</p>

        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => setMethod('ai')}
            className="bg-surface border border-surface-light p-5 rounded-2xl text-left hover:border-neon-blue/50 transition-all group flex flex-col items-start gap-4 shadow-lg active:scale-95"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-neon-blue/10 transition-colors shadow-inner">
              <BrainCircuit className="text-neon-blue" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">Construção com IA</h3>
              <p className="text-xs text-text-secondary font-medium leading-relaxed opacity-80">Responda um questionário rápido e deixe nossa inteligência criar o treino perfeito para seu biotipo e rotina.</p>
            </div>
          </button>

          <button 
            onClick={() => setMethod('manual')}
            className="bg-surface border border-surface-light p-5 rounded-2xl text-left hover:border-neon-purple/50 transition-all group flex flex-col items-start gap-4 shadow-lg active:scale-95"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-neon-purple/10 transition-colors shadow-inner">
              <Type className="text-neon-purple" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">Importar Fila de Treino</h3>
              <p className="text-xs text-text-secondary font-medium leading-relaxed opacity-80">Já tem um treino escrito? Cole o texto aqui e a IA converterá para o formato otimizado do sistema.</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (method === 'manual') {
    return (
      <div className="max-w-2xl mx-auto w-full pt-8 px-4">
        <div className="mb-4 flex justify-between items-center">
           <div>
             <h2 className="text-2xl font-black text-text-primary tracking-tight">Treino em Texto</h2>
             <p className="text-[10px] font-black text-neon-blue uppercase tracking-widest mt-1">Módulo de Conversão</p>
           </div>
           <button onClick={() => setMethod(null)} className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-text-primary rounded-2xl bg-surface border border-surface-light active:scale-95 transition-all">
             <ArrowLeft size={20} />
           </button>
        </div>

        <div className="bg-surface border border-surface-light p-5 rounded-2xl shadow-xl">
          <p className="text-xs text-text-secondary font-medium mb-4 leading-relaxed opacity-90">Cole abaixo a sua ficha de treino. O processamento neural identificará divisões, exercícios e periodicidade automaticamente.</p>
          <textarea 
            rows={12} 
            value={manualText} 
            onChange={(e) => setManualText(e.target.value)}
            className="w-full bg-background border border-surface-light rounded-[24px] p-4 text-text-primary font-medium focus:outline-none focus:border-neon-blue/50 leading-relaxed resize-none text-sm placeholder:text-text-primary/20 shadow-inner" 
            placeholder="Exemplo:&#10;Segunda: Peito e Tríceps&#10;- Supino Reto 4x10..." 
          />
        </div>

        <div className="flex justify-end mt-4">
          <button 
            onClick={handleManualSubmit}
            disabled={!manualText.trim()}
            className="w-full bg-neon-blue text-black py-3 rounded-[20px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-30 shadow-lg active:scale-95"
          >
            Processar Ficha <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  const StepIcon = currentStepInfo.icon;

  return (
    <div className="max-w-xl mx-auto w-full pt-4 px-4 font-sans text-text-primary">
       <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <StepIcon size={16} className="text-neon-blue" />
                 <span className="text-[11px] font-black text-text-secondary uppercase tracking-widest">Etapa Atual</span>
               </div>
               <h2 className="text-3xl font-black text-text-primary tracking-tight">
                 {currentStepInfo.title}
               </h2>
             </div>
             <span className="text-[11px] font-black text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-3 py-1.5 rounded-xl">{stepIndex + 1} / {STEPS.length}</span>
          </div>
          <div className="flex gap-2 w-full">
            {STEPS.map((s, i) => (
              <div key={s.id} className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${i <= stepIndex ? 'bg-neon-blue' : ''}`}
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-surface border border-surface-light p-4 md:p-10 rounded-2xl shadow-2xl relative overflow-visible"
          >
            {stepIndex === 0 && ( /* Pessoais */
              <div className="space-y-4 relative z-10">
                 <div>
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Nome de Usuário</label>
                   <input type="text" value={data.name || ''} onChange={e => update('name', e.target.value)} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 transition-colors text-base shadow-inner" placeholder="Nome do Aluno" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                     <div>
                       <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Idade</label>
                       <input type="number" value={data.age || ''} onChange={e => update('age', parseInt(e.target.value))} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 text-base shadow-inner" placeholder="Ex: 25" />
                     </div>
                     <div>
                       <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Altura (CM)</label>
                       <input type="number" value={data.height || ''} onChange={e => update('height', parseInt(e.target.value))} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 text-base shadow-inner" placeholder="Ex: 175" />
                     </div>
                   </div>
                   <div className="space-y-4">
                     <div>
                       <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Perfil Biológico</label>
                       <select value={data.gender || ''} onChange={e => update('gender', e.target.value)} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 appearance-none text-base cursor-pointer shadow-inner">
                         <option value="">Selecione...</option>
                         <option value="Masculino">Masculino</option>
                         <option value="Feminino">Feminino</option>
                       </select>
                     </div>
                     <div>
                       <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Peso (KG)</label>
                       <input type="number" value={data.weight || ''} onChange={e => update('weight', parseInt(e.target.value))} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 text-base shadow-inner" placeholder="Ex: 80" />
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {stepIndex === 1 && ( /* Objetivo Principal */
              <div className="space-y-3 relative z-10">
                 <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 text-center">Objetivo Principal</p>
                 {[
                   { label: 'Emagrecimento & Definição', desc: 'Perda acelerada de gordura corporal.' },
                   { label: 'Hipertrofia Muscular', desc: 'Volume máximo, focado em quebra de fibras.' },
                   { label: 'Força Bruta', desc: 'Séries de baixa repetição e alta carga.' },
                   { label: 'Condicionamento / Saúde', desc: 'Bem-estar e preparo físico equilibrado.' }
                 ].map(opt => (
                   <button 
                     key={opt.label}
                     onClick={() => { update('mainGoal', opt.label); setTimeout(handleNext, 300) }}
                     className={`w-full text-left p-4 sm:p-5 rounded-[24px] border transition-all duration-300 active:scale-95 ${data.mainGoal === opt.label ? 'border-neon-blue bg-neon-blue/10 shadow-lg' : 'border-surface-light bg-background hover:border-white/20'}`}
                   >
                     <h4 className={`text-base font-black mb-1 ${data.mainGoal === opt.label ? 'text-neon-blue' : 'text-text-primary'}`}>{opt.label}</h4>
                     <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{opt.desc}</p>
                   </button>
                 ))}
              </div>
            )}

            {stepIndex === 2 && ( /* Meta Específica e Experiencia */
              <div className="space-y-4 relative z-10">
                 <div>
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block">Nível de Experiência</label>
                   <div className="grid grid-cols-1 gap-3">
                     {['Iniciante (< 6 meses)', 'Intermediário (1-3 anos)', 'Avançado (3+ anos)', 'Retornando agora'].map(opt => (
                       <button
                         key={opt}
                         onClick={() => update('experienceLevel', opt)}
                         className={`p-5 rounded-[20px] border text-sm font-black transition-all text-left uppercase tracking-wider ${data.experienceLevel === opt ? 'bg-white text-black border-white shadow-lg' : 'bg-background border-surface-light text-text-secondary hover:border-white/20'}`}
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block">Detalhes Adicionais (Opcional)</label>
                   <textarea rows={4} value={data.specificGoal || ''} onChange={e => update('specificGoal', e.target.value)} className="w-full bg-background border border-surface-light rounded-[24px] p-4 text-text-primary font-medium outline-none focus:border-neon-blue/50 leading-relaxed resize-none text-sm placeholder:text-text-primary/20 shadow-inner" placeholder="Tem alguma especificidade? Dores ou restrições?" />
                 </div>
              </div>
            )}

            {stepIndex === 3 && ( /* Customization / Equipment */
              <div className="space-y-4 relative z-10">
                 <div>
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block">Ambiente Principal de Treino</label>
                   <div className="grid grid-cols-1 gap-3">
                     {['Academia Completa', 'Academia de Prédio', 'Em Casa (Com Equipamento)', 'Em Casa (Sem Equipamento)'].map(opt => (
                       <button
                         key={opt}
                         onClick={() => update('location', opt)}
                         className={`p-5 rounded-[20px] border text-sm font-black transition-all text-left uppercase tracking-wider ${data.location === opt ? 'bg-neon-blue/20 text-neon-blue border-neon-blue shadow-lg' : 'bg-background border-surface-light text-text-secondary hover:border-white/20'}`}
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                 </div>

                 {['Academia de Prédio', 'Em Casa (Com Equipamento)'].includes(data.location || '') && (
                   <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }}>
                     <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block">Equipamentos Disponíveis</label>
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
                             className={`px-4 py-3 rounded-xl border text-[10px] font-black transition-all uppercase tracking-widest ${isSelected ? 'border-neon-blue bg-neon-blue/20 text-text-primary' : 'border-surface-light bg-background text-text-secondary hover:text-text-primary'}`}
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
              <div className="space-y-4 relative z-10 text-center">
                 <div>
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block font-center">Metas de Treino Semanais</label>
                   <div className="flex justify-center items-center gap-10 bg-background rounded-2xl p-5 border border-surface-light w-full max-w-[280px] mx-auto shadow-inner">
                     <button 
                       onClick={() => update('daysPerWeek', Math.max(1, (data.daysPerWeek || 3) - 1))}
                       className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl border border-surface-light hover:bg-white/10 transition-colors text-2xl active:scale-95"
                     >-</button>
                     <div className="text-6xl font-black text-text-primary tracking-tighter">{data.daysPerWeek || 3}</div>
                     <button 
                       onClick={() => update('daysPerWeek', Math.min(7, (data.daysPerWeek || 3) + 1))}
                       className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl border border-surface-light hover:bg-white/10 transition-colors text-2xl active:scale-95"
                     >+</button>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 text-left">
                   <div>
                     <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Duração (Min)</label>
                     <select value={data.minutesPerSession || ''} onChange={e => update('minutesPerSession', parseInt(e.target.value))} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 text-sm appearance-none shadow-inner cursor-pointer">
                       <option value={30}>30 min</option>
                       <option value={45}>45 min</option>
                       <option value={60}>60 min</option>
                       <option value={90}>90 min</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 block">Nível de Energia</label>
                     <select value={data.energyLevel || ''} onChange={e => update('energyLevel', e.target.value)} className="w-full bg-background border border-surface-light rounded-[20px] p-5 text-text-primary font-black outline-none focus:border-neon-blue/50 text-sm appearance-none shadow-inner cursor-pointer">
                       <option value="Oscilante">Normal / Oscilante</option>
                       <option value="Energia Alta">Alta Perfomance</option>
                       <option value="Sempre Cansado">Sempre Cansado</option>
                     </select>
                   </div>
                 </div>

                 <div className="pt-2 text-left">
                   <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 block">Incluir Cardio?</label>
                   <div className="grid grid-cols-2 gap-3">
                     {[
                       { value: true, label: 'Sim, incluir' },
                       { value: false, label: 'Não, apenas peso' }
                     ].map(opt => (
                       <button
                         key={opt.label}
                         onClick={() => update('includeCardio', opt.value)}
                         className={`p-4 rounded-[24px] border text-[10px] font-black tracking-widest uppercase transition-all flex justify-start items-center gap-3 ${data.includeCardio === opt.value ? 'bg-neon-blue/10 text-neon-blue border-neon-blue shadow-lg' : 'bg-background border-surface-light text-text-secondary hover:text-text-primary'}`}
                       >
                         {opt.value && <HeartPulse size={20} className={data.includeCardio === opt.value ? 'text-neon-blue' : 'text-text-secondary'} />}
                         {!opt.value && <Zap size={20} className={data.includeCardio === opt.value ? 'text-neon-blue' : 'text-text-secondary'} />}
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
           className="w-16 h-16 flex items-center justify-center text-text-secondary hover:text-text-primary bg-surface border border-surface-light rounded-2xl transition-all active:scale-95 shadow-lg"
         >
           <ArrowLeft size={22} />
         </button>
         <button 
           onClick={handleNext}
           className="flex-1 h-16 bg-neon-blue text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg active:scale-95 text-sm"
         >
           {stepIndex < STEPS.length - 1 ? 'Próxima Etapa' : 'Gerar Protocolo'} <ArrowRight size={22} />
         </button>
       </div>
    </div>
  );
}
