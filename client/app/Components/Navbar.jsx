"use client"

export const runtime = 'edge';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { assets } from '@/assets/assets.js'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { cart, toggleCart } = useCart()
    const [isScroll, setIsScroll] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname();

    const isAdminPage = pathname.startsWith('/admin');

    // ✅ CLEAN + STRICT LOGIC (FIXED)
    const isHomePage = pathname === '/';
    const isAboutPage = pathname === '/about';

    const isServiceSlug =
        pathname.startsWith('/services/') &&
        pathname.split('/').length > 2;

    const isProductSlug =
        pathname.startsWith('/products/') &&
        pathname.split('/').length > 2;

    const isTransparentPage =
        isHomePage ||
        isAboutPage ||
        isServiceSlug ||
        isProductSlug;

    const useWhiteText = isTransparentPage && !isScroll;
    const useWhiteBg   = isScroll || !isTransparentPage;

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

    if (isAdminPage) return null;

    const navLinks = [
        { href: "/",         label: "Home",     number: "01" },
        { href: "/about",    label: "About",    number: "02" },
        { href: "/services", label: "Services", number: "03" },
        { href: "/products", label: "Products", number: "04" },
        { href: "/contact",  label: "Contact",  number: "05" },
    ];

    return (
        <>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${useWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'}`}>

                {/* Logo */}
                <Link href="/" className='flex items-center gap-2 sm:gap-3 group'>
                    <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                        <Image
                            src={assets.logo}
                            alt='Technology Wave Logo'
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className={`text-lg sm:text-xl font-black tracking-tight transition-colors duration-300 ${useWhiteText ? 'text-white' : 'text-gray-900'}`}>
                        Technology Wave
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex items-center gap-3 lg:gap-8 xl:gap-10'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`font-semibold text-sm lg:text-base relative group whitespace-nowrap transition-colors duration-300 ${
                                    useWhiteText
                                        ? 'text-white/90 hover:text-white'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-blue-600'}`}></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className='flex items-center gap-2 lg:gap-4'>
                    <button
                        onClick={toggleCart}
                        className={`relative p-2.5 rounded-full transition-all duration-300 active:scale-90 ${
                            useWhiteText
                                ? 'bg-white/10 text-white hover:bg-white/20'
                                : 'bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >
                        <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <Link href="/contact"
                        className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg active:scale-95 ${
                            useWhiteText
                                ? 'bg-white text-blue-600 hover:bg-blue-50'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                        Contact Us
                    </Link>

                    <button
                        className={`flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-xl transition-all gap-[5px] ${
                            useWhiteText ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                        }`}
                        onClick={openMenu}
                    >
                        <span className={`block h-[2px] w-6 rounded-full ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></span>
                        <span className={`block h-[2px] w-4 rounded-full self-end ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></span>
                        <span className={`block h-[2px] w-6 rounded-full ${useWhiteText ? 'bg-white' : 'bg-gray-900'}`}></span>
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER (UNCHANGED) */}
            <div
                onClick={closeMenu}
                className={`fixed inset-0 z-[60] bg-gray-950/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            <div
                className={`fixed top-0 right-0 h-full w-[85vw] max-sm:w-full max-w-sm z-[70] md:hidden flex flex-col bg-white shadow-2xl transition-transform duration-500 ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
                    <span className="font-black text-blue-600 uppercase tracking-tighter">Navigation</span>
                    <button onClick={closeMenu} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                        ✕
                    </button>
                </div>

                <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-2">
                        {navLinks.map((link, index) => (
                            <li key={link.href}>
                                <Link href={link.href} className="block py-4 px-4 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-6 border-t border-gray-50">
                    <Link href="/contact" className="flex items-center justify-center w-full py-4 bg-blue-600 text-white font-bold rounded-2xl">
                        Request Quote
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;