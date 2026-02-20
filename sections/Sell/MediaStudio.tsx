
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

interface MediaFrame {
  id: string;
  url: string;
  index: number;
}

export const MediaStudio: React.FC = () => {
  const { products, activeWorld } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [frames, setFrames] = useState<MediaFrame[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const product = worldProducts.find(p => p.id === selectedProductId);

  const handleManualUpload = () => {
    setIsUploading(true);
    // Mimic manual processing of multiple frames
    setTimeout(() => {
      const newFrames: MediaFrame[] = Array.from({ length: 12 }).map((_, i) => ({
        id: `f-${Date.now()}-${i}`,
        url: product?.thumbnail || `https://picsum.photos/seed/${Math.random()}/800/800`,
        index: i + 1
      }));
      setFrames(newFrames);
      setIsUploading(false);
    }, 1500);
  };

  const removeFrame = (id: string) => {
    setFrames(prev => prev.filter(f => f.id !== id).map((f, i) => ({ ...f, index: i + 1 })));
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in slide-in-from-bottom-8 duration-500 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none uppercase">Media Studio</h1>
          <p className="text-zinc-500 mt-2 text-[10px] md:text-sm font-bold uppercase tracking-widest italic">Manual High-Fidelity Asset Rendering</p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={handleManualUpload}
            disabled={!selectedProductId || isUploading}
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black active:scale-95 transition-all disabled:opacity-30"
           >
             {isUploading ? 'Processing Frames...' : 'Batch Upload 360° Frames'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Selection Sidebar */}
        <div className="lg:col-span-3 space-y-8">
           <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold px-2">Asset Cluster</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  {worldProducts.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => { setSelectedProductId(p.id); setFrames([]); setCurrentFrame(1); }}
                      className={`w-full text-left p-4 rounded-[1.8rem] border transition-all flex items-center gap-4 ${
                        selectedProductId === p.id ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-100 hover:border-zinc-200'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-50 shrink-0 border border-white/10">
                        <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-black truncate uppercase ${selectedProductId === p.id ? 'text-white' : 'text-zinc-900'}`}>{p.title}</p>
                        <p className="text-[8px] font-mono opacity-40 uppercase font-bold">{p.id}</p>
                      </div>
                    </button>
                  ))}
              </div>
           </div>

           {frames.length > 0 && (
             <div className="space-y-4 animate-in fade-in duration-500">
                <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold px-2">Sequence Ledger</h3>
                <div className="grid grid-cols-3 gap-2">
                   {frames.map(f => (
                     <div key={f.id} className="relative aspect-square rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200 group">
                        <img src={f.url} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <span className="text-[10px] font-mono font-black text-white drop-shadow-md">{f.index}</span>
                        </div>
                        <button 
                          onClick={() => removeFrame(f.id)}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* Studio Canvas */}
        <div className="lg:col-span-9 space-y-10">
          {product ? (
            <div className="space-y-8">
               <div className="bg-zinc-50 border border-zinc-100 rounded-[4rem] p-8 md:p-14 relative shadow-inner group overflow-hidden">
                  <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
                     <span className="px-4 py-1.5 bg-black/90 text-white rounded-xl text-[9px] font-mono font-black uppercase tracking-widest shadow-xl border border-white/10">360° Rendering Matrix</span>
                     <span className="px-4 py-1.5 bg-white border border-zinc-200 rounded-xl text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest shadow-sm">
                        Node Index: {frames.length > 0 ? `${currentFrame} / ${frames.length}` : '0 / 0'}
                     </span>
                  </div>
                  
                  <div className="aspect-[16/9] md:aspect-video relative overflow-hidden rounded-[3rem] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-white">
                     {frames.length > 0 ? (
                       <img 
                        src={frames[currentFrame - 1]?.url} 
                        alt="" 
                        className="w-full h-full object-cover grayscale brightness-110" 
                        style={{ transform: `rotate(${(currentFrame - 1) * (360 / frames.length)}deg) scale(1.2)` }}
                       />
                     ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                          <div className="text-6xl">🎞️</div>
                          <p className="font-black text-xs uppercase tracking-widest">Awaiting Frame Deployment</p>
                       </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/5 to-transparent pointer-events-none"></div>
                  </div>

                  <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
                     <div className="flex-1 w-full space-y-3">
                        <div className="flex justify-between px-1">
                           <span className="text-[9px] font-black uppercase text-zinc-300">Scrub Topology</span>
                           <span className="text-[9px] font-black uppercase text-zinc-900">{((currentFrame / (frames.length || 1)) * 100).toFixed(0)}% Pivot</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max={frames.length || 1} 
                          value={currentFrame} 
                          disabled={frames.length === 0}
                          onChange={(e) => setCurrentFrame(parseInt(e.target.value))}
                          className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-zinc-900 disabled:opacity-20"
                        />
                     </div>
                     <div className="flex gap-4">
                        <button className="w-16 h-16 rounded-[1.5rem] bg-white border border-zinc-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-90 group">
                           <span className="text-xl group-hover:scale-110 transition-transform">↺</span>
                        </button>
                        <button className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 text-white flex items-center justify-center shadow-xl hover:bg-black transition-all active:scale-90 group">
                           <span className="text-xl group-hover:translate-x-0.5 transition-transform">▶</span>
                        </button>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-zinc-100 p-10 rounded-[3.5rem] space-y-8 shadow-sm">
                     <h4 className="font-black text-sm uppercase tracking-widest text-zinc-900 border-b border-zinc-50 pb-5">Technical Documentation</h4>
                     <div className="space-y-4">
                        {[
                          { name: 'rendering_profile.xml', size: '12KB' },
                          { name: 'depth_mask_01.png', size: '2.4MB' },
                        ].map(doc => (
                          <div key={doc.name} className="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-transparent hover:border-zinc-200 transition-all cursor-pointer">
                             <div className="flex items-center gap-4">
                                <span className="text-xl">📄</span>
                                <span className="text-xs font-bold text-zinc-700">{doc.name}</span>
                             </div>
                             <span className="text-[10px] font-mono text-zinc-400 font-bold">{doc.size}</span>
                          </div>
                        ))}
                        <button className="w-full py-5 border-2 border-dashed border-zinc-200 rounded-[2rem] font-mono text-[10px] text-zinc-300 uppercase font-black hover:border-zinc-400 hover:text-zinc-600 transition-all mt-4">Append Logic Node</button>
                     </div>
                  </div>

                  <div className="bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center border border-white/5">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl -mr-24 -mt-24"></div>
                     <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></div>
                           <h4 className="text-xl font-black uppercase tracking-tighter">Commit Manifest</h4>
                        </div>
                        <p className="text-white/40 text-xs font-medium leading-relaxed uppercase tracking-widest">Finalize visual sequence to enable 360° rendering on primary marketplace discovery nodes.</p>
                        <button className="w-full py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all hover:bg-emerald-400">Enforce Topology</button>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full min-h-[600px] border-4 border-dashed border-zinc-100 rounded-[4rem] p-20 flex flex-col items-center justify-center text-center space-y-10 bg-zinc-50 shadow-inner group">
               <div className="relative">
                  <div className="absolute inset-0 bg-zinc-200 blur-3xl rounded-full scale-150 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center text-5xl shadow-xl border border-zinc-100 relative z-10 group-hover:scale-110 transition-transform duration-700">📹</div>
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-zinc-800 uppercase tracking-tighter">Studio Cluster Idle</h3>
                  <p className="text-zinc-400 font-bold max-w-sm mx-auto mt-2 leading-relaxed uppercase tracking-widest text-[10px]">Select an asset identity from the registry to initialize manual frame sequencing and high-fidelity 360° rendering.</p>
               </div>
               <button className="px-10 py-5 border-4 border-zinc-900 text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all active:scale-95">Link Registry Node</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
