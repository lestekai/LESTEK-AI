'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAppStore } from '@/lib/store';
import { Shield, Loader2, ArrowLeft } from 'lucide-react';
import { ADMIN_TABS } from '@/components/admin/AdminConfig';

// Import components
import AdminOverview from '@/components/admin/AdminOverview';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminFeedbacks from '@/components/admin/AdminFeedbacks';
import AdminDatabase from '@/components/admin/AdminDatabase';
import AdminPlans from '@/components/admin/AdminPlans';
import AdminAI from '@/components/admin/AdminAI';
import AdminNotifications from '@/components/admin/AdminNotifications';
import AdminLogs from '@/components/admin/AdminLogs';
import AdminSettings from '@/components/admin/AdminSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const docSnap = await getDoc(doc(db, 'profiles', user.uid));
        const data = docSnap.exists() ? docSnap.data() : null;
        
        if (user.email === 'lestek.sup@gmail.com' || (data?.role === 'admin')) {
          setIsAdmin(true);
          setLoading(false);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-text-primary">
        <Loader2 className="animate-spin text-neon-blue mb-4" size={32} />
        <p className="text-text-secondary uppercase tracking-widest text-xs">Verificando Credenciais...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminOverview />;
      case 'users': return <AdminUsers />;
      case 'plans': return <AdminPlans />;
      case 'feedback': return <AdminFeedbacks />;
      case 'database': return <AdminDatabase />;
      case 'ai': return <AdminAI />;
      case 'notifications': return <AdminNotifications />;
      case 'logs': return <AdminLogs />;
      case 'settings': return <AdminSettings />;
      default: return (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-text-primary/10 rounded-2xl">
          <p className="text-text-secondary">Módulo &quot;{activeTab}&quot; em desenvolvimento.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-surface-light flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-surface-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" size={24} />
            <h1 className="text-lg font-black font-display tracking-tight text-text-primary leading-none">EVOLUX<br/><span className="text-[10px] text-neon-blue tracking-widest font-normal uppercase">Command</span></h1>
          </div>
          <button onClick={() => navigate('/dashboard')} className="md:hidden p-2 text-text-secondary hover:text-text-primary">
            <ArrowLeft size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {ADMIN_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20' 
                    : 'text-text-secondary hover:bg-text-primary/5 hover:text-text-primary border border-transparent'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-neon-blue' : 'text-text-secondary'} />
                {tab.label}
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-surface-light">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Voltar ao App
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
