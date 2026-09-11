import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ServicesShowroom } from './components/ServicesShowroom';
import { SolutionCalculator } from './components/SolutionCalculator';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { FAQSection } from './components/FAQSection';
import { StoreCatalog } from './components/StoreCatalog';
import { WorkspaceSection } from './components/WorkspaceSection';
import { CapacitacionSection } from './components/CapacitacionSection';
import { AIAgentChatDrawer } from './components/AIAgentChatDrawer';
import { BlogAndSEO } from './components/BlogAndSEO';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AdminDataProvider } from './context/AdminDataContext';
import { ClientSegment } from './types';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentSegment, setCurrentSegment] = useState<ClientSegment | 'all'>('all');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isAIAgentOpen, setIsAIAgentOpen] = useState<boolean>(false);
  const [serviceTab, setServiceTab] = useState<'digital' | 'tradicional' | 'ecosistema'>('digital');

  // Handle URL hash routing initialization & changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'digital', 'tradicional', 'ecosistema', 'cotizador', 'portafolio', 'workspace', 'capacitacion', 'tienda', 'contacto'].includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Sync dark mode class on HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigatePage = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'digital') {
      setServiceTab('digital');
    } else if (pageId === 'tradicional') {
      setServiceTab('tradicional');
    } else if (pageId === 'ecosistema') {
      setServiceTab('ecosistema');
    }
  };

  const handleNavigateService = (category: 'digital' | 'tradicional' | 'ecosistema') => {
    setServiceTab(category);
    handleNavigatePage(category);
  };

  const handleShowroomTabChange = (tab: 'digital' | 'tradicional' | 'ecosistema') => {
    setServiceTab(tab);
    if (tab === 'digital') handleNavigatePage('digital');
    else if (tab === 'tradicional') handleNavigatePage('tradicional');
    else if (tab === 'ecosistema') handleNavigatePage('ecosistema');
  };

  const handleSelectSegment = (segment: ClientSegment | 'all') => {
    setCurrentSegment(segment);
    if (segment === 'emprendedor' || segment === 'empresa') {
      handleNavigatePage('digital');
    } else if (segment === 'tramites') {
      handleNavigatePage('tradicional');
    } else if (segment === 'workspace') {
      handleNavigatePage('workspace');
    } else if (segment === 'capacitacion') {
      handleNavigatePage('capacitacion');
    }
  };

  const scrollToCalculator = () => {
    handleNavigatePage('cotizador');
  };

  return (
    <AdminDataProvider>
      <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-blue-500 selection:text-white flex flex-col justify-between">
        
        <div>
          {/* Top Header */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenAIAgent={() => setIsAIAgentOpen(true)}
          onOpenCalculator={scrollToCalculator}
          currentPage={currentPage}
          onNavigatePage={handleNavigatePage}
          onNavigateService={handleNavigateService}
        />

        {/* Optional Page Breadcrumb / Navigation Bar when not on Home */}
        {currentPage !== 'home' && (
          <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => handleNavigatePage('home')}
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al Inicio (Landing Page)</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-extrabold">
                <span>Tecnideas</span>
                <span>/</span>
                <span className="text-blue-600 dark:text-blue-400">{currentPage}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Router */}
        <main className="animate-in fade-in duration-200">
          {/* HOME LANDING PAGE */}
          {currentPage === 'home' && (
            <LandingPage
              onNavigatePage={handleNavigatePage}
              onOpenAIAgent={() => setIsAIAgentOpen(true)}
              currentSegment={currentSegment}
              onSelectSegment={handleSelectSegment}
            />
          )}

          {/* DIGITAL SERVICES PAGE */}
          {currentPage === 'digital' && (
            <div className="space-y-16 py-8">
              <ServicesShowroom
                currentSegment={currentSegment}
                onOpenCalculator={scrollToCalculator}
                onOpenAIAgent={() => setIsAIAgentOpen(true)}
                activeTab={serviceTab}
                onTabChange={handleShowroomTabChange}
              />
              <PortfolioShowcase />
              <FAQSection />
            </div>
          )}

          {/* TRADITIONAL SERVICES PAGE */}
          {currentPage === 'tradicional' && (
            <div className="space-y-16 py-8">
              <ServicesShowroom
                currentSegment={currentSegment}
                onOpenCalculator={scrollToCalculator}
                onOpenAIAgent={() => setIsAIAgentOpen(true)}
                activeTab={serviceTab}
                onTabChange={handleShowroomTabChange}
              />
              <ContactSection />
            </div>
          )}

          {/* ECOSISTEMA PAGE */}
          {currentPage === 'ecosistema' && (
            <div className="space-y-16 py-8">
              <ServicesShowroom
                currentSegment={currentSegment}
                onOpenCalculator={scrollToCalculator}
                onOpenAIAgent={() => setIsAIAgentOpen(true)}
                activeTab={serviceTab}
                onTabChange={handleShowroomTabChange}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  Ecosistema Tecnideas 360°
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  HUB de Innovación, Coworking & Recursos
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Explora las diferentes iniciativas que integran nuestro ecosistema en Medellín: Coworking con internet ultra rápido, cursos en vivo y tienda de recursos.
                </p>
              </div>
              <WorkspaceSection />
              <CapacitacionSection />
              <StoreCatalog />
            </div>
          )}

          {/* COTIZADOR INTERACTIVO PAGE */}
          {currentPage === 'cotizador' && (
            <div className="py-8">
              <SolutionCalculator />
            </div>
          )}

          {/* PORTAFOLIO & CASOS DE ÉXITO PAGE */}
          {currentPage === 'portafolio' && (
            <div className="py-8">
              <PortfolioShowcase />
            </div>
          )}

          {/* WORKSPACE COWORKING PAGE */}
          {currentPage === 'workspace' && (
            <div className="py-8">
              <WorkspaceSection />
            </div>
          )}

          {/* CAPACITACIÓN & CURSOS IA PAGE */}
          {currentPage === 'capacitacion' && (
            <div className="py-8">
              <CapacitacionSection />
            </div>
          )}

          {/* TIENDA PAGE */}
          {currentPage === 'tienda' && (
            <div className="py-8">
              <StoreCatalog />
            </div>
          )}

          {/* CONTACTO & UBICACIÓN PAGE */}
          {currentPage === 'contacto' && (
            <div className="space-y-16 py-8">
              <ContactSection />
              <BlogAndSEO />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Floating AI Agent Drawer */}
      <AIAgentChatDrawer
        isOpen={isAIAgentOpen}
        onClose={() => setIsAIAgentOpen(false)}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Fixed Floating AI Trigger Button on bottom right */}
      {!isAIAgentOpen && (
        <button
          onClick={() => setIsAIAgentOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs cursor-pointer group border border-white/20"
          title="Hablar con el Agente IA Tecnideas"
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1" />
          </div>
          <span className="hidden sm:inline font-sans">Agente Tecnideas IA</span>
        </button>
      )}

      {/* Admin Backend Panel Modal */}
      <AdminPanelModal />

    </div>
    </AdminDataProvider>
  );
}
