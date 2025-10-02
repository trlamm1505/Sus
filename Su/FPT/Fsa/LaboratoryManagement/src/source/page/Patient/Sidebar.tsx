import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all stored user data
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');

        // Navigate to home page
        navigate('/', { replace: true });
    };

    return (
        <div className="w-64 bg-white h-screen flex flex-col shadow-2xl relative z-50">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="LabTrack Logo"
                        className="w-20 h-20 object-contain rounded-full"
                    />
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-4 py-6">
                <nav className="space-y-2">
                    {/* Dashboard */}
                    <a
                        href="/patient/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === '/patient/dashboard' || location.pathname === '/patient'
                            ? 'bg-gradient-to-r from-sky-100 to-violet-100 text-violet-700 font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-100'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        </svg>
                        Dashboard
                    </a>

                    {/* Profile */}
                    <a
                        href="/patient/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === '/patient/profile'
                            ? 'bg-gradient-to-r from-sky-100 to-violet-100 text-violet-700 font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-100'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        Profile
                    </a>
                </nav>
            </div>

            {/* Logout Button */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-sky-300 to-violet-400 text-white hover:from-sky-400 hover:to-violet-500 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
