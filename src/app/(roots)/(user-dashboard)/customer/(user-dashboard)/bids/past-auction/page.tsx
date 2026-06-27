"use client";
import BidsTable from "@/components/table/BidsTable";
import React from "react";

const PastAuctionBids: React.FC = () => {
  return <BidsTable statusLabel="Auction Ended" isLoading allProductsResponse/>;
};

export default PastAuctionBids;
