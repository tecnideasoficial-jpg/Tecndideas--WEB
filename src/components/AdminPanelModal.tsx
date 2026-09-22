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
  Globe,
  Bot,
  Code,
  FileCheck,
  Printer,
  Briefcase,
  Users
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { 
  StoreItem, 
  StoreCategory, 
  YoutubeVideo, 
  ServiceItem,
  Course,
  SolutionPillar,
  Sede,
  WorkspaceSpace 
} from '../types';
import { ImageUploader } from './ImageUploader';
import { MediaLibraryView } from './MediaLibraryView';

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
    workspaceSpaces,
    mediaItems,
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
    deleteSede,
    addWorkspaceSpace,
    updateWorkspaceSpace,
    deleteWorkspaceSpace
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'services' | 'courses' | 'pillars' | 'sedes' | 'workspace' | 'videos' | 'media'>('products');
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
  const [serviceFeaturesText, setServiceFeaturesText] = useState('');

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

  // Editing state for Workspace Space
  const [editingWorkspaceSpace, setEditingWorkspaceSpace] = useState<Partial<WorkspaceSpace> | null>(null);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceAmenitiesText, setWorkspaceAmenitiesText] = useState('');

  // Save Confirmation Toast/Banner
  const [successNotification, setSuccessNotification] = useState<string>('');

  const showNotification = (msg: string) => {
    setSuccessNotification(msg);
    setTimeout(() => {
      setSuccessNotification('');
    }, 4500);
  };

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
    if (!editingProduct?.name || editingProduct.price === undefined || editingProduct.price === null || !editingProduct?.category) return;

    const featArray = typeof editingProduct.features === 'string'
      ? (editingProduct.features as string).split('\n').map(s => s.trim()).filter(Boolean)
      : editingProduct.features || [];

    const numericPrice = Number(editingProduct.price) || 0;

    if (editingProduct.id) {
      await updateStoreItem(editingProduct.id, {
        ...editingProduct,
        price: numericPrice,
        features: featArray
      });
      showNotification('¡Producto actualizado y guardado correctamente!');
    } else {
      await addStoreItem({
        name: editingProduct.name || '',
        category: editingProduct.category || 'impresion_digitacion',
        type: (editingProduct.type as any) || 'servicio',
        price: numericPrice,
        currency: editingProduct.currency || 'COP',
        description: editingProduct.description || '',
        imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
        badge: editingProduct.badge || '',
        features: featArray
      });
      showNotification('¡Nuevo producto guardado y añadido al catálogo!');
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
      showNotification(`¡Categoría "${editingCategory.label}" actualizada correctamente!`);
    } else {
      await addCategory({
        label: editingCategory.label,
        order: Number(editingCategory.order) || categories.length + 1
      });
      showNotification(`¡Categoría "${editingCategory.label}" creada correctamente!`);
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
      showNotification(`¡Video "${editingVideo.title}" actualizado con éxito!`);
    } else {
      await addYoutubeVideo({
        title: editingVideo.title || '',
        duration: editingVideo.duration || '10:00 min',
        views: editingVideo.views || '1.0K vistas',
        thumbnail: thumb,
        url: editingVideo.url || 'https://youtube.com',
        description: editingVideo.description || ''
      });
      showNotification(`¡Video "${editingVideo.title}" añadido al catálogo!`);
    }
    setIsVideoModalOpen(false);
    setEditingVideo(null);
  };

  // Service Save
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title?.trim()) {
      showNotification('Por favor escribe un título para el servicio.');
      return;
    }

    const featArray = serviceFeaturesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    try {
      if (editingService.id) {
        await updateDigitalService(editingService.id, {
          ...editingService,
          title: editingService.title.trim(),
          category: (editingService.category as any) || 'digital',
          description: editingService.description || '',
          priceStart: editingService.priceStart || '$500.000 COP',
          badge: editingService.badge || '',
          iconName: editingService.iconName || 'Globe',
          idealFor: editingService.idealFor || 'Emprendedores y Pymes',
          popular: !!editingService.popular,
          demoUrl: (editingService.demoUrl || '').trim(),
          demoButtonText: (editingService.demoButtonText || '').trim() || 'Ver Demo',
          features: featArray
        });
        showNotification(`¡Servicio "${editingService.title}" modificado y guardado con éxito!`);
      } else {
        await addDigitalService({
          title: editingService.title.trim(),
          category: (editingService.category as any) || 'digital',
          description: editingService.description || '',
          badge: editingService.badge || '',
          iconName: editingService.iconName || 'Globe',
          features: featArray,
          priceStart: editingService.priceStart || '$500.000 COP',
          popular: !!editingService.popular,
          idealFor: editingService.idealFor || 'Emprendedores y Pymes',
          demoUrl: (editingService.demoUrl || '').trim(),
          demoButtonText: (editingService.demoButtonText || '').trim() || 'Ver Demo'
        });
        showNotification(`¡Nuevo servicio "${editingService.title}" creado y publicado!`);
      }
      setIsServiceModalOpen(false);
      setEditingService(null);
    } catch (err: any) {
      console.error('Error saving digital service:', err);
      showNotification('Error al guardar el servicio digital');
    }
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
      showNotification(`¡Curso "${editingCourse.title}" actualizado con éxito!`);
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
      showNotification(`¡Curso "${editingCourse.title}" creado con éxito!`);
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
      showNotification(`¡Pilar de Solución "${editingPillar.title}" actualizado!`);
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
      showNotification(`¡Pilar de Solución "${editingPillar.title}" creado!`);
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
      showNotification(`¡Sede "${editingSede.name}" actualizada con éxito!`);
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
      showNotification(`¡Sede "${editingSede.name}" creada con éxito!`);
    }
    setIsSedeModalOpen(false);
    setEditingSede(null);
  };

  // Workspace Space Save
  const handleSaveWorkspaceSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkspaceSpace?.name || !editingWorkspaceSpace?.priceHour) return;

    const amenitiesArr = workspaceAmenitiesText
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    if (editingWorkspaceSpace.id) {
      await updateWorkspaceSpace(editingWorkspaceSpace.id, {
        ...editingWorkspaceSpace,
        amenities: amenitiesArr
      });
      showNotification(`¡Espacio "${editingWorkspaceSpace.name}" actualizado con éxito!`);
    } else {
      await addWorkspaceSpace({
        name: editingWorkspaceSpace.name || 'Nuevo Espacio Workspace',
        capacity: editingWorkspaceSpace.capacity || '1 a 10 Personas',
        priceHour: editingWorkspaceSpace.priceHour || '$10.000 COP',
        priceDay: editingWorkspaceSpace.priceDay || '$50.000 COP',
        description: editingWorkspaceSpace.description || '',
        imageUrl: editingWorkspaceSpace.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        amenities: amenitiesArr.length > 0 ? amenitiesArr : ['Internet 300 Mbps', 'Café & Té ilimitado', 'Silla ergonómica']
      });
      showNotification(`¡Espacio "${editingWorkspaceSpace.name}" creado con éxito!`);
    }
    setIsWorkspaceModalOpen(false);
    setEditingWorkspaceSpace(null);
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

        {/* Success Confirmation Toast Banner */}
        {successNotification && (
          <div className="px-6 py-2.5 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2 shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{successNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessNotification('')}
              className="text-emerald-400 hover:text-emerald-200 text-xs font-bold px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

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
                onClick={() => setActiveTab('workspace')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'workspace'
                    ? 'border-indigo-400 text-indigo-400 bg-indigo-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>HUB Workspace ({workspaceSpaces.length})</span>
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

              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'border-purple-400 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>Biblioteca Multimedia ({mediaItems.length})</span>
              </button>
            </div>

            {/* Tab Controls Bar */}
            {activeTab !== 'media' && (
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
                      priceStart: '$500.000 COP',
                      badge: 'Nuevo',
                      features: [],
                      iconName: 'Globe',
                      idealFor: 'Emprendedores y Pymes',
                      popular: false,
                      demoUrl: '',
                      demoButtonText: 'Ver Demo'
                    });
                    setServiceFeaturesText('Diseño Responsivo UI/UX\nOptimización SEO & Velocidad\nIntegración WhatsApp y Pasarela');
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

              {activeTab === 'workspace' && (
                <button
                  onClick={() => {
                    setEditingWorkspaceSpace({
                      name: '',
                      capacity: '1 a 10 Personas',
                      priceHour: '$10.000 COP',
                      priceDay: '$50.000 COP',
                      description: '',
                      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
                      amenities: ['Internet 300 Mbps', 'Café & Té ilimitado', 'Silla ergonómica', 'Descuento en impresiones']
                    });
                    setWorkspaceAmenitiesText('Internet 300 Mbps\nCafé & Té ilimitado\nSilla ergonómica\nDescuento en impresiones');
                    setIsWorkspaceModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Espacio HUB Coworking</span>
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
            )}

            {/* TAB CONTENT AREAS */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* MEDIA LIBRARY TAB */}
              {activeTab === 'media' && (
                <div className="h-full">
                  <MediaLibraryView />
                </div>
              )}
              
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

                        {/* Demo URL indicator */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-sans font-bold text-[10px]">
                            Botón: "{srv.demoButtonText || 'Ver Demo'}"
                          </span>
                          {srv.demoUrl ? (
                            <a
                              href={srv.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:underline truncate max-w-[200px]"
                              title={srv.demoUrl}
                            >
                              🔗 {srv.demoUrl}
                            </a>
                          ) : (
                            <span className="text-slate-500 italic">Sin URL de demo configurada</span>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setEditingService(srv);
                              setServiceFeaturesText(
                                srv.features && Array.isArray(srv.features) ? srv.features.join('\n') : ''
                              );
                              setIsServiceModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Editar Servicio</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar servicio ${srv.title}?`)) {
                                deleteDigitalService(srv.id);
                                showNotification(`Servicio "${srv.title}" eliminado correctamente.`);
                              }
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
                              if (confirm(`¿Eliminar el curso ${crs.title}?`)) {
                                deleteCourse(crs.id);
                                showNotification(`Curso "${crs.title}" eliminado.`);
                              }
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
                              if (confirm(`¿Eliminar pilar ${pil.title}?`)) {
                                deleteSolutionPillar(pil.id);
                                showNotification(`Pilar "${pil.title}" eliminado.`);
                              }
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
                              if (confirm(`¿Eliminar la sede ${sd.name}?`)) {
                                deleteSede(sd.id);
                                showNotification(`Sede "${sd.name}" eliminada.`);
                              }
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

              {/* 7. HUB WORKSPACE SPACES TAB */}
              {activeTab === 'workspace' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workspaceSpaces
                    .filter(sp => sp.name.toLowerCase().includes(searchTerm.toLowerCase()) || sp.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((space) => (
                      <div key={space.id} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between">
                        <div>
                          {/* Image & Capacity Badge */}
                          <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                            <img
                              src={space.imageUrl}
                              alt={space.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                              {space.capacity}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-3">
                            <h5 className="font-bold text-sm text-white line-clamp-1">
                              {space.name}
                            </h5>

                            <p className="text-xs text-slate-400 line-clamp-2">
                              {space.description}
                            </p>

                            {/* Pricing summary */}
                            <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase block font-sans">Hora:</span>
                                <span className="font-bold text-emerald-400">{space.priceHour}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase block font-sans">Día:</span>
                                <span className="font-bold text-indigo-400">{space.priceDay}</span>
                              </div>
                            </div>

                            {/* Amenities pills */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Servicios Incluidos:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {space.amenities && space.amenities.map((am, idx) => (
                                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                                    ✓ {am}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="p-3 border-t border-slate-800/80 flex items-center justify-end gap-2 bg-slate-950/60">
                          <button
                            onClick={() => {
                              setEditingWorkspaceSpace(space);
                              setWorkspaceAmenitiesText(space.amenities ? space.amenities.join('\n') : '');
                              setIsWorkspaceModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Editar Espacio</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar el espacio de coworking "${space.name}"?`)) {
                                deleteWorkspaceSpace(space.id);
                                showNotification(`Espacio "${space.name}" eliminado.`);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            title="Eliminar espacio"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                </div>
              )}

              {/* 8. YOUTUBE VIDEOS TAB */}
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

              <ImageUploader
                value={editingProduct.imageUrl || ''}
                onChange={(url) => setEditingProduct({ ...editingProduct, imageUrl: url })}
                label="Foto / Imagen del Producto o Servicio"
                categoryHint={editingProduct.category}
                aspectRatioLabel="Espacio de tarjeta de tienda (16:10 / 4:3)"
              />

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

      {/* DIGITAL SERVICE FORM MODAL */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span>{editingService.id ? 'Editar Servicio Digital / Solución' : 'Nuevo Servicio Digital / Solución'}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configura las tarifas, características y categoría para el catálogo de servicios de Tecnideas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsServiceModalOpen(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-200">
                  Nombre del Servicio <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Agentes IA y Chatbots WhatsApp, Desarrollo Web & E-Commerce"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-200">Categoría del Servicio</label>
                  <select
                    value={editingService.category || 'digital'}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="digital">Servicios Digitales & IA</option>
                    <option value="tradicional">Centro Tradicional & Trámites</option>
                    <option value="ecosistema">Ecosistema Tecnideas 360°</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-200">Tarifa / Precio Inicial</label>
                  <input
                    type="text"
                    placeholder="Ej: Desde $500.000 COP o $1.200.000 COP"
                    value={editingService.priceStart || ''}
                    onChange={(e) => setEditingService({ ...editingService, priceStart: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-200">Icono Representativo</label>
                  <select
                    value={editingService.iconName || 'Globe'}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Globe">🌐 Web / Digital (Globe)</option>
                    <option value="Bot">🤖 Agentes IA & Chatbots (Bot)</option>
                    <option value="ShoppingBag">🛍️ E-Commerce & Tienda (ShoppingBag)</option>
                    <option value="Code">💻 Desarrollo de Software & App (Code)</option>
                    <option value="Search">🔍 SEO, Tráfico & Google (Search)</option>
                    <option value="Users">👥 CRM, Clientes & Ventas (Users)</option>
                    <option value="Printer">🖨️ Impresión, Copiado & Papelería (Printer)</option>
                    <option value="FileCheck">📑 Trámites, Visas & Certificados (FileCheck)</option>
                    <option value="Building2">🏢 Coworking & Espacios (Building2)</option>
                    <option value="GraduationCap">🎓 Capacitación & Cursos (GraduationCap)</option>
                    <option value="Briefcase">💼 Consultoría Empresarial (Briefcase)</option>
                    <option value="Sparkles">✨ Solución 360° Personalizada (Sparkles)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-200">Etiqueta Destacada (Badge)</label>
                  <input
                    type="text"
                    placeholder="Ej: Más Vendido, Revolucionario, Nuevo, Pyme"
                    value={editingService.badge || ''}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-200">Público Objetivo / Ideal Para</label>
                  <input
                    type="text"
                    placeholder="Ej: Emprendedores, Negocios Locales y Profesionales"
                    value={editingService.idealFor || ''}
                    onChange={(e) => setEditingService({ ...editingService, idealFor: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2 md:pt-4">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={!!editingService.popular}
                      onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-200">
                      ⭐ Marcar como Servicio Destacado / Popular
                    </span>
                  </label>
                </div>
              </div>

              {/* DEMO / DESTINO CONFIGURATION */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-cyan-300">
                      Configuración del Botón "Demo" / Destino Interactivo
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Personaliza a dónde dirige el botón principal de la tarjeta (enlace de demostración, prueba en vivo, WhatsApp, etc.).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-200">
                      Texto del Botón (Sugerencias: "Ver Demo", "Demos", "Probar en Vivo", "Ver Ejemplo")
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Ver Demo en Vivo, Probar Tienda Demo, Probar Bot"
                      value={editingService.demoButtonText ?? ''}
                      onChange={(e) => setEditingService({ ...editingService, demoButtonText: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Por defecto se mostrará: <strong>"Ver Demo"</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-200">
                      URL de Destino (Link de la Demo o Prueba)
                    </label>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/demo o https://wa.me/573024171818"
                      value={editingService.demoUrl || ''}
                      onChange={(e) => setEditingService({ ...editingService, demoUrl: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Pega aquí la URL completa a donde viajará el cliente al hacer clic.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-200">Descripción del Servicio</label>
                <textarea
                  rows={2}
                  placeholder="Describe de qué trata el servicio y el valor que entrega al cliente..."
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-200">
                    Características / Qué Incluye (Una por renglón)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {serviceFeaturesText.split('\n').filter(s => s.trim()).length} características
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder={"Diseño Responsivo UI/UX Mobile-First\nIntegración de WhatsApp para Cierre de Ventas\nOptimización de Velocidad y SEO en Google\nSoporte y Mantenimiento Incluido"}
                  value={serviceFeaturesText}
                  onChange={(e) => setServiceFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono text-xs"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Presiona Enter para agregar cada entregable o beneficio. Se verán reflejados como viñetas de verificación en la web.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsServiceModalOpen(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  {editingService.id ? 'Guardar Cambios del Servicio' : 'Crear y Publicar Servicio'}
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

              <ImageUploader
                value={editingCourse.imageUrl || ''}
                onChange={(url) => setEditingCourse({ ...editingCourse, imageUrl: url })}
                label="Foto / Portada del Curso o Taller"
                categoryHint="Cursos & Capacitación"
                aspectRatioLabel="Espacio de portada de curso (16:10)"
              />

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

      {/* WORKSPACE SPACE FORM MODAL */}
      {isWorkspaceModalOpen && editingWorkspaceSpace && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-white my-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>{editingWorkspaceSpace.id ? 'Editar Espacio HUB Coworking' : 'Nuevo Espacio HUB Coworking'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsWorkspaceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkspaceSpace} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold mb-1">Nombre del Espacio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Puestos Flexibles de Coworking / Sala VIP"
                  value={editingWorkspaceSpace.name || ''}
                  onChange={(e) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Capacity and Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Capacidad</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 1 a 15 Personas"
                    value={editingWorkspaceSpace.capacity || ''}
                    onChange={(e) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, capacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-emerald-400">Tarifa por Hora</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: $8.000 COP"
                    value={editingWorkspaceSpace.priceHour || ''}
                    onChange={(e) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, priceHour: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-indigo-400">Tarifa Día Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: $35.000 COP"
                    value={editingWorkspaceSpace.priceDay || ''}
                    onChange={(e) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, priceDay: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-indigo-400 font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Image Uploader & Presets */}
              <ImageUploader
                value={editingWorkspaceSpace.imageUrl || ''}
                onChange={(url) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, imageUrl: url })}
                label="Foto / Imagen del Espacio HUB Coworking"
                categoryHint="Coworking & Espacios"
                aspectRatioLabel="Espacio de tarjeta Coworking (16:10)"
              />

              {/* Description */}
              <div>
                <label className="block text-xs font-bold mb-1">Descripción del Espacio</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Espacios de trabajo ergonómicos en un ambiente inspirador con comunidad de emprendedores en Medellín..."
                  value={editingWorkspaceSpace.description || ''}
                  onChange={(e) => setEditingWorkspaceSpace({ ...editingWorkspaceSpace, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Included Services / Amenities */}
              <div>
                <label className="block text-xs font-bold mb-1">
                  Servicios Incluidos (Escribe uno por línea)
                </label>
                <textarea
                  rows={3}
                  placeholder="Internet 300 Mbps&#10;Café & Té ilimitado&#10;Silla ergonómica&#10;Descuento en impresiones"
                  value={workspaceAmenitiesText}
                  onChange={(e) => setWorkspaceAmenitiesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Cada línea se mostrará como una característica con icono de verificación en el HUB.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsWorkspaceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-all shadow-md shadow-indigo-600/30"
                >
                  Guardar Espacio HUB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
