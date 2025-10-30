import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaUser, 
  FaSpinner,
  FaLightbulb,
  FaCode,
  FaServer,
  FaShieldAlt,
  FaCloud,
  FaMobile,
  FaPalette,
  FaChartLine
} from "react-icons/fa";

const BluePeakAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm Blue Peak AI, your intelligent assistant. I can help you with information about our services, projects, and answer any questions you have about Blue Peak Web-Solutions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // AI Knowledge Base
  const knowledgeBase = {
    greetings: [
      "Hello! Welcome to Blue Peak Web-Solutions! How can I help you today?",
      "Hi there! I'm Blue Peak AI, ready to assist you with any questions about our services.",
      "Greetings! I'm here to help you learn more about Blue Peak's technology solutions."
    ],
    services: {
      web: "We offer comprehensive web development services including custom websites, e-commerce platforms, and web applications using modern technologies like React, Django, and Node.js.",
      cloud: "Our cloud solutions include AWS, Google Cloud, and Azure deployment, server management, database setup, and cloud infrastructure optimization.",
      security: "We provide cybersecurity services including penetration testing, vulnerability assessments, SSL installation, and security audits to protect your digital assets.",
      mobile: "We develop cross-platform mobile applications for iOS and Android using React Native and native development approaches.",
      design: "Our UI/UX design services include user interface design, user experience optimization, branding, and visual identity creation.",
      marketing: "We offer digital marketing services including SEO, social media management, content marketing, and online advertising campaigns."
    },
    company: {
      about: "Blue Peak Web-Solutions is a technology company founded by two passionate brothers, Felix Mngola and Felix Mngola. We specialize in building digital peaks for businesses worldwide, combining technical expertise with creative vision.",
      mission: "Our mission is to empower businesses with innovative technology solutions that drive growth, enhance efficiency, and create meaningful digital experiences.",
      vision: "To be the leading technology partner for businesses seeking to climb digital peaks, providing cutting-edge solutions that enable organizations to compete and thrive in the digital landscape.",
      contact: "You can reach us at +254 115 034 956 (Felix Mngola) or +254 115 138 594 (Felix Mngola). We also have WhatsApp available and email at bluepeakw@gmail.com."
    },
    projects: "We've completed over 50 projects including hospital management systems, e-commerce platforms, election management systems, school management portals, and mobile banking applications. Our projects span various industries and use cutting-edge technologies.",
    pricing: "Our pricing varies based on project complexity and requirements. We offer flexible budget ranges from under $5,000 to $50,000+ projects. Contact us for a personalized quote based on your specific needs.",
    location: "We provide global remote services and are available worldwide. Our team is based in Kenya but serves clients globally with our comprehensive technology solutions."
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }
    
    // Services
    if (message.includes('web development') || message.includes('website')) {
      return knowledgeBase.services.web;
    }
    if (message.includes('cloud') || message.includes('server')) {
      return knowledgeBase.services.cloud;
    }
    if (message.includes('security') || message.includes('cybersecurity')) {
      return knowledgeBase.services.security;
    }
    if (message.includes('mobile') || message.includes('app')) {
      return knowledgeBase.services.mobile;
    }
    if (message.includes('design') || message.includes('ui') || message.includes('ux')) {
      return knowledgeBase.services.design;
    }
    if (message.includes('marketing') || message.includes('seo')) {
      return knowledgeBase.services.marketing;
    }
    if (message.includes('service') || message.includes('what do you do')) {
      return "We offer a comprehensive range of technology services including Web Development, Cloud Solutions, Cybersecurity, Mobile Development, UI/UX Design, Digital Marketing, IT Consulting, and Custom Project Development. What specific service are you interested in?";
    }
    
    // Company Information
    if (message.includes('about') || message.includes('company') || message.includes('who are you')) {
      return knowledgeBase.company.about;
    }
    if (message.includes('mission')) {
      return knowledgeBase.company.mission;
    }
    if (message.includes('vision')) {
      return knowledgeBase.company.vision;
    }
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return knowledgeBase.company.contact;
    }
    
    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return knowledgeBase.projects;
    }
    
    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      return knowledgeBase.pricing;
    }
    
    // Location
    if (message.includes('location') || message.includes('where') || message.includes('based')) {
      return knowledgeBase.location;
    }
    
    // Help
    if (message.includes('help') || message.includes('what can you do')) {
      return "I can help you with information about our services, company details, project examples, pricing, contact information, and answer questions about Blue Peak Web-Solutions. What would you like to know?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! I'd be happy to help you with that. Could you provide more details about what you're looking for?",
      "I understand you're asking about that topic. Let me connect you with the right information. What specific aspect would you like to know more about?",
      "Great question! I can help you with information about our services, projects, or company details. What specific area interests you most?",
      "I'm here to help! Could you tell me more about what you're looking for so I can provide you with the most relevant information?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "What services do you offer?", icon: FaCode },
    { text: "Tell me about your projects", icon: FaServer },
    { text: "How can I contact you?", icon: FaUser },
    { text: "What's your pricing?", icon: FaChartLine }
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-24 z-50 w-16 h-16 bg-gradient-to-r from-skyblue to-forest text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Chat with Blue Peak AI"
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-24 z-50 w-96 h-[500px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-skyblue to-forest p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaRobot size={20} />
                  <div>
                    <h3 className="font-semibold">Blue Peak AI</h3>
                    <p className="text-xs opacity-90">Your intelligent assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[350px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-skyblue' 
                        : 'bg-gradient-to-r from-skyblue to-forest'
                    }`}>
                      {message.type === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-skyblue text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-lg">
                    <FaSpinner className="animate-spin text-skyblue" size={14} />
                    <span className="text-sm text-slate-300">Blue Peak AI is typing...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-2 border-t border-slate-700">
              <div className="flex flex-wrap gap-2 mb-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(action.text)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                  >
                    <action.icon size={10} />
                    {action.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:border-skyblue focus:outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-skyblue text-white rounded-lg hover:bg-skyblue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BluePeakAI;
