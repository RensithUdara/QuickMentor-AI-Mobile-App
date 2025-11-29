import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { CategoryCard } from '@/components/CategoryCard';
import { UsageIndicator } from '@/components/UsageIndicator';
import { categories } from '@/constants/categories';
import { useTheme } from '@/hooks/useTheme';
import { useQuestions } from '@/hooks/useQuestions';
import { typography, spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { dailyUsage } = useQuestions();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>QuickMentor AI</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose a category and ask your question
          </Text>
        </View>

        <UsageIndicator used={dailyUsage} total={10} />

        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => {
            if (index % 2 === 0) {
              return (
                <View key={category.id} style={styles.row}>
                  <CategoryCard
                    category={category}
                    onPress={() => router.push(`/chat?category=${category.id}`)}
                  />
                  {categories[index + 1] && (
                    <CategoryCard
                      category={categories[index + 1]}
                      onPress={() => router.push(`/chat?category=${categories[index + 1].id}`)}
                    />
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
  categoriesGrid: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
});
