"use client";

const getValue = (...values: any[]) =>
  values.find((value) => value !== undefined && value !== null && value !== "") ||
  "N/A";

export default function VehicleDetails({ product }: { product: any }) {
  const specs = [
    ["Maker", getValue(product?.maker, product?.make)],
    ["Model", product?.model],
    ["Grade", product?.grade],
    ["Year", getValue(product?.year, product?.launchingYear)],
    ["Production Year", product?.registrationYear],
    ["Mileage", product?.mileage ? `${product.mileage} km` : undefined],
    ["Engine Size", getValue(product?.engineSize, product?.engine)],
    ["Fuel Type", getValue(product?.fuelType, product?.fuel)],
    ["Transmission", product?.transmission],
    ["Drive Type", getValue(product?.driveType, product?.drivetrain, product?.drive)],
    ["Body Type", getValue(product?.bodyType, product?.bodyStyle)],
    ["Color", getValue(product?.color, product?.exteriorColor)],
    ["Chassis Number", getValue(product?.vinChassisNumber, product?.vin)],
    ["Auction Grade", product?.auctionGrade],
    ["Condition", getValue(product?.condition, product?.titleStatus)],
    [
      "Location",
      [product?.location?.city, product?.location?.zipCode].filter(Boolean).join(", "),
    ],
  ].filter(([, value]) => value && value !== "N/A");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
            Specification
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
            Vehicle details
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
