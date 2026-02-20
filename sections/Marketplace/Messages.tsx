
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const MarketMessages: React.FC = () => {
  const { messages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Secure Terminal</h1>
        <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-bold mt-1">Point-to-Point Encryption Active</p>
      </div>

      <div className="flex-1 bg-zinc-50 rounded-[3rem] border border-zinc-100 flex flex-col overflow-hidden shadow-inner">
        <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : msg.senderId === 'u-1' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.isSystem ? 'bg-zinc-200/50 text-zinc-500 text-[9px] font-mono uppercase tracking-widest' :
                msg.senderId === 'u-1' ? 'bg-zinc-900 text-white shadow-xl' : 'bg-white border border-zinc-100 text-zinc-800'
              }`}>
                {!msg.isSystem && <p className="text-[8px] font-mono opacity-40 mb-1">{msg.senderId === 'u-1' ? 'YOU' : 'AGENT_42'} • {new Date(msg.timestamp).toLocaleTimeString()}</p>}
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t border-zinc-100 flex gap-4">
          <input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Transmit secure signal..." 
            className="flex-1 bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-zinc-100 transition-all font-medium"
          />
          <button 
            onClick={handleSend}
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};
