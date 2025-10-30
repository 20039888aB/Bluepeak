import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaWhatsapp
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const ContactInfo = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      id={title === "Email Us" ? "contact-email" : undefined}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest">
          <Icon className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Contact() {
  // Using new ContactForm which directly writes to Firestore

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      description: "bluepeakw@gmail.com\nSend us an email — we reply within 24 hours"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      description: "+254 115 034 956 (Felix Mngola)\n+254 115 138 594 (Felix Mngola)"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      description: "Global Remote Services\nAvailable Worldwide"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      description: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(58,123,213,0.1), rgba(11,61,46,0.1))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your next project? Have questions about our services? 
              We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <ContactInfo
                key={index}
                icon={info.icon}
                title={info.title}
                description={info.description}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {/* Direct Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch Directly</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+254115034956"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <FaPhone />
                Call: +254 115 034 956
              </motion.a>
              <motion.a
                href="https://wa.me/254115138594"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <FaWhatsapp />
                WhatsApp: +254 115 138 594
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.05), rgba(46,58,89,0.05))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-slate-300">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Choose Blue Peak?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-4">
                <div className="text-skyblue text-2xl font-bold mb-2">24/7</div>
                <div className="text-slate-300 text-sm">Support Available</div>
              </div>
              <div className="p-4">
                <div className="text-forest text-2xl font-bold mb-2">100%</div>
                <div className="text-slate-300 text-sm">Client Satisfaction</div>
              </div>
              <div className="p-4">
                <div className="text-mint text-2xl font-bold mb-2">Fast</div>
                <div className="text-slate-300 text-sm">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
