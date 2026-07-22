import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiMountains } from "react-icons/gi";
import { HiOutlineLockClosed, HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getDefaultLoginHint } from "../lib/auth";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hint = getDefaultLoginHint();

  const [username, setUsername] = useState(hint?.username || "");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Tiny delay for UX polish
    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);
      if (result.success) {
        const dest = location.state?.from || "/admin/dashboard";
        navigate(dest, { replace: true });
      } else {
        setError(result.error || "Login failed");
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#060a14]">
      <div className="absolute inset-0 animated-gradient opacity-60 pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3A7BD5 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0B3D2E 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="px-8 pt-10 pb-6 text-center border-b border-slate-800">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue to-forest flex items-center justify-center shadow-lg shadow-skyblue/30 mb-4">
              <GiMountains className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Access</h1>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to create invoices & quotations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label htmlFor="admin-user" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  id="admin-user"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-skyblue focus:ring-1 focus:ring-skyblue transition"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  id="admin-pass"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-skyblue focus:ring-1 focus:ring-skyblue transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-skyblue to-forest hover:opacity-95 disabled:opacity-60 shadow-lg shadow-skyblue/20 transition"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            {hint && (
              <p className="text-xs text-center text-slate-500 leading-relaxed">
                Default login: <span className="text-slate-400">{hint.username}</span> /{" "}
                <span className="text-slate-400">{hint.password}</span>
                <br />
                Change this in Settings after you sign in.
              </p>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Frontend-only · data stored in this browser
        </p>
      </motion.div>
    </div>
  );
}
