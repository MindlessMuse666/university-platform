import { apiClient } from '../api';
import type { AuthResponse } from '@/types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', { email, password, name });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};