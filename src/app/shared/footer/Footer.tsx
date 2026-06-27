"use client";
import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { SiTiktok } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 pt-12 pb-6 px-6 md:px-10 lg:px-20">
      {/* Top Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 border-b border-gray-700 pb-10">
        {/* ==== Column 1 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Get to Know Us</h4>
          <ul className="space-y-2 text-sm">
            <li>About CarClickBD</li>
            <li>Our History</li>
            <li>How Auctions Work</li>
            <li>Community</li>
            <li>Member News</li>
            <li>Reviews</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Investor Relations</li>
          </ul>
        </div>

        {/* ==== Column 2 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Find a Vehicle</h4>
          <ul className="space-y-2 text-sm">
            <li>Vehicle Finder</li>
            <li>Sales List</li>
            <li>Watchlist</li>
            <li>Saved Searches</li>
            <li>Vehicle Alerts</li>
          </ul>
        </div>

        {/* ==== Column 3 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Auctions</h4>
          <ul className="space-y-2 text-sm">
            <li>Today’s Auctions</li>
            <li>Auctions Calendar</li>
            <li>Join Auction</li>
            <li>Night Cap Sales</li>
            <li>Bank-Repo Vehicles</li>
            <li>Rental Auctions</li>
            <li>Wholesale Auctions</li>
          </ul>
        </div>

        {/* ==== Column 4 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Brokers</li>
            <li>Vehicle Reports</li>
            <li>Industry Links</li>
            <li>Shipping</li>
            <li>Tow Providers</li>
            <li>International Buyers</li>
          </ul>
        </div>

        {/* ==== Column 5 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Glossary of Terms</li>
            <li>Resource Center</li>
            <li>Help With Licensing</li>
            <li>Videos</li>
            <li>Member Fees</li>
            <li>Seller Mobile</li>
            <li>New Member Guide</li>
          </ul>
        </div>

        {/* ==== Column 6 ==== */}
        <div>
          <h4 className="text-[#F0B90B] font-semibold mb-4">Connect with Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition">
              <FacebookOutlined /> Facebook
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <InstagramOutlined /> Instagram
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <SiTiktok /> TikTok
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <LinkedinOutlined /> LinkedIn
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <YoutubeOutlined /> YouTube
            </li>
            <li>Blog</li>
          </ul>

          <h4 className="text-[#F0B90B] font-semibold mt-6 mb-2">
            Download the App
          </h4>
          <div className="flex flex-col gap-3">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17Dlfop0XoXj0yd3Q_B_io3z4W6koxAOpYg&s"
              alt="App Store"
              width={140}
              height={40}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              width={140}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-6 gap-3">
        <p className="text-gray-500">
          Copyright © 2026 CarClickBD Inc. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-xs">
          <Link href="/">Site Map</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/sell-item">Sell a Vehicle</Link>
          <Link href="/terms-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/privacy-policy">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
