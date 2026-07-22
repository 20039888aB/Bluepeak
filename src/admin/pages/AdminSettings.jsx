import React, { useRef, useState } from "react";
import { changePassword } from "../lib/auth";
import {
  exportBackup,
  getSettings,
  importBackup,
  saveSettings,
} from "../lib/storage";
import { COMPANY } from "../lib/constants";

export default function AdminSettings() {
  const [settings, setSettings] = useState(() => getSettings());
  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });
  const fileRef = useRef(null);

  const patchCompany = (key, value) => {
    setSettings((s) => ({
      ...s,
      company: { ...s.company, [key]: value },
    }));
    setSaved(false);
  };

  const patch = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPwMsg({ type: "", text: "" });
    if (pwForm.next !== pwForm.confirm) {
      setPwMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    const result = changePassword(pwForm.current, pwForm.next);
    if (result.success) {
      setPwMsg({ type: "ok", text: "Password updated. Use it next time you sign in." });
      setPwForm({ current: "", next: "", confirm: "" });
    } else {
      setPwMsg({ type: "error", text: result.error });
    }
  };

  const downloadBackup = () => {
    const data = exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bluepeak-invoice-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!window.confirm("Import will overwrite clients, invoices, quotations, and settings in this browser. Continue?")) {
        e.target.value = "";
        return;
      }
      importBackup(data);
      setSettings(getSettings());
      alert("Backup imported successfully.");
    } catch (err) {
      alert("Could not import backup: " + (err.message || "invalid file"));
    }
    e.target.value = "";
  };

  const resetCompany = () => {
    setSettings((s) => ({ ...s, company: { ...COMPANY } }));
    setSaved(false);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Company branding, defaults, security & backups
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-white">Company on documents</h2>
          <button
            type="button"
            onClick={resetCompany}
            className="text-xs text-slate-500 hover:text-skyblue"
          >
            Reset to Blue Peak defaults
          </button>
        </div>

        {[
          { key: "name", label: "Company name" },
          { key: "tagline", label: "Tagline" },
          { key: "logo", label: "Logo URL (path or full URL)" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "phoneAlt", label: "Alternate phone" },
          { key: "website", label: "Website" },
          { key: "address", label: "Address" },
          { key: "addressLine2", label: "Address line 2" },
          { key: "currency", label: "Currency code (e.g. KES, USD)" },
        ].map((f) => (
          <div key={f.key}>
            <label className="block text-xs text-slate-400 mb-1">{f.label}</label>
            <input
              type="text"
              value={settings.company?.[f.key] || ""}
              onChange={(e) => patchCompany(f.key, e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
            />
          </div>
        ))}

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Invoice prefix</label>
            <input
              type="text"
              value={settings.invoicePrefix || "INV"}
              onChange={(e) => patch("invoicePrefix", e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Quotation prefix</label>
            <input
              type="text"
              value={settings.quotationPrefix || "QT"}
              onChange={(e) => patch("quotationPrefix", e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Default notes</label>
          <textarea
            rows={2}
            value={settings.defaultNotes || ""}
            onChange={(e) => patch("defaultNotes", e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Default terms</label>
          <textarea
            rows={3}
            value={settings.defaultTerms || ""}
            onChange={(e) => patch("defaultTerms", e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
          >
            Save settings
          </button>
          {saved && <span className="text-sm text-mint">Saved</span>}
        </div>
      </form>

      <form
        onSubmit={handlePassword}
        className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
      >
        <h2 className="font-semibold text-white">Change admin password</h2>
        <p className="text-xs text-slate-500">
          Auth is client-side only (session in this browser). Change the default password after first login.
        </p>
        {[
          { key: "current", label: "Current password" },
          { key: "next", label: "New password" },
          { key: "confirm", label: "Confirm new password" },
        ].map((f) => (
          <div key={f.key}>
            <label className="block text-xs text-slate-400 mb-1">{f.label}</label>
            <input
              type="password"
              value={pwForm[f.key]}
              onChange={(e) => setPwForm({ ...pwForm, [f.key]: e.target.value })}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
              required
            />
          </div>
        ))}
        {pwMsg.text && (
          <p
            className={`text-sm ${
              pwMsg.type === "ok" ? "text-mint" : "text-rose-400"
            }`}
          >
            {pwMsg.text}
          </p>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-600 text-slate-200 hover:border-skyblue/50"
        >
          Update password
        </button>
      </form>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h2 className="font-semibold text-white">Backup & restore</h2>
        <p className="text-sm text-slate-400">
          Everything lives in your browser&apos;s localStorage. Export a JSON backup regularly —
          especially before clearing browser data or switching devices.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadBackup}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
          >
            Export backup
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-600 text-slate-200"
          >
            Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>
    </div>
  );
}
