
import React from 'react';

export const StoreBuilder: React.FC = () => {
  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="flex gap-3">
           <button className="px-6 py-3 border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all">Preview Hub</button>
           <button className="px-10 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Deploy Manifest</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-3 space-y-8">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black px-2">Element Registry</h3>
            <div className="grid grid-cols-1 gap-3">
               {['Hero Terminal', 'Grid Module', 'Policy Stack', 'Review Matrix', 'Trust Badges'].map(block => (
                 <div key={block} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm cursor-grab hover:border-indigo-200 transition-all flex items-center gap-5 group active:cursor-grabbing">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">🧩</span>
                    <span className="text-[11px] font-black text-zinc-800 uppercase tracking-tight">{block}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-9 space-y-8">
            <div className="min-h-[700px] border-4 border-dashed border-zinc-100 rounded-[4rem] p-12 space-y-8 bg-zinc-50 shadow-inner flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-10">
                  <span className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl">Drop Element to Link</span>
               </div>
               <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-zinc-100 flex items-center justify-center shadow-xl mb-6 scale-110">
                  <span className="text-4xl">🏗️</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-800 uppercase tracking-tighter">Draft Environment Empty</h3>
                  <p className="text-zinc-400 font-bold max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">Assemble your storefront manifest by dragging modules from the primary registry matrix.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
