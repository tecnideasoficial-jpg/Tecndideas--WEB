import React from 'react';
import { 
  Briefcase, 
  Building2, 
  Printer, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  Check, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import { ClientSegment } from '../types';

interface ClientSegmentSelectorProps {
  currentSegment: ClientSegment | 'all';
  onSelectSegment: (segment: ClientSegment | 'all') => void;
  onOpenCalculator: () => void;
}

export const ClientSegmentSelector: React.FC<ClientSegmentSelectorProps> = ({
  currentSegment,
  onSelectSegment,
  onOpenCalculator
}) => {
  const segments = [
    {
      id: 'emprendedor' as ClientSegment,
      title: 'Soy Emprendedor',
      subtitle: 'Quiero lanzar mi negocio o acelerar mis ventas',
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      badge: 'Más Popular',
      color: 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20',
      solutions: [
        'Página Web Corporativa o Tienda Virtual',
        'Bot de WhatsApp para responder clientes',
        'Logo, Tarjetas e Identidad Impresa'
      ],
      priceRange: 'Desde $999.000 COP',
      actionText: 'Ver Soluciones para Emprendedores'
    },
    {
      id: 'empresa' as ClientSegment,
      title: 'Tengo una Empresa',
      subtitle: 'Necesito automatizar procesos y escalar marca',
      icon: <Building2 className="w-6 h-6 text-emerald-500" />,
      badge: 'Escalabilidad',
      color: 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20',
      solutions: [
        'Software a medida & CRM comercial',
        'Agentes de IA y entrenamiento empresarial',
        'SEO Avanzado e integración de pagos'
      ],
      priceRange: 'Cotización a medida',
      actionText: 'Ver Soluciones Empresariales'
    },
    {
      id: 'tramites' as ClientSegment,
      title: 'Trámites / Copiado',
      subtitle: 'Necesito fotocopias, impresiones, visas o pasaporte',
      icon: <Printer className="w-6 h-6 text-purple-500" />,
      badge: 'Servicio Express',
      color: 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/20',
      solutions: [
        'Impresiones USB, Correo & WhatsApp en Medellín',
        'Citas de Pasaporte & Formulario Visa',
        'SOAT Digital, RUNT y Escáner OCR'
      ],
      priceRange: 'Desde $100 COP',
      actionText: 'Ir a Centro de Copiado & Trámites'
    },
    {
      id: 'capacitacion' as ClientSegment,
      title: 'Busco Capacitación',
      subtitle: 'Quiero aprender IA, WordPress o Automatización',
      icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
      badge: 'Aprende Hoy',
      color: 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20',
      solutions: [
        'Cursos Presenciales en Medellín & Virtuales',
        'Talleres de IA aplicada a Pymes',
        'Acompañamiento 1 a 1 y comunidad'
      ],
      priceRange: 'Desde $180.000 COP',
      actionText: 'Ver Cursos & Talleres'
    },
    {
      id: 'workspace' as ClientSegment,
      title: 'Quiero Workspace',
      subtitle: 'Busco coworking, sala de juntas o auditorio',
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      badge: 'Centro Medellín',
      color: 'border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/20',
      solutions: [
        'Puestos de trabajo por horas o mensual',
        'Sala de Juntas con pantalla 65"',
        'Auditorio equipado para capacitaciones'
      ],
      priceRange: 'Desde $8.000 COP/hora',
      actionText: 'Reservar Espacio'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selector de Soluciones Personalizadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Ruta personalizada según lo que buscas hoy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Haz clic en tu perfil para filtrar el contenido del sitio web y llevarte directamente a las soluciones que resuelven tu necesidad.
          </p>
        </div>

        {/* Segment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {segments.map((seg) => {
            const isSelected = currentSegment === seg.id;
            return (
              <div
                key={seg.id}
                onClick={() => onSelectSegment(seg.id)}
                className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${seg.color} border-2 shadow-xl scale-[1.02]`
                    : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200/90 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                }`}
              >
                {/* Card Top */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-xs border border-slate-200/80 dark:border-slate-800">
                      {seg.icon}
                    </div>
                    {seg.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        {seg.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {seg.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {seg.subtitle}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    {seg.solutions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[10px]">Inversión:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-xs">{seg.priceRange}</span>
                  </div>
                  <div className={`text-xs font-bold flex items-center justify-between pt-1 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-blue-600'}`}>
                    <span>{seg.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Reset Filter Button if segment selected */}
        {currentSegment !== 'all' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onSelectSegment('all')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span>Viendo filtro: {currentSegment.toUpperCase()}</span>
              <span className="underline text-blue-600 dark:text-blue-400">Mostrar todo el ecosistema Tecnideas</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
