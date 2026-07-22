import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
} from "react-icons/hi";
import {
  deleteInvoice,
  deleteQuotation,
  getInvoices,
  getQuotations,
} from "../lib/storage";
import { INVOICE_STATUSES, QUOTATION_STATUSES } from "../lib/constants";
import { calcDocumentTotals, formatDate, formatMoney } from "../lib/calculations";

const statusColor = {
  slate: "bg-slate-500/20 text-slate-300",
  sky: "bg-sky-500/20 text-sky-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  rose: "bg-rose-500/20 text-rose-300",
  zinc: "bg-zinc-500/20 text-zinc-300",
  amber: "bg-amber-500/20 text-amber-300",
};

export default function DocumentsList({ type }) {
  const isInvoice = type === "invoice";
  const statuses = isInvoice ? INVOICE_STATUSES : QUOTATION_STATUSES;
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const docs = useMemo(() => {
    void tick;
    return isInvoice ? getInvoices() : getQuotations();
  }, [isInvoice, tick]);

  const filtered = docs.filter((d) => {
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      d.number?.toLowerCase().includes(q) ||
      d.clientSnapshot?.company?.toLowerCase().includes(q) ||
      d.projectName?.toLowerCase().includes(q)
    );
  });

  const remove = (id) => {
    if (!window.confirm(`Delete this ${isInvoice ? "invoice" : "quotation"}?`)) return;
    if (isInvoice) deleteInvoice(id);
    else deleteQuotation(id);
    setTick((t) => t + 1);
  };

  const base = isInvoice ? "/admin/invoices" : "/admin/quotations";
  const title = isInvoice ? "Invoices" : "Quotations";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-slate-400 mt-1">
            {isInvoice
              ? "Bill clients for hosting, development, and services"
              : "Send professional quotes before work begins"}
          </p>
        </div>
        <Link
          to={`${base}/new`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
        >
          <HiOutlinePlus className="w-4 h-4" /> New {isInvoice ? "invoice" : "quotation"}
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by number or client…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:border-skyblue focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300 px-3 py-2.5 focus:border-skyblue focus:outline-none"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/30">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No {title.toLowerCase()} found. Create one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3 font-semibold">Number</th>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Total</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((d) => {
                  const totals = calcDocumentTotals(d.items, d.discount);
                  const st = statuses.find((s) => s.id === d.status);
                  return (
                    <tr key={d.id} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {d.number}
                      </td>
                      <td className="px-4 py-3 text-slate-300 truncate max-w-[180px]">
                        {d.clientSnapshot?.company || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {formatDate(d.issueDate)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColor[st?.color] || statusColor.slate
                          }`}
                        >
                          {st?.label || d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-200 whitespace-nowrap">
                        {formatMoney(totals.total, d.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`${base}/${d.id}`}
                            className="p-2 rounded-lg text-slate-400 hover:text-skyblue hover:bg-slate-800"
                            title="View"
                          >
                            <HiOutlineEye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`${base}/${d.id}/edit`}
                            className="p-2 rounded-lg text-slate-400 hover:text-skyblue hover:bg-slate-800"
                            title="Edit"
                          >
                            <HiOutlinePencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(d.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
