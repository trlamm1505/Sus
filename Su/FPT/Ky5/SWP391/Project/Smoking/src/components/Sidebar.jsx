import React, { useState } from 'react';
import { FaHome, FaLaptop, FaBook, FaCompass, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, onCollapse }) => {
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    return (
        <div className={`bg-white h-[calc(100vh-4rem)] shadow-lg fixed left-0 top-16 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="py-4 relative">
                {/* Collapse Button */}
                <button
                    onClick={() => onCollapse(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-50"
                >
                    <FaChevronRight className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>

                <nav className="space-y-1">
                    <a href="/" className={`flex items-center text-gray-700 hover:text-blue-500 px-6 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <FaHome className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">Home</span>}
                    </a>

                    <a href="/courses" className={`flex items-center text-gray-700 hover:text-blue-500 px-6 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <FaLaptop className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">Courses</span>}
                    </a>

                    <a href="/blog" className={`flex items-center text-gray-700 hover:text-blue-500 px-6 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
                        <FaBook className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">Blog</span>}
                    </a>

                    <div>
                        <button
                            onClick={() => !isCollapsed && setIsExploreOpen(!isExploreOpen)}
                            className={`w-full flex items-center text-gray-700 hover:text-blue-500 px-6 py-3 ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <FaCompass className="w-5 h-5" />
                            {!isCollapsed && (
                                <>
                                    <span className="ml-3">Explore</span>
                                    <svg
                                        className={`ml-auto w-4 h-4 transform transition-transform ${isExploreOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {!isCollapsed && isExploreOpen && (
                            <div className="bg-gray-50 py-2">
                                <a href="/language" className="block text-gray-700 hover:text-blue-500 px-14 py-2">
                                    Language
                                </a>
                                <a href="/mathematics" className="block text-gray-700 hover:text-blue-500 px-14 py-2">
                                    Mathematics
                                </a>
                                <a href="/software-engineering" className="block text-gray-700 hover:text-blue-500 px-14 py-2">
                                    Software Engineering
                                </a>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar; 