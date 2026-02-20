
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { WORLD_CONFIG } from '../../constants';
import { NexusAPI } from '../../services/api_service';

export const HomeKPI: React.FC = () => {
  const { activeWorld } = useApp();
  const theme = WORLD_CONFIG[activeWorld];
  
  const [showExport, setShowExport] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const stats = [
    { label: 'Listings', value: '12,482', change: '+12%', color: 'blue' },
    { label: 'Pending', value: '452', change: '-3%', color: 'amber' },
    { label: 'Revenue', value: '$842k', change: '+24%', color: 'emerald' },
    { label: 'Alerts', value: '3', change: '0%', color: 'rose' },
  ];

  const runExportSequence = async () => {
    setIsExporting(true);
    setExportProgress(0);
    for(let i = 0; i <= 100; i += 10) {
      setExportProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }
    await NexusAPI.generateExport(['Listing Manifest'], 'JSON');
    setIsExporting(false);
    setShowExport(false);
  };

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700 text-zinc-900 pb-8">
      
      {/* Redundant Title Section Removed, keeping only floating action if needed */}
      <div className="flex justify-end">
        <button 
          onClick={() => setShowExport(true)}
          className="px-7 py-3.5 bg-indigo-600 text-white rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Export Manifest
        </button>
      </div>

      {/* KPI Matrix - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-zinc-100 p-5 md:p-6 rounded-[1.8rem] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
            <p className="text-[7px] md:text-[8px] font-mono uppercase text-zinc-300 tracking-[0.3em] font-black mb-3 md:mb-5 relative z-10">{stat.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-2xl md:text-3xl font-black text-zinc-900 tabular-nums leading-none tracking-tighter">{stat.value}</span>
              <span className={`text-[7px] md:text-[9px] font-black px-1.5 py-0.5 rounded ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : stat.change === '0%' ? 'text-zinc-300 bg-zinc-50' : 'text-rose-500 bg-rose-50'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Matrix Layer - Tighter spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:gap-8">
        <div className="lg:col-span-8 bg-zinc-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
          <div className="flex justify-between items-center mb-6 md:mb-10 shrink-0">
            <h3 className="font-black text-[9px] md:text-sm uppercase tracking-[0.3em]">Revenue Matrix</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
               <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
               <span className="text-[7px] md:text-[8px] font-mono font-black tracking-widest text-white/40 uppercase">Live Node Link</span>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-1.5 md:gap-2.5 px-1 md:px-2">
            {[20, 50, 35, 70, 45, 80, 30, 65, 90, 55, 75, 100, 30, 60, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-md md:rounded-lg hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer relative group origin-bottom" style={{ height: `${h}%` }}>
                 <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-white text-black px-1.5 py-0.5 rounded text-[7px] font-black font-mono">NODE_{i}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-zinc-50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col shadow-inner border border-zinc-100 min-h-[350px]">
          <h3 className="font-black text-zinc-900 text-[9px] md:text-sm uppercase tracking-widest mb-6 border-b border-zinc-200 pb-3 shrink-0">Kernel Events</h3>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 pr-1">
            {[
              { time: '12:45', event: 'Escrow Held', icon: '💰', color: 'bg-amber-100' },
              { time: '11:20', event: 'Seller Verified', icon: '🛡️', color: 'bg-indigo-100' },
              { time: '10:05', event: 'Stock Alert', icon: '📦', color: 'bg-rose-100' },
              { time: '09:30', event: 'SLA Warning', icon: '⚠️', color: 'bg-amber-50' },
              { time: '08:15', event: 'Node Reboot', icon: '⚡', color: 'bg-zinc-200' },
            ].map((ev, i) => (
              <div key={i} className="flex gap-3.5 p-3.5 rounded-xl md:rounded-2xl bg-white border border-zinc-100 flex items-center hover:scale-[1.01] transition-all cursor-default shadow-sm shrink-0">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${ev.color} flex items-center justify-center text-base md:text-lg shrink-0 shadow-sm`}>{ev.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] md:text-xs font-black text-zinc-800 truncate uppercase tracking-tight leading-tight">{ev.event}</p>
                  <p className="text-[7px] font-mono text-zinc-300 font-bold uppercase mt-1">{ev.time} UTC</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Overlay */}
      {showExport && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zinc-900 rounded-[2.5rem] w-full max-w-lg p-8 md:p-10 shadow-2xl relative overflow-hidden text-white border border-white/5">
             <button onClick={() => !isExporting && setShowExport(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all text-xl">×</button>

             {isExporting ? (
               <div className="py-12 flex flex-col items-center justify-center space-y-8">
                  <div className="relative w-24 h-24 md:w-28 md:h-28">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                      <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={314} strokeDashoffset={314 - (314 * exportProgress) / 100} className="text-indigo-500 transition-all duration-300" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-black font-mono">{exportProgress}%</div>
                  </div>
                  <h4 className="text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-center animate-pulse">Syncing Database Cluster...</h4>
               </div>
             ) : (
               <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight uppercase leading-none">Manifest Extraction</h3>
                    <p className="text-white/20 text-[8px] md:text-[9px] uppercase font-mono tracking-widest leading-relaxed">Nominate architectural sectors for manual data pull.</p>
                  </div>

                  <div className="space-y-2.5">
                    {['Listing Manifest', 'Revenue Ledger', 'Audit Logs'].map(s => (
                      <button 
                        key={s} 
                        className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex justify-between items-center group"
                      >
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">{s}</span>
                          <div className="w-5 h-5 rounded-full border border-white/10 group-hover:border-indigo-400/50 transition-colors"></div>
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={runExportSequence}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all"
                  >
                      Initiate Extraction Handshake
                  </button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};
