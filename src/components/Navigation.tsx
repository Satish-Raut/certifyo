'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User, Award, BookOpen, Sun, Moon, Menu, X as XIcon, LogOut,
  Settings, AlignCenterVertical as Certificate,   Video, Trophy, Newspaper, Code
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import AuthModal from './AuthModal';
import { useRouter, usePathname } from 'next/navigation';



export default function Navigation() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin'
  });
  const [eventDropdownVisible, setEventDropdownVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();

  // Refs for dropdowns
  const eventDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setEventDropdownVisible(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setProfileDropdownVisible(false);
    router.push('/profile');
  };

  const handleVerifyCertificate = () => {
    if (pathname !== '/certificates') {
      router.push('/certificates');
    }
    if (pathname === '/certificates') {
      document.getElementById('verify-certificate-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 font-mono ${
          isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
        } shadow-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
            src="/logo.png" // ✅ Correct way to use public assets
            alt="logo"
          width={32}
            height={32}
          className={`h-8 w-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
            />

                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tighter">
                  CertifyO
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/subjects"
                className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 hover:text-indigo-400' 
                    : 'hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-sm lg:text-base font-medium">Subjects</span>
              </Link>

              <Link
                href="/learning"
                className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 hover:text-indigo-400' 
                    : 'hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <Video className="h-5 w-5" />
                <span className="text-sm lg:text-base font-medium">Learning</span>
              </Link>

              {/* New Code Lab Button */}
              <Link
                href="/code-editor"
                className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 hover:text-indigo-400' 
                    : 'hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <Code className="h-5 w-5" />
                <span className="text-sm lg:text-base font-medium">Code Editor</span>
              </Link>

              <Link
                href="/blog"
                className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md cursor-pointer ${
                  isDarkMode
                    ? 'hover:bg-gray-800 hover:text-indigo-400'
                    : 'hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <Newspaper className="h-5 w-5" />
                <span className="text-sm lg:text-base font-medium">Blog</span>
              </Link>

              <div className="relative" ref={eventDropdownRef}>
                <button
                  onClick={() => setEventDropdownVisible(!eventDropdownVisible)}
                  className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md cursor-pointer ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 hover:text-indigo-400' 
                      : 'hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm lg:text-base font-medium">Events</span>
                </button>
                {eventDropdownVisible && (
                  <div 
                    className={`absolute right-0 w-48 mt-1 py-1 rounded-md shadow-xl z-50 border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href="/competitions"
                      className={`flex items-center px-4 py-2 text-sm transition-all duration-200 cursor-pointer ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-100' 
                          : 'hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      Competitions
                    </Link>
                    <Link
                      href="/events"
                      className={`flex items-center px-4 py-2 text-sm transition-all duration-200 cursor-pointer ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-100' 
                          : 'hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={handleVerifyCertificate}
                className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md cursor-pointer ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 hover:text-indigo-400' 
                    : 'hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <Certificate className="h-5 w-5" />
                <span className="text-sm lg:text-base font-medium">Verify</span>
              </button>

              {user && (
                <Link
                  href="/certificates"
                  className={`flex items-center space-x-1 transition-all duration-200 px-3 py-2 rounded-md cursor-pointer ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 hover:text-indigo-400' 
                      : 'hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  <Award className="h-5 w-5" />
                  <span className="text-sm lg:text-base font-medium">My Certificates</span>
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>

              {/* Profile Dropdown */}
              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    className={`flex items-center space-x-2 transition-all duration-200 px-3 py-2 rounded-md ${
                      isDarkMode 
                        ? 'hover:bg-gray-800 hover:text-indigo-400' 
                        : 'hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                    onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}
                    aria-label="User menu"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm lg:text-base font-medium">
                      {user?.email ? user.email.split('@')[0].slice(0, 6) : 'Sign In'}
                    </span>
                  </button>
                  {profileDropdownVisible && (
                    <div
                      className={`absolute right-0 w-48 mt-1 py-1 rounded-md shadow-xl z-50 border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={handleProfileClick}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-100' 
                            : 'hover:bg-gray-50 text-gray-900'
                        }`}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setProfileDropdownVisible(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-200 ${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-100' 
                            : 'hover:bg-gray-50 text-gray-900'
                        }`}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                    className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                      isDarkMode 
                        ? 'text-indigo-400 hover:bg-gray-800' 
                        : 'text-indigo-600 hover:bg-gray-50'
                    } font-medium`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                    className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md cursor-pointer ${
                      isDarkMode ? 'shadow-indigo-900/50' : 'shadow-indigo-500/30'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-all duration-200 ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden font-mono ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }relative z-30`}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 flex flex-col">
              <Link 
                href="/subjects" 
                className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                <span className="font-medium">Subjects</span>
              </Link>
              
              <Link 
                href="/learning" 
                className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Video className="h-5 w-5 mr-3" />
                <span className="font-medium">Learning</span>
              </Link>

              {/* New Code Lab Button for Mobile */}
              <Link 
                href="/code-editor" 
                className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Code className="h-5 w-5 mr-3" />
                <span className="font-medium">Code Editor</span>
              </Link>

              <Link
                href="/blog"
                className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Newspaper className="h-5 w-5 mr-3" />
                <span className="font-medium">Blog</span>
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setEventDropdownVisible(!eventDropdownVisible)}
                  className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                    isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <Trophy className="h-5 w-5 mr-3" />
                  <span className="font-medium">Events</span>
                </button>
                {eventDropdownVisible && (
                  <div className={`ml-8 mt-1 py-1 rounded-md ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-gray-50'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href="/competitions"
                      className={`flex items-center px-4 py-2 text-sm transition-all duration-200 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-100' 
                          : 'hover:bg-gray-100 text-gray-900'
                      }`}
                      onClick={() => {
                        setEventDropdownVisible(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Competitions
                    </Link>
                    <Link
                      href="/events"
                      className={`flex items-center px-4 py-2 text-sm transition-all duration-200 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-100' 
                          : 'hover:bg-gray-100 text-gray-900'
                      }`}
                      onClick={() => {
                        setEventDropdownVisible(false);
                        setMobileMenuOpen(false);
                        router.push('/events');
                      }}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  handleVerifyCertificate();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <Certificate className="h-5 w-5 mr-3" />
                <span className="font-medium">Verify Certificate</span>
              </button>

              {user && (
                <>
                  <Link 
                    href="/certificates" 
                    className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                      isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Award className="h-5 w-5 mr-3" />
                    <span className="font-medium">My Certificates</span>
                  </Link>
                  
                  <Link 
                    href="/profile" 
                    className={`flex items-center py-3 px-4 rounded-md transition-all duration-200 ${
                      isDarkMode ? 'hover:bg-gray-800 text-gray-100' : 'hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Render AuthModal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={(newMode) => setAuthModal({ ...authModal, mode: newMode })}
      />
    </>
  );
}