import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography, Shadows } from '@/constants/theme';
import { AppItem } from '@/services/apps.service';

interface Action {
  icon: string;
  label: string;
  color?: string;
  onPress: () => void;
}

interface Props {
  app: AppItem | null;
  visible: boolean;
  onClose: () => void;
  onToggleFavorite: (app: AppItem) => void;
  onHide: (app: AppItem) => void;
  onInfo: (app: AppItem) => void;
}

export const AppContextMenu = memo(function AppContextMenu({
  app,
  visible,
  onClose,
  onToggleFavorite,
  onHide,
  onInfo,
}: Props) {
  if (!app) return null;

  const actions: Action[] = [
    {
      icon: app.isFavorite ? 'star' : 'star-border',
      label: app.isFavorite ? 'Remove from favorites' : 'Add to favorites',
      color: Colors.warning,
      onPress: () => { onToggleFavorite(app); onClose(); },
    },
    {
      icon: 'visibility-off',
      label: 'Hide app',
      onPress: () => { onHide(app); onClose(); },
    },
    {
      icon: 'info-outline',
      label: 'App info',
      onPress: () => { onInfo(app); onClose(); },
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View entering={ZoomIn.duration(180)} exiting={ZoomOut.duration(130)} style={styles.menu}>
        {/* App header */}
        <View style={styles.appHeader}>
          <View style={[styles.iconBg, { backgroundColor: app.color + '22', borderColor: app.color + '44' }]}>
            <Text style={styles.emoji}>{app.icon}</Text>
          </View>
          <View>
            <Text style={styles.appName}>{app.name}</Text>
            <Text style={styles.appPkg}>{app.packageName}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {actions.map((action, i) => (
          <Pressable
            key={i}
            onPress={action.onPress}
            style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
          >
            <MaterialIcons
              name={action.icon as any}
              size={22}
              color={action.color ?? Colors.textSecondary}
            />
            <Text style={[styles.actionLabel, action.color ? { color: action.color } : {}]}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  menu: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: '30%',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  emoji: { fontSize: 26 },
  appName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
  },
  appPkg: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceBorder,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  actionPressed: {
    backgroundColor: Colors.primarySubtle,
  },
  actionLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
  },
});
