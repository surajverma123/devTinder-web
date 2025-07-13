import React, { createContext, useState, useContext, ReactNode } from 'react';
import { authApi, LoginPayload, SignupPayload, ForgotPasswordPayload, ApiError } from '../services/api';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, confirmPassword: string, dateOfBirth: string, gender: string, phone: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode for demo
      if (import.meta.env.MODE === 'development' && email === 'demo@example.com') {
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === 'demo@example.com' && password === 'password') {
          const mockUser: AuthUser = {
            id: '1',
            name: 'Emma Johnson',
            email: email,
            profileImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
          };
          setUser(mockUser);
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          localStorage.setItem('auth_token', 'mock_jwt_token');
          return true;
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // Real API call
        const loginPayload: LoginPayload = {
          emailId: email,
          password,
          rememberMe: false, // You can get this from form if needed
        };

        const response: any = await authApi.login(loginPayload);
        if (response?.success) {
          const userData: any = {
            id: response.data._id,
            name: response.data.fullName,
            email: response.data.emailId,
            // profileImage: "response.data.photoUrl"
            profileImage: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
          };
          setUser(userData);
          localStorage.setItem('auth_user', JSON.stringify(userData));
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('refresh_token', response.data!.refreshToken);
          return true;
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';

      if (err instanceof ApiError) {
        errorMessage = err.message;
        // Handle specific error cases
        if (err.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (err.status === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (err.status === 403) {
          errorMessage = 'Account is suspended. Please contact support.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, confirmPassword: string, dateOfBirth: string, gender: string, phone: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode for demo
      if (import.meta.env.MODE === 'development' && email.includes('@real.com')) {
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate email already exists error for demo
        if (email === 'existing@example.com') {
          throw new Error('An account with this email already exists');
        }

        const mockUser: AuthUser = {
          id: Date.now().toString(),
          name: name,
          email: email,
          profileImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
        };
        setUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', 'mock_jwt_token');
        return true;
      } else {
        // Real API call - Note: This is a simplified version
        // In the actual signup form, you'll have more fields
        const signupPayload: any = {
          fullName: name,
          emailId: email,
          phone, // This should come from the form
          password,
          confirmPassword,
          dateOfBirth, // This should come from the form
          gender, // This should come from the form
          agreeToTerms: true,
          agreeToPrivacy: true,
          subscribeNewsletter: false,
        };
        const response: any = await authApi.signup(signupPayload);
        if (response.success) {
          const userData: any = {
            id: response.user._id,
            name: response.user.fullName,
            email: response.user.emailId,
            // profileImage: response.user.photoUrl
            profileImage: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
          };

          setUser(userData);
          localStorage.setItem('auth_user', JSON.stringify(userData));
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('refresh_token', response.data!.refreshToken);
          return true;
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';

      if (err instanceof ApiError) {
        errorMessage = err.message;
        // Handle specific error cases
        if (err.status === 409) {
          errorMessage = 'An account with this email already exists.';
        } else if (err.status === 422) {
          errorMessage = 'Please check your information and try again.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Call logout API in background (don't wait for response)
    if (localStorage.getItem('auth_token')) {
      authApi.logout().catch(console.error);
    }

    setUser(null);
    setError(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode for demo
      if (import.meta.env.MODE === 'development' && !email.includes('@real.com')) {
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate email not found error for demo
        if (email === 'notfound@example.com') {
          throw new Error('No account found with this email address');
        }

        return true;
      } else {
        // Real API call
        const forgotPasswordPayload: ForgotPasswordPayload = {
          email,
        };

        const response = await authApi.forgotPassword(forgotPasswordPayload);

        if (response.success) {
          return true;
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      let errorMessage = 'Failed to send reset email. Please try again.';

      if (err instanceof ApiError) {
        errorMessage = err.message;
        if (err.status === 404) {
          errorMessage = 'No account found with this email address.';
        } else if (err.status === 429) {
          errorMessage = 'Too many requests. Please wait before trying again.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Check if we're in development mode for demo
      if (import.meta.env.MODE === 'development' && token !== 'real_token') {
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate invalid token error for demo
        if (token === 'invalid_token') {
          throw new Error('Invalid or expired reset token');
        }

        return true;
      } else {
        // Real API call
        const resetPasswordPayload = {
          token,
          password,
          confirmPassword: password, // You might want to pass this separately
        };

        const response = await authApi.resetPassword(resetPasswordPayload);

        if (response.success) {
          return true;
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      let errorMessage = 'Failed to reset password. Please try again.';

      if (err instanceof ApiError) {
        errorMessage = err.message;
        if (err.status === 400) {
          errorMessage = 'Invalid or expired reset token.';
        } else if (err.status === 422) {
          errorMessage = 'Password does not meet requirements.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');

    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (err) {
        console.error('Failed to parse saved user data:', err);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};