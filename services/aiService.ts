// AI Service - Handles AI question answering via Edge Function
import { getSupabaseClient } from '@/template';
import { FunctionsHttpError } from '@supabase/supabase-js';

export interface AskQuestionParams {
  question: string;
  category: string;
}

export interface AskQuestionResponse {
  answer: string;
  questionId: string;
  remainingQuestions: number;
}

export const aiService = {
  async askQuestion(params: AskQuestionParams): Promise<{ data: AskQuestionResponse | null; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      
      const { data, error } = await supabase.functions.invoke('ask-ai', {
        body: params,
      });

      if (error) {
        let errorMessage = error.message;
        if (error instanceof FunctionsHttpError) {
          try {
            const statusCode = error.context?.status ?? 500;
            const textContent = await error.context?.text();
            const parsedError = textContent ? JSON.parse(textContent) : null;
            
            // Handle limit reached specially
            if (parsedError?.limitReached) {
              return { 
                data: null, 
                error: parsedError.message || 'Daily limit reached' 
              };
            }
            
            errorMessage = parsedError?.error || parsedError?.message || error.message;
          } catch {
            errorMessage = error.message || 'Failed to get AI response';
          }
        }
        return { data: null, error: errorMessage };
      }

      return { data, error: null };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Failed to connect to AI service' 
      };
    }
  },
};
