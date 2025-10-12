import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaUsers, FaCalendarAlt, FaHeadset } from "react-icons/fa";

const StatCard = ({ number, label, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-skyblue to-forest">
          <Icon className="text-white" size={24} />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-3xl font-bold text-white mb-2"
      >
        {number}
      </motion.div>
      <div className="text-slate-300 text-sm">{label}</div>
    </motion.div>
  );
};

export default function StatsSection() {
  const stats = [
    { number: "50+", label: "Projects Completed", icon: FaCode },
    { number: "25+", label: "Happy Clients", icon: FaUsers },
    { number: "3+", label: "Years Experience", icon: FaCalendarAlt },
    { number: "24/7", label: "Support Available", icon: FaHeadset }
  ];

  return (
    <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(58,123,213,0.05), rgba(11,61,46,0.05))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Delivering exceptional results through innovative solutions and dedicated service
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
