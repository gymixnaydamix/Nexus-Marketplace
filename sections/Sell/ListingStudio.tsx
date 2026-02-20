
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../AppContext';
import { WORLD_CONFIG } from '../../constants';
import { ModernDropdown } from '../../components/UI/ModernDropdown';

export const SellCreate: React.FC = () => {
  const { createProduct, activeWorld } = useApp();
  const theme = WORLD_CONFIG[activeWorld];
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [logs, setLogs] = useState<string[]>(['CORE: Environment initialized for ' + activeWorld]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [checklist, setChecklist] = useState({
    visual: false,
    specs: false,
    shipping: false,
    pricing: false
  });

  const [form, setForm] = useState({ 
    title: '', 
    price: 0, 
    stock: 1, 
    category: theme.categories[0], 
    description: '',
    units: 'Units',
    currency: 'USD',
    thumbnail: '',
    condition: 'New Epoch',
    region: 'North America',
    deliveryMethod: 'Sky-Drone'
  });

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-15));
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    addLog(`VERIFICATION: ${(key as string).toUpperCase()} Check Passed`);
  };

  const handleManualDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(checklist).every(v => v)) {
      addLog("ERROR: Manual Scrutiny Incomplete");
      alert("Please complete all verification steps.");
      return;
    }

    setIsDeploying(true);
    addLog("SYNC: Finalizing listing...");
    await new Promise(r => setTimeout(r, 1000));
    
    createProduct(form);
    setIsDeploying(false);
    setIsSuccess(true);
    addLog("SUCCESS: Listing live.");
  };

  const score = Object.values(checklist).filter(v => v).length * 25;

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in-95 duration-1000">
        <div className="w-40 h-40 rounded-[4rem] bg-emerald-500 text-white flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse">✓</div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter uppercase">Listing Created</h2>
          <p className="text-zinc-400 font-bold max-w-sm mx-auto uppercase tracking-widest text-sm">Your product is now visible in the marketplace.</p>
        </div>
        <button 
          onClick={() => { setIsSuccess(false); setChecklist({visual: false, specs: false, shipping: false, pricing: false}); }}
          className="px-12 py-5 bg-zinc-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all"
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 text-zinc-900 pb-40 animate-in fade-in duration-1000">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-100 pb-8">
        <div>
           <h1 className="text-4xl font-black text-zinc-900 tracking-tight leading-none uppercase">New Listing</h1>
           <p className="text-zinc-400 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual entry and quality verification</p>
        </div>
        <div className="w-full md:w-80 space-y-4">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-widest">Quality score</span>
              <span className={`text-2xl font-black tabular-nums ${score === 100 ? 'text-emerald-500' : 'text-zinc-900'}`}>{score}%</span>
           </div>
           <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${score === 100 ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-zinc-900'}`} style={{ width: `${score}%` }}></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <form onSubmit={handleManualDeploy} className="lg:col-span-8 space-y-12">
          <div className="space-y-8">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-black flex items-center gap-4">
              <span className="w-8 h-[1px] bg-zinc-100"></span> 01 Visuals <span className="flex-1 h-[1px] bg-zinc-100"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
               <div className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[3.5rem] overflow-hidden group relative cursor-pointer shadow-inner">
                  {form.thumbnail ? (
                    <img src={form.thumbnail} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-4">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl">🖼️</div>
                       <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Upload Main Image</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button type="button" onClick={() => setForm({...form, thumbnail: `https://picsum.photos/seed/${Math.random()}/800/800`})} className="px-10 py-4 bg-white text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">Mock Image</button>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black px-1">Product Title</label>
                    <input 
                      required
                      value={form.title}
                      onChange={e => setForm({...form, title: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-[2rem] p-6 text-base font-black text-zinc-900 focus:outline-none focus:ring-[12px] focus:ring-zinc-100 transition-all shadow-inner" 
                      placeholder="Enter product name..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black px-1">Description</label>
                    <textarea 
                      rows={5}
                      value={form.description}
                      onChange={e => setForm({...form, description: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-[2rem] p-6 text-sm font-medium text-zinc-700 focus:outline-none focus:ring-[12px] focus:ring-zinc-100 transition-all shadow-inner resize-none" 
                      placeholder="Describe the item details..."
                    />
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-black flex items-center gap-4">
               <span className="w-8 h-[1px] bg-zinc-100"></span> 02 Pricing & Stock <span className="flex-1 h-[1px] bg-zinc-100"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-zinc-50/50 p-8 rounded-[3rem] border border-zinc-100 space-y-6">
                  <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                     <span className="text-xl">💰</span>
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Price</h4>
                  </div>
                  <div className="flex gap-4">
                     <input type="text" value={form.currency} onChange={e => setForm({...form, currency: e.target.value})} className="w-20 bg-white border border-zinc-100 rounded-xl p-4 text-[10px] font-mono font-black text-center text-zinc-400 uppercase shadow-sm" />
                     <input type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="flex-1 bg-white border border-zinc-100 rounded-xl p-4 text-base font-black text-zinc-900 shadow-sm outline-none" />
                  </div>
               </div>
               <div className="bg-zinc-50/50 p-8 rounded-[3rem] border border-zinc-100 space-y-6">
                  <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                     <span className="text-xl">📊</span>
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Inventory</h4>
                  </div>
                  <div className="flex gap-4">
                     <input type="number" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} className="flex-1 bg-white border border-zinc-100 rounded-xl p-4 text-base font-black text-zinc-900 shadow-sm outline-none" />
                     <input type="text" value={form.units} onChange={e => setForm({...form, units: e.target.value})} className="w-28 bg-white border border-zinc-100 rounded-xl p-4 text-[10px] font-mono font-black text-center text-zinc-400 uppercase shadow-sm" />
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-10">
             <button 
               type="submit"
               disabled={isDeploying}
               className={`w-full py-8 rounded-[3rem] font-black text-sm uppercase tracking-[0.6em] shadow-2xl transition-all duration-700 flex items-center justify-center gap-8 ${
                 score === 100 
                 ? 'bg-zinc-900 text-white hover:bg-black active:scale-[0.98]' 
                 : 'bg-zinc-100 text-zinc-300 cursor-not-allowed border border-zinc-200'
               }`}
             >
               {isDeploying ? (
                 <>
                   <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                   <span>Syncing...</span>
                 </>
               ) : (
                 <span>Finalize Listing</span>
               )}
             </button>
          </div>
        </form>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm space-y-8 sticky top-8">
              <div>
                <h3 className="text-xl font-black text-zinc-900 tracking-tight uppercase">Verification</h3>
              </div>

              <div className="space-y-3">
                 {[
                   { key: 'visual', label: 'Image Check', icon: '📸' },
                   { key: 'specs', label: 'Spec Check', icon: '📝' },
                   { key: 'shipping', label: 'Shipping Check', icon: '🚚' },
                   { key: 'pricing', label: 'Price Check', icon: '💵' },
                 ].map(item => (
                   <button 
                     key={item.key}
                     type="button"
                     onClick={() => toggleCheck(item.key as any)}
                     className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] border transition-all duration-500 group ${
                       checklist[item.key as keyof typeof checklist] 
                       ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                       : 'bg-zinc-50 border-zinc-50 text-zinc-400 hover:border-zinc-200'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                        <span className={`text-lg transition-transform group-hover:scale-110 ${checklist[item.key as keyof typeof checklist] ? '' : 'grayscale opacity-40'}`}>{item.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                     </div>
                   </button>
                 ))}
              </div>

              <div className="space-y-4">
                 <p className="text-[9px] font-mono font-black text-zinc-300 uppercase tracking-[0.3em]">Processing Logs</p>
                 <div ref={terminalRef} className="h-48 bg-zinc-900 rounded-3xl p-6 font-mono text-[9px] text-zinc-500 overflow-y-auto no-scrollbar shadow-inner relative">
                    <div className="space-y-2">
                       {logs.map((log, i) => (
                         <div key={i}><span className="text-zinc-600">[{i}]</span> {log}</div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};
