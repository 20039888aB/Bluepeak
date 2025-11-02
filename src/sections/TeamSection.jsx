import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaCode,
  FaServer,
  FaPalette,
  FaShieldAlt
} from "react-icons/fa";

const TeamMember = ({ member, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getRoleIcon = (role) => {
    if (role.includes("Frontend")) return FaCode;
    if (role.includes("Backend") || role.includes("DevOps")) return FaServer;
    if (role.includes("Design")) return FaPalette;
    if (role.includes("Security")) return FaShieldAlt;
    return FaCode;
  };

  const RoleIcon = getRoleIcon(member.role);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift"
    >
      {/* Profile Image */}
      <div className="relative mb-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-skyblue to-forest p-1 team-avatar-glow">
          <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-slate-800 border-2 border-slate-700">
          <RoleIcon className="text-skyblue" size={16} />
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-skyblue font-medium mb-2">{member.role}</p>
        <p className="text-slate-400 text-sm">{member.bio}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {member.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-3">
        {member.social.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-slate-700/50 text-slate-400 hover:bg-skyblue hover:text-white transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <social.icon size={16} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Felix Mngola Onyango",
      role: "Co-Founder / Full-Stack Engineer",
      bio: "Full-stack engineer with a frontend craftsman’s touch, delivering cohesive experiences from design systems to backend services.",
      image: "/images/Felix.jpg",
      skills: ["React", "TypeScript", "Node.js", "UI/UX", "Animation"],
      social: [
        { icon: FaGithub, url: "#" },
        { icon: FaLinkedin, url: "#" },
        { icon: FaTwitter, url: "#" },
        { icon: FaEnvelope, url: "mailto:bluepeakw@gmail.com" }
      ]
    },
    {
      name: "Andrew Mwandoe Onyango",
      role: "Co-Founder / Backend & DevOps Engineer",
      bio: "Expert in scalable backend systems, cloud infrastructure, and database optimization.",
      image: "/images/Andrew.jpg",
      skills: ["Python", "Django", "AWS", "Docker"],
      social: [
        { icon: FaGithub, url: "#" },
        { icon: FaLinkedin, url: "#" },
        { icon: FaTwitter, url: "#" },
        { icon: FaEnvelope, url: "mailto:bluepeakw@gmail.com" }
      ]
    },
    {
      name: "Benson Maina",
      role: "Co-Founder / Full-Stack Web Developer",
      bio: "Bridges frontend polish with backend performance, delivering end-to-end platforms that scale.",
      image: "/images/Benson.jpg",
      skills: ["React", "Next.js", "Node.js", "Django", "PostgreSQL", "API Design"],
      social: [
        { icon: FaGithub, url: "#" },
        { icon: FaLinkedin, url: "#" },
        { icon: FaTwitter, url: "#" },
        { icon: FaEnvelope, url: "mailto:bluepeakw@gmail.com" }
      ]
    }
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
            Meet Our Key Developers
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            The passionate team behind Blue Peak Web-Solutions is led by co-founders Felix Mngola Onyango, Andrew Mwandoe Onyango, and Benson Maina. Together we combine technical expertise 
            with creative vision to deliver exceptional digital solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              member={member}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "5+", label: "Years Combined Experience" },
            { number: "50+", label: "Projects Delivered" },
            { number: "15+", label: "Technologies Mastered" },
            { number: "100%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="text-2xl font-bold text-skyblue mb-1">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
