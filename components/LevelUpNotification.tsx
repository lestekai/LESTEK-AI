'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/lib/store';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export function LevelUpNotification() {
  const { profile } = useAppStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevelRef = useRef<number | null>(null);

  useEffect(() => {
    if (profile && prevLevelRef.current !== null && profile.avatarLevel > prevLevelRef.current) {
      setShowLevelUp(true);
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#00f0ff', '#b026ff', '#ffd700']
      });
      setTimeout(() => setShowLevelUp(false), 5000);
    }
    if (profile) {
      prevLevelRef.current = profile.avatarLevel;
    }
  }, [profile]);

  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm pointer-events-none"
        >
           <div className="bg-surface border-2 border-neon-blue box-glow-blue p-8 rounded-[2rem] text-center shadow-2xl relative overflow-hidden max-w-sm w-full">
             <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 blur-xl rounded-full" />
             <Star size={48} className="text-neon-blue mx-auto mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,1)]" />
             <h2 className="text-3xl font-display font-bold text-text-primary mb-2 uppercase tracking-widest text-glow-blue">Level UP!</h2>
             <p className="text-lg text-text-secondary">Você alcançou o Nível <span className="font-bold text-neon-purple">{profile?.avatarLevel}</span></p>
             <p className="text-xs text-text-secondary mt-2">Continue forçando seus limites.</p>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
