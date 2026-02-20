
import React, { useState, useEffect } from 'react';
import { useApp } from '../../AppContext';

interface Incident {
  id: string;
  status: 'Investigating' | 'Identified' | 'Resolved' | 'Critical';
  priority: 'Standard' | 'High' | 'Critical';
  module: string;
  age: number; // in seconds
  description: string;
}

export const LiveOps: React.FC = () => {
  const { activeWorld, system, toggleIncidentMode } = useApp();
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 'INC-2035-01', status: 'Investigating', priority: 'Critical', module: 'Escrow Lock', age: 142, description: 'Manual checksum failure in Sector 9.' },
    { id: 'INC-2035-02', status: 'Identified', priority: 'High', module: 'DHL-HyperLink', age: 840, description: 'Drone relay latency exceeding 400ms.' },
    { id: 'INC-2035-03', status: 'Investigating', priority: 'Standard', module: 'Auth-Node', age: 45, description: 'Manual biometric retry rate spike.' },
  ]);

  const [logs, setLogs] = useState<string[]>([
    'KERNEL: Boot sequence finalized.',
    'OPS: Manual scrutiny queue initialized.',
    'LINK: Satellite telemetry established.'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIncidents(prev => prev.map(inc => ({ ...inc, age: inc.age + 1 })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatAge = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  const handleAction = (id: string, action: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] MANUAL_INT: ${action} on ${id}`, ...prev].slice(0, 10));
    if (action === 'RESOLVE') {
      setIncidents(prev => prev.filter(i => i.id !== id));
    } else if (action === 'ACKNOWLEDGE') {
       setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: 'Identified' } : i));
    }
  };

  const handleIncidentTrigger = () => {
    if (system.incidentMode) {
      toggleIncidentMode(false, '');
    } else {
      const r = prompt("Nominate Critical Incident Vector:");
      if (r) toggleIncidentMode(true, r);
    }
  };

  const systemIntegrity = Math.max(0, 100 - (incidents.length * 15));

  return (
    <div className="space-y-8 md:space-y-12 h-full flex flex-col animate-in fade-in duration-700 text-zinc-900 pb-20 md:pb-0">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-10">
        <div className={`lg:col-span-3 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-700 ${system.incidentMode ? 'bg-rose-900 text-white' : 'bg-zinc-900 text-white'}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left">
            <div className="space-y-2">
               <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 font-black">Kernel Integrity</p>
               <h2 className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter leading-none">{systemIntegrity}%</h2>
            </div>
            <div className="hidden md:block h-24 w-[2px] bg-white/5"></div>
            <div className="flex flex-col items-center md:items-start space-y-4">
               <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 font-black">Active Scrutiny Nodes</p>
               <div className="flex gap-3">
                  {incidents.map(i => (
                    <div key={i.id} className={`w-4 h-4 rounded-full animate-pulse shadow-[0_0_15px_currentColor] ${i.priority === 'Critical' ? 'text-rose-400 bg-rose-400' : 'text-amber-400 bg-amber-400'}`}></div>
                  ))}
                  {incidents.length === 0 && <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Sector Nominal</span>}
               </div>
            </div>
          </div>
          <button 
            onClick={handleIncidentTrigger}
            className={`relative z-10 w-full md:w-auto px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 ${system.incidentMode ? 'bg-white text-rose-900' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
             {system.incidentMode ? 'Lift Lockdown' : 'Protocol Zero'}
          </button>
        </div>
        
        <div className="bg-white border border-zinc-100 p-8 md:p-12 rounded-[3.5rem] shadow-sm flex flex-col justify-center text-center group">
           <p className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-black mb-4 group-hover:text-zinc-400 transition-colors">MTTR SLA</p>
           <h3 className="text-4xl font-black text-zinc-900 tracking-tighter">14.2m</h3>
           <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <p className="text-[10px] text-emerald-500 font-black font-mono uppercase tracking-tighter">Compliant</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-5 overflow-y-auto pr-4 no-scrollbar pb-10">
           <div className="flex justify-between items-center mb-4 px-6">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.5em] font-black">Live Incident Queue</h3>
              <span className="text-[11px] font-black text-zinc-900 uppercase tracking-widest">{incidents.length} Critical Events</span>
           </div>

           {incidents.map((inc) => (
             <div key={inc.id} className="bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-10 shadow-sm group transition-all hover:shadow-2xl relative overflow-hidden active:scale-[0.99]">
                {inc.priority === 'Critical' && (
                  <div className="absolute top-0 left-0 w-2 h-full bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]"></div>
                )}
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                   <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                         <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-xl text-[10px] font-mono font-black">{inc.id}</span>
                         <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            inc.status === 'Investigating' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                            {inc.status}
                         </span>
                         <span className="text-[10px] font-mono text-zinc-300 font-black uppercase tracking-tighter">{formatAge(inc.age)}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-zinc-900 leading-[1.1] uppercase tracking-tight">{inc.module}: {inc.description}</h4>
                   </div>
                   
                   <div className="flex gap-3 w-full md:w-auto shrink-0">
                      <button 
                        onClick={() => handleAction(inc.id, 'ACKNOWLEDGE')}
                        className="flex-1 md:flex-none px-7 py-4 bg-zinc-50 border border-zinc-200 text-zinc-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all"
                      >
                         ACK
                      </button>
                      <button 
                        onClick={() => handleAction(inc.id, 'RESOLVE')}
                        className="flex-1 md:flex-none px-7 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:bg-black transition-all"
                      >
                         RESOLVE
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-zinc-50 border border-zinc-100 rounded-[3.5rem] p-10 flex flex-col h-[500px] lg:h-auto overflow-hidden shadow-inner relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.03] blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-indigo-500/[0.06] transition-all"></div>
           <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black mb-8 flex items-center gap-4 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
              Ops Ledger Matrix
           </h3>
           <div className="flex-1 font-mono text-[10px] space-y-5 overflow-y-auto pr-4 no-scrollbar text-zinc-400 relative z-10">
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-4 duration-500 border-b border-zinc-200/50 pb-3">
                   <span className="text-zinc-300 font-bold opacity-30">[{i}]</span> {log}
                </div>
              ))}
              <div className="text-indigo-600 font-black animate-pulse pt-6">_ AWAITING MANUAL INPUT</div>
           </div>
           
           <div className="mt-10 relative z-10">
              <button className="w-full py-5 bg-zinc-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-black active:scale-[0.98] transition-all">
                 Commit Node Sync
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
