import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-display font-black text-text-primary mb-4">404</h2>
      <p className="text-text-secondary mb-8">Página não encontrada no seu radar.</p>
      <Link to="/dashboard" className="px-6 py-3 bg-neon-blue text-background font-bold tracking-widest uppercase rounded-full">
        Voltar à Base
      </Link>
    </div>
  );
}
