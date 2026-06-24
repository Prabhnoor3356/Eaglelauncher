import React, { memo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { CATEGORIES } from '@/constants/config';

interface Props {
  active: string;
  onSelect: (cat: string) => void;
}

export const CategoryBar = memo(function CategoryBar({ active, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {CATEGORIES.map(cat => {
          const isSelected = cat === active;
          return (
            <Pressable
              key={cat}
              onPress={() => onSelect(cat)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  chip: {
    height: 36,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  chipTextSelected: {
    color: Colors.textOnPrimary,
    fontWeight: Typography.weights.semibold,
  },
});
