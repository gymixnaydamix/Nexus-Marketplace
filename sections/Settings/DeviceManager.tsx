
import React from 'react';

export const DeviceManager: React.FC = () => {
  const devices = [
    { name: 'Nexus Primary Node', location: 'California, US', status: 'Current Session', icon: '💻' },
    { name: 'Nexus Mobile Terminal', location: 'Tokyo, JP', status: 'Active 2h ago', icon: '📱' },
    { name: 'Legacy Workstation', location: 'Berlin, DE', status: 'Inactive', icon: '🖥️' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div>
        <h1 className="text-4xl font-black tracking-tight leading-none text-zinc-900 uppercase">Hardware Linkages</h1>
        <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual oversight of authorized identity entry points.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black px-2">Authorized Clusters</h3>
          {devices.map((d, i) => (
            <div key={i} className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm flex items-center justify-between group hover:border-zinc-300 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">{d.icon}</div>
                <div>
                   <h4 className="font-black text-lg text-zinc-800">{d.name}</h4>
                   <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold mt-1">{d.location}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${d.status === 'Current Session' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-zinc-50 text-zinc-400'}`}>
                  {d.status}
                </span>
                {d.status !== 'Current Session' && (
                  <button className="block mt-2 text-[8px] font-black uppercase text-rose-500 hover:text-rose-700 underline decoration-rose-200">Revoke Link</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-[3.5rem] shadow-inner space-y-10">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Credential Hardening</h3>
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-black text-zinc-800 uppercase text-sm">Alpha-Numeric Passphrase</p>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Last rotated 45 epoch cycles ago</p>
                    </div>
                    <button className="px-5 py-2 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Rotate</button>
                 </div>
                 <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                       <p className="font-black text-zinc-800 uppercase text-sm">Secondary Biometric Auth</p>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">L9 Clearance Override Active</p>
                    </div>
                    <div className="w-14 h-7 bg-emerald-500 rounded-full relative shadow-inner">
                       <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-zinc-900 text-white p-12 rounded-[4.5rem] shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] -mr-32 -mt-32"></div>
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                 <h4 className="text-2xl font-black uppercase tracking-tighter">Protocol Zero Entry</h4>
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed">Instantly purge all active session manifests across the global cluster and revert to primary hardware key only. This action is irreversible for the next 24 hours.</p>
              <button className="w-full py-6 bg-rose-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-rose-700 transition-all active:scale-95">Enable Lockdown Manifest</button>
           </div>
        </div>
      </div>
    </div>
  );
};
