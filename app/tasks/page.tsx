'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore, TaskCategory } from '@/lib/store';
import { BottomNav } from '@/components/BottomNav';
import { Plus, CheckCircle2, Target, Zap, Flame, Dumbbell, Wallet, Activity, Code, BookOpen, Coffee, X, PlusCircle, LayoutList, Calendar, Mic, Send, AlertTriangle, Brain, Star, TrendingUp, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

import { Header } from '@/components/Header';

export default function TasksPage() {
  const { tasks, addTask, toggleTask, updateTaskProgress, toggleSubTask, profile, showPremiumModal } = useAppStore();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('routine');
  const [showAddForm, setShowAddForm] = useState(false);
  
  type UISection = 'all' | 'priority' | 'mental' | 'physical' | 'long_term';
  const [activeSection, setActiveSection] = useState<UISection>('all');
  
  // Advanced Task Fields
  const [isLongTerm, setIsLongTerm] = useState(false);
  const [isRecurringForm, setIsRecurringForm] = useState(true);
  const [hasTarget, setHasTarget] = useState(false);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [targetUnit, setTargetUnit] = useState('');
  const [subTasks, setSubTasks] = useState<{title: string}[]>([]);
  const [newSubTask, setNewSubTask] = useState('');

  // Stuck UI Modal
  const [showStuckModal, setShowStuckModal] = useState(false);

  // Focus Voice/Quick Input
  const [quickInput, setQuickInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date());
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());

  const getLocalDateStr = (d: Date) => {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  
  const todayStr = getLocalDateStr(new Date());
  const selectedStr = getLocalDateStr(selectedCalendarDate);

  const todaysTasks = tasks.filter(t => !t.isLongTerm && (
    t.date === selectedStr ||
    (t.isRecurring && (t.baseDate ? t.baseDate <= selectedStr : t.date <= selectedStr))
  ));
  
  const longTermTasks = tasks.filter(t => t.isLongTerm);

  const getFilteredTasks = () => {
    if (activeSection === 'priority') return todaysTasks.filter(t => t.category === 'routine');
    if (activeSection === 'mental') return todaysTasks.filter(t => t.category === 'goal');
    if (activeSection === 'physical') return todaysTasks.filter(t => t.category === 'workout');
    if (activeSection === 'long_term') return longTermTasks;
    return activeSection === 'all' ? todaysTasks : todaysTasks;
  };

  const currentViewTasks = getFilteredTasks();

  const completedCount = todaysTasks.filter(t => t.completed).length;
  const progress = todaysTasks.length > 0 ? (completedCount / todaysTasks.length) * 100 : 0;
  const isAllCompleted = todaysTasks.length > 0 && completedCount === todaysTasks.length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };
  
  const userName = profile?.name?.split(' ')[0] || 'Evoluner';

  const generateCalendarDays = () => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const days = [];
    
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({ dayNumber: prevMonthDays - i, isCurrentMonth: false, isToday: false, date: new Date(year, month - 1, prevMonthDays - i) });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const isSelected = i === selectedCalendarDate.getDate() && month === selectedCalendarDate.getMonth() && year === selectedCalendarDate.getFullYear();
      days.push({ 
        dayNumber: i, 
        isCurrentMonth: true, 
        isToday,
        isSelected,
        date: new Date(year, month, i)
      });
    }
    
    const totalSlots = Math.ceil(days.length / 7) * 7;
    let nextPos = 1;
    while (days.length < totalSlots) {
       days.push({ dayNumber: nextPos++, isCurrentMonth: false, isToday: false, date: new Date(year, month + 1, nextPos - 1) });
    }
    
    return days;
  };
  const calendarDays = generateCalendarDays();
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const prevMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      if (profile?.role !== 'admin' && profile?.plan === 'base' && todaysTasks.length >= 5 && !isLongTerm) {
        showPremiumModal("O Plano Base é limitado a 5 tarefas por dia.");
        return;
      }
      let xp = 10;
      if (newTaskCategory === 'workout') xp = 30;
      if (newTaskCategory === 'finance') xp = 20;
      if (newTaskCategory === 'goal') xp = 40;
      if (isLongTerm) xp = 100;

      addTask({
        title: newTaskTitle,
        category: newTaskCategory,
        xpReward: xp,
        date: isLongTerm ? 'long_term' : selectedStr,
        isLongTerm,
        isRecurring: isLongTerm ? false : isRecurringForm,
        baseDate: isRecurringForm ? selectedStr : undefined,
        targetAmount: hasTarget && targetAmount > 0 ? targetAmount : undefined,
        unit: hasTarget && targetUnit ? targetUnit : undefined,
        subTasks: isLongTerm && subTasks.length > 0 ? subTasks.map(st => ({ id: Math.random().toString(), title: st.title, completed: false })) : undefined
      });
      
      setNewTaskTitle('');
      setShowAddForm(false);
      setHasTarget(false);
      setTargetAmount(0);
      setTargetUnit('');
      setSubTasks([]);
    }
  };

  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    toggleTask(id);
    if (!currentlyCompleted) {
      const remaining = todaysTasks.filter(t => !t.completed && t.id !== id).length;
      if (remaining === 0 && todaysTasks.length > 0) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#b026ff', '#ffffff', '#ff007f']
        });
      }
    }
  };

  const getCategoryConfig = (cat?: TaskCategory) => {
    switch (cat) {
      case 'workout': return { icon: <Dumbbell size={16} />, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Saúde Física' };
      case 'finance': return { icon: <Wallet size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Finanças' };
      case 'goal': return { icon: <Brain size={16} />, color: 'text-neon-purple', bg: 'bg-neon-purple/10', label: 'Mentalidade' };
      case 'routine': return { icon: <Star size={16} />, color: 'text-neon-blue', bg: 'bg-neon-blue/10', label: 'Prioridade Máxima' };
      default: return { icon: <Activity size={16} />, color: 'text-white', bg: 'bg-white/10', label: 'Custom' };
    }
  };

  const streak = profile?.streak || 0;

  const handleQuickAdd = () => {
    if (quickInput.trim()) {
      if (profile?.role !== 'admin' && profile?.plan === 'base' && todaysTasks.length >= 5) {
        showPremiumModal("O Plano Base é limitado a 5 tarefas por dia.");
        return;
      }
      addTask({
        title: quickInput,
        category: 'routine',
        xpReward: 10,
        isLongTerm: false,
        isRecurring: false,
        date: todayStr,
      });
      setQuickInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-[160px] relative overflow-x-hidden pt-safe">
      
      {/* Header Dinâmico */}
      <div className="px-5 pt-8 pb-4">
         <h1 className="text-3xl font-display font-bold text-white mb-2">
           {getGreeting()}, <span className="text-neon-blue">{userName}</span>! ⚡
         </h1>
         <p className="text-text-secondary text-sm">O que vamos conquistar hoje?</p>
      </div>

      {/* Componente: Missões IA */}
      <div className="px-5 mb-6 filter drop-shadow-xl">
        <div className="bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20 p-4 rounded-3xl flex items-start gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="w-10 h-10 rounded-2xl bg-surface border border-neon-purple/30 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(150,0,255,0.2)]">
             <Bot size={20} className="text-neon-purple" />
          </div>
          <div className="z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neon-purple mb-1 select-none flex items-center gap-1">
              Reflexão IA Evolux
            </p>
            <p className="text-sm text-white font-medium">
              {todaysTasks.length === 0 
                ? 'Sem missões ativas hoje. Defina seus alvos e comece a escalar.'
                : todaysTasks.every(t => t.completed)
                  ? 'Você obliterou todas as missões de hoje. Excelente. Prepare-se para amanhã.'
                  : `Sistema detectou ${todaysTasks.filter(t => !t.completed).length} missão(ões) em aberto. Mantenha a agressividade e liquide suas metas.`}
            </p>
          </div>
        </div>
      </div>

      {/* Histórico Inteligente (Mini Dash) */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-end mb-3">
           <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Desempenho Real</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
           <div className="bg-surface border border-surface-light rounded-2xl p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-default">
             <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1 select-none text-center">Progresso<br/>Diário</span>
             <span className="text-neon-blue font-display font-bold text-lg">{todaysTasks.length > 0 ? Math.round((todaysTasks.filter(t => t.completed).length / todaysTasks.length) * 100) : 0}%</span>
           </div>
           <div className="bg-surface border border-surface-light rounded-2xl p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-default">
             <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1 select-none text-center">Dias de<br/>Ofensiva</span>
             <span className="text-amber-500 font-display font-bold text-lg">{profile?.streak || 0}</span>
           </div>
           <div className="bg-surface border border-surface-light rounded-2xl p-3 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-default">
             <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1 select-none text-center">Missões<br/>Finalizadas</span>
             <span className="text-emerald-400 font-display font-bold text-lg">{profile?.totalTasksCompleted || 0}</span>
           </div>
           <div className="bg-surface border border-neon-purple/30 rounded-2xl p-3 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(150,0,255,0.1)] transition-transform hover:scale-105 cursor-default">
             <span className="text-[10px] text-neon-purple uppercase font-bold tracking-widest mb-1 select-none text-center">Poder<br/>Atual (XP)</span>
             <span className="text-white font-display font-bold text-lg">{profile?.xp || 0}</span>
           </div>
        </div>
        <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest text-right mt-2 text-neon-purple/80">✨ Constância molda a realidade.</p>
      </div>

      {/* Calendário Gráfico */}
      <div className="px-5 mb-6">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white capitalize">{calendarViewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
            <div className="flex items-center gap-2">
               <button onClick={prevMonth} className="p-2 rounded-full bg-surface-light border border-white/5 hover:bg-white/10 transition-colors">
                 <ChevronLeft size={16} className="text-white" />
               </button>
               <button onClick={nextMonth} className="p-2 rounded-full bg-surface-light border border-white/5 hover:bg-white/10 transition-colors">
                 <ChevronRight size={16} className="text-white" />
               </button>
            </div>
         </div>
         
         <div className="bg-surface border border-surface-light rounded-2xl p-4">
             <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((d, i) => (
                   <div key={i} className="text-center text-[12px] font-bold text-white uppercase tracking-widest">{d}</div>
                ))}
             </div>
             <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                {calendarDays.map((day, i) => (
                   <div key={i} className="flex justify-center items-center relative">
                      <button 
                         onClick={() => setSelectedCalendarDate(day.date)}
                         className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all focus:outline-none ${
                         day.isSelected ? 'bg-amber-500 text-black font-bold shadow-lg scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10' :
                         day.isToday && !day.isSelected ? 'bg-neon-blue text-black font-bold shadow-lg scale-110' : 
                         day.isCurrentMonth ? 'text-white/80 hover:bg-surface-light border border-transparent hover:border-white/10' : 'text-white/20 hover:bg-surface-light'
                      }`}>
                         {day.dayNumber}
                      </button>
                   </div>
                ))}
             </div>
         </div>
      </div>

      {/* Separação de Categorias - Tabs */}
      <div className="pl-5 mb-4 overflow-x-auto no-scrollbar pb-2">
         <div className="flex gap-2 min-w-max pr-5">
            <button 
              onClick={() => setActiveSection('all')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeSection === 'all' ? 'bg-white text-background shadow-lg scale-105' : 'bg-surface border border-surface-light text-text-secondary hover:text-white'}`}
            >
              Geral
            </button>
            <button 
              onClick={() => setActiveSection('priority')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeSection === 'priority' ? 'bg-neon-blue text-background shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105' : 'bg-surface border border-surface-light text-text-secondary hover:text-white'}`}
            >
              <Star size={14} className={activeSection === 'priority' ? "fill-background text-background" : ""} /> Máxima
            </button>
            <button 
              onClick={() => setActiveSection('mental')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeSection === 'mental' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(150,0,255,0.4)] scale-105' : 'bg-surface border border-surface-light text-text-secondary hover:text-white'}`}
            >
              <Brain size={14} /> Mental
            </button>
            <button 
              onClick={() => setActiveSection('physical')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeSection === 'physical' ? 'bg-amber-500 text-background shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105' : 'bg-surface border border-surface-light text-text-secondary hover:text-white'}`}
            >
              <Dumbbell size={14} /> Físico
            </button>
            <button 
              onClick={() => setActiveSection('long_term')} 
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeSection === 'long_term' ? 'bg-emerald-400 text-background shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-105' : 'bg-surface border border-surface-light text-text-secondary hover:text-white'}`}
            >
              <Target size={14} /> Longo Prazo
            </button>
         </div>
      </div>

      <main className="px-5 relative z-10 space-y-4">
        
        {/* Call to Add Form */}
        <div className="flex justify-between items-center px-1 mb-2">
           <h3 className="text-sm font-bold text-white flex items-center gap-2">
             <LayoutList size={16} className={"text-text-secondary"} /> O que temos agora?
             {activeSection === 'all' && <span className="text-xs bg-surface-light px-2 py-0.5 rounded-full text-text-secondary">{currentViewTasks.length} Totais</span>}
           </h3>
           <button onClick={() => setShowAddForm(!showAddForm)} className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-white hover:bg-white/10 transition-colors">
             <Plus size={16} className={`transition-transform duration-300 ${showAddForm ? 'rotate-45' : ''}`} />
           </button>
        </div>

        {/* Dynamic Add Form Panel */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} className="overflow-hidden mb-4">
              <form onSubmit={handleAddTask} className="bg-surface p-5 rounded-3xl border border-surface-light space-y-5 shadow-xl font-sans">
               
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer select-none">
                    <input type="radio" checked={!isLongTerm} onChange={() => setIsLongTerm(false)} className="accent-neon-blue w-4 h-4" />
                    Ação Diária
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer select-none">
                    <input type="radio" checked={isLongTerm} onChange={() => setIsLongTerm(true)} className="accent-neon-purple w-4 h-4" />
                    Longo Prazo
                  </label>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2 block">{isLongTerm ? 'Visão Dourada (Meta Maior)' : 'Tarefa/Ação'}</label>
                  <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder={isLongTerm ? "Ex: Comprar meu primeiro imóvel" : "Ex: Beber água, Ler 10 páginas"} className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors" />
                </div>

                {!isLongTerm && (
                  <div className="p-4 rounded-xl border border-surface-light bg-background/50 space-y-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded overflow-hidden border border-surface-light bg-surface group-hover:border-neon-purple transition-all">
                        <input type="checkbox" checked={isRecurringForm} onChange={(e) => setIsRecurringForm(e.target.checked)} className="absolute w-full h-full opacity-0 cursor-pointer" />
                        {isRecurringForm && <div className="absolute inset-0 bg-neon-purple flex items-center justify-center"><CheckCircle2 size={12} className="text-white"/></div>}
                      </div>
                      Todo dia (Recorrente)
                    </label>

                    <div className="w-full h-px bg-surface-light"></div>

                    <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded overflow-hidden border border-surface-light bg-surface group-hover:border-neon-blue transition-all">
                        <input type="checkbox" checked={hasTarget} onChange={(e) => setHasTarget(e.target.checked)} className="absolute w-full h-full opacity-0 cursor-pointer" />
                        {hasTarget && <div className="absolute inset-0 bg-neon-blue flex items-center justify-center"><CheckCircle2 size={12} className="text-white"/></div>}
                      </div>
                      Definir Quantidade (Ex: 2 Metros, 5 Km)
                    </label>
                    {hasTarget && (
                      <div className="flex gap-2">
                         <div className="flex-1">
                           <label className="text-[10px] text-text-secondary uppercase tracking-widest mb-1 block">Quantidade</label>
                           <input type="number" min="1" value={targetAmount} onChange={(e) => setTargetAmount(parseInt(e.target.value)||0)} placeholder="Ex: 2000" className="w-full bg-background border border-surface-light rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue" />
                         </div>
                         <div className="flex-1">
                           <label className="text-[10px] text-text-secondary uppercase tracking-widest mb-1 block">Unidade</label>
                           <input type="text" value={targetUnit} onChange={(e) => setTargetUnit(e.target.value)} placeholder="Ex: ml, min, pág" className="w-full bg-background border border-surface-light rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue" />
                         </div>
                      </div>
                    )}
                  </div>
                )}

                {isLongTerm && (
                  <div className="p-4 rounded-xl border border-surface-light bg-background/50">
                    <label className="text-xs font-bold text-white mb-2 block">Partes (Micro Passos)</label>
                    <div className="space-y-2 mb-3">
                      {subTasks.map((st, i) => (
                        <div key={i} className="flex justify-between items-center bg-surface p-2 rounded border border-surface-light">
                           <span className="text-sm text-white">{st.title}</span>
                           <button type="button" onClick={() => setSubTasks(subTasks.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500"><X size={16}/></button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={newSubTask} onChange={(e) => setNewSubTask(e.target.value)} placeholder="Ex: Juntar 5.000 R$" className="flex-1 bg-background border border-surface-light rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple" />
                      <button type="button" onClick={() => { if(newSubTask.trim()) { setSubTasks([...subTasks, {title: newSubTask.trim()}]); setNewSubTask(''); } }} className="bg-surface border border-surface-light px-3 rounded-xl hover:bg-neon-purple hover:text-white transition-colors"><PlusCircle size={20} /></button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2 block">Categoria</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['routine', 'workout', 'finance', 'goal'] as TaskCategory[]).map(cat => {
                      const cfg = getCategoryConfig(cat);
                      return (
                        <button key={cat} type="button" onClick={() => setNewTaskCategory(cat)} className={`py-2 px-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${newTaskCategory === cat ? `border-${cfg.color.replace('text-', '')}/50 ${cfg.bg} ${cfg.color}` : 'border-surface-light bg-background text-text-secondary hover:text-white'}`}>
                          {cfg.icon} {cfg.label.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button type="submit" disabled={!newTaskTitle.trim() || (hasTarget && targetAmount <= 0) || (isLongTerm && subTasks.length === 0)} className={`w-full font-bold uppercase tracking-widest text-xs py-3 rounded-xl transition-colors disabled:opacity-50 text-white ${isLongTerm ? 'bg-neon-purple hover:bg-neon-purple/80' : 'bg-neon-blue hover:bg-neon-blue/80'}`}>
                  Registrar
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {currentViewTasks.length === 0 && !showAddForm ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 bg-surface/30 border border-surface-light border-dashed rounded-[2rem] text-center">
                 <Target size={40} className="mx-auto mb-4 text-text-secondary/30" />
                 <p className="font-bold text-white mb-1">Área Limpa</p>
                 <p className="text-xs text-text-secondary max-w-[200px] mx-auto mb-6">Nenhuma tarefa encontrada neste filtro atual.</p>
               </motion.div>
            ) : (
              currentViewTasks.map(task => {
                const config = getCategoryConfig(task.category);
                
                return (
                  <motion.div key={task.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`group flex flex-col p-4 rounded-2xl border transition-all ${task.completed ? 'bg-surface/50 border-surface-light opacity-60' : 'bg-surface border-surface-light shadow-lg hover:border-white/20'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => !task.targetAmount && !task.subTasks?.length ? handleToggle(task.id, task.completed) : undefined}>
                      <div className="flex items-center gap-4 flex-1">
                        <div onClick={(e) => { e.stopPropagation(); handleToggle(task.id, task.completed); }} className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${task.completed ? 'bg-surface-light border border-white/5' : config.bg}`}>
                          {task.completed ? <CheckCircle2 size={24} className={'text-emerald-400'} /> : <div className={config.color}>{config.icon}</div>}
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${task.completed ? 'text-text-secondary/50' : config.color}`}>
                            {config.label} {task.isRecurring && '🔁'}
                          </span>
                          <span className={`text-base tracking-tight font-bold ${task.completed ? 'text-text-secondary line-through' : 'text-white'}`}>{task.title}</span>
                          {task.isLongTerm && <span className="text-[10px] text-text-secondary bg-surface-light px-2 py-0.5 rounded-full mt-1.5 inline-block opacity-70 border border-white/5 font-bold tracking-widest uppercase">Longo Prazo</span>}
                        </div>
                      </div>
                      {!task.completed && (
                        <span className={`text-[10px] font-bold px-2 py-1 bg-surface-light border rounded uppercase tracking-widest flex items-center gap-1 opacity-80 ${activeSection === 'long_term' ? 'text-neon-purple border-neon-purple/30' : 'text-neon-blue border-neon-blue/30'}`}>
                          <Zap size={10} /> {task.xpReward || 10} XP
                        </span>
                      )}
                    </div>

                    {/* Progress tracking for targets */}
                    {task.targetAmount && !task.subTasks && (
                      <div className="mt-4 pt-4 border-t border-surface-light">
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Progresso: {task.currentAmount || 0} / {task.targetAmount} {task.unit}</span>
                           <span className="text-xs font-bold text-neon-blue">{task.targetAmount > 0 ? Math.round(((task.currentAmount || 0) / task.targetAmount) * 100) : 0}%</span>
                         </div>
                         <div className="flex gap-2 items-center">
                            <div className="flex-1 h-3 bg-background rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-neon-blue transition-all" style={{ width: `${Math.min(100, Math.max(0, ((task.currentAmount || 0) / task.targetAmount) * 100))}` + "%" }} />
                            </div>
                            {!task.completed && (
                              <button onClick={() => updateTaskProgress(task.id, task.targetAmount! * 0.25)} className="w-8 h-8 flex items-center justify-center bg-neon-blue/10 text-neon-blue rounded-lg border border-neon-blue/30 text-xs font-bold hover:bg-neon-blue hover:text-white transition-colors">
                                <Plus size={16} />
                              </button>
                            )}
                         </div>
                      </div>
                    )}

                    {/* Subtasks tracking */}
                    {task.subTasks && task.subTasks.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-surface-light space-y-2">
                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mb-3">Micropassos</p>
                        {task.subTasks.map(st => (
                          <div key={st.id} onClick={() => toggleSubTask(task.id, st.id)} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${st.completed ? 'bg-surface-light border-transparent' : 'bg-background border-surface-light hover:border-neon-purple/50'}`}>
                             <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${st.completed ? 'bg-emerald-400 border-emerald-400' : 'bg-surface border-text-secondary'}`}>
                               {st.completed && <CheckCircle2 size={12} className="text-white" />}
                             </div>
                             <span className={`text-sm font-medium ${st.completed ? 'text-text-secondary line-through' : 'text-white'}`}>{st.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Botão Anti-Procrastinação - Estou Travado */}
      <div className="fixed bottom-[140px] right-5 z-40">
        <button 
          onClick={() => setShowStuckModal(true)}
          className="bg-background border border-amber-500/50 hover:bg-amber-500/20 text-amber-500 font-bold uppercase tracking-widest text-[10px] py-3 px-5 rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <AlertTriangle size={14} /> Estou Travado
        </button>
      </div>

      {/* Stuck Modal AI Response */}
      <AnimatePresence>
        {showStuckModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center p-5 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              className="bg-surface border border-surface-light w-full max-w-sm rounded-[2rem] p-6 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-[-10%] w-32 h-32 bg-neon-purple/20 rounded-full blur-[40px] pointer-events-none" />
              <Bot size={40} className="text-neon-purple mx-auto mb-4" />
              
              <h3 className="text-xl font-display font-bold text-white mb-2">Foi atingido pela inércia?</h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Eu percebi. Atrasos constantes são normais, mas precisamos reagir. O que você escolhe para destravar agora?
              </p>
              
              <div className="space-y-3">
                <button onClick={() => {
                  addTask({ title: "Focar 5 minutos apenas na maior prioridade", category: "routine", xpReward: 50, date: todayStr, isLongTerm: false, isRecurring: false });
                  setShowStuckModal(false);
                }} className="w-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-bold px-4 py-3 rounded-xl hover:bg-neon-purple hover:text-white transition-colors text-sm uppercase tracking-widest flex justify-between items-center group">
                  Regra dos 5 Minutos <Zap size={16} className="group-hover:animate-pulse" />
                </button>
                <button onClick={() => {
                  setShowStuckModal(false);
                  setShowAddForm(true);
                  setIsLongTerm(true);
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }} className="w-full bg-surface-light border border-white/5 text-white font-bold px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm uppercase tracking-widest flex justify-between items-center group">
                  Quebrar a Tarefa <LayoutList size={16} />
                </button>
                <button onClick={() => {
                  addTask({ title: "Reorganizar minhas prioridades do dia", category: "goal", xpReward: 20, date: todayStr, isLongTerm: false, isRecurring: false });
                  setShowStuckModal(false);
                }} className="w-full bg-surface border border-surface-light text-text-secondary hover:text-white font-bold px-4 py-3 rounded-xl hover:bg-surface-light transition-colors text-sm uppercase tracking-widest flex justify-between items-center group">
                  Pausar e Reorganizar <Calendar size={16} />
                </button>
              </div>
              <button onClick={() => setShowStuckModal(false)} className="mt-6 text-xs text-text-secondary hover:text-white uppercase font-bold tracking-widest p-2">
                Cancelar e Voltar ao Foco
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice / Text Quick Input Bar (Sticky at bottom before nav) */}
      <div className="fixed bottom-[84px] left-0 right-0 p-4 pointer-events-none z-30 flex justify-center">
        <div className="bg-surface/90 backdrop-blur-xl border border-surface-light p-2 rounded-2xl w-full max-w-sm flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
          <button 
            onClick={() => {
              setIsListening(!isListening);
              if (!isListening) {
                setTimeout(() => {
                  setIsListening(false);
                  setQuickInput('Fazer 30 minutos de Hiit agora');
                }, 2000);
              }
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-surface-light text-text-secondary hover:text-white hover:bg-white/10'}`}
          >
            <Mic size={18} />
          </button>
          
          <input 
            type="text" 
            placeholder={isListening ? "Escutando ação rápida..." : "Missão rápida..."} 
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleQuickAdd() }}
            className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-text-secondary"
          />
          
          <button 
            onClick={handleQuickAdd}
            disabled={!quickInput.trim()}
            className="w-10 h-10 rounded-xl bg-neon-blue flex items-center justify-center text-background hover:bg-neon-blue/80 transition-all disabled:opacity-30 disabled:bg-surface-light shrink-0"
          >
            <Plus size={20} className={quickInput.trim() ? 'scale-110' : ''} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
