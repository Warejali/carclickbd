"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Link from "next/link";

const AuctionSheetVerificationCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9 }}
    className="w-[min(380px,100%)] overflow-hidden rounded-2xl border border-white/30 bg-white/85 shadow-[0_28px_70px_rgba(0,18,48,0.35)] backdrop-blur-md"
  >
    <div className="relative bg-gradient-to-r from-[#002a86] via-[#003399] to-[#0047c7] px-6 pb-9 pt-6 text-center">
      <h3 className="text-lg font-black uppercase leading-7 text-white md:text-xl">
        Auction Sheet Verification
        <span className="block">of Japanese Cars</span>
      </h3>
      <div className="absolute inset-x-0 bottom-[-1px] h-8 rounded-b-[50%] bg-white/85" />
    </div>

    <div className="px-7 pb-7 pt-6 text-center">
      <div className="relative mb-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#f0b90b] to-[#ffd34d] px-5 py-3 text-sm font-black uppercase text-slate-950 shadow-sm">
        Chassis Number
        <span className="absolute -bottom-1.5 h-3 w-3 rotate-45 bg-[#f0b90b]" />
      </div>
      <input
        aria-label="Chassis number"
        placeholder="XXT240-545657"
        className="h-12 w-full border border-slate-300/80 bg-white/90 px-4 text-center text-sm font-bold uppercase text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#003399] focus:ring-2 focus:ring-blue-100"
      />
      <Link
        href="/verify-auction-sheet"
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#003399] text-base font-bold text-white shadow-md shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-[#00266f] hover:shadow-lg"
      >
        Search
      </Link>
      <Link
        href="/verify-auction-sheet"
        className="mt-5 inline-block text-sm font-bold text-[#003399] transition hover:text-[#f0b90b]"
      >
        How To Verify Auction Sheet &gt;
      </Link>
    </div>
  </motion.div>
);

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[340px] sm:h-[440px] md:h-[520px] lg:h-[460px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {/* ---------------- SLIDE 1 (Marketplace) ---------------- */}
        <SwiperSlide>
          <div className="relative flex items-center justify-between h-full text-white overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
            {/* Fog Layer */}
            <motion.div
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] opacity-25"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col justify-center px-8 md:px-16 lg:w-1/2 z-20"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-extrabold mb-3"
                animate={{
                  backgroundPosition: ["200% center", "-200% center"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #F0B90B 0%, #ffffff 50%, #F0B90B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "400%",
                }}
              >
                Dealer & Private Seller Cars
              </motion.h2>

              <p className="text-lg text-gray-200 mb-6">
                Over{" "}
                <span className="text-yellow-400 font-bold">4+ Million</span>{" "}
                New, reconditioned, and local used cars listed by verified sellers.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {["Register", "Find", "Inquire"].map((item, i) => (
                  <div
                    key={i}
                    className="bg-blue-700/60 p-4 rounded-xl hover:bg-blue-700/80 transition"
                  >
                    <h3 className="font-bold">
                      {i + 1}. {item}
                    </h3>
                    <p className="text-sm opacity-90">
                      {item === "Register"
                        ? "Sign up for membership."
                        : item === "Find"
                        ? "Search 390,000+ vehicles."
                        : "Contact sellers directly."}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-md">
                  Register to Inquire
                </button>
                <button className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Car */}
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="absolute right-0 bottom-0 w-[55%] flex justify-center items-end"
            >
              <motion.img
                src="https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png"
                alt="SUV"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[85%] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </SwiperSlide>

        {/* ---------------- SLIDE 2 (Dealer Inventory) ---------------- */}
        <SwiperSlide>
          <div className="relative flex items-center justify-between h-full text-white overflow-hidden bg-gradient-to-r from-[#001a4d] via-[#002b8f] to-[#001a4d]">
            {/* Fog Layer */}
            <motion.div
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] opacity-25"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="z-20 flex flex-col items-center justify-center px-8 md:px-16 lg:w-1/2"
            >
              <AuctionSheetVerificationCard />
            </motion.div>

            {/* Right Car */}
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="absolute right-0 bottom-0 w-[55%] flex justify-center items-end"
            >
              <motion.img
                src="https://www.pngmart.com/files/23/Luxury-Car-PNG-Picture.png"
                alt="Luxury Car"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[90%] h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </SwiperSlide>
        

        {/* ---------------- SLIDE 4 (Bugatti Cinematic) ---------------- */}
        <SwiperSlide>
          <div className="relative flex items-center justify-between h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Animated Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#001a4d] via-[#002b8f] to-[#001a4d] opacity-90"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Light Beam */}
            <motion.div
              className="absolute top-0 left-[-30%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12"
              animate={{ left: ["-30%", "130%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Left Verification Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="z-20 flex flex-col items-center justify-center px-8 md:px-16 lg:w-[45%]"
            >
              <AuctionSheetVerificationCard />
            </motion.div>

            {/* Right Car */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.8 }}
              className="absolute right-0 bottom-0 w-[55%] flex justify-center items-end"
            >
              <motion.img
                src="https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png"
                alt="Bugatti Chiron"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[85%] h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  );
}
