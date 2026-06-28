"use client";
import React from "react";
import { motion } from "framer-motion";

const tiles = [
  {
    title: "Browse Anytime,\nAnywhere",
    subtitle: "Join real-time online auctions — from your phone or desktop.",
    cta: "LEARN MORE",
    image:
      "https://www.copart.com/content/us/en/banners/homepage-300x250/4-300x250.jpg",
  },
  {
    title: "Fresh Listings",
    subtitle: "Find late-night listings and exclusive dealer vehicles.",
    cta: "EXPLORE NOW",
    image:
      "https://www.copart.com/content/us/en/banners/homepage-300x250/3-300x250.jpg",
  },
  {
    title: "No License? No Problem",
    subtitle: "Start bidding today — no dealer license required.",
    cta: "VIEW INVENTORY",
    image:
      "https://www.copart.com/content/us/en/banners/homepage-300x250/2-300x250.jpg",
  },
  {
    title: "Compare & Inquire",
    subtitle: "Bid fair, bid fast — secure your dream car in seconds.",
    cta: "VIEW CARS",
    image:
      "https://www.copart.com/content/us/en/banners/homepage-300x250/1-300x250.jpg",
  },
];

const PromoTiles = () => {
  return (
    <section className="bg-[#f5f8ff] py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003399] mb-3">
          Discover the CarClickBD Advantage
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Whether you’re buying your first car or expanding your dealership,
          CarClickBD gives you instant access to global vehicle auctions — 24/7,
          anytime, anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* Background Image */}
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000c2f]/90 via-[#001a66]/70 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
              <h3 className="text-white font-extrabold text-2xl leading-snug whitespace-pre-line drop-shadow-md mb-2">
                {t.title}
              </h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                {t.subtitle}
              </p>

              <button className="self-start px-5 py-2 text-sm font-semibold rounded-full bg-white/20 border border-white/50 text-white backdrop-blur-md hover:bg-[#F0B90B] hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                {t.cta}
              </button>
            </div>

            {/* Glow ring effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-gradient-to-tr from-[#F0B90B]/20 via-[#0052FF]/20 to-transparent blur-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromoTiles;
