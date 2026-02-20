
import React from 'react';

export const SetLayout: React.FC = () => {
  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight">UX Interface Presets</h1>
        <p className="text-zinc-500 font-medium mt-1 italic">Configure your manual OS dashboard layout and visual accenting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Standard Ops', desc: 'Balanced 4-zone layout for general management.', icon: '🖥️' },
          { name: 'Data Intensive', desc: 'Virtualization prioritized. High-density tables.', icon: '📊' },
          { name: 'Mobile Minimal', desc: 'Collapsed sidebars. Floating action priority.', icon: '📱' },
        ].map(p => (
          <div key={p.name} className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all space-y-6 cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">{p.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-zinc-900">{p.name}</h3>
              <p className="text-zinc-400 text-sm mt-2 font-medium leading-relaxed">{p.desc}</p>
            </div>
            <button className="w-full py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Apply Preset</button>
          </div>
        ))}
      </div>
    </div>
  );
};
