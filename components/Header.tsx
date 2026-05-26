'use client';

import { ProfileMenu } from './ProfileMenu';
import { GlobalNotifications } from './GlobalNotifications';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function Header({ title, subtitle, showLogo = false }: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 pt-12 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-[100] border-b border-surface-light">
       <div className="flex-1">
         {showLogo ? (
           <div className="flex items-center gap-3">
             <img src="/logo.png" alt="Evolux" className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
             <div className="font-display font-bold text-xl tracking-widest text-glow-blue">EVOLUX</div>
           </div>
         ) : (
           <>
             <h1 className="text-2xl font-bold text-glow-blue">{title}</h1>
             {subtitle && <p className="text-text-secondary text-xs mt-0.5">{subtitle}</p>}
           </>
         )}
       </div>
       <div className="flex items-center gap-3">
         <GlobalNotifications />
         <ProfileMenu />
       </div>
    </div>
  );
}
