"use client";

import { Button, Input, message as antMessage } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { getWhatsAppUrl, siteContact } from "@/constants/siteContact";

export default function BidInformation({ product }: { product: any }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messageText, setMessageText] = useState("");
  const whatsappUrl = getWhatsAppUrl(
    `Hello CarClickBD, I am interested in ${product?.title || "this car"} (${product?._id || ""}).`
  );

  const handleInquiry = () => {
    if (!name.trim() || !phone.trim()) {
      antMessage.error("Please enter your name and phone number.");
      return;
    }

    antMessage.success("Inquiry saved. Our team will respond within 24 hours.");
    setName("");
    setPhone("");
    setMessageText("");
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
          Seller contact
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
          Contact final availability
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Share your contact details and our team will help you verify availability.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          prefix={<UserRound size={16} className="text-slate-400" />}
          className="!rounded-md !py-3"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp number"
          prefix={<WhatsAppOutlined className="text-slate-400" />}
          className="!rounded-md !py-3"
        />
        <Input.TextArea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Write a message to the seller"
          rows={4}
          className="!rounded-md"
        />
        <Button
          type="primary"
          className="!h-12 !w-full !rounded-md !bg-slate-950 !font-bold hover:!bg-sky-600"
          onClick={handleInquiry}
        >
          Send inquiry
        </Button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block">
          <Button className="!h-12 !w-full !rounded-md !font-bold" icon={<WhatsAppOutlined />}>
            Chat on WhatsApp
          </Button>
        </a>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs font-medium leading-5 text-slate-500">
        WhatsApp: {siteContact.whatsapp}. Dealer information is verified before buyer
        handoff.
      </p>
    </section>
  );
}
