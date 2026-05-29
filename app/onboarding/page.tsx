'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore, Task, TaskCategory } from '@/lib/store';
import { useWorkoutStore } from '@/lib/workoutStore';
import { supabase } from '@/lib/supabase';
import { Target, BrainCircuit, Activity, ChevronRight, Check } from 'lucide-react';

function getLocalDateStr(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

type OnboardingAnswers = {
  goals: string[];
  levels: Record<string, number>;
  sleep: string;
  exercise: string;
  freetime: string;
  difficulties: string[];
  aiTone: string;
  mainGoal: string;
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { profile, completeOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    goals: [],
    levels: {
      Disciplina: 5,
      'Energia diária': 5,
      Sono: 5,
      Alimentação: 5,
      Foco: 5,
      Organização: 5,
      'Exercício físico': 5,
      Consistência: 5
    },
    sleep: '',
    exercise: '',
    freetime: '',
    difficulties: [],
    aiTone: '',
    mainGoal: ''
  });
  const [isFinishing, setIsFinishing] = useState(false);
  const [setupStep, setSetupStep] = useState(0);

  const steps = [
    'O que você quer desenvolver primeiro?',
    'Como você se avalia hoje?',
    'Sua Rotina Atual',
    'O que mais atrapalha você hoje?',
    'Personalidade da Inteligência Artificial',
    'Sua Meta Principal'
  ];

  const handleGoalToggle = (val: string) => {
    setAnswers(prev => ({
      ...prev,
      goals: prev.goals.includes(val) 
        ? prev.goals.filter(g => g !== val)
        : [...prev.goals, val]
    }));
  };

  const handleDifficultyToggle = (val: string) => {
    setAnswers(prev => ({
      ...prev,
      difficulties: prev.difficulties.includes(val) 
        ? prev.difficulties.filter(g => g !== val)
        : [...prev.difficulties, val]
    }));
  };

  const finishOnboarding = async () => {
    setIsFinishing(true);
    setSetupStep(1);

    // Salvar preferência de IA internamente
    useAppStore.setState(state => ({
      profile: state.profile ? { ...state.profile, ai_personality: answers.aiTone } : null
    }));

    // Simular instalação e setups OS level
    setTimeout(() => setSetupStep(2), 2000); 
    
    try {
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
    } catch (e) {}

    setTimeout(() => setSetupStep(3), 4000); 

    // Sync to Supabase
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Atualiza perfil no Supabase
        await supabase.from('profiles').update({
          is_onboarded: true,
          ai_personality: answers.aiTone
        }).eq('id', session.user.id);
        
        // Salva questionario no ai_memory
        await supabase.from('ai_memory').upsert({
          user_id: session.user.id,
          questionnaire_data: answers,
          preferences: { aiTone: answers.aiTone, mainGoal: answers.mainGoal }
        });
      }
    } catch (err) {
      console.error(err);
    }
    
    setTimeout(async () => {
      setSetupStep(4);
      
      const today = getLocalDateStr(new Date());
      const initialTasks: Task[] = [];
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const prepareTaskAndPush = async (title: string, category: TaskCategory, xpReward: number = 10) => {
        const t: Task = {
          id: Date.now().toString() + Math.random().toString(),
          title,
          completed: false,
          date: today,
          baseDate: today,
          category,
          xpReward,
          isRecurring: true
        };
        initialTasks.push(t);
        
        if (session?.user) {
           await supabase.from('tasks').insert({
             user_id: session.user.id,
             title: t.title,
             category: t.category,
             xp_reward: t.xpReward,
             date: t.date,
             base_date: t.baseDate,
             is_recurring: true,
             completed: false
           });
        }
      };

      await prepareTaskAndPush('💧 Hidratação Diária (2L+)', 'routine', 10);
      
      if (answers.goals.includes('Academia / físico') || answers.goals.includes('Saúde')) {
        await prepareTaskAndPush('🔥 Protocolo Físico (Treino ou Cardio Livre)', 'workout', 25);
      }
      
      if (answers.goals.includes('Foco') || answers.goals.includes('Estudos')) {
        await prepareTaskAndPush('🧠 Deep Work / Foco Total (Sem notificações)', 'routine', 25);
      }
      
      if (answers.sleep === 'Menos de 5h' || answers.sleep === '5-6h' || answers.difficulties.includes('Sono ruim')) {
        await prepareTaskAndPush('🌙 Higiene do Sono (Telas off 1h antes)', 'routine', 20);
      }
      
      if (answers.difficulties.includes('Procrastinação') || answers.difficulties.includes('Redes sociais')) {
        await prepareTaskAndPush('📵 Jejum de Dopamina na 1ª hora da manhã', 'routine', 20);
      }

      completeOnboarding(initialTasks);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    }, 6000);
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
           <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-neon-blue border-r-neon-purple shadow-[0_0_30px_rgba(0,240,255,0.4)]" />
        </motion.div>
        
        <div className="mt-8 relative h-16 w-full max-w-sm">
          <AnimatePresence mode="wait">
            {setupStep === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-white">Finalizando seu ambiente Evolux...</h2>
              </motion.div>
            )}
            {setupStep === 2 && (
              <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-white">Configurando permissões do sistema...</h2>
                <p className="text-text-secondary text-xs mt-1">Conceda acesso a notificações para ativar o motor de hábitos.</p>
              </motion.div>
            )}
            {setupStep === 3 && (
              <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-white">Sintetizando protocolo IA...</h2>
                <p className="text-text-secondary text-xs mt-1">Gerando missões iniciais com base no seu padrão comportamental.</p>
              </motion.div>
            )}
            {setupStep === 4 && (
              <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-2xl font-black font-display text-neon-blue drop-shadow-[0_0_10px_#00f0ff]">Seu ambiente está pronto.</h2>
                <p className="text-white text-sm mt-1 uppercase tracking-widest font-bold">Sua evolução começa agora.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col pt-6 px-4 selection:bg-neon-blue/30 overflow-hidden">
      
      {/* Progress Bar */}
      <div className="max-w-xl mx-auto w-full mb-6">
         <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Mapeamento Biológico</span>
            <span className="text-[10px] text-neon-blue font-bold">{Math.round(((step) / steps.length) * 100)}%</span>
         </div>
         <div className="h-1 bg-surface-light rounded-full overflow-hidden">
            <motion.div 
               animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
               className="h-full bg-gradient-to-r from-neon-blue to-neon-purple" 
            />
         </div>
      </div>

      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full relative pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-6 leading-tight">O que você quer desenvolver primeiro?</h1>
              <div className="flex flex-wrap gap-3">
                {['Disciplina', 'Saúde', 'Academia / físico', 'Foco', 'Estudos', 'Produtividade', 'Organização', 'Dinheiro', 'Sono', 'Hábito de leitura', 'Social', 'Desenvolvimento pessoal', 'Controle emocional', 'Consistência', 'Outro'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleGoalToggle(opt)}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all border ${
                      answers.goals.includes(opt) 
                        ? 'bg-neon-blue/20 border-neon-blue text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                        : 'bg-surface/50 border-surface-light text-text-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-1 leading-tight">Como você se avalia hoje?</h1>
              <p className="text-xs text-text-secondary mb-8">Seja honesto. Nível 1 (Péssimo) a 10 (Excelente).</p>
              
              <div className="space-y-6">
                {Object.keys(answers.levels).map(attr => (
                  <div key={attr} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white">
                      <span>{attr}</span>
                      <span className="text-neon-blue">{answers.levels[attr]}</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={answers.levels[attr]}
                      onChange={(e) => setAnswers(p => ({ ...p, levels: { ...p.levels, [attr]: parseInt(e.target.value) } }))}
                      className="w-full accent-neon-blue h-2 bg-surface-light rounded-full appearance-none outline-none"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-8 leading-tight">Mapeamento de Rotina</h1>
              
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold text-white mb-3">Quantas horas você dorme?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Menos de 5h', '5-6h', '7-8h', '9h+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, sleep: opt }))}
                        className={`p-3 rounded-lg font-bold text-xs border transition-all ${answers.sleep === opt ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-white mb-3">Você pratica exercícios?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Nunca', '1-2x semana', '3-4x semana', '5x+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, exercise: opt }))}
                        className={`p-3 rounded-lg font-bold text-xs border transition-all ${answers.exercise === opt ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-white mb-3">Quanto tempo livre tem por dia?</p>
                  <div className="grid grid-cols-2 gap-3">
                     {['15 min', '30 min', '1h', '2h+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, freetime: opt }))}
                        className={`p-3 rounded-lg font-bold text-xs border transition-all ${answers.freetime === opt ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-6 leading-tight">O que mais atrapalha você hoje?</h1>
              <div className="flex flex-col gap-3">
                {['Procrastinação', 'Redes sociais', 'Falta de energia', 'Falta de disciplina', 'Ansiedade', 'Organização', 'Sono ruim', 'Falta de constância', 'Tempo'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleDifficultyToggle(opt)}
                    className={`p-4 rounded-xl flex items-center justify-between font-bold text-sm transition-all border ${
                      answers.difficulties.includes(opt) 
                        ? 'bg-neon-pink/10 border-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.1)]' 
                        : 'bg-surface/50 border-surface-light text-text-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {opt}
                    {answers.difficulties.includes(opt) && <Check size={16} className="text-neon-pink" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-6 leading-tight">Como deseja que a IA interaja com você?</h1>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'Motivadora', desc: 'Inspiradora, focada em vitórias e progresso positivo.' },
                  { id: 'Rígida / disciplina máxima', desc: 'Direta, dura, foca no que precisa ser feito sem desculpas.' },
                  { id: 'Estratégica', desc: 'Analítica, foca em otimização de tempo e métricas.' },
                  { id: 'Equilibrada', desc: 'Mistura empatia com cobrança na medida certa.' },
                  { id: 'Amigável', desc: 'Companheira de jornada, paciente e acolhedora.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers(p => ({ ...p, aiTone: opt.id }))}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      answers.aiTone === opt.id 
                        ? 'bg-neon-purple/20 border-neon-purple shadow-[0_0_15px_rgba(150,0,255,0.2)]' 
                        : 'bg-surface/50 border-surface-light hover:border-white/20'
                    }`}
                  >
                    <h3 className={`font-bold text-sm mb-1 ${answers.aiTone === opt.id ? 'text-neon-purple' : 'text-white'}`}>{opt.id}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-white mb-3 leading-tight">Onde você quer estar daqui 90 dias?</h1>
              <p className="text-xs text-text-secondary mb-6">Descreva seu objetivo supremo. A IA usará isso como seu Norte.</p>
              
              <textarea
                value={answers.mainGoal}
                onChange={(e) => setAnswers(p => ({ ...p, mainGoal: e.target.value }))}
                placeholder="Daqui 90 dias, eu quero ter..."
                className="w-full h-40 bg-surface/50 border border-surface-light rounded-2xl p-4 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-neon-blue resize-none shadow-inner"
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none flex justify-center z-50">
        <button
          onClick={() => {
             if (step < 5) setStep(p => p + 1);
             else finishOnboarding();
          }}
          disabled={
            (step === 0 && answers.goals.length === 0) ||
            (step === 2 && (!answers.sleep || !answers.exercise || !answers.freetime)) ||
            (step === 3 && answers.difficulties.length === 0) ||
            (step === 4 && !answers.aiTone) ||
            (step === 5 && !answers.mainGoal.trim())
          }
          className="pointer-events-auto bg-neon-blue text-black font-black text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-full flex items-center gap-3 disabled:opacity-50 disabled:grayscale transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
        >
          {step === 5 ? 'Iniciar Evolução' : 'Continuar'} <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}

