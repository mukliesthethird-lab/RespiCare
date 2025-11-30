'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import { Moon, Sun, Globe, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const { data: session, status } = useSession();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = () => {
    if (typeof window === 'undefined') return;
    const newLocale = locale === 'id' ? 'en' : 'id';
    const currentPath = pathname || `/${locale}`;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}` });
  };

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === 'admin';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: t('dashboard') },
    { href: `/${locale}/prediction`, label: t('prediction') },
    { href: `/${locale}/statistics`, label: t('statistics') },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/respicare-logo.png?v=2"
                alt="RespiCare"
                width={350}
                height={95}
                className="h-20 w-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                    ? 'bg-medical-light dark:bg-gray-800 text-medical-primary dark:text-medical-secondary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auth Section */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : session ? (
              /* Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-primary to-medical-secondary flex items-center justify-center text-white font-medium">
                    {session.user?.name?.charAt(0).toUpperCase() || <User size={16} />}
                  </div>
                  <span className="hidden sm:inline">{session.user?.name || session.user?.email}</span>
                  <ChevronDown size={16} className={`transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {session.user?.email}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-medical-primary/10 text-medical-primary dark:bg-medical-secondary/10 dark:text-medical-secondary rounded">
                            Admin
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/${locale}/dashboard/${isAdmin ? 'admin' : 'user'}`}
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        <span>{isAdmin ? t('adminDashboard') : t('userDashboard')}</span>
                      </Link>

                      <Link
                        href={`/${locale}/profile`}
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User size={16} />
                        <span>{t('profile')}</span>
                      </Link>

                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>{t('logout')}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login/Signup Buttons */
              <>
                <Link
                  href={`/${locale}/auth/login`}
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {locale === 'id' ? 'Masuk' : 'Login'}
                </Link>
                <Link
                  href={`/${locale}/auth/signup`}
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-medical-primary to-medical-secondary rounded-md hover:shadow-lg transition-all"
                >
                  {locale === 'id' ? 'Daftar' : 'Sign Up'}
                </Link>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={switchLocale}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1"
              aria-label={t('language')}
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{locale.toUpperCase()}</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                ? 'bg-medical-light dark:bg-gray-800 text-medical-primary dark:text-medical-secondary'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {item.label}
            </Link>
          ))}
          {!session && (
            <>
              <Link
                href={`/${locale}/auth/login`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {locale === 'id' ? 'Masuk' : 'Login'}
              </Link>
              <Link
                href={`/${locale}/auth/signup`}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-medical-primary to-medical-secondary"
              >
                {locale === 'id' ? 'Daftar' : 'Sign Up'}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
