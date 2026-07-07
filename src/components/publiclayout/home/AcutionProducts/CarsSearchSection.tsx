"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import {
  homeFilterMakers,
  homeFilterModelsByMaker,
} from "@/content/product.constant";

const years = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, index) => String(new Date().getFullYear() - index)
);

const statuses = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "reconditioned", label: "Reconditioned" },
  { value: "local-used", label: "Local Used" },
];

const CarsSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [maker, setMaker] = useState(searchParams.get("make") || "all");
  const [model, setModel] = useState(searchParams.get("model") || "all");
  const [year, setYear] = useState(searchParams.get("startYear") || "all");
  const [status, setStatus] = useState(searchParams.get("condition") || "all");
  const [referenceId, setReferenceId] = useState(searchParams.get("searchTerm") || "");

  const modelOptions = useMemo(() => {
    if (maker === "all") {
      return [
        { value: "all", label: "All Models" },
        ...Object.values(homeFilterModelsByMaker).flat(),
      ];
    }

    return [
      { value: "all", label: "All Models" },
      ...(homeFilterModelsByMaker[maker] || []),
    ];
  }, [maker]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    if (status === "all") params.delete("condition");
    else params.set("condition", status);

    const trimmedReferenceId = referenceId.trim();
    if (trimmedReferenceId) params.set("searchTerm", trimmedReferenceId);
    else params.delete("searchTerm");

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-slate-950">
      <Image
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
        alt="Car driving on an open road"
        fill
        priority
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/45" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 lg:py-14">
        <form
          onSubmit={handleSearch}
          className="rounded-lg border border-white/15 bg-white/95 p-5 shadow-2xl backdrop-blur md:p-6"
        >
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
              Search Inventory
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-950 md:text-4xl">
              Find Your Perfect Car
            </h1>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
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
              label="Model"
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

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase text-slate-700">
                Reference ID
              </span>
              <input
                value={referenceId}
                onChange={(event) => setReferenceId(event.target.value)}
                placeholder="e.g. CCBD-TOYPRI-123456"
                className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-6 text-sm font-bold text-white shadow-lg transition hover:bg-sky-600 lg:mt-auto"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

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
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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

export default CarsSearchSection;
