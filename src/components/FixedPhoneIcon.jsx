import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaWhatsapp, FaTimes } from "react-icons/fa";

const FixedPhoneIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed-phone-icon" ref={menuRef}>
      {/* Main Contact Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-skyblue to-forest text-white"
        title="Contact Options"
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaPhone size={20} />}
      </motion.button>

      {/* Contact Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-slate-900 rounded-lg shadow-xl border border-slate-700 p-2 min-w-[200px]"
          >
            {/* Call Option */}
            <motion.a
              href="tel:+254115034956"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 bg-skyblue rounded-full flex items-center justify-center">
                <FaPhone size={14} />
              </div>
              <div>
                <div className="font-medium text-sm">Call Us</div>
                <div className="text-xs text-slate-400">+254 115 034 956</div>
              </div>
            </motion.a>

            {/* WhatsApp Option */}
            <motion.a
              href="https://wa.me/254115138594"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FaWhatsapp size={14} />
              </div>
              <div>
                <div className="font-medium text-sm">WhatsApp</div>
                <div className="text-xs text-slate-400">+254 115 138 594</div>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FixedPhoneIcon;
