import { Link, useNavigate, useLocation } from 'react-router-dom';
'use client';


import { Home, CheckSquare, Target, Dumbbell, Wallet, Trophy, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { href: '/workouts', icon: Dumbbell, label: 'Treino' },
    { href: '/finance', icon: Wallet, label: 'Finanças' },
    { href: '/dashboard', icon: Home, label: 'Início' },
    { href: '/ranking', icon: Trophy, label: 'Ranking' },
    { href: '/tasks', icon: CheckSquare, label: 'Tarefas' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-light pb-6 pt-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} 
              to={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                isActive ? 'text-neon-blue' : 'text-text-secondary hover:text-white'
              }`}
            >
              <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : ''} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
