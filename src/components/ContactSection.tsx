import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Building2 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/tecnideasData';
import { useAdminData } from '../context/AdminDataContext';

export const ContactSection: React.FC = () => {
  const { sedes } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Diseño Web Premium',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sede Física en Medellín & Atención Nacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Inicia hoy la transformación de tu negocio
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Visítanos en nuestra sede física en Medellín o hablemos por WhatsApp. Estamos listos para acompañarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span>Datos de Contacto Tecnideas</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Ubicación Medellín:</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Línea Telefónica & WhatsApp:</strong>
                    <a href="https://wa.me/573024171818" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400 font-bold">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Correo Electrónico:</strong>
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Horario de Atención:</strong>
                    <span>{COMPANY_INFO.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 space-y-2">
                <p className="text-xs font-bold text-emerald-300">¿Prefieres respuesta inmediata por WhatsApp?</p>
                <a
                  href="https://wa.me/573024171818?text=Hola%20Tecnideas,%20deseo%20asesor%C3%ADa%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Escribir al WhatsApp (+57 302 417 1818)</span>
                </a>
              </div>

            </div>

            {/* Real Interactive Google Maps Location Integration */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Nuestras Sedes ({sedes.length})</span>
              </h3>

              {sedes.map((s) => (
                <div key={s.id} className="rounded-3xl bg-slate-800/80 border border-slate-700/80 overflow-hidden shadow-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{s.name}</span>
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      s.status === 'Operativa' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {s.status}
                    </span>
                  </div>

                  {s.mapUrl && (
                    <div className="h-48 sm:h-56 rounded-2xl bg-slate-950 relative overflow-hidden border border-slate-700 shadow-inner">
                      <iframe
                        title={`Ubicación ${s.name}`}
                        src={s.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full rounded-2xl filter contrast-[1.05]"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 text-[11px] text-slate-300 pt-1">
                    <p><strong className="text-white">Dirección:</strong> {s.address}, {s.city}</p>
                    <p><strong className="text-white">Teléfono:</strong> {s.phone}</p>
                    <p><strong className="text-white">Horario:</strong> {s.schedule}</p>
                    {s.description && <p className="text-slate-400 text-[10px] italic pt-1">{s.description}</p>}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all shrink-0"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Abrir Mapa</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-800/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white">Envíanos un mensaje o solicita una llamada</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Un consultor especializado de Tecnideas te responderá en menos de 2 horas en horario laboral.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-emerald-200">
                    Gracias por comunicarte con Tecnideas. Nuestro equipo revisará tus datos y se pondrá en contacto al correo o WhatsApp indicado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase">Nombre Completo:</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Juan Carlos Pérez"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase">Teléfono / WhatsApp:</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ej. 300 123 4567"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Correo Electrónico:</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tuempresa@ejemplo.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Servicio de Interés Principal:</label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Diseño Web Premium Corporativo</option>
                      <option>Tienda Virtual E-Commerce</option>
                      <option>Agente de IA en WhatsApp & Automatización</option>
                      <option>CRM & Estrategia Comercial</option>
                      <option>SEO & Posicionamiento en Google</option>
                      <option>Tecnideas Workspace / Coworking</option>
                      <option>Cursos & Capacitación IA</option>
                      <option>Centro de Copiado, Impresiones o Trámites</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Cuéntanos sobre tu negocio o consulta:</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe brevemente lo que necesitas construir o resolver..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Formulario a Tecnideas</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
