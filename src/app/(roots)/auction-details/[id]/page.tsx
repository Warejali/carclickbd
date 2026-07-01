"use client";

import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/Redux/api/productApi";
import Gallery from "@/components/product/Gallery";
import ProductSkeletonContainer from "@/components/product/skeleton/ProductSkeletonContainer";
import VehicleDetails from "../components/VehicleDetails";
import BidInformation from "../components/BidInformation";
import SaleInformation from "../components/SaleInformation";
import ProductsResult from "@/components/publiclayout/home/AcutionProducts/ProductsResult";
import { DetailProductItemParents } from "@/components/product/DetailProductItemParents";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useGetProductByIdQuery(`${id}`, {
    skip: !id,
    pollingInterval: 1000,
  });

  const product = data?.data;
  const title =
    product?.title ||
    [product?.launchingYear, product?.make, product?.model]
      .filter(Boolean)
      .join(" ");
  const location = [product?.location?.city, product?.location?.zipCode]
    .filter(Boolean)
    .join(", ");

  if (isLoading) return <ProductSkeletonContainer />;
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Product not found</h1>
        <p className="mt-2 text-slate-500">This vehicle is no longer available.</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
                {product?.isSoldOut ? "Reserved" : "Available"}
              </span>
              {product?.isFeatured && (
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-700 ring-1 ring-sky-200">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold tracking-normal text-slate-950 lg:text-4xl">
              {title}
            </h1>
            {location && (
              <p className="mt-2 text-sm font-medium text-slate-500">
                Located in {location}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <Gallery product={product} />
            <VehicleDetails product={product} />
            <DetailProductItemParents product={product} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <BidInformation product={product} />
            <SaleInformation product={product} />
          </aside>
        </div>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                More Options
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                Similar vehicles
              </h2>
            </div>
          </div>
          <ProductsResult
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            isPaginate={false}
            isShowAll={false}
            isWinner={false}
            isDraft={false}
          />
        </section>
      </section>
    </main>
  );
}
