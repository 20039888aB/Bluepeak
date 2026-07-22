export const COMPANY = {
  name: "Blue Peak Web-Solutions",
  tagline: "Hosting · Web Development · Cloud & IT",
  email: "bluepeakw@gmail.com",
  phone: "+254 115 138 594",
  phoneAlt: "+254 115 034 956",
  website: "https://bluepeakweb.com",
  address: "Nairobi, Kenya",
  addressLine2: "Global Remote Services · Available Worldwide",
  logo: "/images/logo-print.svg",
  currency: "KES",
  currencySymbol: "KSh",
};

export const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "BluePeak@Admin",
};

export const INVOICE_STATUSES = [
  { id: "draft", label: "Draft", color: "slate" },
  { id: "sent", label: "Sent", color: "sky" },
  { id: "paid", label: "Paid", color: "emerald" },
  { id: "overdue", label: "Overdue", color: "rose" },
  { id: "cancelled", label: "Cancelled", color: "zinc" },
];

export const QUOTATION_STATUSES = [
  { id: "draft", label: "Draft", color: "slate" },
  { id: "sent", label: "Sent", color: "sky" },
  { id: "accepted", label: "Accepted", color: "emerald" },
  { id: "declined", label: "Declined", color: "rose" },
  { id: "expired", label: "Expired", color: "amber" },
];

export const SERVICE_PRESETS = [
  { description: "Custom Website Development", unitPrice: 85000 },
  { description: "E-commerce Store Setup", unitPrice: 120000 },
  { description: "Web Hosting (Annual)", unitPrice: 18000 },
  { description: "Domain Registration (.com / .ke)", unitPrice: 2500 },
  { description: "SSL Certificate & Security Setup", unitPrice: 4500 },
  { description: "SEO Optimization Package", unitPrice: 35000 },
  { description: "Cloud Migration & Setup", unitPrice: 65000 },
  { description: "IT Consulting (per day)", unitPrice: 15000 },
  { description: "Mobile App Development", unitPrice: 180000 },
  { description: "Brand Identity & Logo Design", unitPrice: 25000 },
  { description: "Website Maintenance (Monthly)", unitPrice: 8000 },
  { description: "AI Chatbot Integration", unitPrice: 45000 },
];

export const STORAGE_KEYS = {
  clients: "bluepeak_admin_clients",
  invoices: "bluepeak_admin_invoices",
  quotations: "bluepeak_admin_quotations",
  settings: "bluepeak_admin_settings",
  session: "bluepeak_admin_session",
  credentials: "bluepeak_admin_credentials",
};
