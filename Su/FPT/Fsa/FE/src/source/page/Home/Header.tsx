
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (isMenuOpen) {
                const target = event.target as HTMLElement;
                const menuElement = document.querySelector('[data-mobile-menu]');
                const hamburgerElement = document.querySelector('[data-hamburger-button]');

                if (menuElement && hamburgerElement &&
                    !menuElement.contains(target) &&
                    !hamburgerElement.contains(target)) {
                    console.log('Clicking outside, closing menu');
                    setIsMenuOpen(false);
                }
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-neutral-200/50">
            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between gap-6 relative">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3">
                    <span className="relative inline-grid place-items-center w-16 h-16 md:w-20 md:h-20">
                        <span className="absolute inset-0 rounded-full bg-neutral-100" />
                        <img src="/logo.png" alt="LabTrack" className="relative w-12 h-12 md:w-14 md:h-14 object-contain rounded-full" />
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 text-lg text-neutral-900 font-semibold">
                    <a
                        href="/"
                        className={`font-semibold relative transition-colors ${location.pathname === '/'
                            ? 'text-blue-700 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-blue-600 after:rounded-full'
                            : 'text-neutral-900 hover:text-neutral-700'
                            }`}
                    >
                        Home
                    </a>
                    <a
                        href="/services"
                        className={`font-semibold relative transition-colors ${location.pathname === '/services'
                            ? 'text-blue-700 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-blue-600 after:rounded-full'
                            : 'text-neutral-900 hover:text-neutral-700'
                            }`}
                    >
                        Services
                    </a>
                    <a
                        href="/about"
                        className={`font-semibold relative transition-colors ${location.pathname === '/about'
                            ? 'text-blue-700 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-blue-600 after:rounded-full'
                            : 'text-neutral-900 hover:text-neutral-700'
                            }`}
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className={`font-semibold relative transition-colors ${location.pathname === '/contact'
                            ? 'text-blue-700 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-10 after:bg-blue-600 after:rounded-full'
                            : 'text-neutral-900 hover:text-neutral-700'
                            }`}
                    >
                        Contact
                    </a>
                </nav>

                {/* Desktop Action Button */}
                <div className="hidden md:flex items-center ml-auto">
                    <a href="/login" className="rounded-full bg-gradient-to-r from-sky-300 to-violet-400 hover:from-sky-400 hover:to-violet-500 text-white px-7 py-2.5 text-lg font-bold shadow-sm">
                        Create New Users
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
                    aria-label="Toggle menu"
                    data-hamburger-button
                >
                    <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-transparent"
                    style={{ zIndex: 2147483647 }}
                    onClick={() => {
                        console.log('Overlay clicked');
                        setIsMenuOpen(false);
                    }}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 right-0 bg-white border-b-2 border-neutral-300 shadow-2xl transition-all duration-300 overflow-y-auto ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`}
                style={{ zIndex: 2147483648 }}
                data-mobile-menu
            >
                <nav className="px-3 py-3 space-y-2">
                    <a
                        href="/"
                        className={`block text-base font-semibold py-1 transition-colors ${location.pathname === '/'
                            ? 'text-blue-700 border-b border-blue-200 pb-1'
                            : 'text-neutral-700 hover:text-neutral-900'
                            }`}
                    >
                        Home
                    </a>
                    <a
                        href="/services"
                        className={`block text-base font-semibold py-1 transition-colors ${location.pathname === '/services'
                            ? 'text-blue-700 border-b border-blue-200 pb-1'
                            : 'text-neutral-700 hover:text-neutral-900'
                            }`}
                    >
                        Services
                    </a>
                    <a
                        href="/about"
                        className={`block text-base font-semibold py-1 transition-colors ${location.pathname === '/about'
                            ? 'text-blue-700 border-b border-blue-200 pb-1'
                            : 'text-neutral-700 hover:text-neutral-900'
                            }`}
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className={`block text-base font-semibold py-1 transition-colors ${location.pathname === '/contact'
                            ? 'text-blue-700 border-b border-blue-200 pb-1'
                            : 'text-neutral-700 hover:text-neutral-900'
                            }`}
                    >
                        Contact
                    </a>
                    <div className="pt-3 border-t border-neutral-200">
                        <a href="/login" className="block w-full text-center rounded-full bg-gradient-to-r from-sky-300 to-violet-400 hover:from-sky-400 hover:to-violet-500 text-white px-3 py-2 text-sm font-bold shadow-sm">
                            Create New Users
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header

