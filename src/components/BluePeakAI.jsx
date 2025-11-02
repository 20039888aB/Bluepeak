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
      marketing: "We offer digital marketing services including SEO, social media management, content marketing, and online advertising campaigns.",
      fullstack: "Need end-to-end product delivery? Our co-founders Felix Mngola Onyango and Benson Maina lead full-stack builds that combine pixel-perfect frontends with robust backend architecture, CI/CD pipelines, and production monitoring."
    },
    company: {
      about: "Blue Peak Web-Solutions is a technology company founded by brothers Felix Mngola Onyango and Andrew Mwandoe Onyango together with their fellow co-founder Benson Maina. We specialize in building digital peaks for businesses worldwide, combining technical expertise with creative vision.",
      mission: "Our mission is to empower businesses with innovative technology solutions that drive growth, enhance efficiency, and create meaningful digital experiences.",
      vision: "To be the leading technology partner for businesses seeking to climb digital peaks, providing cutting-edge solutions that enable organizations to compete and thrive in the digital landscape.",
      contact: "You can reach us at +254 115 034 956 (Felix Mngola Onyango) or +254 115 138 594 (Andrew Mwandoe Onyango). For full-stack engagements, co-founder Benson Maina can be reached through bluepeakw@gmail.com. We also have WhatsApp available at the listed numbers."
    },
    projects: "We've completed over 50 projects including hospital management systems, e-commerce platforms, election management systems, school management portals, and mobile banking applications. Our projects span various industries and use cutting-edge technologies.",
    pricingSummary: "Pricing depends on scope, integrations, and timelines. Core website bundles start below $400, while larger web apps, mobile builds, or multi-platform programs can reach $35,000+. Share your must-haves and I’ll map you to an exact bracket.",
    location: "We provide global remote services and are available worldwide. Our team is based in Kenya but serves clients globally with our comprehensive technology solutions.",
    team: {
      founders: "Our leadership trio includes brothers Felix Mngola Onyango (full-stack engineer with a frontend craftsman focus) and Andrew Mwandoe Onyango (backend and DevOps lead) alongside fellow co-founder Benson Maina, a full-stack web developer who bridges UI polish with backend reliability.",
      benson: "Benson Maina is our co-founder and resident full-stack developer. He architects scalable backend services, builds high-performing React/Next.js frontends, and ensures reliable deployments with CI/CD and observability.",
      felix: "Felix Mngola Onyango blends frontend artistry with full-stack capability—handling everything from design systems to Node.js/Django services to ensure cohesive product delivery.",
      fullstack: "Full-stack projects are co-led by Felix Mngola Onyango and Benson Maina, covering product discovery, frontend architecture, backend services, database design, and infrastructure automation to ship complete, tested solutions."
    }
  };

  const pricingCatalog = [
    {
      id: "web",
      label: "Modern Websites",
      keywords: ["web", "website", "site", "corporate"],
      headlineRange: "$280 – $400",
      timeline: "2–4 weeks",
      includes: [
        "Responsive UI/UX with up to 6 pages",
        "CMS handover and basic automations",
        "On-page SEO, analytics & launch support"
      ],
      maintenance: "$45–$85/mo (hosting, backups, content tweaks)"
    },
    {
      id: "ecommerce",
      label: "E-commerce Platforms",
      keywords: ["e-commerce", "shop", "store", "commerce", "cart"],
      headlineRange: "$6,500 – $18,000",
      timeline: "6–12 weeks",
      includes: [
        "Catalog & inventory management",
        "Payment, shipping & tax automation",
        "Analytics, CRM & marketing integrations"
      ],
      maintenance: "$260–$420/mo (security scans, feature rollouts)"
    },
    {
      id: "webapp",
      label: "Custom Web Applications",
      keywords: ["portal", "dashboard", "web app", "saas", "platform"],
      headlineRange: "$9,500 – $28,000",
      timeline: "8–16 weeks",
      includes: [
        "Tailored workflows & API integrations",
        "Role-based access and analytics",
        "QA, staging, and deployment pipelines"
      ],
      maintenance: "$320–$540/mo (DevOps, scaling, enhancements)"
    },
    {
      id: "mobile",
      label: "Mobile Apps (iOS & Android)",
      keywords: ["mobile", "app", "ios", "android", "react native"],
      headlineRange: "$12,000 – $32,000",
      timeline: "10–20 weeks",
      includes: [
        "Product discovery & UX flows",
        "Native or cross-platform build",
        "App store submission & analytics"
      ],
      maintenance: "$360–$600/mo (OS updates, new features, monitoring)"
    },
    {
      id: "seo",
      label: "SEO & Growth Marketing",
      keywords: ["seo", "marketing", "growth", "ads", "campaign"],
      headlineRange: "$850 – $2,400 per month",
      timeline: "3–6 month retainers",
      includes: [
        "Technical SEO audits & fixes",
        "Content strategy & link outreach",
        "Paid ads setup, tracking & optimization"
      ],
      maintenance: "Included in monthly engagement"
    },
    {
      id: "brand",
      label: "Branding & UI Systems",
      keywords: ["branding", "brand", "ui", "design", "identity", "logo"],
      headlineRange: "$1,400 – $6,500",
      timeline: "3–6 weeks",
      includes: [
        "Visual identity & style guide",
        "Component library & design tokens",
        "Collateral templates (deck, social, print)"
      ],
      maintenance: "On-demand refresh or per-campaign add-ons"
    }
  ];

  const buildPricingResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const matched = pricingCatalog.filter((item) =>
      item.keywords.some((keyword) => lowerMessage.includes(keyword))
    );

    const sections = (matched.length > 0 ? matched : pricingCatalog).map((item) => {
      const includesList = item.includes.map((line) => `• ${line}`).join("\n  ");
      return (
        `✨ ${item.label}\n` +
        `  Budget: ${item.headlineRange}\n` +
        `  Timeline: ${item.timeline}\n` +
        `  What you get:\n  ${includesList}\n` +
        `  Ongoing care: ${item.maintenance}\n`
      );
    });

    const intro = matched.length
      ? "Here’s a focused estimate based on what you mentioned:" 
      : "Here’s our latest pricing roadmap for the core services we offer:";

    const closing =
      "All quotes include a dedicated project lead, weekly progress reviews, and post-launch support. Share your timeline, feature must-haves, and budget comfort zone and I’ll prepare a personalized estimate in under 24 hours.";

    return `${intro}\n\n${sections.join("\n")}\n${closing}`;
  };

  const buildTimelineResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const matched = pricingCatalog.filter((item) =>
      item.keywords.some((keyword) => lowerMessage.includes(keyword))
    );

    const sections = (matched.length > 0 ? matched : pricingCatalog).map((item) => {
      return (
        `⏱️ ${item.label}\n` +
        `  Estimated delivery: ${item.timeline}\n` +
        `  Includes: discovery, design, build, QA, and launch support.`
      );
    });

    const intro = matched.length
      ? "Here’s how long projects like yours typically take:" 
      : "Here’s the delivery window we usually quote for our core services:";

    const closing =
      "Exact timing depends on revision rounds, integrations, and stakeholder feedback—but we build buffer into every plan so launches stay on track. Share your target date and we’ll align the sprint plan for you.";

    return `${intro}\n\n${sections.join("\n\n")}\n\n${closing}`;
  };

  const callLLM = async (userMessage, historyPayload) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage,
          history: historyPayload
        })
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `LLM request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data?.reply) {
        return data.reply.trim();
      }
    } catch (error) {
      console.error("LLM fetch error:", error);
    }

    return null;
  };

  const getAIResponse = async (userMessage, historyPayload) => {
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
    if (message.includes('full stack') || message.includes('fullstack')) {
      return knowledgeBase.services.fullstack;
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
    if (message.includes('benson') || message.includes('maina')) {
      return knowledgeBase.company.team.benson;
    }
    if (message.includes('felix') && message.includes('full')) {
      return knowledgeBase.company.team.felix;
    }
    if (
      message.includes('founder') ||
      message.includes('co-founder') ||
      message.includes('cofounder') ||
      message.includes('leadership')
    ) {
      return knowledgeBase.company.team.founders;
    }

    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return knowledgeBase.projects;
    }

    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('pricing')) {
      return buildPricingResponse(message);
    }

    // Timeline
    if (
      message.includes('how long') ||
      message.includes('timeline') ||
      message.includes('timeframe') ||
      message.includes('time frame') ||
      message.includes('duration') ||
      message.includes('turnaround') ||
      message.includes('delivery time')
    ) {
      return buildTimelineResponse(userMessage);
    }

    // Location
    if (message.includes('location') || message.includes('where') || message.includes('based')) {
      return knowledgeBase.location;
    }

    // Help
    if (message.includes('help') || message.includes('what can you do')) {
      return "I can help you with information about our services, company details, project examples, pricing, contact information, and answer questions about Blue Peak Web-Solutions. What would you like to know?";
    }

    if (message.includes('team')) {
      return knowledgeBase.company.team.founders;
    }

    const defaultResponses = [
      "That's an interesting question! I'd be happy to help you with that. Could you provide more details about what you're looking for?",
      "I understand you're asking about that topic. Let me connect you with the right information. What specific aspect would you like to know more about?",
      "Great question! I can help you with information about our services, projects, or company details. What specific area interests you most?",
      "I'm here to help! Could you tell me more about what you're looking for so I can provide you with the most relevant information?"
    ];

    const llmFallback = await callLLM(userMessage, historyPayload);
    if (llmFallback) {
      return llmFallback;
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const historyPayload = [...messages, userMessage]
        .slice(-8)
        .map(({ type, text }) => ({ type, text }));

      const aiResponse = await getAIResponse(messageText, historyPayload);

      const simulatedDelay = 600 + Math.random() * 800;
      await new Promise((resolve) => setTimeout(resolve, simulatedDelay));

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: aiResponse || "I'm here for you! Could you rephrase that so I can help better?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat response error:", error);
      const fallback = {
        id: Date.now() + 2,
        type: 'bot',
        text: "I’m sorry, I’m having trouble responding right now. Could you try again in a moment?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
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
