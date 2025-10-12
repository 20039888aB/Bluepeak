import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiMountainPeak } from "react-icons/gi";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => 
      `px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-skyblue to-forest text-white shadow-lg' 
          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <img 
                src="/images/logo.svg" 
                alt="Blue Peak Web-Solutions Logo" 
                className="h-12 w-auto"
              />
            </motion.div>
            <div className="hidden sm:block">
              <div className="text-xs text-slate-300 -mt-1">
                Building Digital Peaks, One Solution at a Time.
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-6 py-2 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50"
          >
            <div className="px-4 py-4 space-y-2">
              <NavItem to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavItem>
              <NavItem to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</NavItem>
              <NavItem to="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</NavItem>
              <NavItem to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</NavItem>
              <NavItem to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavItem>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
