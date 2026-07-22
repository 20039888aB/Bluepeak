import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlinePrinter,
  HiOutlineDuplicate,
  HiOutlineTrash,
} from "react-icons/hi";
import DocumentPrintView from "../components/DocumentPrintView";
import {
  convertQuotationToInvoice,
  deleteInvoice,
  deleteQuotation,
  getInvoice,
  getQuotation,
  getSettings,
  saveInvoice,
  saveQuotation,
} from "../lib/storage";
import { INVOICE_STATUSES, QUOTATION_STATUSES } from "../lib/constants";
import { calcDocumentTotals, formatMoney } from "../lib/calculations";

export default function DocumentView({ type }) {
  const isInvoice = type === "invoice";
  const { id } = useParams();
  const navigate = useNavigate();
  const settings = useMemo(() => getSettings(), []);
  const [tick, setTick] = useState(0);

  const base = isInvoice ? "/admin/invoices" : "/admin/quotations";
  const statuses = isInvoice ? INVOICE_STATUSES : QUOTATION_STATUSES;

  const doc = useMemo(() => {
    void tick;
    if (!id || id === "new") return null;
    return isInvoice ? getInvoice(id) : getQuotation(id);
  }, [id, isInvoice, tick]);

  if (id === "new") {
    return <Navigate to={`${base}/new`} replace />;
  }

  if (!doc) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Document not found.</p>
        <Link to={base} className="text-skyblue text-sm mt-4 inline-block">
          Back to list
        </Link>
      </div>
    );
  }

  const totals = calcDocumentTotals(doc.items, doc.discount);

  const handlePrint = () => {
    window.print();
  };

  const handleStatus = (status) => {
    if (isInvoice) saveInvoice({ ...doc, status });
    else saveQuotation({ ...doc, status });
    setTick((t) => t + 1);
  };

  const handleConvert = () => {
    if (!window.confirm("Convert this quotation into a draft invoice?")) return;
    const invoice = convertQuotationToInvoice(doc.id);
    if (invoice) navigate(`/admin/invoices/${invoice.id}`);
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this document permanently?")) return;
    if (isInvoice) deleteInvoice(doc.id);
    else deleteQuotation(doc.id);
    navigate(base);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 print:hidden">
        <div>
          <Link
            to={base}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-skyblue mb-2"
          >
            <HiOutlineArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <h1 className="text-2xl font-bold text-white flex flex-wrap items-center gap-3">
            {doc.number}
            <span className="text-sm font-normal text-slate-400">
              {formatMoney(totals.total, doc.currency)}
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={doc.status}
            onChange={(e) => handleStatus(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300 px-3 py-2 focus:border-skyblue focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {!isInvoice && !doc.convertedInvoiceId && (
            <button
              type="button"
              onClick={handleConvert}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-mint/40 text-mint hover:bg-mint/10"
            >
              <HiOutlineDuplicate className="w-4 h-4" /> Convert to invoice
            </button>
          )}

          <Link
            to={`${base}/${doc.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-slate-700 text-slate-300 hover:border-skyblue/50"
          >
            <HiOutlinePencil className="w-4 h-4" /> Edit
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-skyblue to-forest"
          >
            <HiOutlinePrinter className="w-4 h-4" /> Print / Save PDF
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {doc.convertedInvoiceId && (
        <p className="text-sm text-mint bg-mint/10 border border-mint/30 rounded-xl px-4 py-3 print:hidden">
          Converted to invoice.{" "}
          <Link to={`/admin/invoices/${doc.convertedInvoiceId}`} className="underline">
            Open invoice
          </Link>
        </p>
      )}

      <div className="max-w-4xl mx-auto admin-print-area">
        <DocumentPrintView doc={doc} company={settings.company} />
      </div>
    </div>
  );
}
