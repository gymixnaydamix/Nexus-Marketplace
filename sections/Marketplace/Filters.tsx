
import React, { useState } from 'react';

export const FilterBuilder: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState([
    'Price Relativity', 
    'Condition Score', 
    'Sector Verification', 
    'SLA Response'
  ]);

  const removeFilter = (val: string) => {
    setActiveFilters(prev => prev.filter(f => f !== val));
  };

  const addFilter = () => {
    const name = prompt("Enter manual discovery variable name:");
    if (name) setActiveFilters(prev => [...prev, name]);
  };

  return (
    <div className="space-y-10 text-zinc-900 animate-in fade-in duration-700 pb-20">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Apply Global Defaults</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-zinc-50 border border-zinc-100 p-8 md:p-12 rounded-[3.5rem] space-y-8 shadow-inner">
           <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black mb-4">Active Search Vectors</h3>
           <div className="space-y-3">
              {activeFilters.map(f => (
                <div key={f} className="bg-white p-5 md:p-6 rounded-[1.8rem] border border-zinc-200 flex items-center justify-between group shadow-sm hover:border-indigo-200 transition-all">
                   <span className="font-black text-zinc-800 uppercase text-xs md:text-sm tracking-tight">{f}</span>
                   <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-xl bg-zinc-50 text-zinc-300 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-colors active:scale-90" onClick={() => removeFilter(f)}>
                        ×
                      </button>
                   </div>
                </div>
              ))}
           </div>
           <button 
             onClick={addFilter}
             className="w-full py-5 border-2 border-dashed border-zinc-200 rounded-[2.5rem] font-mono text-[11px] text-zinc-300 uppercase tracking-[0.3em] font-black hover:border-zinc-400 hover:text-zinc-600 transition-all active:bg-white"
           >
             Initialize Vector
           </button>
        </div>

        <div className="space-y-8">
           <div className="bg-indigo-600 text-white p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 transition-all group-hover:scale-110"></div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-6 font-black">Cluster Taxonomy Load</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">{activeFilters.length * 12 + 4} Unique Logic Nodes</h2>
              <p className="text-white/40 text-[10px] md:text-sm mt-6 leading-relaxed font-bold uppercase tracking-widest italic">Manual Verification Efficiency Index: 94.2%</p>
           </div>
        </div>
      </div>
    </div>
  );
};
