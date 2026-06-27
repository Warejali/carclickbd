"use client";
import { productBodyStyle } from "@/content/product.constant";
import { updateSearchParams } from "@/helpers/filter/updateSearchParams";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const BodyStyleFilter = () => {
  const router = useRouter();
  const handleChange = (value: string) => {
    if (value == "all") {
      router.push("/");
      return;
    }

    updateSearchParams({ bodyStyle: value });
  };
  return (
    <div>
      <Select
        placeholder={<span className="text-gray-800 text-md">Body Style</span>}
        // defaultValue="all"
        style={{ width: 150 }}
        onChange={handleChange}
        options={productBodyStyle}
      />
    </div>
  );
};

export default BodyStyleFilter;
