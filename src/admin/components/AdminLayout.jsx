import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineLogout,
  HiMenuAlt3,
  HiX,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { GiMountains } from "react-icons/gi";
import { useAdminAuth } from "../context/AdminAuthContext";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: HiOutlineHome },
  { to: "/admin/invoices", label: "Invoices", icon: HiOutlineDocumentText },
  { to: "/admin/quotations", label: "Quotations", icon: HiOutlineClipboardList },
  { to: "/admin/clients", label: "Clients", icon: HiOutlineUsers },
  { to: "/admin/settings", label: "Settings", icon: HiOutlineCog },
];

function SideLink({ to, label, icon: Icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-gradient-to-r from-skyblue to-forest text-white shadow-lg shadow-skyblue/20"
            : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
        }`
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  const { session, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 border-b border-slate-700/60">
        <Link to="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-skyblue to-forest flex items-center justify-center shadow-lg">
            <GiMountains className="text-white text-xl" />
          </div>
          <div>
            <p className="font-bold text-white leading-tight group-hover:text-skyblue transition-colors">
              Blue Peak
            </p>
            <p className="text-xs text-slate-400">Invoice Studio</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => (
          <SideLink
            key={item.to}
            {...item}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-700/60 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
        >
          <HiOutlineExternalLink className="w-5 h-5" />
          View website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-rose-300 hover:bg-rose-500/10 transition-all"
        >
          <HiOutlineLogout className="w-5 h-5" />
          Sign out
        </button>
        <p className="px-4 pt-2 text-xs text-slate-500 truncate">
          Signed in as {session?.username || "admin"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-800/80 bg-slate-950/80 sticky top-0 h-screen">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 lg:hidden"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 h-14 border-b border-slate-800/80 bg-[#070d18]/90 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            aria-label="Open menu"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
          <span className="font-semibold text-white">Invoice Studio</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
