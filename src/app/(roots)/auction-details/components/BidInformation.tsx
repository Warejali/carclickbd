"use client";
import { Card, Button, Input, message } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function BidInformation({ product }: { product: any }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const price = formatUSD(product?.mainPrice || product?.highestBid || product?.minBid || 0);
  const whatsappNumber = "8801576611703";
  const whatsappMessage = encodeURIComponent(
    `Hello CarClickBD, I am interested in ${product?.title || "this car"} (${product?._id || ""}).`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleInquiry = () => {
    if (!name.trim() || !phone.trim()) {
      message.error("Please enter your name and phone number.");
      return;
    }

    message.success("Inquiry saved. Our team will respond within 24 hours.");
    setName("");
    setPhone("");
  };

  return (
    <Card className="shadow rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Seller contact</h2>
        <span className="text-xs text-gray-500">Reply within 24 hours</span>
      </div>

      <div className="text-sm divide-y">
        <Row label="Listed price:" value={<span className="text-xl font-bold">{price}</span>} />
        <Row label="Seller type:" value={product?.sellerType || "Dealer"} />
        <Row
          label="Member ID:"
          value={product?.seller?.memberId || product?.seller?._id?.slice(-8) || "Verified"}
        />
        <Row label="Listing status:" value={product?.isSoldOut ? "Sold" : "Available"} />
      </div>

      <div className="mt-4 space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="!py-3"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="!py-3"
        />
        <Button type="primary" className="!w-full !py-5" onClick={handleInquiry}>
          Send inquiry
        </Button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <Button className="!w-full !py-5" icon={<WhatsAppOutlined />}>
            Chat on WhatsApp
          </Button>
        </a>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        WhatsApp: +8801576611703. Dealer names are hidden; only verified member IDs are shown.
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <div className="text-gray-600">{label}</div>
      <div className="text-right">{value}</div>
    </div>
  );
}

function formatUSD(n: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${Number(n || 0).toFixed(2)}`;
  }
}
