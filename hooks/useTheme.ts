// useTheme Hook - Access theme colors based on color scheme
import { useColorScheme } from 'react-native';
import { colors } from '@/constants/theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return {
    colors: isDark ? colors.dark : colors.light,
    isDark,
  };
}
