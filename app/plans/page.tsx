'use client';

import { useNavigate } from 'react-router-dom';


import { motion } from 'motion/react';
import { useAppStore } from '@/lib/store';
import { ArrowLeft, Check, Star, Zap, Infinity as InfinityIcon } from 'lucide-react';

export default function PlansPage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAppStore();

  const handleSelectPlan = async (planId: string) => {
    if (!profile) {
      navigate('/login');
      return;
    }
    if (planId === 'base') {
      updateProfile({ plan: planId as any });
      
      // Update in Firestore for persistence
      const { db } = await import('@/lib/firebase');
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'profiles', profile.id), {
        equipped_cosmetics: {
          ...(profile.equippedCosmetics ? profile.equippedCosmetics : {}),
          plan: 'base',
          plan_request: '',
          plan_expires_at: ''
        }
      });

      alert(`Plano atualizado para ${planId.toUpperCase()} com sucesso!`);
      navigate('/setup');
    } else {
      navigate(`/checkout?plan=${planId}`);
    }
  };

  const plans = [
    {
      id: 'base',
      name: 'Evolux Base',
      price: 'Grátis',
      features: ['Até 5 tarefas personalizadas/dia', 'Streak normal & XP básico', 'Avatar simples', 'Histórico de 30 dias', 'IA Limitada (3 análises/dia)'],
      color: 'text-text-secondary',
      border: 'border-surface-light',
      bg: 'bg-surface',
      icon: Check,
      buttonText: 'Selecionar Plano Base'
    },
    {
      id: 'orbit',
      name: 'Evolux Orbit',
      price: 'R$ 9/mês',
      features: ['Tarefas ilimitadas & Histórico ilimitado', 'IA Moderada (20 análises/dia)', 'Relatórios de produtividade', 'Ranking global & Desafios', 'Avatar evolutivo & Badges', 'Plano semanal automático'],
      color: 'text-neon-blue',
      border: 'border-neon-blue/30',
      bg: 'bg-surface',
      icon: Star,
      buttonText: 'Assinar Orbit'
    },
    {
      id: 'nova',
      name: 'Evolux Nova',
      price: 'R$ 29/mês',
      features: ['Tudo do Orbit + IA Ilimitada', 'Mentor Pessoal em IA & Planejamento Diário', 'Controle Financeiro AI & Análises Profundas', 'Modo Foco Profundo & Desafios Privados', 'Rotina Adaptativa & Sugestões', 'Recompensa 365 Dias: Camisa & Badge'],
      color: 'text-neon-purple',
      border: 'border-neon-purple/50',
      bg: 'bg-neon-purple/10',
      icon: Zap,
      popular: true,
      buttonText: 'Testar 7 Dias Grátis'
    },
    {
      id: 'infinite',
      name: 'Evolux Infinite',
      price: 'R$ 49/mês',
      subtitle: 'Vagas Limitadas / Elite',
      features: ['Tudo do Nova com Prioridade Máxima', 'Selo Fundador & Nome destacado no Ranking', 'Avatar Exclusivo Raro', 'Acesso antecipado & Recursos Experimentais', 'Comunidade VIP & Votação em funções'],
      color: 'text-neon-pink',
      border: 'border-neon-pink',
      bg: 'bg-neon-pink/10',
      icon: InfinityIcon,
      buttonText: 'Entrar para a Elite'
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-y-auto pb-12">
      <header className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-20 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-secondary hover:text-text-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Escolha seu destino</h1>
      </header>

      <main className="px-6 max-w-md mx-auto flex flex-col gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-3xl border ${plan.border} ${plan.bg} overflow-hidden flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-neon-purple text-text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Mais Escolhido
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full bg-background/50 ${plan.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${plan.color}`}>{plan.price}</span>
                    {plan.subtitle && <span className="text-xs text-text-secondary">{plan.subtitle}</span>}
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={16} className={`mt-0.5 shrink-0 ${plan.color}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-bold transition-all mt-auto ${
                plan.popular 
                  ? 'bg-neon-purple text-text-primary box-glow-purple' 
                  : plan.id === 'infinite'
                    ? 'bg-neon-pink text-text-primary shadow-[0_0_15px_rgba(255,0,127,0.4)] hover:bg-text-primary hover:text-neon-pink'
                    : plan.id === 'orbit'
                    ? 'bg-neon-blue text-background shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-text-primary'
                    : 'bg-surface-light text-text-primary hover:bg-surface-light/80'
              }`}>
                {profile?.plan === plan.id ? 'Plano Atual' : (plan.buttonText || `Selecionar ${plan.name}`)}
              </button>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
