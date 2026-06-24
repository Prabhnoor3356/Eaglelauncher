import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { AppIconBadge } from '@/components/ui/AppIconBadge';
import { AppItem } from '@/services/apps.service';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { APP_CONFIG } from '@/constants/config';

interface Props {
  apps: AppItem[];
  numColumns?: number;
  onAppPress: (app: AppItem) => void;
  onAppLongPress?: (app: AppItem) => void;
  emptyMessage?: string;
  header?: React.ReactElement;
}

// Performance: wrap each row of items
const COLS = APP_CONFIG.gridColumns;

export const AppGrid = memo(function AppGrid({
  apps,
  numColumns = COLS,
  onAppPress,
  onAppLongPress,
  emptyMessage = 'No apps found',
  header,
}: Props) {
  const renderItem = useCallback(
    ({ item }: { item: AppItem }) => (
      <View style={[styles.cell, { width: `${100 / numColumns}%` }]}>
        <AppIconBadge
          app={item}
          onPress={onAppPress}
          onLongPress={onAppLongPress}
        />
      </View>
    ),
    [onAppPress, onAppLongPress, numColumns]
  );

  const keyExtractor = useCallback((item: AppItem) => item.id, []);

  if (apps.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={apps}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      estimatedItemSize={90}
      ListHeaderComponent={header}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      // Performance: draw buffer for 60fps
      drawDistance={300}
      overrideItemLayout={(layout) => {
        layout.size = 90;
      }}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: 120,
    paddingTop: Spacing.sm,
  },
  cell: {
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: Spacing.md,
  },
  emptyText: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
  },
});
