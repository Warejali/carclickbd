"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/Redux/api/productApi";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Gallery from "@/components/product/Gallery";
import ProductSkeletonContainer from "@/components/product/skeleton/ProductSkeletonContainer";
import moment from "moment";
import VehicleDetails from "../components/VehicleDetails";
import BidInformation from "../components/BidInformation";
import SaleInformation from "../components/SaleInformation";
import ShippingEstimate from "../components/ShippingEstimate";
import ReportsAndServices from "../components/ReportsAndServices";
import Alerts from "../components/Alerts";
import ProductsResult from "@/components/publiclayout/home/AcutionProducts/ProductsResult";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [zip, setZip] = useState("");
  const [progress, setProgress] = useState(0);
  const [shippingType, setShippingType] = useState<
    "domestic" | "international"
  >("domestic");

  const { data, isLoading } = useGetProductByIdQuery(`${id}`, {
    skip: !id,
    pollingInterval: 1000,
  });

  const product = data?.data;

  // Calculate auction time progress
  const endBid = product?.endBid ? moment(product.endBid) : null;
  const startBid = product?.startBid ? moment(product.startBid) : null;
  const startTime = startBid ?? moment().subtract(1, "day");
  const endTime = endBid ?? moment();
  const totalDuration = endTime.diff(startTime, "seconds");

  useEffect(() => {
    if (!product || !endBid) return;
    const interval = setInterval(() => {
      const now = moment();
      const remaining = endTime.diff(now, "seconds");
      const percent = Math.max(
        0,
        Math.min(100, ((totalDuration - remaining) / totalDuration) * 100)
      );
      setProgress(percent);
    }, 1000);
    return () => clearInterval(interval);
  }, [product, endBid, endTime, totalDuration]);

  const timeLeft = endBid ? endBid.fromNow(true) : "";

  if (isLoading) return <ProductSkeletonContainer />;
  if (!product)
    return <div className="text-center mt-20">Product not found.</div>;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Title / Watchlist */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <Button type="link">Add to watchlist</Button>
      </div>

      {/* Top Section – 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Gallery */}
        <div>
          <Gallery product={product} />
        </div>

        {/* Middle: Vehicle details */}
        <VehicleDetails product={product} />

        {/* Right: Bid & Sale info */}
        <div className="space-y-6">
          <BidInformation product={product} />
          <SaleInformation product={product} />
        </div>
      </div>

      {/* Lower Full-width Cards */}
      <div className="mt-6 space-y-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ShippingEstimate
          zip={zip}
          setZip={setZip}
          shippingType={shippingType}
          setShippingType={setShippingType}
        />
        <ReportsAndServices />
        <Alerts />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">View similar vehicles</h2>
        <ProductsResult
          className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          isPaginate={true}
          isShowAll={false}
          isWinner={false}
          isDraft={false}
        />
      </div>
    </div>
  );
}
