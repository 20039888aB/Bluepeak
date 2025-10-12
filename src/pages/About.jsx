import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  FaRocket, 
  FaUsers, 
  FaLightbulb, 
  FaAward,
  FaCode,
  FaServer,
  FaShieldAlt,
  FaPalette,
  FaChartLine,
  FaHandshake
} from "react-icons/fa";

const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 pb-8"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-skyblue to-forest rounded-full border-4 border-slate-800"></div>
      <div className="absolute left-2 top-4 w-0.5 h-full bg-slate-700"></div>
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
        <div className="text-skyblue font-semibold mb-1">{year}</div>
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        <p className="text-slate-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default function About() {
  const values = [
    {
      icon: FaRocket,
      title: "Innovation",
      description: "We stay at the forefront of technology, constantly exploring new tools and methodologies to deliver cutting-edge solutions."
    },
    {
      icon: FaUsers,
      title: "Collaboration",
      description: "We believe in working closely with our clients as partners, ensuring their vision is realized through transparent communication."
    },
    {
      icon: FaLightbulb,
      title: "Creativity",
      description: "Every project is approached with fresh perspective and creative thinking to deliver unique, impactful solutions."
    },
    {
      icon: FaAward,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to user experience and project delivery."
    }
  ];

  const expertise = [
    { icon: FaCode, title: "Frontend Development", description: "React, Vue.js, TypeScript" },
    { icon: FaServer, title: "Backend Development", description: "Python, Django, Node.js" },
    { icon: FaShieldAlt, title: "Cybersecurity", description: "Penetration Testing, Security Audits" },
    { icon: FaPalette, title: "UI/UX Design", description: "Figma, Adobe Creative Suite" },
    { icon: FaChartLine, title: "Data Analytics", description: "Business Intelligence, Reporting" },
    { icon: FaHandshake, title: "Consulting", description: "IT Strategy, Digital Transformation" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(58,123,213,0.1), rgba(11,61,46,0.1))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                About <span className="gradient-text">Blue Peak</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Founded by two passionate brothers, Blue Peak Web-Solutions is a technology company 
                dedicated to building digital peaks for businesses worldwide. We combine technical 
                expertise with creative vision to deliver exceptional digital solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-skyblue">50+</div>
                  <div className="text-sm text-slate-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest">25+</div>
                  <div className="text-sm text-slate-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint">3+</div>
                  <div className="text-sm text-slate-400">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-skyblue to-forest flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">BP</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Blue Peak Web-Solutions</h3>
                  <p className="text-slate-300 text-sm mb-4">Building Digital Peaks, One Solution at a Time</p>
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 bg-skyblue/20 text-skyblue text-xs rounded-full">Innovation</span>
                    <span className="px-3 py-1 bg-forest/20 text-forest text-xs rounded-full">Excellence</span>
                    <span className="px-3 py-1 bg-mint/20 text-mint text-xs rounded-full">Quality</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest">
                  <FaRocket className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                To empower businesses with innovative technology solutions that drive growth, 
                enhance efficiency, and create meaningful digital experiences. We believe in 
                the power of technology to transform ideas into reality and help organizations 
                reach their full potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-forest to-mint">
                  <FaLightbulb className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                To be the leading technology partner for businesses seeking to climb digital 
                peaks. We envision a future where every organization has access to cutting-edge 
                technology solutions that enable them to compete and thrive in the digital landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.05), rgba(46,58,89,0.05))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              These values guide everything we do and shape how we work with our clients and each other.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              We bring together diverse skills and deep technical knowledge to deliver comprehensive solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift text-center"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest w-fit mx-auto mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(46,58,89,0.05), rgba(58,123,213,0.05))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-slate-300">
              From humble beginnings to becoming a trusted technology partner.
            </p>
          </motion.div>

          <div className="relative">
            {[
              {
                year: "2021",
                title: "The Beginning",
                description: "Two brothers with a shared passion for technology and innovation decided to start Blue Peak Web-Solutions."
              },
              {
                year: "2022",
                title: "First Major Projects",
                description: "Successfully delivered our first hospital management system and e-commerce platform, establishing our reputation."
              },
              {
                year: "2023",
                title: "Expansion & Growth",
                description: "Expanded our services to include cybersecurity, cloud solutions, and mobile app development."
              },
              {
                year: "2024",
                title: "Innovation & Excellence",
                description: "Continued to push boundaries with AI integration, advanced analytics, and cutting-edge technologies."
              }
            ].map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's discuss how we can help you reach your digital peak with our expertise and passion for technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start a Project
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-slate-600 text-slate-200 rounded-lg font-semibold hover:border-skyblue hover:text-skyblue transition-all duration-300"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
