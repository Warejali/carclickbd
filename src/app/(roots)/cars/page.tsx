"use client";
import AuctionProducts from "@/components/product/AuctionProducts";
import CarsSearchSection from "@/components/publiclayout/home/AcutionProducts/CarsSearchSection";

const CarsPage = () => {
  return (
    <main className="bg-slate-50 pb-12">
      <CarsSearchSection />
      <div className="container mx-auto">
        <AuctionProducts isShowAll isPaginate isDraft={false} />
      </div>
    </main>
  );
};

export default CarsPage;
