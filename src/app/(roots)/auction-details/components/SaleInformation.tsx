"use client";
import { Card } from "antd";

export default function SaleInformation({ product }: { product: any }) {
  const price = Number(product?.mainPrice || product?.highestBid || product?.minBid || 0);
  const downPayment = price * 0.2;
  const termMonths = 60;
  const annualRate = 10.5;
  const principal = Math.max(price - downPayment, 0);
  const monthlyRate = annualRate / 100 / 12;
  const emi =
    principal && monthlyRate
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : 0;

  return (
    <Card className="shadow rounded-lg">
      <h2 className="text-lg font-medium">Finance calculator</h2>
      <div className="mt-2 space-y-1 text-sm">
        <div>Vehicle price: ${price.toLocaleString()}</div>
        <div>Down payment: ${Math.round(downPayment).toLocaleString()}</div>
        <div>Loan term: {termMonths} months</div>
        <div>Estimated rate: {annualRate}%</div>
        <div className="pt-2 text-lg font-semibold">
          Estimated EMI: ${Math.round(emi).toLocaleString()} / month
        </div>
      </div>
    </Card>
  );
}
