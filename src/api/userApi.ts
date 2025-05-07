// src/api/userApi.ts
import { getCurrentUserId } from '../utils/jwt';

const API_BASE_URL = 'http://localhost:8000/users';

const makeRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Request failed');
  }

  return response.json();
};

export const userApi = {
  getCurrentUser: async (): Promise<any> => {
    try {
      const userId = getCurrentUserId(); // Используем импортированную функцию
      return await makeRequest(`/${userId}`);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  },
  
  updateCurrentUser: async (data: any): Promise<any> => {
    try {
      const userId = getCurrentUserId();
      return await makeRequest(`/${userId}`, 'PUT', data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }
};