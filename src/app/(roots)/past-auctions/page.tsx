"use client";
import React from "react";
import AuctionProducts from "@/components/product/AuctionProducts";

const PastAuction = () => {
  return (
    <div className="container mx-auto">
          <AuctionProducts isShowAll={false} isPaginate={false} isWinner={true} />
    </div>
  );
};

export default PastAuction;
