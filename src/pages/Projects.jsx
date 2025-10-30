import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaCode, 
  FaServer, 
  FaShieldAlt,
  FaMobile,
  FaDatabase,
  FaFilter,
  FaTimes
} from "react-icons/fa";

const ProjectCard = ({ project, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web Development": return FaCode;
      case "E-commerce": return FaServer;
      case "Security": return FaShieldAlt;
      case "Mobile": return FaMobile;
      case "Database": return FaDatabase;
      default: return FaCode;
    }
  };

  const CategoryIcon = getCategoryIcon(project.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      {/* Project Image/Visual */}
      <div className="relative h-64 bg-gradient-to-br from-skyblue/20 to-forest/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80" />
        <div className="relative z-10 text-center">
          <CategoryIcon className="text-skyblue mx-auto mb-3" size={40} />
          <div className="text-white font-semibold text-lg">{project.category}</div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-skyblue/20 to-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-skyblue transition-colors"
                title="View Live Site"
              >
                <FaExternalLinkAlt size={18} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-forest transition-colors"
                title="View Source Code"
              >
                <FaGithub size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-skyblue/20 text-skyblue text-sm rounded-full">
            {project.category}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full ${
            project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
            project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {project.status}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-skyblue transition-colors">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-400 mb-2">Key Features:</h4>
          <ul className="text-xs text-slate-300 space-y-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-skyblue rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Stats */}
        <div className="flex justify-between text-xs text-slate-400 pt-4 border-t border-slate-700/50">
          <span>Duration: {project.duration}</span>
          <span>Team: {project.teamSize}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      title: "Hospital Management System",
      category: "Web Development",
      status: "Live",
      description: "Comprehensive hospital management platform with patient records, appointment scheduling, staff management, and billing integration.",
      features: [
        "Patient Registration & Records Management",
        "Appointment Scheduling System",
        "Staff Management & Role-based Access",
        "Billing & Insurance Integration",
        "Real-time Dashboard & Analytics"
      ],
      technologies: ["Django", "PostgreSQL", "React", "Bootstrap", "Chart.js"],
      duration: "3 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "E-commerce Platform",
      category: "E-commerce",
      status: "Live",
      description: "Modern e-commerce solution with payment integration, inventory management, customer analytics, and mobile responsiveness.",
      features: [
        "Product Catalog & Search",
        "Shopping Cart & Checkout",
        "Payment Gateway Integration",
        "Order Management System",
        "Customer Analytics Dashboard"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      duration: "4 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Election Management System",
      category: "Security",
      status: "Completed",
      description: "Secure voting platform with blockchain integration, voter authentication, real-time result tracking, and audit trails.",
      features: [
        "Blockchain-based Voting",
        "Voter Authentication & Verification",
        "Real-time Result Tracking",
        "Audit Trail & Transparency",
        "Multi-level Security Protocols"
      ],
      technologies: ["Django", "Blockchain", "React", "AWS", "PostgreSQL"],
      duration: "5 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "School Management Portal",
      category: "Web Development",
      status: "Live",
      description: "Complete school management system with student enrollment, grade management, parent communication, and administrative tools.",
      features: [
        "Student Enrollment & Records",
        "Grade Management System",
        "Parent-Teacher Communication",
        "Fee Management & Payments",
        "Academic Calendar & Events"
      ],
      technologies: ["Django", "PostgreSQL", "Vue.js", "Docker", "Celery"],
      duration: "6 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Business Analytics Dashboard",
      category: "Database",
      status: "Completed",
      description: "Real-time business intelligence dashboard with data visualization, reporting, predictive analytics, and custom metrics.",
      features: [
        "Real-time Data Visualization",
        "Custom Report Generation",
        "Predictive Analytics",
        "Interactive Dashboards",
        "Data Export & Sharing"
      ],
      technologies: ["Python", "Django", "Chart.js", "PostgreSQL", "Redis"],
      duration: "2 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile",
      status: "In Development",
      description: "Secure mobile banking application with biometric authentication, transaction history, bill payments, and real-time notifications.",
      features: [
        "Biometric Authentication",
        "Account Balance & History",
        "Bill Payment System",
        "Money Transfer & P2P",
        "Real-time Notifications"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
      duration: "4 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Inventory Management System",
      category: "Web Development",
      status: "Live",
      description: "Comprehensive inventory management solution with real-time tracking, automated reordering, and detailed reporting.",
      features: [
        "Real-time Inventory Tracking",
        "Automated Reorder Points",
        "Supplier Management",
        "Barcode Scanning Integration",
        "Detailed Analytics & Reports"
      ],
      technologies: ["Django", "PostgreSQL", "React", "Barcode Scanner API"],
      duration: "3 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Customer Support Portal",
      category: "Web Development",
      status: "Live",
      description: "Multi-channel customer support platform with ticket management, live chat, knowledge base, and performance analytics.",
      features: [
        "Multi-channel Ticket Management",
        "Live Chat Integration",
        "Knowledge Base System",
        "Performance Analytics",
        "Customer Satisfaction Tracking"
      ],
      technologies: ["Django", "PostgreSQL", "React", "WebSocket", "Redis"],
      duration: "4 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  // Live websites
  projects.push(
    {
      title: "Optimal Family Hospital",
      category: "Web Development",
      status: "Live",
      description: "Public-facing website for Optimal Family Hospital with services, departments, and contact information.",
      features: [
        "Service and department listings",
        "Doctor profiles and contact",
        "Responsive design",
        "Appointment/contact CTA"
      ],
      technologies: ["React", "Tailwind CSS", "Vite"],
      duration: "Ongoing",
      teamSize: "2 developers",
      liveUrl: "https://optimalfamilyhospital.com",
      githubUrl: "#"
    },
    {
      title: "FM Ngola",
      category: "Web Development",
      status: "Live",
      description: "Modern company website showcasing brand, services, and engagement channels.",
      features: [
        "Services overview",
        "Contact and social links",
        "Performance optimized",
        "SEO-friendly meta"
      ],
      technologies: ["React", "Tailwind CSS", "Vite"],
      duration: "Ongoing",
      teamSize: "2 developers",
      liveUrl: "https://fmngola.netlify.app",
      githubUrl: "#"
    },
    {
      title: "M Ngola",
      category: "Web Development",
      status: "Live",
      description: "Clean, responsive business website with service highlights and contact options.",
      features: [
        "Responsive layout",
        "Service highlights",
        "Contact CTA",
        "Fast loading"
      ],
      technologies: ["React", "Tailwind CSS", "Vite"],
      duration: "Ongoing",
      teamSize: "2 developers",
      liveUrl: "https://mngola.netlify.app",
      githubUrl: "#"
    }
  );

  const categories = ["All", ...new Set(projects.map(project => project.category))];
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful projects across various industries. 
              Each project showcases our expertise in modern technologies and innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <FaFilter size={16} />
              <span className="font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-skyblue to-forest text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes size={14} />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg">No projects found in this category.</div>
            </div>
          )}
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
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's discuss how we can help bring your vision to life with our proven expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Start Your Project
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-slate-600 text-slate-200 rounded-lg font-semibold hover:border-skyblue hover:text-skyblue transition-all duration-300"
                >
                  View Our Services
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
