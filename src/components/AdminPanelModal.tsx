import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  Youtube, 
  Layers, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Image as ImageIcon,
  DollarSign,
  Sparkles,
  Search,
  ExternalLink,
  GraduationCap,
  MapPin,
  Building2,
  Globe
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { 
  StoreItem, 
  StoreCategory, 
  YoutubeVideo, 
  ServiceItem,
  Course,
  SolutionPillar,
  Sede 
} from '../types';

export const AdminPanelModal: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    isAuthModalOpen,
    isAdminPanelOpen,
    openAdminPanel,
    closeAuthModal,
    closeAdminPanel,
    loginWithEmail,
    loginWithGoogle,
    logout,
    storeItems,
    categories,
    youtubeVideos,
    digitalServices,
    courses,
    solutionPillars,
    sedes,
    addStoreItem,
    updateStoreItem,
    deleteStoreItem,
    addCategory,
    updateCategory,
    deleteCategory,
    addYoutubeVideo,
    updateYoutubeVideo,
    deleteYoutubeVideo,
    addDigitalService,
    updateDigitalService,
    deleteDigitalService,
    addCourse,
    updateCourse,
    deleteCourse,
    addSolutionPillar,
    updateSolutionPillar,
    deleteSolutionPillar,
    addSede,
    updateSede,
    deleteSede
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'services' | 'courses' | 'pillars' | 'sedes' | 'videos'>('products');
  const [searchTerm, setSearchTerm] = useState('');

  // Login Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Editing state for Items
  const [editingProduct, setEditingProduct] = useState<Partial<StoreItem> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Editing state for Category
  const [editingCategory, setEditingCategory] = useState<Partial<StoreCategory> | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Editing state for Video
  const [editingVideo, setEditingVideo] = useState<Partial<YoutubeVideo> | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Editing state for Digital Service
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Editing state for Course
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseTopicsText, setCourseTopicsText] = useState('');

  // Editing state for Solution Pillar
  const [editingPillar, setEditingPillar] = useState<Partial<SolutionPillar> | null>(null);
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [pillarFeaturesText, setPillarFeaturesText] = useState('');

  // Editing state for Sede
  const [editingSede, setEditingSede] = useState<Partial<Sede> | null>(null);
  const [isSedeModalOpen, setIsSedeModalOpen] = useState(false);

  if (!isAuthModalOpen && !isAdminPanelOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);
    try {
      await loginWithEmail(email, password);
      closeAuthModal();
      openAdminPanel();
      setIsLoggingIn(false);
    } catch (err: any) {
      setIsLoggingIn(false);
      setAuthError(err.message || 'Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await loginWithGoogle();
      closeAuthModal();
      openAdminPanel();
    } catch (err: any) {
      setAuthError(err.message || 'Error con autenticación de Google');
    }
  };

  // Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price || !editingProduct?.category) return;

    const featArray = typeof editingProduct.features === 'string'
      ? (editingProduct.features as string).split('\n').map(s => s.trim()).filter(Boolean)
      : editingProduct.features || [];

    if (editingProduct.id) {
      await updateStoreItem(editingProduct.id, {
        ...editingProduct,
        features: featArray
      });
    } else {
      await addStoreItem({
        name: editingProduct.name || '',
        category: editingProduct.category || 'digital',
        type: (editingProduct.type as any) || 'servicio',
        price: Number(editingProduct.price) || 0,
        currency: editingProduct.currency || 'COP',
        description: editingProduct.description || '',
        imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
        badge: editingProduct.badge || '',
        features: featArray
      });
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Category Save
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.label) return;

    if (editingCategory.id) {
      await updateCategory(editingCategory.id, editingCategory);
    } else {
      await addCategory({
        label: editingCategory.label,
        order: Number(editingCategory.order) || categories.length + 1
      });
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  // Video Save
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.title || !editingVideo?.url) return;

    const thumb = editingVideo.thumbnail || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';

    if (editingVideo.id) {
      await updateYoutubeVideo(editingVideo.id, { ...editingVideo, thumbnail: thumb });
    } else {
      await addYoutubeVideo({
        title: editingVideo.title || '',
        duration: editingVideo.duration || '10:00 min',
        views: editingVideo.views || '1.0K vistas',
        thumbnail: thumb,
        url: editingVideo.url || 'https://youtube.com',
        description: editingVideo.description || ''
      });
    }
    setIsVideoModalOpen(false);
    setEditingVideo(null);
  };

  // Service Save
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    const featArray = typeof editingService.features === 'string'
      ? (editingService.features as string).split('\n').map(s => s.trim()).filter(Boolean)
      : editingService.features || [];

    if (editingService.id) {
      await updateDigitalService(editingService.id, { ...editingService, features: featArray });
    } else {
      await addDigitalService({
        title: editingService.title || '',
        category: (editingService.category as any) || 'digital',
        description: editingService.description || '',
        badge: editingService.badge || '',
        iconName: editingService.iconName || 'Globe',
        features: featArray,
        priceStart: editingService.priceStart || '$500.000 COP',
        idealFor: editingService.idealFor || 'Emprendedores y Pymes'
      });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Course Save
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse?.title) return;

    const topicsArr = courseTopicsText
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);

    const img = editingCourse.imageUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';

    if (editingCourse.id) {
      await updateCourse(editingCourse.id, {
        ...editingCourse,
        imageUrl: img,
        topics: topicsArr
      });
    } else {
      await addCourse({
        title: editingCourse.title || 'Nuevo Taller',
        level: editingCourse.level || 'Todos los niveles',
        duration: editingCourse.duration || '6 Horas',
        modality: editingCourse.modality || 'Presencial (Medellín)',
        description: editingCourse.description || '',
        instructor: editingCourse.instructor || 'Equipo Tecnideas',
        price: editingCourse.price || '$150.000 COP',
        badge: editingCourse.badge || '',
        imageUrl: img,
        topics: topicsArr
      });
    }
    setIsCourseModalOpen(false);
    setEditingCourse(null);
  };

  // Pillar Save
  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar?.title) return;

    const featuresArr = pillarFeaturesText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    if (editingPillar.id) {
      await updateSolutionPillar(editingPillar.id, {
        ...editingPillar,
        features: featuresArr
      });
    } else {
      await addSolutionPillar({
        title: editingPillar.title || 'Nueva Solución',
        subtitle: editingPillar.subtitle || '',
        iconName: editingPillar.iconName || 'Globe',
        color: editingPillar.color || 'blue',
        tag: editingPillar.tag || 'Especialidad',
        targetPage: editingPillar.targetPage || 'digital',
        buttonText: editingPillar.buttonText || 'Ver Detalles',
        features: featuresArr
      });
    }
    setIsPillarModalOpen(false);
    setEditingPillar(null);
  };

  // Sede Save
  const handleSaveSede = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSede?.name || !editingSede?.address) return;

    if (editingSede.id) {
      await updateSede(editingSede.id, editingSede);
    } else {
      await addSede({
        name: editingSede.name || '',
        address: editingSede.address || '',
        city: editingSede.city || 'Medellín, Colombia',
        phone: editingSede.phone || '+57 302 417 1818',
        schedule: editingSede.schedule || 'Lunes a Viernes 8:00 AM - 6:00 PM',
        status: editingSede.status || 'Operativa',
        isPrimary: editingSede.isPrimary || false,
        mapUrl: editingSede.mapUrl || '',
        description: editingSede.description || ''
      });
    }
    setIsSedeModalOpen(false);
    setEditingSede(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-white my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Panel de Administración Tecnideas</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Firebase Sync
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isAdmin ? 'Gestión en tiempo real de catálogo, categorías, servicios y YouTube' : 'Acceso privado para administradores'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            )}
            <button
              onClick={() => {
                closeAuthModal();
                closeAdminPanel();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdmin ? (
          /* LOGIN FORM */
          <div className="p-8 max-w-md mx-auto w-full space-y-6 my-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30 shadow-lg">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Panel de Control Tecnideas 360°</h4>
              <p className="text-xs text-slate-400">
                Acceso privado para administrar productos, categorías, servicios y videos en tiempo real.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="admin@tecnideas.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                {isLoggingIn ? 'Autenticando en Firebase...' : 'Ingresar / Registrarse'}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="shrink mx-3 text-[10px] uppercase font-mono text-slate-500">O ingresa con</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Acceso Rápido Google</span>
            </button>
          </div>
        ) : (
          /* ADMIN DASHBOARD */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="px-6 bg-slate-950/50 border-b border-slate-800 flex gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tienda & Productos ({storeItems.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'categories'
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Categorías de Tienda ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Servicios Digitales ({digitalServices.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'courses'
                    ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Cursos & Talleres ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('pillars')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'pillars'
                    ? 'border-blue-400 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Soluciones 360° ({solutionPillars.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('sedes')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'sedes'
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Sedes & Ubicaciones ({sedes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'videos'
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Videos YouTube ({youtubeVideos.length})</span>
              </button>
            </div>

            {/* Tab Controls Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar en el panel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {activeTab === 'products' && (
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      price: 15000,
                      category: 'impresion_digitacion',
                      type: 'servicio',
                      currency: 'COP',
                      description: '',
                      badge: 'Nuevo',
                      features: [],
                      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Producto / Servicio a Tienda</span>
                </button>
              )}

              {activeTab === 'categories' && (
                <button
                  onClick={() => {
                    setEditingCategory({ label: '', order: categories.length + 1 });
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nueva Categoría</span>
                </button>
              )}

              {activeTab === 'services' && (
                <button
                  onClick={() => {
                    setEditingService({
                      title: '',
                      category: 'digital',
                      description: '',
                      priceStart: '$999.000 COP',
                      badge: 'Nuevo',
                      features: [],
                      iconName: 'Globe',
                      idealFor: ''
                    });
                    setIsServiceModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Servicio Digital</span>
                </button>
              )}

              {activeTab === 'courses' && (
                <button
                  onClick={() => {
                    setEditingCourse({
                      title: '',
                      level: 'Principiante a Avanzado',
                      duration: '8 Horas Prácticas',
                      modality: 'Presencial (Medellín)',
                      description: '',
                      instructor: 'Equipo Tecnideas IA',
                      price: '$180.000 COP',
                      badge: 'Nuevo',
                      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
                      topics: []
                    });
                    setCourseTopicsText('');
                    setIsCourseModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Nuevo Curso / Taller</span>
                </button>
              )}

              {activeTab === 'pillars' && (
                <button
                  onClick={() => {
                    setEditingPillar({
                      title: '',
                      subtitle: '',
                      iconName: 'Globe',
                      color: 'blue',
                      tag: 'Especialidad',
                      targetPage: 'digital',
                      buttonText: 'Explorar Área',
                      features: []
                    });
                    setPillarFeaturesText('');
                    setIsPillarModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Pilar 360°</span>
                </button>
              )}

              {activeTab === 'sedes' && (
                <button
                  onClick={() => {
                    setEditingSede({
                      name: '',
                      address: '',
                      city: 'Medellín, Colombia',
                      phone: '+57 302 417 1818',
                      schedule: 'Lunes a Viernes 8:00 AM - 6:00 PM',
                      status: 'En Proyecto',
                      isPrimary: false,
                      mapUrl: '',
                      description: ''
                    });
                    setIsSedeModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Nueva Sede</span>
                </button>
              )}

              {activeTab === 'videos' && (
                <button
                  onClick={() => {
                    setEditingVideo({
                      title: '',
                      duration: '15:00 min',
                      views: '1.2K vistas',
                      url: 'https://youtube.com',
                      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
                    });
                    setIsVideoModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Video YouTube</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT AREAS */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* 1. PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {storeItems
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.includes(searchTerm))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 text-[10px] font-mono font-bold">
                              {item.category}
                            </span>
                            {item.badge && (
                              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-white line-clamp-1">{item.name}</h5>
                            <p className="text-xs text-cyan-400 font-bold mt-0.5">
                              ${item.price.toLocaleString('es-CO')} {item.currency}
                            </p>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingProduct(item);
                              setIsProductModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Editar</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar ${item.name}?`)) deleteStoreItem(item.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 2. CATEGORIES TAB */}
              {activeTab === 'categories' && (
                <div className="max-w-2xl mx-auto space-y-3">
                  <p className="text-xs text-slate-400">
                    Las categorías creadas aquí aparecen automáticamente en los filtros de la Tienda y menús de navegación.
                  </p>

                  <div className="divide-y divide-slate-800 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                    {categories
                      .filter(cat => cat.label.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((cat) => (
                        <div key={cat.id} className="p-4 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-sm text-white">{cat.label}</span>
                            <span className="ml-3 text-xs font-mono text-slate-500">ID: {cat.id}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setIsCategoryModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Editar</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar categoría ${cat.label}?`)) deleteCategory(cat.id);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 3. DIGITAL SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {digitalServices
                    .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((srv) => (
                      <div key={srv.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-cyan-400">{srv.category}</span>
                            <h5 className="font-bold text-base text-white">{srv.title}</h5>
                            <p className="text-xs text-amber-400 font-mono mt-0.5">Desde {srv.priceStart}</p>
                          </div>
                          {srv.badge && (
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                              {srv.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2">{srv.description}</p>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingService(srv);
                              setIsServiceModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Editar Servicio</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar servicio ${srv.title}?`)) deleteDigitalService(srv.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 4. COURSES TAB */}
              {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses
                    .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((crs) => (
                      <div key={crs.id} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                              {crs.modality}
                            </span>
                            {crs.badge && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                {crs.badge}
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-sm text-white">{crs.title}</h5>
                          <p className="text-xs text-slate-300 line-clamp-2">{crs.description}</p>
                          
                          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono pt-1">
                            <span>⏱️ {crs.duration}</span>
                            <span>📊 {crs.level}</span>
                            <span className="text-amber-400 font-bold">{crs.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingCourse(crs);
                              setCourseTopicsText(crs.topics ? crs.topics.join('\n') : '');
                              setIsCourseModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Editar Curso</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar el curso ${crs.title}?`)) deleteCourse(crs.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 5. SOLUTION PILLARS TAB */}
              {activeTab === 'pillars' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {solutionPillars
                    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((pil) => (
                      <div key={pil.id} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30 uppercase">
                              {pil.tag || 'Pilar'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Página: {pil.targetPage}
                            </span>
                          </div>

                          <h5 className="font-bold text-sm text-white">{pil.title}</h5>
                          <p className="text-xs text-slate-400 font-medium">{pil.subtitle}</p>

                          {pil.features && pil.features.length > 0 && (
                            <ul className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-slate-900">
                              {pil.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <span className="text-blue-400">•</span>
                                  <span className="truncate">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingPillar(pil);
                              setPillarFeaturesText(pil.features ? pil.features.join('\n') : '');
                              setIsPillarModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Editar Pilar</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar pilar ${pil.title}?`)) deleteSolutionPillar(pil.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 6. SEDES TAB */}
              {activeTab === 'sedes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sedes
                    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.address.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((sd) => (
                      <div key={sd.id} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-red-400" />
                              <span>{sd.name}</span>
                            </h5>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                              sd.status === 'Operativa' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {sd.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 font-mono">📍 {sd.address}, {sd.city}</p>
                          <p className="text-xs text-slate-400">📞 {sd.phone}</p>
                          <p className="text-xs text-slate-400">🕒 {sd.schedule}</p>
                          {sd.description && <p className="text-xs text-slate-400 italic">{sd.description}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingSede(sd);
                              setIsSedeModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Editar Sede</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar la sede ${sd.name}?`)) deleteSede(sd.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 7. YOUTUBE VIDEOS TAB */}
              {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {youtubeVideos
                    .filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((vid) => (
                      <div key={vid.id} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden p-3 space-y-3">
                        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                          <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80" />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                            {vid.duration}
                          </span>
                        </div>

                        <div>
                          <h6 className="font-bold text-xs text-white line-clamp-2">{vid.title}</h6>
                          <p className="text-[11px] text-slate-400 mt-1">{vid.views}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Ver Video</span>
                          </a>

                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingVideo(vid);
                                setIsVideoModalOpen(true);
                              }}
                              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar video ${vid.title}?`)) deleteYoutubeVideo(vid.id);
                              }}
                              className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* PRODUCT FORM MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-cyan-400">
              {editingProduct.id ? 'Editar Producto / Servicio' : 'Nuevo Producto / Servicio'}
            </h4>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Categoría</label>
                  <select
                    value={editingProduct.category || 'impresion_digitacion'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Precio ($ COP)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price ?? 15000}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Tipo</label>
                  <select
                    value={editingProduct.type || 'servicio'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="servicio">Servicio</option>
                    <option value="producto">Producto</option>
                    <option value="pase">Pase / Membresía</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Etiqueta / Badge (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Desde $500, Nueva"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">URL de la Imagen</label>
                <input
                  type="text"
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Características (Una por línea)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingProduct.features) ? editingProduct.features.join('\n') : (editingProduct.features || '')}
                  onChange={(e) => setEditingProduct({ ...editingProduct, features: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY FORM MODAL */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-cyan-400">
              {editingCategory.id ? 'Editar Categoría' : 'Nueva Categoría'}
            </h4>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Impresión & Digitación"
                  value={editingCategory.label || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Guardar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* YOUTUBE VIDEO FORM MODAL */}
      {isVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-cyan-400">
              {editingVideo.id ? 'Editar Video de YouTube' : 'Nuevo Video de YouTube'}
            </h4>

            <form onSubmit={handleSaveVideo} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Título del Video</label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">URL del Video en YouTube</label>
                <input
                  type="text"
                  required
                  placeholder="https://youtube.com/..."
                  value={editingVideo.url || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Duración</label>
                  <input
                    type="text"
                    placeholder="Ej: 15:30 min"
                    value={editingVideo.duration || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Vistas</label>
                  <input
                    type="text"
                    placeholder="Ej: 5.2K vistas"
                    value={editingVideo.views || ''}
                    onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">URL Miniatura (Thumbnail)</label>
                <input
                  type="text"
                  value={editingVideo.thumbnail || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Guardar Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COURSE FORM MODAL */}
      {isCourseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-amber-400">
              {editingCourse.id ? 'Editar Curso / Taller' : 'Nuevo Curso / Taller'}
            </h4>

            <form onSubmit={handleSaveCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Título del Curso</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Nivel</label>
                  <input
                    type="text"
                    placeholder="Ej: Principiante a Avanzado"
                    value={editingCourse.level || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Duración</label>
                  <input
                    type="text"
                    placeholder="Ej: 8 Horas Prácticas"
                    value={editingCourse.duration || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Modalidad</label>
                  <select
                    value={editingCourse.modality || 'Presencial (Medellín)'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, modality: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  >
                    <option value="Presencial (Medellín)">Presencial (Medellín)</option>
                    <option value="Virtual En Vivo">Virtual En Vivo</option>
                    <option value="Grabado">Grabado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Precio</label>
                  <input
                    type="text"
                    placeholder="Ej: $180.000 COP"
                    value={editingCourse.price || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Etiqueta Destacada</label>
                  <input
                    type="text"
                    placeholder="Ej: Cupos Limitados / Más Popular"
                    value={editingCourse.badge || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Instructor</label>
                <input
                  type="text"
                  placeholder="Ej: Equipo Tecnideas IA"
                  value={editingCourse.instructor || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={editingCourse.description || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Temas del Curso (Un tema por línea)</label>
                <textarea
                  rows={3}
                  placeholder="Fundamentos de IA Generator&#10;Prompt Engineering Práctico&#10;Agentes para WhatsApp"
                  value={courseTopicsText}
                  onChange={(e) => setCourseTopicsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">URL Imagen</label>
                <input
                  type="text"
                  value={editingCourse.imageUrl || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Guardar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOLUTION PILLAR FORM MODAL */}
      {isPillarModalOpen && editingPillar && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-blue-400">
              {editingPillar.id ? 'Editar Pilar de Soluciones 360°' : 'Nuevo Pilar de Soluciones 360°'}
            </h4>

            <form onSubmit={handleSavePillar} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Título del Pilar</label>
                <input
                  type="text"
                  required
                  value={editingPillar.title || ''}
                  onChange={(e) => setEditingPillar({ ...editingPillar, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Subtítulo Resumen</label>
                <input
                  type="text"
                  value={editingPillar.subtitle || ''}
                  onChange={(e) => setEditingPillar({ ...editingPillar, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Color de Tema</label>
                  <select
                    value={editingPillar.color || 'blue'}
                    onChange={(e) => setEditingPillar({ ...editingPillar, color: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  >
                    <option value="blue">Azul (Servicios Digitales)</option>
                    <option value="purple">Púrpura (Centro Tradicional)</option>
                    <option value="emerald">Esmeralda (Ecosistema HUB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Página Destino al Clic</label>
                  <select
                    value={editingPillar.targetPage || 'digital'}
                    onChange={(e) => setEditingPillar({ ...editingPillar, targetPage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  >
                    <option value="digital">Servicios Digitales</option>
                    <option value="tradicional">Centro Tradicional</option>
                    <option value="ecosistema">Ecosistema</option>
                    <option value="capacitacion">Capacitación</option>
                    <option value="cotizador">Cotizador</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Etiqueta Superior</label>
                  <input
                    type="text"
                    placeholder="Ej: Especialidad #1"
                    value={editingPillar.tag || ''}
                    onChange={(e) => setEditingPillar({ ...editingPillar, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Texto de Botón</label>
                  <input
                    type="text"
                    placeholder="Ej: Explorar Servicios Digitales"
                    value={editingPillar.buttonText || ''}
                    onChange={(e) => setEditingPillar({ ...editingPillar, buttonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Características (Una por línea)</label>
                <textarea
                  rows={4}
                  placeholder="Diseño Web Responsivo&#10;E-commerce Wompi&#10;Bots de IA en WhatsApp"
                  value={pillarFeaturesText}
                  onChange={(e) => setPillarFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPillarModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs cursor-pointer"
                >
                  Guardar Pilar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEDE FORM MODAL */}
      {isSedeModalOpen && editingSede && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <h4 className="text-lg font-bold text-emerald-400">
              {editingSede.id ? 'Editar Sede' : 'Nueva Sede'}
            </h4>

            <form onSubmit={handleSaveSede} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Nombre de la Sede</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sede Poblado / Sede Laureles"
                  value={editingSede.name || ''}
                  onChange={(e) => setEditingSede({ ...editingSede, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Cra 68 #96-78"
                    value={editingSede.address || ''}
                    onChange={(e) => setEditingSede({ ...editingSede, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={editingSede.city || 'Medellín, Colombia'}
                    onChange={(e) => setEditingSede({ ...editingSede, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    value={editingSede.phone || ''}
                    onChange={(e) => setEditingSede({ ...editingSede, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Estado de la Sede</label>
                  <select
                    value={editingSede.status || 'Operativa'}
                    onChange={(e) => setEditingSede({ ...editingSede, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                  >
                    <option value="Operativa">Operativa (Abierta)</option>
                    <option value="En Proyecto">En Proyecto (Próximamente)</option>
                    <option value="En Remodelación">En Remodelación</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Horario de Atención</label>
                <input
                  type="text"
                  placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
                  value={editingSede.schedule || ''}
                  onChange={(e) => setEditingSede({ ...editingSede, schedule: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">URL de Mapa de Google (Embed/iFrame src)</label>
                <input
                  type="text"
                  placeholder="https://maps.google.com/maps?q=..."
                  value={editingSede.mapUrl || ''}
                  onChange={(e) => setEditingSede({ ...editingSede, mapUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Notas / Descripción adicional</label>
                <textarea
                  rows={2}
                  placeholder="Detalles sobre transporte cercano, parqueadero o enfoque..."
                  value={editingSede.description || ''}
                  onChange={(e) => setEditingSede({ ...editingSede, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSedeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Guardar Sede
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
