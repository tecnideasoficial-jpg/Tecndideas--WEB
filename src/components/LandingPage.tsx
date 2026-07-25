import React from 'react';
import { 
  Sparkles, 
  Globe, 
  Printer, 
  Building2, 
  Calculator, 
  ArrowRight, 
  Bot, 
  ShoppingBag, 
  Users, 
  Search, 
  FileCheck, 
  ShieldCheck, 
  Scan, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Star,
  Zap,
  Award
} from 'lucide-react';
import { Hero } from './Hero';
import { CapacitacionSection } from './CapacitacionSection';
import { ClientSegment } from '../types';
import { useAdminData } from '../context/AdminDataContext';

interface LandingPageProps {
  onNavigatePage: (pageId: string) => void;
  onOpenAIAgent: () => void;
  currentSegment: ClientSegment | 'all';
  onSelectSegment: (segment: ClientSegment | 'all') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigatePage,
  onOpenAIAgent,
  currentSegment,
  onSelectSegment,
}) => {
  const { solutionPillars } = useAdminData();

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Printer': return <Printer className="w-7 h-7" />;
      case 'Building2': return <Building2 className="w-7 h-7" />;
      case 'Zap': return <Zap className="w-7 h-7" />;
      case 'Sparkles': return <Sparkles className="w-7 h-7" />;
      default: return <Globe className="w-7 h-7" />;
    }
  };

  const getPillarTheme = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          glow: 'bg-purple-500/10 group-hover:bg-purple-500/20',
          iconBg: 'bg-purple-600/10 dark:bg-purple-500/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
          badgeBg: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
          titleHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
          checkColor: 'text-purple-500',
          buttonBg: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25'
        };
      case 'emerald':
        return {
          glow: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
          iconBg: 'bg-emerald-600/10 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
          badgeBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          titleHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
          checkColor: 'text-emerald-500',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
        };
      case 'amber':
        return {
          glow: 'bg-amber-500/10 group-hover:bg-amber-500/20',
          iconBg: 'bg-amber-600/10 dark:bg-amber-500/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
          badgeBg: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          titleHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
          checkColor: 'text-amber-500',
          buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25'
        };
      default: // blue
        return {
          glow: 'bg-blue-500/10 group-hover:bg-blue-500/20',
          iconBg: 'bg-blue-600/10 dark:bg-blue-500/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
          badgeBg: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          titleHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
          checkColor: 'text-blue-500',
          buttonBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
        };
    }
  };
  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* 1. High Impact Hero */}
      <Hero
        onOpenCalculator={() => onNavigatePage('cotizador')}
        onOpenAIAgent={onOpenAIAgent}
        onSelectSegment={onSelectSegment}
      />

      {/* 2. Core Category Showcase (Landing Cards with High Conversion CTAs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Nuestras 3 Áreas de Especialización</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Estructuración de Soluciones Tecnideas 360°
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Selecciona la categoría que necesitas explorar para ver detalles completos, precios estimados y asesoría personalizada.
          </p>
        </div>

        {/* Main Category Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutionPillars.map((pillar) => {
            const theme = getPillarTheme(pillar.color);
            return (
              <div
                key={pillar.id}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${theme.glow} rounded-full blur-2xl transition-all`} />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {getPillarIcon(pillar.iconName)}
                    </div>
                    {pillar.tag && (
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${theme.badgeBg} px-3 py-1 rounded-full border`}>
                        {pillar.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`text-2xl font-black text-slate-900 dark:text-white ${theme.titleHover} transition-colors`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {pillar.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${theme.checkColor} shrink-0`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 relative z-10">
                  <button
                    onClick={() => onNavigatePage(pillar.targetPage || 'digital')}
                    className={`w-full py-3.5 px-5 rounded-2xl ${theme.buttonBg} text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer group-hover:gap-3`}
                  >
                    <span>{pillar.buttonText || 'Explorar Área'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. High-Conversion Cotizador Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Herramienta Interactiva 100% Transparente</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Simula tu Inversión en 60 Segundos con nuestro Cotizador Inteligente
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Selecciona tus módulos requeridos (Web, Tienda Wompi, Bot IA, Trámites o Workspace) y obtén un presupuesto preliminar instantáneo con desglose detallado y recomendación estratégica.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Precios claros en COP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sin compromisos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exportable a WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigatePage('cotizador')}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Abrir Cotizador Completo</span>
              </button>
              
              <a
                href="https://wa.me/573024171818?text=Hola%20Tecnideas,%20quiero%20cotizar%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Hablar con un Asesor (+57 302 417 1818)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Capacitación & Canal YouTube (Cursos, Talleres y Demostraciones) */}
      <CapacitacionSection />

      {/* 6. Credibility & History Highlight (29 Years) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-200 dark:border-amber-800">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>29+ Años de Evolución e Innovación</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Desde 1995 apoyando el crecimiento empresarial de Medellín
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Nacimos como un centro de soluciones de oficina y litografía tradicional. Hoy nos consolidamos como un HUB Tecnológico 360° combinando Inteligencia Artificial, desarrollo web de alto nivel, coworking sustentable y servicios al ciudadano.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-black text-blue-600 dark:text-blue-400">29+</span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Años de Exp.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">1,500+</span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Proyectos Web</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">99%</span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Satisfacción</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-950 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>¿Por qué elegir Tecnideas HUB?</span>
            </h4>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Solución Integral 360°:</strong> Todo en un solo proveedor (Web, IA, Impresión, Coworking).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Sede Física en Medellín:</strong> Oficina en Barrio Castilla (CRA 68 No. 96 78) para atención presencial rápida.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Acompañamiento Directo:</strong> Asesoría personalizada por WhatsApp o cita en persona.</span>
              </li>
            </ul>

            <button
              onClick={() => onNavigatePage('portafolio')}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors cursor-pointer mt-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Ver Showroom de Casos Reales</span>
            </button>
          </div>

        </div>
      </section>

      {/* 7. Quick Direct Contact Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Sede Física Medellín • Barrio Castilla (CRA 68 No. 96 78)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Atención presencial de Lunes a Sábado. Atención digital 24/7 con Agente IA.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigatePage('contacto')}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Ubicación & Horarios
            </button>
            <a
              href="https://wa.me/573024171818"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
