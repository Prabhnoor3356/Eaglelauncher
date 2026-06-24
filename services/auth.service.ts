import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/config';

export interface OfflineUser {
  id: string;
  username: string;
  avatar?: string;
  createdAt: string;
  isOffline: true;
}

export interface AuthState {
  user: OfflineUser | null;
  isLoading: boolean;
  error: string | null;
}

const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export const AuthService = {
  async loginOffline(username: string): Promise<OfflineUser> {
    if (!username.trim()) throw new Error('Username is required');
    if (username.trim().length < 2) throw new Error('Username must be at least 2 characters');

    const user: OfflineUser = {
      id: generateId(),
      username: username.trim(),
      createdAt: new Date().toISOString(),
      isOffline: true,
    };

    await AsyncStorage.setItem(STORAGE_KEYS.offlineUser, JSON.stringify(user));
    return user;
  },

  async getStoredUser(): Promise<OfflineUser | null> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.offlineUser);
    if (!raw) return null;
    return JSON.parse(raw) as OfflineUser;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.offlineUser);
  },

  async updateUsername(username: string): Promise<OfflineUser> {
    const existing = await AuthService.getStoredUser();
    if (!existing) throw new Error('No user logged in');

    const updated: OfflineUser = { ...existing, username: username.trim() };
    await AsyncStorage.setItem(STORAGE_KEYS.offlineUser, JSON.stringify(updated));
    return updated;
  },
};
