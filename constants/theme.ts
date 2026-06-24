// Amethyst Launcher Design System
export const Colors = {
  // Base
  background: '#0A0A0F',
  backgroundSecondary: '#12121A',
  backgroundTertiary: '#1A1A28',
  surface: '#1E1E2E',
  surfaceElevated: '#252538',
  surfaceBorder: '#2A2A40',

  // Amethyst Brand
  primary: '#9B59B6',
  primaryLight: '#B07FCC',
  primaryDark: '#7D3C98',
  primaryGlow: 'rgba(155, 89, 182, 0.3)',
  primarySubtle: 'rgba(155, 89, 182, 0.15)',

  // Accent
  accent: '#C39BD3',
  accentSubtle: 'rgba(195, 155, 211, 0.2)',

  // Text
  textPrimary: '#F0F0FF',
  textSecondary: '#A0A0C0',
  textSubtle: '#606080',
  textDisabled: '#404060',
  textOnPrimary: '#FFFFFF',

  // Semantic
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',

  // Dock
  dockBackground: 'rgba(18, 18, 28, 0.92)',
  dockBorder: 'rgba(155, 89, 182, 0.3)',

  // Search
  searchBackground: 'rgba(30, 30, 46, 0.9)',
  searchBorder: 'rgba(155, 89, 182, 0.4)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  full: 999,
};

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const Shadows = {
  small: {
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  glow: {
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
};
