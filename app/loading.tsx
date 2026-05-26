import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-neon-blue/20 blur-[50px] rounded-full" />
        <Loader2 size={48} className="text-neon-blue animate-spin relative z-10" />
      </div>
      <p className="mt-8 text-sm font-bold text-text-secondary uppercase tracking-widest animate-pulse">
        Carregando Módulos...
      </p>
    </div>
  );
}
