'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const pathname = usePathname();

  // Navigation links array
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Archives', path: '#archives' },
    { name: 'Work', path: '/Work' },
    { name: 'Contact', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check which section is currently in view for hash links
      const sections = navigationLinks
        .filter((link) => link.path.startsWith('#'))
        .map((link) => link.path.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= 100 && rect.bottom >= 100;
          if (isInView) {
            setActiveLink(`#${section}`);
            return;
          }
        }
      }

      // If no hash section is in view, set active based on pathname
      if (!pathname.includes('#')) {
        setActiveLink(pathname.toLowerCase());
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Update active link when pathname changes
  useEffect(() => {
    if (!pathname.includes('#')) {
      setActiveLink(pathname.toLowerCase());
    }
  }, [pathname]);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navbarVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const isLinkActive = (linkPath) => {
    if (linkPath.startsWith('#')) {
      return activeLink === linkPath;
    }
    return activeLink === linkPath.toLowerCase();
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Camera className="w-6 h-6 text-yellow-500 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-white font-bold text-lg sm:text-xl">
                LUNGELO
                <span className="text-yellow-500">ZULU</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-yellow-500 relative group ${
                    isLinkActive(link.path)
                      ? 'text-yellow-500'
                      : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                  {isLinkActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                      initial={false}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black text-sm font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300 hover:-rotate-1"
              >
                Let&#39;s Talk
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-black/95 backdrop-blur-lg border-t border-zinc-800">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-1">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isLinkActive(link.path)
                          ? 'text-yellow-500 bg-yellow-500/10'
                          : 'text-zinc-400 hover:text-yellow-500 hover:bg-yellow-500/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="mx-4 mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-black text-sm font-bold uppercase tracking-wider transform hover:scale-105 transition-all duration-300"
                  >
                    Let&#39;s Talk
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
