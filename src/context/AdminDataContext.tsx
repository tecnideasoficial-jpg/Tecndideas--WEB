import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth, googleProvider } from '../lib/firebase';
import { 
  StoreItem, 
  StoreCategory, 
  YoutubeVideo, 
  ServiceItem,
  Course,
  SolutionPillar,
  Sede,
  WorkspaceSpace,
  MediaItem
} from '../types';
import { 
  STORE_ITEMS, 
  DIGITAL_SERVICES,
  COURSES,
  INITIAL_SOLUTION_PILLARS,
  INITIAL_SEDES,
  WORKSPACE_SPACES
} from '../data/tecnideasData';
import { 
  INITIAL_MEDIA_CATEGORIES, 
  INITIAL_MEDIA_ITEMS 
} from '../data/initialMedia';
import { deleteMediaFromStorage, slugify } from '../lib/mediaStorage';

const INITIAL_CATEGORIES: StoreCategory[] = [
  { id: 'todos', label: 'Todos', order: 0 },
  { id: 'impresion_digitacion', label: 'Impresión & Digitación', order: 1 },
  { id: 'tecnologia', label: 'Tecnología', order: 2 },
  { id: 'papeleria', label: 'Papelería', order: 3 },
  { id: 'digital', label: 'Servicios Web', order: 4 },
  { id: 'licencias', label: 'IA & Licencias', order: 5 },
  { id: 'workspace', label: 'Workspace & Pases', order: 6 },
  { id: 'capacitacion', label: 'Cursos & Talleres', order: 7 }
];

const INITIAL_YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: 'yt-1',
    title: 'Cómo crear un Agente de IA para WhatsApp en 2026',
    duration: '18:24 min',
    views: '12.4K vistas',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com'
  },
  {
    id: 'yt-2',
    title: 'Construye tu Sitio Web Profesional en Medellín sin saber código',
    duration: '24:10 min',
    views: '8.9K vistas',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com'
  },
  {
    id: 'yt-3',
    title: 'De Centro de Copiado a HUB Tecnológico: La historia de Tecnideas',
    duration: '12:05 min',
    views: '15.1K vistas',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    url: 'https://youtube.com'
  }
];

interface AdminDataContextType {
  storeItems: StoreItem[];
  categories: StoreCategory[];
  youtubeVideos: YoutubeVideo[];
  digitalServices: ServiceItem[];
  courses: Course[];
  solutionPillars: SolutionPillar[];
  sedes: Sede[];
  workspaceSpaces: WorkspaceSpace[];
  currentUser: User | null;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  isAdminPanelOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  registerWithEmail: (e: string, p: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  addStoreItem: (item: Omit<StoreItem, 'id'>) => Promise<void>;
  updateStoreItem: (id: string, item: Partial<StoreItem>) => Promise<void>;
  deleteStoreItem: (id: string) => Promise<void>;
  addCategory: (cat: Omit<StoreCategory, 'id'> & { id?: string }) => Promise<void>;
  updateCategory: (id: string, cat: Partial<StoreCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addYoutubeVideo: (video: Omit<YoutubeVideo, 'id'>) => Promise<void>;
  updateYoutubeVideo: (id: string, video: Partial<YoutubeVideo>) => Promise<void>;
  deleteYoutubeVideo: (id: string) => Promise<void>;
  addDigitalService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateDigitalService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  deleteDigitalService: (id: string) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addSolutionPillar: (pillar: Omit<SolutionPillar, 'id'>) => Promise<void>;
  updateSolutionPillar: (id: string, pillar: Partial<SolutionPillar>) => Promise<void>;
  deleteSolutionPillar: (id: string) => Promise<void>;
  addSede: (sede: Omit<Sede, 'id'>) => Promise<void>;
  updateSede: (id: string, sede: Partial<Sede>) => Promise<void>;
  deleteSede: (id: string) => Promise<void>;
  addWorkspaceSpace: (space: Omit<WorkspaceSpace, 'id'>) => Promise<void>;
  updateWorkspaceSpace: (id: string, space: Partial<WorkspaceSpace>) => Promise<void>;
  deleteWorkspaceSpace: (id: string) => Promise<void>;
  mediaItems: MediaItem[];
  mediaCategories: string[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'> & { id?: string }) => Promise<MediaItem>;
  deleteMediaItem: (id: string) => Promise<void>;
  addMediaCategory: (categoryName: string) => Promise<void>;
  isMediaUsed: (urlOrPathOrId: string) => { used: boolean; usedIn: string[] };
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Helper for persistent local caching
function getLocalCache<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) ? parsed.length > 0 : !!parsed) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn(`Error reading localStorage key ${key}:`, e);
  }
  return fallback;
}

function setLocalCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing localStorage key ${key}:`, e);
  }
}

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>(() => 
    getLocalCache('tecnideas_cached_store_items', STORE_ITEMS)
  );
  const [categories, setCategories] = useState<StoreCategory[]>(() => 
    getLocalCache('tecnideas_cached_categories', INITIAL_CATEGORIES)
  );
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>(() => 
    getLocalCache('tecnideas_cached_youtube_videos', INITIAL_YOUTUBE_VIDEOS)
  );
  const [digitalServices, setDigitalServices] = useState<ServiceItem[]>(() => 
    getLocalCache('tecnideas_cached_digital_services', DIGITAL_SERVICES)
  );
  const [courses, setCourses] = useState<Course[]>(() => 
    getLocalCache('tecnideas_cached_courses', COURSES)
  );
  const [solutionPillars, setSolutionPillars] = useState<SolutionPillar[]>(() => 
    getLocalCache('tecnideas_cached_solution_pillars', INITIAL_SOLUTION_PILLARS)
  );
  const [sedes, setSedes] = useState<Sede[]>(() => 
    getLocalCache('tecnideas_cached_sedes', INITIAL_SEDES)
  );
  const [workspaceSpaces, setWorkspaceSpaces] = useState<WorkspaceSpace[]>(() => 
    getLocalCache('tecnideas_cached_workspace_spaces', WORKSPACE_SPACES)
  );
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() =>
    getLocalCache('tecnideas_cached_media_items', INITIAL_MEDIA_ITEMS)
  );
  const [mediaCategories, setMediaCategories] = useState<string[]>(() =>
    getLocalCache('tecnideas_cached_media_categories', INITIAL_MEDIA_CATEGORIES)
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [localAdminSession, setLocalAdminSession] = useState<boolean>(() => {
    return localStorage.getItem('tecnideas_admin_active') === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const isAdmin = !!currentUser || localAdminSession;

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sync Store Items from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'store_items'), async (snapshot) => {
      if (snapshot.empty) {
        setStoreItems(STORE_ITEMS);
        setLocalCache('tecnideas_cached_store_items', STORE_ITEMS);
        try {
          for (const item of STORE_ITEMS) {
            await setDoc(doc(db, 'store_items', item.id), item);
          }
        } catch (e) {
          console.warn('Could not auto-seed store_items to Firestore:', e);
        }
      } else {
        const items: StoreItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as StoreItem);
        });
        setStoreItems(items);
        setLocalCache('tecnideas_cached_store_items', items);
      }
    }, (error) => {
      console.warn('Firestore store_items fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Categories from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      if (snapshot.empty) {
        setCategories(INITIAL_CATEGORIES);
        setLocalCache('tecnideas_cached_categories', INITIAL_CATEGORIES);
        try {
          for (const cat of INITIAL_CATEGORIES) {
            await setDoc(doc(db, 'categories', cat.id), cat);
          }
        } catch (e) {
          console.warn('Could not auto-seed categories to Firestore:', e);
        }
      } else {
        const cats: StoreCategory[] = [];
        snapshot.forEach((docSnap) => {
          cats.push({ id: docSnap.id, ...docSnap.data() } as StoreCategory);
        });
        cats.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setCategories(cats);
        setLocalCache('tecnideas_cached_categories', cats);
      }
    }, (error) => {
      console.warn('Firestore categories fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync YouTube Videos from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'youtube_videos'), async (snapshot) => {
      if (snapshot.empty) {
        setYoutubeVideos(INITIAL_YOUTUBE_VIDEOS);
        setLocalCache('tecnideas_cached_youtube_videos', INITIAL_YOUTUBE_VIDEOS);
        try {
          for (const video of INITIAL_YOUTUBE_VIDEOS) {
            await setDoc(doc(db, 'youtube_videos', video.id), video);
          }
        } catch (e) {
          console.warn('Could not auto-seed youtube_videos to Firestore:', e);
        }
      } else {
        const videos: YoutubeVideo[] = [];
        snapshot.forEach((docSnap) => {
          videos.push({ id: docSnap.id, ...docSnap.data() } as YoutubeVideo);
        });
        setYoutubeVideos(videos);
        setLocalCache('tecnideas_cached_youtube_videos', videos);
      }
    }, (error) => {
      console.warn('Firestore youtube_videos fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Digital Services from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'digital_services'), async (snapshot) => {
      if (snapshot.empty) {
        setDigitalServices(DIGITAL_SERVICES);
        setLocalCache('tecnideas_cached_digital_services', DIGITAL_SERVICES);
        try {
          for (const srv of DIGITAL_SERVICES) {
            await setDoc(doc(db, 'digital_services', srv.id), srv);
          }
        } catch (e) {
          console.warn('Could not auto-seed digital_services to Firestore:', e);
        }
      } else {
        const srvs: ServiceItem[] = [];
        snapshot.forEach((docSnap) => {
          srvs.push({ id: docSnap.id, ...docSnap.data() } as ServiceItem);
        });
        setDigitalServices(srvs);
        setLocalCache('tecnideas_cached_digital_services', srvs);
      }
    }, (error) => {
      console.warn('Firestore digital_services fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Courses from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), async (snapshot) => {
      if (snapshot.empty) {
        setCourses(COURSES);
        setLocalCache('tecnideas_cached_courses', COURSES);
        try {
          for (const crs of COURSES) {
            await setDoc(doc(db, 'courses', crs.id), crs);
          }
        } catch (e) {
          console.warn('Could not auto-seed courses to Firestore:', e);
        }
      } else {
        const crsList: Course[] = [];
        snapshot.forEach((docSnap) => {
          crsList.push({ id: docSnap.id, ...docSnap.data() } as Course);
        });
        setCourses(crsList);
        setLocalCache('tecnideas_cached_courses', crsList);
      }
    }, (error) => {
      console.warn('Firestore courses fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Solution Pillars from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'solution_pillars'), async (snapshot) => {
      if (snapshot.empty) {
        setSolutionPillars(INITIAL_SOLUTION_PILLARS);
        setLocalCache('tecnideas_cached_solution_pillars', INITIAL_SOLUTION_PILLARS);
        try {
          for (const pillar of INITIAL_SOLUTION_PILLARS) {
            await setDoc(doc(db, 'solution_pillars', pillar.id), pillar);
          }
        } catch (e) {
          console.warn('Could not auto-seed solution_pillars to Firestore:', e);
        }
      } else {
        const list: SolutionPillar[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as SolutionPillar);
        });
        setSolutionPillars(list);
        setLocalCache('tecnideas_cached_solution_pillars', list);
      }
    }, (error) => {
      console.warn('Firestore solution_pillars fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Sedes from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'sedes'), async (snapshot) => {
      if (snapshot.empty) {
        setSedes(INITIAL_SEDES);
        setLocalCache('tecnideas_cached_sedes', INITIAL_SEDES);
        try {
          for (const s of INITIAL_SEDES) {
            await setDoc(doc(db, 'sedes', s.id), s);
          }
        } catch (e) {
          console.warn('Could not auto-seed sedes to Firestore:', e);
        }
      } else {
        const list: Sede[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Sede);
        });
        setSedes(list);
        setLocalCache('tecnideas_cached_sedes', list);
      }
    }, (error) => {
      console.warn('Firestore sedes fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Workspace Spaces from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'workspace_spaces'), async (snapshot) => {
      if (snapshot.empty) {
        setWorkspaceSpaces(WORKSPACE_SPACES);
        setLocalCache('tecnideas_cached_workspace_spaces', WORKSPACE_SPACES);
        try {
          for (const sp of WORKSPACE_SPACES) {
            await setDoc(doc(db, 'workspace_spaces', sp.id), sp);
          }
        } catch (e) {
          console.warn('Could not auto-seed workspace_spaces to Firestore:', e);
        }
      } else {
        const list: WorkspaceSpace[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as WorkspaceSpace);
        });
        setWorkspaceSpaces(list);
        setLocalCache('tecnideas_cached_workspace_spaces', list);
      }
    }, (error) => {
      console.warn('Firestore workspace_spaces fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Media Items from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'media'), async (snapshot) => {
      if (snapshot.empty) {
        setMediaItems(INITIAL_MEDIA_ITEMS);
        setLocalCache('tecnideas_cached_media_items', INITIAL_MEDIA_ITEMS);
        try {
          for (const item of INITIAL_MEDIA_ITEMS) {
            await setDoc(doc(db, 'media', item.id), item);
          }
        } catch (e) {
          console.warn('Could not auto-seed media to Firestore:', e);
        }
      } else {
        const items: MediaItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
        });
        items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setMediaItems(items);
        setLocalCache('tecnideas_cached_media_items', items);
      }
    }, (error) => {
      console.warn('Firestore media fallback to cache/local:', error);
    });
    return () => unsub();
  }, []);

  // Sync Media Categories from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'media_categories'), (snapshot) => {
      if (!snapshot.empty) {
        const cats: string[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.name && !cats.includes(data.name)) {
            cats.push(data.name);
          }
        });
        const merged = Array.from(new Set([...INITIAL_MEDIA_CATEGORIES, ...cats]));
        setMediaCategories(merged);
        setLocalCache('tecnideas_cached_media_categories', merged);
      }
    }, (error) => {
      console.warn('Firestore media_categories fallback:', error);
    });
    return () => unsub();
  }, []);

  // Authentication methods
  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      if (
        err.code === 'auth/operation-not-allowed' ||
        err.code === 'auth/unauthorized-domain' ||
        err.code === 'auth/admin-restricted-operation'
      ) {
        setLocalAdminSession(true);
        localStorage.setItem('tecnideas_admin_active', 'true');
        return;
      }
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, pass);
        } catch (regErr: any) {
          if (
            regErr.code === 'auth/operation-not-allowed' ||
            regErr.code === 'auth/unauthorized-domain'
          ) {
            setLocalAdminSession(true);
            localStorage.setItem('tecnideas_admin_active', 'true');
            return;
          }
          throw regErr;
        }
      } else {
        throw err;
      }
    }
  };

  const registerWithEmail = async (email: string, pass: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      if (
        err.code === 'auth/operation-not-allowed' ||
        err.code === 'auth/unauthorized-domain'
      ) {
        setLocalAdminSession(true);
        localStorage.setItem('tecnideas_admin_active', 'true');
        return;
      }
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (
        err.code === 'auth/operation-not-allowed' ||
        err.code === 'auth/popup-blocked'
      ) {
        setLocalAdminSession(true);
        localStorage.setItem('tecnideas_admin_active', 'true');
        return;
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Logout signOut notice:', e);
    }
    setLocalAdminSession(false);
    localStorage.removeItem('tecnideas_admin_active');
    setIsAdminPanelOpen(false);
  };

  // CRUD for Store Items
  const addStoreItem = async (item: Omit<StoreItem, 'id'>) => {
    const id = 'prod-' + Date.now();
    const newItem: StoreItem = { ...item, id };
    setStoreItems((prev) => {
      const next = [newItem, ...prev];
      setLocalCache('tecnideas_cached_store_items', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'store_items', id), newItem);
    } catch (e) {
      console.warn('Firestore setDoc store_items:', e);
    }
  };

  const updateStoreItem = async (id: string, item: Partial<StoreItem>) => {
    let updatedItem: StoreItem | null = null;
    setStoreItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      updatedItem = existing ? { ...existing, ...item, id } : ({ ...item, id } as StoreItem);
      const next = prev.map((i) => (i.id === id ? updatedItem! : i));
      setLocalCache('tecnideas_cached_store_items', next);
      return next;
    });
    try {
      if (updatedItem) {
        await setDoc(doc(db, 'store_items', id), updatedItem, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc store_items:', e);
    }
  };

  const deleteStoreItem = async (id: string) => {
    setStoreItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      setLocalCache('tecnideas_cached_store_items', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'store_items', id));
    } catch (e) {
      console.warn('Firestore deleteDoc store_items:', e);
    }
  };

  // CRUD for Categories
  const addCategory = async (cat: Omit<StoreCategory, 'id'> & { id?: string }) => {
    const id = cat.id || cat.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const newCat = { id, label: cat.label, order: cat.order ?? (categories.length + 1) };
    setCategories((prev) => {
      const next = [...prev, newCat];
      setLocalCache('tecnideas_cached_categories', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'categories', id), newCat);
    } catch (e) {
      console.warn('Firestore setDoc categories:', e);
    }
  };

  const updateCategory = async (id: string, cat: Partial<StoreCategory>) => {
    let updatedCat: StoreCategory | null = null;
    setCategories((prev) => {
      const existing = prev.find((c) => c.id === id);
      updatedCat = existing ? { ...existing, ...cat, id } : ({ ...cat, id } as StoreCategory);
      const next = prev.map((c) => (c.id === id ? updatedCat! : c));
      setLocalCache('tecnideas_cached_categories', next);
      return next;
    });
    try {
      if (updatedCat) {
        await setDoc(doc(db, 'categories', id), updatedCat, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc categories:', e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id);
      setLocalCache('tecnideas_cached_categories', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (e) {
      console.warn('Firestore deleteDoc categories:', e);
    }
  };

  // CRUD for YouTube Videos
  const addYoutubeVideo = async (video: Omit<YoutubeVideo, 'id'>) => {
    const id = 'yt-' + Date.now();
    const newVideo = { ...video, id };
    setYoutubeVideos((prev) => {
      const next = [newVideo, ...prev];
      setLocalCache('tecnideas_cached_youtube_videos', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'youtube_videos', id), newVideo);
    } catch (e) {
      console.warn('Firestore setDoc youtube_videos:', e);
    }
  };

  const updateYoutubeVideo = async (id: string, video: Partial<YoutubeVideo>) => {
    let updatedVideo: YoutubeVideo | null = null;
    setYoutubeVideos((prev) => {
      const existing = prev.find((v) => v.id === id);
      updatedVideo = existing ? { ...existing, ...video, id } : ({ ...video, id } as YoutubeVideo);
      const next = prev.map((v) => (v.id === id ? updatedVideo! : v));
      setLocalCache('tecnideas_cached_youtube_videos', next);
      return next;
    });
    try {
      if (updatedVideo) {
        await setDoc(doc(db, 'youtube_videos', id), updatedVideo, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc youtube_videos:', e);
    }
  };

  const deleteYoutubeVideo = async (id: string) => {
    setYoutubeVideos((prev) => {
      const next = prev.filter((v) => v.id !== id);
      setLocalCache('tecnideas_cached_youtube_videos', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'youtube_videos', id));
    } catch (e) {
      console.warn('Firestore deleteDoc youtube_videos:', e);
    }
  };

  // CRUD for Digital Services
  const addDigitalService = async (service: Omit<ServiceItem, 'id'>) => {
    const id = 'srv-' + Date.now();
    const newService = { ...service, id };
    setDigitalServices((prev) => {
      const next = [newService, ...prev];
      setLocalCache('tecnideas_cached_digital_services', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'digital_services', id), newService);
    } catch (e) {
      console.warn('Firestore setDoc digital_services:', e);
    }
  };

  const updateDigitalService = async (id: string, service: Partial<ServiceItem>) => {
    let updatedService: ServiceItem | null = null;
    setDigitalServices((prev) => {
      const existing = prev.find((s) => s.id === id);
      updatedService = existing ? { ...existing, ...service, id } : ({ ...service, id } as ServiceItem);
      const next = prev.map((s) => (s.id === id ? updatedService! : s));
      setLocalCache('tecnideas_cached_digital_services', next);
      return next;
    });
    try {
      if (updatedService) {
        await setDoc(doc(db, 'digital_services', id), updatedService, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc digital_services:', e);
    }
  };

  const deleteDigitalService = async (id: string) => {
    setDigitalServices((prev) => {
      const next = prev.filter((s) => s.id !== id);
      setLocalCache('tecnideas_cached_digital_services', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'digital_services', id));
    } catch (e) {
      console.warn('Firestore deleteDoc digital_services:', e);
    }
  };

  // CRUD for Courses
  const addCourse = async (course: Omit<Course, 'id'>) => {
    const id = 'crs-' + Date.now();
    const newCourse = { ...course, id };
    setCourses((prev) => {
      const next = [newCourse, ...prev];
      setLocalCache('tecnideas_cached_courses', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'courses', id), newCourse);
    } catch (e) {
      console.warn('Firestore setDoc courses:', e);
    }
  };

  const updateCourse = async (id: string, course: Partial<Course>) => {
    let updatedCourse: Course | null = null;
    setCourses((prev) => {
      const existing = prev.find((c) => c.id === id);
      updatedCourse = existing ? { ...existing, ...course, id } : ({ ...course, id } as Course);
      const next = prev.map((c) => (c.id === id ? updatedCourse! : c));
      setLocalCache('tecnideas_cached_courses', next);
      return next;
    });
    try {
      if (updatedCourse) {
        await setDoc(doc(db, 'courses', id), updatedCourse, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc courses:', e);
    }
  };

  const deleteCourse = async (id: string) => {
    setCourses((prev) => {
      const next = prev.filter((c) => c.id !== id);
      setLocalCache('tecnideas_cached_courses', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (e) {
      console.warn('Firestore deleteDoc courses:', e);
    }
  };

  // CRUD for Solution Pillars
  const addSolutionPillar = async (pillar: Omit<SolutionPillar, 'id'>) => {
    const id = 'pillar-' + Date.now();
    const newPillar = { ...pillar, id };
    setSolutionPillars((prev) => {
      const next = [...prev, newPillar];
      setLocalCache('tecnideas_cached_solution_pillars', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'solution_pillars', id), newPillar);
    } catch (e) {
      console.warn('Firestore setDoc solution_pillars:', e);
    }
  };

  const updateSolutionPillar = async (id: string, pillar: Partial<SolutionPillar>) => {
    let updatedPillar: SolutionPillar | null = null;
    setSolutionPillars((prev) => {
      const existing = prev.find((p) => p.id === id);
      updatedPillar = existing ? { ...existing, ...pillar, id } : ({ ...pillar, id } as SolutionPillar);
      const next = prev.map((p) => (p.id === id ? updatedPillar! : p));
      setLocalCache('tecnideas_cached_solution_pillars', next);
      return next;
    });
    try {
      if (updatedPillar) {
        await setDoc(doc(db, 'solution_pillars', id), updatedPillar, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc solution_pillars:', e);
    }
  };

  const deleteSolutionPillar = async (id: string) => {
    setSolutionPillars((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setLocalCache('tecnideas_cached_solution_pillars', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'solution_pillars', id));
    } catch (e) {
      console.warn('Firestore deleteDoc solution_pillars:', e);
    }
  };

  // CRUD for Sedes
  const addSede = async (sede: Omit<Sede, 'id'>) => {
    const id = 'sede-' + Date.now();
    const newSede = { ...sede, id };
    setSedes((prev) => {
      const next = [...prev, newSede];
      setLocalCache('tecnideas_cached_sedes', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'sedes', id), newSede);
    } catch (e) {
      console.warn('Firestore setDoc sedes:', e);
    }
  };

  const updateSede = async (id: string, sede: Partial<Sede>) => {
    let updatedSede: Sede | null = null;
    setSedes((prev) => {
      const existing = prev.find((s) => s.id === id);
      updatedSede = existing ? { ...existing, ...sede, id } : ({ ...sede, id } as Sede);
      const next = prev.map((s) => (s.id === id ? updatedSede! : s));
      setLocalCache('tecnideas_cached_sedes', next);
      return next;
    });
    try {
      if (updatedSede) {
        await setDoc(doc(db, 'sedes', id), updatedSede, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc sedes:', e);
    }
  };

  const deleteSede = async (id: string) => {
    setSedes((prev) => {
      const next = prev.filter((s) => s.id !== id);
      setLocalCache('tecnideas_cached_sedes', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'sedes', id));
    } catch (e) {
      console.warn('Firestore deleteDoc sedes:', e);
    }
  };

  // CRUD for Workspace Spaces
  const addWorkspaceSpace = async (space: Omit<WorkspaceSpace, 'id'>) => {
    const id = 'space-' + Date.now();
    const newSpace = { ...space, id };
    setWorkspaceSpaces((prev) => {
      const next = [...prev, newSpace];
      setLocalCache('tecnideas_cached_workspace_spaces', next);
      return next;
    });
    try {
      await setDoc(doc(db, 'workspace_spaces', id), newSpace);
    } catch (e) {
      console.warn('Firestore setDoc workspace_spaces:', e);
    }
  };

  const updateWorkspaceSpace = async (id: string, space: Partial<WorkspaceSpace>) => {
    let updatedSpace: WorkspaceSpace | null = null;
    setWorkspaceSpaces((prev) => {
      const existing = prev.find((sp) => sp.id === id);
      updatedSpace = existing ? { ...existing, ...space, id } : ({ ...space, id } as WorkspaceSpace);
      const next = prev.map((sp) => (sp.id === id ? updatedSpace! : sp));
      setLocalCache('tecnideas_cached_workspace_spaces', next);
      return next;
    });
    try {
      if (updatedSpace) {
        await setDoc(doc(db, 'workspace_spaces', id), updatedSpace, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore setDoc workspace_spaces:', e);
    }
  };

  const deleteWorkspaceSpace = async (id: string) => {
    setWorkspaceSpaces((prev) => {
      const next = prev.filter((sp) => sp.id !== id);
      setLocalCache('tecnideas_cached_workspace_spaces', next);
      return next;
    });
    try {
      await deleteDoc(doc(db, 'workspace_spaces', id));
    } catch (e) {
      console.warn('Firestore deleteDoc workspace_spaces:', e);
    }
  };

  // Media Management Methods
  const isMediaUsed = (urlOrPathOrId: string): { used: boolean; usedIn: string[] } => {
    if (!urlOrPathOrId) return { used: false, usedIn: [] };
    const target = urlOrPathOrId.trim();
    const usedIn: string[] = [];

    // Check store items
    for (const item of storeItems) {
      if (item.imageUrl && (item.imageUrl === target || (target.length > 25 && item.imageUrl.includes(target.split('?')[0])))) {
        usedIn.push(`Producto: ${item.name}`);
      }
    }

    // Check courses
    for (const course of courses) {
      if (course.imageUrl && (course.imageUrl === target || (target.length > 25 && course.imageUrl.includes(target.split('?')[0])))) {
        usedIn.push(`Curso: ${course.title}`);
      }
    }

    // Check workspace spaces
    for (const space of workspaceSpaces) {
      if (space.imageUrl && (space.imageUrl === target || (target.length > 25 && space.imageUrl.includes(target.split('?')[0])))) {
        usedIn.push(`Coworking: ${space.name}`);
      }
    }

    // Check YouTube videos
    for (const video of youtubeVideos) {
      if (video.thumbnail && (video.thumbnail === target || (target.length > 25 && video.thumbnail.includes(target.split('?')[0])))) {
        usedIn.push(`Video: ${video.title}`);
      }
    }

    return { used: usedIn.length > 0, usedIn };
  };

  const addMediaItem = async (item: Omit<MediaItem, 'id' | 'createdAt'> & { id?: string }): Promise<MediaItem> => {
    const newId = item.id || `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const fullItem: MediaItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setMediaItems((prev) => {
      const updated = [fullItem, ...prev.filter((m) => m.id !== newId)];
      setLocalCache('tecnideas_cached_media_items', updated);
      return updated;
    });

    try {
      await setDoc(doc(db, 'media', newId), fullItem);
    } catch (e) {
      console.warn('Firestore setDoc media fallback:', e);
    }

    return fullItem;
  };

  const deleteMediaItem = async (id: string) => {
    const itemToDelete = mediaItems.find((m) => m.id === id);
    setMediaItems((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      setLocalCache('tecnideas_cached_media_items', updated);
      return updated;
    });

    if (itemToDelete?.storagePath) {
      try {
        await deleteMediaFromStorage(itemToDelete.storagePath);
      } catch (e) {
        console.warn('Storage deletion fallback:', e);
      }
    }

    try {
      await deleteDoc(doc(db, 'media', id));
    } catch (e) {
      console.warn('Firestore deleteDoc media:', e);
    }
  };

  const addMediaCategory = async (categoryName: string) => {
    const clean = categoryName.trim();
    if (!clean || mediaCategories.includes(clean)) return;
    const updated = [...mediaCategories, clean];
    setMediaCategories(updated);
    setLocalCache('tecnideas_cached_media_categories', updated);
    try {
      await setDoc(doc(db, 'media_categories', slugify(clean)), {
        name: clean,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Firestore setDoc media_categories:', e);
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        storeItems,
        categories,
        youtubeVideos,
        digitalServices,
        courses,
        solutionPillars,
        sedes,
        workspaceSpaces,
        mediaItems,
        mediaCategories,
        addMediaItem,
        deleteMediaItem,
        addMediaCategory,
        isMediaUsed,
        currentUser,
        isAdmin,
        isAuthModalOpen,
        isAdminPanelOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        openAdminPanel: () => setIsAdminPanelOpen(true),
        closeAdminPanel: () => setIsAdminPanelOpen(false),
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
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
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
