import axios from 'axios';
import { API_CONFIG } from '@/constants/global.constants';
import type { ApiResponse, PaginatedResponse } from '@/types';

// Создаем экземпляр axios с относительным baseURL
const apiClient = axios.create({
  baseURL: '', // Используем относительные пути
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('[API] Client initialized with config:', {
  baseURL: apiClient.defaults.baseURL,
  headers: apiClient.defaults.headers,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const fullURL = `${config.baseURL}${config.url}`;
    console.log('[API] Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });
    
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', {
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
    console.error('[API] Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL,
      } : null,
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const api = {
  get: async <T>(url: string, params?: Record<string, unknown>) => {
    console.log('apiClient.get called:', {
      url,
      params,
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}${url}`,
    });
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },
  
  post: async <T>(url: string, data: unknown) => {
    console.log('apiClient.post called:', { url, data });
    const response = await apiClient.post<T>(url, data);
    return response.data;
  },
  
  put: async <T>(url: string, data: unknown) => {
    console.log('apiClient.put called:', { url, data });
    const response = await apiClient.put<T>(url, data);
    return response.data;
  },
  
  delete: async <T>(url: string) => {
    console.log('apiClient.delete called:', { url });
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};

export { apiClient }; 