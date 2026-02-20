
import React, { useState, useEffect } from 'react';
import { useApp } from '../../AppContext';
import { WORLD_CONFIG } from '../../constants';
import { QuantityStepper } from '../../components/UI/QuantityStepper';

export const ProductDetailMatrix: React.FC<{ productId: string }> = ({ productId }) => {
  const { products, setActiveProductId, purchaseProduct, setActiveSectionById, addToCart } = useApp();
  const product = products.find(p => p.id === productId);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [step, setStep] = useState<'details' | 'checkout' | 'success'>('details');
  const [justAdded, setJustAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'history'>('specs');

  if (!product) return null;
  const theme = WORLD_CONFIG[product.world];

  const handleAddToCart = () => {
    for(let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleInitiatePurchase = () => {
    setStep('checkout');
  };

  const handleFinalizeSettlement = async () => {
    setIsPurchasing(true);
    await new Promise(r => setTimeout(r, 2500)); // Simulate multi-node chain confirmation
    await purchaseProduct(productId); 
    setIsPurchasing(false);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in zoom-in-95 duration-1000">
        <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse"></div>
            <div className="w-40 h-40 rounded-[4rem] bg-emerald-500 text-white flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(16,185,129,0.5)] relative z-10 border-4 border-white/20">✓</div>
        </div>
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter uppercase leading-[0.9]">Settlement Finalized</h2>
          <p className="text-zinc-400 font-bold max-w-md mx-auto uppercase tracking-[0.2em] text-sm md:text-base">Asset sequence linked to identity #NX-{Date.now().toString().slice(-6)}. Routing to Logistics Pipeline {product.region}.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 pt-6">
          <button 
            onClick={() => { setActiveProductId(null); setActiveSectionById('delivery'); }}
            className="px-14 py-6 bg-zinc-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Monitor Deployment
          </button>
          <button 
            onClick={() => setActiveProductId(null)}
            className="px-14 py-6 bg-white border-2 border-zinc-100 text-zinc-400 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:text-zinc-900 hover:border-zinc-900 transition-all"
          >
            Exit Matrix
          </button>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    const grossValue = product.price * qty;
    const fee = grossValue * 0.02;
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col animate-in slide-in-from-bottom-12 duration-700 pb-20">
         <div className="mb-14 flex items-center gap-6">
           <button onClick={() => setStep('details')} className="w-14 h-14 rounded-2xl bg-zinc-50 border-2 border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-all shadow-sm active:scale-90">←</button>
           <div>
             <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase leading-none">Settlement Hub</h1>
             <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] font-black mt-2">Manual Node Validation Protocol v4.2.1</p>
           </div>
         </div>

         <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-10">
               <div className="bg-white border-2 border-zinc-100 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                  <h3 className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.4em] font-black">Fiscal Vector Analysis</h3>
                  <div className="flex justify-between items-end border-b border-zinc-50 pb-8">
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Gross Asset Value</span>
                       <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase mt-2">{qty} Units @ ${product.price.toLocaleString()}</span>
                    </div>
                    <span className="text-4xl font-black text-zinc-900 tabular-nums">${grossValue.toLocaleString()}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                       <span className="text-zinc-400">Network Protocol Fee</span>
                       <span className="text-zinc-900">${fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                       <span className="text-zinc-400">Logistics Node Bond</span>
                       <span className="text-zinc-900">$120.00</span>
                    </div>
                    <div className="pt-4 border-t border-zinc-50 flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300">Net Commitment</span>
                        <span className="text-2xl font-black text-emerald-600">${(grossValue + fee + 120).toLocaleString()}</span>
                    </div>
                  </div>
               </div>
               
               <div className="bg-zinc-50 border-2 border-zinc-100 p-10 rounded-[3.5rem] space-y-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-900/[0.03] rotate-45 -mr-12 -mt-12"></div>
                  <h3 className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.4em] font-black">Logistic Destination</h3>
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-[1.8rem] bg-white border-2 border-zinc-100 flex items-center justify-center text-3xl shadow-sm">📍</div>
                     <div>
                        <p className="font-black text-zinc-800 text-lg tracking-tight uppercase">Zone Node: {product.region}</p>
                        <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Status: Operational Gateway</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="md:col-span-5 flex flex-col space-y-10">
               <div className="flex-1 bg-zinc-900 text-white p-12 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32"></div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-6 font-black">Identity Verification Matrix</p>
                  <div className="space-y-6">
                     <div className="h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center px-8 gap-5 hover:bg-white/10 transition-colors">
                        <span className="text-2xl grayscale group-hover:grayscale-0">👤</span>
                        <span className="font-black text-sm uppercase tracking-widest">Identity Linked</span>
                     </div>
                     <div className="h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center px-8 gap-5 hover:bg-white/10 transition-colors">
                        <span className="text-2xl grayscale">🛡️</span>
                        <span className="font-black text-sm uppercase tracking-widest">Escrow Ready</span>
                     </div>
                     <div className="h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center px-8 gap-5">
                        <span className="text-2xl">⚡</span>
                        <span className="font-black text-sm uppercase tracking-widest text-emerald-400">Funds Verified</span>
                     </div>
                  </div>
               </div>
               
               <button 
                 onClick={handleFinalizeSettlement}
                 disabled={isPurchasing}
                 className="w-full py-8 bg-emerald-500 text-white rounded-[3rem] font-black text-sm uppercase tracking-[0.5em] shadow-[0_30px_80px_-15px_rgba(16,185,129,0.5)] active:scale-95 transition-all flex items-center justify-center gap-6 group hover:bg-emerald-400"
               >
                 {isPurchasing ? (
                   <>
                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                     <span>Authorizing Nodes...</span>
                   </>
                 ) : (
                   <>
                    <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:animate-ping"></div>
                    <span>Commit Settlement</span>
                   </>
                 )}
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 md:space-y-20 animate-in fade-in duration-1000 pb-40">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 md:gap-24 items-start">
        
        {/* Left Column: Visual Hub */}
        <div className="w-full lg:col-span-6 space-y-12">
           <button onClick={() => setActiveProductId(null)} className="flex items-center gap-4 text-zinc-400 hover:text-zinc-900 transition-all group">
             <span className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:-translate-x-1 transition-transform">←</span>
             <span className="text-[11px] font-black uppercase tracking-[0.3em]">Discovery Matrix</span>
           </button>
           
           <div className="aspect-square bg-zinc-100 border-2 border-zinc-50 rounded-[4rem] md:rounded-[5.5rem] overflow-hidden shadow-2xl relative group cursor-crosshair">
              <img src={product.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out" />
              <div className="absolute top-12 left-12">
                 <div className="px-6 py-2.5 bg-black/80 backdrop-blur-2xl rounded-2xl text-[11px] font-black text-white uppercase tracking-[0.3em] border border-white/20 shadow-2xl">
                    {product.condition}
                 </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                 <span className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl font-mono text-[10px] font-black uppercase border border-zinc-200 shadow-2xl">360° Rendering Ready</span>
              </div>
           </div>

           <div className="grid grid-cols-4 gap-6 px-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-zinc-100 rounded-[2rem] border-2 border-zinc-50 overflow-hidden opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl">
                   <img src={product.thumbnail} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                </div>
              ))}
           </div>
        </div>

        {/* Right Column: Tactical Control */}
        <div className="flex-1 lg:col-span-6 space-y-12 md:space-y-16">
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                 <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] font-black">Identity Sequence #{product.id}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-[0.85]">{product.title}</h1>
              
              <div className="flex items-center gap-10 pt-6">
                 <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 px-5 py-3 rounded-2xl">
                    <span className="text-amber-500 text-2xl">★</span>
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-zinc-900 leading-none">{product.sellerRating}</span>
                        <span className="text-[9px] font-mono font-black text-zinc-300 uppercase tracking-tighter mt-1">Trust Score</span>
                    </div>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-indigo-600 tracking-[0.2em]">{product.category} Segment</span>
                    <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase mt-1">Verified Cluster</span>
                 </div>
              </div>
           </div>

           <div className="bg-white p-10 md:p-14 rounded-[4rem] space-y-12 border-2 border-zinc-100 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-900/[0.01] rounded-full -mr-20 -mt-20"></div>
              
              <div className="flex items-baseline justify-between">
                 <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] font-black">Acquisition Value</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-zinc-900 font-mono opacity-30">$</span>
                    <span className="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter tabular-nums leading-none">{(product.price * qty).toLocaleString()}</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-[2rem] flex flex-col gap-2 shadow-inner">
                    <span className="text-[10px] font-mono text-zinc-300 uppercase font-black tracking-widest">Node Inventory</span>
                    <span className="font-black text-base text-zinc-800 uppercase tracking-tight">{product.stock} Units Ready</span>
                 </div>
                 <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-[2rem] flex flex-col gap-2 shadow-inner">
                    <span className="text-[10px] font-mono text-zinc-300 uppercase font-black tracking-widest">Regional Hub</span>
                    <span className="font-black text-base text-zinc-800 uppercase tracking-tight">{product.region} Node</span>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between p-6 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] shadow-inner">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono text-zinc-300 uppercase font-black tracking-widest leading-none">Allocation</span>
                       <span className="text-[11px] font-black text-zinc-900 uppercase tracking-widest mt-2">Scale Matrix</span>
                    </div>
                    <QuantityStepper 
                      value={qty} 
                      max={product.stock} 
                      onChange={setQty} 
                      size="md"
                      className="bg-white shadow-xl scale-110"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <button 
                      onClick={handleInitiatePurchase}
                      className="w-full py-8 bg-zinc-900 text-white rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-black hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-6 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:animate-ping relative z-10"></div>
                        <span className="relative z-10">Authorize</span>
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className={`w-full py-8 border-4 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 ${
                            justAdded 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600 scale-105 shadow-xl' 
                            : 'bg-white text-zinc-300 border-zinc-100 hover:border-zinc-300 hover:text-zinc-600 hover:shadow-xl'
                        }`}
                    >
                        {justAdded ? 'Linked to Cart' : 'Nominate Asset'}
                    </button>
                 </div>
              </div>
           </div>

           <div className="space-y-12">
              <div className="flex gap-10 border-b-2 border-zinc-50">
                 {['specs', 'logistics', 'history'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                            activeTab === tab ? 'text-zinc-900' : 'text-zinc-300'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-zinc-900 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                        )}
                    </button>
                 ))}
              </div>

              <div className="min-h-[200px] animate-in slide-in-from-top-4 duration-500">
                {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 gap-6">
                        {[
                        { label: 'Origin Protocol', val: 'Nexus Genesis v4.2' },
                        { label: 'Visual State', val: product.condition },
                        { label: 'Vector Auth', val: product.deliveryMethod },
                        { label: 'Manual Checksum', val: 'Verified (L9 Authorization)' },
                        { label: 'Metadata Depth', val: 'High Fidelity' },
                        ].map(spec => (
                        <div key={spec.label} className="flex justify-between items-center group/spec border-b border-zinc-50 pb-4 last:border-0">
                            <span className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em] group-hover/spec:text-zinc-500 transition-colors">{spec.label}</span>
                            <span className="text-xs font-black text-zinc-800 uppercase tracking-tight">{spec.val}</span>
                        </div>
                        ))}
                    </div>
                )}
                {activeTab === 'logistics' && (
                    <div className="space-y-8">
                        <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white flex items-center gap-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">🚀</div>
                            <div>
                                <h4 className="font-black text-lg tracking-tight uppercase">Sky-Drone Optimized</h4>
                                <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-bold">Latency: 14m to {product.region} Node</p>
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed px-4 font-medium italic">Logistics vector optimized for rapid manual deployment. Guaranteed arrival within 2 epoch cycles of settlement finalization.</p>
                    </div>
                )}
                {activeTab === 'history' && (
                    <div className="flex flex-col items-center justify-center py-10 space-y-6 opacity-30">
                        <div className="text-4xl">📜</div>
                        <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] font-black">Ledger Stream Encrypted</p>
                    </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
