"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface GalleryProps {
  product: {
    title: string;
    photos: {
      mainPhoto: string;
      exterior?: string[];
      interior?: string[];
      others?: string[];
      mechanical?: string[];
      docs?: string[];
    };
  };
}

export default function Gallery({ product }: GalleryProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  // ✅ Normalize all photos into a single array
  const allPhotos: string[] = [
    product.photos.mainPhoto,
    ...(product.photos.exterior || []),
    ...(product.photos.interior || []),
    ...(product.photos.others || []),
    ...(product.photos.mechanical || []),
    ...(product.photos.docs || []),
  ].filter(Boolean);

  return (
    <div className="w-full">
      {isMobile ? (
        <MobileGallery photos={allPhotos} title={product.title} />
      ) : (
        <DesktopGallery photos={allPhotos} title={product.title} />
      )}
    </div>
  );
}

function DesktopGallery({ photos, title }: { photos: string[]; title: string }) {
  const [activePhoto, setActivePhoto] = useState(photos[0]);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative w-full h-[420px] rounded-lg overflow-hidden border">
        <Image
          src={activePhoto}
          alt={`${title} - Main`}
          fill
          className="object-cover"
          priority
        />

        {/* Prev/Next arrows */}
        <button
          onClick={() =>
            setActivePhoto(
              photos[(photos.indexOf(activePhoto) - 1 + photos.length) % photos.length]
            )
          }
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={() =>
            setActivePhoto(photos[(photos.indexOf(activePhoto) + 1) % photos.length])
          }
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow hover:bg-white"
        >
          ›
        </button>

        {/* Top-right buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="bg-white px-3 py-1 rounded shadow text-sm">
            Add to watchlist
          </button>
        </div>

        {/* Bottom-left overlays */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <span className="bg-white px-1 text-xs rounded shadow">✔</span>
          <span className="bg-white px-1 text-xs rounded shadow">HD</span>
        </div>

        {/* Bottom-right */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button className="bg-white px-2 py-1 text-sm rounded shadow">⬇</button>
          <button className="bg-white px-3 py-1 text-sm rounded shadow">
            See all {photos.length} Photos
          </button>
        </div>
      </div>

      {/* Thumbnail row */}
      <div className="flex gap-2 overflow-x-auto">
        {photos.map((photo, idx) => {
          const isActive = activePhoto === photo;
          return (
            <div
              key={idx}
              onClick={() => setActivePhoto(photo)}
              className={`relative h-20 w-28 cursor-pointer rounded border ${
                isActive ? "ring-2 ring-blue-500" : "hover:opacity-80"
              }`}
            >
              <Image
                src={photo}
                alt={`Thumb ${idx + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileGallery({ photos, title }: { photos: string[]; title: string }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={12}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="rounded-lg border"
    >
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-72">
            <Image
              src={photo}
              alt={`${title} - ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
