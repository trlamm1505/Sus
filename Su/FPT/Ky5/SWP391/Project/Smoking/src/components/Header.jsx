import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-md h-16 fixed w-full top-0 z-50">
            <div className="container mx-auto h-full flex items-center">
                {/* Logo */}
                <div className="flex items-center w-64 px-4">
                    <img src="/funnylogo.png" alt="Logo" className="h-12" />
                </div>

                {/* Search Bar */}
                <div className="flex-1 px-4">
                    <div className="max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 