import { MediaItem } from '../types';

export const INITIAL_MEDIA_CATEGORIES: string[] = [
  'Impresión & Papelería',
  'Accesorios & Hardware',
  'Servicio Técnico',
  'Software & Web',
  'Coworking & Espacios',
  'Cursos & Capacitación',
  'Trámites',
  'Pasaporte & Visa',
  'SOAT',
  'Marketing'
];

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  // Impresión & Papelería
  {
    id: 'media-pap-1',
    name: 'Fotocopiadora Multifuncional Ricoh Pro',
    category: 'Impresión & Papelería',
    storagePath: 'imagenes/impresion-papeleria/fotocopiadora-ricoh-pro.webp',
    publicUrl: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 48200,
    createdAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'media-pap-2',
    name: 'Resmas de Papel Reprograf Carta',
    category: 'Impresión & Papelería',
    storagePath: 'imagenes/impresion-papeleria/resmas-papel-reprograf.webp',
    publicUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 42100,
    createdAt: '2026-03-01T10:05:00.000Z'
  },
  {
    id: 'media-pap-3',
    name: 'Artículos de Papelería y Oficina',
    category: 'Impresión & Papelería',
    storagePath: 'imagenes/impresion-papeleria/papeleria-oficina.webp',
    publicUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 51200,
    createdAt: '2026-03-01T10:10:00.000Z'
  },
  {
    id: 'media-pap-4',
    name: 'Plotter Planos Arquitectura y Diseño',
    category: 'Impresión & Papelería',
    storagePath: 'imagenes/impresion-papeleria/plotter-planos.webp',
    publicUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 56400,
    createdAt: '2026-03-01T10:15:00.000Z'
  },

  // Accesorios & Hardware
  {
    id: 'media-acc-1',
    name: 'Mouse Ergonómico Inalámbrico Silent',
    category: 'Accesorios & Hardware',
    storagePath: 'imagenes/accesorios-hardware/mouse-ergonomico.webp',
    publicUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 39500,
    createdAt: '2026-03-02T11:00:00.000Z'
  },
  {
    id: 'media-acc-2',
    name: 'Teclado Mecánico Retroiluminado',
    category: 'Accesorios & Hardware',
    storagePath: 'imagenes/accesorios-hardware/teclado-mecanico.webp',
    publicUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 47800,
    createdAt: '2026-03-02T11:05:00.000Z'
  },
  {
    id: 'media-acc-3',
    name: 'Headset Auriculares USB Cancelación Ruido',
    category: 'Accesorios & Hardware',
    storagePath: 'imagenes/accesorios-hardware/headset-auriculares.webp',
    publicUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 44200,
    createdAt: '2026-03-02T11:10:00.000Z'
  },
  {
    id: 'media-acc-4',
    name: 'Memoria USB 3.0 Kingston 64GB',
    category: 'Accesorios & Hardware',
    storagePath: 'imagenes/accesorios-hardware/usb-kingston-64gb.webp',
    publicUrl: 'https://images.unsplash.com/photo-1624823183493-5f566e22e6b2?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 38900,
    createdAt: '2026-03-02T11:15:00.000Z'
  },

  // Servicio Técnico
  {
    id: 'media-ser-1',
    name: 'Mantenimiento Preventivo y Limpieza PC',
    category: 'Servicio Técnico',
    storagePath: 'imagenes/servicio-tecnico/mantenimiento-pc.webp',
    publicUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 49300,
    createdAt: '2026-03-03T09:00:00.000Z'
  },
  {
    id: 'media-ser-2',
    name: 'Reparación de Hardware y Placa Madre',
    category: 'Servicio Técnico',
    storagePath: 'imagenes/servicio-tecnico/reparacion-hardware.webp',
    publicUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 52100,
    createdAt: '2026-03-03T09:15:00.000Z'
  },

  // Software & Web
  {
    id: 'media-web-1',
    name: 'Diseño Web Responsive y E-commerce',
    category: 'Software & Web',
    storagePath: 'imagenes/software-web/desarrollo-web.webp',
    publicUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 53800,
    createdAt: '2026-03-04T14:00:00.000Z'
  },
  {
    id: 'media-web-2',
    name: 'Automatización con Agentes de Inteligencia Artificial',
    category: 'Software & Web',
    storagePath: 'imagenes/software-web/agentes-ia.webp',
    publicUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 48900,
    createdAt: '2026-03-04T14:20:00.000Z'
  },

  // Coworking & Espacios
  {
    id: 'media-cow-1',
    name: 'Espacio de Coworking Abierto Tecnideas',
    category: 'Coworking & Espacios',
    storagePath: 'imagenes/coworking-espacios/coworking-abierto.webp',
    publicUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 46200,
    createdAt: '2026-03-05T08:00:00.000Z'
  },
  {
    id: 'media-cow-2',
    name: 'Sala de Juntas Ejecutiva Equipamiento 4K',
    category: 'Coworking & Espacios',
    storagePath: 'imagenes/coworking-espacios/sala-juntas-ejecutiva.webp',
    publicUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 51000,
    createdAt: '2026-03-05T08:30:00.000Z'
  },
  {
    id: 'media-cow-3',
    name: 'Auditorio Tech para Conferencias y Talleres',
    category: 'Coworking & Espacios',
    storagePath: 'imagenes/coworking-espacios/auditorio-tech.webp',
    publicUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 54300,
    createdAt: '2026-03-05T09:00:00.000Z'
  },
  {
    id: 'media-cow-4',
    name: 'Oficina Privada y Privacidad Total',
    category: 'Coworking & Espacios',
    storagePath: 'imagenes/coworking-espacios/oficina-privada.webp',
    publicUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 47900,
    createdAt: '2026-03-05T09:30:00.000Z'
  },

  // Cursos & Capacitación
  {
    id: 'media-cur-1',
    name: 'Taller Práctico de IA para Negocios',
    category: 'Cursos & Capacitación',
    storagePath: 'imagenes/cursos-capacitacion/taller-ia-negocios.webp',
    publicUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 52400,
    createdAt: '2026-03-06T10:00:00.000Z'
  },
  {
    id: 'media-cur-2',
    name: 'Capacitación en Marketing Digital y Redes',
    category: 'Cursos & Capacitación',
    storagePath: 'imagenes/cursos-capacitacion/marketing-digital.webp',
    publicUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 49800,
    createdAt: '2026-03-06T10:30:00.000Z'
  },

  // Trámites
  {
    id: 'media-tra-1',
    name: 'Asesoría y Radicación de Trámites Digitales',
    category: 'Trámites',
    storagePath: 'imagenes/tramites/tramites-digitales.webp',
    publicUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 43500,
    createdAt: '2026-03-07T11:00:00.000Z'
  },

  // Pasaporte & Visa
  {
    id: 'media-pas-1',
    name: 'Gestión Citas Pasaporte y Asesoría Visa',
    category: 'Pasaporte & Visa',
    storagePath: 'imagenes/pasaporte-visa/pasaporte-visa.webp',
    publicUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 47200,
    createdAt: '2026-03-07T12:00:00.000Z'
  },

  // SOAT
  {
    id: 'media-soa-1',
    name: 'Cotización y Emisión Inmediata de SOAT Digital',
    category: 'SOAT',
    storagePath: 'imagenes/soat/soat-digital.webp',
    publicUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 46100,
    createdAt: '2026-03-07T13:00:00.000Z'
  },

  // Marketing
  {
    id: 'media-mar-1',
    name: 'Estrategia y Campañas de Publicidad Digital',
    category: 'Marketing',
    storagePath: 'imagenes/marketing/publicidad-digital.webp',
    publicUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 520,
    size: 51700,
    createdAt: '2026-03-07T14:00:00.000Z'
  }
];
