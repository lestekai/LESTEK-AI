'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'motion/react';
import { useAppStore, Task, TaskCategory } from '@/lib/store';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { 
  ChevronRight, 
  Check, 
  BellRing, 
  Download, 
  MonitorSmartphone, 
  Star, 
  Zap, 
  Infinity as InfinityIcon, 
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

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
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('onboarding_step');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [answers, setAnswers] = useState<OnboardingAnswers>(() => {
    const saved = localStorage.getItem('onboarding_answers');
    return saved ? JSON.parse(saved) : {
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
    };
  });

  const [notifGranted, setNotifGranted] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission === 'granted';
    }
    return false;
  });

  const [selectedPlan, setSelectedPlan] = useState<'base' | 'orbit' | 'nova' | 'infinite'>('nova');

  useEffect(() => {
    localStorage.setItem('onboarding_step', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('onboarding_answers', JSON.stringify(answers));
  }, [answers]);

  const [isFinishing, setIsFinishing] = useState(false);
  const [setupStep, setSetupStep] = useState(0);

  const steps = [
    'Objetivos Iniciais',
    'Autoavaliação',
    'Rotina Atual',
    'Obstáculos',
    'Tom da IA',
    'Meta Principal',
    'Notificações',
    'Widgets & Atalho',
    'Escolha de Plano'
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

  const handleRequestNotif = async () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        try {
          const res = await Notification.requestPermission();
          if (res === 'granted' || res === 'default') {
            setNotifGranted(true);
            return;
          }
        } catch (err) {
          console.warn('Browser/Iframe restricted Notification.requestPermission, enabling fallback:', err);
        }
      }
      // Fallback for iframe preview or unsupported environments
      setNotifGranted(true);
    } catch (e) {
      console.error('Error requesting notification permission:', e);
      setNotifGranted(true);
    }
  };

  const finishOnboarding = async (chosenPlan: 'base' | 'orbit' | 'nova' | 'infinite' = selectedPlan) => {
    setIsFinishing(true);
    setSetupStep(1);

    // Save profile locally in store
    useAppStore.setState(state => ({
      profile: state.profile ? { 
        ...state.profile, 
        isOnboarded: true,
        plan: chosenPlan,
        ai_personality: answers.aiTone 
      } : null
    }));

    // Sync to Firestore securely
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'profiles', user.uid), {
          isOnboarded: true,
          plan: chosenPlan,
          avatar_level: 2,
          xp: 50,
          'equipped_cosmetics._backup.questionnaire': answers
        });
        
        await setDoc(doc(db, 'ai_memory', user.uid), {
          user_id: user.uid,
          questionnaire_data: answers,
          preferences: { aiTone: answers.aiTone, mainGoal: answers.mainGoal }
        }, { merge: true });
      }
    } catch (err) {
      console.error('Firestore sync error during onboarding:', err);
    }

    setTimeout(() => setSetupStep(2), 1500); 
    setTimeout(() => setSetupStep(3), 3000); 

    setTimeout(async () => {
      setSetupStep(4);
      
      const today = getLocalDateStr(new Date());
      const initialTasks: Task[] = [];
      const user = auth.currentUser;
      
      const prepareTaskAndPush = async (title: string, category: TaskCategory, xpReward: number = 10) => {
        const t: Task = {
          id: Date.now().toString() + Math.random().toString().slice(2, 6),
          title,
          completed: false,
          date: today,
          baseDate: today,
          category,
          xpReward,
          isRecurring: true
        };
        initialTasks.push(t);
        
        if (user) {
          try {
            await addDoc(collection(db, 'tasks'), {
              user_id: user.uid,
              title: t.title,
              points: t.xpReward,
              category: t.category,
              status: 'pending',
              created_at: new Date().toISOString(),
              type: 'daily'
            });
          } catch (e) {
            console.error('Error adding task to db:', e);
          }
        }
      };

      try {
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
      } catch (err) {
        console.error('Error generating tasks:', err);
      }

      completeOnboarding(initialTasks);
      localStorage.removeItem('onboarding_step');
      localStorage.removeItem('onboarding_answers');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    }, 4500);
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
           <div className="w-24 h-24 rounded-full border-4 border-text-primary/5 border-t-neon-blue border-r-neon-purple shadow-[0_0_30px_rgba(0,240,255,0.4)]" />
        </motion.div>
        
        <div className="mt-8 relative h-16 w-full max-w-sm">
          <AnimatePresence mode="wait">
            {setupStep === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-text-primary">Finalizando seu ambiente Evolux...</h2>
                <p className="text-text-secondary text-xs mt-1">Configurando perfil e conectando banco de dados...</p>
              </motion.div>
            )}
            {setupStep === 2 && (
              <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-text-primary">Sincronizando notificações & widgets...</h2>
                <p className="text-text-secondary text-xs mt-1">Ativando motor de hábitos e alertas inteligentes.</p>
              </motion.div>
            )}
            {setupStep === 3 && (
              <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-xl font-black font-display text-text-primary">Sintetizando protocolo IA...</h2>
                <p className="text-text-secondary text-xs mt-1">Gerando missões iniciais com base na sua rotina.</p>
              </motion.div>
            )}
            {setupStep === 4 && (
              <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0">
                <h2 className="text-2xl font-black font-display text-neon-blue drop-shadow-[0_0_10px_#00f0ff]">Seu ambiente está pronto.</h2>
                <p className="text-text-primary text-sm mt-1 uppercase tracking-widest font-bold">Sua evolução começa agora.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const plans = [
    {
      id: 'base' as const,
      name: 'Evolux Base',
      price: 'Grátis',
      desc: 'Para iniciar sua jornada de organização.',
      features: ['Até 5 tarefas diárias', 'Streak normal & XP básico', 'Avatar simples', 'Histórico de 30 dias'],
      color: 'text-text-secondary',
      border: 'border-surface-light',
      bg: 'bg-surface/50',
      icon: CheckCircle2,
      popular: false
    },
    {
      id: 'orbit' as const,
      name: 'Evolux Orbit',
      price: 'R$ 9/mês',
      desc: 'Produtividade estendida e métricas detalhadas.',
      features: ['Tarefas & Histórico ilimitados', '20 análises de IA/dia', 'Relatórios & Ranking global', 'Plano semanal automático'],
      color: 'text-neon-blue',
      border: 'border-neon-blue/40',
      bg: 'bg-surface',
      icon: Star,
      popular: false
    },
    {
      id: 'nova' as const,
      name: 'Evolux Nova',
      price: 'R$ 29/mês',
      desc: 'IA ilimitada e mentoria diária inteligente.',
      features: ['Tudo do Orbit + IA Ilimitada', 'Mentor Pessoal em IA & Treinos', 'Controle Financeiro AI Profundo', 'Modo Foco & Desafios VIP'],
      color: 'text-neon-purple',
      border: 'border-neon-purple/80',
      bg: 'bg-neon-purple/10',
      icon: Zap,
      popular: true
    },
    {
      id: 'infinite' as const,
      name: 'Evolux Infinite',
      price: 'R$ 49/mês',
      desc: 'Acesso VIP de elite com prioridade máxima.',
      features: ['Tudo do Nova com Prioridade Total', 'Selo Fundador & Nome no Ranking', 'Avatar Raro Exclusivo', 'Comunidade VIP & Recursos Beta'],
      color: 'text-neon-pink',
      border: 'border-neon-pink',
      bg: 'bg-neon-pink/10',
      icon: InfinityIcon,
      popular: false
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col pt-6 px-4 selection:bg-neon-blue/30 overflow-hidden">
      
      {/* Progress Bar */}
      <div className="max-w-xl mx-auto w-full mb-6">
         <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Configuração Evolux • Passo {step + 1} de {steps.length}</span>
            <span className="text-[10px] text-neon-blue font-bold">{Math.round(((step + 1) / steps.length) * 100)}%</span>
         </div>
         <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
            <motion.div 
               animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
               className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" 
            />
         </div>
      </div>

      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full relative pb-28 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">O que você quer desenvolver primeiro?</h1>
              <p className="text-xs text-text-secondary mb-6">Selecione uma ou mais áreas para personalizarmos seu painel.</p>
              <div className="flex flex-wrap gap-2.5">
                {['Disciplina', 'Saúde', 'Academia / físico', 'Foco', 'Estudos', 'Produtividade', 'Organização', 'Dinheiro', 'Sono', 'Hábito de leitura', 'Social', 'Desenvolvimento pessoal', 'Controle emocional', 'Consistência', 'Outro'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleGoalToggle(opt)}
                    className={`px-4 py-3 rounded-xl font-bold text-xs transition-all border ${
                      answers.goals.includes(opt) 
                        ? 'bg-neon-blue/20 border-neon-blue text-text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                        : 'bg-surface/50 border-surface-light text-text-secondary hover:border-text-primary/20 hover:text-text-primary'
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
              <h1 className="text-2xl font-display font-black text-text-primary mb-1 leading-tight">Como você se avalia hoje?</h1>
              <p className="text-xs text-text-secondary mb-8">Seja honesto. Nível 1 (Péssimo) a 10 (Excelente).</p>
              
              <div className="space-y-5">
                {Object.keys(answers.levels).map(attr => (
                  <div key={attr} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-primary">
                      <span>{attr}</span>
                      <span className="text-neon-blue font-black">{answers.levels[attr]} / 10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={answers.levels[attr]}
                      onChange={(e) => setAnswers(p => ({ ...p, levels: { ...p.levels, [attr]: parseInt(e.target.value) } }))}
                      className="w-full accent-neon-blue h-2 bg-surface-light rounded-full appearance-none outline-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-text-primary mb-6 leading-tight">Mapeamento de Rotina</h1>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5">Quantas horas você dorme por noite?</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Menos de 5h', '5-6h', '7-8h', '9h+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, sleep: opt }))}
                        className={`p-3.5 rounded-xl font-bold text-xs border transition-all ${answers.sleep === opt ? 'bg-neon-blue/20 border-neon-blue text-text-primary shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5">Você pratica exercícios físicos?</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Nunca', '1-2x semana', '3-4x semana', '5x+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, exercise: opt }))}
                        className={`p-3.5 rounded-xl font-bold text-xs border transition-all ${answers.exercise === opt ? 'bg-neon-blue/20 border-neon-blue text-text-primary shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5">Quanto tempo livre tem por dia?</p>
                  <div className="grid grid-cols-2 gap-2.5">
                     {['15 min', '30 min', '1h', '2h+'].map(opt => (
                      <button key={opt} onClick={() => setAnswers(p => ({ ...p, freetime: opt }))}
                        className={`p-3.5 rounded-xl font-bold text-xs border transition-all ${answers.freetime === opt ? 'bg-neon-blue/20 border-neon-blue text-text-primary shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'bg-surface/50 border-surface-light text-text-secondary'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">O que mais atrapalha você hoje?</h1>
              <p className="text-xs text-text-secondary mb-6">Selecione seus maiores gargalos comportamentais.</p>
              <div className="flex flex-col gap-2.5">
                {['Procrastinação', 'Redes sociais', 'Falta de energia', 'Falta de disciplina', 'Ansiedade', 'Organização', 'Sono ruim', 'Falta de constância', 'Tempo'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleDifficultyToggle(opt)}
                    className={`p-3.5 rounded-xl flex items-center justify-between font-bold text-xs transition-all border ${
                      answers.difficulties.includes(opt) 
                        ? 'bg-neon-pink/10 border-neon-pink text-text-primary shadow-[0_0_15px_rgba(255,0,255,0.1)]' 
                        : 'bg-surface/50 border-surface-light text-text-secondary hover:border-text-primary/20 hover:text-text-primary'
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
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">Tom de Voz da Inteligência Artificial</h1>
              <p className="text-xs text-text-secondary mb-6">Como seu mentor virtual deve cobrar seu progresso?</p>
              <div className="flex flex-col gap-2.5">
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
                        : 'bg-surface/50 border-surface-light hover:border-text-primary/20'
                    }`}
                  >
                    <h3 className={`font-bold text-xs mb-0.5 ${answers.aiTone === opt.id ? 'text-neon-purple' : 'text-text-primary'}`}>{opt.id}</h3>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">Onde você quer estar daqui 90 dias?</h1>
              <p className="text-xs text-text-secondary mb-6">Descreva seu objetivo supremo. A IA usará isso para calibrar suas missões.</p>
              
              <textarea
                value={answers.mainGoal}
                onChange={(e) => setAnswers(p => ({ ...p, mainGoal: e.target.value }))}
                placeholder="Daqui 90 dias, eu quero ter alcançado..."
                className="w-full h-40 bg-surface/50 border border-surface-light rounded-2xl p-4 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-neon-blue resize-none shadow-inner"
              />
            </motion.div>
          )}

          {/* STEP 6: NOTIFICAÇÕES */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-6 text-neon-blue shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <BellRing size={32} />
              </div>
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">Ative Notificações Inteligentes</h1>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                A constância é a única garantia de resultados. Ative os alertas para receber lembretes de treinos, hábitos e cobranças da IA no momento certo.
              </p>

              <div className="bg-surface/50 border border-surface-light rounded-2xl p-5 mb-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 text-neon-purple flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Lembretes Personalizados</h4>
                    <p className="text-[11px] text-text-secondary">Notificações sem spam, focadas apenas na sua rotina e metas.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">Modo Foco Integrado</h4>
                    <p className="text-[11px] text-text-secondary">Sem distração durante seus momentos de Deep Work.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRequestNotif}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  notifGranted 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-neon-blue text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:bg-text-primary'
                }`}
              >
                {notifGranted ? (
                  <>
                    <CheckCircle2 size={18} /> Notificações Permitidas!
                  </>
                ) : (
                  <>
                    <BellRing size={18} /> Solicitar Permissão de Alertas
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* STEP 7: WIDGETS & ATALHO TELA INICIAL */}
          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center mb-6 text-neon-purple shadow-[0_0_20px_rgba(150,0,255,0.2)]">
                <MonitorSmartphone size={32} />
              </div>
              <h1 className="text-2xl font-display font-black text-text-primary mb-2 leading-tight">Adicione à Tela Inicial & Widgets</h1>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                Transforme o Evolux em um aplicativo nativo no seu smartphone para acesso direto em 1 toque.
              </p>

              <div className="space-y-3 mb-6">
                <div className="bg-surface/50 border border-surface-light rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neon-blue/10 text-neon-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Download size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-1">Passo 1: Menu do Navegador</h4>
                    <p className="text-[11px] text-text-secondary leading-normal">
                      No seu navegador, toque em <strong className="text-neon-blue">&quot;Compartilhar&quot;</strong> (iOS / Safari) ou nos <strong className="text-neon-blue">3 pontinhos</strong> (Android / Chrome).
                    </p>
                  </div>
                </div>

                <div className="bg-surface/50 border border-surface-light rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neon-purple/10 text-neon-purple flex items-center justify-center shrink-0 mt-0.5">
                    <MonitorSmartphone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-1">Passo 2: Atalho na Tela Inicial</h4>
                    <p className="text-[11px] text-text-secondary leading-normal">
                      Selecione a opção <strong className="text-neon-purple">&quot;Adicionar à Tela Inicial&quot;</strong> ou <strong className="text-neon-purple">&quot;Instalar Aplicativo&quot;</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 8: ESCOLHA SEU PLANO */}
          {step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
              <h1 className="text-2xl font-display font-black text-text-primary mb-1 leading-tight">Escolha seu Plano de Evolução</h1>
              <p className="text-xs text-text-secondary mb-6">Selecione o nível de poder para impulsionar seus resultados.</p>

              <div className="space-y-3">
                {plans.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPlan === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${p.bg} ${
                        isSelected 
                          ? `${p.border} ring-2 ring-neon-blue/50 scale-[1.01] shadow-[0_0_20px_rgba(0,240,255,0.15)]` 
                          : 'border-surface-light opacity-80 hover:opacity-100 hover:border-text-primary/30'
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute top-3 right-3 bg-neon-purple text-text-primary text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          Mais Escolhido
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl bg-background/60 ${p.color}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text-primary">{p.name}</h3>
                          <span className={`text-xs font-black ${p.color}`}>{p.price}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-text-secondary mb-3 leading-relaxed">{p.desc}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-text-primary/5">
                        {p.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                            <Check size={12} className={p.color} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none flex justify-center z-50">
        <button
          onClick={() => {
             if (step < steps.length - 1) setStep(p => p + 1);
             else finishOnboarding(selectedPlan);
          }}
          disabled={
            (step === 0 && answers.goals.length === 0) ||
            (step === 2 && (!answers.sleep || !answers.exercise || !answers.freetime)) ||
            (step === 3 && answers.difficulties.length === 0) ||
            (step === 4 && !answers.aiTone) ||
            (step === 5 && !answers.mainGoal.trim())
          }
          className="pointer-events-auto bg-neon-blue text-black font-black text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full flex items-center gap-3 disabled:opacity-40 disabled:grayscale transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          {step === steps.length - 1 ? 'Iniciar Minha Evolução' : 'Continuar'} <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}
