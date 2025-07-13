import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Mail, Lock, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onBackToLanding: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSwitchToSignup, 
  onSwitchToForgotPassword,
  onBackToLanding 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    rememberMe: Yup.boolean()
  });

  const handleSubmit = async (values: LoginFormValues, { setFieldError, setStatus }: any) => {
    try {
      setStatus(null);
      const success = await login(values.email, values.password);
      if (!success) {
        setStatus('Invalid email or password. Please try again.');
      }
    } catch (err: any) {
      setStatus(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8CACA]/20 to-[#1E2A49]/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center text-[#1E2A49] hover:text-[#F8CACA] transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-[#1E2A49] rounded-full p-3">
              <Heart className="w-8 h-8 text-[#F8CACA]" />
            </div>
          </div>
          <h2 className="text-3xl font-serif text-[#1E2A49] mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to find your perfect match</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched, errors, status, setFieldValue }) => (
              <Form className="space-y-6" noValidate>
                {(error || status) && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {status || error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                        touched.email && errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                        touched.password && errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-[#1E2A49] focus:ring-[#1E2A49] border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="text-sm text-[#1E2A49] hover:text-[#F8CACA] transition-colors focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className="bg-[#1E2A49] hover:bg-[#2a3c69] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-[#1E2A49] hover:text-[#F8CACA] font-medium transition-colors focus:outline-none focus:underline"
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Demo credentials: demo@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;