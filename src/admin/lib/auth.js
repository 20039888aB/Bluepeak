import { DEFAULT_CREDENTIALS, STORAGE_KEYS } from "./constants";

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return `bp_${Math.abs(h).toString(36)}_${btoa(unescape(encodeURIComponent(str))).slice(0, 16)}`;
}

function getStoredCredentials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.credentials);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {
    username: DEFAULT_CREDENTIALS.username,
    passwordHash: simpleHash(DEFAULT_CREDENTIALS.password),
  };
}

export function login(username, password) {
  const creds = getStoredCredentials();
  const ok =
    username.trim().toLowerCase() === creds.username.toLowerCase() &&
    simpleHash(password) === creds.passwordHash;

  if (!ok) return { success: false, error: "Invalid username or password" };

  const session = {
    username: creds.username,
    loggedInAt: new Date().toISOString(),
    token: simpleHash(`${creds.username}:${Date.now()}`),
  };
  sessionStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { success: true, session };
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.session);
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.session);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getSession()?.token);
}

export function changePassword(currentPassword, newPassword) {
  const creds = getStoredCredentials();
  if (simpleHash(currentPassword) !== creds.passwordHash) {
    return { success: false, error: "Current password is incorrect" };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters" };
  }
  localStorage.setItem(
    STORAGE_KEYS.credentials,
    JSON.stringify({
      username: creds.username,
      passwordHash: simpleHash(newPassword),
    })
  );
  return { success: true };
}

export function getDefaultLoginHint() {
  const hasCustom = Boolean(localStorage.getItem(STORAGE_KEYS.credentials));
  if (hasCustom) return null;
  return {
    username: DEFAULT_CREDENTIALS.username,
    password: DEFAULT_CREDENTIALS.password,
  };
}
