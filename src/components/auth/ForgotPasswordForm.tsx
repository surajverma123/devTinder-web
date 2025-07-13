import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Mail, ArrowLeft, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
  onBackToLanding: () => void;
}

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSwitchToLogin, 
  onBackToLanding 
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { forgotPassword, loading, error } = useAuth();

  const initialValues: ForgotPasswordFormValues = {
    email: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
  });

  const handleSubmit = async (values: ForgotPasswordFormValues, { setStatus }: any) => {
    try {
      setStatus(null);
      const success = await forgotPassword(values.email);
      if (success) {
        setSubmittedEmail(values.email);
        setIsSubmitted(true);
        setResendCount(prev => prev + 1);
        
        // Disable resend for 60 seconds
        setCanResend(false);
        setTimeout(() => setCanResend(true), 60000);
      } else {
        setStatus('Failed to send reset email. Please check your email address and try again.');
      }
    } catch (err: any) {
      setStatus(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleResend = async () => {
    if (!canResend || !submittedEmail) return;
    
    try {
      const success = await forgotPassword(submittedEmail);
      if (success) {
        setResendCount(prev => prev + 1);
        
        // Disable resend for 60 seconds
        setCanResend(false);
        setTimeout(() => setCanResend(true), 60000);
      }
    } catch (err) {
      console.error('Failed to resend email:', err);
    }
  };

  if (isSubmitted) {
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
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-serif text-[#1E2A49] mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{submittedEmail}</strong>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-blue-800 mb-1">What's next?</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Check your email inbox and spam folder</li>
                      <li>• Click the reset link in the email</li>
                      <li>• Create a new secure password</li>
                      <li>• Sign in with your new password</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleResend}
                  variant="outline"
                  fullWidth
                  loading={loading}
                  disabled={!canResend || loading}
                  className={!canResend ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {loading ? 'Sending...' : canResend ? 'Resend Email' : 'Wait 60s to Resend'}
                </Button>
                
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  fullWidth
                >
                  Try Different Email
                </Button>
                
                <Button
                  onClick={onSwitchToLogin}
                  fullWidth
                  className="bg-[#1E2A49] hover:bg-[#2a3c69]"
                  icon={<ArrowLeft size={18} />}
                >
                  Back to Login
                </Button>
              </div>
              
              {resendCount > 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  Email sent {resendCount} time{resendCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-serif text-[#1E2A49] mb-2">Forgot Password?</h2>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, status }) => (
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
                      placeholder="Enter your email address"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 mb-1">Security Notice</h3>
                      <p className="text-sm text-gray-600">
                        For your security, we'll send the reset link to the email address associated with your account. 
                        The link will expire in 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  loading={loading}
                  disabled={loading}
                  className="bg-[#1E2A49] hover:bg-[#2a3c69] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">Remember your password? </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[#1E2A49] hover:text-[#F8CACA] font-medium transition-colors inline-flex items-center focus:outline-none focus:underline"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;