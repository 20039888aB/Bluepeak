import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FixedPhoneIcon from "./components/FixedPhoneIcon";
import BluePeakAI from "./components/BluePeakAI";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ClientsPage from "./admin/pages/ClientsPage";
import DocumentsList from "./admin/pages/DocumentsList";
import DocumentEditor from "./admin/pages/DocumentEditor";
import DocumentView from "./admin/pages/DocumentView";
import AdminSettings from "./admin/pages/AdminSettings";

function PublicShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FixedPhoneIcon />
      <BluePeakAI />
    </div>
  );
}

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<ClientsPage />} />
          <Route path="/admin/invoices" element={<DocumentsList type="invoice" />} />
          <Route path="/admin/invoices/new" element={<DocumentEditor type="invoice" />} />
          <Route path="/admin/invoices/:id" element={<DocumentView type="invoice" />} />
          <Route path="/admin/invoices/:id/edit" element={<DocumentEditor type="invoice" />} />
          <Route path="/admin/quotations" element={<DocumentsList type="quotation" />} />
          <Route path="/admin/quotations/new" element={<DocumentEditor type="quotation" />} />
          <Route path="/admin/quotations/:id" element={<DocumentView type="quotation" />} />
          <Route path="/admin/quotations/:id/edit" element={<DocumentEditor type="quotation" />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <PublicShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PublicShell>
  );
}
