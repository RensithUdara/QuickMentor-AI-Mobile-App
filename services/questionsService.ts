// Questions Service - Database operations for questions and ratings
import { getSupabaseClient } from '@/template';

export interface Question {
  id: string;
  user_id: string;
  category: string;
  question: string;
  answer: string;
  created_at: string;
  rating?: boolean | null;
}

export const questionsService = {
  async getQuestions(): Promise<{ data: Question[] | null; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      
      const { data: questions, error } = await supabase
        .from('questions')
        .select(`
          *,
          ratings (rating)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        return { data: null, error: error.message };
      }

      // Merge rating into question object
      const formattedQuestions = questions?.map(q => ({
        ...q,
        rating: q.ratings?.[0]?.rating ?? null,
      })) || [];

      return { data: formattedQuestions, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async rateQuestion(questionId: string, rating: boolean): Promise<{ error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { error: 'Not authenticated' };
      }

      const { error } = await supabase
        .from('ratings')
        .upsert({
          question_id: questionId,
          user_id: user.id,
          rating,
        }, {
          onConflict: 'question_id,user_id'
        });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  async getDailyUsage(): Promise<{ count: number; error: string | null }> {
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { count: 0, error: 'Not authenticated' };
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('user_usage')
        .select('question_count')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
        return { count: 0, error: error.message };
      }

      return { count: data?.question_count || 0, error: null };
    } catch (error: any) {
      return { count: 0, error: error.message };
    }
  },
};
