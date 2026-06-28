"use client";
import AuctionProducts from "@/components/product/AuctionProducts";

const CarsPage = () => {
  return (
    <div className="container mx-auto">
      <AuctionProducts isShowAll isPaginate isDraft={false} />
    </div>
  );
};

export default CarsPage;
