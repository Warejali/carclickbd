"use client";

import { filterProductTransmission } from "@/content/product.constant";
import { updateSearchParams } from "@/helpers/filter/updateSearchParams";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const TransmissionFilter = () => {
  const router = useRouter();

  const handleChange = (value: string) => {
    if (value == "all") {
      router.push("/");
      return;
    }
    updateSearchParams({ transmission: value });
  };

  return (
    <div>
      <Select
        placeholder={
          <span className="text-gray-800 text-md">Transmission</span>
        }
        // defaultValue="all"
        style={{ width: 130 }}
        onChange={handleChange}
        options={filterProductTransmission}
      />
    </div>
  );
};

export default TransmissionFilter;
