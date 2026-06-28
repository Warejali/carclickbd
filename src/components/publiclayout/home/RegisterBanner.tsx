"use client";
import React from "react";

const RegisterBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#002b8f] via-[#0046ff] to-[#002b8f] text-white py-14 px-6">
      {/* Background dotted pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="dotPattern"
              x="0"
              y="0"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        {/* Text section */}
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to Find Your Next Car on CarClickBD?
          </h2>
          <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed">
            Join thousands of smart buyers who find their next{" "}
            <span className="font-semibold text-white">
              used & repairable cars, trucks, SUVs
            </span>{" "}
            and more — all through{" "}
            <span className="text-[#F0B90B] font-semibold">
              verified dealer and private seller listings
            </span>{" "}
            powered by CarClickBD. Safe, fast, and fully transparent.
          </p>
        </div>

        {/* Button */}
        <button
          className="bg-[#F0B90B] text-black font-semibold text-base px-10 py-3 rounded-full 
                     hover:bg-[#dba808] transition-all duration-300 
                     shadow-lg hover:shadow-[0_0_25px_rgba(240,185,11,0.6)] 
                     transform hover:-translate-y-1"
        >
          REGISTER NOW
        </button>
      </div>
    </section>
  );
};

export default RegisterBanner;
