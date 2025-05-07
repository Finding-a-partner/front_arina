import { Friend, FriendsResponse } from '../types';
import { getCurrentUserId } from '../utils/jwt';


const API_BASE_URL = 'http://localhost:8000/users'; // Замените на ваш API URL

const friendsApi = {
  /**
   * Получает список друзей пользователя
   */
  getFriends: async (): Promise<FriendsResponse[]> => {
    try {
      const userId = getCurrentUserId();
      const status = 'ACCEPTED'; 
      const url = new URL(`${API_BASE_URL}/friends/${userId}`);
      url.searchParams.append('status', status);
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении списка друзей:', error);
      throw error;
    }
  },

  /**
   * Добавляет пользователя в друзья
   */
  addFriend: async (friendId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/friends/${friendId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении в друзья:', error);
      throw error;
    }
  },

  /**
   * Удаляет пользователя из друзей
   */
  removeFriend: async (friendId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/friends/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении из друзей:', error);
      throw error;
    }
  }
};

export default friendsApi;