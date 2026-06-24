import { useContext } from 'react';
import { LauncherContext } from '@/contexts/LauncherContext';

export function useLauncher() {
  const ctx = useContext(LauncherContext);
  if (!ctx) throw new Error('useLauncher must be used within LauncherProvider');
  return ctx;
}
