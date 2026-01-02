
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface Task {
  id: number;
  title: string;
  time: string;
  category: string;
  completed: boolean;
  icon: string;
  color: string;
  condition: string;
  conditionColor: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  causes: string;
  remedies: string;
  target: string;
  updated: string;
  status: 'Published' | 'Draft';
  views: string;
  icon: string;
}

export interface DiseaseProtocol {
  id: number;
  name: string;
  taskCount: number;
  status: string;
  severity: string;
  tasks: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  registeredDiseases?: string[];
  metrics?: {
    heartRate: number;
    weight: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
