import React, { memo, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar = memo(function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search apps...',
  autoFocus,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const focusAnim = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: interpolate(focusAnim.value, [0, 1], [0, 1]) > 0.5
      ? Colors.primary
      : Colors.searchBorder,
    shadowOpacity: interpolate(focusAnim.value, [0, 1], [0, 0.35]),
  }));

  const handleFocus = useCallback(() => {
    focusAnim.value = withTiming(1, { duration: 200 });
  }, [focusAnim]);

  const handleBlur = useCallback(() => {
    focusAnim.value = withTiming(0, { duration: 200 });
  }, [focusAnim]);

  const handleClear = useCallback(() => {
    onChangeText('');
    onClear?.();
    inputRef.current?.blur();
  }, [onChangeText, onClear]);

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <MaterialIcons name="search" size={20} color={Colors.textSubtle} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSubtle}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} hitSlop={8}>
          <MaterialIcons name="close" size={18} color={Colors.textSubtle} />
        </Pressable>
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBackground,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.regular,
    padding: 0,
  },
});
