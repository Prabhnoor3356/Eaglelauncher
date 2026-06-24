import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useLauncher } from '@/hooks/useLauncher';
import { useMouseSideButton } from '@/hooks/useMouseSideButton';
import { Colors, Spacing } from '@/constants/theme';
import { AppItem } from '@/services/apps.service';
import {
  ClockWidget,
  DockBar,
  AppDrawer,
  AppContextMenu,
} from '@/components';

export default function HomeScreen() {
  const { dockApps, recentApps, toggleFavorite, toggleHidden } = useLauncher();
  const { showAlert } = useAlert();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contextApp, setContextApp] = useState<AppItem | null>(null);
  const [contextVisible, setContextVisible] = useState(false);

  // Mouse side button: back closes drawer
  useMouseSideButton({
    onBack: () => {
      if (drawerOpen) setDrawerOpen(false);
    },
    enabled: true,
  });

  const handleAppPress = useCallback((app: AppItem) => {
    showAlert(app.name, `Opening ${app.name}...\n(App launching coming soon)`, [
      { text: 'OK', style: 'default' },
    ]);
  }, [showAlert]);

  const handleAppLongPress = useCallback((app: AppItem) => {
    setContextApp(app);
    setContextVisible(true);
  }, []);

  const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Wallpaper gradient */}
      <LinearGradient
        colors={[Colors.background, '#0D0D1F', '#0A0A15']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Ambient glow */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Text style={styles.topTitle}>💎</Text>
          </View>
          <Text style={styles.topBrand}>Amethyst</Text>
          <Pressable
            style={styles.topRight}
            onPress={() => showAlert('Mouse Input', 'Side buttons (Back/Forward) are active.\nBack = close drawer\nForward = open drawer')}
          >
            <MaterialIcons name="mouse" size={20} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Clock */}
        <ClockWidget />

        {/* Recent apps strip */}
        {recentApps.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionLabel}>RECENT</Text>
            <View style={styles.recentRow}>
              {recentApps.slice(0, 8).map(app => (
                <Pressable
                  key={app.id}
                  onPress={() => handleAppPress(app)}
                  onLongPress={() => handleAppLongPress(app)}
                  style={({ pressed }) => [styles.recentIcon, pressed && styles.pressed]}
                >
                  <View style={[styles.recentBg, { backgroundColor: app.color + '22', borderColor: app.color + '44' }]}>
                    <Text style={styles.recentEmoji}>{app.icon}</Text>
                  </View>
                  <Text style={styles.recentLabel} numberOfLines={1}>{app.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.flex} />

        {/* Dock */}
        <View style={styles.dockWrapper}>
          <DockBar
            apps={dockApps}
            onAppPress={handleAppPress}
            onDrawerOpen={handleOpenDrawer}
          />
        </View>
      </SafeAreaView>

      {/* App Drawer */}
      <AppDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onAppPress={handleAppPress}
      />

      {/* Context Menu */}
      <AppContextMenu
        app={contextApp}
        visible={contextVisible}
        onClose={() => setContextVisible(false)}
        onToggleFavorite={toggleFavorite}
        onHide={app => {
          toggleHidden(app.id);
          showAlert('Hidden', `${app.name} hidden from launcher`);
        }}
        onInfo={app => {
          showAlert('App Info', `Name: ${app.name}\nPackage: ${app.packageName}\nCategory: ${app.category}\nUsed: ${app.useCount} times`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  flex: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  topLeft: { width: 40 },
  topRight: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primarySubtle,
  },
  topTitle: { fontSize: 22 },
  topBrand: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  recentSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    color: Colors.textSubtle,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  recentIcon: {
    width: 68,
    alignItems: 'center',
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.92 }] },
  recentBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  recentEmoji: { fontSize: 26 },
  recentLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
    width: 64,
  },

  dockWrapper: {
    paddingBottom: Spacing.md,
  },

  glowTop: {
    position: 'absolute',
    top: -100,
    left: '20%',
    right: '20%',
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primaryGlow,
    transform: [{ scaleX: 2 }],
  },
  glowBottom: {
    position: 'absolute',
    bottom: 80,
    left: '10%',
    right: '10%',
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(155,89,182,0.1)',
    transform: [{ scaleX: 1.5 }],
  },
});
