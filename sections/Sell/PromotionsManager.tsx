
import React, { useState } from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const PromotionsManager: React.FC = () => {
  const [promos, setPromos] = useState([
    { id: 'PRM-001', name: 'Neo-Summer Blast', type: 'Coupon', discount: '15%', status: 'Active', usage: 142 },
    { id: 'PRM-002', name: 'High-Value Bundle', type: 'Bundle', discount: '$200', status: 'Draft', usage: 0 },
    { id: 'PRM-003', name: 'Sector 9 Flash', type: 'Flash Sale', discount: '40%', status: 'Scheduled', usage: 0 },
  ]);

  const columns = [
    { key: 'name', header: 'Directive Name' },
    { key: 'type', header: 'Fiscal Type' },
    { key: 'discount', header: 'Magnitude' },
    { key: 'status', header: 'State' },
    { key: 'usage', header: 'Redemptions', render: (p: any) => <span className="font-mono font-bold">{p.usage}</span> },
    {
      key: 'actions',
      header: 'Manual Control',
      render: (p: any) => (
        <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black">Modify</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Promotion Architect</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3">Manual Fiscal Incentives Engine</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Architect New Promo</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Promotions', value: promos.filter(p => p.status === 'Active').length, icon: '🏷️' },
          { label: 'Scheduled Tasks', value: promos.filter(p => p.status === 'Scheduled').length, icon: '📅' },
          { label: 'Total Magnitude', value: '$14.2k', icon: '💎' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm flex flex-col items-center text-center space-y-4 group hover:shadow-xl transition-all">
             <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">{s.icon}</div>
             <div>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">{s.label}</p>
                <p className="text-3xl font-black text-zinc-900 mt-1">{s.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={promos} columns={columns} title="Promotion Logic Matrix" />
      </div>

      <div className="bg-zinc-900 text-white p-12 rounded-[4rem] flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
         <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Manual Ad Slot Auction</h3>
            <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest leading-relaxed max-w-lg">Nominate assets for high-velocity front-page discovery nodes. Bid sequences are verified manually by World Curators.</p>
         </div>
         <button className="relative z-10 px-12 py-6 bg-white text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Enter Auction Pool</button>
      </div>
    </div>
  );
};
