
import React from 'react';

export const InvWarehouses: React.FC = () => {
  const nodes = [
    { id: 'WH-NE-01', region: 'North America', load: 82, status: 'Active', color: '#007AFF' },
    { id: 'WH-EU-05', region: 'European Union', load: 45, status: 'Maintenance', color: '#FF3B30' },
    { id: 'WH-AS-09', region: 'Southeast Asia', load: 94, status: 'Critical Load', color: '#34C759' },
  ];

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Scan Global Topology</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nodes.map(node => (
          <div key={node.id} className="bg-white border border-zinc-100 p-10 rounded-[3.5rem] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
             <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] -mr-12 -mt-12 rounded-full" style={{ backgroundColor: node.color }}></div>
             <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-[1.8rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">📦</div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  node.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {node.status}
                </span>
             </div>
             <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase">{node.id}</h3>
             <p className="text-[11px] font-black text-zinc-300 uppercase tracking-widest mt-1">{node.region} Sector</p>
             
             <div className="mt-10 space-y-3">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 font-black uppercase tracking-[0.2em]">
                   <span>Storage Load</span>
                   <span className="text-zinc-900">{node.load}%</span>
                </div>
                <div className="h-3 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100 p-0.5">
                   <div className="h-full bg-zinc-900 rounded-full transition-all duration-1000" style={{ width: `${node.load}%` }}></div>
                </div>
             </div>
             
             <button className="w-full mt-12 py-4 border-2 border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-900 hover:border-zinc-300 transition-all active:scale-95">
                Audit Local node
             </button>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
         <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex-1 space-y-6 relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
               <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black text-indigo-400">Logistics Protocol v4.2</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Transfer Matrix</h3>
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xl">Initiate manual stock redistribution between nodes to balance network load and decrease delivery latency.</p>
         </div>
         <button className="relative z-10 px-14 py-6 bg-white text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Start Protocol</button>
      </div>
    </div>
  );
};
