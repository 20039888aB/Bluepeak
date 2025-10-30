import React, { useState } from "react";
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
  const [activeModal, setActiveModal] = useState(null); // 'help' | 'docs' | 'privacy' | 'terms' | null

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
      { id: "help", name: "Help Center" },
      { id: "docs", name: "Documentation" },
      { id: "privacy", name: "Privacy Policy" },
      { id: "terms", name: "Terms of Service" }
    ]
  };

  const supportContent = {
    help: {
      title: "Help Center",
      body: (
        <div className="space-y-4 text-slate-300">
          <p>
            Welcome to Blue Peak Web-Solutions Help Center. We’re here to make sure your
            experience is smooth from launch to scale.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-slate-200 font-medium">Email support:</span> <a href="mailto:bluepeakw@gmail.com" className="text-skyblue hover:underline">bluepeakw@gmail.com</a></li>
            <li><span className="text-slate-200 font-medium">Response times:</span> 24 hours on business days</li>
            <li><span className="text-slate-200 font-medium">Coverage:</span> Web, Cloud, E‑commerce, Integrations</li>
          </ul>
          <p>
            Prefer email? <a href="mailto:bluepeakw@gmail.com" className="text-skyblue hover:underline">Send us an email</a>. For urgent issues, use the Contact page to reach us directly.
          </p>
        </div>
      )
    },
    docs: {
      title: "Documentation",
      body: (
        <div className="space-y-4 text-slate-300">
          <p>
            Our solutions ship with clear, pragmatic guidance. Typical deliverables include:
          </p>
          <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5">
            <li>Architecture overview</li>
            <li>Environment & deployment guides</li>
            <li>Content management instructions</li>
            <li>Security & backup procedures</li>
            <li>API keys and integrations</li>
            <li>Troubleshooting playbooks</li>
          </ul>
          <p>
            Need custom docs for your team? We’ll tailor a handbook to your workflow.
          </p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-slate-300">
          <p>
            Blue Peak Web-Solutions respects your privacy. We collect only what’s needed to
            deliver and improve our services.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contact form data is stored securely in Firestore.</li>
            <li>We don’t sell personal data. Access is strictly limited.</li>
            <li>Analytics help us improve UX without identifying individuals.</li>
          </ul>
          <p>
            For data requests or removal, email <span className="text-slate-200">privacy@bluepeak.com</span>.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-slate-300">
          <p>
            By using our services you agree to responsible use and payment terms as outlined in
            your proposal or contract.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deliverables and timelines are defined per project SOW.</li>
            <li>Intellectual property transfers upon full payment unless otherwise stated.</li>
            <li>Security best practices are applied; client secrets must be safeguarded.</li>
          </ul>
          <p>
            Questions? Contact <span className="text-slate-200">legal@bluepeak.com</span>.
          </p>
        </div>
      )
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:bluepeakw@gmail.com", label: "Email" },
    { icon: FaEnvelope, href: "/contact#contact-email", label: "Email Section", isInternal: true }
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
                <a href="mailto:bluepeakw@gmail.com" className="hover:text-skyblue transition-colors" aria-label="Send us an email">
                  bluepeakw@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaPhone className="text-skyblue" />
                <span>+254 115 034 956</span>
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
                  <button
                    type="button"
                    onClick={() => setActiveModal(link.id)}
                    className="text-slate-400 hover:text-skyblue transition-colors duration-300"
                  >
                    {link.name}
                  </button>
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

      {/* Support Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/60"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative mx-4 mb-6 sm:mb-0 w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 id="support-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                  {supportContent[activeModal].title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1 rounded-lg bg-slate-700/70 text-slate-200 hover:bg-slate-600 transition-colors"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                {supportContent[activeModal].body}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="px-4 py-2 rounded-lg bg-gradient-to-r from-skyblue to-forest text-white font-semibold hover:shadow-lg transition-all">
                  Contact Us
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:border-skyblue hover:text-skyblue transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
}
