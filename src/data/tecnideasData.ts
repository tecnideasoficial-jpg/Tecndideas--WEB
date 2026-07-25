import { 
  ServiceItem, 
  PortfolioItem, 
  StoreItem, 
  TimelineEvent, 
  Course, 
  WorkspaceSpace,
  SolutionPillar,
  Sede
} from '../types';

export const COMPANY_INFO = {
  name: 'Tecnideas',
  location: 'Medellín, Colombia',
  experienceYears: 29,
  slogan: 'Ecosistema Digital & HUB de Soluciones Tecnológicas',
  headline: 'Transformamos negocios tradicionales en empresas digitales impulsadas por Inteligencia Artificial',
  subheadline: 'De centro de copiado referente en Medellín a HUB Tecnológico de vanguardia. Más de 29 años acompañando a emprendedores, profesionales y empresas.',
  address: 'CRA 68 No. 96 78, Barrio Castilla, Medellín, Colombia',
  phone: '+57 302 417 1818',
  whatsapp: '+573024171818',
  email: 'tecnideasoficial@gmail.com',
  schedule: 'Lunes a Viernes: 8:00 AM - 7:00 PM | Sábados: 9:00 AM - 5:00 PM',
  stats: {
    years: '29+',
    projects: '1,250+',
    tramites: '15,000+',
    automations: '500+',
    students: '320+'
  }
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1997',
    title: 'El Origen: Centro Tradicional de Copiado y Papelería',
    description: 'Nace Tecnideas en el corazón de Medellín como un centro confiable de fotocopias, impresiones, escáner, encuadernación y papelería corporativa.',
    tag: 'Fundación',
    iconName: 'Printer',
    highlight: 'Más de 10,000 clientes satisfechos en sus primeros años'
  },
  {
    year: '2010',
    title: 'Centro de Trámites e Impresión Digital Avanzada',
    description: 'Evolucionamos para facilitar trámites gubernamentales en línea, citas de pasaportes, SOAT, solicitudes de visas y documentación para ciudadanos y pymes.',
    tag: 'Expansión de Servicios',
    iconName: 'FileText',
    highlight: 'Pioneros en agilizar trámites complejos para la comunidad'
  },
  {
    year: '2018',
    title: 'Transición Digital & Desarrollo Web Corporativo',
    description: 'Comenzamos a construir páginas web, tiendas virtuales e identidades de marca para los negocios de Medellín que buscaban vender en el entorno digital.',
    tag: 'Era Digital',
    iconName: 'Globe',
    highlight: 'Más de 300 sitios web y e-commerce entregados'
  },
  {
    year: '2023',
    title: 'Integración de Inteligencia Artificial & Automatización',
    description: 'Incorporamos bots para WhatsApp, integración con CRM, agentes de IA conversacionales y automatización de procesos para pymes tradicionales.',
    tag: 'Innovación IA',
    iconName: 'Bot',
    highlight: '+80% de reducción en tiempo de atención para clientes'
  },
  {
    year: '2026+',
    title: 'El Ecosistema Digital Tecnideas & HUB de Innovación',
    description: 'Lanzamiento del HUB integral: Agencia de desarrollo web de nivel internacional, Workspace interactivo, Centro de Capacitación y tienda de soluciones 360°.',
    tag: 'Presente & Futuro',
    iconName: 'Sparkles',
    highlight: 'Referente tecnológico en Antioquia y Colombia'
  }
];

export const DIGITAL_SERVICES: ServiceItem[] = [
  {
    id: 'web-design',
    title: 'Diseño Web Premium & Headless CMS',
    category: 'digital',
    description: 'Sitios web ultrarrápidos, visualmente impactantes, optimizados para conversión e inspirados en Stripe, Vercel y Linear.',
    badge: 'Más Solicitado',
    iconName: 'Globe',
    popular: true,
    priceStart: '$999.000 COP',
    idealFor: 'Empresas y profesionales que buscan proyectar autoridad absoluta y captar clientes calificados.',
    features: [
      'Diseño personalizado 100% exclusivo (Sin plantillas genéricas)',
      'Optimización de carga ultrarrápida (Core Web Vitals 95+)',
      'CMS administrable sencillo para publicar productos/servicios',
      'Integración directa con WhatsApp Business y CRM',
      'Certificado de Seguridad SSL + Hosting de Alta Velocidad por 1 año'
    ]
  },
  {
    id: 'e-commerce',
    title: 'Tiendas Virtuales & Pasarelas de Pago',
    category: 'digital',
    description: 'E-commerce robustos listos para vender 24/7 con integración de Wompi, PayU, MercadoPago, Addi y e-Drop/MercadoEnvíos en Colombia.',
    badge: 'Alta Conversión',
    iconName: 'ShoppingBag',
    priceStart: '$1.850.000 COP',
    idealFor: 'Negocios que venden productos físicos o digitales y desean automatizar ventas y despachos.',
    features: [
      'Pasarelas de pago colombianas e internacionales',
      'Cálculo automático de envíos por transportadora',
      'Catálogo ilimitado con variantes (tallas, colores)',
      'Sincronización con inventario y facturación',
      'Recuperación de carritos abandonados por WhatsApp'
    ]
  },
  {
    id: 'ia-automation',
    title: 'Automatización con IA & Agentes de WhatsApp',
    category: 'digital',
    description: 'Agentes inteligentes con IA entrenados con los datos de tu empresa que responden preguntas, agendan citas y cierran ventas en WhatsApp.',
    badge: 'Revolucionario',
    iconName: 'Bot',
    popular: true,
    priceStart: '$1.200.000 COP',
    idealFor: 'Negocios con alto volumen de mensajes que pierden ventas por demoras en respuesta.',
    features: [
      'Agente conversacional alimentado con tu catálogo y PDFs',
      'Integración directa a la API oficial de WhatsApp',
      'Atención 24/7 en lenguaje natural sin respuestas robóticas',
      'Derivación automática a asesores humanos cuando sea necesario',
      'Panel de analítica y registro de conversaciones'
    ]
  },
  {
    id: 'crm-growth',
    title: 'Implementación de CRM & Funnels de Ventas',
    category: 'digital',
    description: 'Organiza tu flujo de clientes, automatiza correos/mensajes y lleva el control del embudo de ventas de tu equipo comercial.',
    iconName: 'Users',
    priceStart: '$850.000 COP',
    idealFor: 'Equipos comerciales que necesitan seguimiento sistemático de prospectos.',
    features: [
      'Configuración de embudo comercial a medida',
      'Automatización de seguimiento post-cotización',
      'Sincronización con tu sitio web y formularios',
      'Capacitación al equipo de ventas'
    ]
  },
  {
    id: 'seo-marketing',
    title: 'Posicionamiento SEO & Marketing de Resultados',
    category: 'digital',
    description: 'Aparece en los primeros lugares de Google cuando tus clientes potenciales buscan tus servicios en Medellín y Colombia.',
    iconName: 'Search',
    priceStart: '$650.000 COP/mes',
    idealFor: 'Empresas que quieren tráfico orgánico cualificado constante.',
    features: [
      'SEO Técnico + Auditoría de palabras clave estratégicas',
      'Google My Business local en Medellín y alrededores',
      'Estrategia de contenidos y landing pages de alta conversión',
      'Informes mensuales con métricas reales de clientes'
    ]
  },
  {
    id: 'software-dev',
    title: 'Desarrollo de Software & Aplicaciones Web Custom',
    category: 'digital',
    description: 'Plataformas web a la medida, paneles administrativos, portales de clientes y micro-SaaS diseñados con Next.js y Node.',
    iconName: 'Code',
    priceStart: '$3.500.000 COP',
    idealFor: 'Empresas con procesos operativos únicos o ideas de negocios digitales avanzadas.',
    features: [
      'Arquitectura en la nube escalable y segura',
      'APIs REST / GraphQL integradas a tus sistemas actuales',
      'Diseño de experiencia UI/UX intuitivo',
      'Mantenimiento y soporte continuo'
    ]
  }
];

export const TRADITIONAL_SERVICES: ServiceItem[] = [
  {
    id: 'centro-copiado',
    title: 'Centro de Copiado & Impresión Digital',
    category: 'tradicional',
    description: 'Fotocopias de alta velocidad, impresiones en blanco y negro y color en múltiples gramajes de papel con máxima nitidez.',
    badge: 'Servicio Tradicional Estrella',
    iconName: 'Printer',
    popular: true,
    priceStart: 'Desde $100 COP / copia',
    idealFor: 'Estudiantes, profesionales, abogados, contadores y empresas en Medellín.',
    features: [
      'Impresión de alta calidad desde USB, correo o WhatsApp',
      'Formatos desde carta, oficio, tabloide hasta planos y cartelería',
      'Encuadernación, argollado y plastificado térmico',
      'Descuentos especiales para volúmenes corporativos'
    ]
  },
  {
    id: 'tramites-pasaportes-visas',
    title: 'Asesoría en Trámites, Pasaportes & Visas',
    category: 'tradicional',
    description: 'Acompañamiento especializado para asignación de citas de pasaporte en la Gobernación de Antioquia, diligenciamiento de formularios de visa y SOAT.',
    badge: 'Confianza Garantizada',
    iconName: 'FileCheck',
    priceStart: 'Desde $35.000 COP',
    idealFor: 'Personas y familias que requieren agilizar trámites oficiales de forma segura y sin errores.',
    features: [
      'Diligenciamiento de formulario DS-160 para Visa Americana',
      'Agendamiento de citas de Pasaporte Gobernación de Antioquia',
      'Expedición e impresión de SOAT digital al instante',
      'Trámites de RUNT, Cámara de Comercio y DIAN'
    ]
  },
  {
    id: 'papeleria-escaner',
    title: 'Papelería Corporativa & Escáner de Alta Resolución',
    category: 'tradicional',
    description: 'Digitalización masiva de documentos a PDF con reconocimiento OCR, insumos de papelería para oficina y suministros.',
    iconName: 'Scanner',
    priceStart: 'Desde $500 COP / pág',
    idealFor: 'Archivos empresariales, firmas de abogados e instituciones.',
    features: [
      'Escaneo masivo dúplex a color enviado directo a tu correo o USB',
      'Digitalización en formato PDF buscando texto (OCR)',
      'Suministros de papelería fina y carpetas institucional'
    ]
  }
];

export const ECOSISTEMA_SERVICES: ServiceItem[] = [
  {
    id: 'eco-workspace',
    title: 'Tecnideas Workspace Coworking',
    category: 'ecosistema',
    priceStart: 'Desde $25.000 COP / día',
    description: 'Espacios de trabajo flexibles, escritorios dedicados, salas de juntas equipadas con pantalla 4K e internet de alta velocidad 300 Mbps en Medellín.',
    idealFor: 'Freelancers, nómadas digitales, emprendedores y reuniones corporativas',
    features: [
      'Escritorios ergonómicos con tomas eléctricas',
      'Salas de juntas privadas con Smart TV 4K',
      'Internet fibra óptica de alta velocidad (300 Mbps)',
      'Café, agua e impresiones de cortesía',
      'Acceso flexible por horas, días o mensualidad'
    ],
    popular: true,
    badge: 'HUB Medellín',
    iconName: 'Building2'
  },
  {
    id: 'eco-capacitacion',
    title: 'Cursos & Talleres de IA Práctica',
    category: 'ecosistema',
    priceStart: 'Desde $180.000 COP / taller',
    description: 'Capacitación presencial y virtual en Inteligencia Artificial aplicada a negocios: Prompt Engineering, Automatización de WhatsApp, Agentes IA y Creación Web.',
    idealFor: 'Emprendedores, equipos de ventas y profesionales en Medellín',
    features: [
      'Clases 100% prácticas en grupos reducidos',
      'Acompañamiento personalizado paso a paso',
      'Planta de pruebas y prompts listos para usar',
      'Certificado de asistencia Tecnideas',
      'Comunidad privada para resolución de dudas'
    ],
    popular: false,
    badge: 'Aprende IA',
    iconName: 'GraduationCap'
  },
  {
    id: 'eco-tienda',
    title: 'Tienda Tecnideas (Licencias & Kits)',
    category: 'ecosistema',
    priceStart: 'Desde $45.000 COP',
    description: 'Adquiere licencias de softwares con IA, membresías de coworking, pases de papelería, kits de diseño y plantillas web optimizadas.',
    idealFor: 'Negocios y creativos buscando recursos listos para utilizar',
    features: [
      'Licencias oficiales garantizadas',
      'Pases de impresión y escáner prepagados',
      'Plantillas web y chatbots preconfigurados',
      'Atención personalizada y soporte técnico',
      'Compra inmediata segura vía WhatsApp / Wompi'
    ],
    popular: false,
    badge: 'Recursos',
    iconName: 'ShoppingBag'
  },
  {
    id: 'eco-showroom',
    title: 'Showroom de Casos & Proyectos 360°',
    category: 'ecosistema',
    priceStart: 'Ver Casos de Éxito',
    description: 'Conoce proyectos reales desarrollados para clientes en Colombia: desde empresas transformadas con IA hasta e-commerce e identidades de marca.',
    idealFor: 'Empresas buscando inspiración y validación de resultados',
    features: [
      'Historias de éxito con métricas de conversión',
      'Demostración en vivo de bots y sitios web',
      'Muestras de litografía y papelería física',
      'Asesoría técnica personalizada en sitio',
      'Atención en nuestra Sede Principal Castilla'
    ],
    popular: false,
    badge: 'Medellín',
    iconName: 'Briefcase'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Ecosistema E-Commerce & IA para Grupo Industrial Antioquia',
    client: 'Grupo Industrial Medellín',
    category: 'Tienda Virtual & IA',
    industry: 'Industria & Manufactura',
    description: 'Modernización completa de catálogo con cotizador automático en tiempo real y agente de WhatsApp integrado.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Aumento en Ventas', value: '+240%' },
      { label: 'Tiempo de Respuesta', value: '< 15 seg' },
      { label: 'Leads Cualificados', value: '3,400+' }
    ],
    technologies: ['React', 'Next.js', 'WhatsApp AI API', 'Wompi Pay', 'Tailwind CSS'],
    priceRange: '$3.800.000 COP',
    liveUrl: 'https://ejemplo-industrial.com'
  },
  {
    id: '2',
    title: 'Plataforma Web Premium para Firma Legal Medellín',
    client: 'Restrepo & Asociados Abogados',
    category: 'Diseño Web Corporativo',
    industry: 'Servicios Profesionales',
    description: 'Diseño elegante estilo Stripe/Linear con reserva de citas online sincronizada con Google Calendar y pago previo.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Conversión de Visitas', value: '18.4%' },
      { label: 'Citas Automatizadas', value: '120/mes' }
    ],
    technologies: ['React', 'TypeScript', 'Google Calendar API', 'Tailwind'],
    priceRange: '$1.950.000 COP',
    liveUrl: 'https://ejemplo-abogados.com'
  },
  {
    id: '3',
    title: 'Agente de IA en WhatsApp para Cadena de Clínicas Estéticas',
    client: 'Clínica BioEstética Medellín',
    category: 'Automatización & IA',
    industry: 'Salud & Bienestar',
    description: 'Bot de inteligencia artificial que califica pacientes, responde preguntas sobre procedimientos y agenda citas médicas.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Atención Automática', value: '94%' },
      { label: 'Citas Confirmadas', value: '450/mes' }
    ],
    technologies: ['Gemini API', 'WhatsApp Official API', 'Node.js', 'CRM Cloud'],
    priceRange: '$1.400.000 COP'
  },
  {
    id: '4',
    title: 'Portal de Restaurante GastroBar con Carta Digital & Pedidos',
    client: 'Sabor & Origen El Poblado',
    category: 'App Web & Menú QR',
    industry: 'Gastronomía',
    description: 'Menú interactivo con pedidos directos a cocina y WhatsApp, pagos por Nequi/Daviplata y programa de fidelización.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Ventas en Mesa QR', value: '+35%' },
      { label: 'Ahorro en Personal', value: '25%' }
    ],
    technologies: ['React', 'Express', 'PWA', 'Tailwind'],
    priceRange: '$1.250.000 COP'
  }
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'pack-web-pyme',
    name: 'Plan Sitio Web Corporativo Premium',
    category: 'digital',
    type: 'servicio',
    price: 999000,
    currency: 'COP',
    description: 'Diseño web moderno, responsivo, optimizado para conversión con dominio .com y hosting por 1 año incluido.',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    features: [
      'Hasta 5 secciones personalizadas',
      'Formulario de contacto + Botón WhatsApp',
      'Hosting SSD rápido + Certificado SSL',
      'Dominio corporativo incluido por 1 año',
      'Optimización SEO básica para Google'
    ]
  },
  {
    id: 'pack-bot-whatsapp',
    name: 'Licencia & Configuración Agente IA WhatsApp',
    category: 'licencias',
    type: 'servicio',
    price: 1200000,
    currency: 'COP',
    description: 'Asistente de IA entrenado para responder en WhatsApp Business con los productos y servicios de tu negocio.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    badge: 'Innovación IA',
    features: [
      'Entrenamiento personalizado con tus PDFs/catálogos',
      'Atención 24 horas 7 días a la semana',
      'Sincronización con hojas de cálculo o CRM',
      'Soporte técnico y ajustes por 3 meses'
    ]
  },
  {
    id: 'hoja-de-vida-nueva',
    name: 'Creación de Hoja de vida (Nueva)',
    category: 'impresion_digitacion',
    type: 'servicio',
    price: 15000,
    currency: 'COP',
    description: 'Diseño, redacción y estructuración profesional de Hoja de Vida adaptada a convocatorias laborales y estándares ATS.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    badge: 'Nueva',
    features: [
      'Formato digital PDF editable + versión impresa',
      'Redacción de perfil profesional enfocado',
      'Estructura clara, moderna y limpia',
      'Impresión en papel de alta calidad incluida'
    ]
  },
  {
    id: 'impresion-tradicional',
    name: 'Impresión Tradicional & Digitación',
    category: 'impresion_digitacion',
    type: 'servicio',
    price: 500,
    currency: 'COP',
    description: 'Servicio de impresión, fotocopias rápida B/N y Color, digitación de documentos y escáner de alta definición.',
    imageUrl: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
    badge: 'Desde $500',
    features: [
      'Impresión desde USB, Correo o WhatsApp al instante',
      'Formatos Carta, Oficio, Tabloide y especiales',
      'Digitación rápida y corrección de textos',
      'Argollado, plastificado y encuadernación'
    ]
  },
  {
    id: 'tecnologia-mantenimiento',
    name: 'Mantenimiento & Diagnóstico Tecnológico',
    category: 'tecnologia',
    type: 'servicio',
    price: 80000,
    currency: 'COP',
    description: 'Mantenimiento preventivo, revisión física, optimización de velocidad y formateo de computadores y laptops.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    badge: 'Servicio Técnico',
    features: [
      'Limpieza interna y cambio de crema térmica',
      'Eliminación de virus y software malicioso',
      'Formateo e instalación de sistemas y programas',
      'Diagnóstico de discos SSD y memoria RAM'
    ]
  },
  {
    id: 'tecnologia-perifericos',
    name: 'Accesorios Tecnológicos & Periféricos',
    category: 'tecnologia',
    type: 'producto',
    price: 45000,
    currency: 'COP',
    description: 'Periféricos de computación: tecleados, mouses ergonómicos, cables HDMI, cargadores, memorias USB y accesorios.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    features: [
      'Garantía directa de funcionamiento Tecnideas',
      'Productos probados para oficina y hogar',
      'Cables, adaptadores y conectividad USB/HDMI'
    ]
  },
  {
    id: 'resma-papel-carta',
    name: 'Resma de Papel Carta (500 Hojas)',
    category: 'papeleria',
    type: 'producto',
    price: 22000,
    currency: 'COP',
    description: 'Resma de papel bond blanco de 75g/m² especial para fotocopiadoras, impresoras láser e inyección de tinta.',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    badge: 'Insumo Calidad',
    features: [
      '500 Hojas blancas tamaño Carta (21.6 x 27.9 cm)',
      'Papel ecológico de alta blancura sin atascos',
      'Suministros de papelería al mejor precio'
    ]
  },
  {
    id: 'papeleria-insumos-oficina',
    name: 'Kit Insumos de Papelería & Archivo',
    category: 'papeleria',
    type: 'producto',
    price: 18000,
    currency: 'COP',
    description: 'Carpetas legajadoras, sobres manila, ganchos legajadores, cuadernos y suministros esenciales para oficina y estudio.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    features: [
      'Carpetas legajadoras y sobres de protección',
      'Insumos para oficina, trámites y colegio',
      'Atención al detalle en cada suministro'
    ]
  },
  {
    id: 'pack-coworking-mes',
    name: 'Membresía Mensual Workspace Tecnideas',
    category: 'workspace',
    type: 'pase',
    price: 320000,
    currency: 'COP',
    description: 'Acceso a puesto flexible en nuestro coworking en Medellín con internet de fibra óptica dedicada, café y salas de reuniones.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: [
      'Acceso Lunes a Sábado',
      'Internet simétrico 300 Mbps',
      '4 horas incluidas de Sala de Reuniones',
      'Descuento en centro de copiado e impresiones'
    ]
  },
  {
    id: 'curso-ia-pymes',
    name: 'Curso Presencial: IA para Emprendedores & Pymes',
    category: 'capacitacion',
    type: 'servicio',
    price: 250000,
    currency: 'COP',
    description: 'Taller práctico de 8 horas en nuestro Centro de Capacitación para dominar Gemini, ChatGPT y automatizaciones en tu negocio.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    badge: 'Cupos Limitados',
    features: [
      'Material de estudio impreso y digital',
      'Certificado de asistencia Tecnideas',
      'Acceso a grupo exclusivo de WhatsApp',
      'Instalación de herramientas prácticas'
    ]
  }
];

export const COURSES: Course[] = [
  {
    id: 'ia-pymes',
    title: 'Inteligencia Artificial Práctica para Negocios',
    level: 'Principiante a Intermedio',
    duration: '12 Horas (3 Sesiones)',
    modality: 'Presencial (Medellín)',
    description: 'Aprende a crear contenidos, redactar propuestas, automatizar respuestas de clientes y analizar finanzas usando IA.',
    instructor: 'Equipo Tecnideas IA',
    price: '$250.000 COP',
    badge: 'Inicia este sábado',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    topics: [
      'Prompts avanzados para ventas y copywriting',
      'Creación de imágenes para redes sociales con IA',
      'Agentes de chat para atención al cliente',
      'Automatizaciones con Make y Zapier'
    ]
  },
  {
    id: 'whatsapp-automation',
    title: 'Cierra Ventas en Piloto Automático con WhatsApp & CRM',
    level: 'Todos los niveles',
    duration: '8 Horas',
    modality: 'Virtual En Vivo',
    description: 'Configura tu embudo de ventas en WhatsApp Business sin perder prospectos y organiza tu base de datos.',
    instructor: 'Especialista en Growth Tecnideas',
    price: '$180.000 COP',
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80',
    topics: [
      'Etiquetas y catálogos efectivos en WhatsApp',
      'Integración con formularios web',
      'Respuestas rápidas y plantillas de alta conversión',
      'Métricas e historial de prospectos'
    ]
  },
  {
    id: 'wordpress-no-code',
    title: 'Crea tu Sitio Web Profesional sin Programar',
    level: 'Principiante',
    duration: '16 Horas',
    modality: 'Presencial (Medellín)',
    description: 'Construye la página web de tu propio emprendimiento desde cero con dominio, correo corporativo y diseño adaptable.',
    instructor: 'Desarrollador Senior Tecnideas',
    price: '$320.000 COP',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    topics: [
      'Configuración de Hosting y Dominio',
      'Diseño visual con editores modernos',
      'E-commerce básico para vender en Colombia',
      'Posicionamiento inicial en Google'
    ]
  }
];

export const WORKSPACE_SPACES: WorkspaceSpace[] = [
  {
    id: 'hot-desk',
    name: 'Puestos Flexibles de Coworking',
    capacity: '1 a 15 Personas',
    priceHour: '$8.000 COP',
    priceDay: '$35.000 COP',
    description: 'Espacios de trabajo ergonómicos en un ambiente inspirador con comunidad de emprendedores en Medellín.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Internet 300 Mbps', 'Café & Té ilimitado', 'Silla ergonómica', 'Descuento en impresiones']
  },
  {
    id: 'sala-juntas',
    name: 'Sala de Reuniones Ejecutiva',
    capacity: 'Hasta 10 Personas',
    priceHour: '$45.000 COP',
    priceDay: '$280.000 COP',
    description: 'Ideal para presentaciones a clientes, juntas directivas, capacitaciones de equipo o entrevistas.',
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    amenities: ['Pantalla Smart 65"', 'Tablero de cristal', 'Videoconferencia HD', 'Servicio de catering opcional']
  },
  {
    id: 'auditorio-capacitacion',
    name: 'Aula / Auditorio de Capacitación',
    capacity: 'Hasta 30 Personas',
    priceHour: '$85.000 COP',
    priceDay: '$550.000 COP',
    description: 'Espacio acondicionado para talleres, conferencias, lanzamientos de marca y capacitaciones corporativas.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Video Proyector 4K', 'Sistema de Sonido & Micrófono', 'Aire acondicionado', 'Mobiliario modulable']
  }
];

export const FAQS = [
  {
    q: '¿Siguen prestando los servicios tradicionales de fotocopias, impresiones y trámites?',
    a: '¡Por supuesto! Es nuestra esencia desde hace más de 29 años. Mantenemos el centro de copiado con la más alta velocidad y calidad en Medellín, papelería, escáner, SOAT y asesoría en citas de pasaporte y visas.'
  },
  {
    q: '¿Cuánto tiempo toma desarrollar un sitio web corporativo o tienda virtual?',
    a: 'Nuestras páginas web corporativas se entregan en promedio entre 5 a 10 días hábiles. Para tiendas virtuales o desarrollos a la medida, el plazo típico es de 10 a 20 días hábiles.'
  },
  {
    q: '¿Cómo funciona el Agente de IA para WhatsApp?',
    a: 'Lo conectamos a tu número oficial de WhatsApp Business y lo alimentamos con la información de tu empresa (precios, horarios, catálogos, preguntas frecuentes). El agente responderá de forma inteligente las 24 horas y agendará clientes.'
  },
  {
    q: '¿Puedo visitar el Tecnideas Workspace en Medellín sin cita previa?',
    a: 'Sí, puedes acercarte a nuestras instalaciones para conocer las salas, usar los puestos de trabajo por horas o realizar impresiones y trámites. También puedes reservar previamente por WhatsApp.'
  },
  {
    q: '¿Ofrecen facilidades de pago para el desarrollo web y automatizaciones?',
    a: 'Sí, manejamos un esquema de 50% al iniciar el proyecto y 50% a la entrega a satisfacción. Aceptamos transferencias Bancolombia, Nequi, Daviplata, tarjetas de crédito y e-Drop.'
  }
];

export const INITIAL_SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'pillar-digital',
    title: 'Servicios Digitales & IA',
    subtitle: 'Desarrollo Web Premium, Pasarelas Wompi, Agentes Inteligentes y SEO',
    iconName: 'Globe',
    color: 'blue',
    tag: 'Especialidad #1',
    targetPage: 'digital',
    buttonText: 'Explorar Servicios Digitales',
    features: [
      'Diseño Web Responsivo & Ultrasustentable',
      'E-commerce Wompi con pagos directo en Colombia',
      'Bots de IA en WhatsApp para atención 24/7',
      'Automatización CRM & Embudo de Ventas',
      'SEO Local Medellín para liderar búsquedas'
    ]
  },
  {
    id: 'pillar-tradicional',
    title: 'Centro Tradicional & Trámites',
    subtitle: 'Fotocopias HD, Citas de Pasaporte Antioquia, DS-160 y Escáner OCR',
    iconName: 'Printer',
    color: 'purple',
    tag: 'Especialidad #2',
    targetPage: 'tradicional',
    buttonText: 'Explorar Centro Tradicional',
    features: [
      'Fotocopias & Impresiones de alta velocidad',
      'Agendamiento Citas Pasaporte Gobernación',
      'Formulario Visas DS-160 profesional',
      'Digitalización & Escáner OCR de archivos',
      'Expedición Inmediata SOAT vehicular'
    ]
  },
  {
    id: 'pillar-ecosistema',
    title: 'Ecosistema Tecnideas',
    subtitle: 'Workspace Coworking, Capacitación IA, Tienda & Showroom',
    iconName: 'Building2',
    color: 'emerald',
    tag: 'Especialidad #3',
    targetPage: 'ecosistema',
    buttonText: 'Explorar Ecosistema HUB',
    features: [
      'Tecnideas Workspace (Escritorios & Salas)',
      'Cursos & Talleres IA (YouTube & Vivo)',
      'Tienda Tecnideas (Licencias & Kits)',
      'Showroom de Casos de éxito en Colombia',
      'Comunidad & Networking emprendedor'
    ]
  }
];

export const INITIAL_SEDES: Sede[] = [
  {
    id: 'sede-castilla',
    name: 'Sede Principal Castilla (Medellín)',
    address: 'CRA 68 No. 96 78, Barrio Castilla',
    city: 'Medellín, Colombia',
    phone: '+57 300 912 8472',
    schedule: 'Lunes a Viernes: 8:00 AM - 6:30 PM | Sábados: 9:00 AM - 2:00 PM',
    status: 'Operativa',
    isPrimary: true,
    mapUrl: 'https://maps.google.com/maps?q=Cra.+68+%2396-78,+Castilla,+Medell%C3%ADn,+Antioquia,+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed',
    description: 'Centro de Copiado, Trámites, Coworking Workspace y HUB Tecnológico principal.'
  }
];
