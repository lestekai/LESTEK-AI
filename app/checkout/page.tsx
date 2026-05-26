import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Copy, ArrowLeft, Send } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'orbit';
  const navigate = useNavigate();
  const { profile } = useAppStore();

  const PIX_KEY = '77999587570';
  const PIX_NAME = 'Luis Eduardo Santos Correia';
  
  const planNames: Record<string, string> = {
    orbit: 'Evolux Orbit (R$ 9/mês)',
    nova: 'Evolux Nova (R$ 29/mês)',
    infinite: 'Evolux Infinite (R$ 49/mês)'
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    alert('Chave PIX copiada!');
  };

  const handleSendWhatsApp = async () => {
    const text = `Olá! Sou o usuário ${profile?.name || profile?.username} (@${profile?.username}), acabei de fazer a compra do plano *${planNames[plan]}*.\n\nSegue o comprovante PIX abaixo:`;
    const wppUrl = `https://wa.me/5577999587570?text=${encodeURIComponent(text)}`;
    
    // Registrar a solicitação no perfil do usuário
    if (profile) {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('profiles').select('equipped_cosmetics').eq('id', profile.id).single();
      const currentCosmetics = data?.equipped_cosmetics || {};
      
      await supabase.from('profiles').update({
        equipped_cosmetics: {
          ...currentCosmetics,
          plan_request: plan,
          plan_request_date: new Date().toISOString()
        }
      }).eq('id', profile.id);
    }

    window.open(wppUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col p-6">
      <header className="mb-8 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-secondary hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Finalizar Assinatura</h1>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto bg-surface border border-surface-light rounded-3xl p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neon-blue mb-2">Instruções de Pagamento</h2>
          <p className="text-sm text-text-secondary">
            Você selecionou o plano <strong>{planNames[plan]}</strong>.<br/>
            Para ativar, realize o pagamento via PIX.
          </p>
        </div>

        <div className="bg-background rounded-2xl p-4 border border-white/5 mb-6 text-center">
          <p className="text-xs text-text-secondary mb-1">Chave PIX (Celular)</p>
          <div className="text-2xl font-bold font-mono tracking-widest text-white mb-2">{PIX_KEY}</div>
          <p className="text-xs text-text-secondary mb-4">Favorecido: {PIX_NAME}</p>
          
          <button 
            onClick={handleCopyPix}
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm font-bold"
          >
            <Copy size={16} /> Copiar Chave PIX
          </button>
        </div>

        <div className="border-t border-surface-light pt-6">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Send size={16} className="text-emerald-400" />
            Envie o Comprovante
          </h3>
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            Após realizar a transferência, envie o comprovante para o administrador no WhatsApp para que ele possa ativar seu plano manualmente.
          </p>
          
          <button 
            onClick={handleSendWhatsApp}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-3"
          >
            Enviar Comprovante via WhatsApp
          </button>
          
          <button 
            onClick={() => navigate('/setup')}
            className="w-full py-3 bg-surface-light border border-white/5 hover:bg-white/10 text-text-secondary hover:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            Concluir e Instalar App
          </button>
        </div>
      </motion.div>
    </div>
  );
}
