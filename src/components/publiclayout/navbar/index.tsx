"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input, Dropdown, MenuProps, Drawer } from "antd";
import {
  GlobalOutlined,
  MenuOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/Redux/hooks";
import Button from "@/components/shared/PrimaryButton";
import CarClickBDLogo from "@/components/shared/CarClickBDLogo";

const NotificationDropdown = dynamic(
  () => import("../../notifications/NavNotification"),
  { ssr: false }
);
const ProfileDropdown = dynamic(() => import("./ProfileDropdown"), {
  ssr: false,
});
const NavAuth = dynamic(() => import("./NavAuth"), { ssr: false });

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  if (isLoggedIn === undefined) return null;

  // ✅ Button Styles
  const btnBlue =
    "bg-gradient-to-r from-[#0052ff] to-[#007bff] text-white font-semibold rounded-full px-5 py-2.5 shadow-md hover:from-[#0041cc] hover:to-[#0066cc] hover:shadow-blue-500/40 transition-all duration-300";
  const btnGold =
    "bg-gradient-to-r from-[#f0b90b] to-[#ffd54f] text-black font-semibold px-5 py-2.5 shadow-md hover:from-[#d8a90b] hover:to-[#f0c000] hover:shadow-yellow-500/40 transition-all duration-300";

  // ✅ Language Menu with Flags
  const languageMenu: MenuProps["items"] = [
    {
      key: "usa-en",
      label: (
        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/us.svg"
            alt="English"
            className="w-5 h-3 rounded-sm border border-gray-200"
          />
          <span>USA | English</span>
        </div>
      ),
    },
    {
      key: "usa-es",
      label: (
        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/es.svg"
            alt="Spanish"
            className="w-5 h-3 rounded-sm border border-gray-200"
          />
          <span>USA | Español</span>
        </div>
      ),
    },
    {
      key: "fr",
      label: (
        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/fr.svg"
            alt="French"
            className="w-5 h-3 rounded-sm border border-gray-200"
          />
          <span>France | Français</span>
        </div>
      ),
    },
  ];

  const sellMenu: MenuProps["items"] = [
    { key: "1", label: <Link href="/sell-item">Sell a Car</Link> },
    { key: "2", label: <Link href="/seller-signup">Seller Signup</Link> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#001230] via-[#001f4f] to-[#003ea8] shadow-lg backdrop-blur-sm border-b border-white/10">
      {/* ======= TOP BAR ======= */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <CarClickBDLogo />
        </Link>

        {/* Desktop Search */}
        <div className="flex-1 flex justify-center mx-6">
          <div className="w-full max-w-2xl hidden md:flex gap-1 items-center">
            <input
              type="text"
              placeholder="NEW AI Search! enter Make, Model, Damage, Color, VIN, and more..."
              className="flex-1 px-5 py-2.5 text-[15px] bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00aaff]/60 transition"
            />
            <button className={btnGold}>Search Inventory</button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
            <button className="text-white flex items-center gap-2 hover:text-[#F0B90B] transition">
              <GlobalOutlined /> Language
            </button>
          </Dropdown>

          {isLoggedIn ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown />
            </>
          ) : (
            <NavAuth />
          )}
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <Dropdown menu={{ items: languageMenu }}>
            <button className="text-white hover:text-[#F0B90B]">
              <GlobalOutlined />
            </button>
          </Dropdown>
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <NavAuth />
          )}
          <button onClick={() => setOpen(true)} className="text-white text-xl">
            <MenuOutlined />
          </button>
        </div>
      </div>

      {/* ======= MOBILE BELOW HEADER ======= */}
      <div className="md:hidden bg-[#0b0b0b]/90 px-4 pb-3 border-t border-white/10">
        <div className="flex gap-2 mb-3 pt-2">
          <input
            type="text"
            placeholder="NEW AI Search! enter Make, Model, Damage, Color, VIN, and more..."
            className="flex-1 rounded-full px-4 py-3 text-[15px] bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/60 transition"
          />
          <button className={`${btnGold} px-4 py-3`}>
            <SearchOutlined />
          </button>
          {!isLoggedIn && (
            <Link href="/seller-signup">
              <button className={`${btnBlue} px-4 py-3`}>Register</button>
            </Link>
          )}
        </div>

        {/* Sell & Help */}
        <div className="flex gap-2">
          <Dropdown menu={{ items: sellMenu }} trigger={["click"]}>
            <button
              className={`${btnGold} w-1/2 font-semibold flex justify-center items-center gap-1`}
            >
              Sell your car <DownOutlined />
            </button>
          </Dropdown>
          <Link href="/help" className="w-1/2">
            <button className={`${btnBlue} w-full py-3 font-semibold`}>
              Help Center
            </button>
          </Link>
        </div>
      </div>

      {/* ======= MOBILE DRAWER ======= */}
      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width="85%"
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        styles={{
          content: {
            background: "rgba(10, 20, 45, 0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "white",
          },
        }}
        closable={false}
      >
        {/* Close */}
        <div className="flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by Make, Model, VIN..."
              className="flex-1 rounded-full px-4 py-3 text-[15px] bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/60 transition"
            />
            <button className={`${btnGold} px-4 py-3`}>
              <SearchOutlined />
            </button>
          </div>

          <div className="mb-6">
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link href="/login">
                <button className={`${btnBlue} w-full py-3 font-semibold`}>
                  Sign in
                </button>
              </Link>
            )}
          </div>

          <div className="flex flex-col gap-3 text-base text-gray-200">
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/cars">Inventory</Link>
            <Link href="/cars">Listings</Link>
            <Link href="/contact">Locations</Link>
            <Link href="/support">Services & Support</Link>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="sticky bottom-0 left-0 right-0 bg-[#0b0b0b]/95 border-t border-white/10 p-3 flex gap-2">
          <Dropdown menu={{ items: sellMenu }} trigger={["click"]}>
            <button
              className={`${btnGold} w-1/2 font-semibold flex justify-center items-center gap-1`}
            >
              Sell your car <DownOutlined />
            </button>
          </Dropdown>
          <Link href="/help" className="w-1/2">
            <button className={`${btnBlue} w-full py-3 font-semibold`}>
              Help Center
            </button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
