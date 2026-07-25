import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  TrendingUp, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Eye, 
  SlidersHorizontal 
} from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/tecnideasData';
import { PortfolioItem } from '../types';

export const PortfolioShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [showBefore, setShowBefore] = useState<boolean>(false);

  const categories = ['Todos', 'Diseño Web Corporativo', 'Tienda Virtual & IA', 'Automatización & IA', 'App Web & Menú QR'];

  const filteredItems = selectedCategory === 'Todos' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="portafolio" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom de Casos de Éxito</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Proyectos que hacen pensar: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">"Quiero la mía así"</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Explora una selección de sitios web, e-commerce y agentes de IA desarrollados por Tecnideas en Medellín y Colombia con métricas reales de crecimiento.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden shadow-2xl hover:border-blue-500/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Overlay */}
                <div className="relative h-60 overflow-hidden bg-slate-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md">
                    {item.category}
                  </span>

                  <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700">
                    {item.priceRange}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 font-mono">{item.client}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metrics Badge */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                        <span className="text-[10px] text-slate-400 block">{m.label}</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setActiveItem(item);
                    setShowBefore(false);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-700 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalle & Demostración</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Portfolio Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/30 text-blue-300 px-2.5 py-1 rounded-md border border-blue-500/30">
                {activeItem.category} • {activeItem.industry}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">Cliente: {activeItem.client}</p>
            </div>

            {/* Before vs After comparison toggle if present */}
            {activeItem.beforeImage && activeItem.afterImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Comparativa de Transformación Digital:</span>
                  <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`px-3 py-1 rounded text-[11px] font-bold ${showBefore ? 'bg-red-500 text-white' : 'text-slate-400'}`}
                    >
                      Antes
                    </button>
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`px-3 py-1 rounded text-[11px] font-bold ${!showBefore ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                    >
                      Después (Tecnideas)
                    </button>
                  </div>
                </div>

                <div className="h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                  <img
                    src={showBefore ? activeItem.beforeImage : activeItem.afterImage}
                    alt="Comparativa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 px-3 py-1 rounded-lg text-xs font-bold text-white">
                    {showBefore ? '❌ Sitio Antiguo / Lento' : '✨ Rediseño Tecnideas Premium'}
                  </div>
                </div>
              </div>
            )}

            {!activeItem.beforeImage && (
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resultados Obtenidos:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeItem.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">{m.label}</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                onClick={() => setActiveItem(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cerrar
              </button>
              <a
                href={`https://wa.me/573009128472?text=${encodeURIComponent(`Hola Tecnideas, vi su caso de éxito "*${activeItem.title}*" y me gustaría una propuesta similar para mi negocio.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <span>Quiero una solución similar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
