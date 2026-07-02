'use client';

import { UserProfile } from '@/lib/store';
import { COSMETICS, getRankTier } from '@/lib/evolux';
import { MiniCosmicAvatar } from './MiniCosmicAvatar';

interface CosmicAvatarProps {
  profile: UserProfile;
}

export function CosmicAvatar({ profile }: CosmicAvatarProps) {
  const { avatarLevel, xp, equippedCosmetics } = profile;

  // Derive Rank Name from lib logic based on the user's hard level
  const rank = getRankTier(avatarLevel);

  // We find which cosmetics are really EQUIPPED
  const equippedList = Object.values(equippedCosmetics || {}).filter(Boolean) as string[];
  const myCosmetics = COSMETICS.filter(c => equippedList.includes(c.id));
  
  // Best aura color
  const bestAura = myCosmetics.find(c => c.type === 'aura')?.color;
  const auraColor = bestAura || 'rgba(0,240,255,0.2)';

  return (
    <div className="relative w-full h-[550px] flex flex-col justify-end items-center pointer-events-none pb-4">
      
      {/* 🔹 The Advanced Cybernetic Avatar */}
      <div className="relative z-10 -mb-10 scale-[1.5] origin-bottom">
        <MiniCosmicAvatar 
           streak={profile.streak} 
           auraColor={auraColor} 
           size={200} 
           cosmetics={myCosmetics} 
        />
      </div>

      {/* 🔹 PEDESTAL */}
       <div className="relative z-20 flex flex-col items-center drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
          {/* Top Platform */}
          <div className="w-64 h-5 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 rounded-t-lg border-b-2 border-gray-800" />
          
          {/* Display Screen */}
          <div className="w-72 bg-gradient-to-b from-gray-800 to-gray-900 border-x border-gray-700 pb-3 pt-4 px-4 flex flex-col items-center relative overflow-hidden">
             {/* Screen Glow Effect */}
             <div className="absolute inset-2 border border-neon-blue/30 rounded-md shadow-[inset_0_0_15px_rgba(0,240,255,0.15)] bg-black/50 pointer-events-none" />
             
             {/* Nameplate */}
             <span className="font-display text-glow-blue text-lg font-bold tracking-[0.2em] uppercase relative z-10 mb-1">
                {profile.name}
             </span>
             
             {/* Stats Display */}
             <div className="relative z-10 w-full flex flex-col items-center border-t border-white/10 pt-2 mt-1">
                <span className={`text-xs font-bold uppercase tracking-widest ${rank.color}`}>
                   LEVEL {avatarLevel}: {rank.name}
                </span>
                <span className="text-[10px] text-text-secondary mt-1 font-mono uppercase tracking-widest">
                   XP: +{xp}
                </span>
             </div>
          </div>

          {/* Base Platform */}
          <div className="w-80 h-10 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 rounded-b-xl border-t border-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex justify-between items-center px-6">
             <div className="w-2 h-2 bg-neon-blue rounded-full box-glow-blue" />
             <div className="w-24 h-1 bg-neon-blue/40 rounded-full box-glow-blue" />
             <div className="w-2 h-2 bg-neon-blue rounded-full box-glow-blue" />
          </div>
       </div>

    </div>
  );
}
