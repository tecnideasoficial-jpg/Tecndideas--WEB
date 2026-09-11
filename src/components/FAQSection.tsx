import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Mail, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  badge?: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'tech-skills',
    question: '¿Necesito saber programación, diseño o contratar a un técnico?',
    answer: 'Para nada. Todas nuestras plantillas web, simuladores financieros y herramientas de Inteligencia Artificial están diseñadas para usarse con clics simples e intuitivos, sin tocar una sola línea de código ni saber de diseño. Además, cuentas con video-tutoriales guiados paso a paso y nuestro equipo de soporte listo para asistirte en todo momento.',
    badge: 'Sin código'
  },
  {
    id: 'only-web',
    question: '¿Qué pasa si por ahora solo necesito la página web y las plantillas?',
    answer: 'Puedes usar exclusivamente el módulo web y tus plantillas con total libertad. El resto de las herramientas (como los simuladores de finanzas o la IA para crear anuncios) están ahí disponibles para cuando decidas aprovecharlas, sin costo adicional. No estás obligado a usar todo junto para que tu suscripción sea rentable desde el día uno.',
    badge: 'Uso flexible'
  },
  {
    id: 'updates',
    question: '¿Cómo se entregan las actualizaciones y las nuevas herramientas del Hub?',
    answer: 'De forma 100% automática en la nube. Cada vez que publicamos una nueva plantilla interactiva, mejoramos los modelos de IA o lanzamos un nuevo módulo operativo (como el sistema POS), se habilita al instante en tu panel de control sin que tengas que descargar archivos, instalar parches o pagar licencias adicionales.',
    badge: 'Todo incluido'
  },
  {
    id: 'custom-domain',
    question: '¿Puedo conectar mi propio nombre de dominio (.com, .mx, .co, etc.)?',
    answer: 'Sí, por supuesto. Puedes vincular tu propio dominio personalizado para que tu marca se vea 100% profesional y de tu propiedad. Nosotros te proporcionamos las instrucciones paso a paso o te asistimos para dejarlo conectado en minutos.',
    badge: 'Tu propia marca'
  },
  {
    id: 'contracts',
    question: '¿Hay contratos de permanencia obligatoria o cobros ocultos?',
    answer: 'Cero contratos de permanencia y cero letras pequeñas. Pagas mes a mes y puedes cancelar tu suscripción en cualquier momento directamente desde tu panel con un solo clic. No existen costos de alta o configuración inicial, ni comisiones sobre tus ventas, ni penalidades por cancelación.',
    badge: 'Cancela cuando quieras'
  },
  {
    id: 'freelance-vs-hub',
    question: '¿Por qué es más rentable este modelo de suscripción que pagar a un diseñador freelance?',
    answer: 'Un diseñador freelance o agencia tradicional suele cobrar entre $500 y $2.000 USD por adelantado solo por el diseño inicial, y luego factura cobros adicionales por cada cambio, hosting y mantenimiento. Con Tecnideas tienes hosting ultrarrápido con SSL, plantillas probadas de alta conversión, IA para tus textos publicitarios y soporte continuo por una fracción mínima mensual, manteniendo el control total de tu presupuesto.',
    badge: 'Ahorro inteligente'
  }
];

export const FAQSection: React.FC = () => {
  // Open the first 2 items by default for immediate clarity
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'tech-skills': true,
    'custom-domain': true
  });
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleWhatsAppAdvisor = () => {
    const text = '¡Hola Tecnideas! Estuve revisando la sección de Preguntas Frecuentes y me gustaría hacer una consulta personalizada sobre mi negocio antes de suscribirme.';
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tecnideasoficial@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800/50 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Preguntas Frecuentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Todo lo que necesitas saber antes de dar el paso
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Respuestas claras, sin tecnicismos ni evasivas. Queremos que tomes la mejor decisión para tu negocio.
          </p>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-4 mb-16">
          {FAQS.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-blue-300/80 dark:border-blue-700/80 shadow-md shadow-blue-500/5'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer group select-none"
                >
                  <div className="space-y-1.5 pr-2">
                    {faq.badge && (
                      <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 mb-1">
                        {faq.badge}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen 
                      ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 rotate-180' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/70 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Personalized Consultation Callout Card */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Asesoría Personalizada 1-a-1</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                ¿Tienes una pregunta específica sobre tu negocio o industria?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hablamos directamente con dueños de negocio y emprendedores todos los días. Escríbenos y te asesoramos personalmente sin compromiso.
              </p>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppAdvisor}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
                <span>Chatear por WhatsApp con un Asesor</span>
              </button>

              {/* Direct Email Action */}
              <div className="flex items-center gap-2 justify-center sm:justify-start md:justify-center">
                <a
                  href="mailto:tecnideasoficial@gmail.com"
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors underline decoration-slate-600 hover:decoration-white"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>tecnideasoficial@gmail.com</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copiar correo"
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
