"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  { label: "Newly listed", value: "listed" },
  { label: "Lowest mileage", value: "lowestMileage" },
  { label: "Highest mileage", value: "highestMileage" },
];

export default function CarFilters(_props: { isWinner?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") || "";

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", value);
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
          Sort listings
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Choose how cars should appear on this page.
        </p>
      </div>

      <div className="flex w-full flex-wrap gap-2 md:w-auto md:justify-end">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter.value}
            onClick={() => handleSortChange(filter.value)}
            className={`h-10 rounded-md border px-4 text-sm font-bold transition ${
              activeSort === filter.value
                ? "border-[#e50914] bg-[#e50914] text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
