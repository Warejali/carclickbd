import React from "react";
import { BadgeCheck, CarFront, Headphones, ShieldCheck } from "lucide-react";
import AuctionProducts from "@/components/product/AuctionProducts";
import MembershipHome from "@/components/membershipTier/MembershipHome";
import HeaderSlider from "./HeaderSlider";
import CarClickBDAutoAuction from "./CarClickBDAutoAuction";
import WhatIsCarClickBD from "./WhatIsCarClickBD";
import RegisterBanner from "./RegisterBanner";
import FollowUs from "./FollowUs";
import PromoTiles from "./PromoTiles";
import AuctionSheetVerification from "./AuctionSheetVerification";

const trustItems = [
  {
    title: "Verified Listings",
    description: "Clear photos, price, specs, and availability.",
    icon: BadgeCheck,
  },
  {
    title: "Auction Sheet Help",
    description: "Review grades, mileage, and condition notes.",
    icon: ShieldCheck,
  },
  {
    title: "Smart Search",
    description: "Filter by maker, model, year, and condition.",
    icon: CarFront,
  },
  {
    title: "Buyer Support",
    description: "Inquiry and WhatsApp support when you shortlist.",
    icon: Headphones,
  },
];

const LandingHomePage = () => {
  return (
    <main className="bg-slate-50">
      <HeaderSlider />

      <section className="relative z-10 -mt-8 px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-md bg-slate-50 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AuctionProducts isShowAll={false} isPaginate={false} isDraft={false} isWinner={false} />

      <div className="border-y border-slate-200 bg-white">
        <AuctionSheetVerification />
      </div>

      <MembershipHome />

      <div className="bg-white">
        <CarClickBDAutoAuction />
      </div>

      <WhatIsCarClickBD />
      <PromoTiles />
      <FollowUs />
      <RegisterBanner />
      {/* <NewsletterSection /> */}
    </main>
  );
};

export default LandingHomePage;
