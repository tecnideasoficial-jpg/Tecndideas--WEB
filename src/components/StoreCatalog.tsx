import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Check, 
  Filter, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  Box, 
  Layers,
  Lock,
  Edit3
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { StoreItem } from '../types';

export const StoreCatalog: React.FC = () => {
  const { storeItems, categories, isAdmin, openAdminPanel, openAuthModal } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  const filteredItems = selectedCategory === 'todos'
    ? storeItems
    : storeItems.filter(item => item.category === selectedCategory);

  const handleOrderWhatsApp = (itemName: string, price: number) => {
    const text = `Hola Tecnideas, me interesa comprar/adquirir en la Tienda el producto/servicio: *${itemName}* por $${price.toLocaleString()} COP. ¿Cómo procedo con el pago?`;
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="tienda" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Tienda Tecnideas 360°</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Soluciones digitales y físicas listas para adquirir
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Adquiere impresiones, trámites, licencias de IA, accesorios de tecnología, papelería y desarrollo web con atención personalizada.
          </p>
        </div>

        {/* Dynamic Categories Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-md border border-slate-700">
                    ${item.price.toLocaleString()} COP
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {item.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Detalles
                </button>
                <button
                  onClick={() => handleOrderWhatsApp(item.name, item.price)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md shadow-blue-500/20"
                >
                  Comprar / Cotizar
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
            >
              ✕
            </button>

            {selectedItem.imageUrl && (
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                {selectedItem.badge && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {selectedItem.badge}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                Tienda Tecnideas
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedItem.name}</h3>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                ${selectedItem.price.toLocaleString()} COP
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">{selectedItem.description}</p>

            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Características & Beneficios:</p>
              {selectedItem.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleOrderWhatsApp(selectedItem.name, selectedItem.price);
                  setSelectedItem(null);
                }}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              >
                Comprar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
