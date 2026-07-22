import React from "react";
import { calcDocumentTotals, calcLineTotal, formatDate, formatMoney } from "../lib/calculations";
import { COMPANY } from "../lib/constants";

/**
 * Print-ready document surface. Light paper look for PDF / print.
 * Includes company logo, address, and contact details.
 */
export default function DocumentPrintView({ doc, company, title }) {
  if (!doc) return null;
  const brand = { ...COMPANY, ...(company || {}) };
  const totals = calcDocumentTotals(doc.items, doc.discount);
  const client = doc.clientSnapshot || {};
  const isQuote = doc.type === "quotation";
  const heading = title || (isQuote ? "QUOTATION" : "INVOICE");
  const logoSrc = brand.logo || COMPANY.logo;

  return (
    <div
      id="printable-document"
      className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
    >
      <div
        className="h-2 w-full"
        style={{ background: "linear-gradient(90deg, #3A7BD5, #0B3D2E)" }}
      />

      <div className="p-8 sm:p-10">
        {/* Company letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              <img
                src={logoSrc}
                alt={brand.name || "Company logo"}
                className="h-14 sm:h-16 w-auto object-contain shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="min-w-0 pt-0.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {brand.name}
                </h1>
                {brand.tagline && (
                  <p className="text-xs text-skyblue font-medium mt-0.5">{brand.tagline}</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
              {brand.address && (
                <p>
                  <span className="font-semibold text-slate-800">Address: </span>
                  <span className="whitespace-pre-line">{brand.address}</span>
                  {brand.addressLine2 && (
                    <>
                      <br />
                      <span className="text-slate-500">{brand.addressLine2}</span>
                    </>
                  )}
                </p>
              )}
              {brand.email && (
                <p>
                  <span className="font-semibold text-slate-800">Email: </span>
                  <a href={`mailto:${brand.email}`} className="text-slate-700 underline-offset-2">
                    {brand.email}
                  </a>
                </p>
              )}
              {(brand.phone || brand.phoneAlt) && (
                <p>
                  <span className="font-semibold text-slate-800">Phone: </span>
                  {brand.phone}
                  {brand.phoneAlt && (
                    <span className="text-slate-500"> · {brand.phoneAlt}</span>
                  )}
                </p>
              )}
              {brand.website && (
                <p>
                  <span className="font-semibold text-slate-800">Web: </span>
                  {brand.website.replace(/^https?:\/\//, "")}
                </p>
              )}
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <p
              className="text-3xl font-extrabold tracking-wide"
              style={{ color: "#1E3A8A" }}
            >
              {heading}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{doc.number}</p>
            <div className="mt-3 text-xs text-slate-600 space-y-1">
              <p>
                <span className="text-slate-400">Issue date: </span>
                {formatDate(doc.issueDate)}
              </p>
              {isQuote ? (
                <p>
                  <span className="text-slate-400">Valid until: </span>
                  {formatDate(doc.validUntil || doc.dueDate)}
                </p>
              ) : (
                <p>
                  <span className="text-slate-400">Due date: </span>
                  {formatDate(doc.dueDate)}
                </p>
              )}
              {doc.fromQuotationNumber && (
                <p>
                  <span className="text-slate-400">From quote: </span>
                  {doc.fromQuotationNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* From / To */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              From
            </p>
            <p className="font-semibold text-slate-900">{brand.name}</p>
            {brand.address && (
              <p className="text-sm text-slate-600 mt-1 whitespace-pre-line">{brand.address}</p>
            )}
            {brand.addressLine2 && (
              <p className="text-xs text-slate-500">{brand.addressLine2}</p>
            )}
            <div className="mt-2 space-y-0.5 text-sm text-slate-600">
              {brand.email && <p>{brand.email}</p>}
              {brand.phone && <p>{brand.phone}</p>}
              {brand.website && <p>{brand.website.replace(/^https?:\/\//, "")}</p>}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              {isQuote ? "Prepared for" : "Bill to"}
            </p>
            <p className="font-semibold text-slate-900">{client.company || "—"}</p>
            {client.contactName && (
              <p className="text-sm text-slate-600 mt-1">{client.contactName}</p>
            )}
            {client.address && (
              <p className="text-sm text-slate-600 whitespace-pre-line mt-1">{client.address}</p>
            )}
            <div className="mt-2 space-y-0.5 text-sm text-slate-600">
              {client.email && <p>{client.email}</p>}
              {client.phone && <p>{client.phone}</p>}
            </div>
            {(doc.projectName || doc.reference) && (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                {doc.projectName && <p>Project: {doc.projectName}</p>}
                {doc.reference && <p>Ref: {doc.reference}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-left text-[10px] uppercase tracking-wider text-slate-500">
                <th className="pb-2 pr-2 font-semibold">#</th>
                <th className="pb-2 pr-2 font-semibold w-full">Description</th>
                <th className="pb-2 pr-2 font-semibold text-right">Qty</th>
                <th className="pb-2 pr-2 font-semibold text-right">Unit</th>
                <th className="pb-2 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(doc.items || []).map((item, i) => (
                <tr key={item.id || i} className="border-b border-slate-100">
                  <td className="py-3 pr-2 text-slate-400">{i + 1}</td>
                  <td className="py-3 pr-2 text-slate-800 whitespace-pre-wrap">
                    {item.description || "—"}
                  </td>
                  <td className="py-3 pr-2 text-right text-slate-700">{item.quantity}</td>
                  <td className="py-3 pr-2 text-right text-slate-700">
                    {formatMoney(item.unitPrice, doc.currency)}
                  </td>
                  <td className="py-3 text-right font-medium text-slate-900">
                    {formatMoney(calcLineTotal(item), doc.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatMoney(totals.subtotal, doc.currency)}</span>
            </div>
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Discount</span>
                <span>−{formatMoney(totals.discountAmount, doc.currency)}</span>
              </div>
            )}
            <div
              className="flex justify-between items-center pt-2 border-t-2 border-slate-200 text-base font-bold"
              style={{ color: "#1E3A8A" }}
            >
              <span>Total</span>
              <span>{formatMoney(totals.total, doc.currency)}</span>
            </div>
          </div>
        </div>

        {(doc.notes || doc.terms) && (
          <div className="mt-10 grid sm:grid-cols-2 gap-6 text-xs text-slate-600">
            {doc.notes && (
              <div>
                <p className="font-semibold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                  Notes
                </p>
                <p className="whitespace-pre-wrap leading-relaxed">{doc.notes}</p>
              </div>
            )}
            {doc.terms && (
              <div>
                <p className="font-semibold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                  Terms
                </p>
                <p className="whitespace-pre-wrap leading-relaxed">{doc.terms}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="text-[10px] text-slate-500 space-y-0.5 max-w-sm">
            <p className="font-semibold text-slate-700">{brand.name}</p>
            {brand.address && <p>{brand.address}</p>}
            <p>
              {[brand.email, brand.phone, brand.website?.replace(/^https?:\/\//, "")]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <p className="text-slate-400 pt-1">
              Generated {formatDate(new Date().toISOString())}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <div className="h-12 border-b border-slate-400 w-48 ml-auto mb-1" />
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Authorized signature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
