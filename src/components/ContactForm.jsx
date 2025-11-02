import React, { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init("ooRPw6P35bA96Jr64");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatusText("⚠️ Please fill in all fields!");
      return;
    }

    setIsSubmitting(true);
    setStatusText("");

    try {
      // 1) Save to Firestore first (messages). If rules block, fallback to inquiries shape.
      try {
        await addDoc(collection(db, "messages"), {
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        // If rules cause permission error, fallback to `inquiries` with required 'source'
        if (err && err.code === "permission-denied") {
          await addDoc(collection(db, "inquiries"), {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            createdAt: serverTimestamp(),
            source: "website_contact_form"
          });
        } else {
          throw err;
        }
      }
      
      // 2) Attempt to send email via EmailJS (non-blocking for success)
      try {
        // Primary attempt with your provided IDs and public key
        await emailjs.send(
          "service_k9f1r3a",
          "template_u6vph33",
          { name: trimmedName, email: trimmedEmail, message: trimmedMessage },
          "ooRPw6P35bA96Jr64"
        );
        setStatusText("✅ Message sent successfully!");
      } catch (emailErr) {
        console.error("EmailJS Error (primary):", emailErr);
        // Fallback attempt with common EmailJS variable names
        try {
          await emailjs.send(
            "service_k9f1r3a",
            "template_u6vph33",
            { from_name: trimmedName, reply_to: trimmedEmail, message: trimmedMessage },
            "ooRPw6P35bA96Jr64"
          );
          setStatusText("✅ Message sent successfully!");
        } catch (emailErr2) {
          console.error("EmailJS Error (fallback):", emailErr2);
          const errorDetail = emailErr2?.text || emailErr2?.message || emailErr?.text || emailErr?.message;
          setStatusText(
            errorDetail
              ? `⚠️ Message stored, but email not sent. EmailJS says: ${errorDetail}`
              : "⚠️ Message stored, but email not sent."
          );
        }
      }

      setName("");
      setEmail("");
      setMessage("");
    } catch (firestoreErr) {
      console.error("Firestore Error:", firestoreErr);
      setStatusText("❌ Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(0, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 40,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
    transition: "0.3s ease-in-out",
    margin: "0 auto",
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto"
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(0, 255, 255, 0.4)",
    borderRadius: 12,
    padding: "12px 15px",
    color: "#fff",
    fontSize: 15,
    outline: "none",
    marginBottom: 15,
    transition: "0.3s"
  };

  const buttonStyle = {
    width: "100%",
    padding: 12,
    border: "none",
    background: "linear-gradient(90deg, #00ffff, #0077ff)",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 20,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: 15
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#00ffff", marginBottom: 20, letterSpacing: 1 }}>Contact Us</h2>
      <form onSubmit={handleSubmit} id="contactForm">
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <textarea
          id="message"
          rows={5}
          placeholder="Your Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <button type="submit" style={buttonStyle} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
      <p id="status" style={{ marginTop: 10, textAlign: "center", color: "#00ffff", fontSize: 14 }}>{statusText}</p>
    </div>
  );
}
