"use client";
import React from "react";
import Link from "next/link";
import ProductFilterOptions from "@/components/publiclayout/home/AcutionProducts/ProductFilterOptions";
import ProductsResult from "@/components/publiclayout/home/AcutionProducts/ProductsResult";
import { AuctionProductsProps } from "@/types/products.types";


const AuctionProducts = ({
  isPaginate = true,
  isShowAll,
  isWinner, 
  isDraft,
  isFeatured
}:AuctionProductsProps) => {
  const isHomePreview = !isPaginate;

  return (
    <section
      className={
        isHomePreview
          ? "bg-white py-14 md:py-16"
          : "lg:my-6 lg:px-6"
      }
    >
      {isHomePreview ? (
        <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 md:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
              Featured Inventory
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-950 md:text-4xl">
              Fresh cars worth a closer look
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              A cleaner preview of verified listings with photos, specs, price,
              and direct detail pages.
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-950 px-5 text-sm font-bold text-slate-950 transition hover:border-sky-600 hover:text-sky-600"
          >
            View All Cars
          </Link>
        </div>
      ) : (
        <ProductFilterOptions baseUrl="/" />
      )}
      <div className={isHomePreview ? "mx-auto max-w-7xl px-4 md:px-8" : ""}>
        <ProductsResult
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          isPaginate={isPaginate}
          isShowAll={isShowAll}
          isWinner={isWinner}
          isDraft={isDraft}
          isFeatured={isFeatured}
        />
      </div>
    </section>
  );
};

export default AuctionProducts;
