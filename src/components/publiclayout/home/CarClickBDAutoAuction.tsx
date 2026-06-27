"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/shared/PrimaryButton";

const CarClickBDAutoAuction = () => {
  const tabs = ["Makes", "Models", "Featured", "Types", "Trending"];
  const [activeTab, setActiveTab] = useState("Makes");

  // ======= Static Demo Data =======
  const data: Record<string, string[]> = {
    Makes: [
      "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
      "Ford", "Freightliner", "GMC", "Harley", "Honda", "Hummer", "Hyundai", "Infiniti",
      "International", "Isuzu", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus",
      "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi",
      "Nissan", "Polaris", "Pontiac", "Porsche", "Ram", "Rolls-Royce", "Saab", "Scion",
      "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "Yamaha",
    ],

    Models: [
      "Chevrolet Camaro", "Chevrolet Colorado", "Chevrolet Corvette", "Chevrolet Cruze",
      "Chevrolet Equinox", "Chevrolet Impala", "Chevrolet Malibu", "Chevrolet Silverado",
      "Chevrolet Tahoe", "Chevrolet Traverse", "Chrysler Town & Country", "Dodge Charger",
      "Dodge Grand Caravan", "Ford Econoline", "Ford Escape", "Ford Explorer", "Ford F150",
      "Ford F250", "Ford Focus", "Ford Fusion", "Ford Mustang", "Honda Accord", "Honda Civic",
      "Honda CR-V", "Honda Odyssey", "Hyundai Elantra", "Hyundai Sonata", "Jeep Grand Cherokee",
      "Kia Optima", "Nissan Altima", "Nissan Maxima", "Nissan Rogue", "Nissan Sentra",
      "Nissan Versa", "Toyota 4Runner", "Toyota Camry", "Toyota Corolla", "Toyota Highlander",
      "Toyota Prius", "Toyota RAV4", "Toyota Tacoma",
    ],

    Featured: [
      "Buy It Now Vehicles", "Clean Title Cars", "Donated Cars", "Featured Vehicles",
      "Fleet Cars", "Classic Cars", "Front End Damaged Vehicles", "Hail Damaged Cars",
      "Exotic Cars", "Impound Cars", "Auctions With Bids", "Minor Dents/Scratches",
      "Newly Added Vehicles", "Auctions With No Bids", "No License Required",
      "Nonrepairable Vehicles", "Used Vehicles", "Offsite Sale Vehicles", "Pure Sale Vehicles",
      "Theft Recovery Cars", "Used Rental Cars", "Repossessed Cars", "Run and Drive Vehicles",
      "Salvage Cars", "Flood Damaged Cars", "Public and General Auctions",
    ],

    Types: [
      "ATVs", "Agriculture and Farm Equipment", "Automobiles", "Boats", "Bus",
      "Construction Equipment", "Dirt Bikes", "Heavy Duty Trucks", "Industrial Equipment",
      "Jet Skis", "Medium Duty/Box Trucks", "Motorcycles", "Pickup Trucks", "RVs",
      "Snowmobile", "Trailers",
    ],

    Trending: [
      "ALL MODELS", "COROLLA", "CAMRY", "RAV4", "CIVIC", "ACCORD", "ALL MODELS",
      "CRV", "ALTIMA", "ROGUE", "TOYOTA", "FORD", "HONDA", "CHEVROLET", "NISSAN",
      "HYUNDAI", "MERCEDES-BENZ", "BMW", "KIA", "JEEP",
    ],
  };

  return (
    <section className="bg-[#f5f7fb] py-14 px-4 md:px-12 text-gray-800">
       {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#003399] mb-8">
            CarClickBD Auto Auction – Used & Repairable Cars for Sale
          </h2>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* ===== Left Section ===== */}
        <div className="flex-1">
         

          {/* Tabs */}
          <div className="flex justify-start gap-6 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-semibold transition-all border-b-2 pb-1 ${
                  activeTab === tab
                    ? "border-[#0052FF] text-black"
                    : "border-transparent text-gray-600 hover:text-[#0052FF]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Animated Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4 mb-8 text-[#0052FF] text-[15px] font-medium text-center md:text-left"
            >
              {data[activeTab].map((item, index) => (
                <p
                  key={index}
                  className="hover:underline cursor-pointer hover:text-[#003ad6] transition-all truncate"
                  title={item}
                >
                  {item}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View More */}
          <div className="flex justify-center mt-8">
            <Button size="md" className="rounded-full">
              VIEW MORE
            </Button>
          </div>
        </div>

        {/* ===== Right Promo Banner ===== */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="bg-gradient-to-b from-[#0046c9] to-[#002d8d] text-white rounded-xl overflow-hidden w-[320px] md:w-[340px] shadow-xl text-center relative">
            <div className="p-6">
              <h3 className="text-2xl font-bold leading-tight mb-2">
                THOUSANDS
                <br />
                OF VEHICLES
              </h3>
              <div className="bg-[#F0B90B] text-black font-bold text-[14px] rounded-full px-4 py-1 inline-block mb-4">
                NO LICENSE REQUIRED
              </div>
              <img
                src="https://www.copart.com/content/minor-damage-370x520.png"
                alt="Car promo"
                className="w-full h-auto rounded-md mb-6"
              />
              <Button variant="secondary" size="md" className="rounded-full">
                VIEW NOW
              </Button>
            </div>

            {/* Dotted Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="dotPattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="2" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarClickBDAutoAuction;
