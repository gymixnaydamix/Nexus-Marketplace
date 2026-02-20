
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const FinWallets: React.FC<{ type: 'buyer' | 'seller' }> = ({ type }) => {
  const { users } = useApp();
  
  const wallets = users.filter(u => type === 'buyer' ? u.role === 'BUYER' : u.role === 'SELLER').map(u => ({
    id: u.id,
    owner: u.name,
    balance: Math.floor(Math.random() * 50000) + 500,
    escrow: Math.floor(Math.random() * 5000),
    status: 'Operational',
    lastTx: '2035-05-12'
  }));

  const columns = [
    { key: 'owner', header: 'Protocol Owner' },
    { key: 'balance', header: 'Available Balance', render: (w: any) => <span className="font-black text-zinc-900">${w.balance.toLocaleString()}</span> },
    { key: 'escrow', header: 'Escrow Lock', render: (w: any) => <span className="font-bold text-amber-600">${w.escrow.toLocaleString()}</span> },
    { key: 'status', header: 'Wallet State' },
    { key: 'lastTx', header: 'Final Update' },
    { 
      key: 'actions', 
      header: 'Manual Actions',
      render: (w: any) => (
        <button className="px-3 py-1.5 bg-zinc-100 text-zinc-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all border border-zinc-200">
          View Ledger
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      {/* Page headers removed, kept global sync action */}
      <div className="flex justify-end border-b border-zinc-50 pb-6">
           <button className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-xs md:text-sm font-bold shadow-xl shadow-zinc-200 hover:bg-black transition-all active:scale-95">Authorize Global Sync</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-zinc-900 text-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/10 blur-[80px] md:blur-[100px] rounded-full -mr-24 -mt-24 md:-mr-32 md:-mt-32 transition-all group-hover:bg-emerald-500/20"></div>
           <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mb-2 md:mb-3 font-bold">Total Managed Float</p>
           <h2 className="text-4xl md:text-6xl font-black tabular-nums">$12,482,900</h2>
           <div className="mt-6 md:mt-8 flex gap-4 md:gap-6 border-t border-white/10 pt-6 md:pt-8">
              <div>
                <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest opacity-30 font-bold">Active Escrows</p>
                <p className="text-lg md:text-xl font-bold text-amber-400">$842,000</p>
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest opacity-30 font-bold">Net Clearing</p>
                <p className="text-lg md:text-xl font-bold text-emerald-400">$11,640,900</p>
              </div>
           </div>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-center gap-4 md:gap-6 shadow-inner">
           <div className="flex justify-between items-center">
              <span className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-widest">Transaction Pulse (24h)</span>
              <span className="text-[10px] md:text-xs font-black text-emerald-500 font-mono">+12.4%</span>
           </div>
           <div className="h-1.5 md:h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-900 rounded-full w-[72%] transition-all duration-1000"></div>
           </div>
           <div className="flex justify-between text-[8px] md:text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-widest">
              <span>00:00 UTC</span>
              <span>23:59 UTC</span>
           </div>
        </div>
      </div>

      <div className="hidden md:block flex-1 min-h-0">
        <DataTable data={wallets} columns={columns} title="Active Financial Nodes" />
      </div>

      <div className="md:hidden space-y-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm space-y-5 animate-in slide-in-from-bottom-3 duration-500">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {wallet.owner[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-900 leading-none mb-1">{wallet.owner}</h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-100/50">
                {wallet.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-50">
              <div className="space-y-1">
                <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Balance</p>
                <span className="text-xl font-black text-zinc-900 tabular-nums leading-none">
                  ${wallet.balance.toLocaleString()}
                </span>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Escrow</p>
                <span className="text-xl font-black text-amber-500 tabular-nums leading-none">
                  ${wallet.escrow.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full py-3.5 bg-zinc-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl">
              Audit Ledger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
