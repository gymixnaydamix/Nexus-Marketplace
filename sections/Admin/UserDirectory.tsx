
import React from 'react';
import { useApp } from '../../AppContext';
import { Role } from '../../types';
import { DataTable } from '../../components/UI/DataTable';
import { ModernDropdown } from '../../components/UI/ModernDropdown';

export const AdminUsers: React.FC = () => {
  const { users, updateUserRole } = useApp();

  const roleOptions = Object.values(Role).map(r => ({
    value: r,
    label: r.replace('_', ' '),
    description: `Level ${r === Role.SUPER_ADMIN ? '9' : r === Role.ADMIN ? '7' : '2'} Clearance`
  }));

  const columns = [
    { key: 'name', header: 'Authorized User' },
    { key: 'email', header: 'Communications' },
    { 
      key: 'world', 
      header: 'Assigned Sector',
      render: (u: any) => (
        <span className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-widest border border-zinc-200/50">
          {u.world}
        </span>
      )
    },
    { 
      key: 'role', 
      header: 'Clearance Level',
      render: (u: any) => (
        <ModernDropdown 
          options={roleOptions}
          value={u.role}
          onChange={(val) => updateUserRole(u.id, val as Role)}
          className="w-56"
        />
      )
    }
  ];

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Enroll New Entity</button>
      </div>

      <div className="md:hidden space-y-4">
        {users.map(user => (
          <div key={user.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm space-y-6 animate-in slide-in-from-bottom-3">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[1.5rem] bg-zinc-900 text-white flex items-center justify-center font-black text-xl shadow-2xl shrink-0">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-base text-zinc-900 truncate leading-none mb-1">{user.name}</h3>
                <p className="text-[10px] font-mono text-zinc-400 font-bold truncate">{user.email}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                {user.world}
              </span>
            </div>

            <div className="pt-6 border-t border-zinc-50">
              <ModernDropdown 
                label="Authorization Protocol"
                options={roleOptions}
                value={user.role}
                onChange={(val) => updateUserRole(user.id, val as Role)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block flex-1 min-h-0">
        <DataTable data={users} columns={columns} title="Identity Matrix Matrix" />
      </div>
    </div>
  );
};
