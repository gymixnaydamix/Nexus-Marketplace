
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const AdminCRM: React.FC = () => {
  const { activeSubItem, users, products, orders } = useApp();

  const renderContent = () => {
    switch (activeSubItem.id) {
      case 'vendor_registry':
        const vendors = users.filter(u => u.role === 'SELLER').map(v => ({
          id: v.id,
          name: v.name,
          world: v.world,
          inventory: products.filter(p => p.sellerId === v.id).length,
          revenue: orders.filter(o => o.sellerId === v.id).reduce((sum, o) => sum + o.total, 0),
          status: 'Verified'
        }));
        return (
          <>
            <div className="hidden md:block">
              <DataTable data={vendors} title="Master Vendor Registry" columns={[
                { key: 'name', header: 'Vendor Entity' },
                { key: 'world', header: 'Home Sector' },
                { key: 'inventory', header: 'Asset Count' },
                { key: 'revenue', header: 'Life-Cycle Value', render: (v: any) => `$${v.revenue.toLocaleString()}` },
                { key: 'status', header: 'Integrity State' }
              ]} />
            </div>
            <div className="md:hidden space-y-4">
              {vendors.map(v => (
                <div key={v.id} className="bg-white border border-zinc-100 rounded-[2rem] p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-zinc-900">{v.name}</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase">{v.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-zinc-50 pt-3">
                    <div>
                      <p className="text-[8px] font-mono text-zinc-400 uppercase font-bold">Assets</p>
                      <p className="text-sm font-black text-zinc-900">{v.inventory} Nodes</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-zinc-400 uppercase font-bold">L-Value</p>
                      <p className="text-sm font-black text-zinc-900">${v.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'actor_lifecycle':
        const actors = users.map(u => ({
          id: u.id,
          name: u.name,
          role: u.role,
          joinDate: '2035.01.12',
          lastActivity: '3m ago',
          integrityScore: 98
        }));
        return (
          <>
            <div className="hidden md:block">
              <DataTable data={actors} title="Actor Lifecycle Trace" columns={[
                { key: 'name', header: 'Identity' },
                { key: 'role', header: 'Clearance' },
                { key: 'joinDate', header: 'Enrollment Epoch' },
                { key: 'lastActivity', header: 'Last Pulse' },
                { key: 'integrityScore', header: 'Trust Index', render: (a: any) => <span className="font-bold text-emerald-500">{a.integrityScore}%</span> }
              ]} />
            </div>
            <div className="md:hidden space-y-4">
               {actors.map(a => (
                 <div key={a.id} className="bg-white border border-zinc-100 rounded-[2rem] p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-black text-sm">{a.name[0]}</div>
                       <div className="flex-1">
                          <h4 className="font-black text-zinc-900 text-sm leading-none mb-1">{a.name}</h4>
                          <p className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">{a.role}</p>
                       </div>
                       <span className="text-lg font-black text-emerald-500">{a.integrityScore}%</span>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-zinc-300 font-bold uppercase pt-3 border-t border-zinc-50">
                       <span>Sync: {a.joinDate}</span>
                       <span>Last Pulse: {a.lastActivity}</span>
                    </div>
                 </div>
               ))}
            </div>
          </>
        );

      case 'ops_pipelines':
        const pipes = [
          { id: 'PIPE-1', name: 'Standard Logistics', load: '64%', status: 'Nominal', nodes: 12 },
          { id: 'PIPE-2', name: 'High-Value Escrow', load: '12%', status: 'Optimal', nodes: 8 },
          { id: 'PIPE-3', name: 'Identity Validation', load: '94%', status: 'Saturated', nodes: 24 },
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {pipes.map(p => (
              <div key={p.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm space-y-5">
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-xl">🔗</div>
                   <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${p.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : p.status === 'Saturated' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>{p.status}</span>
                </div>
                <div>
                   <h4 className="font-black text-zinc-900">{p.name}</h4>
                   <p className="text-[9px] font-mono text-zinc-400 font-bold uppercase mt-1">{p.nodes} Active Matrix Nodes</p>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span className="text-zinc-300">Throughput Load</span>
                      <span className="text-zinc-900">{p.load}</span>
                   </div>
                   <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-900 rounded-full" style={{ width: p.load }}></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'backend_nodes':
        const nodes = [
          { id: 'KRNL-0', name: 'Nexus Primary', uptime: '100%', latency: '0.2ms', memory: '1.2TB / 8TB' },
          { id: 'DB-CL-1', name: 'Persistence Grid', uptime: '99.99%', latency: '1.4ms', memory: '4.5TB / 12TB' },
          { id: 'IMG-RN-5', name: 'Visual Render Cluster', uptime: '98.5%', latency: '450ms', memory: '64GB / 256GB' },
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
             {nodes.map(n => (
               <div key={n.id} className="bg-zinc-900 text-white p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
                  <div className="flex justify-between items-start mb-6">
                     <span className="font-mono text-[9px] text-white/30 font-black tracking-widest">{n.id}</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
                  </div>
                  <h4 className="font-black text-lg">{n.name}</h4>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <div>
                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest font-black">Sync Latency</p>
                        <p className="text-sm font-black font-mono text-emerald-400">{n.latency}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest font-black">Buffer Use</p>
                        <p className="text-sm font-black font-mono text-white/80">{n.memory.split('/')[0]}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        );

      default:
        return <div className="p-20 text-center text-zinc-400 font-mono text-xs uppercase tracking-widest">Select CRM Vector</div>;
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-2xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none">Management Core</h1>
          <p className="text-zinc-500 font-bold mt-1 text-[9px] md:text-sm uppercase tracking-widest">Global CRM & Infrastructure Control</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-6 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-black active:scale-95 transition-all">
              Initialize Global Sync
           </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar md:overflow-visible">
        {renderContent()}
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-inner flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
         <div className="flex items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-xl md:text-2xl shadow-sm">🧠</div>
            <div>
               <h4 className="font-black text-zinc-900 uppercase tracking-tight text-sm md:text-base">Manual Scrutiny Mode</h4>
               <p className="text-[9px] md:text-[10px] text-zinc-400 font-mono uppercase font-bold mt-1">Status: Active Override Authorized</p>
            </div>
         </div>
         <div className="flex gap-2 md:gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 md:px-5 py-2.5 border border-zinc-200 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">Re-Index DB</button>
            <button className="flex-1 md:flex-none px-4 md:px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all whitespace-nowrap">Force Purge</button>
         </div>
      </div>
    </div>
  );
};
