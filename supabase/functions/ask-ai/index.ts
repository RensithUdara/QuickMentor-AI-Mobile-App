// Edge Function: AI Question Answering Service
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get auth token and create Supabase client
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { question, category } = await req.json();
    
    if (!question || !category) {
      return new Response(
        JSON.stringify({ error: 'Question and category are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing question for user ${user.id} in category: ${category}`);

    // Check daily usage limit (10 free questions per day)
    const today = new Date().toISOString().split('T')[0];
    
    const { data: usage, error: usageError } = await supabase
      .from('user_usage')
      .select('question_count')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    let currentCount = 0;
    if (usage) {
      currentCount = usage.question_count;
      if (currentCount >= 10) {
        return new Response(
          JSON.stringify({ 
            error: 'Daily limit reached',
            message: 'You have reached your daily limit of 10 free questions. Upgrade to ask unlimited questions!',
            limitReached: true
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Call OnSpace AI
    const aiBaseUrl = Deno.env.get('ONSPACE_AI_BASE_URL');
    const aiApiKey = Deno.env.get('ONSPACE_AI_API_KEY');

    if (!aiBaseUrl || !aiApiKey) {
      console.error('AI configuration missing');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enhanced AI prompt with detailed formatting instructions
    const systemPrompt = `You are QuickMentor AI, a professional advisor specializing in ${category}. Your mission is to provide detailed, actionable guidance that users can implement immediately.

Response Guidelines:
- Be comprehensive yet clear and well-structured
- Use **bold text** (markdown format with **text**) to highlight key points, important terms, and actionable steps
- Include specific, practical advice with concrete examples when relevant
- Break down complex topics into digestible sections
- Provide actionable next steps or implementation tips
- Use numbered lists for step-by-step processes
- Use bullet points for multiple related points
- Maintain a professional yet approachable and motivating tone
- Ensure your advice is current, practical, and directly applicable

Format your response with clear paragraphs, proper spacing, and highlighted keywords for easy reading.`;

    console.log('Calling OnSpace AI...');
    
    const aiResponse = await fetch(`${aiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${aiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OnSpace AI error:', errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const answer = aiData.choices?.[0]?.message?.content;

    if (!answer) {
      console.error('No answer from AI:', aiData);
      return new Response(
        JSON.stringify({ error: 'No answer generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('AI response received successfully');

    // Save question and answer to database
    const { data: savedQuestion, error: saveError } = await supabase
      .from('questions')
      .insert({
        user_id: user.id,
        category,
        question,
        answer
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving question:', saveError);
      return new Response(
        JSON.stringify({ error: 'Failed to save question' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update usage count
    if (usage) {
      await supabase
        .from('user_usage')
        .update({ question_count: currentCount + 1 })
        .eq('user_id', user.id)
        .eq('date', today);
    } else {
      await supabase
        .from('user_usage')
        .insert({
          user_id: user.id,
          date: today,
          question_count: 1
        });
    }

    console.log('Question saved and usage updated');

    return new Response(
      JSON.stringify({ 
        answer,
        questionId: savedQuestion.id,
        remainingQuestions: 10 - (currentCount + 1)
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
