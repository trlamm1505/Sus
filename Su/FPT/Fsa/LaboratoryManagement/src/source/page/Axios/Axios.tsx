import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Base URL cho API - sử dụng proxy trong development
const BASE_URL = (typeof window !== 'undefined' && (window as any).REACT_APP_API_URL) || '/api';

// Tạo instance axios với cấu hình cơ bản
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request Interceptor - Thêm token vào header
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request (chỉ trong development)
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            console.log('🚀 Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
                headers: config.headers,
            });
        }

        return config;
    },
    (error: AxiosError) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor - Xử lý response và error
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response (chỉ trong development)
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            console.log('✅ Response:', {
                status: response.status,
                data: response.data,
                url: response.config.url,
            });
        }

        return response;
    },
    (error: AxiosError) => {
        // Xử lý các lỗi HTTP
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Token hết hạn hoặc không hợp lệ
                    console.error('🔒 Unauthorized - Token expired or invalid');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('userId');
                    // Redirect to login page
                    window.location.href = '/login';
                    break;

                case 403:
                    console.error('🚫 Forbidden - Access denied');
                    break;

                case 404:
                    console.error('🔍 Not Found - Resource not found');
                    break;

                case 422:
                    console.error('📝 Validation Error:', data);
                    break;

                case 500:
                    console.error('💥 Server Error - Internal server error');
                    break;

                default:
                    console.error(`❌ HTTP Error ${status}:`, data);
            }
        } else if (error.request) {
            // Network error
            console.error('🌐 Network Error:', error.message);
        } else {
            // Other error
            console.error('❌ Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// API Methods
export const api = {
    // GET request
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.get<T>(url, config);
    },

    // POST request
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.post<T>(url, data, config);
    },

    // PUT request
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.put<T>(url, data, config);
    },

    // PATCH request
    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.patch<T>(url, data, config);
    },

    // DELETE request
    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosInstance.delete<T>(url, config);
    },
};

// Auth API endpoints
export const authAPI = {
    // Đăng nhập
    login: (credentials: { username: string; password: string }) => {
        return api.post('/auth/login', credentials);
    },

    // Đăng ký
    register: (userData: { username: string; password: string; email: string; fullName: string; role: string }) => {
        return api.post('/auth/register', userData);
    },

    // Quên mật khẩu - gửi email
    forgotPassword: (email: string) => {
        return api.post('/auth/forgot-password', { email });
    },

    // Đặt lại mật khẩu với token
    resetPassword: (token: string, newPassword: string) => {
        return api.post(`/auth/reset-password/${token}`, { newPassword });
    },
};

// Utility functions
export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
};

// Export default instance
export default axiosInstance;
