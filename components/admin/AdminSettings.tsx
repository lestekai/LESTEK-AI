import { Settings, Save, Server, Globe, Power } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { logAdminAction } from '@/lib/admin';

export default function AdminSettings() {
  const { profile } = useAppStore();
  const [maintenance, setMaintenance] = useState(false);
  const [version, setVersion] = useState('1.5.0-beta');
  const [features, setFeatures] = useState({
    ai_coach: true,
    social_feed: false,
    store: true
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = localStorage.getItem('evolux_global_settings');
    if (loaded) {
      try {
        const parsed = JSON.parse(loaded);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaintenance(parsed.maintenance ?? false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVersion(parsed.version ?? '1.5.0-beta');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (parsed.features) setFeatures(parsed.features);
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('evolux_global_settings', JSON.stringify({
      maintenance,
      version,
      features
    }));
    if (profile) logAdminAction(profile.id, 'UPDATE_SETTINGS', 'global', { maintenance, version, features });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Server className="text-emerald-500" size={24} />
        <h2 className="text-xl font-bold font-display">Configurações do App</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-light rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
            <Globe size={14}/> Variáveis Globais
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary block mb-2">Versão do App</label>
              <input 
                type="text" 
                value={version} 
                onChange={e => setVersion(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-blue font-mono"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-red-500">Modo Manutenção</h4>
                <p className="text-xs text-text-secondary">Bloqueia acesso a todos exceto admins.</p>
              </div>
              <button 
                onClick={() => setMaintenance(!maintenance)}
                className={`w-12 h-6 rounded-full relative transition-colors ${maintenance ? 'bg-red-500' : 'bg-surface-light'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${maintenance ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-surface-light rounded-2xl p-6 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-2">
            <Power size={14}/> Feature Flags (Módulos)
          </h3>
          
          <div className="space-y-3 flex-1">
            {Object.entries(features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
                <span className="text-sm font-bold text-white capitalize">{key.replace('_', ' ')}</span>
                <button 
                  onClick={() => setFeatures({...features, [key as keyof typeof features]: !value})}
                  className={`w-10 h-5 rounded-full relative transition-colors ${value ? 'bg-emerald-500' : 'bg-surface-light'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${value ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
          
          <button onClick={handleSave} className="mt-6 w-full py-3 bg-neon-blue text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105">
            {saved ? <span className="text-emerald-900">Configurações Salvas!</span> : <><Save size={18} /> Salvar Configurações</>}
          </button>
        </div>
      </div>
    </div>
  );
}
