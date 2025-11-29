// Rating Buttons Component
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { typography, spacing, borderRadius } from '@/constants/theme';

interface RatingButtonsProps {
  onRate: (rating: boolean) => void;
  currentRating?: boolean | null;
}

export function RatingButtons({ onRate, currentRating }: RatingButtonsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>Was this helpful?</Text>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => onRate(true)}
          style={[
            styles.button,
            {
              backgroundColor: currentRating === true ? colors.success : colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="thumbs-up"
            size={20}
            color={currentRating === true ? '#FFFFFF' : colors.textSecondary}
          />
        </Pressable>
        <Pressable
          onPress={() => onRate(false)}
          style={[
            styles.button,
            {
              backgroundColor: currentRating === false ? colors.error : colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="thumbs-down"
            size={20}
            color={currentRating === false ? '#FFFFFF' : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.bodySmall,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
