import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(collection(db, 'notifications'), where('user_id', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data) {
          const sorted = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setNotifications(sorted.slice(0, 10));
        }
      } catch (e) {
        console.warn("Global Notifications error or permission error:", e);
        setNotifications([]);
      }
    };
    
    // Auth observer to ensure we have the user before fetching
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchNotifs();
    });
    
    return () => unsubscribe();
  }, []);

  const hasUnread = notifications.length > 0;

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-surface-light border border-text-primary/10 flex items-center justify-center hover:bg-text-primary/5 transition-colors relative"
      >
        <Bell size={18} className="text-text-secondary" />
        {hasUnread && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -5 }}
              className="absolute top-12 right-0 w-80 bg-surface/95 backdrop-blur-xl border border-text-primary/10 rounded-2xl z-50 shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            >
              <div className="p-4 border-b border-text-primary/10 flex items-center justify-between bg-black/20">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Bell size={16} className="text-neon-blue"/>
                  Central de Avisos
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary"><X size={16}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-text-secondary text-center py-6">Nenhum aviso no momento.</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="p-3 mb-2 rounded-xl bg-background border border-text-primary/5 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue" />
                      <h4 className="text-sm font-bold text-text-primary mb-1 pl-2">{n.title}</h4>
                      <p className="text-xs text-text-secondary pl-2 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
