"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Card, Typography, Skeleton, Tag } from "antd";
import { setSelectedProduct } from "@/Redux/Slices/productSlice";
import { IProduct } from "@/Interface/product";
import CustomButton from "@/components/shared/CustomButton";

const { Text } = Typography;

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const price = product.mainPrice || product.highestBid || product.minBid || 0;
  const sellerType =
    product.sellerType?.toLowerCase() === "private" ? "Private Seller" : "Dealer";

  const handleClick = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      cover={
        <div style={{ position: "relative" }} className="overflow-hidden group">
          {/* Labels */}
          {product.isSoldOut && (
            <Tag
              color="red"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 3,
                fontWeight: "bold",
                borderRadius: "6px",
              }}
            >
              Sold Out
            </Tag>
          )}

          {product.isFeatured && (
            <Tag
              color="gold"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 3,
                fontWeight: "bold",
                borderRadius: "6px",
              }}
            >
              Featured
            </Tag>
          )}

          <Tag
            color="blue"
            style={{
              position: "absolute",
              top: product.isSoldOut ? 44 : 12,
              left: 12,
              zIndex: 3,
              fontWeight: "bold",
              borderRadius: "6px",
            }}
          >
            {sellerType}
          </Tag>

          {/* Product Image with hover zoom */}
          <div className="overflow-hidden relative">
            <Image
              src={product.photos.mainPhoto}
              alt={product.title}
              width={500}
              height={300}
              priority
              style={{
                objectFit: "cover",
                height: "220px",
                width: "100%",
              }}
              className="rounded-t-xl transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-white/95 backdrop-blur-sm px-4 py-2 border-t z-10">
            <p className="text-gray-700 font-medium drop-shadow-sm">
              {product.mileage} Miles
            </p>
            <Text strong className="text-green-700 drop-shadow-sm">
              Price: ${price?.toLocaleString()}
            </Text>
          </div>
        </div>
      }
    >
      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">
          {`${product?.location?.city}, ${product?.location?.zipCode}`}
        </p>

        {/* View Details Button */}
        <div className="pt-2">
          <Link href={`/car-details/${product._id}`} passHref>
            <CustomButton label="View Details" variant="primary" className="w-full" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

const SkeletonComponent = () => (
  <Card
    hoverable
    className="rounded-xl shadow-md"
    cover={<Skeleton.Image active style={{ height: 220, borderRadius: "8px" }} />}
  >
    <Skeleton active />
  </Card>
);

ProductCard.Skeleton = SkeletonComponent;

export default ProductCard;
