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
    <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6 bg-white px-4 md:px-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
     

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
