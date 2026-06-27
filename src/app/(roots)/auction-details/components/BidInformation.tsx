"use client";
import { useMakeBidMutation } from "@/Redux/features/bids/bidsApi";
import { Card, Button, Input, message, Dropdown, Tooltip } from "antd";
import type { MenuProps } from "antd";
import {
  QuestionCircleOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function BidInformation({ product }: { product: any }) {
  const [bidAmount, setBidAmount] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("");

  const [createBid, { isLoading }] = useMakeBidMutation();

  // ---- time setup
  const endBid = product?.endBid ? moment(product.endBid) : null;
  const startBid = product?.startBid ? moment(product.startBid) : null;
  const startTime = startBid ?? moment().subtract(1, "day");
  const endTime = endBid ?? moment();

  useEffect(() => {
    if (!product || !endBid) return;
    const tick = () => {
      const now = moment();
      const remaining = endTime.diff(now, "seconds");
      if (remaining <= 0) {
        setRemainingTime("Auction ended");
        return;
      }
      const d = moment.duration(remaining, "seconds");
      // Compact like screenshot: 3D 7H 12min (seconds omitted)
      setRemainingTime(`${d.days()}D ${d.hours()}H ${d.minutes()}min`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [product, endBid, endTime]);

  // ---- Calendar
  const calendarTitle = useMemo(
    () => `Auction ends: ${product?.title || "Vehicle"}`,
    [product?.title]
  );
  const calStartUTC = useMemo(
    () => (endBid ? moment(endBid).utc().format("YYYYMMDD[T]HHmmss[Z]") : ""),
    [endBid]
  );
  const calEndUTC = useMemo(
    () =>
      endBid
        ? moment(endBid).add(30, "minutes").utc().format("YYYYMMDD[T]HHmmss[Z]")
        : "",
    [endBid]
  );
  const googleCalUrl = useMemo(() => {
    if (!calStartUTC || !calEndUTC) return "#";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: calendarTitle,
      dates: `${calStartUTC}/${calEndUTC}`,
      details: `Lot: ${product?.lotNumber ?? ""} • Auction ends`,
      location: product?.saleLocation || "",
    });
    return `https://www.google.com/calendar/render?${params.toString()}`;
  }, [calStartUTC, calEndUTC, calendarTitle, product?.lotNumber, product?.saleLocation]);

  const downloadICS = () => {
    if (!endBid) return;
    const dtStart = moment(endBid).utc().format("YYYYMMDDTHHmmss[Z]");
    const dtEnd = moment(endBid).add(30, "minutes").utc().format("YYYYMMDDTHHmmss[Z]");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//YourApp//Auction//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${product?._id || Math.random().toString(36).slice(2)}@yourapp`,
      `DTSTAMP:${moment().utc().format("YYYYMMDDTHHmmss[Z]")}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${escapeICS(calendarTitle)}`,
      `DESCRIPTION:${escapeICS(`Lot: ${product?.lotNumber ?? ""} • Auction ends`)}`,
      `LOCATION:${escapeICS(product?.saleLocation || "")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "auction-end.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const calMenuItems: MenuProps["items"] = [
    { key: "google", label: <a href={googleCalUrl} target="_blank" rel="noreferrer">Google Calendar</a>, disabled: !endBid },
    { key: "ics", label: <span onClick={downloadICS}>Download .ics</span>, disabled: !endBid },
  ];

  // ---- bidding
  const requiredBidAmount =
    (product?.highestBid ?? 0) > 0 ? product?.highestBid! : product?.minBid ?? 0;

  const handleMakeBid = async () => {
    if (!bidAmount || bidAmount <= requiredBidAmount) {
      message.error(`Your bid must be more than $${requiredBidAmount}`);
      return;
    }
    try {
      const res = await createBid({ product: product._id, bidAmount }).unwrap();
      if (res.success) {
        message.success("Bid created successfully!");
        setBidAmount(null);
      }
    } catch (error: any) {
      message.error(error?.message || "Failed to place bid.");
      setBidAmount(null);
    }
  };

  const price = formatUSD(product?.highestBid || 0);

  return (
    <Card className="shadow rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Bid information</h2>
        <Button type="link" className="text-xs">Glossary ›</Button>
      </div>

      {/* Copart-like rows */}
      <div className="text-sm divide-y">
        <Row label="Bid status:" value={<span className="font-semibold">{product.bidStatus}</span>} />

        <Row
          label="Eligibility status:"
          value={
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500" />
              <a href="#" className="text-blue-600 hover:underline">Check now ›</a>
            </div>
          }
        />

        <Row
          label="Sale status:"
          value={
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {product?.saleStatus || "Minimum bid"}
              </span>
              <Tooltip title="Sale is currently at the minimum allowable bid.">
                <QuestionCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>
          }
        />

        <Row
          label="Time left:"
          value={
            <div className="flex items-center gap-3">
              <span className="text-red-600 font-semibold">{remainingTime}</span>
              <Dropdown menu={{ items: calMenuItems }} trigger={["click"]}>
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                  <CalendarOutlined /> <span className="underline">Add to calendar</span>
                </button>
              </Dropdown>
            </div>
          }
        />

        <Row
          label="Current bid:"
          value={
            <div className="leading-tight">
              <div className="text-xl font-bold">{price}</div>
              <div className="text-xs text-gray-700 flex items-center gap-1">
                Seller reserve not yet met
                <Tooltip title="The seller set a minimum price that has not been met by the current bid.">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
            </div>
          }
        />
      </div>

      {/* Bid input */}
      <div className="mt-4">
        <Input
          type="number"
          value={bidAmount ?? ""}
          onChange={(e) => setBidAmount(Number(e.target.value) || null)}
          placeholder={`Minimum bid: $${requiredBidAmount}`}
          disabled={isLoading}
          className="mb-4 !py-3 placeholder:text-md text-lg font-bold placeholder:font-normal"
        />
        <Button
          type="primary"
          className="!w-full !py-5"
          onClick={handleMakeBid}
          loading={isLoading}
          disabled={isLoading || !bidAmount || bidAmount <= requiredBidAmount}
        >
          {isLoading ? "" : "Bid now"}
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mt-2 text-xs text-gray-500">
        * ($50.00 bid increment) Incremental bid guidelines
      </div>
      <div className="mt-1 text-xs text-gray-500">
        All bids are legally binding and all sales are final.
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2">
      <div className="text-gray-600">{label}</div>
      <div className="text-right">{value}</div>
    </div>
  );
}

function escapeICS(text: string) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
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
