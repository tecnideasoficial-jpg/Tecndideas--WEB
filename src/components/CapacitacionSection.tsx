import React, { useState } from 'react';
import { 
  GraduationCap, 
  Youtube, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Play,
  Lock
} from 'lucide-react';
import { Course } from '../types';
import { useAdminData } from '../context/AdminDataContext';

export const CapacitacionSection: React.FC = () => {
  const { courses, youtubeVideos } = useAdminData();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnrollCourse = (courseTitle: string) => {
    const text = `Hola Tecnideas, deseo inscribirme o solicitar información del curso: *${courseTitle}*. ¿Cuándo inician las próximas clases?`;
    window.open(`https://wa.me/573009128472?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="capacitacion" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Centro de Capacitación Tecnideas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Aprende las habilidades digitales que transforman negocios
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Talleres prácticos e intensivos en Medellín y modalidad virtual sobre Inteligencia Artificial, Automatizaciones en WhatsApp, CRM y desarrollo web.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.badge && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md">
                      {course.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-md border border-slate-700">
                    {course.price}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {course.modality}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    <span>⏱ {course.duration}</span>
                    <span>👤 {course.level}</span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Temario Destacado:</p>
                    {course.topics.map((tp, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{tp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleEnrollCourse(course.title)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inscribirme o Consultar Fechas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* YouTube Channel Integration */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-600 text-white">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Canal Oficial de YouTube Tecnideas</h3>
                <p className="text-xs text-slate-400">Tutoriales gratuitos, guías de IA, WordPress y casos reales.</p>
              </div>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Suscribirme al Canal</span>
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeVideos.map((vid, idx) => (
              <a
                key={idx}
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden hover:border-red-500 transition-all"
              >
                <div className="relative h-40 overflow-hidden bg-slate-950">
                  <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">{vid.views}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Community Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#022a22] border border-emerald-800/60 text-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Únete a la Comunidad de Emprendedores Tecnideas</h4>
              <p className="text-xs text-emerald-300">Entérate de eventos, capacitaciones gratuitas y networking en Medellín.</p>
            </div>
          </div>
          <a
            href="https://wa.me/573024171818"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0"
          >
            Unirme al Grupo de WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
