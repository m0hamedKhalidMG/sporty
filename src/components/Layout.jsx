import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr'; // Change document direction
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-yellow-300 transition-all"
            >
              {t('home.title')}
            </Link>
            <Link
              to="/sports"
              className="text-lg font-semibold hover:text-yellow-300 transition-all"
            >
              {t('sports.list_title')}
            </Link>
            <Link
              to="/trainers"
              className="text-lg font-semibold hover:text-yellow-300 transition-all"
            >
              {t('trainers.list_title')}
            </Link>
            <Link
              to="/about"
              className="text-lg font-semibold hover:text-yellow-300 transition-all"
            >
              {t('about.title')}
            </Link>
            <Link
              to="/contact"
              className="text-lg font-semibold hover:text-yellow-300 transition-all"
            >
              {t('contact.title')}
            </Link>
          </nav>

          {/* User and Language Menu */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition-all"
              >
                {user ? user.username : t('auth.login')}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {t('dashboard.title')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {t('auth.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {t('auth.login')}
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {t('auth.register')}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-300 transition-all ${
                  i18n.language === 'en' ? 'ring-2 ring-yellow-600' : ''
                }`}
              >
                English
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-300 transition-all ${
                  i18n.language === 'ar' ? 'ring-2 ring-yellow-600' : ''
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Sports Trainers Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
