"use client";

import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

const formatBDT = (value: number | string) => {
  const numericValue = Number(value || 0);
  if (!numericValue) return "Contact for price";
  return `BDT ${numericValue.toLocaleString("en-US")}/-`;
};

export default function SaleInformation({ product }: { product: any }) {
  const price = product?.mainPrice || product?.highestBid || product?.minBid || 0;
  const rows = [
    ["Listing status", product?.isSoldOut ? "Reserved" : "Available"],
    ["Seller type", product?.sellerType || "Verified dealer"],
    ["Stock ID", product?._id?.slice(-8)?.toUpperCase()],
  ].filter(([, value]) => value);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
        Purchase overview
      </p>
      <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
        {formatBDT(price)}
      </h2>

      <div className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 text-sm"
          >
            <span className="font-medium text-slate-500">{label}</span>
            <span className="font-bold text-slate-900">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
        <div className="flex gap-3 rounded-md bg-emerald-50 p-3 text-emerald-800">
          <BadgeCheck className="mt-0.5 shrink-0" size={18} />
          <span className="font-semibold">Verified listing information</span>
        </div>
        <div className="flex gap-3 rounded-md bg-sky-50 p-3 text-sky-800">
          <ShieldCheck className="mt-0.5 shrink-0" size={18} />
          <span className="font-semibold">Inspection support available</span>
        </div>
        <div className="flex gap-3 rounded-md bg-slate-50 p-3 text-slate-700">
          <Clock3 className="mt-0.5 shrink-0" size={18} />
          <span className="font-semibold">Fast response from CarClickBD team</span>
        </div>
      </div>
    </section>
  );
}
