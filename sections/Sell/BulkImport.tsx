
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const SellBulk: React.FC = () => {
  const { createProduct } = useApp();
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));

  const startImport = async () => {
    setIsImporting(true);
    addLog("START: Importing file...");
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i);
      if (i === 20) addLog("PARSE: Reading rows...");
      if (i === 40) addLog("VALIDATE: Checking data...");
      if (i === 60) addLog("PROCESS: Creating listings...");
      if (i === 80) addLog("SYNC: Finalizing...");
      await new Promise(r => setTimeout(r, 600));
    }
    
    await createProduct({ 
      title: 'Bulk Item Sample', 
      price: 150, 
      category: 'General', 
      stock: 100 
    });

    addLog("DONE: All items imported.");
    setIsImporting(false);
    setTimeout(() => setProgress(0), 2000);
  };

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight leading-none uppercase">Bulk Import</h1>
          <p className="text-zinc-500 font-medium mt-2 uppercase text-[10px] tracking-widest italic">Upload multiple listings at once</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {!isImporting ? (
              <div 
                onClick={startImport}
                className="border-4 border-dashed border-zinc-100 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-6 hover:bg-zinc-50 transition-all cursor-pointer group active:scale-[0.98]"
              >
                 <div className="w-20 h-20 rounded-[2rem] bg-zinc-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">📄</div>
                 <div>
                    <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Drop CSV File</h3>
                    <p className="text-zinc-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Max 10k rows per file</p>
                 </div>
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full translate-y-1/2"></div>
                 <div className="relative w-32 h-32">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                      <circle cx="64" cy="64" r="60" stroke="#6366f1" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * progress) / 100} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white font-mono">{progress}%</div>
                 </div>
                 <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">Syncing Database...</p>
              </div>
            )}

            <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm">
               <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-8">Import Progress</h3>
               <div className="space-y-3">
                  {log.length > 0 ? log.map((l, i) => (
                    <div key={i} className="font-mono text-[10px] text-zinc-500 border-b border-zinc-50 pb-2">{l}</div>
                  )) : <div className="text-zinc-300 font-mono text-[10px] text-center py-4">Awaiting file...</div>}
               </div>
            </div>
         </div>

         <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 space-y-8 flex flex-col shadow-inner">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Import Options</h3>
            <div className="space-y-6 flex-1">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Duplicates</label>
                  <select className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-xs font-black uppercase shadow-sm outline-none">
                     <option>Manual Review</option>
                     <option>Overwrite</option>
                     <option>Skip</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Field Status</label>
                  <div className="space-y-2">
                     {['Title', 'Price', 'Stock'].map(f => (
                       <div key={f} className="flex justify-between items-center px-4 py-3 bg-white border border-zinc-100 rounded-xl shadow-sm">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">{f}</span>
                          <span className="text-[9px] font-black text-emerald-500 uppercase">Mapped</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            <button 
              onClick={startImport}
              disabled={isImporting}
              className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              Start Import
            </button>
         </div>
      </div>
    </div>
  );
};
