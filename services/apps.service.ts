import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/config';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  icon: string; // emoji as icon placeholder
  category: string;
  color: string;
  isFavorite: boolean;
  isHidden: boolean;
  lastUsed?: string;
  useCount: number;
}

// Mock app list simulating installed apps
const MOCK_APPS: AppItem[] = [
  { id: '1', name: 'Messages', packageName: 'com.messages', icon: '💬', category: 'Social', color: '#2ECC71', isFavorite: true, isHidden: false, useCount: 42 },
  { id: '2', name: 'Phone', packageName: 'com.phone', icon: '📞', category: 'Tools', color: '#3498DB', isFavorite: true, isHidden: false, useCount: 38 },
  { id: '3', name: 'Camera', packageName: 'com.camera', icon: '📷', category: 'Media', color: '#9B59B6', isFavorite: true, isHidden: false, useCount: 25 },
  { id: '4', name: 'Gallery', packageName: 'com.gallery', icon: '🖼️', category: 'Media', color: '#E91E8C', isFavorite: false, isHidden: false, useCount: 20 },
  { id: '5', name: 'Settings', packageName: 'com.settings', icon: '⚙️', category: 'Tools', color: '#607D8B', isFavorite: true, isHidden: false, useCount: 15 },
  { id: '6', name: 'Browser', packageName: 'com.browser', icon: '🌐', category: 'Tools', color: '#FF5722', isFavorite: false, isHidden: false, useCount: 30 },
  { id: '7', name: 'Maps', packageName: 'com.maps', icon: '🗺️', category: 'Tools', color: '#4CAF50', isFavorite: false, isHidden: false, useCount: 12 },
  { id: '8', name: 'Music', packageName: 'com.music', icon: '🎵', category: 'Media', color: '#FF9800', isFavorite: false, isHidden: false, useCount: 35 },
  { id: '9', name: 'YouTube', packageName: 'com.youtube', icon: '▶️', category: 'Media', color: '#FF0000', isFavorite: false, isHidden: false, useCount: 50 },
  { id: '10', name: 'Instagram', packageName: 'com.instagram', icon: '📸', category: 'Social', color: '#C13584', isFavorite: false, isHidden: false, useCount: 45 },
  { id: '11', name: 'Twitter', packageName: 'com.twitter', icon: '🐦', category: 'Social', color: '#1DA1F2', isFavorite: false, isHidden: false, useCount: 28 },
  { id: '12', name: 'Discord', packageName: 'com.discord', icon: '🎮', category: 'Social', color: '#5865F2', isFavorite: false, isHidden: false, useCount: 40 },
  { id: '13', name: 'Spotify', packageName: 'com.spotify', icon: '🎧', category: 'Media', color: '#1DB954', isFavorite: false, isHidden: false, useCount: 33 },
  { id: '14', name: 'Netflix', packageName: 'com.netflix', icon: '🎬', category: 'Media', color: '#E50914', isFavorite: false, isHidden: false, useCount: 18 },
  { id: '15', name: 'Calculator', packageName: 'com.calculator', icon: '🔢', category: 'Tools', color: '#795548', isFavorite: false, isHidden: false, useCount: 8 },
  { id: '16', name: 'Calendar', packageName: 'com.calendar', icon: '📅', category: 'Productivity', color: '#2196F3', isFavorite: false, isHidden: false, useCount: 10 },
  { id: '17', name: 'Notes', packageName: 'com.notes', icon: '📝', category: 'Productivity', color: '#FFC107', isFavorite: false, isHidden: false, useCount: 22 },
  { id: '18', name: 'Clock', packageName: 'com.clock', icon: '⏰', category: 'Tools', color: '#009688', isFavorite: false, isHidden: false, useCount: 6 },
  { id: '19', name: 'Contacts', packageName: 'com.contacts', icon: '👤', category: 'Tools', color: '#3F51B5', isFavorite: false, isHidden: false, useCount: 14 },
  { id: '20', name: 'Files', packageName: 'com.files', icon: '📁', category: 'Tools', color: '#FF7043', isFavorite: false, isHidden: false, useCount: 9 },
  { id: '21', name: 'Minecraft', packageName: 'com.minecraft', icon: '⛏️', category: 'Games', color: '#8BC34A', isFavorite: false, isHidden: false, useCount: 60 },
  { id: '22', name: 'PUBG', packageName: 'com.pubg', icon: '🔫', category: 'Games', color: '#F57F17', isFavorite: false, isHidden: false, useCount: 55 },
  { id: '23', name: 'Chess', packageName: 'com.chess', icon: '♟️', category: 'Games', color: '#424242', isFavorite: false, isHidden: false, useCount: 20 },
  { id: '24', name: 'Wallet', packageName: 'com.wallet', icon: '💳', category: 'Finance', color: '#26A69A', isFavorite: false, isHidden: false, useCount: 7 },
  { id: '25', name: 'Bank', packageName: 'com.bank', icon: '🏦', category: 'Finance', color: '#1565C0', isFavorite: false, isHidden: false, useCount: 5 },
  { id: '26', name: 'Fitness', packageName: 'com.fitness', icon: '💪', category: 'Health', color: '#F44336', isFavorite: false, isHidden: false, useCount: 11 },
  { id: '27', name: 'Meditate', packageName: 'com.meditate', icon: '🧘', category: 'Health', color: '#7E57C2', isFavorite: false, isHidden: false, useCount: 4 },
  { id: '28', name: 'Slack', packageName: 'com.slack', icon: '💼', category: 'Productivity', color: '#4A154B', isFavorite: false, isHidden: false, useCount: 16 },
  { id: '29', name: 'Notion', packageName: 'com.notion', icon: '📓', category: 'Productivity', color: '#000000', isFavorite: false, isHidden: false, useCount: 19 },
  { id: '30', name: 'Zoom', packageName: 'com.zoom', icon: '📹', category: 'Productivity', color: '#2D8CFF', isFavorite: false, isHidden: false, useCount: 13 },
];

export const AppsService = {
  async getAllApps(): Promise<AppItem[]> {
    const hiddenRaw = await AsyncStorage.getItem(STORAGE_KEYS.hiddenApps);
    const favRaw = await AsyncStorage.getItem(STORAGE_KEYS.favorites);
    const hidden: string[] = hiddenRaw ? JSON.parse(hiddenRaw) : [];
    const favs: string[] = favRaw ? JSON.parse(favRaw) : ['1', '2', '3', '5'];

    return MOCK_APPS.map(app => ({
      ...app,
      isHidden: hidden.includes(app.id),
      isFavorite: favs.includes(app.id),
    }));
  },

  async toggleFavorite(appId: string): Promise<void> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.favorites);
    const favs: string[] = raw ? JSON.parse(raw) : [];
    const updated = favs.includes(appId)
      ? favs.filter(id => id !== appId)
      : [...favs, appId];
    await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(updated));
  },

  async toggleHidden(appId: string): Promise<void> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.hiddenApps);
    const hidden: string[] = raw ? JSON.parse(raw) : [];
    const updated = hidden.includes(appId)
      ? hidden.filter(id => id !== appId)
      : [...hidden, appId];
    await AsyncStorage.setItem(STORAGE_KEYS.hiddenApps, JSON.stringify(updated));
  },

  async getDockApps(allApps: AppItem[]): Promise<AppItem[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.dockApps);
    const dockIds: string[] = raw ? JSON.parse(raw) : ['2', '1', '3', '6', '5'];
    return dockIds
      .map(id => allApps.find(a => a.id === id))
      .filter(Boolean) as AppItem[];
  },

  async saveDockApps(appIds: string[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.dockApps, JSON.stringify(appIds));
  },

  getRecent(apps: AppItem[], count = 8): AppItem[] {
    return [...apps]
      .sort((a, b) => b.useCount - a.useCount)
      .filter(a => !a.isHidden)
      .slice(0, count);
  },

  searchApps(apps: AppItem[], query: string): AppItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return apps;
    return apps.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  },
};
