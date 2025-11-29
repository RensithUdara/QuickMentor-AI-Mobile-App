import { Stack } from 'expo-router';
import { AuthProvider, AlertProvider } from '@/template';
import { QuestionsProvider } from '@/contexts/QuestionsContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <AuthProvider>
        <QuestionsProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="chat" 
              options={{ 
                headerShown: true,
                title: 'Ask QuickMentor AI',
                headerBackTitle: 'Back'
              }} 
            />
            <Stack.Screen 
              name="history" 
              options={{ 
                headerShown: true,
                title: 'Question History',
                headerBackTitle: 'Back'
              }} 
            />
          </Stack>
        </QuestionsProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
