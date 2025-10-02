import React, { useState, useEffect } from 'react';
import '../../CSS/Login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../Axios/Axios';



// Google OAuth removed in demo mode (package not installed)




// ===== Types =====
type NotificationType = 'success' | 'error' | '';

type NotificationState = {
    visible: boolean;
    message: string;
    type: NotificationType;
};

type RegisterData = {
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type LoginData = {
    userName: string;
    password: string;
};

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    // Google OAuth removed



    // Đăng ký
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registerStep, setRegisterStep] = useState<number>(1); // 1: Nhập info, 2: Nhập OTP
    const [registerOtp, setRegisterOtp] = useState<string>('');
    const [registeringEmail, setRegisteringEmail] = useState<string>('');

    // Đăng nhập
    const [loginData, setLoginData] = useState<LoginData>({
        userName: '',
        password: ''
    });

    // Login validation errors
    const [loginErrors, setLoginErrors] = useState<{
        userName: string;
        password: string;
    }>({
        userName: '',
        password: ''
    });

    // Thông báo
    const [notification, setNotification] = useState<NotificationState>({
        visible: false,
        message: '',
        type: ''
    });

    // Validation errors
    const [registerErrors, setRegisterErrors] = useState<{
        name: string;
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>({
        name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Password visibility
    const [showPassword, setShowPassword] = useState<boolean>(false); // Mặc định ẩn password
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // Mặc định ẩn password

    // Quên mật khẩu
    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
    const [forgotStep, setForgotStep] = useState<number>(1); // 1: nhập email, 2: chờ xác nhận, 3: nhập password mới
    const [forgotEmail, setForgotEmail] = useState<string>('');
    const [forgotNewPassword, setForgotNewPassword] = useState<string>('');
    const [forgotConfirmPassword, setForgotConfirmPassword] = useState<string>('');
    const [forgotOtp, setForgotOtp] = useState<string>('');
    const [resetToken, setResetToken] = useState<string>(''); // Token từ URL hoặc email

    // Forgot password validation errors
    const [forgotErrors, setForgotErrors] = useState<{
        email: string;
        newPassword: string;
        confirmPassword: string;
    }>({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Forgot password visibility
    const [showForgotNewPassword, setShowForgotNewPassword] = useState<boolean>(false);
    const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || '/guest/home';



    // Thông báo
    const showNotification = (message: string, type: NotificationType) => {
        setNotification({
            visible: true,
            message,
            type
        });

        // Auto hide after 3 seconds
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    useEffect(() => {
        if (window.location.hash === '#signup') setIsSignUp(true);

        // Check for reset token in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            setResetToken(tokenFromUrl);
            setShowForgotPassword(true);
            setForgotStep(3); // Go directly to password reset step
        }
    }, []);

    // ======= Đăng nhập =======
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Validate all fields
        const errors = {
            userName: !loginData.userName.trim() ? 'User Name cannot be empty' : '',
            password: !loginData.password ? 'Password cannot be empty' : ''
        };

        setLoginErrors(errors);

        // Check if any errors exist
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        try {
            // Call login API - match backend format
            const response = await authAPI.login({
                username: loginData.userName,  // Backend expects 'username', not 'userName'
                password: loginData.password
            });

            console.log('Login successful:', response.data);

            // Store token and user info
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            if (response.data.user) {
                localStorage.setItem('userRole', response.data.user.role || 'patient');
                localStorage.setItem('userId', response.data.user.id || response.data.user._id);
                localStorage.setItem('userName', response.data.user.userName);
            }

            showNotification('Login successful!', 'success');

            // Navigate to appropriate dashboard based on user role
            const userRole = response.data.user?.role || 'patient';
            if (userRole === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/patient/dashboard', { replace: true });
            }

        } catch (error: any) {
            console.error('Login failed:', error);

            // Handle specific error messages from server
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'error');
            } else if (error.response?.status === 401) {
                showNotification('Invalid username or password. Please try again.', 'error');
            } else if (error.response?.status === 404) {
                showNotification('User not found. Please check your username.', 'error');
            } else {
                showNotification('Login failed. Please try again later.', 'error');
            }
        }
    };

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        if (password.length < 8 || password.length > 12) return false;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers;
    };

    // ======= Đăng ký 2 bước =======
    // Bước 1: Gửi info -> gửi OTP về email
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Validate all fields
        const errors = {
            name: registerData.name.trim() ? '' : 'Full name cannot be empty',
            userName: registerData.userName.trim() ? '' : 'User Name cannot be empty',
            email: !registerData.email.trim() ? 'Email cannot be empty' :
                !validateEmail(registerData.email) ? 'Email must be @gmail.com format' : '',
            password: !registerData.password ? 'Password cannot be empty' :
                !validatePassword(registerData.password) ? 'Password must be 8-12 characters with uppercase, lowercase and numbers' : '',
            confirmPassword: !registerData.confirmPassword ? 'Confirm password cannot be empty' : ''
        };

        setRegisterErrors(errors);

        // Check if any errors exist
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setRegisterErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return;
        }

        try {
            console.log('🚀 Attempting registration with data:', {
                name: registerData.name,
                userName: registerData.userName,
                email: registerData.email,
                password: '***hidden***'
            });

            // Call register API - match backend format
            const response = await authAPI.register({
                username: registerData.userName,  // Backend expects 'username', not 'userName'
                password: registerData.password,
                email: registerData.email,
                fullName: registerData.name,      // Backend expects 'fullName', not 'name'
                role: "user"                      // Backend expects 'role' field
            });

            console.log('✅ Registration successful:', response.data);

            // Go to OTP step
            setRegisteringEmail(registerData.email);
            setRegisterStep(2);
            showNotification('Registration successful! Please check your email for confirmation.', 'success');

        } catch (error: any) {
            console.error('❌ Registration failed - Full error:', error);
            console.error('❌ Error response:', error.response);
            console.error('❌ Error message:', error.message);
            console.error('❌ Error status:', error.response?.status);
            console.error('❌ Error data:', error.response?.data);

            // Handle specific error messages from server
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'error');
            } else if (error.response?.status === 400) {
                showNotification('Invalid registration data. Please check your information.', 'error');
            } else if (error.response?.status === 409) {
                showNotification('User already exists. Please try with different email or username.', 'error');
            } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
                showNotification('Cannot connect to server. Please check if the server is running on http://localhost:5000', 'error');
            } else {
                showNotification(`Registration failed: ${error.message || 'Unknown error'}`, 'error');
            }
        }
    };

    // Bước 2: Xác thực OTP
    const handleRegisterOtp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!registerOtp || registerOtp.length !== 4) {
            showNotification('Vui lòng nhập đủ mã OTP 4 số.', 'error');
            return;
        }
        // Demo only: complete registration and reset to login
        showNotification('Đăng ký thành công! (demo) Vui lòng đăng nhập.', 'success');
        setRegisterStep(1);
        setIsSignUp(false);
        setRegisterData({ name: '', userName: '', email: '', password: '', confirmPassword: '' });
        setRegisterOtp('');
        setRegisteringEmail('');
    };

    // ======= Quên mật khẩu 2 bước =======
    // Bước 1: Chỉ nhập email và gửi xác nhận
    const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Validate email
        const emailError = !forgotEmail.trim() ? 'Email cannot be empty' :
            !validateEmail(forgotEmail) ? 'Email must be @gmail.com format' : '';

        setForgotErrors(prev => ({ ...prev, email: emailError }));

        if (emailError) {
            return;
        }

        try {
            console.log('🚀 Sending forgot password request for:', forgotEmail);

            // Call forgot password API
            const response = await authAPI.forgotPassword(forgotEmail);

            console.log('✅ Forgot password request successful:', response.data);

            // Proceed to step 2 (email confirmation sent)
            setForgotStep(2);
            showNotification('Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư.', 'success');

        } catch (error: any) {
            console.error('❌ Forgot password request failed:', error);

            // Handle specific error messages from server
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'error');
            } else if (error.response?.status === 404) {
                showNotification('Email không tồn tại trong hệ thống.', 'error');
            } else if (error.response?.status === 400) {
                showNotification('Email không hợp lệ.', 'error');
            } else {
                showNotification('Không thể gửi email xác nhận. Vui lòng thử lại sau.', 'error');
            }
        }
    };

    // Bước 3: Nhập mật khẩu mới sau khi xác nhận email
    const handlePasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Validate all fields
        const errors = {
            email: '',
            newPassword: !forgotNewPassword ? 'Password cannot be empty' :
                !validatePassword(forgotNewPassword) ? 'Password must be 8-12 characters with uppercase, lowercase and numbers' : '',
            confirmPassword: !forgotConfirmPassword ? 'Confirm password cannot be empty' : ''
        };

        setForgotErrors(errors);

        // Check if any errors exist
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        if (forgotNewPassword !== forgotConfirmPassword) {
            setForgotErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return;
        }

        // Check if we have a reset token
        if (!resetToken) {
            showNotification('Token xác thực không hợp lệ. Vui lòng thử lại.', 'error');
            return;
        }

        try {
            console.log('🚀 Resetting password with token:', resetToken);

            // Call reset password API with token
            const response = await authAPI.resetPassword(resetToken, forgotNewPassword);

            console.log('✅ Password reset successful:', response.data);

            showNotification('Đổi mật khẩu thành công!', 'success');

            // Reset form and close modal
            setTimeout(() => {
                setShowForgotPassword(false);
                setForgotStep(1);
                setForgotEmail('');
                setForgotNewPassword('');
                setForgotConfirmPassword('');
                setForgotOtp('');
                setResetToken('');
                setForgotErrors({ email: '', newPassword: '', confirmPassword: '' });
            }, 1500);

        } catch (error: any) {
            console.error('❌ Password reset failed:', error);

            // Handle specific error messages from server
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'error');
            } else if (error.response?.status === 400) {
                showNotification('Token không hợp lệ hoặc đã hết hạn.', 'error');
            } else if (error.response?.status === 404) {
                showNotification('Yêu cầu đặt lại mật khẩu không tồn tại.', 'error');
            } else {
                showNotification('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.', 'error');
            }
        }
    };

    // ======= Giao diện =======
    return (
        <div className="auth-container">
            {/* Notification */}
            {notification.visible && (
                <div
                    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                >
                    {notification.message}
                </div>
            )}

            {/* Quên mật khẩu 2 bước */}
            {showForgotPassword && (
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                        background: 'rgba(0,0,0,0.3)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onClick={() => {
                        setShowForgotPassword(false);
                        setForgotStep(1);
                        setForgotEmail('');
                        setForgotNewPassword('');
                        setForgotConfirmPassword('');
                        setForgotOtp('');
                        setResetToken('');
                        setForgotErrors({ email: '', newPassword: '', confirmPassword: '' });
                    }}
                >
                    <div
                        style={{
                            background: '#fff', padding: 24, borderRadius: 12, minWidth: 280,
                            maxWidth: 380, width: '90vw', height: 'auto',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">Forgot Password</h3>
                        {forgotStep === 1 ? (
                            <form onSubmit={handleForgotSubmit}>
                                <div className="flex flex-col">
                                    <input
                                        type="email"
                                        className={`w-full h-[42px] px-3 py-2 rounded-md bg-gray-100 border focus:outline-none mb-1 text-sm ${forgotErrors.email ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="Enter registered email"
                                        value={forgotEmail}
                                        onChange={e => {
                                            setForgotEmail(e.target.value);
                                            // Real-time validation
                                            let error = '';
                                            if (!e.target.value.trim()) {
                                                error = 'Email cannot be empty';
                                            } else if (!validateEmail(e.target.value)) {
                                                error = 'Email must be @gmail.com format';
                                            }
                                            setForgotErrors(prev => ({ ...prev, email: error }));
                                        }}
                                        required
                                    />
                                    {forgotErrors.email && (
                                        <span className="text-red-500 text-xs mb-3 ml-1">{forgotErrors.email}</span>
                                    )}
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-sky-300 to-violet-400 text-white font-semibold rounded-full px-6 py-2 text-sm mt-2">
                                    Send Confirmation Email
                                </button>
                            </form>
                        ) : forgotStep === 2 ? (
                            <div>
                                <p className="mb-3 text-gray-700 text-sm">A confirmation link has been sent to <strong>{forgotEmail}</strong>. Please check your email and click the link, or enter the token from the email below:</p>
                                <div className="flex flex-col mb-3">
                                    <input
                                        type="text"
                                        className="w-full h-[42px] px-3 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none mb-2 text-sm"
                                        placeholder="Enter reset token from email"
                                        value={resetToken}
                                        onChange={e => setResetToken(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!resetToken.trim()) {
                                            showNotification('Vui lòng nhập token từ email.', 'error');
                                            return;
                                        }
                                        setForgotStep(3);
                                    }}
                                    className="w-full bg-gradient-to-r from-sky-300 to-violet-400 text-white font-semibold rounded-full px-6 py-2 text-sm mb-2"
                                >
                                    Continue with Token
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowForgotPassword(false); setForgotStep(1); setForgotEmail(''); setForgotNewPassword(''); setForgotConfirmPassword(''); setForgotOtp(''); setResetToken(''); setForgotErrors({ email: '', newPassword: '', confirmPassword: '' }); }}
                                    className="w-full bg-gray-400 text-white font-semibold rounded-full px-6 py-2 text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handlePasswordResetSubmit}>
                                <p className="mb-3 text-gray-700 text-sm">Enter your new password:</p>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type={showForgotNewPassword ? "text" : "password"}
                                            className={`w-full h-[42px] px-3 py-2 pr-10 rounded-md bg-gray-100 border focus:outline-none mb-1 text-sm ${forgotErrors.newPassword ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="Enter new password"
                                            value={forgotNewPassword}
                                            onChange={e => {
                                                setForgotNewPassword(e.target.value);
                                                // Real-time validation
                                                let error = '';
                                                if (!e.target.value) {
                                                    error = 'Password cannot be empty';
                                                } else if (!validatePassword(e.target.value)) {
                                                    error = 'Password must be 8-12 characters with uppercase, lowercase and numbers';
                                                }
                                                setForgotErrors(prev => ({ ...prev, newPassword: error }));
                                            }}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                                        >
                                            {showForgotNewPassword ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {forgotErrors.newPassword && (
                                        <span className="text-red-500 text-xs mb-2 ml-1">{forgotErrors.newPassword}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type={showForgotConfirmPassword ? "text" : "password"}
                                            className={`w-full h-[42px] px-3 py-2 pr-10 rounded-md bg-gray-100 border focus:outline-none mb-1 text-sm ${forgotErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                                            placeholder="Confirm new password"
                                            value={forgotConfirmPassword}
                                            onChange={e => {
                                                setForgotConfirmPassword(e.target.value);
                                                // Real-time validation
                                                let error = '';
                                                if (!e.target.value) {
                                                    error = 'Confirm password cannot be empty';
                                                } else if (e.target.value !== forgotNewPassword) {
                                                    error = 'Passwords do not match';
                                                }
                                                setForgotErrors(prev => ({ ...prev, confirmPassword: error }));
                                            }}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                                        >
                                            {showForgotConfirmPassword ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {forgotErrors.confirmPassword && (
                                        <span className="text-red-500 text-xs mb-2 ml-1">{forgotErrors.confirmPassword}</span>
                                    )}
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-sky-300 to-violet-400 text-white font-semibold rounded-full px-6 py-2 text-sm mt-2">
                                    Reset Password
                                </button>
                            </form>
                        )}
                        <button
                            onClick={() => {
                                setShowForgotPassword(false);
                                setForgotStep(1);
                                setForgotEmail('');
                                setForgotNewPassword('');
                                setForgotConfirmPassword('');
                                setForgotOtp('');
                                setResetToken('');
                                setForgotErrors({ email: '', newPassword: '', confirmPassword: '' });
                            }}
                            style={{ position: 'absolute', top: 8, right: 16, fontSize: 24, color: '#aaa', border: 'none', background: 'none', cursor: 'pointer' }}
                            aria-label="Close"
                        >×</button>
                    </div>
                </div>
            )}

            {/* Đăng ký 2 bước */}
            <div className={`auth-box ${isSignUp ? 'right-panel-active' : ''}`} id="authBox">
                {/* Đăng ký step 1 */}
                {isSignUp && registerStep === 1 && (
                    <div className="form-container sign-up-container ">
                        <form className="form" onSubmit={handleRegister}>
                            <h2 className="text-6xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-6">Sign Up</h2>
                            <div className="mt-6 flex flex-col items-center space-y-3">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className={`w-[450px] h-[60px] px-4 py-2 rounded-md bg-gray-100 border focus:outline-none ${registerErrors.name ? 'border-red-500' : 'border-gray-200'}`}
                                        value={registerData.name}
                                        onChange={e => {
                                            setRegisterData({ ...registerData, name: e.target.value });
                                            // Real-time validation
                                            const error = e.target.value.trim() ? '' : 'Full name cannot be empty';
                                            setRegisterErrors(prev => ({ ...prev, name: error }));
                                        }}
                                    />
                                    {registerErrors.name && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{registerErrors.name}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        className={`w-[450px] h-[60px] px-4 py-2 rounded-md bg-gray-100 border focus:outline-none ${registerErrors.userName ? 'border-red-500' : 'border-gray-200'}`}
                                        value={registerData.userName}
                                        onChange={e => {
                                            setRegisterData({ ...registerData, userName: e.target.value });
                                            // Real-time validation
                                            const error = e.target.value.trim() ? '' : 'User Name cannot be empty';
                                            setRegisterErrors(prev => ({ ...prev, userName: error }));
                                        }}
                                    />
                                    {registerErrors.userName && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{registerErrors.userName}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className={`w-[450px] h-[60px] px-4 py-2 rounded-md bg-gray-100 border focus:outline-none ${registerErrors.email ? 'border-red-500' : 'border-gray-200'}`}
                                        value={registerData.email}
                                        onChange={e => {
                                            setRegisterData({ ...registerData, email: e.target.value });
                                            // Real-time validation
                                            let error = '';
                                            if (!e.target.value.trim()) {
                                                error = 'Email cannot be empty';
                                            } else if (!validateEmail(e.target.value)) {
                                                error = 'Email must be @gmail.com format';
                                            }
                                            setRegisterErrors(prev => ({ ...prev, email: error }));
                                        }}
                                    />
                                    {registerErrors.email && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{registerErrors.email}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className={`w-[450px] h-[60px] px-4 py-2 pr-12 rounded-md bg-gray-100 border focus:outline-none ${registerErrors.password ? 'border-red-500' : 'border-gray-200'}`}
                                            value={registerData.password}
                                            onChange={e => {
                                                setRegisterData({ ...registerData, password: e.target.value });
                                                // Real-time validation
                                                let error = '';
                                                if (!e.target.value) {
                                                    error = 'Password cannot be empty';
                                                } else if (!validatePassword(e.target.value)) {
                                                    error = 'Password must be 8-12 characters with uppercase, lowercase and numbers';
                                                }
                                                setRegisterErrors(prev => ({ ...prev, password: error }));
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {registerErrors.password && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{registerErrors.password}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            className={`w-[450px] h-[60px] px-4 py-2 pr-12 rounded-md bg-gray-100 border focus:outline-none ${registerErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                                            value={registerData.confirmPassword}
                                            onChange={e => {
                                                setRegisterData({ ...registerData, confirmPassword: e.target.value });
                                                // Real-time validation
                                                let error = '';
                                                if (!e.target.value) {
                                                    error = 'Confirm password cannot be empty';
                                                } else if (e.target.value !== registerData.password) {
                                                    error = 'Passwords do not match';
                                                }
                                                setRegisterErrors(prev => ({ ...prev, confirmPassword: error }));
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {registerErrors.confirmPassword && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{registerErrors.confirmPassword}</span>
                                    )}
                                </div>
                                <button type="submit" className="bg-gradient-to-r from-sky-300 to-violet-400 text-white text-xl font-semibold rounded-full px-20 py-4 mt-4">
                                    SIGN UP
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {/* Đăng ký step 2 */}
                {isSignUp && registerStep === 2 && (
                    <div className="form-container sign-up-container">
                        <div className="form">
                            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-[20px]">Confirmation sent to email</h2>
                            <p className="text-lg text-gray-600 mb-6 px-4 text-center">Please check your inbox to complete registration.</p>
                            <button
                                type="button"
                                onClick={() => { setRegisterStep(1); setIsSignUp(false); setRegisterOtp(''); }}
                                className="bg-gradient-to-r from-sky-300 to-violet-400 text-white text-xl font-semibold rounded-full px-20 py-4"
                            >
                                BACK TO SIGN IN
                            </button>
                        </div>
                    </div>
                )}
                {/* Đăng nhập */}
                {!isSignUp && (
                    <div className="form-container sign-in-container ">
                        <form className="form" onSubmit={handleLogin} noValidate>
                            <h2 className="text-7xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text mb-10">Sign In</h2>
                            <div className="mt-15 flex flex-col items-center space-y-5">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        className={`w-[450px] h-[60px] px-4 py-2 rounded-md bg-gray-100 border focus:outline-none ${loginErrors.userName ? 'border-red-500' : 'border-gray-200'}`}
                                        value={loginData.userName}
                                        onChange={e => {
                                            setLoginData({ ...loginData, userName: e.target.value });
                                            // Real-time validation
                                            const error = e.target.value.trim() ? '' : 'User Name cannot be empty';
                                            setLoginErrors(prev => ({ ...prev, userName: error }));
                                        }}
                                    />
                                    {loginErrors.userName && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{loginErrors.userName}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className={`w-[450px] h-[60px] px-4 py-2 rounded-md bg-gray-100 border focus:outline-none ${loginErrors.password ? 'border-red-500' : 'border-gray-200'}`}
                                        value={loginData.password}
                                        onChange={e => {
                                            setLoginData({ ...loginData, password: e.target.value });
                                            // Real-time validation
                                            const error = e.target.value ? '' : 'Password cannot be empty';
                                            setLoginErrors(prev => ({ ...prev, password: error }));
                                        }}
                                    />
                                    {loginErrors.password && (
                                        <span className="text-red-500 text-sm mt-1 ml-1">{loginErrors.password}</span>
                                    )}
                                </div>
                                <a
                                    href="#"
                                    className="text-xl text-black-500 underline block"
                                    onClick={e => { e.preventDefault(); setShowForgotPassword(true); }}
                                >
                                    Forgot Password?
                                </a>
                                <button type="submit" className="bg-gradient-to-r from-sky-300 to-violet-400 text-white text-xl font-semibold rounded-full px-20 py-5 mt-6 ">
                                    SIGN IN
                                </button>

                                {/* Google login removed */}

                            </div>
                        </form>
                    </div>
                )}

                {/* Overlay */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2 className="text-6xl font-bold mb-3">Welcome Back!</h2>
                            <p className="mb-5 text-center px-6 text-xl mt-5">To continue connecting with us, please sign in with your personal information</p>
                            <button
                                onClick={() => { setIsSignUp(false); setRegisterStep(1); setRegisterOtp(''); }}
                                className="group border border-white text-white text-lg font-semibold rounded-full px-16 py-4 mt-6 bg-transparent transition hover:bg-white"
                            >
                                <span className="transition group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-300 group-hover:to-violet-400">SIGN IN</span>
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2 className="text-6xl font-bold mb-3">Hello New Friend!</h2>
                            <p className="mb-5 text-center px-6 text-xl mt-5">Please enter your personal information to start your journey with us</p>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="group border border-white text-white text-lg font-semibold rounded-full px-16 py-4 mt-6 bg-transparent transition hover:bg-white"
                            >
                                <span className="transition group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-300 group-hover:to-violet-400">SIGN UP</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
