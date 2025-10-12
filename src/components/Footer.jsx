import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GiMountainPeak, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Development", href: "/services" },
      { name: "Cloud Solutions", href: "/services" },
      { name: "Cybersecurity", href: "/services" },
      { name: "IT Consulting", href: "/services" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" }
    ],
    support: [
      { name: "Help Center", href: "/contact" },
      { name: "Documentation", href: "/contact" },
      { name: "Privacy Policy", href: "/contact" },
      { name: "Terms of Service", href: "/contact" }
    ]
  };

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:contact@bluepeak.com", label: "Email" }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 border-t border-slate-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <img 
                  src="/images/logo.svg" 
                  alt="Blue Peak Web-Solutions Logo" 
                  className="h-10 w-auto"
                />
              </motion.div>
              <div>
                <div className="text-sm text-slate-400">Building Digital Peaks</div>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              We design, build, and optimize modern web and cloud solutions for businesses, 
              startups, and institutions. Climbing digital peaks with our clients.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FaEnvelope className="text-skyblue" />
                <span>contact@bluepeak.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaPhone className="text-skyblue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-skyblue" />
                <span>Global Remote Services</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-slate-400 hover:text-skyblue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-slate-400 hover:text-skyblue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-slate-400 hover:text-skyblue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-slate-800 hover:bg-skyblue text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            
            <div className="text-sm text-slate-400">
              © {currentYear} Blue Peak Web-Solutions. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
            <div>
              Designed with ❤️ — Responsive • Secure • Fast
            </div>
            <div className="flex items-center gap-4">
              <span>Made with React + Firebase</span>
              <span>•</span>
              <span>Powered by Blue Peak</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
