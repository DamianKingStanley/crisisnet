"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Alerts', href: '/alerts' },
  // { name: 'About', href: '/about' },
  // { name: 'Features', href: '/features' },
  { name: 'Contact', href: '/contact' },
  { name: 'Dashboard', href: '/dashboard' },

];

const socialLinks = [
  { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FaTwitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FaLinkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const menuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.div
          whileHover={hoverEffect}
          whileTap={tapEffect}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="text-indigo-700 font-bold text-xl md:text-2xl select-none">CrisisNet</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map(({ name, href }) => (
            <motion.div
              key={name}
              whileHover={hoverEffect}
              whileTap={tapEffect}
            >
              <Link 
                href={href} 
                className="font-medium text-indigo-700 hover:text-indigo-900 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
              >
                {name}
              </Link>
            </motion.div>
          ))}
          <div className="flex items-center ml-6 space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={hoverEffect}
                whileTap={tapEffect}
                className="text-indigo-700 hover:text-indigo-900 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-md text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileHover={hoverEffect}
          whileTap={tapEffect}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile menu - animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map(({ name, href }) => (
                <motion.li 
                  key={name}
                  variants={linkVariants}
                >
                  <Link
                    href={href}
                    className="block py-3 px-4 font-medium text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </motion.li>
              ))}
              
              <motion.div 
                className="flex justify-center space-x-6 pt-6 mt-6 border-t border-indigo-100"
                variants={linkVariants}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                    className="text-indigo-700 hover:text-indigo-900 transition-colors p-2"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}