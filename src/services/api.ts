// API Configuration and Service Layer using Axios
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    isVerified: boolean;
    profileComplete: boolean;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignupResponse {
  user: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    isVerified: boolean;
  };
  token: string;
  refreshToken: string;
  verificationRequired: boolean;
}

// Request Payload Types
export interface LoginPayload {
  emailId: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    ipAddress?: string;
  };
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword:string;
  dateOfBirth: string;
  gender: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  subscribeNewsletter?: boolean;
  referralCode?: string;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    ipAddress?: string;
  };
}

export interface ForgotPasswordPayload {
  email: string;
  redirectUrl?: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailPayload {
  token: string;
  email: string;
}

export interface ResendVerificationPayload {
  email: string;
}

// Custom API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Device Info Helper
const getDeviceInfo = () => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  // Note: IP address would be determined server-side
});

// Create Axios Instance
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds timeout
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client-Version': '1.0.0',
      'X-Platform': 'web',
    },
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log request in development
      if (import.meta.env.MODE === 'development') {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }
      
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.MODE === 'development') {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }
      
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;
      
      // Handle token refresh for 401 errors
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
              refreshToken
            });
            
            const { token } = response.data.data;
            localStorage.setItem('auth_token', token);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/login';
        }
      }
      
      // Log error in development
      if (import.meta.env.MODE === 'development') {
        console.error('❌ API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create axios instance
const apiClient = createAxiosInstance();

// Generic API call wrapper
const apiCall = async <T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<ApiResponse<T>> => {
  try {
    const { method = 'GET', data, params, headers } = options;
    
    const response = await apiClient.request({
      url: endpoint,
      method,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      if (axiosError.response) {
        // Server responded with error status
        const { status, data } = axiosError.response;
        throw new ApiError(
          data?.message || `HTTP error! status: ${status}`,
          status,
          data?.errors
        );
      } else if (axiosError.request) {
        // Request was made but no response received
        throw new ApiError(
          'Network error. Please check your connection and try again.',
          0
        );
      } else {
        // Something else happened
        throw new ApiError(
          axiosError.message || 'An unexpected error occurred.',
          0
        );
      }
    }
    
    // Non-axios error
    throw new ApiError(
      'An unexpected error occurred. Please try again.',
      0
    );
  }
};

// Authentication API Services
export const authApi = {
  // POST /auth/login
  login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const loginData = {
      ...payload,
    };

    return apiCall<LoginResponse>('/auth/login', {
      method: 'POST',
      data: loginData,
    });
  },

  // POST /auth/register
  signup: async (payload: SignupPayload): Promise<ApiResponse<SignupResponse>> => {
    const signupData = {
      ...payload,
    };

    return apiCall<SignupResponse>('/auth/signup', {
      method: 'POST',
      data: signupData,
    });
  },

  // POST /auth/forgot-password
  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ApiResponse> => {
    const forgotPasswordData = {
      ...payload,
      redirectUrl: `${window.location.origin}/reset-password`,
    };

    return apiCall('/auth/forgot-password', {
      method: 'POST',
      data: forgotPasswordData,
    });
  },

  // POST /auth/reset-password
  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse> => {
    return apiCall('/auth/reset-password', {
      method: 'POST',
      data: payload,
    });
  },

  // POST /auth/verify-email
  verifyEmail: async (payload: VerifyEmailPayload): Promise<ApiResponse> => {
    return apiCall('/auth/verify-email', {
      method: 'POST',
      data: payload,
    });
  },

  // POST /auth/resend-verification
  resendVerification: async (payload: ResendVerificationPayload): Promise<ApiResponse> => {
    return apiCall('/auth/resend-verification', {
      method: 'POST',
      data: payload,
    });
  },

  // POST /auth/logout
  logout: async (): Promise<ApiResponse> => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    return apiCall('/auth/logout', {
      method: 'POST',
      data: { refreshToken },
    });
  },

  // POST /auth/refresh-token
  refreshToken: async (): Promise<ApiResponse<{ token: string; expiresIn: number }>> => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    return apiCall('/auth/refresh-token', {
      method: 'POST',
      data: { refreshToken },
    });
  },

  // GET /auth/me
  getCurrentUser: async (): Promise<ApiResponse<LoginResponse['user']>> => {
    return apiCall('/auth/me', {
      method: 'GET',
    });
  },
};

// Profile API Services (for future use)
export const profileApi = {
  // GET /profile/me
  getProfile: async (): Promise<ApiResponse> => {
    return apiCall('/profile/me', {
      method: 'GET',
    });
  },

  // PUT /profile/me
  updateProfile: async (payload: any): Promise<ApiResponse> => {
    return apiCall('/profile/me', {
      method: 'PUT',
      data: payload,
    });
  },

  // POST /profile/upload-photo
  uploadPhoto: async (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('photo', file);

    return apiCall('/profile/upload-photo', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Connections API Services (for future use)
export const connectionsApi = {
  // GET /connections
  getConnections: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse> => {
    return apiCall('/connections', {
      method: 'GET',
      params,
    });
  },

  // POST /connections/send-request
  sendConnectionRequest: async (payload: {
    userId: string;
    message?: string;
  }): Promise<ApiResponse> => {
    return apiCall('/connections/send-request', {
      method: 'POST',
      data: payload,
    });
  },

  // PUT /connections/:id/respond
  respondToRequest: async (
    connectionId: string,
    payload: { action: 'accept' | 'decline'; message?: string }
  ): Promise<ApiResponse> => {
    return apiCall(`/connections/${connectionId}/respond`, {
      method: 'PUT',
      data: payload,
    });
  },
};

// Export axios instance for direct use if needed
export { apiClient };
export default apiClient;