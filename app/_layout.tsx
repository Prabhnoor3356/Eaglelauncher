import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';
import { LauncherProvider } from '@/contexts/LauncherContext';
import { useAuth } from '@/hooks/useAuth';

function RootNavigator() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Redirect href="/login" />;
  return null;
}

export default function RootLayout() {
  return (
    <AlertProvider>
      <GestureHandlerRootView style={styles.flex}>
        <SafeAreaProvider>
          <AuthProvider>
            <LauncherProvider>
              <RootNavigator />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </LauncherProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AlertProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
