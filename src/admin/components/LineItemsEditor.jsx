import React from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { SERVICE_PRESETS } from "../lib/constants";
import { calcLineTotal, emptyLineItem, formatMoney } from "../lib/calculations";

export default function LineItemsEditor({ items, currency, onChange }) {
  const update = (id, patch) => {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const remove = (id) => {
    if (items.length <= 1) {
      onChange([emptyLineItem()]);
      return;
    }
    onChange(items.filter((it) => it.id !== id));
  };

  const add = () => onChange([...items, emptyLineItem()]);

  const applyPreset = (preset) => {
    onChange([
      ...items.filter((it) => it.description || it.unitPrice),
      {
        ...emptyLineItem(),
        description: preset.description,
        unitPrice: preset.unitPrice,
        quantity: 1,
      },
    ].filter((it, i, arr) => {
      // drop blank trailing empties except keep structure
      if (!it.description && !it.unitPrice && i < arr.length - 1) return false;
      return true;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Line items</h3>
        <div className="flex flex-wrap gap-2">
          <select
            className="text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-300 px-2 py-1.5 max-w-[220px]"
            defaultValue=""
            onChange={(e) => {
              const p = SERVICE_PRESETS.find((x) => x.description === e.target.value);
              if (p) applyPreset(p);
              e.target.value = "";
            }}
          >
            <option value="" disabled>
              + Add service preset…
            </option>
            {SERVICE_PRESETS.map((p) => (
              <option key={p.description} value={p.description}>
                {p.description}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-skyblue/20 text-skyblue border border-skyblue/30 hover:bg-skyblue/30"
          >
            <HiOutlinePlus className="w-4 h-4" /> Add line
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 p-3 rounded-xl bg-slate-950/50 border border-slate-800"
          >
            <div className="col-span-12 sm:col-span-5">
              <label className="text-[10px] uppercase text-slate-500 tracking-wider">
                Description {index + 1}
              </label>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => update(item.id, { description: e.target.value })}
                className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 text-sm text-white px-3 py-2 focus:border-skyblue focus:outline-none resize-y"
                placeholder="Service or product description"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="text-[10px] uppercase text-slate-500 tracking-wider">Qty</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.quantity}
                onChange={(e) => update(item.id, { quantity: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 text-sm text-white px-3 py-2 focus:border-skyblue focus:outline-none"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label className="text-[10px] uppercase text-slate-500 tracking-wider">
                Unit price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.unitPrice}
                onChange={(e) => update(item.id, { unitPrice: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 text-sm text-white px-3 py-2 focus:border-skyblue focus:outline-none"
              />
            </div>
            <div className="col-span-3 sm:col-span-2 flex flex-col justify-end">
              <label className="text-[10px] uppercase text-slate-500 tracking-wider">Amount</label>
              <p className="mt-1 text-sm font-medium text-slate-200 py-2">
                {formatMoney(calcLineTotal(item), currency)}
              </p>
            </div>
            <div className="col-span-1 flex items-end justify-end pb-1">
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                aria-label="Remove line"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
