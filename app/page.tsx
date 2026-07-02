'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/lib/store';

const quotes = [
  "A disciplina é a ponte entre a meta e a realização.",
  "Você não está começando. Está retornando à sua melhor versão.",
  "Consistência cria impérios.",
  "Seu futuro está observando suas decisões de hoje.",
  "Evoluir não é uma opção. É o padrão.",
  "A dor da disciplina é menor que a dor do arrependimento.",
  "Pequenos hábitos diários constroem lendas.",
  "A mente desiste antes do corpo. Controle a mente.",
  "O suor de hoje é a força de amanhã.",
  "Conforto é o inimigo do progresso.",
  "Você é o arquiteto do seu próprio destino."
];

export default function SplashPage() {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const [quote, setQuote] = useState("");
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 0);
    // Simulate initial loading sequence before allowing tap
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleTap = () => {
    if (!isReady) return;
    setShow(false);
    setTimeout(() => {
      if (profile) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleTap}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center p-6 z-50 overflow-hidden cursor-pointer selection:bg-transparent"
        >
          {/* Background Rays (Connecting to center) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.svg
                key={i}
                className="absolute w-[800px] h-[800px] opacity-40 origin-center"
                style={{ rotate: `${i * 45}deg` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.8, 0, 0.4, 0], scale: 1 }}
                transition={{ 
                  duration: 2 + ((i % 5)*0.5), 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "linear" 
                }}
                viewBox="0 0 100 100"
              >
                <path 
                  d="M 50 50 L 50 35 L 45 25 L 55 15 L 48 5 L 60 -10" 
                  fill="none" 
                  stroke="#00f0ff" 
                  strokeWidth="0.5" 
                  className="drop-shadow-[0_0_5px_#00f0ff]"
                />
                <path 
                  d="M 50 35 L 55 30 L 52 20 L 58 10" 
                  fill="none" 
                  stroke="#b026ff" 
                  strokeWidth="0.3" 
                  className="drop-shadow-[0_0_5px_#b026ff]"
                />
              </motion.svg>
            ))}
          </div>

          {/* Energy Core Animation */}
          <div className="relative w-48 h-48 mb-8 flex flex-col items-center justify-center z-10">
            <motion.div 
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-neon-blue blur-[40px] opacity-10"
            />
            
            <motion.div 
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-12 h-12 bg-white rounded-full blur-[10px] z-10 opacity-30"
              style={{ boxShadow: '0 0 20px #00f0ff' }}
            />
            
            <div className="absolute flex flex-col items-center justify-center z-20 text-center">
              <span className="text-2xl font-mono tracking-[0.4em] text-neon-blue font-bold uppercase mb-2 drop-shadow-[0_0_10px_rgba(0,240,255,1)]">lestek</span>
              <div className="font-display font-black text-4xl tracking-[0.3em] text-white text-glow-blue uppercase">
                EVOLUX
              </div>
              <img src="/logo.png" alt="Evolux" width={112} height={112} className="w-28 h-28 mt-6 object-contain opacity-90 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
            </div>
          </div>

          <div className="h-24 flex items-center justify-center text-center z-10 px-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg font-medium text-white/80 max-w-sm italic tracking-wide"
            >
              {quote ? `"${quote}"` : ""}
            </motion.p>
          </div>

          {/* Tap indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? [0.3, 1, 0.3] : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 text-xs uppercase tracking-[0.3em] text-neon-blue font-bold flex items-center gap-2"
          >
            {isReady && (
              <>
                <span className="w-1 h-1 bg-neon-blue rounded-full absolute -left-4 animate-ping" />
                Toque para iniciar
                <span className="w-1 h-1 bg-neon-blue rounded-full absolute -right-4 animate-ping" />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
