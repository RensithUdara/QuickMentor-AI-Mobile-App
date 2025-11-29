import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ChatMessage } from '@/components/ChatMessage';
import { aiService } from '@/services/aiService';
import { useTheme } from '@/hooks/useTheme';
import { useQuestions } from '@/hooks/useQuestions';
import { useAlert } from '@/template';
import { categories } from '@/constants/categories';
import { typography, spacing, borderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const categoryId = params.category as string;
  const category = categories.find(c => c.id === categoryId);

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();
  const { refreshQuestions, refreshUsage } = useQuestions();
  const { showAlert } = useAlert();

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();
    setQuestion('');
    setMessages(prev => [...prev, { text: userQuestion, isUser: true }]);
    setLoading(true);

    const { data, error } = await aiService.askQuestion({
      question: userQuestion,
      category: category?.name || 'General',
    });

    setLoading(false);

    if (error) {
      showAlert('Error', error);
      setMessages(prev => prev.slice(0, -1)); // Remove user question on error
      return;
    }

    if (data) {
      setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
      await refreshQuestions();
      await refreshUsage();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={100}
    >
      <View style={[styles.categoryHeader, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={styles.emoji}>{category?.emoji || '✨'}</Text>
        <Text style={[styles.categoryName, { color: colors.text }]}>{category?.name || 'Ask Anything'}</Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Ask me anything about {category?.name.toLowerCase() || 'this topic'}!
            </Text>
          </View>
        ) : (
          messages.map((msg, index) => <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />)
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          placeholder="Type your question..."
          placeholderTextColor={colors.textSecondary}
          value={question}
          onChangeText={setQuestion}
          multiline
          maxLength={500}
          editable={!loading}
        />
        <Pressable
          onPress={handleAsk}
          disabled={!question.trim() || loading}
          style={[
            styles.sendButton,
            {
              backgroundColor: !question.trim() || loading ? colors.border : colors.primary,
            },
          ]}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 24,
  },
  categoryName: {
    ...typography.h3,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: spacing.md,
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  loadingText: {
    ...typography.body,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    maxHeight: 100,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
