import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaCode, 
  FaCloud, 
  FaShieldAlt, 
  FaRocket, 
  FaCog,
  FaPalette
} from "react-icons/fa";

// Auto-typing text component
const AutoTypingText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="text-skyblue">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Hero() {
  const floatingIcons = [
    { icon: FaCode, delay: 0, position: "top-20 left-10" },
    { icon: FaCloud, delay: 0.5, position: "top-32 right-20" },
    { icon: FaShieldAlt, delay: 1, position: "bottom-40 left-20" },
    { icon: FaRocket, delay: 1.5, position: "bottom-20 right-10" },
    { icon: FaCog, delay: 2, position: "top-1/2 left-5" },
    { icon: FaPalette, delay: 2.5, position: "top-1/3 right-5" }
  ];

  const typingTexts = [
    "Web Development",
    "Cloud Solutions", 
    "Cybersecurity",
    "AI Integration",
    "Mobile Apps",
    "Digital Marketing"
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Scrolling Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          {/* First background layer */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/images/tech-bg.jpg')" }}
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Second background layer */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: "url('/images/hexagon-bg.jpg')" }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Gradient Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80" />
        </div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 animated-gradient" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-skyblue/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-skyblue/20`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <item.icon size={32} />
          </motion.div>
        ))}

        {/* Mountain Peaks SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3A7BD5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0B3D2E" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2E3A59" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M0,200 L200,120 L400,140 L600,100 L800,130 L1000,90 L1200,110 L1200,200 Z"
              fill="url(#mountainGradient)"
            />
            <path
              d="M0,200 L150,150 L300,170 L500,130 L700,160 L900,120 L1200,140 L1200,200 Z"
              fill="url(#mountainGradient)"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-text"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-shadow">
                <span className="gradient-text text-glow">Blue Peak</span>
                <br />
                <span className="text-white">Web-Solutions</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white max-w-2xl leading-relaxed font-medium text-shadow"
            >
              Building Digital Peaks, One Solution at a Time. We design, build, and optimize 
              modern web and cloud solutions for businesses, startups, and institutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-slate-200 mt-4 text-shadow"
            >
              <span className="text-white font-semibold">Specializing in: </span>
              <AutoTypingText texts={typingTexts} speed={100} deleteSpeed={50} pauseTime={2000} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/services"
                className="px-8 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-slate-600 text-slate-200 rounded-lg font-semibold hover:border-skyblue hover:text-skyblue transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Tech Stack Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {["React", "Django", "Firebase", "AWS", "Docker", "Python"].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Visual Card */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateY: [0, 5, 0],
                  rotateX: [0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-slate-700/50 p-8"
              >
                {/* Code-like Visual */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-skyblue">const bluePeak = {`{`}</div>
                    <div className="text-slate-300 ml-4">mission: <span className="text-green-400">"Building Digital Peaks"</span>,</div>
                    <div className="text-slate-300 ml-4">services: <span className="text-yellow-400">["Web", "Cloud", "AI"]</span>,</div>
                    <div className="text-slate-300 ml-4">quality: <span className="text-pink-400">"Premium"</span></div>
                    <div className="text-skyblue">{`};`}</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-4 right-4 w-8 h-8 bg-skyblue/20 rounded-full flex items-center justify-center"
                >
                  <FaRocket className="text-skyblue" size={16} />
                </motion.div>
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-skyblue/20 to-forest/20 rounded-2xl blur-xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
