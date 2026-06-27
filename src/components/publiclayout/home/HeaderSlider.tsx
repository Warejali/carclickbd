"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

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
        {/* ---------------- SLIDE 1 (Auto Auctions) ---------------- */}
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
                100% Online Auto Auctions
              </motion.h2>

              <p className="text-lg text-gray-200 mb-6">
                Over{" "}
                <span className="text-yellow-400 font-bold">4+ Million</span>{" "}
                Used, Wholesale & Repairable Cars, Trucks & SUVs sold per year!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {["Register", "Find", "Bid"].map((item, i) => (
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
                        : "Join live auto auctions daily."}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-md">
                  Register to Start Bidding
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

        {/* ---------------- SLIDE 2 (Wholesale Auctions) ---------------- */}
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
              className="flex flex-col justify-center px-8 md:px-16 lg:w-1/2 z-20"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-extrabold mb-4 uppercase"
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
                Introducing Wholesale Auctions
              </motion.h2>

              <p className="text-lg mb-6 font-medium text-gray-200">
                Including <span className="font-bold">Bank-Repo</span>, Fleet,
                Finance & CarClickBD Select Vehicles
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-md">
                  View Inventory
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

            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col justify-center px-8 md:px-16 lg:w-[45%] z-20"
            >
              <p className="uppercase tracking-widest text-sm text-gray-300 mb-3">
                CarClickBD Featured Vehicle
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-[#ffffff]">
                <span className="text-[#0052FF]">2021 Bugatti</span> Chiron Pur Sport
              </h2>
              <p className="italic text-gray-300 mb-2">
                “Precision. Power. Passion. Experience performance redefined.”
              </p>
              <p className="uppercase text-[#F0B90B] font-semibold mb-8 tracking-wide">
                Selling Exclusively at CarClickBD
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group px-6 py-3 bg-gradient-to-r from-[#0052FF] to-[#007AFF] text-white font-semibold rounded-md overflow-hidden shadow-lg"
                >
                  <span className="relative z-10">Bid Now</span>
                  <span className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity"></span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border-2 border-[#F0B90B] text-[#F0B90B] font-semibold rounded-md hover:bg-[#F0B90B] hover:text-black transition-all duration-300"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>

            {/* Right Car */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.8 }}
              className="absolute right-0 bottom-0 w-[55%] flex justify-center items-end"
            >
              <motion.img
                src="https://www.copart.com/content/21-bugatti-car.webp"
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
