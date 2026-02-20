
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const RetRequests: React.FC = () => {
  const returns = [
    { id: 'RET-881', orderId: 'ord-101', reason: 'Dimensional Inaccuracy', status: 'Awaiting Receipt', value: 2499 },
    { id: 'RET-882', orderId: 'ord-105', reason: 'Buyer Remorse', status: 'In Inspection', value: 850 },
    { id: 'RET-883', orderId: 'ord-109', reason: 'Defective Core', status: 'Escalated', value: 15200 },
  ];

  const columns = [
    { key: 'id', header: 'Return Sequence' },
    { key: 'orderId', header: 'Origin Order', render: (i: any) => <span className="font-mono text-zinc-400">#{i.orderId.slice(-6)}</span> },
    { key: 'reason', header: 'Stated Vector' },
    { key: 'value', header: 'Risk Value', render: (i: any) => <span className="font-black tabular-nums">${i.value.toLocaleString()}</span> },
    { key: 'status', header: 'Logistics State', render: (i: any) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        i.status === 'Escalated' ? 'bg-rose-50 text-rose-600' : 'bg-zinc-100 text-zinc-500'
      }`}>
        {i.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Review',
      render: (i: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
           Open Case File
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="bg-zinc-50 border border-zinc-100 px-6 py-3 rounded-2xl flex items-center gap-4">
           <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">Net Risk Pool:</p>
           <h2 className="text-xl font-black tabular-nums text-rose-600">$18,549.20</h2>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={returns} columns={columns} title="Reverse Logistics Matrix" />
      </div>

      <div className="bg-zinc-900 text-white p-10 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
         <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Inspection Directive</h3>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-lg">Download manual inspection checklist and restock criteria for the current epoch cycles.</p>
         </div>
         <button className="relative z-10 w-20 h-20 rounded-[2.5rem] bg-white text-zinc-900 flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform active:scale-90">⬇️</button>
      </div>
    </div>
  );
};
