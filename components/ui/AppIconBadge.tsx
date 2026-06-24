import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, Radius, Spacing } from '@/constants/theme';
import { AppItem } from '@/services/apps.service';

interface Props {
  app: AppItem;
  size?: number;
  showLabel?: boolean;
  onPress?: (app: AppItem) => void;
  onLongPress?: (app: AppItem) => void;
}

const SPRING = { damping: 12, stiffness: 400, mass: 0.6 };

export const AppIconBadge = memo(function AppIconBadge({
  app,
  size = 60,
  showLabel = true,
  onPress,
  onLongPress,
}: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.88, SPRING);
    opacity.value = withTiming(0.75, { duration: 80 });
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING);
    opacity.value = withTiming(1, { duration: 120 });
  }, [scale, opacity]);

  const handlePress = useCallback(() => {
    onPress?.(app);
  }, [onPress, app]);

  const handleLongPress = useCallback(() => {
    scale.value = withSpring(1.12, SPRING);
    setTimeout(() => { scale.value = withSpring(1, SPRING); }, 200);
    onLongPress?.(app);
  }, [onLongPress, app, scale]);

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
      hitSlop={6}
    >
      <Animated.View style={animStyle}>
        <View
          style={[
            styles.iconWrapper,
            {
              width: size,
              height: size,
              borderRadius: size * 0.22,
              backgroundColor: app.color + '22',
              borderColor: app.color + '44',
            },
          ]}
        >
          <Text style={[styles.emoji, { fontSize: size * 0.48 }]}>{app.icon}</Text>
        </View>
        {showLabel && (
          <Text style={styles.label} numberOfLines={1}>
            {app.name}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: 2,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  emoji: {
    textAlign: 'center',
  },
  label: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    textAlign: 'center',
    marginTop: 5,
    width: 64,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
