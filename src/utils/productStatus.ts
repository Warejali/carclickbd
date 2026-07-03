import { IProduct, ProductListingStatus } from "@/Interface/product";

export const productStatuses: ProductListingStatus[] = [
  "pending",
  "approval",
  "reserve",
  "under_negotiations",
  "sold",
];

export const productStatusMeta: Record<
  ProductListingStatus,
  { label: string; tagColor: string; badgeClass: string }
> = {
  pending: {
    label: "Pending",
    tagColor: "gold",
    badgeClass: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  approval: {
    label: "Approval",
    tagColor: "green",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  reserve: {
    label: "Reserve",
    tagColor: "orange",
    badgeClass: "bg-orange-50 text-orange-700 ring-orange-200",
  },
  under_negotiations: {
    label: "Under Negotiations",
    tagColor: "blue",
    badgeClass: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  sold: {
    label: "Sold",
    tagColor: "red",
    badgeClass: "bg-red-50 text-red-700 ring-red-200",
  },
};

export const normalizeProductStatus = (
  product?: Partial<IProduct>
): ProductListingStatus => {
  if (product?.status && productStatuses.includes(product.status)) {
    return product.status;
  }
  if (product?.isDraft) return "pending";
  if (product?.isSoldOut) return "reserve";
  return "approval";
};

export const getProductStatusMeta = (product?: Partial<IProduct>) =>
  productStatusMeta[normalizeProductStatus(product)];
