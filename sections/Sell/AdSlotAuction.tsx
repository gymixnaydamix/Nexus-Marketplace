
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const AdSlotAuction: React.FC = () => {
  const slots = [
    { id: 'ADS-CORE-1', location: 'Home Hero Node', currentBid: 1200, bidder: 'Jordan Vane', expiry: '4h 12m' },
    { id: 'ADS-WORLD-EL', location: 'Electronics Discovery', currentBid: 450, bidder: 'Nexus Electro', expiry: '12h 45m' },
    { id: 'ADS-GRID-3', location: 'Footer Promo Grid', currentBid: 85, bidder: 'Lia Sky', expiry: '1d 2h' },
  ];

  const columns = [
    { key: 'location', header: 'Display Node' },
    { key: 'currentBid', header: 'Current Magnitude', render: (s: any) => <span className="font-black text-zinc-900">$ {s.currentBid.toLocaleString()}</span> },
    { key: 'bidder', header: 'Highest Bidder' },
    { key: 'expiry', header: 'Epoch Sync' },
    {
      key: 'actions',
      header: 'Manual Control',
      render: (s: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Submit Bid Node</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Auction Hub</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Discovery Node Bidding Protocol</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Initialize New Auction</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.8rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl">🏷️</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight">Active Nodes</h4>
               <p className="text-2xl font-black tabular-nums">{slots.length}</p>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.8rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl">💎</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight">Net Bid Volume</h4>
               <p className="text-2xl font-black tabular-nums">$ 1,735.00</p>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.8rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl">⏱️</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight">Sync Cycle</h4>
               <p className="text-2xl font-black tabular-nums">04:42:01</p>
            </div>
         </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={slots} columns={columns} title="Discovery Allocation Matrix" />
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-inner relative overflow-hidden group">
         <div className="absolute inset-0 bg-indigo-500/[0.01] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-zinc-100 flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform">⚖️</div>
            <div>
               <h4 className="text-2xl font-black uppercase tracking-tighter">Manual Vetting Required</h4>
               <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-md mt-2">All winning auction bids are manually verified by Sector Curators to ensure content alignment and discover integrity.</p>
            </div>
         </div>
         <button className="relative z-10 px-10 py-5 border-4 border-zinc-900 text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all active:scale-95">View Vetting Rules</button>
      </div>
    </div>
  );
};
