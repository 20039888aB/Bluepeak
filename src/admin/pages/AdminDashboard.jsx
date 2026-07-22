import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
} from "react-icons/hi";
import { getClients, getInvoices, getQuotations, getSettings } from "../lib/storage";
import { calcDocumentTotals, formatDate, formatMoney } from "../lib/calculations";

function StatCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${accent || "from-skyblue to-forest"}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  // Read fresh from localStorage on each visit/render
  const invoices = getInvoices();
  const quotations = getQuotations();
  const clients = getClients();
  const settings = getSettings();
  const currency = settings.company?.currency || "KES";

  const paidTotal = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + calcDocumentTotals(i.items, i.discount).total, 0);

  const outstanding = invoices
    .filter((i) => ["sent", "overdue"].includes(i.status))
    .reduce((s, i) => s + calcDocumentTotals(i.items, i.discount).total, 0);

  const recent = [...invoices.map((d) => ({ ...d, _kind: "invoice" })), ...quotations.map((d) => ({ ...d, _kind: "quotation" }))]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-slate-400 text-sm">
            Create branded invoices and quotations for your clients — all in the browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/invoices/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest shadow-lg shadow-skyblue/20"
          >
            <HiOutlinePlus className="w-4 h-4" /> New invoice
          </Link>
          <Link
            to="/admin/quotations/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 border border-slate-700 hover:border-skyblue/50 bg-slate-900/50"
          >
            <HiOutlinePlus className="w-4 h-4" /> New quotation
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineCurrencyDollar}
          label="Paid revenue"
          value={formatMoney(paidTotal, currency)}
          hint={`${invoices.filter((i) => i.status === "paid").length} paid invoices`}
          accent="from-emerald-500 to-forest"
        />
        <StatCard
          icon={HiOutlineClock}
          label="Outstanding"
          value={formatMoney(outstanding, currency)}
          hint="Sent + overdue"
          accent="from-amber-500 to-orange-700"
        />
        <StatCard
          icon={HiOutlineDocumentText}
          label="Invoices"
          value={invoices.length}
          hint="All time"
        />
        <StatCard
          icon={HiOutlineClipboardList}
          label="Quotations"
          value={quotations.length}
          hint={`${clients.length} clients on file`}
          accent="from-violet-500 to-slatepeak"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent documents</h2>
            <Link to="/admin/invoices" className="text-xs text-skyblue hover:underline">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="p-10 text-center text-slate-500 text-sm">
              No documents yet. Create your first invoice or quotation.
            </div>
          ) : (
            <ul className="divide-y divide-slate-800">
              {recent.map((d) => {
                const totals = calcDocumentTotals(d.items, d.discount);
                return (
                  <li key={d.id}>
                    <Link
                      to={`/admin/${d._kind === "invoice" ? "invoices" : "quotations"}/${d.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/40 transition"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          d._kind === "invoice" ? "bg-skyblue/20 text-skyblue" : "bg-mint/20 text-mint"
                        }`}
                      >
                        {d._kind === "invoice" ? (
                          <HiOutlineDocumentText className="w-5 h-5" />
                        ) : (
                          <HiOutlineClipboardList className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {d.number} · {d.clientSnapshot?.company || "No client"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(d.issueDate)} · {d.status}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        {formatMoney(totals.total, d.currency)}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <HiOutlineUsers className="w-5 h-5 text-skyblue" />
            <h2 className="font-semibold text-white">Quick tips</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="text-skyblue">1.</span>
              Add a client, then create a quotation with service presets.
            </li>
            <li className="flex gap-2">
              <span className="text-skyblue">2.</span>
              When a quote is accepted, convert it to an invoice in one click.
            </li>
            <li className="flex gap-2">
              <span className="text-skyblue">3.</span>
              Preview any document and use <strong className="text-slate-300">Print / Save PDF</strong> — no server needed.
            </li>
            <li className="flex gap-2">
              <span className="text-skyblue">4.</span>
              Export a JSON backup from Settings so you never lose data.
            </li>
          </ul>
          <Link
            to="/admin/clients"
            className="block text-center text-sm py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:border-skyblue/50"
          >
            Manage clients
          </Link>
        </div>
      </div>
    </div>
  );
}
