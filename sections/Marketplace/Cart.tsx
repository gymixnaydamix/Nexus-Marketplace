
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const MarketCart: React.FC = () => {
  const { cart, removeFromCart, checkoutCart, setActiveSectionById } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const networkFee = subtotal * 0.05;
  const total = subtotal + networkFee;

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2500)); // Simulate multi-node settlement
    await checkoutCart();
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700">
        <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center text-4xl shadow-2xl">✓</div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-zinc-900">Bulk Acquisition Finalized</h2>
          <p className="text-zinc-500 max-w-xs mx-auto">Assets logged to your identity. Pipeline routing initiated.</p>
        </div>
        <button 
          onClick={() => { setIsSuccess(false); setActiveSectionById('delivery'); }}
          className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest"
        >
          Track All Pipeline Nodes
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
        <div className="text-6xl">🛒</div>
        <div>
          <h3 className="text-xl font-black text-zinc-400 uppercase tracking-widest">Cart Node Empty</h3>
          <p className="text-sm font-medium mt-1">No assets nominated for discovery acquisition.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Acquisition Cart</h1>
        <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest font-bold mt-1">Multi-Asset Settlement Protocol</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white border border-zinc-100 p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-50 shrink-0 border border-zinc-50">
                <img src={item.product.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-lg text-zinc-900 truncate leading-tight">{item.product.title}</h3>
                <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold mt-1">{item.product.category} • Qty: {item.quantity}</p>
                <p className="text-xl font-black text-zinc-900 mt-2">${item.product.price.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="w-10 h-10 rounded-xl bg-zinc-50 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-8 sticky top-8">
            <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Settlement Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-white/60">
                <span>Gross Value</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-white/60">
                <span>Network Protocol Fee</span>
                <span className="text-white">${networkFee.toLocaleString()}</span>
              </div>
              <div className="h-[1px] bg-white/10 w-full"></div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Settlement</span>
                <span className="text-3xl font-black tabular-nums">${total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/10 active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Authorize Bulk acquisition</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
