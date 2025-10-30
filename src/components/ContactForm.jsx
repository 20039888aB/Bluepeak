import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const ref = collection(db, "inquiries");
      await addDoc(ref, {
        name: name.trim().slice(0, 100),
        email: email.trim().slice(0, 254),
        message: message.trim().slice(0, 5000),
        createdAt: serverTimestamp(),
        source: "website_contact_form"
      });

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              border: '2px solid #475569',
              color: '#ffffff',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3A7BD5'}
            onBlur={(e) => e.target.style.borderColor = '#475569'}
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
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              border: '2px solid #475569',
              color: '#ffffff',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3A7BD5'}
            onBlur={(e) => e.target.style.borderColor = '#475569'}
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Project Details / Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#1e293b',
            border: '2px solid #475569',
            color: '#ffffff',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            resize: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3A7BD5'}
          onBlur={(e) => e.target.style.borderColor = '#475569'}
          placeholder="Tell us about your project, requirements, timeline, or any questions you have..."
        />
      </div>

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
  );
}


