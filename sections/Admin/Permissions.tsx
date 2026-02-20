
import React from 'react';
import { Role, PermissionAction } from '../../types';

export const AdminRoles: React.FC = () => {
  const roles = Object.values(Role);
  const actions = Object.values(PermissionAction);

  return (
    <div className="space-y-8 md:space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">Access Matrix</h1>
        <p className="text-zinc-500 font-bold mt-2 text-[10px] md:text-sm uppercase tracking-widest">Manual Protocol Authorization</p>
      </div>

      {/* Mobile Modular Cards */}
      <div className="md:hidden space-y-6">
        {roles.map(role => (
          <div key={role} className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
              <div className={`w-3 h-3 rounded-full ${role === Role.SUPER_ADMIN ? 'bg-zinc-900 shadow-[0_0_10px_rgba(0,0,0,0.1)]' : 'bg-zinc-200'}`}></div>
              <h3 className="font-black text-sm uppercase tracking-tight text-zinc-900">{role}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {actions.map(action => {
                const hasAccess = role === Role.SUPER_ADMIN || (role === Role.ADMIN && action !== PermissionAction.delete);
                return (
                  <div key={action} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${hasAccess ? 'bg-emerald-50 border-emerald-100/50' : 'bg-zinc-50 border-zinc-50 opacity-40'}`}>
                    <span className="text-[9px] font-black uppercase text-zinc-500 tracking-tight">{action}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${hasAccess ? 'text-emerald-500' : 'text-zinc-300'}`}>
                      {hasAccess ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="p-8 border-b border-zinc-100 font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Role Hierarchy</th>
              {actions.map(action => (
                <th key={action} className="p-8 border-b border-zinc-100 font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold text-center">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {roles.map(role => (
              <tr key={role} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="p-8 font-bold text-zinc-800 flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${role === Role.SUPER_ADMIN ? 'bg-zinc-900 shadow-[0_0_10px_rgba(0,0,0,0.15)]' : 'bg-zinc-200'}`}></div>
                  {role}
                </td>
                {actions.map(action => {
                  const hasAccess = role === Role.SUPER_ADMIN || (role === Role.ADMIN && action !== PermissionAction.delete);
                  return (
                    <td key={action} className="p-8 text-center">
                      <div className="flex justify-center">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                          hasAccess 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                            : 'bg-zinc-50 border-zinc-100 text-zinc-300'
                        }`}>
                          {hasAccess ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-black leading-tight">Security Lockdown</h3>
            <p className="text-white/40 font-bold mt-2 text-[10px] md:text-sm uppercase tracking-widest">Enforce Level-9 Authorization</p>
         </div>
         <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Update Manifest</button>
      </div>
    </div>
  );
};
