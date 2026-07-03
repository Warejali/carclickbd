"use client";

import Link from "next/link";
import {
  ArrowRightOutlined,
  BarChartOutlined,
  BellOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DollarOutlined,
  EyeOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getTokenInfo } from "@/service/auth.service";

const stats = [
  {
    title: "Active Listings",
    value: "24",
    note: "+4 this week",
    icon: CarOutlined,
    tone: "bg-blue-50 text-blue-700 ring-blue-100",
  },
  {
    title: "Buyer Inquiries",
    value: "18",
    note: "6 need reply",
    icon: CommentOutlined,
    tone: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    title: "Profile Views",
    value: "3.8K",
    note: "+12.4%",
    icon: EyeOutlined,
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    title: "Sales Value",
    value: "BDT 42.5M",
    note: "monthly estimate",
    icon: DollarOutlined,
    tone: "bg-slate-100 text-slate-800 ring-slate-200",
  },
];

const quickActions = [
  {
    title: "Add a new car",
    desc: "Create a polished vehicle listing with photos, specs, price, and location.",
    href: "/admin/product/create-product",
    icon: PlusOutlined,
  },
  {
    title: "Review inquiries",
    desc: "Follow up with interested buyers and keep your lead response time low.",
    href: "/admin/comment-history",
    icon: CommentOutlined,
  },
  {
    title: "Promote listings",
    desc: "Request featured placement for premium cars and campaign visibility.",
    href: "/admin/offer",
    icon: StarOutlined,
  },
];

const listingHealth = [
  ["Listings with full photos", "82%", "Good"],
  ["Listings missing VIN", "5", "Fix"],
  ["Reserved vehicles", "3", "Watch"],
  ["Average response time", "2h", "Strong"],
];

const recentLeads = [
  {
    car: "Toyota Prius 2022",
    buyer: "Buyer from Dhaka",
    status: "New inquiry",
    time: "12 min ago",
  },
  {
    car: "Honda Fit E:HEV",
    buyer: "Dealer account",
    status: "Contacted",
    time: "1h ago",
  },
  {
    car: "Mercedes-Benz GLE",
    buyer: "Private buyer",
    status: "Awaiting call",
    time: "3h ago",
  },
];

const SellerBoardHome = () => {
  const user = getTokenInfo();
  const displayName = user?.name || user?.email || "Seller";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-gradient-to-r from-slate-950 via-[#08245d] to-[#003399] text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f0b90b]">
                <CheckCircleOutlined />
                Verified Seller Workspace
              </div>
              <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-4xl">
                Welcome back, {displayName}. Manage listings, leads, and sales
                from one premium seller panel.
              </h1>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-200 md:text-base">
                Keep your vehicles updated, respond to buyers faster, and push
                your best cars into featured placements.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/admin/product/create-product"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#f0b90b] px-5 text-sm font-black text-slate-950 transition hover:bg-[#d9a609]"
                >
                  Create Listing <PlusOutlined />
                </Link>
                <Link
                  href="/admin/my-product"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white hover:text-slate-950"
                >
                  View My Listings <ArrowRightOutlined />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold text-slate-200">Today&apos;s focus</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Reply to new inquiries", "6 pending"],
                  ["Complete listing quality", "5 need updates"],
                  ["Feature best vehicles", "3 recommended"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md bg-white/10 px-4 py-3"
                  >
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs font-black text-[#f0b90b]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-md ring-1 ${item.tone}`}
              >
                <Icon />
              </div>
              <p className="text-sm font-bold text-slate-500">{item.title}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-600">
                {item.note}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Quick Seller Actions
              </h2>
              <p className="text-sm text-slate-500">
                The daily actions that move cars faster.
              </p>
            </div>
            <BarChartOutlined className="text-xl text-slate-400" />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white transition group-hover:bg-sky-600">
                    <Icon />
                  </div>
                  <h3 className="font-black text-slate-950">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {action.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                    Open <ArrowRightOutlined />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-950">
              Listing Health
            </h2>
            <BellOutlined className="text-xl text-slate-400" />
          </div>
          <div className="space-y-3">
            {listingHealth.map(([label, value, status]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold text-slate-800">{label}</p>
                  <p className="text-xs font-medium text-slate-500">{status}</p>
                </div>
                <p className="text-lg font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Recent Leads</h2>
            <p className="text-sm text-slate-500">
              Keep response time low to improve buyer trust.
            </p>
          </div>
          <ClockCircleOutlined className="text-xl text-slate-400" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {recentLeads.map((lead) => (
            <div
              key={`${lead.car}-${lead.time}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <p className="font-black text-slate-950">{lead.car}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {lead.buyer}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-sky-700 ring-1 ring-sky-100">
                  {lead.status}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {lead.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SellerBoardHome;
