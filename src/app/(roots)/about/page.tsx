import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
        About CarClickBD
      </p>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-950">
        A clearer marketplace for buying and selling cars.
      </h1>
      <p className="mt-5 text-base font-medium leading-8 text-slate-600">
        CarClickBD helps buyers browse verified vehicle listings, compare key
        details, request auction sheet verification, and contact sellers with
        confidence. Sellers can list vehicles with photos, pricing, and the
        information buyers need to make better decisions.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Verified Listings", "Cleaner vehicle information and photos."],
          ["Buyer Support", "Inquiry and WhatsApp support for shortlisted cars."],
          ["Auction Sheet Help", "Mileage, grade, and condition review support."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-extrabold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        ))}
      </div>
      <Link
        href="/cars"
        className="mt-8 inline-flex rounded-md bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-sky-600"
      >
        Browse Cars
      </Link>
    </main>
  );
};

export default AboutPage;
