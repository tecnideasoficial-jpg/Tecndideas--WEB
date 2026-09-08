import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2, 
  Check, 
  Crop, 
  Info,
  CheckCircle2,
  Search,
  ExternalLink,
  Plus,
  Loader2
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { uploadMediaToStorage, processImageToWebp } from '../lib/mediaStorage';
import { MediaItem } from '../types';

export interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  categoryHint?: string;
  aspectRatioLabel?: string;
}

type Mode = 'cover' | 'contain-blur' | 'contain-neutral';

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Foto / Imagen',
  categoryHint,
  aspectRatioLabel = 'Espacio de tarjeta (16:10 / 4:3)'
}) => {
  const { 
    mediaItems, 
    mediaCategories, 
    addMediaItem, 
    addMediaCategory 
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fitMode, setFitMode] = useState<Mode>('cover');
  const [urlInput, setUrlInput] = useState(value || '');
  const [lastFileSize, setLastFileSize] = useState<string | null>(null);

  // Library search and category filter within ImageUploader
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryCategory, setLibraryCategory] = useState<string>('Todas');

  // Option to auto-save uploaded file into Tecnideas Media Library
  const [saveToLibrary, setSaveToLibrary] = useState(true);
  const [imageTitle, setImageTitle] = useState('');
  const [selectedLibraryCategory, setSelectedLibraryCategory] = useState<string>(
    categoryHint || mediaCategories[0] || 'Impresión & Papelería'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const rawImageRef = useRef<HTMLImageElement | null>(null);

  // Sync url input when prop changes
  useEffect(() => {
    setUrlInput(value || '');
  }, [value]);

  // Categories list for library
  const categoriesList = ['Todas', ...mediaCategories];

  // Process image using HTML5 Canvas
  const processImageToCardSlot = (img: HTMLImageElement, mode: Mode = fitMode): string => {
    const canvas = document.createElement('canvas');
    const targetWidth = 800;
    const targetHeight = 520;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    if (mode === 'contain-neutral') {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      const scale = Math.min(targetWidth / img.width, targetHeight / img.height) * 0.92;
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (targetWidth - drawWidth) / 2;
      const dy = (targetHeight - drawHeight) / 2;

      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    } else if (mode === 'contain-blur') {
      ctx.save();
      ctx.filter = 'blur(20px) brightness(0.6)';
      ctx.drawImage(img, -30, -30, targetWidth + 60, targetHeight + 60);
      ctx.restore();

      const scale = Math.min(targetWidth / img.width, targetHeight / img.height) * 0.94;
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (targetWidth - drawWidth) / 2;
      const dy = (targetHeight - drawHeight) / 2;

      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 16;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    } else {
      const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (targetWidth - drawWidth) / 2;
      const dy = (targetHeight - drawHeight) / 2;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    }

    let compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
    if (!compressedDataUrl.startsWith('data:image/webp')) {
      compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
    }

    const head = compressedDataUrl.split(',')[0];
    const base64Data = compressedDataUrl.substring(head.length + 1);
    const sizeInBytes = Math.round((base64Data.length * 3) / 4);
    const kb = (sizeInBytes / 1024).toFixed(1);
    setLastFileSize(`${kb} KB`);

    return compressedDataUrl;
  };

  // Re-process when fit mode changes
  const handleModeChange = (newMode: Mode) => {
    setFitMode(newMode);
    if (rawImageRef.current) {
      const updatedDataUrl = processImageToCardSlot(rawImageRef.current, newMode);
      if (updatedDataUrl) {
        onChange(updatedDataUrl);
      }
    }
  };

  // Handle local file upload
  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen (PNG, JPG o WebP)');
      return;
    }

    setIsProcessing(true);

    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    setImageTitle(formattedTitle);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        rawImageRef.current = img;
        const optimizedDataUrl = processImageToCardSlot(img, fitMode);

        // Immediately set preview for user
        onChange(optimizedDataUrl);

        // If user wants to save to central library, upload to Firebase Storage & Firestore
        if (saveToLibrary) {
          try {
            const uploadResult = await uploadMediaToStorage(file, {
              name: formattedTitle,
              category: selectedLibraryCategory,
              fitMode: fitMode === 'contain-blur' || fitMode === 'contain-neutral' ? 'contain' : 'cover'
            });

            await addMediaItem({
              name: formattedTitle,
              category: selectedLibraryCategory,
              storagePath: uploadResult.storagePath,
              publicUrl: uploadResult.publicUrl,
              width: uploadResult.width,
              height: uploadResult.height,
              size: uploadResult.size
            });

            // Update to the permanent public URL
            onChange(uploadResult.publicUrl);
          } catch (storageErr) {
            console.warn('Fallback: image kept in optimized dataUrl:', storageErr);
          }
        }

        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Filtered Media Items from Library
  const filteredLibraryItems = mediaItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(librarySearch.toLowerCase());
    const matchesCat = 
      libraryCategory === 'Todas' || item.category === libraryCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-3">
      {/* Header & Label */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-200">
          {label}
        </label>
        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
          <Info className="w-3 h-3 text-cyan-400" />
          {aspectRatioLabel}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 gap-1">
        {/* Tab 1: Subir desde mi equipo */}
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Subir desde mi equipo</span>
        </button>

        {/* Tab 2: Biblioteca Multimedia Tecnideas */}
        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'library'
              ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Galería Tecnideas ({mediaItems.length})</span>
        </button>

        {/* Tab 3: Enlace URL Web */}
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Enlace URL Web</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SUBIR DESDE MI EQUIPO CON PROCESAMIENTO AUTOMÁTICO                 */}
      {/* ========================================================================= */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
              dragOver
                ? 'border-cyan-400 bg-cyan-500/10'
                : 'border-slate-700 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-900/50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {isProcessing
                  ? 'Procesando y optimizando imagen...'
                  : 'Haz clic para seleccionar o arrastra una imagen aquí'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Formatos: JPG, PNG o WebP desde tu celular o computador
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] text-cyan-300 font-medium">
              ⚡ Se auto-recorta y optimiza automáticamente al tamaño perfecto
            </span>
          </div>

          {/* Library sync option */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveToLibrary}
                onChange={(e) => setSaveToLibrary(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs font-semibold text-slate-300">
                Guardar automáticamente en la Biblioteca Multimedia Tecnideas
              </span>
            </label>

            {saveToLibrary && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400">Categoría:</span>
                <select
                  value={selectedLibraryCategory}
                  onChange={(e) => setSelectedLibraryCategory(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  {mediaCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Auto-reorganize formatting controls */}
          {value && (
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Crop className="w-3.5 h-3.5 text-cyan-400" />
                  Modo de ajuste para la tarjeta:
                </span>
                {lastFileSize && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
                    {lastFileSize} • Listo para guardar
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleModeChange('cover')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center cursor-pointer ${
                    fitMode === 'cover'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Llenar Espacio (Cover)
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('contain-blur')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center cursor-pointer ${
                    fitMode === 'contain-blur'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Completa + Difuminado
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('contain-neutral')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center cursor-pointer ${
                    fitMode === 'contain-neutral'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Fondo Obscuro Neutro
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: GALERÍA TECNIDEAS CONECTADA A LA BIBLIOTECA MULTIMEDIA             */}
      {/* ========================================================================= */}
      {activeTab === 'library' && (
        <div className="space-y-3">
          {/* Search bar within picker */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar en la biblioteca por nombre o categoría..."
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setLibraryCategory(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  libraryCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of library images */}
          {filteredLibraryItems.length === 0 ? (
            <div className="p-6 text-center bg-slate-950 rounded-2xl border border-dashed border-slate-800">
              <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No hay imágenes que coincidan en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
              {filteredLibraryItems.map((item) => {
                const isSelected = value === item.publicUrl;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(item.publicUrl);
                      setLastFileSize(item.size ? `${(item.size / 1024).toFixed(0)} KB` : null);
                    }}
                    className={`group relative rounded-xl overflow-hidden aspect-video border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-md'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={item.publicUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-1.5 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-white leading-tight line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-[8px] text-cyan-300">
                        {item.category}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-cyan-500 text-slate-950 p-0.5 rounded-full">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ENLACE URL WEB                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/... o enlace directo de imagen"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="button"
              onClick={async () => {
                if (!urlInput.trim()) return;
                setIsProcessing(true);
                try {
                  const processed = await processImageToWebp(urlInput.trim(), 800, 520, 0.85, 'cover');
                  onChange(processed.dataUrl);
                  setLastFileSize(`${(processed.size / 1024).toFixed(0)} KB`);
                } catch {
                  // Direct URL assignment if canvas load is blocked
                  onChange(urlInput.trim());
                  setLastFileSize(null);
                } finally {
                  setIsProcessing(false);
                }
              }}
              className="px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 cursor-pointer shrink-0"
            >
              Aplicar
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Pega cualquier URL de imagen web directa (Unsplash, Pexels, Google Drive público o tu proveedor).
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIVE PREVIEW OF THE CARD                                                  */}
      {/* ========================================================================= */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950/80 group">
          <div className="relative h-36 w-full overflow-hidden bg-slate-900">
            <img
              src={value}
              alt="Vista previa para la tarjeta"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-cyan-400 text-[10px] font-bold border border-slate-700 backdrop-blur-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span>Vista Previa Activa (800 x 520)</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onChange('');
                setLastFileSize(null);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white transition-colors cursor-pointer shadow"
              title="Quitar imagen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/90 border-t border-slate-800">
            <span className="truncate max-w-[280px] font-mono text-[10px]">
              {value.startsWith('data:') ? 'Imagen Procesada WebP (Local)' : value}
            </span>
            <span className="text-emerald-400 font-semibold shrink-0">
              {lastFileSize || 'Óptima'}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
