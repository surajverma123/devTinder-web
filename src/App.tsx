import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WeddingProvider } from './context/WeddingContext';
import Landing from './pages/Landing';
import UserDashboard from './pages/UserDashboard';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';

type AuthView = 'landing' | 'login' | 'signup' | 'forgot-password';

const AuthWrapper: React.FC = () => {
  const [authView, setAuthView] = useState<AuthView>('landing');
  const { isAuthenticated } = useAuth();

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return (
      <WeddingProvider>
        <UserDashboard />
      </WeddingProvider>
    );
  }

  // Show different views based on current auth view
  switch (authView) {
    case 'login':
      return (
        <LoginForm
          onSwitchToSignup={() => setAuthView('signup')}
          onSwitchToForgotPassword={() => setAuthView('forgot-password')}
          onBackToLanding={() => setAuthView('landing')}
        />
      );
    case 'signup':
      return (
        <SignupForm
          onSwitchToLogin={() => setAuthView('login')}
          onBackToLanding={() => setAuthView('landing')}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPasswordForm
          onSwitchToLogin={() => setAuthView('login')}
          onBackToLanding={() => setAuthView('landing')}
        />
      );
    default:
      return (
        <Landing
          onLogin={() => setAuthView('login')}
          onSignup={() => setAuthView('signup')}
        />
      );
  }
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;