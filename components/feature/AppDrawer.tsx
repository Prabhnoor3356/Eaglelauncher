import React, { memo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { AppGrid } from './AppGrid';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryBar } from '@/components/ui/CategoryBar';
import { useLauncher } from '@/hooks/useLauncher';
import { AppItem } from '@/services/apps.service';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SPRING_CONFIG = { damping: 22, stiffness: 300, mass: 0.7 };
const CLOSE_THRESHOLD = SCREEN_HEIGHT * 0.25;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAppPress: (app: AppItem) => void;
}

export const AppDrawer = memo(function AppDrawer({ isOpen, onClose, onAppPress }: Props) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  const {
    apps,
    searchQuery,
    searchResults,
    isSearching,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    getAppsByCategory,
  } = useLauncher();

  useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, SPRING_CONFIG);
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isOpen]);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      const clamped = Math.max(0, e.translationY);
      translateY.value = clamped;
    })
    .onEnd(e => {
      if (e.translationY > CLOSE_THRESHOLD) {
        translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
        backdropOpacity.value = withTiming(0, { duration: 200 });
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? 'auto' : 'none',
  }));

  const displayApps = isSearching
    ? searchResults
    : getAppsByCategory(activeCategory);

  if (!isOpen && translateY.value === SCREEN_HEIGHT) return null;

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.drawer, drawerStyle]}>
        {Platform.OS === 'ios' && (
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={styles.drawerContent}>
          {/* Handle */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.handleArea}>
              <View style={styles.handle} />
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>All Apps</Text>
                <Pressable onPress={onClose} style={styles.closeBtn}>
                  <MaterialIcons name="keyboard-arrow-down" size={26} color={Colors.textSubtle} />
                </Pressable>
              </View>
            </View>
          </GestureDetector>

          {/* Search */}
          <View style={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </View>

          {/* Category bar */}
          {!isSearching && (
            <View style={styles.categoryWrapper}>
              <CategoryBar active={activeCategory} onSelect={setActiveCategory} />
            </View>
          )}

          {/* Apps */}
          <AppGrid
            apps={displayApps}
            onAppPress={onAppPress}
            emptyMessage={isSearching ? `No results for "${searchQuery}"` : 'No apps in this category'}
          />
        </View>
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 100,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.92,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(12,12,20,0.85)' : Colors.backgroundSecondary,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderTopWidth: 1,
    borderColor: Colors.dockBorder,
    zIndex: 101,
    overflow: 'hidden',
  },
  drawerContent: {
    flex: 1,
  },
  handleArea: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    opacity: 0.7,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  drawerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
  },
  searchWrapper: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  categoryWrapper: {
    marginBottom: Spacing.sm,
  },
});
