export function calcLineTotal(item) {
  const qty = Number(item.quantity) || 0;
  const price = Number(item.unitPrice) || 0;
  return Math.round(qty * price * 100) / 100;
}

export function calcDocumentTotals(items = [], discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + calcLineTotal(item), 0);
  const discountAmount = Math.min(Number(discount) || 0, subtotal);
  const total = Math.round(Math.max(0, subtotal - discountAmount) * 100) / 100;
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount,
    total,
  };
}

export function formatMoney(amount, currency = "KES") {
  const n = Number(amount) || 0;
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function emptyLineItem() {
  return {
    id: `li_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    description: "",
    quantity: 1,
    unitPrice: 0,
  };
}

export function createBlankDocument(type, settings) {
  const today = new Date().toISOString().slice(0, 10);
  const due = new Date();
  due.setDate(due.getDate() + (type === "invoice" ? 14 : 30));
  return {
    type,
    clientId: "",
    clientSnapshot: null,
    issueDate: today,
    dueDate: due.toISOString().slice(0, 10),
    validUntil: due.toISOString().slice(0, 10),
    status: "draft",
    items: [emptyLineItem()],
    discount: 0,
    notes: settings?.defaultNotes || "",
    terms: settings?.defaultTerms || "",
    currency: settings?.company?.currency || "KES",
  };
}
