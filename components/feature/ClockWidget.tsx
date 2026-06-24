import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';

export const ClockWidget = memo(function ClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{timeStr}</Text>
      <Text style={styles.date}>{dateStr}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  time: {
    color: Colors.textPrimary,
    fontSize: 64,
    fontWeight: '200',
    letterSpacing: -2,
    textShadowColor: Colors.primaryGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
});
