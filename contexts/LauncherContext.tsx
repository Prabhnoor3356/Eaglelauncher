import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppItem, AppsService } from '@/services/apps.service';

interface LauncherContextType {
  apps: AppItem[];
  dockApps: AppItem[];
  recentApps: AppItem[];
  searchQuery: string;
  searchResults: AppItem[];
  activeCategory: string;
  isSearching: boolean;
  isLoading: boolean;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: string) => void;
  toggleFavorite: (id: string) => Promise<void>;
  toggleHidden: (id: string) => Promise<void>;
  refreshApps: () => Promise<void>;
  getAppsByCategory: (cat: string) => AppItem[];
}

export const LauncherContext = createContext<LauncherContextType | undefined>(undefined);

export function LauncherProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [dockApps, setDockApps] = useState<AppItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const loadApps = useCallback(async () => {
    setIsLoading(true);
    try {
      const all = await AppsService.getAllApps();
      const dock = await AppsService.getDockApps(all);
      setApps(all);
      setDockApps(dock);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  const visibleApps = apps.filter(a => !a.isHidden);
  const recentApps = AppsService.getRecent(visibleApps, 8);
  const searchResults = searchQuery
    ? AppsService.searchApps(visibleApps, searchQuery)
    : [];
  const isSearching = searchQuery.length > 0;

  const getAppsByCategory = (cat: string) => {
    if (cat === 'All') return visibleApps;
    return visibleApps.filter(a => a.category === cat);
  };

  const toggleFavorite = async (id: string) => {
    await AppsService.toggleFavorite(id);
    await loadApps();
  };

  const toggleHidden = async (id: string) => {
    await AppsService.toggleHidden(id);
    await loadApps();
  };

  return (
    <LauncherContext.Provider
      value={{
        apps: visibleApps,
        dockApps,
        recentApps,
        searchQuery,
        searchResults,
        activeCategory,
        isSearching,
        isLoading,
        setSearchQuery,
        setActiveCategory,
        toggleFavorite,
        toggleHidden,
        refreshApps: loadApps,
        getAppsByCategory,
      }}
    >
      {children}
    </LauncherContext.Provider>
  );
}
