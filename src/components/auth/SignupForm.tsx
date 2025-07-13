import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Mail, Lock, User, Heart, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onBackToLanding: () => void;
}

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  subscribeNewsletter: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onBackToLanding }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { signup, loading, error } = useAuth();

  const initialValues: SignupFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: false
  };

  const step1ValidationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
      .required('Last name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
      .required('Phone number is required')
  });

  const step2ValidationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*\d)/, 'Password must contain at least one number')
      .matches(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character (@$!%*?&)')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Please confirm your password'),
    dateOfBirth: Yup.date()
      .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years old') // 18 years ago
      .min(new Date(Date.now() - 3155760000000), 'Please enter a valid date of birth') // 100 years ago
      .required('Date of birth is required'),
    gender: Yup.string()
      .required('Please select your gender'),
    agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must agree to the Terms of Service')
  });

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[@$!%*?&])/.test(password)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const handleNextStep = async (values: SignupFormValues, { validateForm }: any) => {
    const errors = await validateForm();
    const step1Fields = ['firstName', 'lastName', 'email', 'phone'];
    const hasStep1Errors = step1Fields.some(field => errors[field]);
    
    if (!hasStep1Errors) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (values: SignupFormValues, { setStatus }: any) => {
    try {
      setStatus(null);
      
      // For now, we'll use the existing signup function
      // In a real implementation, you'd want to update the AuthContext
      // to handle the full signup payload
      const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`;
      
      // TODO: Update AuthContext to accept full signup payload
      // For now, we'll pass the basic info and store additional data
      const success = await signup(fullName, values.email, values.password,values.confirmPassword,values.dateOfBirth,values.gender,values.phone);
      
      if (!success) {
        setStatus('Registration failed. Please try again.');
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
          <h2 className="text-3xl font-serif text-[#1E2A49] mb-2">Create Account</h2>
          <p className="text-gray-600">Join thousands finding their perfect match</p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-6 mb-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-[#1E2A49] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </div>
              <div className={`w-16 h-1 mx-2 ${currentStep >= 2 ? 'bg-[#1E2A49]' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-[#1E2A49] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Step {currentStep} of 2: {currentStep === 1 ? 'Basic Information' : 'Account Security'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={currentStep === 1 ? step1ValidationSchema : step2ValidationSchema}
            onSubmit={currentStep === 1 ? () => {} : handleSubmit}
          >
            {({ values, touched, errors, status, validateForm }) => {
              const passwordStrength = getPasswordStrength(values.password);
              
              return (
                <Form className="space-y-6" noValidate>
                  {(error || status) && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {status || error}
                    </div>
                  )}

                  {currentStep === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <div className="relative">
                            <Field
                              id="firstName"
                              name="firstName"
                              type="text"
                              autoComplete="given-name"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                                touched.firstName && errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="First name"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                          <ErrorMessage name="firstName" component="p" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <div className="relative">
                            <Field
                              id="lastName"
                              name="lastName"
                              type="text"
                              autoComplete="family-name"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                                touched.lastName && errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="Last name"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                          <ErrorMessage name="lastName" component="p" className="mt-1 text-sm text-red-600" />
                        </div>
                      </div>

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
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Field
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                              touched.phone && errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Enter your phone number"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <Field
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                              touched.password && errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Create a strong password"
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
                        
                        {/* Password Strength Indicator */}
                        {values.password && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Password strength:</span>
                              <span className={`font-medium ${
                                passwordStrength.score <= 2 ? 'text-red-600' :
                                passwordStrength.score <= 3 ? 'text-yellow-600' :
                                passwordStrength.score <= 4 ? 'text-blue-600' : 'text-green-600'
                              }`}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                              touched.confirmPassword && errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Confirm your password"
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth *
                          </label>
                          <Field
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                              touched.dateOfBirth && errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          <ErrorMessage name="dateOfBirth" component="p" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                            Gender *
                          </label>
                          <Field
                            as="select"
                            id="gender"
                            name="gender"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent transition-colors ${
                              touched.gender && errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                          <ErrorMessage name="gender" component="p" className="mt-1 text-sm text-red-600" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Field
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            className="h-4 w-4 text-[#1E2A49] focus:ring-[#1E2A49] border-gray-300 rounded mt-1"
                          />
                          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="text-[#1E2A49] hover:text-[#F8CACA] transition-colors underline">
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-[#1E2A49] hover:text-[#F8CACA] transition-colors underline">
                              Privacy Policy
                            </a> *
                          </label>
                        </div>
                        <ErrorMessage name="agreeToTerms" component="p" className="text-sm text-red-600" />

                        <div className="flex items-start">
                          <Field
                            id="subscribeNewsletter"
                            name="subscribeNewsletter"
                            type="checkbox"
                            className="h-4 w-4 text-[#1E2A49] focus:ring-[#1E2A49] border-gray-300 rounded mt-1"
                          />
                          <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-gray-700">
                            Subscribe to our newsletter for dating tips and success stories
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4">
                    {currentStep === 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Previous
                      </Button>
                    )}
                    
                    {currentStep === 1 ? (
                      <Button
                        type="button"
                        fullWidth
                        size="large"
                        onClick={() => handleNextStep(values, { validateForm })}
                        className="bg-[#1E2A49] hover:bg-[#2a3c69]"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="large"
                        loading={loading}
                        disabled={loading}
                        className="flex-1 bg-[#1E2A49] hover:bg-[#2a3c69] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    )}
                  </div>

                  <div className="text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-[#1E2A49] hover:text-[#F8CACA] font-medium transition-colors focus:outline-none focus:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;