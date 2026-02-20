
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const QualityChecklist: React.FC = () => {
  const rules = [
    { id: 'QR-1', name: 'High-Res Asset Requirement', score: '+25', status: 'Enforced', category: 'General' },
    { id: 'QR-2', name: 'Dimension Precision Check', score: '+15', status: 'Enforced', category: 'Industrial' },
    { id: 'QR-3', name: 'Brand Authorization Link', score: '+40', status: 'Required', category: 'Fashion' },
    { id: 'QR-4', name: 'Manual Bio-Data Validation', score: '+20', status: 'Optional', category: 'High-Value' },
  ];

  const columns = [
    { key: 'name', header: 'Quality Directive' },
    { key: 'category', header: 'Sector Scope' },
    { key: 'score', header: 'Fidelity Weight', render: (r: any) => <span className="font-mono font-black text-emerald-600">{r.score}%</span> },
    { key: 'status', header: 'Protocol State' },
    {
      key: 'actions',
      header: 'Manual Control',
      render: (r: any) => (
        <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all">Modify</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Fidelity Engine</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Scrutiny & Quality Scoring Matrix</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Architect Scoring Rule</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <DataTable data={rules} columns={columns} title="Active Scrutiny Parameters" />
        </div>
        <div className="space-y-8">
           <div className="bg-zinc-900 text-white p-10 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] -mr-24 -mt-24"></div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-6 font-black">Net Integrity Floor</p>
              <h2 className="text-6xl font-black tracking-tighter leading-none text-emerald-400">85%</h2>
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mt-6 leading-relaxed">Entities scoring below this threshold are automatically routed to the manual moderation vault.</p>
           </div>
           
           <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[3.5rem] shadow-inner space-y-6">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Scrutiny Overrides</h3>
              <div className="space-y-3">
                 {['Trusted Vendor Hub', 'Gov-Entity Link', 'Pre-Certified Batch'].map(o => (
                   <div key={o} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm group hover:border-indigo-200 transition-all">
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-tight">{o}</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping"></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
