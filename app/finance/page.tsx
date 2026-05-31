'use client';

import { useState, useEffect, useRef } from 'react';
import { generateAI } from '@/src/services/geminiService';
import { useAppStore } from '@/lib/store';
import { BottomNav } from '@/components/BottomNav';
import { TrendingUp, TrendingDown, Plus, Loader2, BrainCircuit, Mic, PieChart, Activity, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/Header';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
};

export default function FinancePage() {
  const { profile, showPremiumModal } = useAppStore();
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('evolux_finance');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [processingAudio, setProcessingAudio] = useState(false);
  const recognitionRef = useRef<any>(null);

  // We save to local storage on change
  useEffect(() => {
    localStorage.setItem('evolux_finance', JSON.stringify(transactions));
  }, [transactions]);

  const handleVoiceCommand = async (transcript: string) => {
    setProcessingAudio(true);
    try {
      const prompt = `Analise a seguinte frase falada pelo usuário: "${transcript}".
Extraia o valor financeiro (número flutuante), a descrição da transação e o tipo ('income' para receita/ganho, 'expense' para despesa/gasto).
Responda EXATAMENTE E APENAS no formato JSON: {"amount": número, "description": "string", "type": "income" ou "expense"}`;
      
      const data = await generateAI({
        prompt,
        model: 'gemini-3.5-flash',
        responseMimeType: 'application/json'
      });
      
      let responseText = data.text || "";
      if (responseText.includes("```json")) {
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      }

      const parsed = JSON.parse(responseText);
      
      if (parsed.amount && parsed.description && parsed.type) {
        const newTx: Transaction = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: parsed.type,
          amount: parseFloat(parsed.amount),
          description: parsed.description,
          date: new Date().toLocaleDateString('en-CA')
        };
        setTransactions(prev => [newTx, ...prev]);
      }
    } catch (error) {
      console.error('Failed to parse voice command:', error);
      alert('Não conseguimos entender o áudio. Tente falar algo como: "Gastei 50 reais com almoço".');
    } finally {
      setProcessingAudio(false);
    }
  };

  useEffect(() => {
    // Setup Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      
      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleVoiceCommand(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert("Permissão de microfone negada ou bloqueada. Certifique-se de permitir o uso do microfone no seu navegador/dispositivo para utilizar os comandos de voz.");
        } else if (event.error === 'no-speech') {
          // Silent or brief alert for no speech heard
          console.warn("Nenhuma voz detectada.");
        } else {
          alert(`Erro no reconhecimento de voz: ${event.error}`);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('evolux_finance', JSON.stringify(transactions));
  }, [transactions]);



  const toggleListen = () => {
    if (profile?.plan === 'base' || profile?.plan === 'orbit') {
      showPremiumModal("Controle Financeiro por Voz IA está disponível a partir do plano Evolux Nova.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTx: Transaction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      amount: parseFloat(amount.replace(',', '.')),
      description,
      date: new Date().toLocaleDateString('en-CA')
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setDescription('');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const balance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

  const generateInsight = async () => {
    if (profile?.plan === 'base' || profile?.plan === 'orbit') {
      showPremiumModal("Análise e Insights Financeiros IA são exclusivos do plano Evolux Nova ou superior.");
      return;
    }
    if (transactions.length === 0) return;
    setLoadingInsight(true);
    try {
      const txData = transactions.slice(0, 10).map(t => `${t.type === 'income' ? '+' : '-'}${t.amount} (${t.description})`).join(', ');
      
      const data = await generateAI({
        prompt: `Analise as transações financeiras: ${txData}. Saldo atual: ${balance}. Dê um feedback motivacional, analítico e curto (2 frases) sobre os padrões de gastos da pessoa.`,
        model: 'gemini-3.5-flash'
      });

      setInsight(data.text || "Insight não disponível no momento.");
    } catch (error) {
      console.error(error);
      setInsight("Erro ao gerar insight. Tente novamente.");
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <Header title="Finanças IA" subtitle="Controle inteligente de fluxo" />

      <main className="p-5 space-y-6 max-w-2xl mx-auto">
        {/* Main Dashboard Cards */}
        <section className="grid grid-cols-2 gap-3">
          {/* Balance Card - Span 2 columns */}
          <div className="col-span-2 bg-gradient-to-br from-[#1a1a2e] to-surface border border-[#2a2a4a] p-6 rounded-3xl relative overflow-hidden flex justify-between items-center box-glow-blue">
            <div className="absolute top-0 right-[-20%] w-64 h-64 bg-neon-blue/10 rounded-full blur-[60px] pointer-events-none" />
            <div>
              <p className="text-text-secondary text-xs uppercase tracking-widest font-bold mb-1">Saldo Atual</p>
              <h2 className={`text-4xl font-display font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
                R$ {balance.toFixed(2)}
              </h2>
            </div>
            {/* Audio Action Button */}
            <button 
               onClick={toggleListen}
               disabled={processingAudio}
               className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative ${isListening ? 'bg-neon-pink text-white animate-pulse shadow-[0_0_20px_rgba(255,42,127,0.5)]' : processingAudio ? 'bg-surface-light text-text-secondary' : 'bg-surface-light text-white hover:bg-white/10'}`}
            >
              {processingAudio ? <Loader2 size={24} className="animate-spin" /> : <Mic size={24} />}
              {(profile?.plan === 'base' || profile?.plan === 'orbit') && (
                <div className="absolute -top-1 -right-1 bg-surface-light rounded-full p-1 border border-background">
                  <Lock size={10} className="text-text-secondary" />
                </div>
              )}
            </button>
          </div>
          
          <div className="bg-surface border border-surface-light p-4 rounded-2xl flex flex-col justify-between">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                 <TrendingUp size={12} className="text-emerald-400" />
               </div>
               <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Receitas</span>
             </div>
             <p className="text-xl font-bold text-emerald-400">R$ {totalIncome.toFixed(2)}</p>
          </div>
          
          <div className="bg-surface border border-surface-light p-4 rounded-2xl flex flex-col justify-between">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-6 rounded-full bg-neon-pink/10 flex items-center justify-center">
                 <TrendingDown size={12} className="text-neon-pink" />
               </div>
               <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Despesas</span>
             </div>
             <p className="text-xl font-bold text-neon-pink">R$ {totalExpense.toFixed(2)}</p>
          </div>
        </section>

        {isListening && (
           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-neon-pink/10 border border-neon-pink/20 p-4 rounded-2xl text-center">
              <p className="text-sm font-bold text-neon-pink animate-pulse">Ouvindo... Fale sua receita ou despesa.</p>
              <p className="text-xs text-text-secondary mt-1">Ex: &quot;Ganhei 1500 de salário&quot; ou &quot;Gastei 45 no mercado&quot;</p>
           </motion.div>
        )}

        {/* AI Insight */}
        <div className="bg-surface p-5 rounded-3xl border border-surface-light relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-purple" />
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold flex items-center gap-2 text-sm text-white">
              <BrainCircuit size={18} className="text-neon-purple" />
              Coach Financeiro IA
            </h3>
            <button 
              onClick={generateInsight}
              disabled={loadingInsight || transactions.length === 0}
              className="text-[10px] uppercase tracking-widest font-bold bg-surface-light text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingInsight ? 'Analisando...' : 'Pedir Conselho'}
              {(profile?.plan === 'base' || profile?.plan === 'orbit') && <Lock size={12} className="text-text-secondary" />}
            </button>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {insight || (transactions.length === 0 ? "Adicione transações para começarmos a análise preditiva." : "Deixe a inteligência artificial encontrar padrões nos seus gastos.")}
          </p>
        </div>

        {/* Manual Add Form */}
        <form onSubmit={handleAdd} className="bg-surface p-5 rounded-3xl border border-surface-light space-y-4">
          <p className="text-sm font-bold text-white flex items-center gap-2 mb-2"><Plus size={16} /> Registro Manual</p>
          <div className="flex bg-background border border-surface-light p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                type === 'income' ? 'bg-surface-light text-emerald-400' : 'text-text-secondary hover:text-white'
              }`}
            >
              Receita
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                type === 'expense' ? 'bg-surface-light text-neon-pink' : 'text-text-secondary hover:text-white'
              }`}
            >
              Despesa
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              inputMode="decimal"
              placeholder="R$ 0,00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="sm:w-1/3 w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-neon-blue transition-colors"
            />
            <input 
              type="text" 
              placeholder="Descrição curta" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 bg-background border border-surface-light rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={!amount || !description}
            className="w-full bg-neon-blue text-background font-bold uppercase tracking-widest text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-neon-blue/90 transition-colors disabled:opacity-50"
          >
            Confirmar Registro
          </button>
        </form>

        {/* History Overview */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Transações Recentes</h3>
            <span className="text-xs text-text-secondary">{transactions.length} registros</span>
          </div>
          
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="py-8 text-center border border-surface-light border-dashed rounded-2xl">
                 <Activity size={24} className="mx-auto text-text-secondary/40 mb-2" />
                 <p className="text-sm text-text-secondary">Seu histórico está vazio.</p>
              </div>
            ) : (
              <AnimatePresence>
                {transactions.slice(0, 15).map((tx, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={tx.id} 
                    className="flex justify-between items-center p-4 bg-surface rounded-2xl border border-surface-light group"
                  >
                    <div className="flex gap-4 items-center">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-neon-pink/10'}`}>
                         {tx.type === 'income' ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-neon-pink" />}
                       </div>
                       <div>
                         <p className="font-bold text-white text-sm tracking-tight">{tx.description}</p>
                         <p className="text-xs text-text-secondary mt-0.5 font-mono">{tx.date.split('-').reverse().join('/')}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-neon-pink'}`}>
                        {tx.type === 'income' ? '+' : '-'}R$ {tx.amount.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-text-secondary/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all font-bold text-xs"
                      >
                         X
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
