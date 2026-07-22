import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { getSession, isAuthenticated, login as doLogin, logout as doLogout } from "../lib/auth";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());

  const login = useCallback((username, password) => {
    const result = doLogin(username, password);
    if (result.success) setSession(result.session);
    return result;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token) || isAuthenticated(),
      login,
      logout,
    }),
    [session, login, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
