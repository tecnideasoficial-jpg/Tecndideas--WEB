import React, { useState, useRef, useEffect } from 'react';
import { TecnideasLogoIcon } from './TecnideasLogo';
import { 
  Sparkles, 
  ChevronDown, 
  Phone, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Bot, 
  Calculator, 
  Globe, 
  ShoppingBag, 
  Users, 
  Search, 
  Printer, 
  FileCheck, 
  Scan, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  ArrowRight,
  Code,
  Lock
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAIAgent: () => void;
  onOpenCalculator: () => void;
  currentPage?: string;
  onNavigatePage?: (pageId: string) => void;
  onNavigateService?: (category: 'digital' | 'tradicional' | 'ecosistema', serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAIAgent,
  onOpenCalculator,
  currentPage = 'home',
  onNavigatePage,
  onNavigateService
}) => {
  const { digitalServices, isAdmin, openAdminPanel, openAuthModal } = useAdminData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'digital' | 'tradicional' | 'ecosistema' | null>(null);
  
  // Timeout for smooth hover transition on desktop
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (category: 'digital' | 'tradicional' | 'ecosistema') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const dynamicDigitalMenu = digitalServices && digitalServices.length > 0
    ? digitalServices.map(srv => ({
        title: srv.title,
        desc: srv.description || srv.idealFor || 'Solución digital Tecnideas',
        icon: <Globe className="w-4 h-4 text-blue-500" />,
        href: '#digital',
        category: 'digital' as const
      }))
    : [
        {
          title: 'Diseño Web Premium',
          desc: 'Sitios corporativos ultrasustentables y responsivos',
          icon: <Globe className="w-4 h-4 text-blue-500" />,
          href: '#digital',
          category: 'digital' as const
        }
      ];

  const tradicionalServices = [
    {
      title: 'Fotocopias & Impresión',
      desc: 'Litografía, gran formato, tesis e impresiones de alta definición',
      icon: <Printer className="w-4 h-4 text-purple-500" />,
      href: '#servicios',
      category: 'tradicional' as const
    },
    {
      title: 'Citas de Pasaporte',
      desc: 'Asesoría y agendamiento ante la Gobernación de Antioquia',
      icon: <FileCheck className="w-4 h-4 text-emerald-500" />,
      href: '#servicios',
      category: 'tradicional' as const
    },
    {
      title: 'Formulario Visas DS-160',
      desc: 'Llenado profesional de solicitudes para EEUU y Canadá',
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
      href: '#servicios',
      category: 'tradicional' as const
    },
    {
      title: 'Papelería & Escáner OCR',
      desc: 'Insumos de oficina, digitalización e indexación de documentos',
      icon: <Scan className="w-4 h-4 text-cyan-500" />,
      href: '#servicios',
      category: 'tradicional' as const
    },
    {
      title: 'Expedición de SOAT',
      desc: 'Seguro obligatorio vehicular con verificación digital inmediata',
      icon: <FileCheck className="w-4 h-4 text-amber-500" />,
      href: '#servicios',
      category: 'tradicional' as const
    },
  ];

  const ecosistemaServices = [
    {
      title: 'Tecnideas Workspace',
      desc: 'Salas de juntas, escritorios flexibles e internet 300 Mbps',
      icon: <Building2 className="w-4 h-4 text-indigo-500" />,
      pageId: 'workspace',
      category: 'ecosistema' as const
    },
    {
      title: 'Cursos & Talleres IA',
      desc: 'Capacitación práctica en automatizaciones, prompt engineering y web',
      icon: <GraduationCap className="w-4 h-4 text-amber-500" />,
      pageId: 'capacitacion',
      category: 'ecosistema' as const
    },
    {
      title: 'Cotizador Interactivo',
      desc: 'Calcula tu presupuesto estimado con simulación inteligente',
      icon: <Calculator className="w-4 h-4 text-blue-500" />,
      pageId: 'cotizador',
      category: 'ecosistema' as const
    },
    {
      title: 'Showroom de Casos',
      desc: 'Proyectos de éxito desarrollados en Medellín con resultados reales',
      icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
      pageId: 'portafolio',
      category: 'ecosistema' as const
    },
    {
      title: 'Tienda Tecnideas',
      desc: 'Licencias de IA, membresías, paquetes de papelería y pases',
      icon: <ShoppingBag className="w-4 h-4 text-purple-500" />,
      pageId: 'tienda',
      category: 'ecosistema' as const
    },
  ];

  const handleLinkClick = (pageId: string, category?: 'digital' | 'tradicional' | 'ecosistema') => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (onNavigatePage) {
      onNavigatePage(pageId);
    } else if (category && onNavigateService) {
      onNavigateService(category);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Top Slim Notice Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-[11px] py-1 px-4 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
              Tecnideas 360°
            </span>
            <span className="hidden sm:inline text-blue-100">
              Desarrollo Web, IA, Centro de Copiado & Workspace
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://wa.me/573024171818" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline flex items-center gap-1 text-emerald-300 font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>+57 302 417 1818</span>
            </a>
            <button 
              onClick={onOpenCalculator}
              className="hidden sm:inline-block underline hover:text-blue-200 font-bold cursor-pointer"
            >
              Cotizar en línea →
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
          className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center border border-cyan-500/40 p-1 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <TecnideasLogoIcon className="w-full h-full text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans">
                Tecnideas
              </span>
              <span className="text-[9px] uppercase font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                HUB 360°
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
              Soluciones Digitales & Tradicionales
            </p>
          </div>
        </a>

        {/* Desktop Categorized Mega Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200">
          
          {/* 1. Servicios Digitales Page Link / Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('digital')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('digital')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'digital' || activeDropdown === 'digital'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-extrabold' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span>Servicios Digitales</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'digital' ? 'rotate-180 text-blue-600' : ''}`} />
            </button>

            {activeDropdown === 'digital' && (
              <div 
                className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                onMouseEnter={() => handleMouseEnter('digital')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex justify-between items-center">
                  <span>Servicios Digitales & IA</span>
                  <span className="text-[9px] text-slate-400">Ver Página →</span>
                </div>
                {dynamicDigitalMenu.map((item, idx) => (
                  <a
                    key={idx}
                    href="#digital"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('digital'); }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-start gap-3 group/item transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-950 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 2. Centro Tradicional Page Link / Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('tradicional')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('tradicional')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'tradicional' || activeDropdown === 'tradicional'
                  ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 font-extrabold' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span>Centro Tradicional</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'tradicional' ? 'rotate-180 text-purple-600' : ''}`} />
            </button>

            {activeDropdown === 'tradicional' && (
              <div 
                className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                onMouseEnter={() => handleMouseEnter('tradicional')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex justify-between items-center">
                  <span>Copiado, Impresión & Trámites</span>
                  <span className="text-[9px] text-slate-400">Ver Página →</span>
                </div>
                {tradicionalServices.map((item, idx) => (
                  <a
                    key={idx}
                    href="#tradicional"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('tradicional'); }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-start gap-3 group/item transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover/item:bg-purple-100 dark:group-hover/item:bg-purple-950 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 3. Ecosistema Page Link / Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('ecosistema')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('ecosistema')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                ['ecosistema', 'workspace', 'capacitacion', 'portafolio'].includes(currentPage) || activeDropdown === 'ecosistema'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-extrabold' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span>Ecosistema</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'ecosistema' ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>

            {activeDropdown === 'ecosistema' && (
              <div 
                className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                onMouseEnter={() => handleMouseEnter('ecosistema')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex justify-between items-center">
                  <span>Ecosistema Tecnideas</span>
                  <span className="text-[9px] text-slate-400">Ver HUB →</span>
                </div>
                {ecosistemaServices.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.pageId}`}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(item.pageId); }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-start gap-3 group/item transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover/item:bg-emerald-100 dark:group-hover/item:bg-emerald-950 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 4. Direct Link: Tienda Tecnideas */}
          <button
            onClick={() => handleLinkClick('tienda')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'tienda' 
                ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold border border-purple-200 dark:border-purple-800/80 shadow-sm' 
                : 'hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Tienda Tecnideas</span>
            <span className="text-[9px] uppercase font-black bg-purple-600 text-white px-1.5 py-0.2 rounded-full tracking-wider">
              Tienda
            </span>
          </button>

          {/* 5. Direct Link: Contacto */}
          <button
            onClick={() => handleLinkClick('contacto')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              currentPage === 'contacto' 
                ? 'bg-slate-200 dark:bg-slate-800 font-extrabold text-blue-600 dark:text-blue-400' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* AI Agent Drawer Trigger */}
          <button
            onClick={onOpenAIAgent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold shadow-md hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors cursor-pointer"
            title="Agente IA Tecnideas"
          >
            <Bot className="w-4 h-4 text-blue-400 dark:text-blue-600" />
            <span className="hidden sm:inline">Agente IA</span>
          </button>

          

          {/* Light/Dark Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cambiar tema"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Admin Lock Button - Central Control Point */}
          <button
            onClick={() => isAdmin ? openAdminPanel() : openAuthModal()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer border border-slate-200/60 dark:border-slate-800"
            title="Panel de Control Geral Tecnideas"
          >
            <Lock className={`w-3.5 h-3.5 ${isAdmin ? 'text-emerald-500 dark:text-emerald-400' : 'text-cyan-500'}`} />
            <span className="hidden sm:inline">{isAdmin ? 'Panel Admin' : 'Admin'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl md:hidden bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          
          {/* Section 1: Servicios Digitales */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Servicios Digitales
            </p>
            <div className="grid grid-cols-1 gap-1">
              {dynamicDigitalMenu.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleLinkClick('digital')}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2 text-left w-full cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Centro Tradicional */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Centro Tradicional
            </p>
            <div className="grid grid-cols-1 gap-1">
              {tradicionalServices.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleLinkClick('tradicional')}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2 text-left w-full cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Ecosistema */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Ecosistema
            </p>
            <div className="grid grid-cols-1 gap-1">
              {ecosistemaServices.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleLinkClick(item.pageId || 'ecosistema')}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2 text-left w-full cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Direct Tienda Button Mobile */}
          <div className="pt-1">
            <button
              onClick={() => handleLinkClick('tienda')}
              className={`w-full p-3 rounded-xl border flex items-center justify-between font-extrabold text-xs transition-all cursor-pointer ${
                currentPage === 'tienda'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                  : 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/60 hover:bg-purple-500/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Tienda Tecnideas (Licencias, Kits & Pases)</span>
              </div>
              <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full uppercase font-mono font-bold">Ver →</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdmin) openAdminPanel();
                else openAuthModal();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>{isAdmin ? 'Panel Administrador (Activo)' : 'Acceso Administrador'}</span>
            </button>
            <button
              onClick={() => { handleLinkClick('cotizador'); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Cotizador Interactivo</span>
            </button>
            <a
              href="https://wa.me/573024171818"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Escribir por WhatsApp (+57 302 417 1818)</span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
};
