import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { AppItem } from '@/services/apps.service';

interface Props {
  apps: AppItem[];
  onAppPress: (app: AppItem) => void;
  onDrawerOpen: () => void;
}

export const DockBar = memo(function DockBar({ apps, onAppPress, onDrawerOpen }: Props) {
  const content = (
    <View style={styles.inner}>
      <View style={styles.appsRow}>
        {apps.slice(0, 5).map(app => (
          <Pressable
            key={app.id}
            onPress={() => onAppPress(app)}
            style={({ pressed }) => [styles.dockIcon, pressed && styles.pressed]}
          >
            <View style={[styles.iconBg, { backgroundColor: app.color + '22', borderColor: app.color + '55' }]}>
              <Text style={styles.emoji}>{app.icon}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.divider} />
      <Pressable onPress={onDrawerOpen} style={styles.drawerHandle}>
        <View style={styles.handleBar} />
        <Text style={styles.drawerLabel}>All Apps</Text>
      </Pressable>
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        {content}
      </View>
    );
  }

  return <View style={[styles.container, styles.androidBg]}>{content}</View>;
});

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.dockBorder,
    overflow: 'hidden',
    marginHorizontal: Spacing.md,
  },
  androidBg: {
    backgroundColor: Colors.dockBackground,
  },
  inner: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  appsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dockIcon: {
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  emoji: {
    fontSize: 26,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  drawerHandle: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    opacity: 0.7,
    marginBottom: 4,
  },
  drawerLabel: {
    color: Colors.textSubtle,
    fontSize: 11,
    fontWeight: '500',
  },
});
