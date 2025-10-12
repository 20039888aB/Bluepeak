import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-sm ${
            index < rating ? "text-yellow-400" : "text-slate-600"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-skyblue/50 transition-all duration-300 hover-lift relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-skyblue/20 group-hover:text-skyblue/40 transition-colors">
        <FaQuoteLeft size={24} />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-slate-300 leading-relaxed mb-6 italic">
        "{testimonial.text}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-skyblue to-forest flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-slate-400">{testimonial.position}</div>
          <div className="text-sm text-skyblue">{testimonial.company}</div>
        </div>
      </div>

      {/* Project Type */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <span className="px-3 py-1 bg-skyblue/20 text-skyblue text-xs rounded-full">
          {testimonial.projectType}
        </span>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      position: "Hospital Administrator",
      company: "Optimal Family Hospital",
      rating: 5,
      text: "Blue Peak delivered an exceptional hospital management system that streamlined our operations. The team's attention to detail and understanding of healthcare workflows was impressive. Our staff productivity increased by 40%.",
      projectType: "Hospital Management System"
    },
    {
      name: "Michael Chen",
      position: "CEO",
      company: "TechStart Solutions",
      rating: 5,
      text: "Working with Blue Peak was a game-changer for our startup. They built a scalable e-commerce platform that handles our growing customer base seamlessly. Their technical expertise and communication are top-notch.",
      projectType: "E-commerce Platform"
    },
    {
      name: "Emily Rodriguez",
      position: "IT Director",
      company: "Greenwood School District",
      rating: 5,
      text: "The school management system Blue Peak developed has revolutionized how we handle student data and parent communication. The interface is intuitive, and the support team is always responsive to our needs.",
      projectType: "School Management System"
    },
    {
      name: "David Thompson",
      position: "Operations Manager",
      company: "SecureVote Elections",
      rating: 5,
      text: "Blue Peak's election management system exceeded our expectations. The security features and real-time reporting capabilities gave us complete confidence in the integrity of our voting process.",
      projectType: "Election Management System"
    },
    {
      name: "Lisa Wang",
      position: "Marketing Director",
      company: "RetailMax Corporation",
      rating: 4,
      text: "The business analytics dashboard Blue Peak created provides us with insights we never had before. Our decision-making process is now data-driven, and we've seen a 25% improvement in our marketing ROI.",
      projectType: "Business Analytics Dashboard"
    },
    {
      name: "James Wilson",
      position: "CTO",
      company: "FinanceFlow Bank",
      rating: 5,
      text: "Blue Peak's mobile banking app development was flawless. The security implementation and user experience design are outstanding. Our customer satisfaction scores have never been higher.",
      projectType: "Mobile Banking App"
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
            What Our Clients Say
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our satisfied clients have to say 
            about working with Blue Peak Web-Solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Overall Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9</div>
              <StarRating rating={5} />
              <div className="text-sm text-slate-400 mt-1">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-slate-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-slate-400 mt-1">Projects Completed</div>
            </div>
            <div className="h-12 w-px bg-slate-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-slate-400 mt-1">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
