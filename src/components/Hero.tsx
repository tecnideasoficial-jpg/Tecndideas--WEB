import React, { useState } from 'react';
import { TecnideasLogoIcon } from './TecnideasLogo';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Clock, 
  Building2, 
  Award,
  Globe,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/tecnideasData';
import { ClientSegment } from '../types';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenAIAgent: () => void;
  onSelectSegment: (segment: ClientSegment) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onOpenAIAgent,
  onSelectSegment
}) => {
  const [activeTabDemo, setActiveTabDemo] = useState<'web' | 'bot' | 'hub'>('web');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
              <TecnideasLogoIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Más de 29 Años en Medellín • Centro Tradicional & HUB de IA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-sans leading-[1.1]">
              Transformamos negocios tradicionales en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                empresas digitales con IA
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              En <strong className="text-slate-900 dark:text-white font-bold">Tecnideas</strong> unimos la solidez de un centro de servicios tradicional con 29 años de historia en Medellín con el desarrollo web de agencia premium, automatización de WhatsApp, CRM e Inteligencia Artificial.
            </p>

            {/* Segment Shortcuts */}
            <div className="pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                ¿Cuál es tu objetivo hoy? Elige tu perfil:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <button
                  onClick={() => onSelectSegment('emprendedor')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
                >
                  🚀 Soy Emprendedor
                </button>
                <button
                  onClick={() => onSelectSegment('empresa')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
                >
                  🏢 Tengo una Empresa
                </button>
                <button
                  onClick={() => onSelectSegment('tramites')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
                >
                  📄 Trámites / Copiado
                </button>
                <button
                  onClick={() => onSelectSegment('workspace')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
                >
                  💼 Workspace & Coworking
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Quiero transformar mi negocio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#portafolio"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Ver nuestros proyectos</span>
              </a>

              <button
                onClick={onOpenAIAgent}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                <span>Asistente IA</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 dark:border-slate-800/80 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">29+ Años de Garantía</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Respuesta en minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Sede Física en Medellín</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Ecosistema Showroom Card */}
          <div className="lg:col-span-5 relative">
            {/* Glowing card border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-30 dark:opacity-50 animate-pulse" />
            
            <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-2xl space-y-4">
              
              {/* Card Header & Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-slate-400 ml-1">tecnideas.com.co/ecosistema</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                  En Vivo
                </span>
              </div>

              {/* Showroom Interactive Mode Switcher */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActiveTabDemo('web')}
                  className={`py-1.5 px-2 rounded-lg transition-all ${
                    activeTabDemo === 'web' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Web Premium
                </button>
                <button
                  onClick={() => setActiveTabDemo('bot')}
                  className={`py-1.5 px-2 rounded-lg transition-all ${
                    activeTabDemo === 'bot' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Agente IA
                </button>
                <button
                  onClick={() => setActiveTabDemo('hub')}
                  className={`py-1.5 px-2 rounded-lg transition-all ${
                    activeTabDemo === 'hub' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  HUB & Copiado
                </button>
              </div>

              {/* Showroom View Content */}
              <div className="rounded-xl overflow-hidden bg-slate-900 text-white p-4 min-h-[260px] flex flex-col justify-between relative">
                
                {activeTabDemo === 'web' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="font-mono text-blue-400">Design System: Stripe & Vercel</span>
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px]">99.8% Speed Score</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-800 rounded-md w-3/4 animate-pulse" />
                      <div className="h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-between px-3 text-xs font-bold">
                        <span>Página Web Corporativa</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Desde $999.000 COP</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Layouts responsivos, animaciones fluidas, integrados con WhatsApp y optimizados para Google en Colombia.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                        <span className="text-slate-400 block text-[9px]">Carga Inicial</span>
                        <span className="text-emerald-400 font-bold font-mono">0.4 Segundos</span>
                      </div>
                      <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                        <span className="text-slate-400 block text-[9px]">Integraciones</span>
                        <span className="text-blue-400 font-bold font-mono">Wompi / PayU / CRM</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabDemo === 'bot' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-bold text-emerald-400">WhatsApp IA Conectado</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Atención 24/7</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="bg-slate-800 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-slate-200">
                        👋 ¡Hola! Soy el Agente IA de tu negocio. ¿Deseas agendar una cita o conocer los precios de la página web?
                      </div>
                      <div className="bg-blue-600 p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[80%] text-white text-right">
                        Quiero cotizar una tienda virtual con pagos en Colombia.
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-slate-200">
                        ¡Perfecto! Te sugiero nuestro E-commerce con Wompi y Addi. El costo aproximado es $1.850.000 COP. ¿Quieres agendar?
                      </div>
                    </div>
                  </div>
                )}

                {activeTabDemo === 'hub' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="font-mono text-purple-400">Centro Tradicional & HUB</span>
                      <span className="text-[10px] text-emerald-400">Abierto Hoy en Medellín</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                        <p className="font-bold text-blue-400">Fotocopias & Impresiones</p>
                        <p className="text-[10px] text-slate-300 mt-1">Impresión masiva USB/Email con entrega express.</p>
                      </div>
                      <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                        <p className="font-bold text-indigo-400">Pasaportes & Visas</p>
                        <p className="text-[10px] text-slate-300 mt-1">Citas Gobernación de Antioquia y formularios.</p>
                      </div>
                      <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                        <p className="font-bold text-purple-400">Workspace & Salas</p>
                        <p className="text-[10px] text-slate-300 mt-1">Coworking con internet dedicado 300 Mbps.</p>
                      </div>
                      <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                        <p className="font-bold text-amber-400">Capacitación IA</p>
                        <p className="text-[10px] text-slate-300 mt-1">Cursos presenciales para emprendedores.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Showroom Footer Trigger */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">¿Quieres ver esta tecnología en tu negocio?</span>
                  <button
                    onClick={onOpenCalculator}
                    className="text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer text-xs"
                  >
                    Simular mi proyecto →
                  </button>
                </div>
              </div>

              {/* Testimonial Quote Pill */}
              <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-900/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  29y
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic font-medium">
                  "Si esta es la página de Tecnideas, quiero que hagan la mía con el mismo nivel de innovación."
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Animated Statistics Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">{COMPANY_INFO.stats.years}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Años de Trayectoria</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">{COMPANY_INFO.stats.projects}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Proyectos Digitales</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{COMPANY_INFO.stats.tramites}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Trámites Realizados</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">{COMPANY_INFO.stats.automations}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Automatizaciones IA</p>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-1">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{COMPANY_INFO.stats.students}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Alumnos Capacitados</p>
          </div>
        </div>

      </div>
    </section>
  );
};
