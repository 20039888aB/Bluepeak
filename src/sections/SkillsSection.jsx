import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SkillBar = ({ name, level, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-slate-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className="h-full bg-gradient-to-r from-skyblue to-forest rounded-full relative"
        >
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scaleX: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
    >
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={index}
            name={skill.name}
            level={skill.level}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React & Next.js", level: 95 },
        { name: "JavaScript & TypeScript", level: 90 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Tailwind CSS", level: 88 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Python & Django", level: 92 },
        { name: "Node.js & Express", level: 85 },
        { name: "Database Design", level: 88 },
        { name: "API Development", level: 90 }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS & Google Cloud", level: 80 },
        { name: "Docker & Kubernetes", level: 75 },
        { name: "CI/CD Pipelines", level: 78 },
        { name: "Server Management", level: 85 }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "UI/UX Design", level: 82 },
        { name: "Figma & Adobe Creative", level: 80 },
        { name: "Git & Version Control", level: 90 },
        { name: "Project Management", level: 85 }
      ]
    }
  ];

  return (
    <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(46,58,89,0.05), rgba(58,123,213,0.05))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Our Technical Expertise
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            We combine modern engineering practices with design thinking to deliver 
            practical, scalable solutions that drive business growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              skills={category.skills}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Firebase", "MongoDB", "PostgreSQL", "Redis", "GraphQL", 
              "WebSocket", "PWA", "Microservices", "Machine Learning", 
              "Blockchain", "IoT", "Mobile Development"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700 hover:border-skyblue/50 hover:text-skyblue transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
