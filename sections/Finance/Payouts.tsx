
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const FinPayouts: React.FC = () => {
  const payouts = [
    { id: 'PAY-001', seller: 'Jordan Vane', amount: 12450, method: 'Network-Wire', status: 'Awaiting Auth' },
    { id: 'PAY-002', seller: 'Nexus Electro', amount: 8200, method: 'Stable-USD', status: 'Awaiting Auth' },
    { id: 'PAY-003', seller: 'Sky Real Estate', amount: 450000, method: 'Inter-Bank', status: 'Compliance Hold' },
  ];

  const columns = [
    { key: 'id', header: 'Sequence ID' },
    { key: 'seller', header: 'Target Entity' },
    { key: 'amount', header: 'Gross Amount', render: (p: any) => <span className="font-black text-zinc-900">${p.amount.toLocaleString()}</span> },
    { key: 'method', header: 'Clearance Route' },
    { key: 'status', header: 'Protocol Status', render: (p: any) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        p.status === 'Awaiting Auth' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
      }`}>
        {p.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Clearing',
      render: (p: any) => (
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
          Authorize Payout
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Force Liquidity Sync</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={payouts} columns={columns} title="Fiscal Clearance Matrix" />
      </div>

      <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-100 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-3xl">💱</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight leading-none">Manual Exchange Ledger</h4>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2 italic">Rates synced from Global Reserve 2035</p>
            </div>
         </div>
         <button className="px-6 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Audit Exchange Nodes</button>
      </div>
    </div>
  );
};
