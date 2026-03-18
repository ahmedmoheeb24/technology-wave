"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { cart, toggleCart } = useCart()
    const [isScroll, setIsScroll] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname();

    const isHomePage = pathname === '/';
    const isAdminPage = pathname.startsWith('/admin');

    // Don't render navbar on admin pages
    if (isAdminPage) return null;
    const useWhiteText = isHomePage && !isScroll;
    const useWhiteBg = isScroll;

    const openMenu = () => {
        setMenuOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeMenu = () => {
        setMenuOpen(false)
        document.body.style.overflow = ''
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        closeMenu()
    }, [pathname])

    const navLinks = [
        { href: "/", label: "Home", number: "01" },
        { href: "/about", label: "About", number: "02" },
        { href: "/services", label: "Services", number: "03" },
        { href: "/products", label: "Products", number: "04" },
        { href: "#contact", label: "Contact", number: "05" },
    ];

    return (
        <>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${useWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'}`}>

                {/* Logo */}
                <a href="/" className='flex items-center gap-3'>
                    <Image
                        src={logo}
                        alt='Technology Wave Logo'
                        width={120}
                        height={40}
                        className='h-10'
                        style={{ width: 'auto' }}
                        priority
                    />
                    <span className={`text-xl font-bold transition-colors duration-300 ${useWhiteText ? 'text-white' : 'text-gray-800'}`}>
                        Technology Wave
                    </span>
                </a>

                {/* Desktop Menu */}
                <ul className='hidden md:flex items-center gap-3 lg:gap-8 xl:gap-10'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                className={`font-Ovo text-sm lg:text-base relative group whitespace-nowrap transition-colors duration-300 ${
                                    useWhiteText
                                        ? 'text-white hover:text-blue-300'
                                        : 'text-gray-700 hover:text-blue-700'
                                }`}
                                href={link.href}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${useWhiteText ? 'bg-blue-300' : 'bg-blue-600'}`}></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className='flex items-center gap-2 lg:gap-4'>

                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className={`hidden md:flex relative items-center gap-2 px-4 py-2.5 rounded-full font-Ovo transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                            useWhiteText
                                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    {/* Desktop Contact Button */}
                    <a href="#contact"
                        className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-Ovo transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                            useWhiteText
                                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                        Contact Us
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    {/* Hamburger — mobile only, staggered bars */}
                    <button
                        className={`flex md:hidden ml-2 flex-col justify-center items-center w-10 h-10 rounded-xl transition-all gap-[5px] ${
                            useWhiteText ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                        }`}
                        onClick={openMenu}
                        aria-label='Open menu'
                    >
                        <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-gray-700'}`}></span>
                        <span className={`block h-[2px] w-3.5 rounded-full transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-gray-700'}`}></span>
                        <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-gray-700'}`}></span>
                    </button>
                </div>
            </nav>

            {/* ── MOBILE OVERLAY ── */}

            {/* Blurred backdrop */}
            <div
                onClick={closeMenu}
                className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* Slide-in panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm z-[70] md:hidden flex flex-col
                    bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Panel header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <a href="/" onClick={closeMenu} className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt='Technology Wave Logo'
                            width={90}
                            height={30}
                            className='h-8'
                            style={{ width: 'auto' }}
                        />
                    </a>
                    {/* Animated X close button */}
                    <button
                        onClick={closeMenu}
                        aria-label='Close menu'
                        className="w-9 h-9 flex flex-col justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <span className="block h-[2px] w-4 bg-gray-600 rounded-full rotate-45 translate-y-[1px]"></span>
                        <span className="block h-[2px] w-4 bg-gray-600 rounded-full -rotate-45 -translate-y-[1px]"></span>
                    </button>
                </div>

                {/* Nav links with staggered slide-in */}
                <nav className="flex-1 px-6 py-6 overflow-y-auto">
                    <ul className="space-y-0">
                        {navLinks.map((link, index) => (
                            <li
                                key={link.href}
                                style={{ transitionDelay: menuOpen ? `${index * 55 + 80}ms` : '0ms' }}
                                className={`transition-all duration-300 ${
                                    menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                                }`}
                            >
                                <a
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`group flex items-center justify-between py-4 border-b border-gray-100 ${
                                        pathname === link.href ? 'text-blue-600' : 'text-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono text-gray-300 group-hover:text-blue-400 transition-colors w-6">
                                            {link.number}
                                        </span>
                                        <span className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                                            {link.label}
                                        </span>
                                        {pathname === link.href && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                        )}
                                    </div>
                                    <svg
                                        className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom CTAs */}
                <div
                    style={{ transitionDelay: menuOpen ? '380ms' : '0ms' }}
                    className={`px-6 pb-8 pt-4 space-y-3 transition-all duration-300 ${
                        menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <a
                        href="#contact"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-2xl transition-all"
                    >
                        Contact Us
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <button
                        onClick={() => { toggleCart(); closeMenu(); }}
                        className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 active:scale-95 text-gray-700 font-semibold rounded-2xl transition-all"
                    >
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        View Cart
                        {cart.length > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar