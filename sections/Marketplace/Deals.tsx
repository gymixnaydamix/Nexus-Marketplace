
import React from 'react';
import { useApp } from '../../AppContext';

export const MarketDeals: React.FC = () => {
  const { products, activeWorld } = useApp();
  const deals = products.filter(p => p.world === activeWorld).slice(0, 3);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-zinc-900 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="bg-purple-600 text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl shadow-purple-500/20">
           <div className="text-right">
             <p className="text-[8px] font-mono uppercase tracking-widest opacity-60">Next Epoch Sync</p>
             <p className="text-sm md:text-lg font-black font-mono">04:22:59</p>
           </div>
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
             <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((p) => (
          <div key={p.id} className="bg-white border border-zinc-100 rounded-[2.8rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full active:scale-[0.98]">
            <div className="h-56 relative overflow-hidden">
              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute top-6 left-6">
                 <span className="px-4 py-1.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Protocol -40%</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-baseline gap-1 text-white">
                <span className="text-sm font-black font-mono opacity-40">$</span>
                <p className="text-3xl font-black font-mono tabular-nums">${(p.price * 0.6).toLocaleString()}</p>
              </div>
            </div>
            <div className="p-7 space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-zinc-900 text-lg md:text-xl line-clamp-2 leading-tight uppercase tracking-tighter">{p.title}</h3>
                <div className="flex justify-between items-center mt-4">
                   <p className="text-[10px] font-mono text-zinc-300 font-black uppercase">Stock: {p.stock} Units</p>
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[10px] font-black uppercase text-zinc-400">SLA Guaranteed</span>
                   </div>
                </div>
              </div>
              <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">Authorize Acquisition</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
