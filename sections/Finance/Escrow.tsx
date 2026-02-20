
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const FinEscrow: React.FC = () => {
  const { orders } = useApp();
  
  const escrowItems = orders.map(o => ({
    id: o.id,
    amount: o.total,
    lockedDate: o.timestamp,
    releaseDate: new Date(new Date(o.timestamp).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Locked (V4.2 Protocol)'
  }));

  const columns = [
    { key: 'id', header: 'Escrow Key', render: (i: any) => <span className="font-mono text-zinc-400">#{i.id.slice(-6)}</span> },
    { key: 'amount', header: 'Held Value', render: (i: any) => <span className="font-black text-zinc-900">${i.amount.toLocaleString()}</span> },
    { key: 'lockedDate', header: 'Lock Origin', render: (i: any) => <span className="text-xs font-mono text-zinc-400">{new Date(i.lockedDate).toLocaleDateString()}</span> },
    { key: 'releaseDate', header: 'Scheduled Release', render: (i: any) => <span className="text-xs font-mono text-amber-600 font-bold">{new Date(i.releaseDate).toLocaleDateString()}</span> },
    { key: 'status', header: 'Security State' },
    { 
      key: 'actions', 
      header: 'Manual Override',
      render: (i: any) => (
        <button className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">
           Emergency Lock
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-50 pb-6">
        <div className="flex-1">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 leading-none">Escrow Network Pulse</span>
           </div>
        </div>
        <div className="bg-zinc-900 text-white px-8 py-4 rounded-[2.5rem] shadow-2xl flex items-center gap-10">
           <div className="text-right border-r border-white/10 pr-10">
              <p className="text-[8px] font-mono uppercase tracking-widest opacity-30 font-black">Net Held Pool</p>
              <p className="text-2xl font-black tabular-nums">$1,245,800</p>
           </div>
           <div className="text-right">
              <p className="text-[8px] font-mono uppercase tracking-widest opacity-30 font-black">Active Locks</p>
              <p className="text-2xl font-black tabular-nums">{escrowItems.length}</p>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={escrowItems} columns={columns} title="Active Payout Holds" />
      </div>
    </div>
  );
};
