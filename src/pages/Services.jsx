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
  FaDatabase,
  FaMobile,
  FaCog,
  FaHeadset,
  FaLock
} from "react-icons/fa";

const ServiceCategory = ({ category, services, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-skyblue to-forest">
          <Icon className="text-white" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-white">{category}</h2>
      </div>
      
      <div className="grid gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-skyblue mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="text-white font-medium mb-1">{service}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Services() {
  const serviceCategories = [
    {
      category: "Web & Software Development",
      icon: FaCode,
      services: [
        "Custom Website Design & Development",
        "Full-Stack Web Applications (Frontend + Backend)",
        "E-commerce Website Development",
        "Web Hosting & Domain Setup",
        "Website Maintenance & Updates",
        "Web Performance Optimization (Speed, SEO, Security)",
        "API Integration & Development",
        "Progressive Web Apps (PWA)"
      ]
    },
    {
      category: "Cloud & Server Solutions",
      icon: FaServer,
      services: [
        "Server Installation & Configuration (Linux & Windows)",
        "Cloud Deployment (AWS, Google Cloud, Azure)",
        "Database Setup & Management (MySQL, PostgreSQL, Firebase)",
        "Website Migration & Backup Services",
        "Cloud Storage & Data Synchronization",
        "Load Balancing & Auto-scaling",
        "Container Orchestration (Docker, Kubernetes)",
        "CI/CD Pipeline Setup"
      ]
    },
    {
      category: "IT Consulting & Support",
      icon: FaHeadset,
      services: [
        "IT Infrastructure Design & Optimization",
        "System Administration & Maintenance",
        "Network Setup, Monitoring, and Troubleshooting",
        "Technical Support & Remote Assistance",
        "IT Training & Consultation for Businesses",
        "Technology Stack Recommendations",
        "Digital Transformation Consulting",
        "IT Security Audits & Assessments"
      ]
    },
    {
      category: "Cybersecurity & Data Protection",
      icon: FaShieldAlt,
      services: [
        "Website & Application Penetration Testing",
        "Vulnerability Assessment & Hardening",
        "SSL Installation & HTTPS Configuration",
        "Data Privacy & Backup Solutions",
        "Security Awareness Training",
        "Firewall Configuration & Management",
        "Intrusion Detection & Prevention",
        "Security Compliance & Certification"
      ]
    },
    {
      category: "Graphics & Branding",
      icon: FaPalette,
      services: [
        "Logo & Brand Identity Design",
        "Business Cards, Posters & Flyers",
        "UI/UX Design for Websites & Apps",
        "Social Media Graphics & Visual Branding",
        "Print Design & Marketing Materials",
        "Brand Guidelines & Style Guides",
        "Icon Design & Illustration",
        "Video Graphics & Animation"
      ]
    },
    {
      category: "Digital Marketing & SEO",
      icon: FaChartLine,
      services: [
        "Search Engine Optimization (SEO)",
        "Google Analytics & Search Console Setup",
        "Social Media Marketing & Management",
        "Email Marketing Campaigns",
        "Online Brand Promotion & Ads",
        "Content Marketing Strategy",
        "Conversion Rate Optimization",
        "Marketing Automation Setup"
      ]
    },
    {
      category: "Automation & AI Integration",
      icon: FaRobot,
      services: [
        "Chatbot Development (Customer Support Bots)",
        "AI-driven Web Tools & Analytics",
        "Workflow Automation Scripts",
        "API-based Integrations with AI Models",
        "Machine Learning Model Integration",
        "Natural Language Processing Solutions",
        "Predictive Analytics Implementation",
        "Intelligent Document Processing"
      ]
    },
    {
      category: "Data & Analytics",
      icon: FaDatabase,
      services: [
        "Data Entry & Processing",
        "Data Visualization & Reporting Dashboards",
        "Business Intelligence (BI) Setup",
        "Database Management & Optimization",
        "Data Migration & ETL Processes",
        "Real-time Analytics Implementation",
        "Custom Reporting Solutions",
        "Data Warehouse Design"
      ]
    },
    {
      category: "Mobile Development",
      icon: FaMobile,
      services: [
        "Cross-platform Mobile App Development",
        "Native iOS & Android Applications",
        "Mobile App UI/UX Design",
        "App Store Optimization (ASO)",
        "Mobile App Testing & Quality Assurance",
        "Push Notification Implementation",
        "Mobile Payment Integration",
        "App Maintenance & Updates"
      ]
    },
    {
      category: "Custom Projects",
      icon: FaCog,
      services: [
        "School Management Systems",
        "Hospital Management Systems",
        "Election Management Systems",
        "Business Management Systems",
        "Custom Django or React Web Platforms",
        "Portfolio & Personal Brand Websites",
        "Freelance & Agency Collaboration",
        "Legacy System Modernization"
      ]
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions to help your business reach new digital heights. 
              From web development to cloud infrastructure, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => (
              <ServiceCategory
                key={index}
                category={category.category}
                services={category.services}
                icon={category.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.1), rgba(46,58,89,0.1))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's discuss how we can help bring your vision to life with our comprehensive technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Free Consultation
                </motion.div>
              </Link>
              <Link to="/projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-slate-600 text-slate-200 rounded-lg font-semibold hover:border-skyblue hover:text-skyblue transition-all duration-300"
                >
                  View Our Work
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
