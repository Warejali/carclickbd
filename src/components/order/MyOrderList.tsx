"use client";
import React, { useState, useMemo } from "react";
import OrderTable from "@/components/table/OrderTable";
import { useGetMyOrdersQuery } from "@/Redux/api/orderApi";
import { IOrder } from "@/Interface/order";

const MyOrderList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: response, isLoading } = useGetMyOrdersQuery({
    page,
    limit: pageSize,
    searchTerm,
  }) as { data: { orders: { data: IOrder[] } } | undefined; isLoading: boolean }; 

  console.log("response", response);
  
  
  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  //Filter customers only
  const orders = useMemo(() => {
    return response?.orders?.data || [];
  }, [response]);

  const title = "Active User";

  return (
    <div className="p-6">
      <OrderTable
        orders={orders}
        loading={isLoading}
        onSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        pagination={{
          current: page,
          pageSize,
          total: response?.orders?.data?.length || 0, // Use filtered count
        }}
        title={title}
        onChange={handleTableChange}
        onPaymentInitiated={(orderId: string) => {
          console.log(`Payment initiated for order ID: ${orderId}`);
        }}
      />
    </div>
  );
};

export default MyOrderList;
