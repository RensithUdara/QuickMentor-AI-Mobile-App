import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth, useAlert } from '@/template';
import { useTheme } from '@/hooks/useTheme';
import { typography, spacing, borderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { signInWithPassword, signUpWithPassword, sendOTP, verifyOTPAndLogin, signInWithGoogle, operationLoading } = useAuth();
  const { showAlert } = useAlert();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const handleEmailPassword = async () => {
    if (!email || !password) {
      showAlert('Error', 'Please fill in all fields');
      return;
    }

    if (isLogin) {
      const { error } = await signInWithPassword(email, password);
      if (error) {
        showAlert('Login Failed', error);
      }
    } else {
      if (password !== confirmPassword) {
        showAlert('Error', 'Passwords do not match');
        return;
      }

      const { error } = await sendOTP(email);
      if (error) {
        showAlert('Error', error);
      } else {
        setShowOtpInput(true);
        showAlert('Success', 'Verification code sent to your email');
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      showAlert('Error', 'Please enter verification code');
      return;
    }

    const { error } = await verifyOTPAndLogin(email, otp, { password });
    if (error) {
      showAlert('Verification Failed', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      showAlert('Google Sign-In Failed', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>QuickMentor AI</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your personal AI advisor for everything
          </Text>
        </View>

        <View style={styles.form}>
          {!showOtpInput ? (
            <>
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!operationLoading}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!operationLoading}
              />

              {!isLogin && (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!operationLoading}
                />
              )}

              <Pressable
                onPress={handleEmailPassword}
                disabled={operationLoading}
                style={[styles.button, { backgroundColor: colors.primary, opacity: operationLoading ? 0.6 : 1 }]}
              >
                <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
              </Pressable>

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textSecondary }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <Pressable
                onPress={handleGoogleSignIn}
                disabled={operationLoading}
                style={[styles.googleButton, { backgroundColor: colors.surface, borderColor: colors.border, opacity: operationLoading ? 0.6 : 1 }]}
              >
                <Ionicons name="logo-google" size={20} color={colors.text} />
                <Text style={[styles.googleButtonText, { color: colors.text }]}>Continue with Google</Text>
              </Pressable>

              <Pressable onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
                <Text style={[styles.toggleText, { color: colors.primary }]}>
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={[styles.otpLabel, { color: colors.textSecondary }]}>
                Enter the 6-digit code sent to {email}
              </Text>

              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
                placeholder="Verification Code"
                placeholderTextColor={colors.textSecondary}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                editable={!operationLoading}
              />

              <Pressable
                onPress={handleVerifyOTP}
                disabled={operationLoading}
                style={[styles.button, { backgroundColor: colors.primary, opacity: operationLoading ? 0.6 : 1 }]}
              >
                <Text style={styles.buttonText}>Verify & Sign Up</Text>
              </Pressable>

              <Pressable onPress={() => setShowOtpInput(false)} style={styles.toggleButton}>
                <Text style={[styles.toggleText, { color: colors.primary }]}>Back to Sign Up</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
  },
  input: {
    ...typography.body,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  button: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...typography.bodySmall,
    marginHorizontal: spacing.md,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  googleButtonText: {
    ...typography.button,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  toggleText: {
    ...typography.bodySmall,
  },
  otpLabel: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});
