import React from "react";
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
  FaDatabase
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
      <div className="relative h-48 bg-gradient-to-br from-skyblue/20 to-forest/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80" />
        <div className="relative z-10 text-center">
          <CategoryIcon className="text-skyblue mx-auto mb-2" size={32} />
          <div className="text-white font-semibold">{project.category}</div>
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
              >
                <FaExternalLinkAlt size={16} />
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
              >
                <FaGithub size={16} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-skyblue/20 text-skyblue text-xs rounded-full">
            {project.category}
          </span>
          <span className="px-2 py-1 bg-forest/20 text-forest text-xs rounded-full">
            {project.status}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-skyblue transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

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
        <div className="flex justify-between text-xs text-slate-400">
          <span>Duration: {project.duration}</span>
          <span>Team: {project.teamSize}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPreview() {
  const projects = [
    {
      title: "Hospital Management System",
      category: "Web Development",
      status: "Completed",
      description: "Comprehensive hospital management platform with patient records, appointment scheduling, and staff management modules.",
      technologies: ["Django", "PostgreSQL", "React", "Bootstrap"],
      duration: "3 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "E-commerce Platform",
      category: "E-commerce",
      status: "Live",
      description: "Modern e-commerce solution with payment integration, inventory management, and customer analytics dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      duration: "4 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Election Management System",
      category: "Security",
      status: "Completed",
      description: "Secure voting platform with blockchain integration, voter authentication, and real-time result tracking.",
      technologies: ["Django", "Blockchain", "React", "AWS"],
      duration: "5 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "School Management Portal",
      category: "Web Development",
      status: "Live",
      description: "Complete school management system with student enrollment, grade management, and parent communication tools.",
      technologies: ["Django", "PostgreSQL", "Vue.js", "Docker"],
      duration: "6 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Business Analytics Dashboard",
      category: "Database",
      status: "Completed",
      description: "Real-time business intelligence dashboard with data visualization, reporting, and predictive analytics.",
      technologies: ["Python", "Django", "Chart.js", "PostgreSQL"],
      duration: "2 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile",
      status: "In Development",
      description: "Secure mobile banking application with biometric authentication, transaction history, and bill payments.",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      duration: "4 months",
      teamSize: "2 developers",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.05), rgba(46,58,89,0.05))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8">
            Explore our portfolio of successful projects across various industries. 
            Each project showcases our expertise in modern technologies and innovative solutions.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Projects
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
