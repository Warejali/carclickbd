"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileSearch, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/constants/siteContact";

const AuctionSheetsPageContent = () => {
  const searchParams = useSearchParams();
  const chassis = searchParams.get("chassis") || "";

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-16">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_90px_rgba(15,23,42,0.12)]">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-gradient-to-br from-slate-950 via-[#073b82] to-[#0057c2] p-8 text-white md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#f5bd05]">
              <CheckCircle2 size={15} />
              Payment successful
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight">
              Auction sheet request received
            </h1>
            <p className="mt-4 text-sm font-medium leading-7 text-blue-100">
              Our team will review the available Japanese auction sheet details
              and contact you with the next steps.
            </p>
          </div>

          <div className="p-8 md:p-10">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5bd05] text-slate-950">
                  <FileSearch size={22} />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Chassis number
                  </p>
                  <p className="mt-1 text-2xl font-black uppercase text-slate-950">
                    {chassis || "Submitted"}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    Please keep your WhatsApp available. CarClickBD will contact
                    you after checking the auction sheet availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl(
                  `Hello CarClickBD, I completed payment for auction sheet verification${
                    chassis ? ` for chassis ${chassis}` : ""
                  }.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
              >
                <MessageCircle size={18} />
                Contact on WhatsApp
              </a>
              <Link
                href="/cars"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-900 transition hover:border-[#f5bd05] hover:bg-[#fff8df]"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default function AuctionSheetsPage() {
  return (
    <Suspense fallback={<div className="min-h-[65vh] bg-slate-50" />}>
      <AuctionSheetsPageContent />
    </Suspense>
  );
}
