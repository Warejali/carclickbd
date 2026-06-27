"use client";

import React, { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/shared/PrimaryButton";
import { VEHICLES, Vehicle } from "@/data/vehicles";

// ---------- UI Helpers ----------
const Badge = ({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "slate" | "yellow";
}) => {
  const map: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    yellow: "bg-amber-50 text-amber-700 ring-amber-200",
  };
  return (
    <span
      className={twMerge(
        "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",
        map[color]
      )}
    >
      {children}
    </span>
  );
};

const PrimaryBtn = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...p}
    className={twMerge(
      "px-3.5 py-1.5 text-sm font-semibold shadow-sm rounded-md",
      "bg-[#0052FF] text-white hover:bg-[#0041cc] focus:outline-none transition-all duration-300",
      p.className
    )}
  />
);

const SecondaryBtn = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...p}
    className={twMerge(
      "px-3.5 py-1.5 text-sm font-semibold rounded-md",
      "bg-[#F0B90B] text-black hover:bg-[#e0aa09] transition-all duration-300",
      p.className
    )}
  />
);

// ---------- Sidebar Filters (static demo) ----------
function Filters({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
      <aside
        className={twMerge(
          "fixed z-40 top-[var(--top,64px)] left-0 h-[calc(100vh-64px)] w-[84%] max-w-[320px] overflow-y-auto bg-white border-r border-slate-200 p-4 lg:static lg:z-auto lg:h-auto lg:w-72 lg:translate-x-0 lg:overflow-visible lg:p-0",
          open ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        <div className="lg:sticky lg:top-6 lg:p-4">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">
              Search filters
            </h4>
            <div className="text-xs text-slate-500">
              Wholesale Vehicles only
            </div>
          </div>

          {/* Quick filters */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600">
                Keyword / VIN
              </label>
              <input
                placeholder="Search..."
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Make
                </label>
                <select className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm">
                  <option>Any</option>
                  <option>Lexus</option>
                  <option>Land Rover</option>
                  <option>Mercedes-Benz</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Model
                </label>
                <input className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Location
                </label>
                <input className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Title type
                </label>
                <select className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm">
                  <option>Any</option>
                  <option>Clean Title</option>
                  <option>Salvage Title</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Fuel
                </label>
                <select className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm">
                  <option>Any</option>
                  <option>Gasoline</option>
                  <option>Hybrid</option>
                  <option>Diesel</option>
                  <option>EV</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Drive
                </label>
                <select className="mt-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm">
                  <option>Any</option>
                  <option>FWD</option>
                  <option>RWD</option>
                  <option>AWD</option>
                  <option>4WD</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <PrimaryBtn>Apply</PrimaryBtn>
              <button className="text-sm text-slate-500 hover:text-slate-700">
                Reset
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ---------- Vehicle Row (Table style) ----------
function VehicleRow({ v }: { v: Vehicle }) {
  return (
    <div className="grid grid-cols-[140px_1.3fr_1fr_1fr_auto] gap-4 items-center border-b border-slate-200 py-3">
      {/* Thumbnail */}
      <div className="rounded-md overflow-hidden border border-slate-200 bg-slate-50">
        <img src={v.image} alt={v.yearMakeModel} className="h-24 w-full object-cover" />
      </div>

      {/* Lot info */}
      <div className="text-sm">
        <div className="font-semibold text-slate-800">{v.yearMakeModel}</div>
        <div className="mt-1 text-[12px] text-slate-500">
          Lot: <span className="font-medium">{v.lot}</span> • Odometer: {v.odo ?? "—"}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {v.fuel && <Badge color="slate">{v.fuel}</Badge>}
          {v.engine && <Badge color="slate">{v.engine}</Badge>}
          {v.drive && <Badge color="slate">{v.drive}</Badge>}
          {v.estRetail && <Badge color="yellow">Est. ${v.estRetail.toLocaleString()}</Badge>}
        </div>
      </div>

      {/* Condition */}
      <div className="text-sm">
        <div className="text-slate-800">{v.title}</div>
        <div className="text-[12px] text-slate-500">{v.condition}</div>
        <div className="text-[12px] text-slate-500">{v.damage}</div>
      </div>

      {/* Sale Info */}
      <div className="text-sm">
        <div className="text-slate-800">{v.location}</div>
        <div className="text-[12px] text-amber-600">{v.auctionTime}</div>
      </div>

      {/* Bid / Buy Buttons */}
      <div className="flex items-center justify-end gap-2">
        {/* Current Bid */}
        <div className="text-right mr-3">
          <div className="text-[12px] text-slate-500 leading-none">Current bid</div>
          <div className="font-semibold text-slate-800">${v.currentBidUsd.toLocaleString()}</div>
        </div>

        {/* Bid Now & Buy Now Buttons */}
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-[#0052FF] text-white text-[13px] font-semibold px-4 py-1.5 hover:bg-[#0041cc] transition">
            Bid&nbsp;Now
          </button>

          {v.buyNowUsd && (
            <button className="rounded-md bg-[#F0B90B] text-black text-[13px] font-semibold px-4 py-1.5 hover:bg-[#e0aa09] transition">
              Buy&nbsp;Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// ---------- Vehicle Card (Grid style) ----------
function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white hover:shadow-md transition">
      <div className="aspect-[4/3] bg-slate-100">
        <img
          src={v.image}
          alt={v.yearMakeModel}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3 text-sm">
        <div className="font-semibold text-slate-800 line-clamp-1">
          {v.yearMakeModel}
        </div>
        <div className="mt-1 text-[12px] text-slate-500">
          Lot {v.lot} • Odo {v.odo ?? "—"}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {v.fuel && <Badge color="slate">{v.fuel}</Badge>}
          {v.drive && <Badge color="slate">{v.drive}</Badge>}
          <Badge color="yellow">
            Bid ${v.currentBidUsd.toLocaleString()}
          </Badge>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <PrimaryBtn className="flex-1">Bid</PrimaryBtn>
          {v.buyNowUsd && (
            <SecondaryBtn className="flex-1">Buy</SecondaryBtn>
          )}
        </div>
      </div>
      <div className="px-3 pb-3 text-[12px] text-slate-500">{v.location}</div>
    </div>
  );
}

// ---------- Page ----------
export default function FeaturedPage() {
  const [grid, setGrid] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return VEHICLES.slice(start, start + pageSize);
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar / breadcrumb mimic */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-2 text-xs text-slate-500">
          Home / Vehicle Finder /{" "}
          <span className="text-slate-700 font-medium">Featured Vehicles</span>
        </div>
      </div>

      <div className="px-4">
        {/* Header actions */}
        <div className="sticky top-0 z-20 -mx-4 bg-white px-4 pt-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-semibold text-slate-800">
              100+ Featured Vehicles for sale
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <input
                  placeholder="Search vehicles..."
                  className="w-[260px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select className="rounded-md border border-slate-300 px-2 py-2 text-sm">
                  <option>Sort by: Relevance</option>
                  <option>Current Bid ↑</option>
                  <option>Current Bid ↓</option>
                  <option>Year ↑</option>
                  <option>Year ↓</option>
                </select>
              </div>

              {/* View switcher */}
              <div className="flex rounded-md border border-slate-300 overflow-hidden">
                <button
                  onClick={() => setGrid(false)}
                  className={twMerge(
                    "px-3 py-2 text-sm",
                    !grid
                      ? "bg-slate-100 text-slate-800"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  Table
                </button>
                <button
                  onClick={() => setGrid(true)}
                  className={twMerge(
                    "px-3 py-2 text-sm",
                    grid
                      ? "bg-slate-100 text-slate-800"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  Grid
                </button>
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
              >
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6 py-6">
          {/* Sidebar */}
          <Filters open={filterOpen} onClose={() => setFilterOpen(false)} />

          {/* Content */}
          <section className="rounded-lg border border-slate-200 bg-white">
            {!grid && (
              <div className="hidden md:grid grid-cols-[140px_1.3fr_1fr_1fr_260px] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                <div>Image</div>
                <div>Lot info</div>
                <div>Condition</div>
                <div>Sale info</div>
                <div className="text-right">Bids</div>
              </div>
            )}

            <div className="px-4">
              {!grid ? (
                <div className="divide-y divide-slate-200">
                  {paged.map((v) => (
                    <VehicleRow key={v.id} v={v} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
                  {paged.map((v) => (
                    <VehicleCard key={v.id} v={v} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm">
              <div className="text-slate-500">
                Showing{" "}
                <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * 10, VEHICLES.length)}
                </span>{" "}
                of <span className="font-medium">{VEHICLES.length}</span> entries
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={twMerge(
                      "h-8 w-8 rounded-md border text-sm",
                      page === p
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
