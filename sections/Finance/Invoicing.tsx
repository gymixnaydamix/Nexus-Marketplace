
import React from 'react';

export const FinInvoiceBuilder: React.FC = () => {
  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="flex gap-3">
           <button className="px-6 py-3 border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all">Batch Sequence Start</button>
           <button className="px-10 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Authorize Minting</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="bg-white border border-zinc-100 rounded-[3.5rem] p-10 md:p-14 shadow-sm space-y-10">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Invoicing Protocol Config</h3>
            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Tax Jurisdiction Matrix</label>
                  <select className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-sm font-black uppercase tracking-tight focus:ring-[12px] focus:ring-zinc-100 outline-none appearance-none cursor-pointer shadow-inner">
                     <option>Nexus Neutral Zone (0% VAT)</option>
                     <option>North American Federation (Tier 2)</option>
                     <option>European Regulatory Bloc (Tier 1)</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Sequence Prefix</label>
                  <input type="text" defaultValue="NXS-2035-INV-" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-sm font-mono font-black shadow-inner focus:outline-none" />
               </div>
               <div className="pt-8 border-t border-zinc-50 flex items-center justify-between">
                  <span className="text-[11px] font-black text-zinc-800 uppercase tracking-widest">Legal Header Injection</span>
                  <div className="w-14 h-7 bg-zinc-900 rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-zinc-50 border border-zinc-100 rounded-[4rem] p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-8 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-zinc-900/[0.01] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
            <div className="w-28 h-36 bg-white rounded-2xl border-4 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col p-5 space-y-4 relative z-10 group-hover:scale-105 transition-transform">
               <div className="w-full h-2.5 bg-zinc-900 rounded-full"></div>
               <div className="w-2/3 h-1.5 bg-zinc-100 rounded-full"></div>
               <div className="w-full h-1.5 bg-zinc-100 rounded-full"></div>
               <div className="flex-1"></div>
               <div className="w-1/2 h-2.5 bg-zinc-900 self-end rounded-full"></div>
            </div>
            <div className="relative z-10 space-y-4">
               <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">Visual Render Offline</h3>
               <p className="text-zinc-400 font-bold max-w-xs mx-auto uppercase tracking-widest text-[9px] leading-relaxed italic">Document mapping requires manual font cluster loading (v4.0.1 Protocol).</p>
            </div>
         </div>
      </div>
    </div>
  );
};
