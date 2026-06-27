"use client";

import React from "react";

export default function CarClickBDLogo() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* ====== OVAL BACKGROUND ====== */}
      <div className="relative w-[180px] h-[70px]">
        {/* Main dark oval */}
        <svg
          viewBox="0 0 400 150"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          {/* Outer metallic border */}
          <ellipse
            cx="200"
            cy="75"
            rx="190"
            ry="65"
            fill="url(#bgGradient)"
            stroke="#1e293b"
            strokeWidth="8"
          />
          {/* Inner blue accent ring */}
          <ellipse
            cx="200"
            cy="75"
            rx="175"
            ry="58"
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
          />

          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="400" y2="150">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
        </svg>

        {/* ====== TEXT ====== */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-4xl italic font-black tracking-tight drop-shadow-[2px_3px_2px_rgba(0,0,0,0.6)]">
            Car
            <span className="text-blue-400">ClickBD</span>
          </span>
        </div>

        {/* ====== SHADOW / GLOW ====== */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 via-transparent to-yellow-500/20 blur-lg"></div>
      </div>
    </div>
  );
}
