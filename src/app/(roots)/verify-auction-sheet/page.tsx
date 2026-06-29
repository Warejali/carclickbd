"use client";

import { useState } from "react";
import Image from "next/image";
import { FileSearch, Search, ShieldCheck } from "lucide-react";
import AuctionSheetVerification from "@/components/publiclayout/home/AuctionSheetVerification";

const VerifyAuctionSheetPage = () => {
  const [chassisNo, setChassisNo] = useState("");
  const [searchedChassis, setSearchedChassis] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchedChassis(chassisNo.trim());
  };

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
            alt="Japanese car auction verification"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/65" />
        </div>

        <div className="relative mx-auto flex min-h-[350px] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <ShieldCheck size={16} />
            Japanese Auction Sheet Check
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            Auction Sheet Verification of Japanese Car (2000-2026 Year)
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid w-full max-w-4xl gap-3 rounded-xl border border-white/30 bg-white/95 p-4 shadow-2xl backdrop-blur md:grid-cols-[1fr_auto]"
          >
            <label className="relative">
              <FileSearch
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={chassisNo}
                onChange={(event) => setChassisNo(event.target.value)}
                placeholder="ENTER CHASSIS NO. EG: XXT123-986754"
                className="h-14 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#e41419] px-10 text-sm font-bold uppercase text-white shadow-lg transition hover:bg-[#c91015]"
            >
              <Search size={17} />
              Search
            </button>
          </form>

          <p className="mt-4 max-w-4xl text-base font-semibold leading-7 text-white md:text-xl">
            অকশনশীট ভেরিফিকেশন করতে আপনার চ্যাসিস নাম্বারটি ঠিক সহ সার্চ বারে
            লিখুন (উদাহরণ: NZT260-3173714) এরপর সার্চ বাটনটি ক্লিক করুন।
          </p>

          {searchedChassis && (
            <div className="mt-5 rounded-lg border border-emerald-300/50 bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-50 backdrop-blur">
              Search request received for chassis:{" "}
              <span className="uppercase">{searchedChassis}</span>. Our team
              will verify the auction sheet details.
            </div>
          )}
        </div>
      </section>

      <AuctionSheetVerification />
    </main>
  );
};

export default VerifyAuctionSheetPage;
