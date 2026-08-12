'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { generateAI } from '@/src/services/geminiService';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Cpu, Sparkles, Loader2, ArrowLeft, Bot, MessageSquare } from 'lucide-react';


interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Outer helper functions to guarantee component purity during React renders
function createDate(): Date {
  return new Date();
}

function createId(suffix: string = ''): string {
  return `${Date.now()}_${suffix || Math.random().toString(36).substr(2, 9)}`;
}

export default function AICoachPage() {
  const { profile } = useAppStore();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Saudações, Operador. Eu sou a Inteligência Evolux. Estou pronta para otimizar seus treinos, recalcular suas rotinas, extrair relatórios ou impulsionar sua disciplina. O que faremos hoje?',
      timestamp: createDate()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sendMessageRef = useRef<any>(null);

  // Auto scroll to latest chats
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    // Check compatibility with Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript.trim() && sendMessageRef.current) {
          sendMessageRef.current(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Erro de gravação:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Permissão de microfone negada. Ative-a nas preferências para usar voz.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListen = () => {
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

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || input;
    if (!rawText.trim() || loading) return;

    const userMessage: Message = {
      id: createId('user'),
      sender: 'user',
      text: rawText.trim(),
      timestamp: createDate()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const systemInstruction = `Você é a IA Coach Evolux Integrada, especialista em alta performance física, desenvolvimento de bons hábitos, saúde e educação financeira.
Seu tom de voz deve ser motivador, focado na disciplina absoluta (nada de preguiça), de forma educada, curta, assertiva e cibernética.
Use termos como "Operador", "Sistemas", "Directiva", "Ofensiva (referindo à streak)". Mostre energia e incentive persistência. Responda em português (pt-BR).`;

      // Context of the conversation (last 4 messages for memory)
      const chatHistoryPrompt = messages.slice(-4).map(m => `${m.sender === 'user' ? 'Usuário' : 'Evolux AI'}: ${m.text}`).join('\n');
      const finalPrompt = `${chatHistoryPrompt}\nUsuário: ${rawText.trim()}\nEvolux AI:`;

      const response = await generateAI({
        prompt: finalPrompt,
        systemInstruction,
        model: 'gemini-2.5-flash'
      });

      const aiMessage: Message = {
        id: createId('ai'),
        sender: 'ai',
        text: response.text || 'Erro de processamento da IA: resposta retornou vazia.',
        timestamp: createDate()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: Message = {
        id: createId('err'),
        sender: 'ai',
        text: `Erro de Conexão com o Evolux AI: ${err.message || 'Erro inesperado'}. Se você está hospedado localmente ou no Netlify e ainda não cadastrou a chave, configure uma chave Gemini pessoal de backup no menu "Configurações" para restabelecer os serviços instantaneamente!`,
        timestamp: createDate()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Safe update ref inside an effect to prevent mutation during render phase
  useEffect(() => {
    sendMessageRef.current = handleSendMessage;
  });

  const chips = [
    { text: 'Sugerir Treino HIIT Rápido de 15 min 🦾' },
    { text: 'Planejar Almoço Proteico Prático 🍎' },
    { text: 'Como posso melhorar minha disciplina diária? 🔥' },
    { text: 'Criar um plano de economia financeira 💵' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden flex flex-col justify-between relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-blue/10 via-background to-background pointer-events-none" />

      {/* Header */}
      <div>
        <header className="flex justify-between items-center px-6 pt-12 pb-4 sticky top-0 bg-background/80 backdrop-blur-md z-[100] border-b border-surface-light font-display">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-glow-blue flex items-center gap-2">
                <Cpu size={20} className="text-neon-blue animate-pulse" /> Coach Evolux
              </h1>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase">Inteligência Integrada</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
            </span>
          </div>
        </header>
      </div>

      {/* Chat Area */}
      <main className="flex-grow overflow-y-auto px-6 py-4 space-y-4 flex flex-col max-w-2xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 size={24} className="animate-spin text-neon-blue" />
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((m) => {
              const isAI = m.sender === 'ai';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${isAI ? 'self-start' : 'self-end flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border ${
                    isAI ? 'bg-neon-blue/10 border-neon-blue/20 text-neon-blue shadow-[0_0_10px_rgba(0,180,255,0.15)]' : 'bg-neon-purple/10 border-neon-purple/20 text-neon-purple shadow-[0_0_10px_rgba(150,0,255,0.15)]'
                  }`}>
                    {isAI ? <Bot size={16} /> : <MessageSquare size={16} />}
                  </div>

                  <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                    isAI 
                      ? 'bg-surface border-surface-light text-text-primary rounded-tl-sm shadow-md' 
                      : 'bg-gradient-to-br from-neon-purple/15 to-neon-blue/5 border-neon-purple/20 text-text-primary rounded-tr-sm shadow-md'
                  }`}>
                    {m.text}
                    {m.timestamp && (
                      <span className="block text-[8px] text-text-secondary mt-1.5 text-right font-mono">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {loading && (
          <div className="flex gap-3 max-w-[85%] self-start">
            <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border bg-neon-blue/10 border-neon-blue/20 text-neon-blue animate-pulse">
              <Bot size={16} />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-sm bg-surface border border-surface-light flex items-center gap-3">
              <Loader2 size={16} className="animate-spin text-neon-blue" />
              <span className="text-xs text-text-secondary uppercase tracking-widest font-mono font-medium animate-pulse">Instância Processando...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Suggested Chips (Only visible when few messages occur) */}
      {messages.length < 3 && messages.length > 0 && (
        <div className="px-6 py-2 overflow-x-auto whitespace-nowrap hide-scrollbar max-w-2xl mx-auto w-full">
          <div className="flex gap-2">
            {chips.map((chip, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(chip.text)}
                className="inline-block px-3.5 py-1.5 rounded-full bg-surface border border-surface-light text-text-secondary hover:text-text-primary text-[11px] transition-all hover:bg-text-primary/5 active:scale-95"
              >
                {chip.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input controls */}
      <footer className="px-6 py-4 bg-background/80 backdrop-blur-md sticky bottom-0 border-t border-surface-light z-50">
        <div className="max-w-2xl mx-auto w-full flex items-center gap-2">
          
          {/* voice recording button */}
          <button
            onClick={toggleListen}
            className={`p-3.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isListening 
                ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse' 
                : 'bg-surface border-surface-light text-text-secondary hover:text-text-primary'
            }`}
            title="Ditar Conversa por Voz"
          >
            <Mic size={18} />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isListening ? "Escutando transmissão áudio..." : "Faça uma pergunta sobre treino, dieta ou hábitos..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
              className="w-full bg-surface border border-surface-light rounded-xl pl-4 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-neon-blue transition-colors disabled:opacity-65"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-neon-blue hover:text-text-primary disabled:pointer-events-none disabled:opacity-30 transition-all font-bold cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
