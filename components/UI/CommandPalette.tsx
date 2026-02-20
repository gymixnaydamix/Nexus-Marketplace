
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../AppContext';
import { NAVIGATION } from '../../constants';
import { World } from '../../types';

export const CommandPalette: React.FC = () => {
  const { setActiveSectionById, setActiveWorld, currentUser, system } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    ...NAVIGATION.map(s => ({ id: `nav-${s.id}`, label: `Navigate: ${s.label}`, action: () => setActiveSectionById(s.id), category: 'Navigation', icon: '🚀' })),
    ...Object.values(World).map(w => ({ id: `world-${w}`, label: `Switch World: ${w}`, action: () => setActiveWorld(w), category: 'World Link', icon: '🌍' })),
    { id: 'act-lockdown', label: 'Trigger Global Lockdown', action: () => { if(confirm('Initiate Protocol Zero?')) console.log('Locking...'); }, category: 'System', icon: '🚨' },
    { id: 'act-reset', label: 'Factory Reset Kernel', action: () => { if(confirm('Wipe all local nodes?')) window.location.reload(); }, category: 'System', icon: '🧹' },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-[#050508]/80 backdrop-blur-xl" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-2xl bg-[#0c0c14] border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
           <span className="text-xl grayscale opacity-50">🔍</span>
           <input 
             ref={inputRef}
             value={query}
             onChange={e => setQuery(e.target.value)}
             placeholder="Search manual protocols, worlds, and navigational nodes..." 
             className="flex-1 bg-transparent border-none outline-none text-white font-medium text-lg placeholder:text-white/20"
           />
           <div className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-mono text-white/40 uppercase font-black">ESC to Exit</div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto no-scrollbar p-3">
          {actions.length > 0 ? (
            <div className="space-y-1">
              {actions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleAction(item.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    selectedIndex === idx ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.01]' : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                     <span className="text-xl">{item.icon}</span>
                     <div className="text-left">
                        <p className="text-[10px] font-mono uppercase tracking-widest font-black opacity-40">{item.category}</p>
                        <p className="font-bold uppercase tracking-tight">{item.label}</p>
                     </div>
                  </div>
                  {selectedIndex === idx && <span className="text-[10px] font-mono font-black opacity-60">RETURN ↵</span>}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 opacity-30">
               <div className="text-4xl">📡</div>
               <p className="text-[10px] font-mono uppercase tracking-[0.4em] font-black text-white">No nodes found in local cluster</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/40 border-t border-white/5 flex justify-between items-center px-8">
           <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${system.incidentMode ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <span className="text-[9px] font-mono font-black text-white/30 uppercase tracking-widest">
                Kernel: {system.incidentMode ? 'Lockdown' : 'Nominal'}
              </span>
           </div>
           <p className="text-[9px] font-mono font-black text-white/20 uppercase tracking-[0.2em]">Authorized: {currentUser.name}</p>
        </div>
      </div>
    </div>
  );
};
