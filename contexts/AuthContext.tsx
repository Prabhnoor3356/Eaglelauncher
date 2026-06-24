import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, OfflineUser } from '@/services/auth.service';

interface AuthContextType {
  user: OfflineUser | null;
  isLoading: boolean;
  error: string | null;
  loginOffline: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<OfflineUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AuthService.getStoredUser();
        setUser(stored);
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const loginOffline = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const u = await AuthService.loginOffline(username);
      setUser(u);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const updateUsername = async (username: string) => {
    const updated = await AuthService.updateUsername(username);
    setUser(updated);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, loginOffline, logout, updateUsername, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
