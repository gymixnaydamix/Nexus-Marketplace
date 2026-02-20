
import React, { useState } from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const TranslationManager: React.FC = () => {
  const [labels, setLabels] = useState([
    { id: 'L-001', key: 'OS_TITLE', en: 'Nexus Marketplace OS', jp: 'ネクサス・マーケットプレイスOS', status: 'Verified' },
    { id: 'L-002', key: 'NAV_HOME', en: 'Home', jp: 'ホーム', status: 'Verified' },
    { id: 'L-003', key: 'ACT_BUY', en: 'Acquire', jp: '取得', status: 'Pending Review' },
    { id: 'L-004', key: 'SEC_ADMIN', en: 'Admin Console', jp: '管理者コンソール', status: 'Verified' },
  ]);

  const columns = [
    { key: 'key', header: 'Schema Key', render: (l: any) => <code className="text-[10px] bg-zinc-900 text-zinc-100 px-2 py-1 rounded">{l.key}</code> },
    { key: 'en', header: 'English Manifest' },
    { key: 'jp', header: 'Japanese Sector' },
    { 
      key: 'status', 
      header: 'Integrity', 
      render: (l: any) => (
        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${l.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {l.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Manual Edit',
      render: (l: any) => (
        <button className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900">✎</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Semantic Overrides</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Multi-Language Label Synthesis</p>
        </div>
        <div className="flex gap-4">
           <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-600 outline-none">
              <option>Primary Cluster: English</option>
              <option>Target Sector: Japanese</option>
              <option>Target Sector: German</option>
           </select>
           <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Commit Dictionary</button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={labels} columns={columns} title="Global Language Matrix" />
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-inner relative overflow-hidden group">
         <div className="absolute inset-0 bg-indigo-500/[0.01] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-zinc-100 flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform">🌍</div>
            <div>
               <h4 className="text-2xl font-black uppercase tracking-tighter">Automated Scraping Disabled</h4>
               <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-md mt-2">All semantic nodes require manual verification by certified World Translators to ensure nomenclature integrity across worlds.</p>
            </div>
         </div>
         <button className="relative z-10 px-10 py-5 border-4 border-zinc-900 text-zinc-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all active:scale-95">Enroll Translator Node</button>
      </div>
    </div>
  );
};
