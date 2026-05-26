'use client';

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Zap, Target, Trophy, Shield, Flame, Activity, Crown, Dumbbell, Wallet, ArrowRight, Loader2, BrainCircuit } from 'lucide-react';
import { PLANET_MISSIONS } from '@/lib/evolux';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const safeUsername = username.toLowerCase().trim().replace(/[^a-z0-9_.-]/g, '');
    const email = `${safeUsername}@evolux.app`;

    if (isLogin) {
      if (username.trim() === 'ADM_TESTE' && password === 'ADM_TESTE') {
        // MOCK BYPASS FOR TESTING UI
        useAppStore.getState().setProfile({
          id: 'test-admin-id',
          username: 'admin',
          name: 'Administrador de Teste',
          email: 'admin@evolux.app',
          role: 'admin',
          status: 'active',
          avatarLevel: 10,
          xp: 15000,
          streak: 100,
          
          total_tasks_completed: 500,
          unlocked_achievements: [],
          unlocked_cosmetics: ['aura_base'],
          equipped_cosmetics: {},
          isOnboarded: true
        });
        navigate('/dashboard');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message === 'Failed to fetch') {
          setErrorMsg('Erro de Rede: O seu navegador bloqueou a conexão com o banco de dados.');
        } else if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Nome de usuário ou senha incorretos.');
        } else {
          setErrorMsg('Erro ao entrar: ' + error.message);
        }
      } else {
        navigate('/dashboard');
      }
    } else {
      // REGISTRATION
      // Usamos o Admin API para contornar limites de taxa de email do Supabase Free e auto-confirmar a conta:
      const { data: authData, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          username: username.trim(),
          name: username.trim(),
          phone: phone.trim(),
        }
      });
      
      if (error) {
        console.error("SignUp Error:", error);
        if (error.message.includes('already been registered') || error.message.includes('already exists')) {
          setErrorMsg('Este nome de usuário já está em uso.');
        } else if (error.message.includes('Password should be at least')) {
          setErrorMsg('A senha deve ter pelo menos 6 caracteres.');
        } else {
          setErrorMsg('Erro: ' + error.message);
        }
      } else {
        // Agora fazemos login com a conta recém criada
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInErr) {
          setErrorMsg('Erro interno ao iniciar sessão. Tente logar manualmente.');
          setIsLoading(false);
          return;
        }

        navigate('/onboarding');
      }
    }
    setIsLoading(false);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('avatar-name-input')?.focus();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-blue/30 overflow-x-hidden font-sans">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-4 lg:p-6 z-50 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-display font-black text-2xl tracking-[0.2em] text-white flex items-center gap-3 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
            <img src="/logo.png" alt="Evolux" className="w-8 h-8 object-contain" />
            EVOLUX
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/plans')}
              className="text-xs font-bold text-text-secondary hover:text-white px-4 py-2.5 rounded-full transition-colors uppercase tracking-[0.2em]"
            >
              Planos
            </button>
            <button 
              onClick={scrollToForm}
              className="text-xs font-bold bg-white text-black px-6 py-2.5 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-[0.2em]"
            >
              Acessar
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - HIGH CONVERSION */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-32 pb-24 px-6 overflow-hidden bg-[#030303]">
        {/* Core Gradients & Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center z-10">
          
          <motion.div style={{ opacity, scale }} className="flex flex-col items-start gap-8 relative z-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-neon-blue/40 bg-neon-blue/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
               <div className="w-2.5 h-2.5 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_#00f0ff]" />
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] font-mono">Engine Online</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[1.05] tracking-tighter text-white drop-shadow-lg">
              Forje sua <br />
              disciplina de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neon-blue to-neon-purple drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                forma implacável.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl font-medium">
              Mais que um app de tarefas. O Evolux centraliza seus treinos, finanças e metas através de engenharia comportamental guiada por IA. Pare de tentar. Comece a registrar.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-4">
              <button 
                onClick={scrollToForm}
                className="group relative px-10 py-5 w-full sm:w-auto bg-neon-blue text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-4 hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Comece Agora
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                </span>
              </button>
              
              <button 
                onClick={() => navigate('/plans')}
                className="px-10 py-5 w-full sm:w-auto bg-surface/50 backdrop-blur-md border border-white/10 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center"
              >
                Funcionalidades
              </button>
            </div>
          </motion.div>

          {/* REAL DATA VISUAL CUE - RESTORED 3D & PREMIUM LOOK */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full max-w-[440px] mx-auto relative perspective-[1200px]"
          >
            <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out group">
               <div className="absolute inset-0 rounded-[2.5rem] box-glow-blue opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] pointer-events-none" />
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                   <div>
                     <p className="text-[10px] text-neon-blue uppercase tracking-[0.2em] mb-2 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">Perfil em Destaque</p>
                     <h3 className="text-2xl font-black font-display text-white mb-2 leading-none">Lenda Cibernética</h3>
                     <span className="inline-block text-[10px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10">Lvl 100</span>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                     <Crown size={28} className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Streak Bar */}
                   <div className="bg-background/50 rounded-2xl p-4 border border-white/5">
                     <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-3">
                       <span className="text-text-secondary">Ofensiva Atual</span>
                       <span className="text-amber-500 flex items-center gap-1 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"><Flame size={14}/> 42 DIAS</span>
                     </div>
                     <div className="h-3 bg-black rounded-full overflow-hidden border border-white/10 relative shadow-inner">
                       <div className="absolute top-0 left-0 h-full w-4/5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 relative">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                       </div>
                     </div>
                   </div>

                   {/* Missões */}
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-background/80 rounded-2xl p-5 border border-white/5 relative overflow-hidden group-hover:border-neon-purple/30 transition-colors">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 blur-xl rounded-full" />
                       <Target size={20} className="text-neon-purple mb-3 relative z-10 drop-shadow-[0_0_8px_rgba(176,38,255,0.5)]" />
                       <p className="text-[9px] text-text-secondary uppercase tracking-[0.2em] mb-1 relative z-10 font-bold">Tarefas Completas</p>
                       <p className="text-3xl font-mono font-black text-white relative z-10">128</p>
                     </div>
                     <div className="bg-background/80 rounded-2xl p-5 border border-white/5 relative overflow-hidden group-hover:border-neon-blue/30 transition-colors">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-neon-blue/5 blur-xl rounded-full" />
                       <Dumbbell size={20} className="text-neon-blue mb-3 relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
                       <p className="text-[9px] text-text-secondary uppercase tracking-[0.2em] mb-1 relative z-10 font-bold">Treinos</p>
                       <p className="text-3xl font-mono font-black text-white relative z-10">24</p>
                     </div>
                   </div>

                   <div className="pt-6 border-t border-white/5 mt-6">
                      <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
                        <Zap size={12} className="text-neon-blue" />
                        Galáxia Dominada
                      </p>
                      <div className="flex gap-3">
                        {PLANET_MISSIONS.slice(0, 5).map((p, i) => (
                          <div key={i} className="w-10 h-10 rounded-full border border-white/10 relative overflow-hidden group/planet" style={{ backgroundColor: p.color, boxShadow: `inset -3px -3px 6px rgba(0,0,0,0.6), 0 0 15px ${p.color}40` }}>
                            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                            <div className="absolute inset-0 bg-white/0 group-hover/planet:bg-white/20 transition-colors" />
                          </div>
                        ))}
                      </div>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRIGGERS & PROOF */}
      <section className="py-24 px-4 bg-background relative border-t border-white/5 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight">O QUE VOCÊ GANHA AO ENTRAR?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto font-medium">Isto não é um app de &quot;to-do list&quot;. É um algoritmo de engenharia comportamental focado em forçar você a agir através de recompensas neurobiológicas e pressão sistêmica.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-surface/50 border border-surface-light p-8 rounded-[2rem] hover:border-amber-500/30 transition-all group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform">
                <Flame className="text-amber-500" size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">Poder do Hábito (Streak)</h3>
              <p className="text-text-secondary leading-relaxed font-medium text-sm">Cada dia consecutivo aumenta sua constância. Falhe, e perca tudo. O medo da perda se torna seu maior aliado na busca pela produtividade inabalável.</p>
            </div>

            <div className="bg-surface/50 border border-surface-light p-8 rounded-[2rem] hover:border-neon-purple/30 transition-all group">
              <div className="w-14 h-14 bg-neon-purple/10 rounded-2xl flex items-center justify-center mb-6 border border-neon-purple/20 shadow-[0_0_20px_rgba(150,0,255,0.2)] group-hover:scale-110 transition-transform">
                <BrainCircuit className="text-neon-purple" size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">Motor de IA Pessoal</h3>
              <p className="text-text-secondary leading-relaxed font-medium text-sm">Uma inteligência artificial moldada pelo seu questionário inicial que age como mentora, sádica ou estratégica — você decide a personalidade.</p>
            </div>

            <div className="bg-surface/50 border border-surface-light p-8 rounded-[2rem] hover:border-neon-blue/30 transition-all group">
              <div className="w-14 h-14 bg-neon-blue/10 rounded-2xl flex items-center justify-center mb-6 border border-neon-blue/20 shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-110 transition-transform">
                <Target className="text-neon-blue" size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">Metas e Treinos em RPG</h3>
              <p className="text-text-secondary leading-relaxed font-medium text-sm">Transforme seus exercícios na academia, sono e horas de foco profundo em XP. Conquiste auréa, títulos, insígnias de planetas e cosméticos de lenda.</p>
            </div>

            <div className="bg-surface/50 border border-surface-light p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                <Wallet className="text-emerald-500" size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">Plataforma Financeira Integrada</h3>
              <p className="text-text-secondary leading-relaxed font-medium text-sm">O novo módulo de Finanças e Patrimônio com IA lê seus aportes por áudio ou texto, cataloga transações e oferece insights implacáveis de sobrevivência.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE SHOWCASE SECTION */}
      <section className="py-24 px-4 bg-[#050505] relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-surface/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
                
                {/* Mockup UI Elements */}
                <div className="w-full max-w-sm bg-background border border-white/10 rounded-2xl p-4 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 mb-[-2rem] relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                      <Target size={14} className="text-neon-blue" />
                    </div>
                    <div>
                       <p className="text-xs font-bold">Protocolo Físico</p>
                       <p className="text-[9px] text-text-secondary uppercase tracking-widest">Rotina Diária</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-light h-2 rounded-full overflow-hidden">
                     <div className="w-[75%] h-full bg-neon-blue shadow-[0_0_10px_#00f0ff]" />
                  </div>
                </div>

                <div className="w-full max-w-sm bg-background border border-emerald-500/20 rounded-2xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ml-8 relative z-20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Wallet size={14} className="text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Patrimônio</p>
                    </div>
                    <p className="text-lg font-black text-white">R$ 14.520</p>
                  </div>
                  <p className="text-[10px] text-text-secondary">Insight da IA: Seus investimentos subiram 12% este mês.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight">
                UMA EXPERIÊNCIA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                  GAMIFICADA & RENTÁVEL
                </span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed font-medium">
                O Evolux não apenas organiza a sua vida, ele recompensa o seu cérebro. Ganhe Pontos de Experiência (XP), suba de nível e desbloqueie cósméticos cyberpunk enquanto atinge metas reais no seu corpo e na sua conta bancária.
              </p>
              
              <ul className="space-y-4 mt-4">
                {[
                  { icon: <Trophy size={18} className="text-amber-500" />, title: 'Ranking Global', desc: 'Dispute o topo da tabela contra usuários de todo o mundo.' },
                  { icon: <Shield size={18} className="text-neon-blue" />, title: 'Isolamento de Dados', desc: 'Seus dados financeiros e tarefas são criptografados e inacessíveis a terceiros.' },
                  { icon: <BrainCircuit size={18} className="text-neon-purple" />, title: 'Análise de IA 24/7', desc: 'Seu assistente virtual deduz seus padrões e sugere ações de alto impacto.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start bg-surface/30 p-4 rounded-2xl border border-white/5 hover:bg-surface/50 transition-colors">
                    <div className="mt-1 bg-background p-2 rounded-lg shadow-inner border border-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL LOGIN FORM / CONVERSION */}
      <section ref={formRef} className="py-32 px-4 relative bg-[#020202] border-t border-white/5 flex justify-center items-center min-h-[80vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-neon-blue/5 rounded-[100%] blur-[150px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-surface/60 backdrop-blur-3xl border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
               <div className="inline-flex justify-center items-center w-24 h-24 mb-6 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                 <img src="/logo.png" alt="Evolux" className="w-full h-full object-contain" />
               </div>
               <h2 className="text-4xl font-display font-black mb-3 text-glow-blue uppercase tracking-widest">Inicialize</h2>
               <p className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.2em]">Sincronize com a base de dados central.</p>
            </div>

            <form onSubmit={handleAuth} className="flex flex-col gap-6 relative z-10">
              <div>
                <div className="flex bg-black/40 p-1.5 rounded-2xl mb-6 border border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all ${isLogin ? 'bg-white/10 text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
                  >
                    Acessar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all ${!isLogin ? 'bg-white/10 text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
                  >
                    Cadastrar
                  </button>
                </div>

                <label className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold mb-2 block ml-2">Codinome / Identificação</label>
                <div className="relative group mb-4">
                  <input 
                    id="avatar-name-input"
                    type="text" 
                    placeholder="Ex: Sigma_01" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-2xl px-6 py-5 text-lg text-white font-bold placeholder:text-text-secondary/30 focus:outline-none focus:border-neon-blue/60 focus:bg-surface/50 transition-all shadow-inner"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <>
                    <label className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold mb-2 block ml-2">Número de Telefone</label>
                    <div className="relative group mb-4">
                      <input 
                        type="tel" 
                        placeholder="Ex: 11999999999" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-2xl px-6 py-5 text-lg text-white font-bold placeholder:text-text-secondary/30 focus:outline-none focus:border-neon-blue/60 focus:bg-surface/50 transition-all shadow-inner"
                        required={!isLogin}
                      />
                    </div>
                  </>
                )}
                
                <label className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold mb-2 block ml-2">Código de Acesso (Senha)</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-2xl px-6 py-5 text-lg text-white font-bold placeholder:text-text-secondary/30 focus:outline-none focus:border-neon-blue/60 focus:bg-surface/50 transition-all shadow-inner"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {errorMsg && <p className="text-red-400 text-sm font-medium mt-1 uppercase text-center tracking-widest">{errorMsg}</p>}
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-4 border border-white/20 disabled:opacity-50 hover:bg-white/90"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : (isLogin ? 'Estabelecer Conexão' : 'Iniciar Metamorfose')}
                {!isLoading && <ArrowRight size={20} />}
              </button>

              {isLogin && (
                <div className="text-center mt-4">
                  <a 
                    href="https://wa.me/5577999587570?text=Esqueci%20minha%20senha%20do%20Evolux!" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-text-secondary hover:text-white text-xs uppercase tracking-widest font-bold underline underline-offset-4 transition-colors"
                  >
                    Esqueci minha senha
                  </a>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
              <p className="text-[9px] text-text-secondary uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2">
                <Shield size={12} className="text-neon-blue" /> Protocolo Seguro &amp; Encriptado
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
