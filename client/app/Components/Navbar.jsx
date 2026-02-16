"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import logo from '@/assets/logo.png'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { cart, toggleCart } = useCart()
    const [isScroll, setIsScroll] = useState(false)
    const sideMenuRef = useRef();

    function openMenu() {
        sideMenuRef.current.style.transform = "translateX(-16rem)";
    }

    const closeMenu = () => {
        sideMenuRef.current.style.transform = "translateX(16rem)";
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    // Updated navigation links for the shop
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/products", label: "Products" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScroll 
                ? "bg-white/95 backdrop-blur-lg shadow-md" 
                : "bg-transparent"}`}>
                
                {/* Logo Section */}
                <a href="/" className='flex items-center gap-3'>
                    <Image 
                        src={logo}
                        alt='Technology Wave Logo'
                        width={120}
                        height={40}
                        className='h-10 w-auto'
                        priority
                    />
                    <span className={`text-xl font-bold transition-colors ${isScroll ? 'text-gray-900' : 'text-white'}`}>
                        Technology Wave
                    </span>
                </a>

                {/* Desktop & Laptop Menu */}
                <ul className='hidden md:flex items-center gap-3 lg:gap-8 xl:gap-10'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a className={`font-Ovo text-sm lg:text-base relative group whitespace-nowrap transition-colors ${isScroll ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-500'}`} href={link.href}>
                                {link.label}
                                <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isScroll ? 'bg-blue-600' : 'bg-blue-500'}`}></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Side Buttons */}
                <div className='flex items-center gap-2 lg:gap-4'> 

                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-Ovo transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${isScroll ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
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
                        className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-Ovo transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${isScroll ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'}`}> 
                        Contact Us
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    {/* Hamburger Menu (Visible on mobile/tablet) */}
                    <button 
                        className={`block md:hidden ml-2 p-2 rounded-lg transition-all ${isScroll ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`} 
                        onClick={openMenu}
                        aria-label='Open menu'
                    >
                        <svg className={`w-6 h-6 ${isScroll ? 'text-gray-700' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Side Menu */}
                <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-white transition-transform duration-500 shadow-2xl'> 
                    <button 
                        className='absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-all' 
                        onClick={closeMenu}
                        aria-label='Close menu'
                    > 
                        <svg className='w-5 h-5 text-gray-700' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a 
                                className='font-Ovo text-lg text-gray-700 hover:text-blue-600 transition-colors' 
                                onClick={closeMenu} 
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

            </nav>
        </>
    )
}

export default Navbar