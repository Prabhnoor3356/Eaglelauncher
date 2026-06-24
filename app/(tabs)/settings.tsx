import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Radius, Typography, Shadows } from '@/constants/theme';

interface SettingRow {
  icon: string;
  label: string;
  subtitle?: string;
  type: 'arrow' | 'toggle' | 'info';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (val: boolean) => void;
  color?: string;
}

export default function SettingsScreen() {
  const { user, logout, updateUsername } = useAuth();
  const [haptics, setHaptics] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [gestureNav, setGestureNav] = useState(true);
  const [mouseButtons, setMouseButtons] = useState(true);
  const [hideLabels, setHideLabels] = useState(false);
  const [largeIcons, setLargeIcons] = useState(false);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure? This will clear your offline account.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  const sections: { title: string; rows: SettingRow[] }[] = [
    {
      title: 'Account',
      rows: [
        {
          icon: 'person',
          label: 'Username',
          subtitle: user?.username ?? 'Not logged in',
          type: 'arrow',
          onPress: () => Alert.alert('Edit Username', 'Feature coming soon'),
        },
        {
          icon: 'wifi-off',
          label: 'Account Mode',
          subtitle: 'Offline — no cloud sync',
          type: 'info',
          color: Colors.success,
        },
      ],
    },
    {
      title: 'Performance',
      rows: [
        {
          icon: 'animation',
          label: 'Smooth Animations',
          subtitle: 'Reanimated 3 powered',
          type: 'toggle',
          value: animations,
          onToggle: setAnimations,
        },
        {
          icon: 'speed',
          label: 'Haptic Feedback',
          type: 'toggle',
          value: haptics,
          onToggle: setHaptics,
        },
      ],
    },
    {
      title: 'Input',
      rows: [
        {
          icon: 'gesture',
          label: 'Gesture Navigation',
          subtitle: 'Swipe up for drawer',
          type: 'toggle',
          value: gestureNav,
          onToggle: setGestureNav,
        },
        {
          icon: 'mouse',
          label: 'Mouse Side Buttons',
          subtitle: 'Back/Forward button support',
          type: 'toggle',
          value: mouseButtons,
          onToggle: setMouseButtons,
        },
      ],
    },
    {
      title: 'Appearance',
      rows: [
        {
          icon: 'label-off',
          label: 'Hide App Labels',
          type: 'toggle',
          value: hideLabels,
          onToggle: setHideLabels,
        },
        {
          icon: 'zoom-in',
          label: 'Large Icons',
          type: 'toggle',
          value: largeIcons,
          onToggle: setLargeIcons,
        },
        {
          icon: 'palette',
          label: 'Theme & Wallpaper',
          subtitle: 'Amethyst Dark',
          type: 'arrow',
          onPress: () => Alert.alert('Themes', 'Custom theme packs coming soon'),
        },
        {
          icon: 'grid-view',
          label: 'Grid Size',
          subtitle: '4 columns (default)',
          type: 'arrow',
          onPress: () => Alert.alert('Grid Size', '3, 4, or 5 column options coming soon'),
        },
      ],
    },
    {
      title: 'Launcher',
      rows: [
        {
          icon: 'apps',
          label: 'Default Launcher',
          subtitle: 'Set as home launcher',
          type: 'arrow',
          onPress: () => Alert.alert('Default Launcher', 'Go to System Settings > Apps > Default Apps to set Amethyst as your launcher'),
        },
        {
          icon: 'backup',
          label: 'Backup Layout',
          type: 'arrow',
          onPress: () => Alert.alert('Backup', 'Layout backup coming soon'),
        },
      ],
    },
    {
      title: 'About',
      rows: [
        {
          icon: 'info',
          label: 'Version',
          subtitle: '1.0.0 — Open Source',
          type: 'info',
        },
        {
          icon: 'code',
          label: 'Open Source',
          subtitle: 'MIT License',
          type: 'arrow',
          onPress: () => Alert.alert('Open Source', 'This is a free and open source launcher.\nFork it and make it your own!'),
        },
        {
          icon: 'logout',
          label: 'Log Out',
          type: 'arrow',
          color: Colors.error,
          onPress: handleLogout,
        },
      ],
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.userChip}>
              <Text style={styles.userEmoji}>💎</Text>
              <Text style={styles.userName}>{user?.username ?? 'Guest'}</Text>
            </View>
          </View>

          {sections.map((section, si) => (
            <Animated.View
              key={section.title}
              entering={FadeInDown.delay(si * 60).duration(400)}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.card}>
                {section.rows.map((row, ri) => (
                  <React.Fragment key={row.label}>
                    <Pressable
                      onPress={row.onPress}
                      disabled={row.type !== 'arrow'}
                      style={({ pressed }) => [
                        styles.row,
                        pressed && row.type === 'arrow' && styles.rowPressed,
                      ]}
                    >
                      <View style={[styles.rowIcon, { backgroundColor: (row.color ?? Colors.primary) + '20' }]}>
                        <MaterialIcons
                          name={row.icon as any}
                          size={20}
                          color={row.color ?? Colors.primary}
                        />
                      </View>
                      <View style={styles.rowContent}>
                        <Text style={[styles.rowLabel, row.color ? { color: row.color } : {}]}>
                          {row.label}
                        </Text>
                        {row.subtitle ? (
                          <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
                        ) : null}
                      </View>
                      {row.type === 'toggle' && (
                        <Switch
                          value={row.value}
                          onValueChange={row.onToggle}
                          trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
                          thumbColor={row.value ? Colors.primaryLight : Colors.textSubtle}
                        />
                      )}
                      {row.type === 'arrow' && (
                        <MaterialIcons name="chevron-right" size={20} color={Colors.textSubtle} />
                      )}
                    </Pressable>
                    {ri < section.rows.length - 1 && <View style={styles.divider} />}
                  </React.Fragment>
                ))}
              </View>
            </Animated.View>
          ))}

          <Text style={styles.footer}>Amethyst Launcher — Open Source</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.md, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primarySubtle,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dockBorder,
  },
  userEmoji: { fontSize: 16 },
  userName: {
    color: Colors.primaryLight,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  section: { marginBottom: Spacing.lg },
  sectionTitle: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  rowPressed: { backgroundColor: Colors.primarySubtle },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: { flex: 1 },
  rowLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
  },
  rowSubtitle: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
    marginLeft: 68,
  },
  footer: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.xs,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});
