"use client";

import React from "react";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { siteAddress, siteContact } from "@/constants/siteContact";

const footerColumns = [
  {
    title: "Buy",
    links: [
      { label: "Browse Cars", href: "/cars" },
      { label: "Featured Auctions", href: "/featured-auctions" },
      { label: "Past Auctions", href: "/past-auctions" },
      { label: "Duty Calculator", href: "/duty-calculator" },
      { label: "Verify Auction Sheet", href: "/verify-auction-sheet" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Sell a Vehicle", href: "/sell-item" },
      { label: "Seller Signup", href: "/seller-signup" },
      { label: "Photo Guide", href: "/photoguide" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Support", href: "/support" },
      { label: "Shipping", href: "/shipping" },
      { label: "SafePay", href: "/safepay" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Gallery", href: "/gallery" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookOutlined },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramOutlined },
  { label: "TikTok", href: "https://tiktok.com", icon: SiTiktok },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinOutlined },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeOutlined },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <span className="text-3xl font-black italic tracking-tight text-white">
                Car<span className="text-sky-400">ClickBD</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-400">
              A cleaner way to browse verified cars, compare details, verify
              auction sheets, and contact sellers with confidence.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-[#f0b90b]" />
                <span>{siteContact.whatsapp}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[#f0b90b]" />
                <span>{siteContact.email}</span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin size={16} className="text-[#f0b90b]" />
                <span>{siteAddress}</span>
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-[#f0b90b] hover:bg-[#f0b90b] hover:text-slate-950"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f0b90b]">
                  {column.title}
                </h4>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-medium text-slate-400 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            Copyright © 2026 CarClickBD. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
            <Link href="/terms-service" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
