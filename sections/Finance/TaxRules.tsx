
import React, { useState } from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const TaxRules: React.FC = () => {
  const [rules, setRules] = useState([
    { id: 'TAX-001', region: 'North American Federation', type: 'VAT', rate: '7.5%', status: 'Active' },
    { id: 'TAX-002', region: 'European Regulatory Bloc', type: 'GST', rate: '21%', status: 'Active' },
    { id: 'TAX-003', region: 'Nexus Neutral Zone', type: 'Exempt', rate: '0%', status: 'Active' },
    { id: 'TAX-004', region: 'Southeast Asian Coalition', type: 'Sales Tax', rate: '12%', status: 'Scrutiny' },
  ]);

  const columns = [
    { key: 'region', header: 'Jurisdiction' },
    { key: 'type', header: 'Fiscal Category' },
    { key: 'rate', header: 'Magnitude', render: (r: any) => <span className="font-mono font-black text-zinc-900">{r.rate}</span> },
    { key: 'status', header: 'State' },
    {
      key: 'actions',
      header: 'Manual Control',
      render: (r: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
          Calibrate
        </button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Taxation Matrix</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3 italic">Manual Multi-Jurisdictional Fiscal Compliance</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Architect New Bracket</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <DataTable data={rules} columns={columns} title="Active Regional Tax Directives" />
        </div>
        <div className="space-y-8">
           <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[3.5rem] shadow-inner space-y-8">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black px-2">Tax Logic Overrides</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Export Exemption', active: true },
                   { label: 'Re-import Credit', active: false },
                   { label: 'Digital Service Levy', active: true },
                 ].map(o => (
                   <div key={o.label} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                      <span className="text-[11px] font-black text-zinc-800 uppercase tracking-tight">{o.label}</span>
                      <div className={`w-10 h-5 rounded-full relative ${o.active ? 'bg-emerald-500' : 'bg-zinc-200'}`}>
                         <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${o.active ? 'right-1' : 'left-1'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-12 -mt-12"></div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Generate Tax Report</h4>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-8">Export full fiscal history for quarterly manual reconciliation with the Global Revenue Bloc.</p>
              <button className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">Download Manifest</button>
           </div>
        </div>
      </div>
    </div>
  );
};
