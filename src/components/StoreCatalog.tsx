import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Check, 
  Filter, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  Box, 
  Layers,
  Lock,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Video,
  Image as ImageIcon,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  X,
  CreditCard,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { StoreItem } from '../types';

// Helper to convert normal video links to safe embed URLs
export function getVideoEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube format (watch?v=, youtu.be/, shorts/, embed/)
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
  }

  // Vimeo format
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return trimmed;
}

// Subcomponent: Product Card with 2-way image carousel (Auto & Manual)
interface StoreProductCardProps {
  item: StoreItem;
  onOpenDetails: (item: StoreItem) => void;
  onOrderWhatsApp: (name: string, price: number) => void;
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({
  item,
  onOpenDetails,
  onOrderWhatsApp
}) => {
  // Collect images array (minimum 1)
  const images = (Array.isArray(item.images) && item.images.length > 0)
    ? item.images.filter(Boolean)
    : (item.imageUrl ? [item.imageUrl] : ['https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80']);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const safeIdx = currentIdx < images.length ? currentIdx : 0;

  // Auto rotation effect
  useEffect(() => {
    if (!isAuto || isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAuto, isHovered, images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIdx(idx);
  };

  const toggleAutoMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAuto((prev) => !prev);
  };

  const hasVideo = !!item.videoUrl;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image / Carousel Area */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-950 select-none">
          <img
            key={safeIdx}
            src={images[safeIdx]}
            alt={`${item.name} - ${safeIdx + 1}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
            {item.badge && (
              <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs">
                {item.badge}
              </span>
            )}
            {hasVideo && (
              <span className="bg-rose-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                <Video className="w-2.5 h-2.5" />
                <span>Video Demo</span>
              </span>
            )}
          </div>

          {/* Price Badge */}
          <span className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-md border border-slate-700/80 shadow-md z-10">
            ${item.price.toLocaleString()} COP
          </span>

          {/* Carousel Controls: Arrows & Auto/Manual Toggle */}
          {images.length > 1 && (
            <>
              {/* Left / Right Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Control Bar: Dots & Auto/Manual Toggle */}
              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-white text-[10px] z-10 border border-white/10">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => handleDotClick(e, dotIdx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === safeIdx
                          ? 'w-4 bg-cyan-400'
                          : 'w-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Ver foto ${dotIdx + 1}`}
                    />
                  ))}
                  <span className="text-[9px] font-mono text-slate-300 ml-1">
                    {safeIdx + 1}/{images.length}
                  </span>
                </div>

                {/* Auto / Manual Mode Switcher */}
                <button
                  type="button"
                  onClick={toggleAutoMode}
                  title={isAuto ? 'Rotación automática activa (Clic para pausar a modo manual)' : 'Control manual activo (Clic para activar rotación automática)'}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[9px] transition-colors cursor-pointer ${
                    isAuto
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'bg-white/10 text-slate-200 border border-white/20'
                  }`}
                >
                  {isAuto ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Auto</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-2.5 h-2.5 text-amber-400" />
                      <span>Manual</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {item.salesPitch || item.description}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {item.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 flex gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(item)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Ver detalles</span>
        </button>

        <button
          type="button"
          onClick={() => onOrderWhatsApp(item.name, item.price)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-1"
        >
          <span>Comprar / Cotizar</span>
        </button>
      </div>
    </div>
  );
};

// Subcomponent: In-Page Sales Landing Page Modal
interface ProductSalesLandingModalProps {
  item: StoreItem;
  onClose: () => void;
  onOrderWhatsApp: (name: string, price: number) => void;
}

const ProductSalesLandingModal: React.FC<ProductSalesLandingModalProps> = ({
  item,
  onClose,
  onOrderWhatsApp
}) => {
  const images = (Array.isArray(item.images) && item.images.length > 0)
    ? item.images.filter(Boolean)
    : (item.imageUrl ? [item.imageUrl] : ['https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80']);

  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>(item.videoUrl ? 'video' : 'photos');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);

  const safePhotoIdx = selectedPhotoIdx < images.length ? selectedPhotoIdx : 0;

  const embedUrl = getVideoEmbedUrl(item.videoUrl);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:px-6 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-blue-600 dark:text-blue-400">Tienda Tecnideas Medellín</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono text-[10px]">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* Hero Section: Media Gallery & Purchase Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Media & Video Player (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Media Mode Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('photos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeMediaTab === 'photos'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Galería de Fotos ({images.length})</span>
                </button>

                {embedUrl && (
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMediaTab === 'video'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-rose-400" />
                    <span>Video Demostrativo</span>
                  </button>
                )}
              </div>

              {/* Main Media Screen */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 aspect-video flex items-center justify-center shadow-lg">
                {activeMediaTab === 'video' && embedUrl ? (
                  /* Embedded Video Player without leaving page */
                  <div className="w-full h-full relative">
                    <iframe
                      src={embedUrl}
                      title={`Video de ${item.name}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* High-Res Photo View with interactive controls */
                  <div className="relative w-full h-full">
                    <img
                      src={images[safePhotoIdx]}
                      alt={`${item.name} - Vista ${safePhotoIdx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedPhotoIdx((prev) => (prev - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer transition-colors shadow-md"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPhotoIdx((prev) => (prev + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer transition-colors shadow-md"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono border border-white/20">
                      Foto {safePhotoIdx + 1} de {images.length}
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails Strip */}
              {activeMediaTab === 'photos' && images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((imgUrl, thumbIdx) => (
                    <button
                      key={thumbIdx}
                      type="button"
                      onClick={() => setSelectedPhotoIdx(thumbIdx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        safePhotoIdx === thumbIdx
                          ? 'border-blue-600 scale-95 shadow-md ring-2 ring-blue-500/30'
                          : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Miniatura ${thumbIdx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-medium">Garantía Tecnideas 29+ años</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-[11px] font-medium">Sede Principal Barrio Castilla</span>
                </div>
              </div>

            </div>

            {/* Right Column: Commercial Offer & Instant Conversion (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold uppercase">
                      {item.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] ml-1">5.0 (Clientes Verificados)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {item.name}
                </h1>

                {item.salesPitch && (
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {item.salesPitch}
                  </p>
                )}
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50/50 dark:from-slate-950 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Inversión transparente sin cobros ocultos:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {item.currency || 'COP'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                  <span>50% al iniciar y 50% a la entrega • Wompi, Bancolombia, Nequi o Efectivo</span>
                </p>
              </div>

              {/* Primary Call to Action */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onOrderWhatsApp(item.name, item.price)}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-600/25 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Comprar / Adquirir por WhatsApp</span>
                </button>

                <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                  Respuesta inmediata de nuestro equipo de asesores en Medellín.
                </p>
              </div>

              {/* What is Included Quick Checklist */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Lo que incluye tu compra:
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Extended Sales Story & Benefits */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                ¿Por qué esta solución es ideal para tu negocio?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {item.longDescription || item.description}
              </p>
            </div>

            {/* Deliverables List (if present) */}
            {item.deliverables && item.deliverables.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Entregables y especificaciones clave:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.deliverables.map((deliv, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3 Steps Purchase Guide */}
            <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>¿Cómo es el proceso de compra con Tecnideas?</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Paso 1:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Contacto Directo</p>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Haces clic en comprar por WhatsApp y te asignamos un asesor senior.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Paso 2:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Ejecución & Seguimiento</p>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Desarrollamos o alistamos tu producto con los más altos estándares de calidad.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Paso 3:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Entrega & Soporte</p>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Recibes a satisfacción con factura y soporte continuo en Medellín.</p>
                </div>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Garantía Blindada Tecnideas:</span>
                <span>{item.guaranteeText || 'Más de 29 años de trayectoria en Medellín respaldando a cada cliente.'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Sticky Conversion Bar */}
        <div className="p-4 sm:px-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Precio Final:</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
              ${item.price.toLocaleString()} COP
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={() => {
                onOrderWhatsApp(item.name, item.price);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comprar por WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const StoreCatalog: React.FC = () => {
  const { storeItems, categories } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  const filteredItems = selectedCategory === 'todos'
    ? storeItems
    : storeItems.filter(item => item.category === selectedCategory);

  const handleOrderWhatsApp = (itemName: string, price: number) => {
    const text = `Hola Tecnideas, me interesa comprar/adquirir en la Tienda el producto/servicio: *${itemName}* por $${price.toLocaleString()} COP. ¿Cómo procedo con el pago y la entrega?`;
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="tienda" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Tienda Tecnideas 360°</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Soluciones digitales y físicas listas para adquirir
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Adquiere impresiones, trámites, licencias de IA, accesorios de tecnología, papelería y desarrollo web con atención personalizada en Medellín.
          </p>
        </div>

        {/* Dynamic Categories Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid with 2-way image carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <StoreProductCard
              key={item.id}
              item={item}
              onOpenDetails={(it) => setSelectedItem(it)}
              onOrderWhatsApp={handleOrderWhatsApp}
            />
          ))}
        </div>

      </div>

      {/* In-Page Sales Landing Page Modal */}
      {selectedItem && (
        <ProductSalesLandingModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onOrderWhatsApp={handleOrderWhatsApp}
        />
      )}

    </section>
  );
};
