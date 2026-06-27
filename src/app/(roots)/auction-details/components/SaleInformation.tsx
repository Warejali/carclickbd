"use client";
import { Card } from "antd";

export default function SaleInformation({ product }: { product: any }) {
  return (
    <Card className="shadow rounded-lg">
      <h2 className="text-lg font-medium">Sale information</h2>
      <div className="mt-2 space-y-1 text-sm">
        <div>Sale name: {product.saleName}</div>
        <div>Sale location: {product.saleLocation}</div>
        <div>Sale date: {product.saleDate}</div>
        <div>Lane/Item: {product.laneItem}</div>
        <div>Last updated: {product.lastUpdated}</div>
      </div>
    </Card>
  );
}
