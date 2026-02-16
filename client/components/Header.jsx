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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Link href="/" className="flex items-center shrink-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-11 h-11"
          >
            <Image src={logo} alt="Technology Wave" fill className="object-contain" priority />
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#2563EB] bg-blue-50'
                    : isTransparent
                    ? 'text-white/95 hover:text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-[#2563EB] hover:bg-blue-50/80'
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-blue-50 border border-blue-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+4532519550"
            className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isTransparent
                ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25'
            }`}
          >
            <FaPhone className="text-xs" />
            +45 32 51 95 50
          </a>

          {user && (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all ${
                  isTransparent
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/15'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="font-medium max-w-[100px] truncate hidden xl:block">
                  {user.name || user.email?.split('@')[0]}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                      aria-hidden="true"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <p className="font-semibold text-slate-900 truncate">
                          {user.name || user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        {user.is_admin && (
                          <span className="inline-block mt-2 px-2.5 py-1 text-xs font-semibold bg-[#2563EB] text-white rounded-md">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        {user.is_admin && (
                          <Link href="/admin">
                            <button
                              className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] flex items-center gap-2"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <FaTachometerAlt className="text-[#2563EB]" />
                              Admin Dashboard
                            </button>
                          </Link>
                        )}
                        <Link href="/order">
                          <button
                            className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] flex items-center gap-2"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaShoppingCart />
                            My Orders
                          </button>
                        </Link>
                        <div className="border-t border-slate-100 my-1" />
                        <button
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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

          <button
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              isTransparent ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:bg-slate-100'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                  <span
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      pathname === link.href
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
                <a
                  href="tel:+4532519550"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPhone />
                  +45 32 51 95 50
                </a>
                {user && (
                  <>
                    <div className="px-4 py-3 bg-slate-50 rounded-xl">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user.name || user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/order" onClick={() => setIsOpen(false)}>
                      <span className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium text-sm">
                        <FaShoppingCart className="text-[#2563EB]" />
                        My Orders
                      </span>
                    </Link>
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium text-sm"
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
