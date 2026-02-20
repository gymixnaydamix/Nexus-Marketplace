
import React from 'react';

export const UserActions: React.FC = () => {
  const actions = [
    { user: 'Lia Sky', action: 'Viewed Listing: Zen Pod Villa', time: '2m ago', world: 'Real Estate' },
    { user: 'Jordan Vane', action: 'Created Promotion: "Neo-Summer"', time: '12m ago', world: 'Cars' },
    { user: 'Anonymous #283', action: 'Searched: "Fold Pro 2035"', time: '15m ago', world: 'Electronics' },
    { user: 'Mark S.', action: 'Opened Support Ticket #tk-1', time: '1h ago', world: 'General' },
    { user: 'Sarah W.', action: 'Updated Payout Schedule', time: '2h ago', world: 'Finance' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">User Behavior Feed</h1>
        <p className="text-zinc-500 font-medium">Real-time non-critical interaction tracking.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {actions.map((a, i) => (
          <div key={i} className="bg-white border border-zinc-50 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-lg shadow-inner">
                {a.user[0]}
              </div>
              <div>
                <h4 className="font-bold text-zinc-800">{a.user}</h4>
                <p className="text-sm text-zinc-500">{a.action}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                {a.world}
              </span>
              <p className="text-[10px] font-mono text-zinc-300 font-bold uppercase">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-10 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
        <button className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold hover:text-zinc-900 transition-colors">Load Historical Session Data</button>
      </div>
    </div>
  );
};
