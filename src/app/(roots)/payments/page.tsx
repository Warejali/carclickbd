"use client";

import { Suspense, useEffect, useState } from "react";
import { Button, Result, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useSyncEpsPaymentStatusMutation,
  useLazyGetEpsAuctionSheetPaymentStatusQuery,
} from "@/Redux/api/paymentApi";

function PaymentPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const chassis = params.get("chassis") || "";
  const paymentId = params.get("payment_id") || "";
  const auction = params.get("type") === "auction-sheet";
  const [sync] = useSyncEpsPaymentStatusMutation();
  const [syncAuction] = useLazyGetEpsAuctionSheetPaymentStatusQuery();
  const [status, setStatus] = useState("PENDING");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [retry, setRetry] = useState(0);
  const destination = auction
    ? `/auction-sheets?${new URLSearchParams({ payment_id: paymentId, chassis })}`
    : "/customer/order";

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    setError("");
    setStatus("PENDING");
    setChecking(true);
    const check = async () => {
      try {
        if (auction ? !paymentId : !token)
          throw new Error(
            "Payment reference is missing. Open your order to check its status.",
          );
        const response = auction
          ? await syncAuction(paymentId).unwrap()
          : await sync(token!).unwrap();
        const data = response?.data?.data || response?.data || response;
        const verified =
          data?.payment?.paymentStatus || data?.status || "PENDING";
        if (!active) return;
        setStatus(verified);
        if (verified === "PAID" && auction) {
          router.replace(
            `/auction-sheets?${new URLSearchParams({ payment_id: paymentId, chassis })}`,
          );
        }
        if (verified === "PENDING" && ++attempts < 10)
          timer = setTimeout(check, 3000);
        else setChecking(false);
      } catch (e: any) {
        if (active) {
          setError(
            e?.data?.message ||
              e?.message ||
              "EPS verification is unavailable. Please check again.",
          );
          setChecking(false);
        }
      }
    };
    check();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [auction, chassis, paymentId, token, sync, syncAuction, router, retry]);

  return (
    <div className="min-h-[55vh] bg-slate-50 px-4 py-16">
      {checking && (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}
      <Result
        status={
          status === "PAID" ? "success" : status === "FAILED" ? "error" : "info"
        }
        title={
          status === "PAID"
            ? "Payment confirmed"
            : status === "FAILED"
              ? "Payment was not completed"
              : "Payment verification pending"
        }
        subTitle={
          error ||
          (status === "PAID"
            ? "EPS has confirmed your payment."
            : status === "FAILED"
              ? "EPS reports this payment as failed or cancelled."
              : "Your order will update after EPS confirms payment.")
        }
        extra={[
          <Button
            key="orders"
            type="primary"
            onClick={() => router.push(destination)}
          >
            {auction ? "Go to Auction Sheets" : "View my orders"}
          </Button>,
          <Button
            key="retry"
            disabled={checking}
            onClick={() => setRetry((x) => x + 1)}
          >
            Check again
          </Button>,
        ]}
      />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Spin />}>
      <PaymentPageContent />
    </Suspense>
  );
}
