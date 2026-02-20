
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const MarketComparison: React.FC = () => {
  const { products, activeWorld } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);
  
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [attributes, setAttributes] = useState([
    { id: 'price', label: 'Asset Value', enabled: true },
    { id: 'category', label: 'Sector Vector', enabled: true },
    { id: 'stock', label: 'Physical Availability', enabled: true },
    { id: 'status', label: 'Protocol State', enabled: true },
    { id: 'id', label: 'Sequence Code', enabled: false },
  ]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id].slice(-4)
    );
  };

  const toggleAttribute = (id: string) => {
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, enabled: !attr.enabled } : attr
    ));
  };

  const selectedProducts = worldProducts.filter(p => selectedProductIds.includes(p.id));

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Comparison Architect</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Manual matrix generation for side-by-side asset scrutiny.</p>
        </div>
        <div className="bg-zinc-900 text-white px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-6">
           <div className="text-right">
              <p className="text-[9px] font-mono uppercase tracking-widest opacity-30">Active Scrutiny Nodes</p>
              <p className="text-xl font-black tabular-nums">{selectedProductIds.length} / 4</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Selection Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Attribute Matrix</h3>
              <div className="space-y-2">
                {attributes.map(attr => (
                  <button 
                    key={attr.id}
                    onClick={() => toggleAttribute(attr.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      attr.enabled ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-tight">{attr.label}</span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${attr.enabled ? 'bg-white border-white text-zinc-900' : 'border-zinc-200'}`}>
                      {attr.enabled && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Asset Selection Pool</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {worldProducts.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all group flex items-center gap-4 ${
                      selectedProductIds.includes(p.id) ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' : 'bg-white border-zinc-100 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all shrink-0">
                      <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${selectedProductIds.includes(p.id) ? 'text-indigo-900' : 'text-zinc-700'}`}>{p.title}</p>
                      <p className="text-[9px] font-mono text-zinc-400 uppercase font-bold mt-0.5">${p.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Comparison Table Content Area */}
        <div className="lg:col-span-3">
          {selectedProductIds.length === 0 ? (
            <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-50 shadow-inner">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border border-zinc-100">⚖️</div>
               <div>
                  <h3 className="text-2xl font-black text-zinc-800">Scrutiny Vector Idle</h3>
                  <p className="text-zinc-400 font-medium max-w-sm mx-auto mt-2 leading-relaxed">Manual selection required. Please nominate up to four assets from the left selection pool to initialize comparison rendering.</p>
               </div>
            </div>
          ) : (
            <div className="bg-white border border-zinc-100 rounded-[3.5rem] shadow-sm overflow-hidden flex flex-col h-full animate-in zoom-in-95 duration-500">
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-8 border-b border-zinc-100 bg-zinc-50/50 w-48 shrink-0"></th>
                        {selectedProducts.map(p => (
                          <th key={p.id} className="p-8 border-b border-zinc-100 border-l border-zinc-50 min-w-[200px]">
                            <div className="space-y-4 text-center">
                               <div className="w-24 h-24 rounded-[2rem] overflow-hidden mx-auto shadow-2xl border-4 border-white">
                                  <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                               </div>
                               <h4 className="text-sm font-black text-zinc-800 line-clamp-2 leading-tight px-2">{p.title}</h4>
                               <button 
                                 onClick={() => toggleProduct(p.id)}
                                 className="text-[9px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
                               >
                                 Release Node
                               </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                       {attributes.filter(a => a.enabled).map(attr => (
                         <tr key={attr.id} className="hover:bg-zinc-50/50 transition-colors">
                            <td className="p-8 font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black bg-zinc-50/30 border-r border-zinc-50">
                               {attr.label}
                            </td>
                            {selectedProducts.map(p => (
                              <td key={p.id} className="p-8 border-l border-zinc-50 text-center">
                                 {attr.id === 'price' ? (
                                   <span className="text-xl font-black text-zinc-900 tabular-nums">${p.price.toLocaleString()}</span>
                                 ) : attr.id === 'status' ? (
                                   <span className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md">
                                      {p.status}
                                   </span>
                                 ) : (
                                   <span className="text-sm font-bold text-zinc-600">{String(p[attr.id as keyof typeof p])}</span>
                                 )}
                              </td>
                            ))}
                         </tr>
                       ))}
                    </tbody>
                  </table>
               </div>
               <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
                  <p className="text-xs text-zinc-400 font-medium italic">Nexus OS Manual Comparison v2035.4.1</p>
                  <button className="px-8 py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">Export Comparison PDF</button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
