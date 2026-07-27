"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  homeFilterMakers,
  homeFilterModelsByMaker,
} from "@/content/product.constant";

const sortFilters = [
  { label: "Newly listed", value: "listed" },
  { label: "Lowest mileage", value: "lowestMileage" },
  { label: "Highest mileage", value: "highestMileage" },
];

const years = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, index) => String(new Date().getFullYear() - index),
);

const statuses = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "upcoming", label: "Upcoming" },
  { value: "approval", label: "Available" },
  { value: "reserve", label: "Reserve" },
  { value: "under_negotiations", label: "Under Negotiation" },
  { value: "sold", label: "Sold" },
];

const conditions = [
  { value: "all", label: "All Conditions" },
  { value: "new", label: "New" },
  { value: "reconditioned", label: "Reconditioned" },
  { value: "local-used", label: "Local Used" },
  { value: "pre-owned", label: "Pre Owned" },
  { value: "used", label: "Used" },
];

export default function CarFilters(_props: { isWinner?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") || "";
  const [maker, setMaker] = useState(searchParams.get("make") || "all");
  const [model, setModel] = useState(searchParams.get("model") || "all");
  const [year, setYear] = useState(searchParams.get("startYear") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [condition, setCondition] = useState(
    searchParams.get("condition") || "all",
  );

  const modelOptions = useMemo(() => {
    if (maker === "all") {
      return [
        { value: "all", label: "All Car Names" },
        ...Object.values(homeFilterModelsByMaker).flat(),
      ];
    }

    return [
      { value: "all", label: "All Car Names" },
      ...(homeFilterModelsByMaker[maker] || []),
    ];
  }, [maker]);

  const updateParams = (params: URLSearchParams) => {
    router.push(`/cars?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", value);
    updateParams(newSearchParams);
  };

  const handleFilterApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (maker === "all") params.delete("make");
    else params.set("make", maker);

    if (model === "all") params.delete("model");
    else params.set("model", model);

    if (year === "all") {
      params.delete("startYear");
      params.delete("endYear");
    } else {
      params.set("startYear", year);
      params.set("endYear", year);
    }

    if (status === "all") params.delete("status");
    else params.set("status", status);

    if (condition === "all") params.delete("condition");
    else params.set("condition", condition);

    updateParams(params);
  };

  const handleReset = () => {
    setMaker("all");
    setModel("all");
    setYear("all");
    setStatus("all");
    setCondition("all");
    router.push("/cars");
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-[1500px] rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm md:px-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.75fr_1fr_1fr_auto_auto_auto_auto_auto]">
        <FilterSelect
          label="Maker"
          value={maker}
          options={homeFilterMakers}
          onChange={(value) => {
            setMaker(value);
            setModel("all");
          }}
        />
        <FilterSelect
          label="Car Name"
          value={model}
          options={modelOptions}
          onChange={setModel}
        />
        <FilterSelect
          label="Year"
          value={year}
          options={[
            { value: "all", label: "All Years" },
            ...years.map((item) => ({ value: item, label: item })),
          ]}
          onChange={setYear}
        />
        <FilterSelect
          label="Status"
          value={status}
          options={statuses}
          onChange={setStatus}
        />
        <FilterSelect
          label="Condition"
          value={condition}
          options={conditions}
          onChange={setCondition}
        />

        {sortFilters.map((filter) => (
          <div key={filter.value} className="flex items-end">
            <button
              type="button"
              onClick={() => handleSortChange(filter.value)}
              className={`h-10 w-full whitespace-nowrap rounded-md border px-4 text-sm font-bold transition xl:w-auto ${
                activeSort === filter.value
                  ? "border-[#e50914] bg-[#e50914] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {filter.label}
            </button>
          </div>
        ))}

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleFilterApply}
            className="h-10 w-full rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-sky-600 lg:w-auto"
          >
            Apply
          </button>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleReset}
            className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-600 transition hover:bg-white lg:w-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) => {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] font-bold uppercase text-slate-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
