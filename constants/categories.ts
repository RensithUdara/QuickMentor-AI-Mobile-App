// Category definitions for QuickMentor AI
export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  gradientStart: string;
  gradientEnd: string;
}

export const categories: Category[] = [
  {
    id: 'career',
    name: 'Career',
    emoji: '💼',
    description: 'Professional growth & advice',
    gradientStart: 'careerStart',
    gradientEnd: 'careerEnd',
  },
  {
    id: 'business',
    name: 'Business',
    emoji: '📈',
    description: 'Entrepreneurship & strategy',
    gradientStart: 'businessStart',
    gradientEnd: 'businessEnd',
  },
  {
    id: 'finance',
    name: 'Finance',
    emoji: '💰',
    description: 'Money management & investing',
    gradientStart: 'financeStart',
    gradientEnd: 'financeEnd',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    emoji: '💪',
    description: 'Health & wellness tips',
    gradientStart: 'fitnessStart',
    gradientEnd: 'fitnessEnd',
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    emoji: '🧘',
    description: 'Mindfulness & wellbeing',
    gradientStart: 'mentalHealthStart',
    gradientEnd: 'mentalHealthEnd',
  },
  {
    id: 'cooking',
    name: 'Cooking',
    emoji: '🍳',
    description: 'Recipes & culinary tips',
    gradientStart: 'cookingStart',
    gradientEnd: 'cookingEnd',
  },
  {
    id: 'travel',
    name: 'Travel',
    emoji: '✈️',
    description: 'Adventure & destination tips',
    gradientStart: 'travelStart',
    gradientEnd: 'travelEnd',
  },
  {
    id: 'learning',
    name: 'Learning',
    emoji: '📚',
    description: 'Education & skill building',
    gradientStart: 'learningStart',
    gradientEnd: 'learningEnd',
  },
  {
    id: 'tech',
    name: 'Tech',
    emoji: '💻',
    description: 'Technology & coding help',
    gradientStart: 'techStart',
    gradientEnd: 'techEnd',
  },
  {
    id: 'relationships',
    name: 'Relationships',
    emoji: '❤️',
    description: 'Love & social advice',
    gradientStart: 'relationshipsStart',
    gradientEnd: 'relationshipsEnd',
  },
  {
    id: 'custom',
    name: 'Custom',
    emoji: '✨',
    description: 'Ask anything else',
    gradientStart: 'customStart',
    gradientEnd: 'customEnd',
  },
];
