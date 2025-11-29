import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ChatMessage } from '@/components/ChatMessage';
import { RatingButtons } from '@/components/RatingButtons';
import { useTheme } from '@/hooks/useTheme';
import { useQuestions } from '@/hooks/useQuestions';
import { typography, spacing, borderRadius } from '@/constants/theme';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const { questions, loading, rateQuestion } = useQuestions();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No questions yet. Start asking QuickMentor AI!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {questions.map((q, index) => (
          <View key={q.id} style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.header}>
              <Text style={[styles.category, { color: colors.primary }]}>{q.category}</Text>
              <Text style={[styles.date, { color: colors.textSecondary }]}>
                {new Date(q.created_at).toLocaleDateString()}
              </Text>
            </View>
            <ChatMessage text={q.question} isUser={true} />
            <ChatMessage text={q.answer} isUser={false} />
            <RatingButtons
              currentRating={q.rating}
              onRate={(rating) => rateQuestion(q.id, rating)}
            />
          </View>
        ))}
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
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  category: {
    ...typography.h3,
  },
  date: {
    ...typography.caption,
  },
});
