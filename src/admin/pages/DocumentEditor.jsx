import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LineItemsEditor from "../components/LineItemsEditor";
import { INVOICE_STATUSES, QUOTATION_STATUSES } from "../lib/constants";
import {
  calcDocumentTotals,
  createBlankDocument,
  formatMoney,
} from "../lib/calculations";
import {
  getClients,
  getInvoice,
  getQuotation,
  getSettings,
  saveInvoice,
  saveQuotation,
} from "../lib/storage";

export default function DocumentEditor({ type }) {
  const isInvoice = type === "invoice";
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const settings = useMemo(() => getSettings(), []);
  const clients = useMemo(() => getClients(), []);
  const statuses = isInvoice ? INVOICE_STATUSES : QUOTATION_STATUSES;
  const base = isInvoice ? "/admin/invoices" : "/admin/quotations";

  const [doc, setDoc] = useState(() => createBlankDocument(type, settings));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setDoc(createBlankDocument(type, settings));
      return;
    }
    const existing = isInvoice ? getInvoice(id) : getQuotation(id);
    if (existing) setDoc(existing);
    else setError("Document not found");
  }, [id, isNew, isInvoice, type, settings]);

  const totals = calcDocumentTotals(doc.items, doc.discount);

  const selectClient = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    setDoc((d) => ({
      ...d,
      clientId,
      clientSnapshot: client
        ? {
            company: client.company,
            contactName: client.contactName,
            email: client.email,
            phone: client.phone,
            address: client.address,
          }
        : null,
    }));
  };

  const patch = (fields) => setDoc((d) => ({ ...d, ...fields }));

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    if (!doc.clientId && !doc.clientSnapshot?.company) {
      setError("Please select a client (or add one under Clients first).");
      return;
    }
    if (!doc.items?.some((i) => i.description?.trim())) {
      setError("Add at least one line item with a description.");
      return;
    }
    setSaving(true);
    const payload = {
      ...doc,
      type,
      currency: doc.currency || settings.company?.currency || "KES",
    };
    const saved = isInvoice ? saveInvoice(payload) : saveQuotation(payload);
    setSaving(false);
    navigate(`${base}/${saved.id}`);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">
            <Link to={base} className="hover:text-skyblue">
              {isInvoice ? "Invoices" : "Quotations"}
            </Link>
            <span className="mx-2">/</span>
            {isNew ? "New" : doc.number || "Edit"}
          </p>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? `New ${isInvoice ? "invoice" : "quotation"}` : `Edit ${doc.number}`}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={isNew ? base : `${base}/${id}`}
            className="px-4 py-2.5 rounded-xl text-sm border border-slate-700 text-slate-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save document"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Client & details</h2>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Client *</label>
              <select
                value={doc.clientId || ""}
                onChange={(e) => selectClient(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
              >
                <option value="">Select a client…</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company}
                  </option>
                ))}
              </select>
              {clients.length === 0 && (
                <p className="mt-2 text-xs text-amber-400">
                  No clients yet.{" "}
                  <Link to="/admin/clients" className="underline">
                    Add a client
                  </Link>{" "}
                  first.
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Issue date</label>
                <input
                  type="date"
                  value={doc.issueDate || ""}
                  onChange={(e) => patch({ issueDate: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {isInvoice ? "Due date" : "Valid until"}
                </label>
                <input
                  type="date"
                  value={isInvoice ? doc.dueDate || "" : doc.validUntil || doc.dueDate || ""}
                  onChange={(e) =>
                    patch(
                      isInvoice
                        ? { dueDate: e.target.value }
                        : { validUntil: e.target.value, dueDate: e.target.value }
                    )
                  }
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Project name</label>
                <input
                  type="text"
                  value={doc.projectName || ""}
                  onChange={(e) => patch({ projectName: e.target.value })}
                  placeholder="e.g. Acme Corp website redesign"
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Status</label>
                <select
                  value={doc.status || "draft"}
                  onChange={(e) => patch({ status: e.target.value })}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">PO / reference</label>
              <input
                type="text"
                value={doc.reference || ""}
                onChange={(e) => patch({ reference: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <LineItemsEditor
              items={doc.items || []}
              currency={doc.currency || "KES"}
              onChange={(items) => patch({ items })}
            />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Notes</label>
              <textarea
                rows={4}
                value={doc.notes || ""}
                onChange={(e) => patch({ notes: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Terms & conditions</label>
              <textarea
                rows={4}
                value={doc.terms || ""}
                onChange={(e) => patch({ terms: e.target.value })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none resize-y"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sticky top-20 space-y-4">
            <h2 className="text-sm font-semibold text-white">Totals</h2>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Discount (amount)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={doc.discount ?? 0}
                onChange={(e) => patch({ discount: Number(e.target.value) })}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2.5 text-sm text-white focus:border-skyblue focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatMoney(totals.subtotal, doc.currency)}</span>
              </div>
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Discount</span>
                  <span>−{formatMoney(totals.discountAmount, doc.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total</span>
                <span>{formatMoney(totals.total, doc.currency)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
