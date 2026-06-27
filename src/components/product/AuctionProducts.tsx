"use client";
import React from "react";
import Container from "@/shared/wrapper/Container";
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
  return (
    <div className="lg:my-6 lg:px-6">

      <ProductFilterOptions baseUrl={isPaginate ? "/" : "/products"} />
        <ProductsResult
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          isPaginate={isPaginate}
          isShowAll={isShowAll}
          isWinner={isWinner}
          isDraft={isDraft}
          isFeatured={isFeatured}
        />
    </div>
  );
};

export default AuctionProducts;