
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../AppContext';
import { WORLD_CONFIG } from '../../constants';
import { Product } from '../../types';
import { ProductDetailMatrix } from './ProductDetail';
import { ModernDropdown } from '../../components/UI/ModernDropdown';
import { QuantityStepper } from '../../components/UI/QuantityStepper';

type SortRule = 'price_asc' | 'price_desc' | 'rating_desc' | 'velocity_desc';

const ProductCard: React.FC<{ product: Product; onOpen: (id: string) => void }> = ({ product, onOpen }) => {
  const { addToCart, activeWorld } = useApp();
  const theme = WORLD_CONFIG[activeWorld];
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLinking || isAdded) return;

    setIsLinking(true);
    await new Promise(r => setTimeout(r, 600));
    
    for(let i = 0; i < qty; i++) {
      addToCart(product);
    }
    
    setIsLinking(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      onClick={() => onOpen(product.id)}
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` } as any}
      className="group relative bg-white border border-zinc-100 rounded-[2.2rem] md:rounded-[2.8rem] p-3 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full active:scale-[0.98]"
    >
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="px-3 py-1 bg-black/90 backdrop-blur-xl rounded-lg border border-white/10 flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${isAdded ? 'bg-emerald-400' : 'bg-indigo-400 animate-pulse'}`}></div>
           <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest">
             {isAdded ? 'Synchronized' : 'Node Link'}
           </span>
        </div>
      </div>

      <div className="aspect-[4/5] md:aspect-square relative rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center">
        <img src={product.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
        
        {isLinking && (
          <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[2px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <div className="px-2 py-4 md:px-3 md:py-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
                <h3 className="font-black text-base md:text-xl text-zinc-900 tracking-tight leading-tight group-hover:text-zinc-800 line-clamp-2">{product.title}</h3>
            </div>
            <div className="flex items-center gap-3 mt-2">
               <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-100">
                    <span className="text-amber-500 text-[10px]">★</span>
                    <span className="text-[9px] font-black text-zinc-900">{product.sellerRating}</span>
                </div>
               <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest truncate">{product.condition}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-black text-zinc-900 font-mono opacity-30">$</span>
              <span className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter tabular-nums leading-none">
                {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-50 flex items-center gap-2">
            <QuantityStepper 
              value={qty} 
              max={product.stock} 
              onChange={setQty} 
              size="sm" 
              className="bg-zinc-50/50"
            />
            <button 
              onClick={handleQuickAdd}
              disabled={isLinking || isAdded}
              className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all duration-500 relative overflow-hidden group/btn ${
                isAdded 
                ? 'bg-emerald-500 text-white shadow-lg' 
                : 'bg-zinc-900 text-white hover:bg-black active:scale-95'
              }`}
            >
              {isAdded ? 'Linked' : 'Acquire'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MarketBrowse: React.FC = () => {
  const { products, activeWorld, activeProductId, setActiveProductId } = useApp();
  const theme = WORLD_CONFIG[activeWorld];
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortRule, setSortRule] = useState<SortRule>('rating_desc');

  const sortOptions = [
    { value: 'rating_desc', label: 'High Integrity', icon: '★' },
    { value: 'price_asc', label: 'Value Entry', icon: '📉' },
    { value: 'price_desc', label: 'Premium Tier', icon: '📈' },
    { value: 'velocity_desc', label: 'High Velocity', icon: '⚡' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesWorld = p.world === activeWorld;
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const matchesCondition = selectedConditions.length > 0 ? selectedConditions.includes(p.condition) : true;
      const matchesRating = p.sellerRating >= minRating;
      return matchesWorld && matchesCategory && matchesPrice && matchesCondition && matchesRating;
    });

    result.sort((a, b) => {
      switch (sortRule) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating_desc': return b.sellerRating - a.sellerRating;
        case 'velocity_desc': return b.stock - a.stock;
        default: return 0;
      }
    });
    return result;
  }, [products, activeWorld, selectedCategory, priceRange, selectedConditions, minRating, sortRule]);

  if (activeProductId) {
    return <ProductDetailMatrix productId={activeProductId} />;
  }

  const CategoryList = ({ className = "" }) => (
    <div className={`flex gap-2 overflow-x-auto no-scrollbar shrink-0 ${className}`}>
      <button 
        onClick={() => setSelectedCategory(null)}
        className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl whitespace-nowrap text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
          selectedCategory === null 
            ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
            : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'
        }`}
      >
        All Clusters
      </button>
      {theme.categories.map((cat, i) => (
        <button 
          key={i} 
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl whitespace-nowrap text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
            selectedCategory === cat 
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
              : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 text-zinc-900 h-full flex flex-col pb-20 md:pb-0">
      
      {/* Redundant page headers removed, keeping only tactical tools */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 md:gap-8 border-b border-zinc-50 pb-6">
        <CategoryList className="hidden md:flex flex-1" />
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
          <ModernDropdown 
            options={sortOptions}
            value={sortRule}
            onChange={(val) => setSortRule(val as SortRule)}
            className="w-full sm:w-56"
          />

          <button 
            onClick={() => setIsFilterPanelOpen(true)}
            className="px-6 py-4 bg-zinc-900 text-white rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-black active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4" /></svg>
            Refine Matrix
          </button>
        </div>

        <CategoryList className="md:hidden pb-2 w-full" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 pb-32">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={setActiveProductId} />
          ))}
          {filteredAndSortedProducts.length === 0 && (
            <div className="col-span-full py-40 text-center flex flex-col items-center justify-center space-y-6">
               <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-zinc-100">📡</div>
               <div>
                  <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Signal Interrupted</h3>
                  <p className="text-zinc-400 font-medium max-w-sm mx-auto mt-2 italic">Refine constraints to resume discovery.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex justify-end">
          <aside className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div>
                <h3 className="font-black text-xl uppercase tracking-tighter text-zinc-900">Constraint Hub</h3>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black mt-1">Matrix Calibration</p>
              </div>
              <button onClick={() => setIsFilterPanelOpen(false)} className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center active:scale-90 transition-all">×</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Value Vector ($)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-300 font-black uppercase px-1">Floor</span>
                    <input 
                      type="number" 
                      value={priceRange.min}
                      onChange={e => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-sm font-black text-zinc-900 focus:ring-4 focus:ring-zinc-100 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-300 font-black uppercase px-1">Ceiling</span>
                    <input 
                      type="number" 
                      value={priceRange.max}
                      onChange={e => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-sm font-black text-zinc-900 focus:ring-4 focus:ring-zinc-100 outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">State Logic</h4>
                <div className="grid grid-cols-1 gap-2">
                  {['New Epoch', 'Certified Refurb', 'Legacy Tech'].map(cond => (
                    <button 
                      key={cond}
                      onClick={() => setSelectedConditions(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond])}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                        selectedConditions.includes(cond) 
                          ? 'bg-zinc-900 text-white border-zinc-900' 
                          : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-200'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{cond}</span>
                      {selectedConditions.includes(cond) && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Integrity Threshold</h4>
                <div className="flex justify-between px-2 bg-zinc-50 p-6 rounded-2xl">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setMinRating(star)} 
                      className={`text-3xl transition-all duration-300 transform active:scale-75 ${minRating >= star ? 'text-amber-400 scale-110' : 'text-zinc-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-zinc-100 bg-zinc-50/50">
              <button 
                onClick={() => setIsFilterPanelOpen(false)}
                className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black active:scale-95 transition-all"
              >
                Apply Constraints
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
