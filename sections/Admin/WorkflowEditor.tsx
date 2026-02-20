
import React, { useState } from 'react';

interface StateNode {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
}

export const WorkflowEditor: React.FC = () => {
  const [history, setHistory] = useState<{ nodes: StateNode[], date: string }[]>([]);
  const [nodes, setNodes] = useState<StateNode[]>([
    { id: '1', label: 'DRAFT', color: 'bg-zinc-200', x: 10, y: 10 },
    { id: '2', label: 'SCRUTINY', color: 'bg-amber-100', x: 40, y: 10 },
    { id: '3', label: 'ACTIVE', color: 'bg-emerald-100', x: 70, y: 10 },
    { id: '4', label: 'LOCKED', color: 'bg-rose-100', x: 40, y: 40 }
  ]);

  const commitTopology = () => {
    setHistory([{ nodes: [...nodes], date: new Date().toLocaleTimeString() }, ...history].slice(0, 5));
    alert("Topology Commitment Finalized. Manifest Updated.");
  };

  const rollback = (version: { nodes: StateNode[] }) => {
    if (confirm("Revert to previous logic manifest? Current nodes will be purged.")) {
      setNodes([...version.nodes]);
    }
  };

  const addNode = () => {
    const label = prompt("Enter State Label (e.g. REVIEW):");
    if (!label) return;
    setNodes([...nodes, { 
      id: Date.now().toString(), 
      label: label.toUpperCase(), 
      color: 'bg-indigo-100',
      x: 10 + (nodes.length * 5),
      y: 70
    }]);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Logic Architect</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3 italic">Manual State & Transition Topology Designer</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={commitTopology} className="flex-1 md:flex-none px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-black active:scale-95 transition-all">Commit Global Topology</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-zinc-100 p-8 md:p-10 rounded-[3.5rem] shadow-sm space-y-8">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black px-2">State Registry</h3>
            <div className="space-y-3">
              {nodes.map(s => (
                <div key={s.id} className={`p-5 rounded-[1.8rem] border border-zinc-100 ${s.color} shadow-sm flex justify-between items-center group transition-all hover:scale-[1.03] active:scale-95`}>
                  <p className="font-black text-[10px] md:text-[11px] uppercase tracking-widest">{s.label}</p>
                  <button onClick={() => removeNode(s.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                </div>
              ))}
            </div>
            <button 
              onClick={addNode}
              className="w-full py-5 border-2 border-dashed border-zinc-100 rounded-[2rem] font-mono text-[10px] text-zinc-300 font-black uppercase tracking-widest hover:border-zinc-300 hover:text-zinc-400 transition-all active:bg-zinc-50"
            >
              Append Operation
            </button>
          </div>

          <div className="bg-zinc-50 border border-zinc-100 p-8 md:p-10 rounded-[3rem] space-y-6 shadow-inner">
             <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">History (Rollback)</h3>
             {history.length > 0 ? (
               <div className="space-y-3">
                 {history.map((h, i) => (
                   <button 
                     key={i} 
                     onClick={() => rollback(h)}
                     className="w-full text-left p-4 bg-white border border-zinc-100 rounded-2xl hover:border-indigo-200 transition-all group"
                   >
                      <p className="text-[10px] font-black text-zinc-800 uppercase tracking-tight">Revision Node 0{history.length - i}</p>
                      <p className="text-[9px] font-mono text-zinc-400 mt-1 uppercase">{h.date} Epoch</p>
                   </button>
                 ))}
               </div>
             ) : (
               <p className="text-[9px] font-mono text-zinc-300 text-center py-4 uppercase">No snapshots logged</p>
             )}
          </div>
        </div>

        <div className="lg:col-span-9 min-h-[700px] bg-zinc-900 rounded-[4.5rem] p-12 relative overflow-hidden shadow-2xl flex items-center justify-center group border border-white/5">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
           <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 100 100">
             <defs><pattern id="grid-nodes-architect-final" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
             <rect width="100%" height="100%" fill="url(#grid-nodes-architect-final)" />
           </svg>
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="20%" y1="20%" x2="40%" y2="20%" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="50%" y1="20%" x2="70%" y2="20%" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
           </svg>

           {nodes.map(node => (
             <div 
               key={node.id} 
               className={`absolute w-36 h-20 md:w-44 md:h-24 rounded-[2rem] ${node.color} border-[6px] border-zinc-900 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-move active:scale-110 transition-transform group/node`}
               style={{ left: `${node.x}%`, top: `${node.y}%` }}
             >
                <div className="text-center px-6">
                   <p className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">{node.label}</p>
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full group-hover/node:animate-ping shadow-lg"></div>
                </div>
             </div>
           ))}

           <div className="absolute bottom-10 right-10 flex gap-4">
              <div className="px-6 py-3 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Logical Sync Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
