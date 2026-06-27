"use client";

import ProductCard from "@/components/publiclayout/home/AcutionProducts/ProductCard";
import { IProduct } from "@/Interface/product";
import { useGetUserWatchListQuery } from "@/Redux/features/watch-list/watchlistApi";
import CardSkeleton from "@/shared/skeleton/CardSkeleton";
import NoDatafound from "@/shared/ui/NoDatafound";
import Container from "@/shared/wrapper/Container";

const WatchList = () => {
  const { data, isLoading } = useGetUserWatchListQuery([]);
  const products = data?.data || [];
  const watchlistProducts = products?.map(
    (singleProduct: any) => singleProduct?.product,
  );

  return (
    <Container>
      <h2 className="text-3xl font-bold mt-11 mb-4">Watch List</h2>
      <div>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <>
            {watchlistProducts?.length === 0 && <NoDatafound />}
            <div
              className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 mt-6 gap-4`}
            >
              {watchlistProducts?.map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default WatchList;
