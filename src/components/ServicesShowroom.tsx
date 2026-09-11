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
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Crown,
  Gift
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanSubscription = (planName: string, price: number, cycle: 'monthly' | 'annual') => {
    const cycleText = cycle === 'annual' ? 'Facturación Anual con 25% OFF' : 'Facturación Mensual';
    const text = `¡Hola Tecnideas! Deseo comenzar con el *${planName}* ($${price} USD/mes - ${cycleText}). ¿Me indican los pasos para activar mi cuenta y acceder al Hub?`;
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

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
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800/50 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Evolución Tecnideas • Suite Digital Todo-en-Uno</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Deja de pagar 5+ herramientas por separado: Todo tu negocio digital en un solo Hub mensual.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Accede a plantillas web de alta conversión listas para vender, simuladores financieros para tomar el control de tu dinero, y un asistente de Inteligencia Artificial para tus anuncios y ventas. Sin agencias caras, sin código y sin suscripciones aisladas.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Acceso inmediato a plantillas
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline select-none">•</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Sin contratos de permanencia
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline select-none">•</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Actualizaciones continuas incluidas
            </span>
          </div>
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

        {/* Pricing Hub & La Regla de Oro Tecnideas */}
        <div className="mt-20 pt-16 border-t border-slate-200/90 dark:border-slate-800/90 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800/50 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Inversión Clara y Transparente</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Un precio honesto que se paga solo desde el primer mes
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Sin contratos de permanencia, sin costos ocultos de configuración y con acceso permanente a cada nueva herramienta que lancemos.
            </p>

            {/* Billing Toggle Switcher */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/70 dark:border-slate-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Pago Mensual Flexible
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Pago Anual</span>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full font-mono transition-colors ${
                    billingCycle === 'annual'
                      ? 'bg-white text-blue-900'
                      : 'bg-emerald-500 text-slate-950'
                  }`}>
                    -25% OFF
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Plan Impulso */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                
                {/* Header info */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Nivel Inicial</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Plan Impulso {billingCycle === 'annual' ? 'Anual' : 'Mensual'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Ideal para emprendedores que están comenzando y necesitan validar su presencia web y controlar sus finanzas.
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-y border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ${billingCycle === 'annual' ? '14' : '19'}
                    </span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">USD / mes</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {billingCycle === 'annual' ? 'Facturación anual ($168 USD/año)' : 'Facturación mensual'}
                      </p>
                    </div>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      ✓ Ahorras $60 USD al año con pago anual
                    </p>
                  )}
                </div>

                {/* Recommended For Box */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs">
                  <strong className="text-slate-800 dark:text-slate-200 block font-semibold mb-0.5">
                    Recomendado para:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300">
                    Emprendedores individuales y profesionales independientes
                  </span>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 pt-1">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Beneficios Incluidos:
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Acceso al Módulo Web con todas las plantillas activas</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>1 Sitio Web o Landing Page activa con tu propio dominio</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Módulo de Finanzas: Simulador de punto de equilibrio y flujo</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Módulo IA: 30 generaciones de copy publicitario al mes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Hosting ultrarrápido y certificado SSL de seguridad incluido</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Soporte técnico por correo y guías en video</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Actualizaciones mensuales de plantillas sin costo</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-slate-400 dark:text-slate-500 line-through opacity-70">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Módulo IA ilimitado (Exclusivo Suite Total)</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-slate-400 dark:text-slate-500 line-through opacity-70">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Acceso prioritario al Módulo POS (Exclusivo Suite Total)</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-slate-400 dark:text-slate-500 line-through opacity-70">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Soporte directo 1-a-1 por WhatsApp (Exclusivo Suite Total)</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handlePlanSubscription('Plan Impulso', billingCycle === 'annual' ? 14 : 19, billingCycle)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Comenzar con Plan Impulso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Cancela en cualquier momento • Soporte directo en español
                </p>
              </div>

            </div>

            {/* Plan Suite Total (Recomendado) */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-blue-500/10 dark:shadow-blue-950/40 hover:shadow-2xl transition-all duration-300 bg-gradient-to-b from-blue-50/30 via-white to-white dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900">
              
              {/* Badge Top */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] sm:text-xs font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 tracking-wide">
                <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>El Más Elegido por PyMEs</span>
              </div>

              <div className="space-y-6">
                
                {/* Header info */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Ecosistema Completo</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Plan Suite Total (Recomendado)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    El ecosistema completo sin restricciones. Todo lo que tu negocio necesita hoy y en el futuro en una sola cuenta.
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-y border-blue-100 dark:border-blue-900/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ${billingCycle === 'annual' ? '21' : '29'}
                    </span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">USD / mes</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {billingCycle === 'annual' ? 'Facturación anual ($252 USD/año)' : 'Facturación mensual'}
                      </p>
                    </div>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      ✓ Ahorras $96 USD al año con pago anual (-25% OFF)
                    </p>
                  )}
                </div>

                {/* Recommended For Box */}
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/60 text-xs">
                  <strong className="text-blue-900 dark:text-blue-300 block font-semibold mb-0.5">
                    Recomendado para:
                  </strong>
                  <span className="text-slate-700 dark:text-slate-200">
                    PyMEs, comercios locales y negocios en fase de crecimiento
                  </span>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 pt-1">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Beneficios Incluidos:
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold">Acceso ILIMITADO a todas las plantillas web interactivas</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Hasta 3 Sitios Web o Landing Pages activas simultáneas</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Módulo de Finanzas Completo: Simuladores de ROI, márgenes y caja</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-blue-700 dark:text-blue-300">Módulo IA Creativa ILIMITADO (Anuncios, Guiones WhatsApp, Posts)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Pase VIP para el Módulo POS & Gestión (Acceso a betas y lanzamientos)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Conexión ilimitada a dominios propios</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Hosting premium con respaldo diario automático</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Soporte prioritario directo vía WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold">NUEVAS herramientas y mini-apps añadidas cada mes sin pagar más</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-blue-100 dark:border-blue-900/50 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handlePlanSubscription('Plan Suite Total (Recomendado)', billingCycle === 'annual' ? 21 : 29, billingCycle)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Acceder a Todo el Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Cancela en cualquier momento • Soporte directo en español
                </p>
              </div>

            </div>

          </div>

          {/* La Regla de Oro Tecnideas Callout */}
          <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Principio de Valor Continuo</span>
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  La Regla de Oro Tecnideas: Todo lo nuevo se incluye sin costo extra
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                  Cuando compras software tradicional, al año siguiente te obligan a pagar por la &apos;versión 2&apos; o te cobran cada módulo nuevo como un add-on costoso. Con tu suscripción a Tecnideas Hub, cada nueva plantilla web, actualización del motor de IA o módulo operativo (como el POS) queda automáticamente habilitado en tu panel de control mientras mantengas tu suscripción activa.
                </p>
              </div>

              {/* Secondary Options: Cotizador & AI Assistant */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Probar Cotizador a Medida</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenAIAgent}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Consultar a la IA Tecnideas</span>
                </button>
              </div>
            </div>
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
