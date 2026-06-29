"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CarFront,
  Cog,
  Fuel,
  Gauge,
  Palette,
  Search,
  Star,
} from "lucide-react";

type CarStatus = "Available" | "Reserved";

type CarListing = {
  id: string;
  cmId: string;
  brand: string;
  model: string;
  title: string;
  year: number;
  status: CarStatus;
  image: string;
  mileage: string;
  engine: string;
  fuel: string;
  transmission: string;
  color: string;
  grade: string;
  price: number;
};

const cars: CarListing[] = [
  {
    id: "prius-2023",
    cmId: "CM00373",
    brand: "Toyota",
    model: "Prius",
    title: "Toyota Prius 2023",
    year: 2023,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
    mileage: "19,000 km",
    engine: "1800 cc",
    fuel: "Hybrid",
    transmission: "eCVT",
    color: "Pearl",
    grade: "R",
    price: 3800000,
  },
  {
    id: "fit-2021",
    cmId: "CM00372",
    brand: "Honda",
    model: "Fit e:HEV",
    title: "Honda Fit e:HEV 2021",
    year: 2021,
    status: "Reserved",
    image:
      "https://images.unsplash.com/photo-1621993202323-f438eec93470?q=80&w=1200&auto=format&fit=crop",
    mileage: "29,000 km",
    engine: "1500 cc",
    fuel: "Hybrid",
    transmission: "eCVT",
    color: "Metallic Gray",
    grade: "4",
    price: 2699000,
  },
  {
    id: "corolla-cross-2022",
    cmId: "CM00371",
    brand: "Toyota",
    model: "Corolla Cross",
    title: "Toyota Corolla Cross 2022",
    year: 2022,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200&auto=format&fit=crop",
    mileage: "31,000 km",
    engine: "1800 cc",
    fuel: "Hybrid",
    transmission: "AT",
    color: "Pearl",
    grade: "R",
    price: 3950000,
  },
  {
    id: "crv-2021",
    cmId: "CM00370",
    brand: "Honda",
    model: "CR-V",
    title: "Honda CR-V 2021",
    year: 2021,
    status: "Reserved",
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200&auto=format&fit=crop",
    mileage: "28,000 km",
    engine: "2000 cc",
    fuel: "Hybrid",
    transmission: "eCVT",
    color: "Black",
    grade: "4.5",
    price: 5700000,
  },
  {
    id: "corolla-cross-2026",
    cmId: "CM00369",
    brand: "Toyota",
    model: "Corolla Cross",
    title: "Toyota Corolla Cross 2026",
    year: 2026,
    status: "Reserved",
    image:
      "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=1200&auto=format&fit=crop",
    mileage: "0 km",
    engine: "1800 cc",
    fuel: "Hybrid",
    transmission: "eCVT",
    color: "Beige Metallic",
    grade: "S",
    price: 5760000,
  },
  {
    id: "crv-2022",
    cmId: "CM00368",
    brand: "Honda",
    model: "CR-V",
    title: "Honda CR-V 2022",
    year: 2022,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3eb?q=80&w=1200&auto=format&fit=crop",
    mileage: "35,000 km",
    engine: "2000 cc",
    fuel: "Hybrid",
    transmission: "eCVT",
    color: "Pearl",
    grade: "R",
    price: 5450000,
  },
];

const brands = ["All Brands", ...Array.from(new Set(cars.map((car) => car.brand)))];
const models = ["All Models", ...Array.from(new Set(cars.map((car) => car.model)))];
const years = ["All Years", ...Array.from(new Set(cars.map((car) => String(car.year))))];
const statuses = ["All Status", "Available", "Reserved"];

const FindCarsPage = () => {
  const [brand, setBrand] = useState("All Brands");
  const [model, setModel] = useState("All Models");
  const [year, setYear] = useState("All Years");
  const [status, setStatus] = useState("All Status");
  const [cmId, setCmId] = useState("");
  const [submittedCmId, setSubmittedCmId] = useState("");

  const filteredCars = useMemo(() => {
    const query = submittedCmId.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesBrand = brand === "All Brands" || car.brand === brand;
      const matchesModel = model === "All Models" || car.model === model;
      const matchesYear = year === "All Years" || String(car.year) === year;
      const matchesStatus = status === "All Status" || car.status === status;
      const matchesCmId = !query || car.cmId.toLowerCase().includes(query);

      return (
        matchesBrand &&
        matchesModel &&
        matchesYear &&
        matchesStatus &&
        matchesCmId
      );
    });
  }, [brand, model, submittedCmId, status, year]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedCmId(cmId);
  };

  return (
    <main className="bg-[#f4f7fb] pb-14">
      <section className="relative min-h-[340px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
          alt="Car driving on an open road"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/50" />

        <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-center px-4 py-10 md:px-8">
          <form
            onSubmit={handleSearch}
            className="w-full rounded-2xl border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur md:p-7"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
              Find Your Perfect Car
            </h1>
            <p className="mt-2 text-sm font-medium text-emerald-700 md:text-base">
              Browse our inventory of Japanese reconditioned cars and filter by
              brand, model, year, status, or CM ID.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
              <FilterSelect
                label="Brand"
                value={brand}
                options={brands}
                onChange={setBrand}
              />
              <FilterSelect
                label="Model"
                value={model}
                options={models}
                onChange={setModel}
              />
              <FilterSelect
                label="Year"
                value={year}
                options={years}
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
                  CM ID
                </span>
                <input
                  value={cmId}
                  onChange={(event) => setCmId(event.target.value)}
                  placeholder="e.g. CM-00123"
                  className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#cf372d] px-6 text-sm font-bold text-white shadow-lg transition hover:bg-[#b92d25] lg:mt-auto"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-950">
                {filteredCars.length}
              </span>{" "}
              of {cars.length} cars
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Japanese Reconditioned Inventory
            </h2>
          </div>
          <Link
            href="/verify-auction-sheet"
            className="text-sm font-bold text-[#cf372d] hover:underline"
          >
            Verify auction sheet before buying
          </Link>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-xl font-bold text-slate-950">No cars found</h3>
            <p className="mt-2 text-slate-600">
              Try changing the filters or clearing the CM ID field.
            </p>
          </div>
        )}
      </section>
    </main>
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
  options: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

const CarCard = ({ car }: { car: CarListing }) => {
  const statusClass =
    car.status === "Available"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]">
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={car.image}
          alt={car.title}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />
        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-1 text-xs font-black uppercase ${statusClass}`}
        >
          {car.status}
        </span>
        <span className="absolute bottom-4 left-4 rounded-md bg-slate-950/85 px-3 py-1 text-xs font-black text-white">
          {car.cmId}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black uppercase tracking-tight text-slate-950">
          {car.title}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-slate-700">
          <Spec icon={Gauge} text={car.mileage} />
          <Spec icon={Cog} text={car.engine} />
          <Spec icon={Fuel} text={car.fuel} />
          <Spec icon={CarFront} text={car.transmission} />
          <Spec icon={Palette} text={car.color} />
          <Spec icon={Star} text={car.grade} />
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Price</p>
            <p className="text-xl font-black text-[#d73328]">
              {car.price.toLocaleString("en-IN")}
            </p>
          </div>
          <Link
            href={`/car-details/${car.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-[#cf372d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#b92d25]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

const Spec = ({
  icon: Icon,
  text,
}: {
  icon: typeof CalendarDays;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="shrink-0 text-slate-400" />
      <span className="truncate uppercase">{text}</span>
    </div>
  );
};

export default FindCarsPage;
