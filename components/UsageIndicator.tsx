// Usage Indicator Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography, spacing, borderRadius } from '@/constants/theme';

interface UsageIndicatorProps {
  used: number;
  total: number;
}

export function UsageIndicator({ used, total }: UsageIndicatorProps) {
  const { colors } = useTheme();
  const remaining = total - used;
  const isLow = remaining <= 3;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Free questions today</Text>
        <Text style={[styles.count, { color: isLow ? colors.warning : colors.success }]}>
          {remaining} / {total}
        </Text>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barBackground, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.barFill,
              {
                backgroundColor: isLow ? colors.warning : colors.success,
                width: `${((total - used) / total) * 100}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.bodySmall,
  },
  count: {
    ...typography.h3,
  },
  barContainer: {
    height: 8,
  },
  barBackground: {
    height: 8,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: borderRadius.full,
  },
});
