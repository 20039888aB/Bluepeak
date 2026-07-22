import { COMPANY, STORAGE_KEYS } from "./constants";

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix) {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${t}${r}`;
}

function nextNumber(docs, prefix) {
  const year = new Date().getFullYear();
  const sameYear = docs.filter((d) => String(d.number || "").includes(String(year)));
  const seq = String(sameYear.length + 1).padStart(3, "0");
  return `${prefix}-${year}-${seq}`;
}

/* ─── Settings ─── */
export function getSettings() {
  const defaults = {
    company: { ...COMPANY },
    invoicePrefix: "INV",
    quotationPrefix: "QT",
    defaultNotes:
      "Thank you for choosing Blue Peak Web-Solutions. Payment is due within the stated terms.",
    defaultTerms:
      "All work remains the property of Blue Peak Web-Solutions until full payment is received. Quotes are valid for 30 days unless otherwise stated.",
  };
  const stored = read(STORAGE_KEYS.settings, null);
  if (!stored) return defaults;
  return {
    ...defaults,
    ...stored,
    company: { ...COMPANY, ...(stored.company || {}) },
  };
}

export function saveSettings(settings) {
  write(STORAGE_KEYS.settings, settings);
  return settings;
}

/* ─── Clients ─── */
export function getClients() {
  return read(STORAGE_KEYS.clients, []).sort((a, b) =>
    a.company.localeCompare(b.company)
  );
}

export function saveClient(client) {
  const clients = getClients();
  if (client.id) {
    const idx = clients.findIndex((c) => c.id === client.id);
    if (idx >= 0) {
      clients[idx] = { ...clients[idx], ...client, updatedAt: new Date().toISOString() };
      write(STORAGE_KEYS.clients, clients);
      return clients[idx];
    }
  }
  const created = {
    ...client,
    id: uid("cli"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  clients.push(created);
  write(STORAGE_KEYS.clients, clients);
  return created;
}

export function deleteClient(id) {
  write(
    STORAGE_KEYS.clients,
    getClients().filter((c) => c.id !== id)
  );
}

/* ─── Invoices ─── */
export function getInvoices() {
  return read(STORAGE_KEYS.invoices, []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function getInvoice(id) {
  return getInvoices().find((d) => d.id === id) || null;
}

export function saveInvoice(doc) {
  const invoices = getInvoices();
  const settings = getSettings();
  if (doc.id) {
    const idx = invoices.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      invoices[idx] = { ...invoices[idx], ...doc, updatedAt: new Date().toISOString() };
      write(STORAGE_KEYS.invoices, invoices);
      return invoices[idx];
    }
  }
  const created = {
    ...doc,
    id: uid("inv"),
    type: "invoice",
    number: doc.number || nextNumber(invoices, settings.invoicePrefix || "INV"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  invoices.unshift(created);
  write(STORAGE_KEYS.invoices, invoices);
  return created;
}

export function deleteInvoice(id) {
  write(
    STORAGE_KEYS.invoices,
    getInvoices().filter((d) => d.id !== id)
  );
}

/* ─── Quotations ─── */
export function getQuotations() {
  return read(STORAGE_KEYS.quotations, []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function getQuotation(id) {
  return getQuotations().find((d) => d.id === id) || null;
}

export function saveQuotation(doc) {
  const quotations = getQuotations();
  const settings = getSettings();
  if (doc.id) {
    const idx = quotations.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      quotations[idx] = { ...quotations[idx], ...doc, updatedAt: new Date().toISOString() };
      write(STORAGE_KEYS.quotations, quotations);
      return quotations[idx];
    }
  }
  const created = {
    ...doc,
    id: uid("qt"),
    type: "quotation",
    number: doc.number || nextNumber(quotations, settings.quotationPrefix || "QT"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  quotations.unshift(created);
  write(STORAGE_KEYS.quotations, quotations);
  return created;
}

export function deleteQuotation(id) {
  write(
    STORAGE_KEYS.quotations,
    getQuotations().filter((d) => d.id !== id)
  );
}

/** Convert an accepted quotation into a draft invoice */
export function convertQuotationToInvoice(quotationId) {
  const q = getQuotation(quotationId);
  if (!q) return null;
  const invoice = saveInvoice({
    clientId: q.clientId,
    clientSnapshot: q.clientSnapshot,
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: addDays(30),
    status: "draft",
    items: q.items,
    discount: q.discount,
    notes: q.notes,
    terms: q.terms,
    currency: q.currency,
    fromQuotationId: q.id,
    fromQuotationNumber: q.number,
  });
  saveQuotation({ ...q, status: "accepted", convertedInvoiceId: invoice.id });
  return invoice;
}

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

/* ─── Backup ─── */
export function exportBackup() {
  return {
    exportedAt: new Date().toISOString(),
    version: 1,
    clients: getClients(),
    invoices: getInvoices(),
    quotations: getQuotations(),
    settings: getSettings(),
  };
}

export function importBackup(data) {
  if (!data || typeof data !== "object") throw new Error("Invalid backup file");
  if (data.clients) write(STORAGE_KEYS.clients, data.clients);
  if (data.invoices) write(STORAGE_KEYS.invoices, data.invoices);
  if (data.quotations) write(STORAGE_KEYS.quotations, data.quotations);
  if (data.settings) write(STORAGE_KEYS.settings, data.settings);
}
