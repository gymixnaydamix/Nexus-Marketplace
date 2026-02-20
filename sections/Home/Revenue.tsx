
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';
import { NexusAPI } from '../../services/api_service';

export const HomeRevenue: React.FC = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const data = [
    { id: '1', date: '2035-05-01', revenue: 45000, orders: 120, aov: 375 },
    { id: '2', date: '2035-05-02', revenue: 52000, orders: 145, aov: 358 },
    { id: '3', date: '2035-05-03', revenue: 48000, orders: 130, aov: 369 },
    { id: '4', date: '2035-05-04', revenue: 61000, orders: 180, aov: 338 },
  ];

  const columns = [
    { key: 'date', header: 'Fiscal Date' },
    { key: 'revenue', header: 'Gross Revenue', render: (i: any) => <span className="font-bold text-zinc-900">${i.revenue.toLocaleString()}</span> },
    { key: 'orders', header: 'Order Volume' },
    { key: 'aov', header: 'AOV', render: (i: any) => <span className="text-zinc-500">${i.aov}</span> },
  ];

  const handleAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    await new Promise(r => setTimeout(r, 2000));
    const res = await NexusAPI.performAudit();
    setAuditResult(res);
    setIsAuditing(false);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
           <h1 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">Financial Oversight</h1>
           <p className="text-zinc-500 font-medium mt-1 text-[10px] md:text-sm uppercase tracking-widest">Manual Node Verification</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {auditResult && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${auditResult.match ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'} animate-in slide-in-from-right duration-500`}>
               <div className={`w-2 h-2 rounded-full ${auditResult.match ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
               <span className="text-[9px] font-black uppercase tracking-widest">{auditResult.match ? 'Checksum Verified' : 'Anomaly Detected'}</span>
            </div>
          )}
          <button 
            onClick={handleAudit}
            disabled={isAuditing}
            className={`px-6 py-4 bg-zinc-900 text-white rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all ${isAuditing ? 'opacity-70' : ''}`}
          >
            {isAuditing && <div className="animate-spin h-3 w-3 border-2 border-white/20 border-t-white rounded-full"></div>}
            {isAuditing ? 'Verifying...' : 'Manual Audit'}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -mr-32 -mt-32"></div>
        <div className="text-center md:text-left w-full md:w-auto">
          <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mb-3 font-bold">Managed Float</p>
          <h2 className="text-4xl md:text-7xl font-black tabular-nums leading-none tracking-tighter">$4,285,900</h2>
        </div>
        <div className="mt-6 md:mt-0 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 w-full md:w-auto">
          <p className="text-emerald-400 font-black text-2xl md:text-3xl">+18.4%</p>
          <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest opacity-40 font-bold mt-1">Monthly Delta</p>
        </div>
      </div>

      {/* Mobile Card Ledger */}
      <div className="md:hidden space-y-4">
        {data.map(item => (
          <div key={item.id} className="bg-white border border-zinc-100 p-5 rounded-[2rem] shadow-sm flex justify-between items-center">
            <div>
              <p className="text-[8px] font-mono text-zinc-300 uppercase font-black">{item.date}</p>
              <p className="text-sm font-black text-zinc-900 mt-1">${item.revenue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-mono text-zinc-300 uppercase font-black">{item.orders} Orders</p>
              <p className="text-[10px] font-black text-zinc-400 mt-1">AOV: ${item.aov}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block flex-1 min-h-0">
        <DataTable data={data} columns={columns} title="Primary Revenue Ledger" />
      </div>
    </div>
  );
};

export const HomeListings: React.FC = () => {
  const stats = [
    { label: 'Active', count: 12482, color: 'bg-emerald-500' },
    { label: 'Review', count: 142, color: 'bg-amber-500' },
    { label: 'Sold', count: 8902, color: 'bg-indigo-500' },
    { label: 'Drafts', count: 342, color: 'bg-zinc-300' },
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20 md:pb-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-zinc-100 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
            <div className={`w-2 h-2 rounded-full ${s.color} mb-3 shadow-lg`}></div>
            <p className="text-[8px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">{s.label}</p>
            <p className="text-xl md:text-3xl font-black text-zinc-900 mt-1 tabular-nums">{s.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="bg-zinc-50 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-100 shadow-inner">
        <h3 className="text-xs md:text-lg font-black text-zinc-900 mb-8 uppercase tracking-widest text-center md:text-left">Inventory Saturation</h3>
        <div className="space-y-8 md:space-y-12">
          {[
            { world: 'Electronics', val: 70, color: 'bg-blue-500' },
            { world: 'Cars', val: 55, color: 'bg-rose-500' },
            { world: 'Real Estate', val: 40, color: 'bg-emerald-500' }
          ].map((sector, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-500">{sector.world}</span>
                <span className="text-zinc-900">{sector.val}% Saturation</span>
              </div>
              <div className="h-3 md:h-5 w-full bg-white rounded-full overflow-hidden border border-zinc-100">
                <div className={`h-full rounded-full transition-all duration-1000 ${sector.color}`} style={{ width: `${sector.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomeRefunds: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-10 animate-in zoom-in-95 duration-500 pb-20 md:pb-0">
      <div className="bg-rose-50 border border-rose-100 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl md:text-5xl font-black text-rose-900 tracking-tight leading-none">1.2% Refund Rate</h2>
          <p className="text-rose-700/60 font-bold mt-3 text-[10px] md:text-sm uppercase tracking-widest">12 Critical Interventions Pending</p>
        </div>
        <button className="w-full md:w-auto px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest shadow-xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all">
          Authorize Claims
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-100 shadow-sm">
          <h4 className="font-black text-zinc-900 mb-8 uppercase text-[10px] md:text-xs tracking-widest border-b border-zinc-50 pb-5">Conflict Vectors</h4>
          <div className="space-y-6">
            {[
              { reason: 'Accuracy', percent: 45, color: 'bg-rose-400' },
              { reason: 'Logistics', percent: 30, color: 'bg-amber-400' },
              { reason: 'Remorse', percent: 25, color: 'bg-zinc-400' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[8px] md:text-[10px] font-black text-zinc-400 w-24 uppercase tracking-widest">{r.reason}</span>
                <div className="flex-1 h-2 bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                  <div className={`h-full ${r.color}`} style={{ width: `${r.percent}%` }}></div>
                </div>
                <span className="text-[9px] font-mono font-black text-zinc-900 w-10 text-right">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rotate-45 -mr-24 -mt-24"></div>
           <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest opacity-40 mb-3 font-bold">Policy Directive v4.2</p>
           <h3 className="text-2xl md:text-3xl font-black leading-tight">Zero-Auto Refund Protocol</h3>
           <p className="text-white/40 text-[10px] md:text-sm mt-4 leading-relaxed font-medium">Deterministic manual validation required for all capital exits to maintain node integrity.</p>
        </div>
      </div>
    </div>
  );
};
