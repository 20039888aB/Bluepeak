import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner
} from "react-icons/fa";

const ContactInfo = ({ icon: Icon, title, description, delay = 0 }) => {
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
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-skyblue to-forest">
          <Icon className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Save to Firestore
      const ref = collection(db, "inquiries");
      await addDoc(ref, {
        ...form,
        createdAt: serverTimestamp(),
        source: "website_contact_form"
      });

      // Send email via EmailJS (optional - you'll need to configure this)
      try {
        const serviceId = "YOUR_EMAILJS_SERVICE_ID";
        const templateId = "YOUR_EMAILJS_TEMPLATE_ID";
        const userId = "YOUR_EMAILJS_USER_ID";
        
        const templateParams = {
          from_name: form.name,
          from_email: form.email,
          from_phone: form.phone,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
          to_name: "Blue Peak Team"
        };

        await emailjs.send(serviceId, templateId, templateParams, userId);
      } catch (emailError) {
        console.log("EmailJS not configured, but form saved to Firestore");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      description: "contact@bluepeak.com\ninfo@bluepeak.com"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      description: "+1 (555) 123-4567\n+1 (555) 987-6543"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      description: "Global Remote Services\nAvailable Worldwide"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      description: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM"
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
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your next project? Have questions about our services? 
              We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <ContactInfo
                key={index}
                icon={info.icon}
                title={info.title}
                description={info.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 section-bg" style={{ backgroundImage: "linear-gradient(135deg, rgba(11,61,46,0.05), rgba(46,58,89,0.05))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-slate-300">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-skyblue focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-skyblue focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-skyblue focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-skyblue focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Service and Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-skyblue focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Cloud Solutions">Cloud Solutions</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="IT Consulting">IT Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-skyblue focus:outline-none transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="To be discussed">To be discussed</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Project Details / Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-skyblue focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project, requirements, timeline, or any questions you have..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-skyblue to-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-400"
                  >
                    <FaCheckCircle />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-red-400"
                  >
                    <FaExclamationCircle />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Choose Blue Peak?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-4">
                <div className="text-skyblue text-2xl font-bold mb-2">24/7</div>
                <div className="text-slate-300 text-sm">Support Available</div>
              </div>
              <div className="p-4">
                <div className="text-forest text-2xl font-bold mb-2">100%</div>
                <div className="text-slate-300 text-sm">Client Satisfaction</div>
              </div>
              <div className="p-4">
                <div className="text-mint text-2xl font-bold mb-2">Fast</div>
                <div className="text-slate-300 text-sm">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
