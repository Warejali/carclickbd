"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface CarFiltersProps {
  isWinner: boolean;
}

export default function CarFilters({ isWinner }: CarFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allFilters = {
    winnerFilters: [
      { label: "Recent ended", value: "RecentEnded" },
      { label: "Lowest mileage", value: "lowestMileage" },
      { label: "Highest mileage", value: "highestMileage" },
      { label: "Lowest price", value: "LowestPrice" },
      { label: "Highest price", value: "HighestPrice" },
    ],
    nonWinnerFilters: [
      { label: "Ending soon", value: "ending" },
      { label: "Newly listed", value: "listed" },
      { label: "Lowest mileage", value: "lowestMileage" },
      { label: "Highest mileage", value: "highestMileage" },
    ],
  };

  // Select filters based on isWinner condition
  const filters = isWinner ? allFilters.winnerFilters : allFilters.nonWinnerFilters;

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", value);
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 lg:gap-6 w-full">
        <div className="flex flex-wrap gap-2 lg:gap-4 items-center"></div>
      </div>

      <div className="w-full flex flex-wrap gap-3 md:justify-end pl-2">
        {filters.map((filter) => (
          <div
            key={filter.value}
            onClick={() => handleSortChange(filter.value)}
            className="cursor-pointer"
          >
            <p className="pb-2 text-sm transition-colors hover:text-primary text-gray-500 w-full">
              {filter.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
