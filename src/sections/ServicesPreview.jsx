import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaCode, 
  FaServer, 
  FaShieldAlt, 
  FaCloud, 
  FaPalette, 
  FaChartLine,
  FaRobot,
  FaDatabase
} from "react-icons/fa";

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-skyblue transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default function ServicesPreview() {
  const services = [
    {
      icon: FaCode,
      title: "Web & Software Development",
      description: "Custom websites, full-stack applications, e-commerce platforms, and progressive web apps built with modern technologies."
    },
    {
      icon: FaServer,
      title: "Cloud & Server Solutions",
      description: "Server installation, cloud deployment, database management, and scalable infrastructure solutions."
    },
    {
      icon: FaShieldAlt,
      title: "Cybersecurity & Data Protection",
      description: "Penetration testing, vulnerability assessment, SSL configuration, and comprehensive security solutions."
    },
    {
      icon: FaCloud,
      title: "IT Consulting & Support",
      description: "Infrastructure design, system administration, network setup, and ongoing technical support."
    },
    {
      icon: FaPalette,
      title: "Graphics & Branding",
      description: "Logo design, brand identity, UI/UX design, and visual branding solutions for digital presence."
    },
    {
      icon: FaChartLine,
      title: "Digital Marketing & SEO",
      description: "Search engine optimization, analytics setup, social media marketing, and online brand promotion."
    },
    {
      icon: FaRobot,
      title: "Automation & AI Integration",
      description: "Chatbot development, AI-driven tools, workflow automation, and intelligent system integration."
    },
    {
      icon: FaDatabase,
      title: "Data & Analytics",
      description: "Data processing, visualization dashboards, business intelligence setup, and database optimization."
    }
  ];

  return (
    <section className="py-16 section-bg relative" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.05), rgba(46,58,89,0.05))" }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/images/tech-bg.jpg')" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-shadow">
            Our Core Services
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8 text-shadow">
            We offer comprehensive technology solutions to help your business reach new digital heights. 
            From web development to cloud infrastructure, we've got you covered.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Services
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
