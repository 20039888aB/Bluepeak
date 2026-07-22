import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { deleteClient, getClients, saveClient } from "../lib/storage";

const blank = {
  company: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState(() => getClients());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [query, setQuery] = useState("");

  const refresh = () => setClients(getClients());

  const openNew = () => {
    setForm(blank);
    setEditing("new");
  };

  const openEdit = (c) => {
    setForm({ ...c });
    setEditing(c.id);
  };

  const close = () => {
    setEditing(null);
    setForm(blank);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.company.trim()) return;
    saveClient({
      ...form,
      id: editing === "new" ? undefined : editing,
      company: form.company.trim(),
    });
    refresh();
    close();
  };

  const remove = (id) => {
    if (!window.confirm("Delete this client? Existing documents keep a snapshot of their details.")) return;
    deleteClient(id);
    refresh();
  };

  const filtered = clients.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.company?.toLowerCase().includes(q) ||
      c.contactName?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-1">Companies you bill and quote</p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
        >
          <HiOutlinePlus className="w-4 h-4" /> Add client
        </button>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search clients…"
        className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-skyblue focus:outline-none"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center text-slate-500 text-sm">
          No clients yet. Add your first company to start invoicing.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              layout
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-skyblue/40 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{c.company}</h3>
                  {c.contactName && (
                    <p className="text-sm text-slate-400 mt-0.5">{c.contactName}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(c)}
                    className="p-2 rounded-lg text-slate-400 hover:text-skyblue hover:bg-slate-800"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(c.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                {c.email && <p>{c.email}</p>}
                {c.phone && <p>{c.phone}</p>}
                {c.address && <p className="line-clamp-2">{c.address}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={close}
          >
            <motion.form
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={submit}
              className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {editing === "new" ? "New client" : "Edit client"}
                </h2>
                <button type="button" onClick={close} className="p-2 text-slate-400 hover:text-white">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {[
                { key: "company", label: "Company name *", required: true },
                { key: "contactName", label: "Contact person" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-slate-400 mb-1">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    required={field.required}
                    value={form[field.key] || ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-slate-400 mb-1">Address</label>
                <textarea
                  rows={2}
                  value={form.address || ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Internal notes</label>
                <textarea
                  rows={2}
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 rounded-xl text-sm text-slate-300 border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
                >
                  Save client
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
