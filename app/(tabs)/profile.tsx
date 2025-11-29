import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, useAlert } from '@/template';
import { useTheme } from '@/hooks/useTheme';
import { useQuestions } from '@/hooks/useQuestions';
import { typography, spacing, borderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showAlert } = useAlert();
  const { colors } = useTheme();
  const { questions, dailyUsage } = useQuestions();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      showAlert('Logout Failed', error);
    }
  };

  const totalQuestions = questions.length;
  const remainingToday = Math.max(0, 10 - dailyUsage);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={[styles.email, { color: colors.text }]}>{user?.email}</Text>
          {user?.username && (
            <Text style={[styles.username, { color: colors.textSecondary }]}>@{user.username}</Text>
          )}
        </View>

        <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{totalQuestions}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>{remainingToday}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Remaining Today</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/history')}
          style={[styles.menuItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="time-outline" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Question History</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </Pressable>

        <View style={[styles.upgradeCard, { backgroundColor: colors.surface, borderColor: colors.warning }]}>
          <Text style={[styles.upgradeTitle, { color: colors.text }]}>🚀 Coming Soon</Text>
          <Text style={[styles.upgradeText, { color: colors.textSecondary }]}>
            • Unlimited questions with premium subscription{'\n'}
            • Pay-per-question for instant access{'\n'}
            • Human expert consultations{'\n'}
            • Push notifications & reminders
          </Text>
        </View>

        <Pressable onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: colors.error }]}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
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
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.h1,
    color: '#FFFFFF',
  },
  email: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  username: {
    ...typography.body,
  },
  statsCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  menuText: {
    ...typography.body,
    flex: 1,
  },
  upgradeCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    marginBottom: spacing.xl,
  },
  upgradeTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  upgradeText: {
    ...typography.body,
    lineHeight: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  logoutText: {
    ...typography.button,
    color: '#FFFFFF',
  },
});
