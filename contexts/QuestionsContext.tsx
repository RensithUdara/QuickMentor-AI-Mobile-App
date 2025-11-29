// Questions Context - Global state for questions and usage
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { questionsService, Question } from '@/services/questionsService';
import { useAuth } from '@/template';

interface QuestionsContextType {
  questions: Question[];
  dailyUsage: number;
  loading: boolean;
  refreshQuestions: () => Promise<void>;
  refreshUsage: () => Promise<void>;
  rateQuestion: (questionId: string, rating: boolean) => Promise<void>;
}

export const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadQuestions = async () => {
    if (!user) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    const { data, error } = await questionsService.getQuestions();
    if (!error && data) {
      setQuestions(data);
    }
    setLoading(false);
  };

  const loadUsage = async () => {
    if (!user) {
      setDailyUsage(0);
      return;
    }

    const { count } = await questionsService.getDailyUsage();
    setDailyUsage(count);
  };

  useEffect(() => {
    if (user) {
      loadQuestions();
      loadUsage();
    } else {
      setQuestions([]);
      setDailyUsage(0);
      setLoading(false);
    }
  }, [user]);

  const refreshQuestions = async () => {
    await loadQuestions();
  };

  const refreshUsage = async () => {
    await loadUsage();
  };

  const rateQuestion = async (questionId: string, rating: boolean) => {
    const { error } = await questionsService.rateQuestion(questionId, rating);
    if (!error) {
      // Update local state
      setQuestions(prev =>
        prev.map(q =>
          q.id === questionId ? { ...q, rating } : q
        )
      );
    }
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        dailyUsage,
        loading,
        refreshQuestions,
        refreshUsage,
        rateQuestion,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
