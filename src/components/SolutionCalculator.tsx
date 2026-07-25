import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Bot, 
  Send, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  DollarSign 
} from 'lucide-react';

interface SolutionCalculatorProps {
  onClose?: () => void;
}

export const SolutionCalculator: React.FC<SolutionCalculatorProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  
  // Form selections
  const [businessType, setBusinessType] = useState<string>('Emprendimiento Pyme');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Sitio Web Corporativo']);
  const [timeframe, setTimeframe] = useState<string>('Lo antes posible (1-2 semanas)');
  const [budgetTarget, setBudgetTarget] = useState<string>('$1.000.000 - $2.500.000 COP');

  // Server Analysis State
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    summary?: string;
    recommendedStack?: string[];
    estimatedTimeline?: string;
    estimatedCostCOP?: number;
    keyBenefits?: string[];
    nextSteps?: string;
  } | null>(null);

  const businessTypes = [
    'Emprendimiento Pyme',
    'Empresa Consolidada',
    'Profesional Independiente',
    'Restaurante / Comercio Local',
    'Educación / Servicios'
  ];

  const availableServices = [
    { id: 'web', name: 'Sitio Web Corporativo Premium', base: 999000 },
    { id: 'ecom', name: 'Tienda Virtual con Pasarela de Pagos', base: 1850000 },
    { id: 'bot', name: 'Agente de IA en WhatsApp Business', base: 1200000 },
    { id: 'crm', name: 'CRM & Funnel Comercial', base: 850000 },
    { id: 'seo', name: 'Estrategia SEO & Posicionamiento', base: 650000 },
    { id: 'copiado', name: 'Papelería, Impresión & Trámites', base: 250000 }
  ];

  const timeframes = [
    'Lo antes posible (1-2 semanas)',
    'En un mes',
    'Sin afán / Planificación'
  ];

  const budgetRanges = [
    'Hasta $1.000.000 COP',
    '$1.000.000 - $2.500.000 COP',
    '$2.500.000 - $5.000.000 COP',
    'Más de $5.000.000 COP'
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  // Base COP calculation logic
  const calculateBaseEstimate = () => {
    let sum = 0;
    selectedServices.forEach(sName => {
      const found = availableServices.find(a => a.name === sName);
      if (found) sum += found.base;
    });
    return sum;
  };

  const handleRequestAIAnalysis = async () => {
    setIsCalculating(true);
    setStep(3);

    try {
      const res = await fetch('/api/calculate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType,
          selectedServices,
          timeframe,
          budgetTarget
        })
      });

      const data = await res.json();
      if (data && data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setAiAnalysis({
          summary: 'Propuesta optimizada de aceleración digital para ' + businessType,
          recommendedStack: ['Next.js / React', 'WhatsApp Official API', 'Tailwind CSS'],
          estimatedTimeline: timeframe,
          estimatedCostCOP: calculateBaseEstimate(),
          keyBenefits: ['Diseño premium responsive', 'Soporte local en Medellín', 'Atención por WhatsApp'],
          nextSteps: 'Habla directamente con nuestro consultor de Tecnideas.'
        });
      }
    } catch {
      setAiAnalysis({
        summary: 'Propuesta optimizada de aceleración digital para ' + businessType,
        recommendedStack: ['Next.js / React', 'WhatsApp Official API', 'Tailwind CSS'],
        estimatedTimeline: timeframe,
        estimatedCostCOP: calculateBaseEstimate(),
        keyBenefits: ['Diseño premium responsive', 'Soporte local en Medellín', 'Atención por WhatsApp'],
        nextSteps: 'Habla directamente con nuestro consultor de Tecnideas.'
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = `Hola Tecnideas! Acabo de usar su Cotizador Interactivo en la web:
*Perfil:* ${businessType}
*Servicios requeridos:* ${selectedServices.join(', ')}
*Plazo deseado:* ${timeframe}
*Presupuesto aproximado:* ${budgetTarget}
*Estimación calculada:* $${(aiAnalysis?.estimatedCostCOP || calculateBaseEstimate()).toLocaleString()} COP

Me gustaría agendar una asesoría para iniciar.`;

    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="cotizador" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Cotizador Interactivo & Simulación IA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ¿Cuánto cuesta tu proyecto web o automatización?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Responde 3 preguntas sencillas y recibe un presupuesto estimado en pesos colombianos (COP) analizado con Inteligencia Artificial.
          </p>
        </div>

        {/* Multi-step Box */}
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Step indicator */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {step}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {step === 1 && 'Paso 1: Tipo de Proyecto & Servicios'}
                {step === 2 && 'Paso 2: Plazo & Presupuesto Objetivo'}
                {step === 3 && 'Paso 3: Análisis & Presupuesto Generado por IA'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Paso {step} de 3</span>
          </div>

          {/* Step 1: Services Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  1. ¿Cuál es la naturaleza de tu negocio?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setBusinessType(type)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        businessType === type
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  2. Selecciona uno o varios servicios que necesitas:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableServices.map((srv) => {
                    const isSelected = selectedServices.includes(srv.name);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.name)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-slate-900 dark:text-white ring-1 ring-blue-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{srv.name}</p>
                          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                            Desde ${srv.base.toLocaleString()} COP
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <span>Siguiente paso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Timeframe & Budget */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  3. ¿En cuánto tiempo requieres tener listo el proyecto?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        timeframe === tf
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  4. Presupuesto estimado que tienes pensado destinar:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetRanges.map((br) => (
                    <button
                      key={br}
                      onClick={() => setBudgetTarget(br)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        budgetTarget === br
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                      }`}
                    >
                      {br}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Regresar
                </button>
                <button
                  onClick={handleRequestAIAnalysis}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>Calcular con IA Tecnideas</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Result Analysis */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {isCalculating ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    El Agente de IA Tecnideas está evaluando los requisitos para {businessType}...
                  </p>
                  <p className="text-xs text-slate-400">Calculando tiempos de desarrollo y costos óptimos en Medellín...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Estimated Cost Highlight Box */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                          Presupuesto Estimado Recomendado
                        </span>
                        <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-0.5">
                          ${(aiAnalysis?.estimatedCostCOP || calculateBaseEstimate()).toLocaleString()} <span className="text-lg font-normal text-slate-300">COP</span>
                        </div>
                      </div>
                      <div className="bg-white/10 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-200">
                        ⏱ Plazo: {aiAnalysis?.estimatedTimeline || timeframe}
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed border-t border-white/10 pt-3">
                      {aiAnalysis?.summary}
                    </p>
                  </div>

                  {/* Stack & Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-blue-600 dark:text-blue-400">
                        Tecnologías Sugeridas:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(aiAnalysis?.recommendedStack || ['Next.js', 'WhatsApp API', 'CMS']).map((st, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                        Beneficios Inmediatos:
                      </h4>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {(aiAnalysis?.keyBenefits || ['Diseño responsive', 'Garantía local']).map((ben, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar esta cotización por WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reiniciar Cotizador</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
