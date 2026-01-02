import TestFirebase from "./components/TestFirebase";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserRole, User, AuthState, Task, Article, DiseaseProtocol } from './types';

// --- Pages ---
import Landing from './pages/Landing';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import AdminLogin from './pages/AdminLogin';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserTasks from './pages/user/UserTasks';
import UserDiseases from './pages/user/UserDiseases';
import UserHistory from './pages/user/UserHistory';
import UserProfile from './pages/user/UserProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTasks from './pages/admin/AdminTasks';
import AdminDiseases from './pages/admin/AdminDiseases';
import AdminProfile from './pages/admin/AdminProfile';

// --- Mock Initial Data ---
const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Metformin 500mg', time: '8:00 AM', category: 'Morning', completed: false, icon: 'pill', color: 'bg-emerald-500/10 text-emerald-400', condition: 'Diabetes Type 2', conditionColor: 'text-sky-400 bg-sky-400/10' },
  { id: 2, title: 'Blood Pressure', time: '9:00 AM', category: 'Morning', completed: false, icon: 'monitor_heart', color: 'bg-rose-500/10 text-rose-400', condition: 'Hypertension', conditionColor: 'text-rose-400 bg-rose-400/10' },
  { id: 4, title: 'Light Walk', time: '5:30 PM', category: 'Afternoon', completed: false, icon: 'fitness_center', color: 'bg-amber-500/10 text-amber-400', condition: 'Diabetes Type 2', conditionColor: 'text-sky-400 bg-sky-400/10' },
];

const INITIAL_ARTICLES: Article[] = [
  { id: 1, title: 'Managing Spikes: A Guide', description: 'Quick tips for sugar management.', causes: 'High carb intake, lack of exercise.', remedies: 'Hydration, portion control.', target: 'Diabetes Type 2', updated: '2h ago', status: 'Published', views: '1.2k', icon: 'article' },
  { id: 2, title: 'The Hidden Salt in Foods', description: 'Sodium tracking basics.', causes: 'Processed snacks, canned goods.', remedies: 'Fresh herbs, dash diet.', target: 'Hypertension', updated: 'yesterday', status: 'Published', views: '840', icon: 'nutrition' },
];

const INITIAL_PROTOCOLS: DiseaseProtocol[] = [
  { id: 1, name: 'Diabetes Type 2', taskCount: 3, status: 'Active', severity: 'Medium', tasks: ['Blood Sugar Log', 'Insulin Dosage', 'Carb Intake Monitor'] },
  { id: 2, name: 'Hypertension', taskCount: 4, status: 'Active', severity: 'High', tasks: ['Morning BP Check', 'Sodium Tracking', 'Evening BP Check', 'Weight Log'] },
];

// --- Context & Auth ---
interface AuthContextType extends AuthState {
  tasks: Task[];
  articles: Article[];
  masterDiseases: DiseaseProtocol[];
  login: (email: string, role: UserRole, name?: string) => void;
  logout: () => void;
  toggleDisease: (diseaseName: string) => void;
  toggleTask: (taskId: number) => void;
  addArticle: (article: Omit<Article, 'id' | 'updated' | 'views'>) => void;
  addDisease: (disease: Omit<DiseaseProtocol, 'id' | 'taskCount' | 'status'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [masterDiseases, setMasterDiseases] = useState<DiseaseProtocol[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('health_app_user');
    const storedTasks = localStorage.getItem('health_app_tasks');
    const storedArticles = localStorage.getItem('health_app_articles');
    const storedDiseases = localStorage.getItem('health_app_diseases');
    
    if (storedUser) setState({ user: JSON.parse(storedUser), isAuthenticated: true, isLoading: false });
    else setState(prev => ({ ...prev, isLoading: false }));

    setTasks(storedTasks ? JSON.parse(storedTasks) : INITIAL_TASKS);
    setArticles(storedArticles ? JSON.parse(storedArticles) : INITIAL_ARTICLES);
    setMasterDiseases(storedDiseases ? JSON.parse(storedDiseases) : INITIAL_PROTOCOLS);
  }, []);

  useEffect(() => { if (tasks.length > 0) localStorage.setItem('health_app_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { if (articles.length > 0) localStorage.setItem('health_app_articles', JSON.stringify(articles)); }, [articles]);
  useEffect(() => { if (masterDiseases.length > 0) localStorage.setItem('health_app_diseases', JSON.stringify(masterDiseases)); }, [masterDiseases]);

  const login = (email: string, role: UserRole, name?: string) => {
    const mockUser: User = {
      id: role === UserRole.ADMIN ? 'admin-1' : 'user-1',
      email,
      name: name || (role === UserRole.ADMIN ? 'Sarah Admin' : 'Alex Patient'),
      role,
      avatar: role === UserRole.ADMIN 
        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBq1z3OBxcsWXUVj_wyE0w0wqBpbdjnqRNkRgE2uGXE9hX8ftN_FVgtmDP2erZr4rsOOE_Bf-uTWHCGQrTcbA05qLN2xojSomTsr5ZBH6lfzSkfKLJE55iCX4pmbvxfoURI8UvbFYboj2vleFjPNB3XI1FzozFeWx8AoSK_3B2TFfY9edxqCtCWENY_f9FCF71MKqaQFAFi_3qC3asKpaoDK-UsXiK7A0rPKMsCHFI7J-vg5VruUNmakVmHdKP9f1RSk4PWZsLh6pU"
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuC1IFmfDUFEShcmoj3g2rrCwgRjmdnJUz2JjRt0gyaw35thCY4-pOb91J7UYn8-nevG6I0xGMeHB6hePLLMp04VfVZLjsTBxEPXl3zrWhncFpSfWkDf3NZJZHFFUH-RsRohMRL882mAdJ21EC35WUXtGz85M6qWuHVMvhTPdAHWPZYqmHyDl4kgYDaVlVCGrq3p17YiKrkurhpvgr2Iln6MIxnMcNwsttKUIT4jmosZZwq7igQFRq6v5leA7oKGuPQxTBdxzCinod8",
      registeredDiseases: role === UserRole.USER ? ['Diabetes Type 2'] : [],
      metrics: { heartRate: 72, weight: 165 }
    };
    localStorage.setItem('health_app_user', JSON.stringify(mockUser));
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('health_app_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const toggleDisease = (diseaseName: string) => {
    if (!state.user) return;
    const currentList = state.user.registeredDiseases || [];
    const newList = currentList.includes(diseaseName) ? currentList.filter(d => d !== diseaseName) : [...currentList, diseaseName];
    const updatedUser = { ...state.user, registeredDiseases: newList };
    localStorage.setItem('health_app_user', JSON.stringify(updatedUser));
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const addArticle = (article: Omit<Article, 'id' | 'updated' | 'views'>) => {
    const newArt: Article = {
      ...article,
      id: Date.now(),
      updated: 'Just now',
      views: '0'
    };
    setArticles(prev => [newArt, ...prev]);
  };

  const addDisease = (disease: Omit<DiseaseProtocol, 'id' | 'taskCount' | 'status'>) => {
    const newDis: DiseaseProtocol = {
      ...disease,
      id: Date.now(),
      taskCount: disease.tasks.length,
      status: 'Active'
    };
    setMasterDiseases(prev => [newDis, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ ...state, tasks, articles, masterDiseases, login, logout, toggleDisease, toggleTask, addArticle, addDisease }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Guard Components ---
const ProtectedRoute: React.FC<{ children: React.ReactNode, allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={user.role === UserRole.ADMIN ? "/admin" : "/user"} replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user" element={<ProtectedRoute allowedRoles={[UserRole.USER]}><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/tasks" element={<ProtectedRoute allowedRoles={[UserRole.USER]}><UserTasks /></ProtectedRoute>} />
          <Route path="/user/diseases" element={<ProtectedRoute allowedRoles={[UserRole.USER]}><UserDiseases /></ProtectedRoute>} />
          <Route path="/user/history" element={<ProtectedRoute allowedRoles={[UserRole.USER]}><UserHistory /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute allowedRoles={[UserRole.USER]}><UserProfile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/tasks" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminTasks /></ProtectedRoute>} />
          <Route path="/admin/diseases" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminDiseases /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminProfile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
  path="/admin/test-firebase"
  element={
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <TestFirebase />
    </ProtectedRoute>
  }
/>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
