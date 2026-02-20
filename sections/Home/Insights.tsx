
import React from 'react';

export const InsightTrends: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Macro Growth Trends</h1>
          <p className="text-zinc-500 font-medium mt-1">Predictive analysis based on manual market historicals.</p>
        </div>
        <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-600 outline-none">
          <option>Quarterly View</option>
          <option>Yearly Forecast</option>
        </select>
      </div>

      <div className="bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col gap-10">
        <div className="grid grid-cols-7 h-64 gap-4 items-end px-4">
          {[60, 80, 45, 90, 110, 85, 120].map((h, i) => (
            <div key={i} className="relative group flex flex-col items-center">
              <div 
                className="w-full bg-zinc-900 rounded-2xl hover:bg-indigo-600 transition-all cursor-pointer shadow-lg shadow-zinc-200"
                style={{ height: `${h}px` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   +{(h/10).toFixed(1)}%
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-300 font-bold uppercase mt-4">Node {i+1}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-100 pt-10">
          {[
            { label: 'Buyer Retention', value: '72%', change: '+5%' },
            { label: 'Seller Velocity', value: '4.2x', change: '+12%' },
            { label: 'Market Depth', value: '$1.2B', change: '+0.2%' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">{s.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-zinc-900">{s.value}</span>
                <span className="text-[10px] font-bold text-emerald-500">{s.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const InsightConversion: React.FC = () => {
  const steps = [
    { label: 'Discovery Feed View', value: '1.2M', desc: 'Entry point for all sessions' },
    { label: 'Product Interactions', value: '450K', desc: 'Manual clicks on listings' },
    { label: 'Cart Deployments', value: '82K', desc: 'Intent to transact' },
    { label: 'Successful Orders', value: '12K', desc: 'Finalized and paid' },
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-left-8 duration-700">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">The Conversion Funnel</h1>
        <p className="text-zinc-500 font-medium">Tracking the manual journey from discovery to acquisition.</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch gap-6 group">
            <div className="w-24 shrink-0 flex flex-col justify-center">
              <span className="text-2xl font-black text-zinc-900">{step.value}</span>
            </div>
            <div className="flex-1 bg-white border border-zinc-100 p-6 rounded-[1.5rem] shadow-sm group-hover:border-zinc-300 transition-all flex justify-between items-center">
              <div>
                <h4 className="font-bold text-zinc-800">{step.label}</h4>
                <p className="text-[10px] text-zinc-400 font-medium">{step.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-widest">Efficiency</span>
                <p className="font-black text-zinc-900 text-lg">{i === 0 ? '100' : (Math.random() * 20 + 10).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
