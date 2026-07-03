"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight, BadgeCheck, FileSearch, Search, ShieldCheck } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Verified dealer and private seller cars",
    title: "Dealer & Private Seller Cars",
    description:
      "Browse new, reconditioned, and local used cars with clear photos, specs, pricing, and direct inquiry support.",
    image: "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png",
    imageAlt: "Yellow sports car",
    primaryLabel: "Browse Cars",
    primaryHref: "/cars",
    secondaryLabel: "Learn More",
    secondaryHref: "/how-it-works",
  },
  {
    eyebrow: "Inspection confidence",
    title: "Auction Sheet Verification",
    description:
      "Check chassis details, mileage records, grade, and condition notes before making a buying decision.",
    image: "https://www.pngmart.com/files/23/Luxury-Car-PNG-Picture.png",
    imageAlt: "Luxury car",
    primaryLabel: "Verify Sheet",
    primaryHref: "/verify-auction-sheet",
    secondaryLabel: "Browse Reconditioned",
    secondaryHref: "/cars?condition=reconditioned",
  },
  {
    eyebrow: "Premium buying support",
    title: "Shortlist Better Cars Faster",
    description:
      "Use smart filters, compare key details, and contact sellers directly when you find the right car.",
    image:
      "https://www.pngall.com/wp-content/uploads/2016/07/Car-PNG-Clipart.png",
    imageAlt: "Premium cars",
    primaryLabel: "Find Cars",
    primaryHref: "/cars",
    secondaryLabel: "Contact Support",
    secondaryHref: "/contact",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-auto overflow-hidden bg-slate-950 lg:h-[430px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative min-h-[430px] overflow-hidden bg-gradient-to-br from-[#001b46] via-[#003399] to-[#00142f] text-white lg:h-[430px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_48%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.22),transparent)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

              <div className="relative mx-auto grid min-h-[430px] max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-0">
                <div className="z-20">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
                    {slide.primaryHref.includes("verify") ? (
                      <FileSearch size={16} className="text-[#f0b90b]" />
                    ) : (
                      <BadgeCheck size={16} className="text-[#f0b90b]" />
                    )}
                    {slide.eyebrow}
                  </div>

                  <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-normal md:text-4xl">
                    {slide.title}
                  </h1>
                  <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-200 md:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={slide.primaryHref}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#f0b90b] px-5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-[#d9a609]"
                    >
                      {slide.primaryLabel}
                      <ArrowRight size={17} />
                    </Link>
                    <Link
                      href={slide.secondaryHref}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                    >
                      {slide.secondaryLabel}
                    </Link>
                  </div>

                  <div className="mt-5 hidden max-w-xl grid-cols-3 gap-2 sm:grid">
                    {[
                      ["Verified", ShieldCheck],
                      ["Search", Search],
                      ["Support", BadgeCheck],
                    ].map(([label, Icon]) => {
                      const DisplayIcon = Icon as typeof ShieldCheck;
                      return (
                        <div
                          key={label as string}
                          className="flex h-11 items-center gap-2.5 rounded-md border border-white/10 bg-white/10 px-3 backdrop-blur"
                        >
                          <DisplayIcon
                            size={17}
                            className="shrink-0 text-[#f0b90b]"
                          />
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-200">
                            {label as string}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 flex min-h-[230px] items-center justify-center lg:min-h-[350px]">
                  <div className="relative h-[230px] w-full sm:h-[280px] lg:h-[350px]">
                    <div className="absolute inset-x-8 bottom-10 h-16 rounded-full bg-black/30 blur-3xl" />
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 760px"
                      className="object-contain object-center drop-shadow-[0_24px_45px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
