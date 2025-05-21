// Course types
export interface Course {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  modules?: Module[];
}

export interface Lesson {
  id: number;
  title: string;
  content?: string;
  order: number;
  videoUrl?: string;
}

export interface Module {
  id: number;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

// User types
export interface User {
  id: number;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Component props types
export interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  published?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 