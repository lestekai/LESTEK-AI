'use client';
import { useEffect, useState, useMemo } from 'react';
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

function generateFractalBolt(startX: number, startY: number, endX: number, endY: number, roughness: number): string {
  let points = [{ x: startX, y: startY }, { x: endX, y: endY }];
  for (let i = 0; i < 6; i++) {
    const newPoints = [];
    for (let j = 0; j < points.length - 1; j++) {
      const p1 = points[j];
      const p2 = points[j + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      // Normal vector
      const nx = -dy / len;
      const ny = dx / len;
      
      // Random displacement
      const displace = (Math.random() - 0.5) * roughness;
      const midX = (p1.x + p2.x) / 2 + nx * displace;
      const midY = (p1.y + p2.y) / 2 + ny * displace;
      
      newPoints.push(p1, { x: midX, y: midY });
    }
    newPoints.push(points[points.length - 1]);
    points = newPoints;
    roughness *= 0.55; // Reduce roughness for subsequent subdivisions
  }
  return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} ` + points.slice(1).map(p => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

export default function SplashPage() {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  const [boltSet, setBoltSet] = useState<{main: string, b1: string, b2: string, b3: string, sec: string} | null>(null);

  useEffect(() => {
    const mainXStart = 30 + Math.random() * 40;
    const mainXEnd = 20 + Math.random() * 60;
    const main = generateFractalBolt(mainXStart, -10, mainXEnd, 110, 45);
    
    const b1 = generateFractalBolt((mainXStart + mainXEnd)/2, 30, mainXEnd + 30, 70, 30);
    const b2 = generateFractalBolt(mainXEnd, 60, mainXEnd - 40, 95, 20);
    const b3 = generateFractalBolt(mainXStart, 15, mainXStart - 25, 45, 15);

    const sec = generateFractalBolt(mainXStart + 15, -10, mainXEnd + 20, 110, 50);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoltSet({ main, b1, b2, b3, sec });
  }, []);

  useEffect(() => {
    // Simulate initial loading sequence before allowing tap
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1500);
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
    }, 600); // Give AnimatePresence time to exit
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleTap}
          className="fixed inset-0 bg-[#020205] flex flex-col items-center justify-center p-6 z-50 overflow-hidden cursor-pointer selection:bg-transparent"
        >
          {/* Realistic Minimalist Lightning Flashes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ambient Volumetric Glow */}
            <motion.div 
              animate={{ opacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,_#00f0ff_0%,_transparent_50%)] blur-[100px]"
            />
            {/* Lightning Flash Background Illuminations */}
            <motion.div 
              animate={{ opacity: [0, 0, 0.15, 0, 0.4, 0, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.85, 0.87, 0.89, 0.91, 0.93, 1] }}
              className="absolute inset-0 bg-neon-blue mix-blend-screen"
            />
            
            {/* Sharp Electrostatic Bolt */}
            <motion.svg
               className="absolute w-full h-full mix-blend-screen opacity-90"
               animate={{ opacity: [0, 0, 1, 0, 0.9, 0, 0.4, 0] }}
               transition={{ duration: 6, repeat: Infinity, times: [0, 0.85, 0.86, 0.88, 0.90, 0.92, 0.93, 1] }}
               viewBox="0 0 100 100"
               preserveAspectRatio="none"
            >
               <defs>
                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="1.5" result="blur" />
                   <feMerge>
                     <feMergeNode in="blur" />
                     <feMergeNode in="SourceGraphic" />
                   </feMerge>
                 </filter>
                 <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
                   <feGaussianBlur stdDeviation="3" result="blur1" />
                   <feGaussianBlur stdDeviation="1" result="blur2" />
                   <feMerge>
                     <feMergeNode in="blur1" />
                     <feMergeNode in="blur2" />
                     <feMergeNode in="SourceGraphic" />
                   </feMerge>
                 </filter>
               </defs>
               
               <g filter="url(#intense-glow)">
                 {/* Main Bolt */}
                 {boltSet && (
                   <>
                     <path d={boltSet.main} fill="none" stroke="#ffffff" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                     <path d={boltSet.main} fill="none" stroke="#00f0ff" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.8" />
                     <path d={boltSet.main} fill="none" stroke="#b026ff" strokeWidth="3" vectorEffect="non-scaling-stroke" opacity="0.3" />
                   </>
                 )}
               </g>

               <g filter="url(#glow)">
                 {/* Branches */}
                 {boltSet && (
                   <>
                     <path d={boltSet.b1} fill="none" stroke="#ffffff" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
                     <path d={boltSet.b1} fill="none" stroke="#00f0ff" strokeWidth="0.6" vectorEffect="non-scaling-stroke" opacity="0.6" />
                     
                     <path d={boltSet.b2} fill="none" stroke="#ffffff" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
                     <path d={boltSet.b2} fill="none" stroke="#00f0ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" opacity="0.5" />
                     
                     <path d={boltSet.b3} fill="none" stroke="#ffffff" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
                     <path d={boltSet.b3} fill="none" stroke="#00f0ff" strokeWidth="0.4" vectorEffect="non-scaling-stroke" opacity="0.5" />
                   </>
                 )}
               </g>
            </motion.svg>
            
            {/* Secondary Strike (Staggered flicker) */}
            <motion.svg
               className="absolute w-full h-full mix-blend-screen opacity-60"
               animate={{ opacity: [0, 0, 0, 0.8, 0, 0.5, 0, 0] }}
               transition={{ duration: 6, repeat: Infinity, times: [0, 0.85, 0.86, 0.88, 0.90, 0.92, 0.93, 1] }}
               viewBox="0 0 100 100"
               preserveAspectRatio="none"
            >
               <g filter="url(#glow)">
                 {boltSet && (
                   <>
                     <path d={boltSet.sec} fill="none" stroke="#ffffff" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
                     <path d={boltSet.sec} fill="none" stroke="#b026ff" strokeWidth="0.8" vectorEffect="non-scaling-stroke" opacity="0.6" />
                   </>
                 )}
               </g>
            </motion.svg>
          </div>

          <div className="flex flex-col items-center justify-center z-20 text-center gap-8 relative mt-[-10vh]">
            <motion.img 
              src="/logo.png" 
              alt="Evolux Logo" 
              className="w-28 h-28 object-contain opacity-95 drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              animate={{ 
                y: [0, -6, 0],
                filter: [
                  "drop-shadow(0px 0px 20px rgba(0,240,255,0.3))", 
                  "drop-shadow(0px 0px 40px rgba(0,240,255,0.8))", 
                  "drop-shadow(0px 0px 20px rgba(0,240,255,0.3))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono tracking-[0.6em] text-neon-blue font-bold uppercase opacity-80 pl-1">lestek</span>
              <h1 className="font-display font-black text-4xl tracking-[0.25em] text-text-primary text-glow-blue uppercase pl-2">
                EVOLUX
              </h1>
            </div>

            <div className="h-20 flex items-center justify-center text-center mt-6">
              <motion.p
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="text-sm font-medium text-text-secondary/90 max-w-[280px] italic tracking-wide leading-relaxed"
              >
                &quot;{quote}&quot;
              </motion.p>
            </div>
          </div>

          {/* Tap indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? [0, 1, 0] : 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 text-[10px] uppercase tracking-[0.4em] text-neon-blue/80 font-bold flex items-center gap-4 pl-1"
          >
            {isReady && (
              <>
                <span className="w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_#00f0ff]" />
                Toque para iniciar
                <span className="w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_#00f0ff]" />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
