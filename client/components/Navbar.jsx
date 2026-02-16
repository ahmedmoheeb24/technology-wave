'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaShoppingCart, FaTachometerAlt, FaPhone } from 'react-icons/fa';
import { authAPI } from '@/lib/api';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Shop', href: '/shop' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const isTransparent = !scrolled && pathname === '/';

  return (
    <nav
      className="site-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isTransparent ? 'transparent' : 'rgba(255,255,255,0.92)',
        backdropFilter: isTransparent ? 'none' : 'saturate(180%) blur(12px)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Link href="/" className="flex items-center shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-12 h-12"
          >
            <Image src={logo} alt="Technology Wave" fill className="object-contain" priority />
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <motion.span
                  className={`relative block px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-[#2563EB]'
                      : isTransparent
                      ? 'text-white/95 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-blue-50 border border-blue-100"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {!active && !isTransparent && (
                    <span className="absolute inset-0 rounded-xl bg-slate-100/0 hover:bg-slate-100/80 transition-colors duration-200" style={{ zIndex: -1 }} />
                  )}
                  {!active && isTransparent && (
                    <span className="absolute inset-0 rounded-xl bg-white/0 hover:bg-white/15 transition-colors duration-200" style={{ zIndex: -1 }} />
                  )}
                  {link.name}
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="tel:+4532519550"
            className={`hidden lg:inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isTransparent
                ? 'bg-white/15 text-white hover:bg-white/25 border border-white/25 hover:border-white/40'
                : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPhone className="text-sm opacity-90" />
            +45 32 51 95 50
          </motion.a>

          {user && (
            <div className="relative hidden lg:block">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-200 ${
                  isTransparent
                    ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                    : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-sm">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="font-semibold max-w-[110px] truncate hidden xl:inline text-sm">
                  {user.name || user.email?.split('@')[0]}
                </span>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} aria-hidden="true" />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <p className="font-semibold text-slate-900 truncate text-sm">
                          {user.name || user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                        {user.is_admin && (
                          <span className="inline-block mt-2 px-2.5 py-1 text-xs font-semibold bg-[#2563EB] text-white rounded-lg">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="py-2">
                        {user.is_admin && (
                          <Link href="/admin">
                            <button
                              className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <FaTachometerAlt className="text-[#2563EB]" />
                              Admin Dashboard
                            </button>
                          </Link>
                        )}
                        <Link href="/order">
                          <button
                            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] flex items-center gap-2.5 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaShoppingCart />
                            My Orders
                          </button>
                        </Link>
                        <div className="border-t border-slate-100 my-2" />
                        <button
                          className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          <motion.button
            className={`lg:hidden p-3 rounded-xl transition-colors ${
              isTransparent ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:bg-slate-100'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="container-custom py-5 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                  <motion.span
                    className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                      pathname === link.href ? 'bg-blue-50 text-[#2563EB]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                <a
                  href="tel:+4532519550"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPhone />
                  +45 32 51 95 50
                </a>
                {user && (
                  <>
                    <div className="px-4 py-3 bg-slate-50 rounded-xl">
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name || user.email?.split('@')[0]}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/order" onClick={() => setIsOpen(false)}>
                      <span className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-sm">
                        <FaShoppingCart className="text-[#2563EB]" />
                        My Orders
                      </span>
                    </Link>
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
