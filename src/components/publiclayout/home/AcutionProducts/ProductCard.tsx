"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Skeleton, Tooltip, message } from "antd";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Gauge,
  Heart,
  MapPin,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { setSelectedProduct } from "@/Redux/Slices/productSlice";
import { IProduct } from "@/Interface/product";
import { getProductStatusMeta } from "@/utils/productStatus";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { toggleAuthModal } from "@/Redux/Slices/authSlice";
import { useAddToWatchListMutation } from "@/Redux/features/watch-list/watchlistApi";

const formatPrice = (value: number | string) => {
  const numericValue = Number(value || 0);
  if (!numericValue) return "Contact for final price & Availability";

  return `BDT ${numericValue.toLocaleString("en-US")}/-`;
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [addToWatchList, { isLoading: isWishlistLoading }] =
    useAddToWatchListMutation();
  const [isWishlisted, setIsWishlisted] = useState(
    Boolean((product as any).isWatchlisted || (product as any).isWishlisted)
  );
  const price = product.mainPrice || product.highestBid || product.minBid || 0;
  const hasPrice = Boolean(Number(price || 0));
  const statusMeta = getProductStatusMeta(product);
  const location = [product?.location?.city, product?.location?.zipCode]
    .filter(Boolean)
    .join(", ");

  const specs = [
    {
      icon: CalendarDays,
      label: product.productionYear || product.launchingYear || "Year N/A",
    },
    {
      icon: Settings,
      label: product.engine || "Engine N/A",
    },
    {
      icon: Gauge,
      label: product.mileage ? `${product.mileage} km` : "Mileage N/A",
    },
  ];

  const handleClick = () => {
    dispatch(setSelectedProduct(product));
    router.push(`/car-details/${product._id}`);
  };

  useEffect(() => {
    setIsWishlisted(
      Boolean((product as any).isWatchlisted || (product as any).isWishlisted)
    );
  }, [product]);

  const handleWishlistClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) {
      dispatch(toggleAuthModal());
      return;
    }

    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      await addToWatchList({ product: product._id }).unwrap();
      message.success(nextState ? "Added to wishlist" : "Removed from wishlist");
    } catch (error) {
      setIsWishlisted(!nextState);
      message.error("Failed to update wishlist");
    }
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      bodyStyle={{ padding: 0 }}
      className="group overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] active:scale-[0.985]"
      cover={
        <div className="relative h-[230px] overflow-hidden bg-slate-100">
          <Image
            src={product.photos?.mainPhoto || "/placeholder.png"}
            alt={product.title || "Vehicle"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-90" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${statusMeta.badgeClass}`}
              style={statusMeta.badgeStyle}
            >
              <BadgeCheck size={13} />
              {statusMeta.label}
            </span>
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sky-700 ring-1 ring-sky-200">
                <ShieldCheck size={13} />
                Featured
              </span>
            )}
          </div>

          <Tooltip title="Wishlist" placement="left">
            <button
              type="button"
              onClick={handleWishlistClick}
              disabled={isWishlistLoading}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                isWishlisted
                  ? "border-rose-200/80 bg-rose-500 text-white shadow-rose-950/20"
                  : "border-white/70 bg-white/85 text-slate-700 hover:border-rose-200 hover:bg-white hover:text-rose-500"
              }`}
            >
              <Heart size={13} strokeWidth={2.5} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </Tooltip>

        </div>
      }
    >
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-2">
          {specs.map(({ icon: Icon, label }) => (
            <div
              key={String(label)}
              className="flex min-h-[54px] flex-col items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 text-center"
            >
              <Icon size={15} className="mb-1 text-slate-500" />
              <span className="line-clamp-1 text-[11px] font-medium text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Price
              </p>
              <p
                className={`mt-0.5 font-semibold leading-snug text-slate-950 ${
                  hasPrice ? "text-lg" : "text-[13px]"
                }`}
              >
                {formatPrice(price)}
              </p>
            </div>
            {location && (
              <div className="max-w-[42%] rounded-md bg-slate-50 px-2.5 py-2 text-right">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Location
                </p>
                <p className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-slate-700">
                  <MapPin size={13} className="shrink-0 text-sky-600" />
                  <span className="line-clamp-1">{location}</span>
                </p>
              </div>
            )}
          </div>

          <Link
            href={`/car-details/${product._id}`}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition-colors hover:bg-sky-600"
            aria-label={`View details for ${product.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            View Details
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </Card>
  );
};

const SkeletonComponent = () => (
  <Card
    className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.10)]"
    bodyStyle={{ padding: 16 }}
    cover={<Skeleton.Image active style={{ height: 230, width: "100%" }} />}
  >
    <Skeleton active paragraph={{ rows: 3 }} />
  </Card>
);

ProductCard.Skeleton = SkeletonComponent;

export default ProductCard;
