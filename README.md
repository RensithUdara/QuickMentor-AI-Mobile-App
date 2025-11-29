# QuickMentor AI Mobile App

[![Expo](https://img.shields.io/badge/Expo-~53.0.9-000020.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.3-61DAFB.svg?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-^2.50.0-3ECF8E.svg?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

QuickMentor AI is an intelligent mobile companion that provides personalized mentoring across multiple life categories. Built with React Native and Expo, this cross-platform application leverages AI to deliver expert guidance in career development, business strategy, health & wellness, finance, and more.

## ✨ Features

### 🎯 Smart Categorized Guidance
- **Career Development**: Professional growth advice and career planning
- **Business Strategy**: Entrepreneurship insights and strategic guidance  
- **Financial Planning**: Money management and investment strategies
- **Health & Fitness**: Wellness tips and fitness guidance
- **Mental Health**: Mindfulness practices and wellbeing support
- **Culinary Skills**: Cooking recipes and culinary techniques
- **Travel Planning**: Adventure tips and destination recommendations
- **Learning & Education**: Skill building and educational resources
- **Technology**: Coding help and tech insights
- **Relationships**: Social advice and relationship guidance
- **Custom Topics**: Open-ended questions on any subject

### 🤖 AI-Powered Chat Interface
- Real-time AI responses powered by Supabase Edge Functions
- Context-aware conversations with category-specific expertise
- Interactive chat interface with message history
- Usage tracking and daily limits management

### 📱 Cross-Platform Excellence
- **iOS**: Native performance with tablet support
- **Android**: Adaptive icons and edge-to-edge experience  
- **Web**: Progressive web app capabilities
- **Universal Design**: Consistent experience across all platforms

### 🔐 Secure Authentication
- Supabase authentication integration
- Secure user sessions and data protection
- Privacy-focused design principles

### 🎨 Modern UI/UX
- Dark/Light theme support with system preference detection
- Gradient-based category cards with custom theming
- Responsive design optimized for all screen sizes
- Smooth animations and haptic feedback
- Accessible interface following platform guidelines

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quickmentor-ai.git
   cd quickmentor-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run start
   ```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Start Expo development server |
| `npm run android` | Launch Android emulator |
| `npm run ios` | Launch iOS simulator |  
| `npm run web` | Start web version |
| `npm run lint` | Run ESLint code analysis |
| `npm run reset-project` | Clear cache and reset project |

## 🏗️ Architecture

### Project Structure
```
QuickMentor AI/
├── app/                    # App Router screens
│   ├── (tabs)/            # Tab-based navigation
│   ├── chat.tsx           # AI chat interface
│   ├── login.tsx          # Authentication
│   └── index.tsx          # Root screen
├── components/            # Reusable UI components
│   ├── CategoryCard.tsx   # Category selection cards
│   ├── ChatMessage.tsx    # Chat message components
│   ├── RatingButtons.tsx  # User feedback components
│   └── ui/               # Core UI components
├── constants/            # App constants and themes
│   ├── categories.ts     # AI category definitions
│   ├── Colors.ts         # Color palette
│   └── theme.ts          # Typography and spacing
├── contexts/             # React contexts
│   └── QuestionsContext.tsx
├── hooks/                # Custom React hooks
│   ├── useQuestions.ts   # Question management
│   └── useTheme.ts       # Theme management
├── services/             # API and external services
│   ├── aiService.ts      # AI integration layer
│   └── questionsService.ts
├── supabase/             # Backend functions
│   └── functions/
│       └── ask-ai/       # AI Edge Function
└── template/             # Reusable app template
    ├── auth/             # Authentication system
    ├── core/             # Core utilities
    └── ui/               # UI framework
```

### Core Technologies

#### Frontend Stack
- **React Native 0.79.3**: Cross-platform mobile framework
- **Expo ~53.0.9**: Development platform and toolchain
- **Expo Router ~5.0.7**: File-based navigation system
- **TypeScript ~5.8.3**: Static type checking
- **React 19.0.0**: Latest React features and optimizations

#### Backend & Data
- **Supabase ^2.50.0**: Backend-as-a-Service platform
  - Real-time database
  - Edge Functions for AI processing
  - Authentication and authorization
  - Row Level Security (RLS)

#### UI & Design
- **React Native Paper ^5.12.5**: Material Design components
- **Expo Vector Icons ^14.0.0**: Comprehensive icon library
- **Lottie React Native 7.2.2**: High-quality animations
- **React Native Reanimated 3.17.4**: Performant animations
- **Expo Linear Gradient ~14.1.4**: Gradient backgrounds

#### Development Tools
- **ESLint ^9.25.0**: Code quality and consistency
- **Babel ^7.25.2**: JavaScript transpilation
- **Metro Bundler**: React Native bundling system

## 🔧 Configuration

### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "onspace-app",
    "slug": "onspace-app", 
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "onspaceapp",
    "newArchEnabled": true,
    "plugins": [
      "expo-router",
      "expo-splash-screen",
      "expo-web-browser"
    ]
  }
}
```

### Key Features Enabled
- **Expo Router**: File-based routing with type safety
- **New Architecture**: React Native's new architecture support
- **Edge-to-Edge**: Modern Android design patterns
- **Typed Routes**: Compile-time route validation

## 🌐 API Integration

### Supabase Edge Functions
The app uses Supabase Edge Functions for AI processing:

```typescript
// AI Service Integration
const { data, error } = await supabase.functions.invoke('ask-ai', {
  body: {
    question: userQuestion,
    category: selectedCategory,
  },
});
```

### Authentication Flow
```typescript
// Auth Router Integration
<AuthRouter loginRoute="/login">
  <Redirect href="/(tabs)" />
</AuthRouter>
```

## 📊 Features Deep Dive

### AI Categories System
The app organizes AI assistance into specialized categories, each with:
- **Unique Branding**: Custom emojis and gradient themes
- **Specialized Knowledge**: Category-specific AI training
- **Usage Tracking**: Per-category analytics and limits
- **Personalization**: Tailored responses based on user history

### Chat Interface
- **Real-time Messaging**: Instant AI responses
- **Message Persistence**: Chat history storage
- **Context Awareness**: Maintains conversation context
- **Error Handling**: Graceful failure recovery
- **Loading States**: Visual feedback during processing

### Theme System
- **Adaptive Themes**: Automatic dark/light mode switching
- **Custom Color Palette**: Brand-consistent colors
- **Typography Scale**: Responsive text sizing
- **Component Theming**: Consistent styling across components

## 🔒 Security & Privacy

- **Secure Authentication**: Supabase Auth with JWT tokens
- **Data Encryption**: End-to-end encrypted communications
- **Privacy by Design**: Minimal data collection principles
- **Row Level Security**: Database-level access controls
- **GDPR Compliant**: Privacy regulation adherence

## 📱 Platform Support

| Platform | Status | Features |
|----------|--------|----------|
| **iOS** | ✅ Full Support | iPhone, iPad, App Store ready |
| **Android** | ✅ Full Support | Phone, Tablet, Google Play ready |
| **Web** | ✅ Progressive Web App | Desktop, Mobile browser support |

## 🚢 Deployment

### Development Build
```bash
# iOS
eas build --platform ios --profile development

# Android  
eas build --platform android --profile development
```

### Production Build
```bash
# iOS App Store
eas build --platform ios --profile production

# Android Play Store
eas build --platform android --profile production

# Web Deployment
npm run web
```

## 🤝 Contributing

We welcome contributions to QuickMentor AI! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript best practices
- Maintain 80%+ test coverage
- Use conventional commit messages
- Ensure all linting passes
- Document new features

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📄 License

This project is private and proprietary. All rights reserved.

For licensing inquiries or collaboration opportunities, please contact the development team.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **Supabase**: For the powerful backend infrastructure  
- **React Native Community**: For the amazing ecosystem
- **Open Source Contributors**: For the libraries that make this possible

---

**Built with ❤️ using React Native, Expo, and Supabase**

For support or questions, please open an issue or contact our development team.
