import React from "react";
import TransmissionFilter from "./TransmissionFilter";
import BodyStyleFilter from "./BodyStyleFilter";
import YearRangeSelectFilter from "./YearRangeSelectFilter";
import CarFilters from "./CarFilters";
import RefreshFilter from "./RefreshFilter";

const ProductFilterOptions = ({
  baseUrl,
  isWinner,
}: {
  baseUrl?: string;
  isWinner?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6 mt-8 bg-white w-full px-4">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
        {/* Header */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-600">
          Auctions
        </h3>

        {/* Filters */}
        <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-center lg:justify-between">
          {/* Left filters */}
          <div className="flex flex-wrap gap-3">
            <TransmissionFilter />
            <BodyStyleFilter />
            <YearRangeSelectFilter />
            <RefreshFilter baseUrl={baseUrl} />
          </div>

          {/* Right filter */}
          <div className="w-full lg:w-1/2">
            <CarFilters isWinner={isWinner ?? false} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFilterOptions;
