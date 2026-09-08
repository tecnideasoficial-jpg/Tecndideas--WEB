import React, { useState, useRef } from 'react';
import { 
  Search, 
  Upload, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Image as ImageIcon, 
  AlertTriangle, 
  Filter, 
  Eye, 
  CheckCircle2, 
  X, 
  Loader2,
  HardDrive,
  Maximize2
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { MediaItem } from '../types';
import { uploadMediaToStorage, processImageToWebp } from '../lib/mediaStorage';

interface MediaLibraryViewProps {
  onSelectImage?: (url: string, item: MediaItem) => void;
  selectedUrl?: string;
  isPickerMode?: boolean;
}

export const MediaLibraryView: React.FC<MediaLibraryViewProps> = ({
  onSelectImage,
  selectedUrl,
  isPickerMode = false
}) => {
  const { 
    mediaItems, 
    mediaCategories, 
    addMediaItem, 
    deleteMediaItem, 
    addMediaCategory, 
    isMediaUsed 
  } = useAdminData();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Modal / Preview State
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload Form State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<string>(mediaCategories[0] || 'Impresión & Papelería');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [uploadFitMode, setUploadFitMode] = useState<'cover' | 'contain'>('cover');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Copy URL
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }
    setUploadError(null);
    setSelectedFile(file);

    // Auto-populate name if empty
    if (!uploadName.trim()) {
      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setUploadName(cleanFileName.charAt(0).toUpperCase() + cleanFileName.slice(1));
    }

    try {
      const processed = await processImageToWebp(file, 800, 520, 0.85, uploadFitMode);
      setPreviewBlobUrl(processed.dataUrl);
    } catch (e: any) {
      setUploadError('Error al procesar la imagen: ' + e.message);
    }
  };

  // Handle external URL processing
  const handleProcessExternalUrl = async () => {
    if (!externalUrlInput.trim()) return;
    setUploadError(null);
    try {
      const processed = await processImageToWebp(externalUrlInput.trim(), 800, 520, 0.85, uploadFitMode);
      setPreviewBlobUrl(processed.dataUrl);
      setSelectedFile(null);
      if (!uploadName.trim()) {
        setUploadName('Imagen Web ' + new Date().toLocaleDateString('es-CO'));
      }
    } catch (e: any) {
      setUploadError('No se pudo cargar la imagen desde la URL. Verifica que sea un enlace directo válido.');
    }
  };

  // Submit Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewBlobUrl && !selectedFile && !externalUrlInput) {
      setUploadError('Selecciona o arrastra una imagen para subir.');
      return;
    }
    if (!uploadName.trim()) {
      setUploadError('Por favor asigna un nombre a la imagen.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const source = selectedFile || previewBlobUrl || externalUrlInput;
      const uploadResult = await uploadMediaToStorage(source, {
        name: uploadName.trim(),
        category: uploadCategory,
        fitMode: uploadFitMode
      });

      const newItem = await addMediaItem({
        name: uploadName.trim(),
        category: uploadCategory,
        storagePath: uploadResult.storagePath,
        publicUrl: uploadResult.publicUrl,
        width: uploadResult.width,
        height: uploadResult.height,
        size: uploadResult.size
      });

      // If picker mode, also trigger selection
      if (onSelectImage) {
        onSelectImage(newItem.publicUrl, newItem);
      }

      // Reset and close
      setIsUploadModalOpen(false);
      setUploadName('');
      setSelectedFile(null);
      setPreviewBlobUrl(null);
      setExternalUrlInput('');
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError('Error al guardar la imagen: ' + (err.message || 'Intente nuevamente'));
    } finally {
      setIsUploading(false);
    }
  };

  // Add new category
  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) return;
    await addMediaCategory(newCategoryName.trim());
    setUploadCategory(newCategoryName.trim());
    setNewCategoryName('');
    setIsAddingNewCategory(false);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    await deleteMediaItem(deleteCandidate.id);
    if (previewItem?.id === deleteCandidate.id) {
      setPreviewItem(null);
    }
    setDeleteCandidate(null);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
              Biblioteca Multimedia Tecnideas
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 font-mono">
              {mediaItems.length} {mediaItems.length === 1 ? 'archivo' : 'archivos'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Gestión centralizada de imágenes en Firebase Storage & Firestore para Productos, Cursos y Coworking.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Subir Nueva Imagen</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar imagen por nombre o etiqueta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedCategory('Todas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'Todas'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            Todas ({mediaItems.length})
          </button>
          {mediaCategories.map((cat) => {
            const count = mediaItems.filter((m) => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-950/40 rounded-3xl border border-dashed border-slate-800 text-center">
          <ImageIcon className="w-12 h-12 text-slate-600 mb-3" />
          <h4 className="text-sm font-bold text-white mb-1">No se encontraron imágenes</h4>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            {searchTerm || selectedCategory !== 'Todas'
              ? 'Prueba cambiando los filtros o el término de búsqueda.'
              : 'La biblioteca está lista. Haz clic en "Subir Nueva Imagen" para comenzar.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Todas');
              setIsUploadModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-cyan-500 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Primera Imagen</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto pr-1 flex-1 pb-4">
          {filteredItems.map((item) => {
            const usage = isMediaUsed(item.publicUrl);
            const isSelected = selectedUrl === item.publicUrl;

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl bg-slate-900 border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-xl'
                }`}
              >
                {/* Thumbnail Container */}
                <div 
                  className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (isPickerMode && onSelectImage) {
                      onSelectImage(item.publicUrl, item);
                    } else {
                      setPreviewItem(item);
                    }
                  }}
                >
                  <img
                    src={item.publicUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[9px] font-bold border border-slate-700/80">
                      {item.category}
                    </span>
                  </div>

                  {usage.used && (
                    <div className="absolute bottom-2 left-2 bg-emerald-950/90 border border-emerald-600/60 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      <span>En uso ({usage.usedIn.length})</span>
                    </div>
                  )}

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    {isPickerMode && onSelectImage ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectImage(item.publicUrl, item);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Seleccionar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewItem(item);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs cursor-pointer shadow"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-2.5 space-y-1.5 bg-slate-900/90 border-t border-slate-800">
                  <h4 
                    className="text-xs font-bold text-white truncate cursor-pointer hover:text-cyan-400 transition-colors"
                    title={item.name}
                    onClick={() => setPreviewItem(item)}
                  >
                    {item.name}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>
                      {item.size ? `${(item.size / 1024).toFixed(0)} KB` : 'WebP Opt'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item.publicUrl, item.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Copiar URL directa"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteCandidate(item)}
                        className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Eliminar imagen"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SUBIR NUEVA IMAGEN                                                 */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                Subir Imagen a la Biblioteca Multimedia
              </h3>
              <p className="text-xs text-slate-400">
                Se optimizará a WebP de alta fidelidad y se almacenará en Firebase Storage.
              </p>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Image Input Area (Drag & Drop) */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.[0]) {
                    handleFileSelect(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : previewBlobUrl
                    ? 'border-cyan-500/40 bg-slate-950/60'
                    : 'border-slate-700 bg-slate-950/40 hover:border-slate-600'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                {previewBlobUrl ? (
                  <div className="space-y-2 w-full">
                    <div className="relative aspect-[16/10] max-h-48 mx-auto rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <img
                        src={previewBlobUrl}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-cyan-300 font-semibold">
                      ✓ Imagen procesada a 800x520 (WebP). Clic para cambiar de archivo.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Arrastra y suelta tu foto aquí, o <span className="text-cyan-400 underline">examina</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Soporta JPG, PNG o WebP (se redimensiona y optimiza automáticamente)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Or external URL */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">O pegar URL de imagen externa:</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={externalUrlInput}
                    onChange={(e) => setExternalUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleProcessExternalUrl}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
                  >
                    Cargar URL
                  </button>
                </div>
              </div>

              {/* Fit Mode */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400">Ajuste de proporción:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadFitMode('cover');
                      if (selectedFile) handleFileSelect(selectedFile);
                      else if (externalUrlInput) handleProcessExternalUrl();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      uploadFitMode === 'cover'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Llenar (Cover)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadFitMode('contain');
                      if (selectedFile) handleFileSelect(selectedFile);
                      else if (externalUrlInput) handleProcessExternalUrl();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      uploadFitMode === 'contain'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Completo + Fondo
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">Nombre o Título de la Imagen *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Teclado Mecánico RGB Pro"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">Categoría Multimedia</label>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isAddingNewCategory ? 'Elegir existente' : 'Crear categoría'}</span>
                  </button>
                </div>

                {isAddingNewCategory ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nueva categoría (ej: Banners, Promociones)"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddNewCategory}
                      className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {mediaCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando en Firebase...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Guardar en Biblioteca</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VISTA PREVIA DETALLADA                                             */}
      {/* ========================================================================= */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Badge */}
            <div className="space-y-1 pr-8">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                {previewItem.category}
              </span>
              <h3 className="text-lg font-bold text-white">{previewItem.name}</h3>
            </div>

            {/* Big Image Display */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={previewItem.publicUrl}
                alt={previewItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technical Metadata */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Dimensiones / Formato:</span>
                <span className="text-slate-300 font-mono font-semibold">
                  {previewItem.width || 800} x {previewItem.height || 520} px (WebP)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Tamaño de archivo:</span>
                <span className="text-slate-300 font-mono font-semibold">
                  {previewItem.size ? `${(previewItem.size / 1024).toFixed(1)} KB` : '~45 KB'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 block">Ruta en Firebase Storage:</span>
                <span className="text-slate-400 font-mono text-[11px] truncate block">
                  {previewItem.storagePath}
                </span>
              </div>
            </div>

            {/* Dependency / Usage Check */}
            {(() => {
              const usage = isMediaUsed(previewItem.publicUrl);
              return (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400">Asignada en la aplicación:</span>
                  {usage.used ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>En uso activo ({usage.usedIn.length} elementos vinculados):</span>
                      </div>
                      <ul className="list-disc list-inside text-emerald-300/90 pl-1 text-[11px]">
                        {usage.usedIn.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Esta imagen no está asignada a ningún producto, curso o espacio actualmente.
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteCandidate(previewItem)}
                className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar de Biblioteca</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewItem.publicUrl, previewItem.id)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === previewItem.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>

                {isPickerMode && onSelectImage && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectImage(previewItem.publicUrl, previewItem);
                      setPreviewItem(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Usar esta Imagen</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRMACIÓN DE ELIMINACIÓN CON ADVERTENCIA DE USO                 */}
      {/* ========================================================================= */}
      {deleteCandidate && (() => {
        const usage = isMediaUsed(deleteCandidate.publicUrl);

        return (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-white">¿Eliminar esta imagen?</h3>
                <p className="text-xs text-slate-300 font-semibold">{deleteCandidate.name}</p>
              </div>

              {/* CRITICAL WARNING IF IN USE */}
              {usage.used && (
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-2 text-left">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>¡Atención! Imagen en uso activo</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Esta imagen se encuentra asignada actualmente en:
                  </p>
                  <ul className="list-disc list-inside text-amber-200 text-[11px] pl-1 font-mono">
                    {usage.usedIn.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-amber-300/80 pt-1 border-t border-amber-500/30">
                    Si la eliminas, esos elementos podrían quedar sin imagen de portada en la tienda.
                  </p>
                </div>
              )}

              <p className="text-xs text-slate-400 text-center">
                Esta acción eliminará el archivo de Firebase Storage y el registro de la base de datos Firestore.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteCandidate(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 transition-all cursor-pointer"
                >
                  {usage.used ? 'Sí, eliminar de todas formas' : 'Sí, eliminar imagen'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
