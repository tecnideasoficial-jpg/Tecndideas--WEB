import React, { useState } from 'react';
import { 
  Building2, 
  Wifi, 
  Coffee, 
  Monitor, 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PhoneCall,
  Edit3
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export const WorkspaceSection: React.FC = () => {
  const { workspaceSpaces, isAdmin, openAdminPanel } = useAdminData();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');

  const spacesList = workspaceSpaces && workspaceSpaces.length > 0 ? workspaceSpaces : [];
  const activeSpace = spacesList.find(s => s.id === selectedSpaceId) || spacesList[0];

  const handleBookSpace = (spaceName: string) => {
    const text = `Hola Tecnideas Workspace, me interesa reservar el espacio: *${spaceName}* en su sede de Medellín. ¿Tienen disponibilidad para esta semana?`;
    window.open(`https://wa.me/573024171818?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="workspace" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tecnideas Workspace Medellín</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            El HUB donde las ideas de Medellín se hacen realidad
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Coworking con internet dedicado de alta velocidad, salas ejecutivas de juntas, auditorio de capacitación, café ilimitado y una comunidad vibrante de emprendedores.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {spacesList.map((space) => {
            const isSelected = activeSpace?.id === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {space.name}
              </button>
            );
          })}
        </div>

        {/* Selected Space Showcase Card */}
        {activeSpace && (
          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-800/90 border border-slate-700/80 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Image Side */}
              <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[300px]">
                <img
                  src={activeSpace.imageUrl}
                  alt={activeSpace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-md shadow-md">
                  Capacidad: {activeSpace.capacity}
                </div>
              </div>

              {/* Info Side */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{activeSpace.name}</h3>
                      <p className="text-xs text-indigo-400 font-mono font-semibold">
                        Sede Castilla - CRA 68 No. 96 78, Medellín
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={openAdminPanel}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Editar Espacios HUB en el Panel de Administración"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar HUB</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeSpace.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-sans">Tarifa por Hora:</span>
                      <span className="text-base font-bold text-emerald-400">{activeSpace.priceHour}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-sans">Tarifa Día Completo:</span>
                      <span className="text-base font-bold text-blue-400">{activeSpace.priceDay}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Servicios Incluidos:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {activeSpace.amenities && activeSpace.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-700/80">
                  <button
                    onClick={() => handleBookSpace(activeSpace.name)}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar o Consultar Disponibilidad</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Workspace Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <Wifi className="w-6 h-6 text-indigo-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">300 Mbps Simétrico</h4>
            <p className="text-xs text-slate-400">Fibra óptica dedicada garantizada para videollamadas fluidas.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <Coffee className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Estación de Café & Té</h4>
            <p className="text-xs text-slate-400">Bebidas ilimitadas durante toda tu jornada de trabajo.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <Users className="w-6 h-6 text-blue-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Comunidad & Networking</h4>
            <p className="text-xs text-slate-400">Conecta con emprendedores, mentores y futuros socios.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <Building2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Descuento en Copiado</h4>
            <p className="text-xs text-slate-400">Acceso preferencial al centro de impresiones e insumos.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
