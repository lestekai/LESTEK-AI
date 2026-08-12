'use client';

import { useEffect } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App-level error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface border border-surface-light p-8 rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 text-red-500">
          <AlertTriangle size={32} />
        </div>
        
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2 relative z-10">Falha Sistêmica</h2>
        <p className="text-sm text-text-secondary mb-8 relative z-10">
          Encontramos uma anomalia em nossos sistemas. Não se preocupe, a evolução é contínua. 
        </p>
        
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-neon-blue text-background font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-background transition-colors relative z-10"
        >
          <RefreshCcw size={16} />
          <span>Tentar Novamente</span>
        </button>
      </motion.div>
    </div>
  );
}
