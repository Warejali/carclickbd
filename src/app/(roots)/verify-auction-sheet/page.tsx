"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, FileSearch, Search, ShieldCheck } from "lucide-react";
import AuctionSheetVerification from "@/components/publiclayout/home/AuctionSheetVerification";

const VerifyAuctionSheetPage = () => {
  const [chassisNo, setChassisNo] = useState("");
  const [searchedChassis, setSearchedChassis] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchedChassis(chassisNo.trim());
  };

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0b90b]/40 bg-[#fff7d6] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#003399]">
              <ShieldCheck size={15} />
              Japanese Auction Sheet Check
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              Verify Japanese Auction Sheets Before You Buy
            </h1>

            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-600">
              Search by chassis number to request verification of available
              Japanese auction records, including production year, mileage,
              auction grade, and condition notes.
            </p>

            <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {["2000-2026 records", "Mileage review", "Grade & condition"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={16} className="text-[#003399]" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#003399]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <div className="relative h-60 bg-slate-900 md:h-72">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
                  alt="Japanese car auction verification"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="p-5 md:p-7">
                <div className="mb-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#003399]">
                    Chassis Verification
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    Enter Chassis Number
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-3">
                  <label className="relative">
                    <FileSearch
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#003399]"
                    />
                    <input
                      value={chassisNo}
                      onChange={(event) => setChassisNo(event.target.value)}
                      placeholder="e.g. NKE165-7245648"
                      className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm font-semibold uppercase tracking-wide text-slate-800 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-[#003399] focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#f0b90b] px-8 text-sm font-extrabold uppercase text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d9a609]"
                  >
                    <Search size={17} />
                    Search
                  </button>
                </form>

                <p className="mt-4 text-xs font-medium leading-6 text-slate-500">
                  Enter the full chassis number exactly as shown on the vehicle
                  documents. Our team will review the available auction sheet
                  details after submission.
                </p>

                {searchedChassis && (
                  <div className="mt-4 rounded-xl border border-[#f0b90b]/60 bg-[#fff7d6] px-4 py-3 text-sm font-semibold text-slate-800">
                    Search request received for chassis:{" "}
                    <span className="uppercase">{searchedChassis}</span>.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuctionSheetVerification />
    </main>
  );
};

export default VerifyAuctionSheetPage;
