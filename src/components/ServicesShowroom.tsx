import React, { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Bot, 
  Users, 
  Search, 
  Code, 
  Printer, 
  FileCheck, 
  Scan, 
  Check, 
  ArrowRight, 
  Sparkles, 
  PhoneCall,
  ShieldAlert,
  Info,
  Lock,
  Building2,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { TRADITIONAL_SERVICES, ECOSISTEMA_SERVICES } from '../data/tecnideasData';
import { ServiceItem, ClientSegment } from '../types';
import { useAdminData } from '../context/AdminDataContext';

interface ServicesShowroomProps {
  currentSegment: ClientSegment | 'all';
  onOpenCalculator: () => void;
  onOpenAIAgent: () => void;
  activeTab?: 'digital' | 'tradicional' | 'ecosistema';
  onTabChange?: (tab: 'digital' | 'tradicional' | 'ecosistema') => void;
}

export const ServicesShowroom: React.FC<ServicesShowroomProps> = ({
  currentSegment,
  onOpenCalculator,
  onOpenAIAgent,
  activeTab: externalActiveTab,
  onTabChange
}) => {
  const { digitalServices, isAdmin, openAdminPanel, openAuthModal } = useAdminData();
  const [internalActiveTab, setInternalActiveTab] = useState<'digital' | 'tradicional' | 'ecosistema'>('digital');
  
  const activeTab = externalActiveTab || internalActiveTab;
  const setActiveTab = (tab: 'digital' | 'tradicional' | 'ecosistema') => {
    setInternalActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const displayedDigitalServices = digitalServices && digitalServices.length > 0 ? digitalServices : [];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Users': return <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Search': return <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Printer': return <Printer className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Scanner': return <Scan className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  const displayedServices = 
    activeTab === 'digital' 
      ? displayedDigitalServices 
      : activeTab === 'tradicional' 
      ? TRADITIONAL_SERVICES 
      : ECOSISTEMA_SERVICES;

  const handleWhatsAppQuote = (serviceName: string) => {
    const text = `Hola Tecnideas, me interesa obtener información y cotizar el servicio: *${serviceName}*. ¿Me podrían brindar asesoría?`;
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="servicios" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Portafolio Completo de Soluciones 360°</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Nuestras 3 Áreas de Especialización
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Explora nuestras especialidades: Servicios Digitales con IA, Centro Tradicional & Trámites, y Ecosistema HUB Tecnideas.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'digital'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Servicios Digitales & IA</span>
            </button>

            <button
              onClick={() => setActiveTab('tradicional')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'tradicional'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Centro Tradicional & Trámites</span>
            </button>

            <button
              onClick={() => setActiveTab('ecosistema')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ecosistema'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Ecosistema Tecnideas 360°</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-white dark:bg-slate-900 border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                service.popular
                  ? 'border-blue-500/80 dark:border-blue-500/80 ring-1 ring-blue-500/20'
                  : 'border-slate-200/90 dark:border-slate-800/90 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              {service.badge && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  {service.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono font-bold">
                      {service.priceStart}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-700 dark:text-slate-200 font-semibold block mb-0.5">Ideal para:</strong>
                  {service.idealFor}
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Incluye:</p>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ver Detalle</span>
                </button>
                <button
                  onClick={() => handleWhatsAppQuote(service.title)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Cotizar</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Floating Call to Action */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">¿Necesitas una combinación personalizada de servicios?</h3>
            <p className="text-xs text-slate-300">Usa nuestro cotizador interactivo o habla con nuestro Agente de IA para armar tu paquete a la medida.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenCalculator}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Probar Cotizador
            </button>
            <button
              onClick={onOpenAIAgent}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>Consultar a la IA</span>
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md">
                {selectedService.category === 'digital' ? 'Servicio Digital & IA' : 'Servicio Tradicional'}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {selectedService.title}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-mono font-bold">
                Inversión estimada: {selectedService.priceStart}
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                ¿Qué incluye exactamente este servicio?
              </h4>
              <div className="space-y-1.5">
                {selectedService.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleWhatsAppQuote(selectedService.title);
                  setSelectedService(null);
                }}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              >
                Solicitar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
