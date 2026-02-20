
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SafeModeration: React.FC<{ type: 'listing' | 'seller' }> = ({ type }) => {
  const { products, users } = useApp();

  const data = type === 'listing' 
    ? products.filter(p => p.status === 'under_review').map(p => ({ ...p, type: 'LISTING_DEPLOYMENT' }))
    : users.filter(u => u.role === 'SELLER').map(u => ({ ...u, type: 'ENTITY_VERIFICATION' }));

  const columns = type === 'listing' ? [
    { key: 'title', header: 'Subject Title' },
    { key: 'category', header: 'Sector' },
    { key: 'price', header: 'Stated Value', render: (i: any) => `$${i.price.toLocaleString()}` },
    { 
      key: 'actions', 
      header: 'Manual Review',
      render: (i: any) => (
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">Approve</button>
          <button className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all">Reject</button>
        </div>
      )
    }
  ] : [
    { key: 'name', header: 'Entity Name' },
    { key: 'email', header: 'Communications' },
    { key: 'world', header: 'Primary Sector' },
    { 
      key: 'actions', 
      header: 'Clearance Status',
      render: (i: any) => (
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">Request Bio-Data</button>
          <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-zinc-200">Authorize Seller</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{type === 'listing' ? 'Listing Scrutiny Hub' : 'Seller Integrity Portal'}</h1>
          <p className="text-zinc-500 font-medium mt-1">Determinstic manual review of pending marketplace entries.</p>
        </div>
        <div className="bg-zinc-900 text-white px-5 py-3 rounded-2xl flex items-center gap-4 w-full md:w-auto">
           <div className="text-right flex-1 md:flex-none">
             <p className="text-[9px] font-mono uppercase tracking-widest opacity-40">Awaiting Decision</p>
             <p className="text-xl font-black">{data.length}</p>
           </div>
           <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
             <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
           </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:block flex-1 min-h-0">
        <DataTable data={data} columns={columns} title="Active Scrutiny Queue" />
      </div>

      {/* Mobile High-Fidelity Cards (Only for Listing Type for now) */}
      <div className="md:hidden space-y-4">
        {type === 'listing' ? (
          data.map((item: any) => (
            <div key={item.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm space-y-5 animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Target: {item.category}</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse"></span>
              </div>

              <div className="flex gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-50 shrink-0">
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-zinc-900 leading-tight mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-mono text-zinc-300 font-bold">$</span>
                    <span className="text-xl font-black text-zinc-900 tabular-nums">{item.price.toLocaleString()}</span>
                  </div>
                  <p className="text-[8px] font-mono text-zinc-400 mt-2 uppercase tracking-tighter">Origin Node: {item.region}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-zinc-50">
                <button className="py-3.5 bg-emerald-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/10 active:bg-emerald-700 active:scale-95 transition-all">
                  Authorize
                </button>
                <button className="py-3.5 bg-rose-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/10 active:bg-rose-700 active:scale-95 transition-all">
                  Quarantine
                </button>
              </div>
              <button className="w-full py-2 bg-zinc-50 text-zinc-400 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border border-transparent hover:border-zinc-200">
                View Evidence Vault
              </button>
            </div>
          ))
        ) : (
          /* Simplified Seller Verification Cards for Mobile */
          data.map((item: any) => (
            <div key={item.id} className="bg-white border border-zinc-100 rounded-[2rem] p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-zinc-900 truncate">{item.name}</h3>
                  <p className="text-[10px] text-zinc-400 font-medium truncate">{item.email}</p>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest">{item.world}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Authorize</button>
                <button className="px-4 py-3 bg-zinc-50 text-zinc-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-zinc-100">Bio-Scan</button>
              </div>
            </div>
          ))
        )}

        {data.length === 0 && (
          <div className="py-20 text-center space-y-4 border-4 border-dashed border-zinc-50 rounded-[3rem]">
            <div className="text-4xl">🛰️</div>
            <p className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-bold">Scrutiny Perimeter Clear</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">⚡</div>
           <div>
             <h4 className="font-bold text-sm">Review Velocity</h4>
             <p className="text-xs text-zinc-400 font-medium">4.2 items / minute</p>
           </div>
        </div>
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">⚖️</div>
           <div>
             <h4 className="font-bold text-sm">Approval Ratio</h4>
             <p className="text-xs text-zinc-400 font-medium">68.4% of total submissions</p>
           </div>
        </div>
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">⏳</div>
           <div>
             <h4 className="font-bold text-sm">Avg Wait Time</h4>
             <p className="text-xs text-zinc-400 font-medium">14.2 minutes (Under SLA)</p>
           </div>
        </div>
      </div>
    </div>
  );
};
