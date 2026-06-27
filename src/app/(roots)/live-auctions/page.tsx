"use client";
import AuctionProducts from "@/components/product/AuctionProducts";

const LiveAuction = () => {
  return (
    <div className="container mx-auto">
      <AuctionProducts isShowAll={false} isPaginate={false} isDraft={false} isWinner={false} />
    </div>
  );
};

export default LiveAuction;
