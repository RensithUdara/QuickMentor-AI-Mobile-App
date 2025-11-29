// Category Card Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientCard } from './ui/GradientCard';
import { Category } from '@/constants/categories';
import { useTheme } from '@/hooks/useTheme';
import { typography, spacing } from '@/constants/theme';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  const { colors } = useTheme();

  const gradientColors: [string, string] = [
    colors[category.gradientStart as keyof typeof colors] as string,
    colors[category.gradientEnd as keyof typeof colors] as string,
  ];

  return (
    <GradientCard gradientColors={gradientColors} onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{category.emoji}</Text>
        <Text style={[styles.name, { color: '#FFFFFF' }]}>{category.name}</Text>
        <Text style={[styles.description, { color: '#FFFFFF' }]}>{category.description}</Text>
      </View>
    </GradientCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 150,
    margin: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h3,
    marginBottom: spacing.xs,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    ...typography.caption,
    textAlign: 'center',
    opacity: 0.95,
  },
});
