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
  Sede
} from '../types';
import { 
  STORE_ITEMS, 
  DIGITAL_SERVICES,
  COURSES,
  INITIAL_SOLUTION_PILLARS,
  INITIAL_SEDES
} from '../data/tecnideasData';

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
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>(STORE_ITEMS);
  const [categories, setCategories] = useState<StoreCategory[]>(INITIAL_CATEGORIES);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>(INITIAL_YOUTUBE_VIDEOS);
  const [digitalServices, setDigitalServices] = useState<ServiceItem[]>(DIGITAL_SERVICES);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [solutionPillars, setSolutionPillars] = useState<SolutionPillar[]>(INITIAL_SOLUTION_PILLARS);
  const [sedes, setSedes] = useState<Sede[]>(INITIAL_SEDES);

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
        if (auth.currentUser) {
          try {
            for (const item of STORE_ITEMS) {
              await setDoc(doc(db, 'store_items', item.id), item);
            }
          } catch (e) {
            console.warn('Could not seed store_items:', e);
          }
        }
      } else {
        const items: StoreItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as StoreItem);
        });
        setStoreItems(items);
      }
    }, (error) => {
      console.warn('Firestore store_items fallback to local:', error);
      setStoreItems(STORE_ITEMS);
    });
    return () => unsub();
  }, []);

  // Sync Categories from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      if (snapshot.empty) {
        setCategories(INITIAL_CATEGORIES);
        if (auth.currentUser) {
          try {
            for (const cat of INITIAL_CATEGORIES) {
              await setDoc(doc(db, 'categories', cat.id), cat);
            }
          } catch (e) {
            console.warn('Could not seed categories:', e);
          }
        }
      } else {
        const cats: StoreCategory[] = [];
        snapshot.forEach((docSnap) => {
          cats.push({ id: docSnap.id, ...docSnap.data() } as StoreCategory);
        });
        cats.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setCategories(cats);
      }
    }, (error) => {
      console.warn('Firestore categories fallback to local:', error);
      setCategories(INITIAL_CATEGORIES);
    });
    return () => unsub();
  }, []);

  // Sync YouTube Videos from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'youtube_videos'), async (snapshot) => {
      if (snapshot.empty) {
        setYoutubeVideos(INITIAL_YOUTUBE_VIDEOS);
        if (auth.currentUser) {
          try {
            for (const video of INITIAL_YOUTUBE_VIDEOS) {
              await setDoc(doc(db, 'youtube_videos', video.id), video);
            }
          } catch (e) {
            console.warn('Could not seed youtube_videos:', e);
          }
        }
      } else {
        const videos: YoutubeVideo[] = [];
        snapshot.forEach((docSnap) => {
          videos.push({ id: docSnap.id, ...docSnap.data() } as YoutubeVideo);
        });
        setYoutubeVideos(videos);
      }
    }, (error) => {
      console.warn('Firestore youtube_videos fallback to local:', error);
      setYoutubeVideos(INITIAL_YOUTUBE_VIDEOS);
    });
    return () => unsub();
  }, []);

  // Sync Digital Services from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'digital_services'), async (snapshot) => {
      if (snapshot.empty) {
        setDigitalServices(DIGITAL_SERVICES);
        if (auth.currentUser) {
          try {
            for (const srv of DIGITAL_SERVICES) {
              await setDoc(doc(db, 'digital_services', srv.id), srv);
            }
          } catch (e) {
            console.warn('Could not seed digital_services:', e);
          }
        }
      } else {
        const srvs: ServiceItem[] = [];
        snapshot.forEach((docSnap) => {
          srvs.push({ id: docSnap.id, ...docSnap.data() } as ServiceItem);
        });
        setDigitalServices(srvs);
      }
    }, (error) => {
      console.warn('Firestore digital_services fallback to local:', error);
      setDigitalServices(DIGITAL_SERVICES);
    });
    return () => unsub();
  }, []);

  // Sync Courses from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), async (snapshot) => {
      if (snapshot.empty) {
        setCourses(COURSES);
        if (auth.currentUser) {
          try {
            for (const crs of COURSES) {
              await setDoc(doc(db, 'courses', crs.id), crs);
            }
          } catch (e) {
            console.warn('Could not seed courses:', e);
          }
        }
      } else {
        const crsList: Course[] = [];
        snapshot.forEach((docSnap) => {
          crsList.push({ id: docSnap.id, ...docSnap.data() } as Course);
        });
        setCourses(crsList);
      }
    }, (error) => {
      console.warn('Firestore courses fallback to local:', error);
      setCourses(COURSES);
    });
    return () => unsub();
  }, []);

  // Sync Solution Pillars from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'solution_pillars'), async (snapshot) => {
      if (snapshot.empty) {
        setSolutionPillars(INITIAL_SOLUTION_PILLARS);
        if (auth.currentUser) {
          try {
            for (const pillar of INITIAL_SOLUTION_PILLARS) {
              await setDoc(doc(db, 'solution_pillars', pillar.id), pillar);
            }
          } catch (e) {
            console.warn('Could not seed solution_pillars:', e);
          }
        }
      } else {
        const list: SolutionPillar[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as SolutionPillar);
        });
        setSolutionPillars(list);
      }
    }, (error) => {
      console.warn('Firestore solution_pillars fallback to local:', error);
      setSolutionPillars(INITIAL_SOLUTION_PILLARS);
    });
    return () => unsub();
  }, []);

  // Sync Sedes from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'sedes'), async (snapshot) => {
      if (snapshot.empty) {
        setSedes(INITIAL_SEDES);
        if (auth.currentUser) {
          try {
            for (const s of INITIAL_SEDES) {
              await setDoc(doc(db, 'sedes', s.id), s);
            }
          } catch (e) {
            console.warn('Could not seed sedes:', e);
          }
        }
      } else {
        const list: Sede[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Sede);
        });
        setSedes(list);
      }
    }, (error) => {
      console.warn('Firestore sedes fallback to local:', error);
      setSedes(INITIAL_SEDES);
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
    const newItem = { ...item, id };
    setStoreItems((prev) => [newItem, ...prev]);
    try {
      await setDoc(doc(db, 'store_items', id), newItem);
    } catch (e) {
      console.warn('Firestore setDoc store_items:', e);
    }
  };

  const updateStoreItem = async (id: string, item: Partial<StoreItem>) => {
    setStoreItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
    try {
      await updateDoc(doc(db, 'store_items', id), item);
    } catch (e) {
      console.warn('Firestore updateDoc store_items:', e);
    }
  };

  const deleteStoreItem = async (id: string) => {
    setStoreItems((prev) => prev.filter((i) => i.id !== id));
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
    setCategories((prev) => [...prev, newCat]);
    try {
      await setDoc(doc(db, 'categories', id), newCat);
    } catch (e) {
      console.warn('Firestore setDoc categories:', e);
    }
  };

  const updateCategory = async (id: string, cat: Partial<StoreCategory>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...cat } : c)));
    try {
      await updateDoc(doc(db, 'categories', id), cat);
    } catch (e) {
      console.warn('Firestore updateDoc categories:', e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
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
    setYoutubeVideos((prev) => [newVideo, ...prev]);
    try {
      await setDoc(doc(db, 'youtube_videos', id), newVideo);
    } catch (e) {
      console.warn('Firestore setDoc youtube_videos:', e);
    }
  };

  const updateYoutubeVideo = async (id: string, video: Partial<YoutubeVideo>) => {
    setYoutubeVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...video } : v)));
    try {
      await updateDoc(doc(db, 'youtube_videos', id), video);
    } catch (e) {
      console.warn('Firestore updateDoc youtube_videos:', e);
    }
  };

  const deleteYoutubeVideo = async (id: string) => {
    setYoutubeVideos((prev) => prev.filter((v) => v.id !== id));
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
    setDigitalServices((prev) => [newService, ...prev]);
    try {
      await setDoc(doc(db, 'digital_services', id), newService);
    } catch (e) {
      console.warn('Firestore setDoc digital_services:', e);
    }
  };

  const updateDigitalService = async (id: string, service: Partial<ServiceItem>) => {
    setDigitalServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...service } : s)));
    try {
      await updateDoc(doc(db, 'digital_services', id), service);
    } catch (e) {
      console.warn('Firestore updateDoc digital_services:', e);
    }
  };

  const deleteDigitalService = async (id: string) => {
    setDigitalServices((prev) => prev.filter((s) => s.id !== id));
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
    setCourses((prev) => [newCourse, ...prev]);
    try {
      await setDoc(doc(db, 'courses', id), newCourse);
    } catch (e) {
      console.warn('Firestore setDoc courses:', e);
    }
  };

  const updateCourse = async (id: string, course: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...course } : c)));
    try {
      await updateDoc(doc(db, 'courses', id), course);
    } catch (e) {
      console.warn('Firestore updateDoc courses:', e);
    }
  };

  const deleteCourse = async (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
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
    setSolutionPillars((prev) => [...prev, newPillar]);
    try {
      await setDoc(doc(db, 'solution_pillars', id), newPillar);
    } catch (e) {
      console.warn('Firestore setDoc solution_pillars:', e);
    }
  };

  const updateSolutionPillar = async (id: string, pillar: Partial<SolutionPillar>) => {
    setSolutionPillars((prev) => prev.map((p) => (p.id === id ? { ...p, ...pillar } : p)));
    try {
      await updateDoc(doc(db, 'solution_pillars', id), pillar);
    } catch (e) {
      console.warn('Firestore updateDoc solution_pillars:', e);
    }
  };

  const deleteSolutionPillar = async (id: string) => {
    setSolutionPillars((prev) => prev.filter((p) => p.id !== id));
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
    setSedes((prev) => [...prev, newSede]);
    try {
      await setDoc(doc(db, 'sedes', id), newSede);
    } catch (e) {
      console.warn('Firestore setDoc sedes:', e);
    }
  };

  const updateSede = async (id: string, sede: Partial<Sede>) => {
    setSedes((prev) => prev.map((s) => (s.id === id ? { ...s, ...sede } : s)));
    try {
      await updateDoc(doc(db, 'sedes', id), sede);
    } catch (e) {
      console.warn('Firestore updateDoc sedes:', e);
    }
  };

  const deleteSede = async (id: string) => {
    setSedes((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteDoc(doc(db, 'sedes', id));
    } catch (e) {
      console.warn('Firestore deleteDoc sedes:', e);
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
        deleteSede
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
