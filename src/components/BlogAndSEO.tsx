import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  Search 
} from 'lucide-react';
import { FAQS } from '../data/tecnideasData';

export const BlogAndSEO: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const blogPosts = [
    {
      title: 'Por qué las Pymes de Medellín están automatizando WhatsApp con IA en 2026',
      category: 'Inteligencia Artificial',
      date: '18 Julio 2026',
      readTime: '4 min de lectura',
      summary: 'Descubre cómo los agentes conversacionales atienden clientes fuera de horario laboral y aumentan la tasa de conversión en un 300%.',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Guía Completa para Solicitar Citas de Pasaporte en la Gobernación de Antioquia',
      category: 'Trámites & Asesoría',
      date: '10 Julio 2026',
      readTime: '6 min de lectura',
      summary: 'Paso a paso actualizado para agendar tu cita sin contratiempos, requisitos de documentos y recomendaciones clave en Medellín.',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Diseño Web Estilo Stripe/Vercel: El estándar que prefieren los clientes premium',
      category: 'Desarrollo Web',
      date: '02 Julio 2026',
      readTime: '5 min de lectura',
      summary: 'Cómo la velocidad de carga, la tipografía limpia y los microinteracciones generan confianza instantánea.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Blog & Resources */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Centro de Recursos & Blog Tecnideas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Aprende sobre tecnología, trámites y negocios en Medellín
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Artículos prácticos escritos por nuestro equipo de consultores y desarrolladores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <article
                key={idx}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Leer artículo completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Todo lo que necesitas saber sobre Tecnideas
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
