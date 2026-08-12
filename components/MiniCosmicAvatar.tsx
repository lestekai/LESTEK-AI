'use client';

import { motion } from 'motion/react';
import { getUnlockedPlanets, CosmeticItem } from '@/lib/evolux';

export function MiniCosmicAvatar({ streak, auraColor = 'rgba(0,240,255,0.2)', size = 64, cosmetics = [] }: { streak: number, auraColor?: string, size?: number, cosmetics?: CosmeticItem[] }) {
  const allPlanets = getUnlockedPlanets(streak);
  // OPTIMIZATION: Display a maximum of 5 planets to match visual and prevent lag
  const displayPlanets = allPlanets.slice(-5);

  const auras = cosmetics.filter(c => c.type === 'aura');
  const coroas = cosmetics.filter(c => c.type === 'coroa');
  const olhos = cosmetics.filter(c => c.type === 'olhos');
  const armaduras = cosmetics.filter(c => c.type === 'armadura');
  const satelites = cosmetics.filter(c => c.type === 'satelite');
  const particulas = cosmetics.filter(c => c.type === 'particula');
  const armas = cosmetics.filter(c => c.type === 'arma');

  const activeAuraColor = auras[0]?.color || auraColor;

  return (
    <div className="relative flex justify-center items-center pointer-events-none" style={{ width: size, height: size }}>
      
      {/* 🔹 ORBITING PLANETS (Above the head, fixed arc) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80%] z-20 w-max flex items-end justify-center gap-6">
        {displayPlanets.map((planet, i) => {
          // Arc distribution
          const total = displayPlanets.length;
          const offset = i - Math.floor(total / 2);
          const yOffset = Math.abs(offset) * 20; // Arc curve deepening
          
          let textureClass = '';
          let textureStyle = {};
          
          if (planet.name === 'Glacius' || planet.name === 'Oblivion') {
             textureStyle = { background: 'radial-gradient(circle at 30% 30%, #fff 0%, transparent 50%), repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 5px)' };
          } else if (planet.name === 'Pyros' || planet.name === 'Centauri') {
             textureStyle = { background: 'radial-gradient(circle at 70% 70%, #000 0%, transparent 60%), radial-gradient(circle at 30% 30%, #ffeb3b 0%, transparent 40%)' };
          } else if (planet.name === 'Kyber' || planet.name === 'Astralis') {
             textureStyle = { background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 255, 255, 0.4) 100%), linear-gradient(0deg, rgba(0,255,255,0.1) 50%, transparent 50%)', backgroundSize: '100% 4px' };
          } else if (planet.name === 'Lumina' || planet.name === 'Infinitus') {
             textureStyle = { background: 'radial-gradient(circle at 50% 50%, #fff 10%, transparent 60%)' };
          } else {
             textureStyle = { background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6) 0%, transparent 60%)' };
          }

          return (
            <motion.div
              key={planet.id}
              className="relative flex flex-col items-center group"
              style={{ transform: `translateY(${yOffset}px)` }}
              animate={{ y: [yOffset, yOffset - 8, yOffset] }}
              transition={{ duration: 6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div 
                className="relative rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ 
                  width: Math.max(24, planet.size * (size / 70)), 
                  height: Math.max(24, planet.size * (size / 70)), 
                }}
              >
                 {/* Atmosphere / Glow */}
                 <motion.div 
                    className="absolute inset-[0%] rounded-full blur-[10px]"
                    animate={{ opacity: [0.5, 0.8, 0.5], scale: [1.1, 1.3, 1.1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    style={{ 
                      backgroundColor: planet.color, 
                    }}
                 />

                 {/* Core Planet Base */}
                 <div 
                    className="absolute inset-0 rounded-full z-10 overflow-hidden"
                    style={{ 
                       backgroundColor: planet.color, 
                       boxShadow: `inset -6px -6px 12px rgba(0,0,0,0.8), inset 3px 3px 8px rgba(255,255,255,0.5), 0 0 15px ${planet.color}` 
                    }}
                 >
                    {/* Shadow map to give 3D spherical look */}
                    <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 30% 30%, transparent 30%, rgba(0,0,0,0.9) 90%)` }} />
                    
                    {/* Unique texture overlay */}
                    <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={textureStyle} />
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🔹 CYBERNETIC BUST AVATAR */}
      <div className="relative w-full h-[120%] flex justify-center items-center z-10 bottom-[-10%]">
         
         {/* Premium Energetic Aura Layer */}
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-full pointer-events-none mix-blend-screen flex items-center justify-center">
            {/* Base Glow */}
            <motion.div
               animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
               transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute w-[80%] h-[80%] rounded-full blur-[25px]"
               style={{ background: `radial-gradient(circle, ${activeAuraColor} 0%, transparent 60%)` }}
            />
            {/* Core Energy Flare */}
            <motion.div
               animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6], rotate: [0, 90, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
               className="absolute w-[60%] h-[150%] blur-[15px]"
               style={{ background: `radial-gradient(ellipse at center, ${activeAuraColor} 0%, transparent 50%)` }}
            />
            {/* Tech Rings */}
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
               className="absolute w-[90%] h-[90%] rounded-full border border-dashed opacity-30"
               style={{ borderColor: activeAuraColor }}
            />
            <motion.div
               animate={{ rotate: -360 }}
               transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
               className="absolute w-[110%] h-[110%] rounded-full border border-dotted opacity-20"
               style={{ borderColor: activeAuraColor }}
            />
            
            {/* Floating Soft Particles (Dust) */}
            <div className="absolute inset-0 preserve-3d">
              {[...Array(6)].map((_, i) => {
                const leftOffset = 40 + [5, 10, 15, 20, 8, 12][i] % 20;
                const topOffset = 40 + [15, 5, 20, 10, 12, 8][i] % 20;
                const yOffset = -30 - [10, 20, 30, 15, 25, 5][i] % 30;
                const xOffset = ([0.2, 0.8, 0.4, 0.6, 0.9, 0.1][i] - 0.5) * 40;
                const durationOffset = 3 + [1, 2.5, 0.5, 3, 1.5, 2][i] % 3;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full blur-[1px]"
                    style={{ 
                      backgroundColor: activeAuraColor,
                      left: `${leftOffset}%`,
                      top: `${topOffset}%`,
                    }}
                    animate={{ 
                      y: [0, yOffset],
                      x: [0, xOffset],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{ 
                      duration: durationOffset, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: 'easeInOut'
                    }}
                  />
                );
              })}
            </div>
         </div>

         {/* Cosmos Body Level Base Selection */}
         {(() => {
           let armorType = 'metal_basic';
           if (armaduras.some(a => a.id === 'tex_suprema')) armorType = 'metal_supreme';
           else if (armaduras.some(a => a.id === 'tex_obsidian')) armorType = 'metal_obsidian';
           else if (armaduras.some(a => a.id === 'tex_crystal')) armorType = 'metal_crystal';
           else if (allPlanets.length >= 10) armorType = 'metal_supreme';
           else if (allPlanets.length >= 5) armorType = 'metal_advanced';
           
           return (
             <svg viewBox="0 0 200 240" className="absolute top-[0%] w-[120%] h-[120%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] z-10 overflow-visible" preserveAspectRatio="xMidYMin meet">
                 <defs>
                   <linearGradient id="metal_basic" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#1e2029"/>
                     <stop offset="50%" stopColor="#0d0e15"/>
                     <stop offset="100%" stopColor="#050508"/>
                   </linearGradient>
                   <linearGradient id="metal_advanced" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#2c3040"/>
                     <stop offset="40%" stopColor="#151724"/>
                     <stop offset="100%" stopColor="#00000a"/>
                   </linearGradient>
                   <linearGradient id="metal_obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#250042"/>
                     <stop offset="50%" stopColor="#0b0014"/>
                     <stop offset="100%" stopColor="#000000"/>
                   </linearGradient>
                   <linearGradient id="metal_crystal" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#0088ff"/>
                     <stop offset="30%" stopColor="#003388"/>
                     <stop offset="100%" stopColor="#00091a"/>
                   </linearGradient>
                   <linearGradient id="metal_supreme" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#ffffff"/>
                     <stop offset="25%" stopColor={activeAuraColor}/>
                     <stop offset="80%" stopColor="#0a001a"/>
                     <stop offset="100%" stopColor="#000000"/>
                   </linearGradient>
                   <linearGradient id="edge_glow" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor={activeAuraColor}/>
                     <stop offset="100%" stopColor="transparent"/>
                   </linearGradient>
                   <filter id="glow">
                     <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                   </filter>
                 </defs>

                 {/* BACK NECK / SPINE */}
                 <g fill={`url(#${armorType})`} stroke="url(#edge_glow)" strokeWidth="0.5" opacity="0.8">
                    <path d="M85,150 L115,150 Q110,180 100,200 Q90,180 85,150 Z" />
                 </g>

                 {/* Base Body - Cybernetic Shoulders & Chest */}
                 <g stroke="url(#edge_glow)" strokeWidth="1.5" fill={`url(#${armorType})`} strokeLinejoin="round">
                    {/* Chest Plates */}
                    <path d="M50,240 Q40,190 80,170 Q100,190 120,170 Q160,190 150,240 Z" />
                    
                    {/* Inner Torso Detail */}
                    <path d="M70,240 Q75,190 100,185 Q125,190 130,240 Z" fill="rgba(0,0,0,0.4)" stroke={activeAuraColor} opacity="0.5" />

                    {/* Shoulder Caps */}
                    <path d="M30,240 Q40,190 60,190 Q50,220 50,240 Z" />
                    <path d="M170,240 Q160,190 140,190 Q150,220 150,240 Z" />
                 </g>

                 {/* HEAD STRUCTURE - Premium sleek cyber-helmet */}
                 <g stroke="url(#edge_glow)" strokeWidth="1.2" fill={`url(#${armorType})`} strokeLinejoin="round">
                    {/* Helmet/Cranium */}
                    <path d="M65,110 Q60,50 100,45 Q140,50 135,110 Q130,150 100,165 Q70,150 65,110 Z" />
                    
                    {/* Lower Jaw Guard */}
                    <path d="M75,120 Q100,145 125,120 Q115,155 100,168 Q85,155 75,120 Z" fill="rgba(0,0,0,0.6)" stroke={activeAuraColor} />
                    
                    {/* Face Plate Visor Zone */}
                    <path d="M70,95 Q100,115 130,95 L125,115 Q100,135 75,115 Z" fill="#000" stroke="rgba(255,255,255,0.2)" />
                 </g>

                 {/* ENERGY LINES AND ACCENTS - Gives the "living tech" look */}
                 <g fill="none" strokeWidth="1.5" stroke={activeAuraColor} filter="url(#glow)">
                    {/* Visor glowing slit */}
                    <path d="M80,105 Q100,120 120,105" opacity="0.9" strokeWidth="2" />
                    
                    {/* Chest Arc Reactor Core */}
                    <circle cx="100" cy="210" r="14" strokeWidth="1" stroke="rgba(255,255,255,0.5)" fill="rgba(0,0,0,0.8)" />
                    <circle cx="100" cy="210" r="8" fill={activeAuraColor} opacity="0.8" />
                    <circle cx="100" cy="210" r="4" fill="#fff" />
                    
                    {/* Temple nodes */}
                    <circle cx="65" cy="100" r="2.5" fill={activeAuraColor} />
                    <circle cx="135" cy="100" r="2.5" fill={activeAuraColor} />
                 </g>

                 {/* Advanced Armor Structure Adds */}
                 {(armorType !== 'metal_basic') && (
                   <g stroke="url(#edge_glow)" strokeWidth="1.2" fill={`url(#${armorType})`}>
                     {/* Outer Shoulders Floating */}
                     <polygon points="20,200 40,180 35,210 10,230" />
                     <polygon points="180,200 160,180 165,210 190,230" />
                     {/* Extra cyber cables / neck guards */}
                     <polygon points="70,165 60,150 80,160" />
                     <polygon points="130,165 140,150 120,160" />
                   </g>
                 )}

                 {/* Supreme / Highest Level Fragments - Explosive power */}
                 {(armorType === 'metal_supreme' || armorType === 'metal_obsidian') && (
                   <g fill={`url(#${armorType})`} stroke={activeAuraColor} strokeWidth="1" filter="url(#glow)">
                     {/* Floating fractured skull plates */}
                     <polygon points="65,50 75,40 80,55" />
                     <polygon points="135,50 125,40 120,55" />
                     <polygon points="85,30 100,20 115,30 100,35" />
                     
                     {/* Shoulder energy vents */}
                     <polygon points="45,190 55,205 35,220" fill="none" opacity="0.5"/>
                     <polygon points="155,190 145,205 165,220" fill="none" opacity="0.5"/>
                   </g>
                 )}

                 {/* EYES LAYER - More intense and piercing */}
                 {olhos.length > 0 ? (
                   <g filter="url(#glow)">
                     {/* Cybernetic Visor/Eyes */}
                     <polygon points="75,100 95,105 92,112 75,106" fill={olhos[0].color || '#00f0ff'} />
                     <polygon points="125,100 105,105 108,112 125,106" fill={olhos[0].color || '#00f0ff'} />
                     {/* Pupils/Core glow */}
                     <circle cx="85" cy="106" r="3" fill="#fff" />
                     <circle cx="115" cy="106" r="3" fill="#fff" />
                   </g>
                 ) : (
                   <g filter="url(#glow)">
                     <polygon points="80,105 90,108 90,110 80,108" fill={activeAuraColor} opacity="0.8" />
                     <polygon points="120,105 110,108 110,110 120,108" fill={activeAuraColor} opacity="0.8" />
                   </g>
                 )}

                 {/* COROA LAYER */}
                 {coroas.length > 0 && (
                   <g fill="none" stroke={coroas[0].color || '#fff'} strokeWidth="1.5" filter="url(#glow)">
                      <path d="M50,40 Q100,-10 150,40 Q125,55 100,20 Q75,55 50,40" fill="rgba(255,255,255,0.05)" />
                      {/* Floating crown crystals */}
                      <polygon points="100,0 105,10 100,20 95,10" fill={coroas[0].color || '#fff'} />
                      <polygon points="70,20 75,30 70,40 65,30" fill={coroas[0].color || '#fff'} opacity="0.8" />
                      <polygon points="130,20 135,30 130,40 125,30" fill={coroas[0].color || '#fff'} opacity="0.8" />
                   </g>
                 )}

                 {/* ENERGY CRACKS / AWAKENED STATE (Supreme Level Only) */}
                 {(armorType === 'metal_supreme') && (
                    <g fill="none" strokeWidth="2" stroke="#fff" filter="url(#glow)" opacity="0.7">
                      <polyline points="95,140 100,165 105,140" />
                      <polyline points="80,160 90,190 85,200" />
                      <polyline points="120,160 110,190 115,200" />
                      <circle cx="100" cy="205" r="8" fill="#fff" stroke="none" />
                    </g>
                 )}
             </svg>
           );
         })()}
          
         {/* 🔹 ARMAS LAYER */}
         {armas.map((weapon, i) => (
            <motion.div 
              key={weapon.id}
              className={`absolute top-[5%] w-[8px] h-[90%] rounded-full z-0 flex flex-col items-center overflow-hidden ${i % 2 === 0 ? '-right-[10%]' : '-left-[10%]'}`}
              style={{ 
                boxShadow: `0 0 30px ${weapon.color || '#00f0ff'}`,
                transformOrigin: 'center center'
              }}
              animate={{ y: [-20, 20, -20], rotateZ: i % 2 === 0 ? [15, 20, 15] : [-15, -20, -15] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
               {/* Sword Energy Glow */}
               <div className="w-full h-full absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 0%, ${weapon.color || '#00f0ff'} 20%, #fff 50%, ${weapon.color || '#00f0ff'} 80%, black 100%)` }} />
               
               {/* Sword core bright line */}
               <div className="w-[2px] h-[80%] bg-text-primary absolute top-[10%] blur-[1px]" />
               
               {/* Hilts */}
               <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[16px] h-[40px] bg-black rounded-sm border-2" style={{ borderColor: weapon.color || '#00f0ff' }}>
                 {/* Crossguard */}
                 <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[30px] h-[6px] rounded-full bg-black border" style={{ borderColor: weapon.color || '#00f0ff' }} />
               </div>
            </motion.div>
         ))}

         {/* 🔹 SATÉLITES LAYER */}
         {satelites.length > 0 && satelites.map((sat, i) => (
            <motion.div
               key={sat.id}
               className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-black border-2 z-30 flex items-center justify-center overflow-hidden"
               style={{ borderColor: sat.color || '#fff', boxShadow: `0 0 25px ${sat.color || '#fff'}, inset 0 0 10px ${sat.color || '#fff'}` }}
               animate={{ x: [80, 100, 80], y: [-40, 30, -40], rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
               {/* Drone Core */}
               <div className="w-2 h-2 rounded-full bg-text-primary animate-pulse" style={{ boxShadow: `0 0 15px 5px ${sat.color || '#fff'}` }} />
               {/* Tech Lines */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50 mix-blend-overlay" />
            </motion.div>
         ))}

         {/* 🔹 PARTÍCULAS LAYER */}
         {particulas.length > 0 && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-40%] border-[1px] border-dashed rounded-full opacity-20 z-30 pointer-events-none"
              style={{ borderColor: particulas[0].color || 'white' }}
            />
         )}

      </div>
    </div>
  );
}

