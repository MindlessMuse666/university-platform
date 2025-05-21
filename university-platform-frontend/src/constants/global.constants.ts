// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (slug: string) => `/courses/${slug}`,
  },
} as const;

// Image paths
export const IMAGES = {
  COURSES: {
    DEFAULT: '/images/default_course_image.jpeg',
  },
  BRAND: {
    LOGO: '/images/university_platform.jpeg',
    FAVICON: '/university_platform.ico',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: (slug: string) => `/courses/${slug}`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TEACHERS: '/teachers',
  STUDENTS: '/students',
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { name: 'Главная', href: ROUTES.HOME },
  { name: 'Курсы', href: ROUTES.COURSES },
  { name: 'Преподаватели', href: ROUTES.TEACHERS },
  { name: 'Студенты', href: ROUTES.STUDENTS },
] as const;

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

// Query configuration
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  RETRY_ATTEMPTS: 1,
} as const; 