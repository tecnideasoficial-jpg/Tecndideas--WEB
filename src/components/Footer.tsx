import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/tecnideasData';
import { TecnideasLogoIcon } from './TecnideasLogo';

interface FooterProps {
  onNavigatePage?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const handleNav = (pageId: string) => {
    if (onNavigatePage) {
      onNavigatePage(pageId);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TecnideasLogoIcon className="w-full h-full text-cyan-400" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">Tecnideas</span>
                <span className="text-[9px] uppercase font-bold bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded ml-1.5 border border-blue-700/50">
                  HUB 360°
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Ecosistema Digital, Agencia de Desarrollo Web Premium, Automatización con IA, Workspace y Centro Tradicional de Copiado en Medellín, Colombia. 29+ años acompañando empresas y emprendedores.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://wa.me/573024171818"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors font-bold"
              >
                WhatsApp (+57 302 417 1818)
              </a>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Servicios Digitales</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleNav('digital')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Diseño Web Premium</button></li>
              <li><button onClick={() => handleNav('digital')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Tiendas Virtuales Wompi</button></li>
              <li><button onClick={() => handleNav('digital')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Agentes IA en WhatsApp</button></li>
              <li><button onClick={() => handleNav('digital')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Implementación de CRM</button></li>
              <li><button onClick={() => handleNav('digital')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Estrategia SEO Medellín</button></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Centro Tradicional</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleNav('tradicional')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Fotocopias & Impresión</button></li>
              <li><button onClick={() => handleNav('tradicional')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Citas de Pasaporte</button></li>
              <li><button onClick={() => handleNav('tradicional')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Formulario Visas DS-160</button></li>
              <li><button onClick={() => handleNav('tradicional')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Papelería & Escáner OCR</button></li>
              <li><button onClick={() => handleNav('tradicional')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Expedición de SOAT</button></li>
            </ul>
          </div>

          {/* Nav Links Column 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ecosistema</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleNav('workspace')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Tecnideas Workspace</button></li>
              <li><button onClick={() => handleNav('capacitacion')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Cursos & Talleres IA</button></li>
              <li><button onClick={() => handleNav('cotizador')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Cotizador Interactivo</button></li>
              <li><button onClick={() => handleNav('portafolio')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Showroom de Casos</button></li>
              <li><button onClick={() => handleNav('tienda')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">Tienda Tecnideas</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Tecnideas • Centro Integral de Soluciones Tecnológicas. Medellín, Colombia.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>para emprendedores y empresas en Colombia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
