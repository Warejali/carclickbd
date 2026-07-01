const years = Array.from({ length: 20 }, (_, index) => new Date().getFullYear() - index);

const YearOfManufacturePage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Year of Manufacture
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
          Check cars by manufacture year
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Use the manufacture year as a quick way to understand model age,
          valuation, import planning, and inspection priority.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {years.map((year) => (
          <a
            key={year}
            href={`/cars?startYear=${year}&endYear=${year}`}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
          >
            <div className="text-2xl font-bold text-gray-950">{year}</div>
            <p className="mt-2 text-sm text-gray-600">View cars from {year}</p>
          </a>
        ))}
      </div>
    </main>
  );
};

export default YearOfManufacturePage;
