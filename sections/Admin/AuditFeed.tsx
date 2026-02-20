
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { AuditLog } from '../../types';

export const AuditFeed: React.FC = () => {
  const { auditLogs } = useApp();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  return (
    <div className="space-y-6 md:space-y-10 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Export Full Ledger</button>
      </div>

      <div className="space-y-3">
        {auditLogs.length > 0 ? (
          auditLogs.map((log) => (
            <div 
              key={log.id} 
              onClick={() => setSelectedLog(log)}
              className="bg-white border border-zinc-100 p-5 md:p-7 rounded-[2.2rem] md:rounded-[2.8rem] shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 hover:border-indigo-200 transition-all group cursor-pointer active:scale-[0.99]"
            >
              <div className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-400 text-[9px] font-mono font-black shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-[8px] font-black shrink-0">{log.userName[0]}</div>
                  <span className="text-[11px] md:text-sm font-black text-zinc-900 truncate uppercase tracking-tight">{log.userName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] md:text-xs font-black uppercase tracking-[0.15em] ${
                    log.action.includes('SYSTEM') || log.action.includes('LOCKDOWN') || log.action.includes('INTERVENTION') ? 'text-rose-600' : 'text-indigo-600'
                  }`}>{log.action}</span>
                  <span className="text-zinc-200">•</span>
                  <p className="text-[10px] md:text-xs text-zinc-400 truncate font-medium">Entity: {log.entity}</p>
                </div>
              </div>

              <div className="w-full md:w-auto text-right border-t md:border-t-0 border-zinc-50 pt-3 md:pt-0">
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-300 font-bold uppercase tracking-widest">Node Link: {log.ip}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-24 text-center border-4 border-dashed border-zinc-50 rounded-[4rem] bg-zinc-50/30">
            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl border border-zinc-100 mb-6">📡</div>
            <p className="text-[11px] font-mono text-zinc-300 uppercase tracking-[0.4em] font-black">Kernel Idle: Monitoring Stream v4.2</p>
          </div>
        )}
      </div>

      {/* Audit Detail Inspector Overlay */}
      {selectedLog && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-[#050508]/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-[#0c0c14] text-white w-full max-w-4xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">📑</div>
                    <div>
                       <h3 className="font-black text-xl uppercase tracking-tighter">Manifest Inspection</h3>
                       <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-black mt-1">UUID: {selectedLog.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedLog(null)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl hover:bg-white/10 transition-colors">×</button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <h4 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] font-black border-b border-white/5 pb-4">Actor Identity</h4>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-black">{selectedLog.userName[0]}</div>
                          <div>
                             <p className="font-black text-lg uppercase tracking-tight">{selectedLog.userName}</p>
                             <p className="text-[10px] font-mono text-white/40 font-bold uppercase">Authorized Link: {selectedLog.ip}</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <h4 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] font-black border-b border-white/5 pb-4">Protocol Event</h4>
                       <div className="space-y-2">
                          <p className={`text-xl font-black uppercase tracking-widest ${selectedLog.action.includes('SYSTEM') ? 'text-rose-500' : 'text-emerald-400'}`}>
                             {selectedLog.action}
                          </p>
                          <p className="text-[10px] font-mono text-white/40 uppercase font-black">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h4 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] font-black border-b border-white/5 pb-4">Data Vector Diff</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[300px]">
                       <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col">
                          <p className="text-[9px] font-black text-white/20 uppercase mb-4">Base State (Pre-Execution)</p>
                          <pre className="flex-1 font-mono text-[10px] text-rose-300/80 overflow-auto whitespace-pre-wrap no-scrollbar">
                             {selectedLog.before ? JSON.stringify(selectedLog.before, null, 2) : '// Null sequence node'}
                          </pre>
                       </div>
                       <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col">
                          <p className="text-[9px] font-black text-white/20 uppercase mb-4">Final State (Post-Commit)</p>
                          <pre className="flex-1 font-mono text-[10px] text-emerald-300/80 overflow-auto whitespace-pre-wrap no-scrollbar">
                             {selectedLog.after ? JSON.stringify(selectedLog.after, null, 2) : '// No node commit recorded'}
                          </pre>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-black/40 border-t border-white/5 flex justify-between items-center px-12">
                 <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em] font-black italic">Immutable Nexus Ledger v4.2.1 • Non-Reversible Path</p>
                 <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download Evidence PDF</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
