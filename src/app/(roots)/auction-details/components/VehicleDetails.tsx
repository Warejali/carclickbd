"use client";
import { Card, Button } from "antd";

export default function VehicleDetails({ product }: { product: any }) {
  return (
    <Card className="shadow rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Vehicle details</h2>
        <Button type="link" className="text-sm px-0">Share</Button>
      </div>
      <table className="w-full text-sm border border-gray-200">
        <tbody>
          <DetailRow label="Lot number:" value={product.lotNumber} />
          <DetailRow label="VIN:" value={product.vin} />
          <DetailRow label="Title code:" value={product.titleCode} />
          <DetailRow label="Odometer:" value={product.odometer} />
          <DetailRow label="Primary damage:" value={product.primaryDamage} />
          <DetailRow label="Secondary damage:" value={product.secondaryDamage} />
          <DetailRow label="Estimated retail value:" value={`$${product.retailValue}`} />
          <DetailRow label="Cylinders:" value={product.cylinders} />
          <DetailRow label="Body style:" value={product.bodyStyle} />
          <DetailRow label="Color:" value={product.color} />
          <DetailRow label="Engine type:" value={product.engineType} />
          <DetailRow label="Transmission:" value={product.transmission} />
          <DetailRow label="Drive:" value={product.drive} />
          <DetailRow label="Vehicle type:" value={product.vehicleType} />
          <DetailRow label="Fuel:" value={product.fuel} />
          <DetailRow label="Keys:" value={product.keys} />
          <DetailRow label="Highlights:" value={product.highlights} />
          <DetailRow label="Notes:" value={product.notes} />
        </tbody>
      </table>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: any }) {
  return (
    <tr className="border-b">
      <td className="py-1.5 px-3 font-medium text-gray-600 w-1/3 bg-gray-50">
        {label}
      </td>
      <td className="py-1.5 px-3">{value ?? "—"}</td>
    </tr>
  );
}
