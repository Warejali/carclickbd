"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dropdown, Drawer, MenuProps } from "antd";
import { DownOutlined, GlobalOutlined, MenuOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/Redux/hooks";
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

  const btnBlue =
    "bg-gradient-to-r from-[#0052ff] to-[#007bff] text-white font-semibold rounded-full px-5 py-2.5 shadow-md hover:from-[#0041cc] hover:to-[#0066cc] hover:shadow-blue-500/40 transition-all duration-300";
  const btnGold =
    "bg-gradient-to-r from-[#f0b90b] to-[#ffd54f] text-black font-semibold rounded-full px-5 py-2.5 shadow-md hover:from-[#d8a90b] hover:to-[#f0c000] hover:shadow-yellow-500/40 transition-all duration-300";

  const languageMenu: MenuProps["items"] = [
    {
      key: "usa-en",
      label: (
        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/us.svg"
            alt="English"
            className="h-3 w-5 rounded-sm border border-gray-200"
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
            className="h-3 w-5 rounded-sm border border-gray-200"
          />
          <span>USA | Spanish</span>
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
            className="h-3 w-5 rounded-sm border border-gray-200"
          />
          <span>France | French</span>
        </div>
      ),
    },
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Verify Auction Sheet", href: "/verify-auction-sheet" },
    { label: "Duty Calculator", href: "/duty-calculator" },
    { label: "Find Cars", href: "/find-cars" },
    { label: "Year of Manufacture", href: "/year-of-manufacture" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ];

  const sellMenu: MenuProps["items"] = [
    { key: "1", label: <Link href="/sell-item">Sell a Car</Link> },
    { key: "2", label: <Link href="/seller-signup">Seller Signup</Link> },
  ];

  const navLinkClass =
    "relative text-sm font-semibold text-gray-200 transition-all duration-300 hover:text-yellow-400 after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#001230] via-[#001f4f] to-[#003ea8] shadow-lg backdrop-blur-sm">
      <div className="flex min-h-[84px] items-center justify-between gap-5 px-4 py-3 md:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <CarClickBDLogo />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 2xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <Link href="/help" className="hidden lg:block">
            <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-gray-100 transition-all duration-300 hover:bg-white/20 hover:text-white">
              Help center
            </button>
          </Link>

          <Dropdown menu={{ items: sellMenu }} trigger={["hover"]}>
            <button className={`${btnGold} flex items-center gap-1`}>
              Sell your car <DownOutlined className="text-xs" />
            </button>
          </Dropdown>

          <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
            <button className="flex items-center gap-2 text-white transition hover:text-[#F0B90B]">
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

        <button
          onClick={() => setOpen(true)}
          className="hidden text-xl text-white 2xl:hidden md:block"
          aria-label="Open navigation menu"
        >
          <MenuOutlined />
        </button>

        <div className="flex items-center gap-3 md:hidden">
          <Dropdown menu={{ items: languageMenu }}>
            <button className="text-white hover:text-[#F0B90B]">
              <GlobalOutlined />
            </button>
          </Dropdown>
          {isLoggedIn ? <ProfileDropdown /> : <NavAuth />}
          <button onClick={() => setOpen(true)} className="text-xl text-white">
            <MenuOutlined />
          </button>
        </div>
      </div>

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
        <div className="flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-400 hover:text-white"
          >
            x
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0 flex gap-2 border-t border-white/10 bg-[#0b0b0b]/95 p-3">
          <Dropdown menu={{ items: sellMenu }} trigger={["click"]}>
            <button
              className={`${btnGold} flex w-1/2 items-center justify-center gap-1 font-semibold`}
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
