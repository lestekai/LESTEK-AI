import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/lib/store';
import { Lock, Zap, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PremiumLockModal() {
  const { premiumModalOpen, premiumModalMessage, hidePremiumModal } = useAppStore();
  const navigate = useNavigate();

  if (!premiumModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={hidePremiumModal} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-surface border border-surface-light w-full max-w-sm rounded-[2rem] p-6 relative z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
          
          <button onClick={hidePremiumModal} className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center mt-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-neon-purple/20" />
              <Lock size={28} className="text-neon-purple relative z-10" />
            </div>
            <h2 className="text-xl font-bold font-display mb-2">Acesso Restrito</h2>
            <p className="text-sm text-text-secondary leading-relaxed px-2">
              {premiumModalMessage}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                hidePremiumModal();
                navigate('/plans');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(157,78,221,0.3)]"
            >
              <Zap size={18} />
              Conhecer Planos
              <ArrowRight size={16} />
            </button>
            <button
              onClick={hidePremiumModal}
              className="w-full py-3.5 bg-transparent text-text-secondary font-bold text-sm hover:text-white rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
