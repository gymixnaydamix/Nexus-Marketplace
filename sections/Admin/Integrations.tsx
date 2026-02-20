
import React from 'react';

export const AdminIntegrations: React.FC = () => {
  const integrations = [
    { name: 'DHL-2035 Logistics', status: 'Linked', latency: '4ms', uptime: '99.99%' },
    { name: 'Stable-USD Gateway', status: 'Linked', latency: '12ms', uptime: '100%' },
    { name: 'Global Identity Vault', status: 'Manual Sync Required', latency: '--', uptime: '98.5%' },
    { name: 'Sky-Net Drone Relays', status: 'Degraded', latency: '240ms', uptime: '92.1%' },
  ];

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight">External Link Matrix</h1>
        <p className="text-zinc-500 font-medium mt-1 italic">Manual oversight of out-of-core connectivity protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {integrations.map(int => (
          <div key={int.name} className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all space-y-6">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl shadow-inner">🔌</div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                int.status === 'Linked' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {int.status}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black">{int.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Latency</p>
                  <p className="text-sm font-black font-mono">{int.latency}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Uptime (30d)</p>
                  <p className="text-sm font-black font-mono">{int.uptime}</p>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Manual Diagnostic</button>
          </div>
        ))}
      </div>
    </div>
  );
};
