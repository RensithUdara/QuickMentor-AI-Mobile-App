// useQuestions Hook - Access questions context
import { useContext } from 'react';
import { QuestionsContext } from '@/contexts/QuestionsContext';

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within QuestionsProvider');
  }
  return context;
}
