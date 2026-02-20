
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const CollectionsCurated: React.FC = () => {
  const { products, activeWorld } = useApp();
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const worldProducts = products.filter(p => p.world === activeWorld);

  const collections = [
    { id: 'col-1', title: 'Nexus Pro Essentials', count: 12, theme: 'Modernist', icon: '✨' },
    { id: 'col-2', title: 'Protocol High-Value', count: 4, theme: 'Enterprise', icon: '💎' },
    { id: 'col-3', title: 'Legacy Archives', count: 45, theme: 'Classical', icon: '🏛️' },
  ];

  if (isBuilderMode) {
    return (
      <div className="space-y-12 animate-in zoom-in-95 duration-700 pb-40">
        <div className="flex items-center gap-6 mb-12">
          <button onClick={() => setIsBuilderMode(false)} className="w-14 h-14 rounded-2xl bg-zinc-50 border-2 border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-all">←</button>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter">Collection Architect</h1>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black mt-1">Manual Asset Mapping Protocol</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4 bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm flex flex-col space-y-8 overflow-hidden max-h-[600px]">
              <h3 className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest font-black">Sector Asset Pool</h3>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                 {worldProducts.map(p => (
                   <div key={p.id} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-between group cursor-grab active:cursor-grabbing">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200">
                            <img src={p.thumbnail} className="w-full h-full object-cover" />
                         </div>
                         <span className="text-xs font-black text-zinc-800 uppercase tracking-tight">{p.title}</span>
                      </div>
                      <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">⠿</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-8 bg-zinc-50 border-4 border-dashed border-zinc-200 rounded-[4rem] p-12 flex flex-col items-center justify-center text-center space-y-8 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] z-10">
                 <span className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Drop Assets to Link Matrix</span>
              </div>
              <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-zinc-100 flex items-center justify-center text-4xl shadow-xl scale-110">🏗️</div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-zinc-800 uppercase tracking-tighter">Draft Canvas Empty</h3>
                <p className="text-zinc-400 font-bold max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">Assemble your curated landing manifest by linking world-specific assets into a high-intent discovery grid.</p>
              </div>
           </div>
        </div>

        <div className="fixed bottom-10 right-10 z-[300]">
           <button onClick={() => setIsBuilderMode(false)} className="px-14 py-6 bg-emerald-500 text-white rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-[0_30px_60px_-10px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all">Commit Manifest</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Grouping Matrix</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3 italic">Manual architectural clustering for {activeWorld}.</p>
        </div>
        <button 
          onClick={() => setIsBuilderMode(true)}
          className="w-full md:w-auto px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
        >
          Architect New Cluster
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {collections.map(c => (
          <div key={c.id} className="bg-white border border-zinc-100 p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all space-y-10 flex flex-col group active:scale-[0.98]">
             <div className="flex justify-between items-start">
                <div className="w-18 h-18 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">{c.icon}</div>
                <div className="text-right">
                   <p className="text-[10px] font-mono text-zinc-300 font-black uppercase tracking-widest">{c.theme}</p>
                   <p className="text-lg font-black text-zinc-900 tabular-nums mt-1">{c.count} Assets</p>
                </div>
             </div>
             <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight leading-none">{c.title}</h3>
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest italic mt-2">Active Discovery Node Linked</p>
             </div>
             <div className="pt-8 border-t border-zinc-50 flex gap-3">
                <button className="flex-1 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Inspect</button>
                <button onClick={() => setIsBuilderMode(true)} className="px-5 py-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:text-zinc-900 hover:bg-zinc-100 transition-all text-xs">✎</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
