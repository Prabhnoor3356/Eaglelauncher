import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Radius, Typography, Shadows } from '@/constants/theme';

export default function LoginScreen() {
  const { loginOffline, isLoading, error, clearError } = useAuth();
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) return;
    clearError();
    await loginOffline(username);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Image
        source={require('@/assets/onboarding-hero.png')}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={300}
      />

      <LinearGradient
        colors={['rgba(10,10,15,0.3)', 'rgba(10,10,15,0.75)', 'rgba(10,10,15,1)']}
        style={StyleSheet.absoluteFillObject}
        locations={[0, 0.5, 1]}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>💎</Text>
            </View>
            <Text style={styles.appName}>Amethyst</Text>
            <Text style={styles.appSubtitle}>Launcher</Text>
          </Animated.View>

          {/* Card */}
          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.card}>
            <Text style={styles.cardTitle}>Get Started</Text>
            <Text style={styles.cardSubtitle}>Create your offline account — no internet needed</Text>

            <View style={styles.offlineBadge}>
              <MaterialIcons name="wifi-off" size={14} color={Colors.success} />
              <Text style={styles.offlineText}>Works 100% offline</Text>
            </View>

            {/* Input */}
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color={Colors.textSubtle} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={text => { setUsername(text); clearError(); }}
                placeholder="Enter your username"
                placeholderTextColor={Colors.textSubtle}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            {error ? (
              <View style={styles.errorRow}>
                <MaterialIcons name="error-outline" size={16} color={Colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Login button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading || !username.trim()}
              style={({ pressed }) => [
                styles.loginBtn,
                (isLoading || !username.trim()) && styles.loginBtnDisabled,
                pressed && styles.loginBtnPressed,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <MaterialIcons name="rocket-launch" size={20} color="#fff" />
                  <Text style={styles.loginBtnText}>Launch Amethyst</Text>
                </>
              )}
            </Pressable>

            <Text style={styles.disclaimer}>
              Your data stays on this device. No account or internet required.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primarySubtle,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.glow,
  },
  logoEmoji: { fontSize: 40 },
  appName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.hero,
    fontWeight: Typography.weights.bold,
    letterSpacing: -1,
  },
  appSubtitle: {
    color: Colors.primary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: -4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Shadows.medium,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.success + '18',
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.success + '33',
  },
  offlineText: {
    color: Colors.success,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  inputIcon: { marginRight: Spacing.sm },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    paddingVertical: 14,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.sizes.sm,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 16,
    ...Shadows.small,
  },
  loginBtnDisabled: { opacity: 0.5 },
  loginBtnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  loginBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  disclaimer: {
    color: Colors.textSubtle,
    fontSize: Typography.sizes.xs,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
});
