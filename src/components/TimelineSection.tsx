import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  Globe, 
  Bot, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/tecnideasData';

export const TimelineSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2026+');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return <Printer className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const activeEvent = TIMELINE_EVENTS.find(e => e.year === selectedYear) || TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1];

  return (
    <section id="historia" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Nuestra Historia & Evolución Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            De Centro Tradicional de Copiado a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">HUB Tecnológico</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Explora los 29 años de trayectoria de Tecnideas en Medellín. Cómo pasamos de ser la papelería y centro de fotocopias de confianza a construir el ecosistema digital más innovador.
          </p>
        </div>

        {/* Timeline Interactive Buttons Bar */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-12 overflow-x-auto pb-4 gap-2 scrollbar-none">
          {TIMELINE_EVENTS.map((item, index) => {
            const isSelected = selectedYear === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`flex-1 min-w-[120px] p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/30 scale-105'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-mono font-bold">{item.year}</div>
                <div className="text-[10px] font-semibold truncate mt-0.5">{item.tag}</div>
                {index < TIMELINE_EVENTS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-slate-600 z-10">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Timeline Card Detailed Feature */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-800/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column - Year & Icon */}
            <div className="md:col-span-4 space-y-3 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-700 pb-6 md:pb-0 md:pr-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
                {getIcon(activeEvent.iconName)}
              </div>
              <div className="text-4xl font-black font-mono text-blue-400">{activeEvent.year}</div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider bg-slate-700/80 text-blue-300 px-2.5 py-1 rounded-lg">
                {activeEvent.tag}
              </span>
            </div>

            {/* Right Column - Title, Description, Highlight */}
            <div className="md:col-span-8 space-y-4 text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeEvent.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeEvent.description}
              </p>
              
              <div className="pt-2 flex items-center gap-2.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Impacto: {activeEvent.highlight}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Promise Footer */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-xl mx-auto">
          💡 <strong className="text-slate-200">Nuestra promesa:</strong> Evolucionamos hacia la Inteligencia Artificial y el Software, pero jamás dejamos solos a nuestros clientes de siempre en copiado, papelería e impresiones en Medellín.
        </div>

      </div>
    </section>
  );
};
