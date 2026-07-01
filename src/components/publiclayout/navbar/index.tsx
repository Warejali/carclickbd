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
    "rounded-full border border-white/10 bg-gradient-to-r from-[#0052ff] to-[#007bff] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#0041cc] hover:to-[#0066cc] hover:shadow-md hover:shadow-blue-500/30";
  const btnGold =
    "rounded-full border border-yellow-200/40 bg-gradient-to-r from-[#f0b90b] to-[#ffd54f] px-4 py-2 text-xs font-bold text-slate-950 shadow-sm shadow-yellow-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#d8a90b] hover:to-[#f0c000] hover:shadow-md hover:shadow-yellow-500/30";
  const btnOutline =
    "rounded-full border border-[#f0b90b]/70 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0b90b] hover:text-slate-950 hover:shadow-md hover:shadow-yellow-500/25";

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
    { label: "Duty Calculator", href: "/duty-calculator" },
    { label: "Find Cars", href: "/cars" },
    { label: "Year of Manufacture", href: "/year-of-manufacture" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ];

  const sellMenu: MenuProps["items"] = [
    { key: "dealer", label: <Link href="/sell-item?seller=dealer">Dealer</Link> },
    {
      key: "individual",
      label: <Link href="/sell-item?seller=individual">Individual</Link>,
    },
    { key: "broker", label: <Link href="/sell-item?seller=broker">Broker</Link> },
  ];

  const buyMenu: MenuProps["items"] = [
    { key: "new", label: <Link href="/cars?condition=new">New</Link> },
    {
      key: "reconditioned",
      label: <Link href="/cars?condition=reconditioned">Reconditioned</Link>,
    },
    {
      key: "local-used",
      label: <Link href="/cars?condition=local-used">Local Used</Link>,
    },
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

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link href="/verify-auction-sheet" className="hidden lg:block">
            <button className={btnOutline}>
              Verify Auction Sheet
            </button>
          </Link>

          <Dropdown menu={{ items: buyMenu }} trigger={["hover"]}>
            <button className={`${btnGold} flex items-center gap-1`}>
              Buy your car <DownOutlined className="text-xs" />
            </button>
          </Dropdown>

          <Dropdown menu={{ items: sellMenu }} trigger={["hover"]}>
            <button className={`${btnGold} flex items-center gap-1`}>
              Sell your car <DownOutlined className="text-xs" />
            </button>
          </Dropdown>

          <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg text-white transition hover:border-[#F0B90B]/60 hover:bg-white/15 hover:text-[#F0B90B]"
              aria-label="Change language"
            >
              <GlobalOutlined />
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
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white hover:text-[#F0B90B]"
              aria-label="Change language"
            >
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

          <Link href="/verify-auction-sheet" className="mb-5 block">
            <button className={`${btnOutline} w-full py-3`}>
              Verify Auction Sheet
            </button>
          </Link>

          <div className="flex flex-col gap-3 text-base text-gray-200">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0 grid grid-cols-2 gap-2 border-t border-white/10 bg-[#0b0b0b]/95 p-3">
          <Dropdown menu={{ items: buyMenu }} trigger={["click"]}>
            <button
              className={`${btnGold} flex items-center justify-center gap-1 px-3 py-2.5`}
            >
              Buy your car <DownOutlined />
            </button>
          </Dropdown>
          <Dropdown menu={{ items: sellMenu }} trigger={["click"]}>
            <button
              className={`${btnGold} flex items-center justify-center gap-1 px-3 py-2.5`}
            >
              Sell your car <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
