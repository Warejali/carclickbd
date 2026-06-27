import AuctionProducts from "@/components/product/AuctionProducts";

const FeaturedAuctions = () => {
  return (
    <div className="container mx-auto">
      <AuctionProducts isShowAll={false} isPaginate={false} isFeatured={true} />
    </div>
  );
};

export default FeaturedAuctions;
