// Design system tokens for QuickMentor AI
export const colors = {
  light: {
    background: '#FAFBFC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E1E4E8',
    text: '#24292E',
    textSecondary: '#586069',
    primary: '#5B5FFF',
    primaryLight: '#7C7FFF',
    success: '#0CAF60',
    error: '#F44336',
    warning: '#FF9800',
    
    // Enhanced category gradients
    careerStart: '#667EEA',
    careerEnd: '#764BA2',
    fitnessStart: '#11998E',
    fitnessEnd: '#38EF7D',
    learningStart: '#F2994A',
    learningEnd: '#F2C94C',
    techStart: '#2E3192',
    techEnd: '#1BFFFF',
    relationshipsStart: '#ED213A',
    relationshipsEnd: '#93291E',
    customStart: '#4A5568',
    customEnd: '#718096',
    businessStart: '#134E5E',
    businessEnd: '#71B280',
    financeStart: '#C33764',
    financeEnd: '#1D2671',
    cookingStart: '#FF6B6B',
    cookingEnd: '#FFE66D',
    mentalHealthStart: '#A8EDEA',
    mentalHealthEnd: '#FED6E3',
    travelStart: '#FA8BFF',
    travelEnd: '#2BD2FF',
  },
  dark: {
    background: '#0D1117',
    surface: '#161B22',
    card: '#1F2937',
    border: '#30363D',
    text: '#F0F6FC',
    textSecondary: '#8B949E',
    primary: '#7C7FFF',
    primaryLight: '#9C9FFF',
    success: '#26A641',
    error: '#FF5555',
    warning: '#FFA726',
    
    // Enhanced category gradients
    careerStart: '#667EEA',
    careerEnd: '#764BA2',
    fitnessStart: '#11998E',
    fitnessEnd: '#38EF7D',
    learningStart: '#F2994A',
    learningEnd: '#F2C94C',
    techStart: '#2E3192',
    techEnd: '#1BFFFF',
    relationshipsStart: '#ED213A',
    relationshipsEnd: '#93291E',
    customStart: '#4A5568',
    customEnd: '#718096',
    businessStart: '#134E5E',
    businessEnd: '#71B280',
    financeStart: '#C33764',
    financeEnd: '#1D2671',
    cookingStart: '#FF6B6B',
    cookingEnd: '#FFE66D',
    mentalHealthStart: '#A8EDEA',
    mentalHealthEnd: '#FED6E3',
    travelStart: '#FA8BFF',
    travelEnd: '#2BD2FF',
  },
};

export const typography = {
  h1: {
    fontSize: 34,
    fontWeight: '800' as const,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
};
