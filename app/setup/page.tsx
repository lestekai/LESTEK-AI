'use client';

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Download, MonitorSmartphone, BellRing, ArrowRight } from 'lucide-react';

export default function SetupAppPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col p-6 selection:bg-neon-blue/30 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-neon-blue/10 via-neon-purple/5 to-transparent pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full relative z-10 space-y-8">
        
        <div className="text-center space-y-3 mb-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-20 h-20 bg-surface border border-surface-light rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.15)] mb-6"
          >
            <MonitorSmartphone size={40} className="text-neon-blue" />
          </motion.div>
          <h1 className="text-3xl font-black font-display text-white">Instale o App</h1>
          <p className="text-text-secondary text-sm">Adicione o Evolux à sua tela inicial e ative as notificações para transformar sua rotina.</p>
        </div>

        <div className="w-full space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-surface/50 border border-surface-light rounded-2xl p-4 flex items-start gap-4"
          >
            <div className="w-10 h-10 shrink-0 bg-neon-blue/10 rounded-xl flex items-center justify-center mt-1">
              <Download size={20} className="text-neon-blue" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Passo 1: Instalar o App</h3>
              <p className="text-[11px] text-text-secondary leading-tight mb-2">No navegador, toque em &quot;Compartilhar&quot; (iOS) ou nos 3 pontinhos (Android) e selecione <strong className="text-neon-blue">&quot;Adicionar à Tela Inicial&quot;</strong>.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-surface/50 border border-surface-light rounded-2xl p-4 flex items-start gap-4"
          >
            <div className="w-10 h-10 shrink-0 bg-neon-purple/10 rounded-xl flex items-center justify-center mt-1">
              <BellRing size={20} className="text-neon-purple" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Passo 2: Permitir Notificações</h3>
              <p className="text-[11px] text-text-secondary leading-tight mb-3">Ative as notificações para receber os alertas dos seus treinos e hábitos diários.</p>
              <button onClick={() => alert('Em ambiente web nativo, isso solicita permissão.')} className="text-[10px] font-bold text-neon-purple bg-neon-purple/10 px-3 py-1.5 rounded-lg w-fit uppercase tracking-widest hover:bg-neon-purple/20 transition-colors">
                Solicitar Permissão
              </button>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleFinish}
          className="w-full py-4 mt-4 bg-white text-background font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
        >
          Ir para o Dashboard <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
