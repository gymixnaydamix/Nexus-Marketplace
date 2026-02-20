
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { WORLD_CONFIG } from '../../constants';

export const MarketMap: React.FC = () => {
  const { products, activeWorld, setActiveProductId } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);
  const theme = WORLD_CONFIG[activeWorld];

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Mock grid nodes for 2035 map
  const nodes = [
    { id: 'NODE-A1', x: 20, y: 30, region: 'North America', items: 12 },
    { id: 'NODE-B4', x: 65, y: 45, region: 'European Union', items: 8 },
    { id: 'NODE-C9', x: 80, y: 75, region: 'Southeast Asia', items: 24 },
    { id: 'NODE-X0', x: 45, y: 60, region: 'Neutral Zone', items: 4 },
  ];

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Geospatial discovery</h1>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest font-bold mt-1">Manual Coordinate Tagging Protocol</p>
        </div>
        <div className="flex gap-4">
           <span className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400">Scan Radius: 500km</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        <div className="lg:col-span-3 bg-zinc-900 rounded-[3.5rem] relative overflow-hidden shadow-2xl border border-white/5">
           {/* Futuristic Grid Map Background */}
           <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }}></div>
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 0 500 Q 500 100 1000 500" stroke="rgba(255,255,255,0.05)" fill="none" strokeWidth="2" />
              <path d="M 0 300 Q 500 600 1000 300" stroke="rgba(255,255,255,0.05)" fill="none" strokeWidth="2" />
           </svg>

           {nodes.map(node => (
             <button
               key={node.id}
               onClick={() => setSelectedNode(node.id)}
               className="absolute group -translate-x-1/2 -translate-y-1/2 transition-all"
               style={{ left: `${node.x}%`, top: `${node.y}%` }}
             >
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  selectedNode === node.id ? 'bg-white text-black border-white shadow-[0_0_20px_white]' : 'bg-black/60 text-white border-white/20 hover:border-white/60'
                }`}>
                  <span className="text-[10px] font-black">{node.items}</span>
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   <span className="px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[8px] font-black uppercase text-white tracking-widest border border-white/10">{node.id}</span>
                </div>
             </button>
           ))}
           
           <div className="absolute bottom-10 left-10 p-6 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 text-white/60 font-mono text-[9px] uppercase tracking-[0.3em]">
              <p>Lat: 34.0522 N</p>
              <p>Lon: 118.2437 W</p>
              <p className="mt-2 text-emerald-400">Node Sync: 100%</p>
           </div>
        </div>

        <div className="lg:col-span-1 flex flex-col space-y-6">
           <div className="flex-1 bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm flex flex-col overflow-hidden">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-6">Local Asset Pool</h3>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                 {selectedNode ? (
                   worldProducts.slice(0, 5).map(p => (
                     <button 
                       key={p.id}
                       onClick={() => setActiveProductId(p.id)}
                       className="w-full text-left p-4 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-zinc-300 transition-all group flex items-center gap-4"
                     >
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0">
                           <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black text-zinc-900 truncate">{p.title}</p>
                           <p className="text-[9px] font-mono text-zinc-400 mt-0.5">${p.price.toLocaleString()}</p>
                        </div>
                     </button>
                   ))
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 opacity-30">
                      <div className="text-4xl">📍</div>
                      <p className="text-[10px] font-black uppercase tracking-widest">Select Node for local inventory</p>
                   </div>
                 )}
              </div>
           </div>
           
           <div className="bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16"></div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-3 font-bold">Manual Routing</p>
              <h4 className="text-lg font-black leading-tight">Request Drone to Location</h4>
              <button className="mt-6 w-full py-3 bg-white text-zinc-900 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl">Deploy Beacon</button>
           </div>
        </div>
      </div>
    </div>
  );
};
