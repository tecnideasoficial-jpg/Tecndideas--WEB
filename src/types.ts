export type ClientSegment = 'emprendedor' | 'empresa' | 'tramites' | 'capacitacion' | 'workspace';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'digital' | 'tradicional';
  description: string;
  badge?: string;
  iconName: string;
  features: string[];
  priceStart: string;
  popular?: boolean;
  idealFor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  description: string;
  imageUrl: string;
  beforeImage?: string;
  afterImage?: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  priceRange: string;
  liveUrl?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'digital' | 'fisico' | 'licencias' | 'capacitacion' | 'workspace' | 'impresion_digitacion' | 'tecnologia' | 'papeleria' | string;
  type: 'servicio' | 'producto' | 'pase';
  price: number;
  currency: string;
  description: string;
  features: string[];
  imageUrl: string;
  badge?: string;
  inStock?: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  highlight: string;
}

export interface Course {
  id: string;
  title: string;
  level: string;
  duration: string;
  modality: 'Presencial (Medellín)' | 'Virtual En Vivo' | 'Grabado';
  description: string;
  instructor: string;
  price: string;
  topics: string[];
  imageUrl: string;
  badge?: string;
}

export interface WorkspaceSpace {
  id: string;
  name: string;
  capacity: string;
  priceHour: string;
  priceDay: string;
  description: string;
  amenities: string[];
  imageUrl: string;
}

export interface ConfiguratorOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  timeEstimate: string;
  features: string[];
}

export interface StoreCategory {
  id: string;
  label: string;
  order?: number;
}

export interface SolutionPillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: 'blue' | 'purple' | 'emerald' | 'amber' | string;
  tag: string;
  targetPage: string;
  features: string[];
  buttonText: string;
}

export interface Sede {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  schedule: string;
  status: 'Operativa' | 'En Proyecto' | 'En Remodelación';
  isPrimary?: boolean;
  mapUrl?: string;
  description?: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  url: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
