import axios from 'axios';
import type { Course } from '@/types/course';

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Добавляем перехватчик для логирования всех запросов
api.interceptors.request.use(
  (config) => {
    console.log('[Courses API] Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('[Courses API] Request Error:', error);
    return Promise.reject(error);
  }
);

// Добавляем перехватчик для логирования всех ответов
api.interceptors.response.use(
  (response) => {
    console.log('[Courses API] Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: {
        url: response.config.url,
        method: response.config.method,
        baseURL: response.config.baseURL,
      },
    });
    return response;
  },
  (error) => {
    console.error('[Courses API] Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL,
      } : null,
    });
    return Promise.reject(error);
  }
);

export const getCourses = async (): Promise<Course[]> => {
  try {
    const { data } = await api.get<PaginatedResponse<Course>>('/courses');
    return data.items || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  try {
    const { data } = await api.get<Course>(`/courses/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

export const createCourse = async (courseData: {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
}) => {
  return api.post<Course>('/courses', courseData);
};