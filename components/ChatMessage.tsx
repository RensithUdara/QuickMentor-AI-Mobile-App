// Chat Message Component with Rich Formatting
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography, spacing, borderRadius } from '@/constants/theme';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export function ChatMessage({ text, isUser }: ChatMessageProps) {
  const { colors } = useTheme();

  // Parse formatted text with bold markers
  const renderFormattedText = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return (
      <Text style={[styles.text, { color: isUser ? '#FFFFFF' : colors.text }]}>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <Text key={index} style={styles.bold}>
                {part.slice(2, -2)}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
        ]}
      >
        {isUser ? (
          <Text style={[styles.text, { color: '#FFFFFF' }]}>{text}</Text>
        ) : (
          renderFormattedText(text)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  text: {
    ...typography.body,
    lineHeight: 26,
  },
  bold: {
    fontWeight: '700',
  },
});
