"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import { Button, Result, Spin, message } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useRouter, useSearchParams } from "next/navigation";
import { FileSearch } from "lucide-react";
import {
  useInitBdGateAuctionSheetPaymentMutation,
  useSyncBdGatePaymentStatusMutation,
} from "@/Redux/api/paymentApi";

const AUCTION_SHEET_PAYMENT_AMOUNT = 800;

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const token = searchParams.get("token") || searchParams.get("session_token");
  const chassis = searchParams.get("chassis") || "";
  const orderId = searchParams.get("order") || "";
  const isAuctionSheetPayment = type === "auction-sheet";
  const hasStartedAuctionSheetPayment = useRef(false);
  const [syncBdGatePaymentStatus, { isLoading: isSyncing }] =
    useSyncBdGatePaymentStatusMutation();
  const [initBdGateAuctionSheetPayment, { isLoading: isStartingPayment }] =
    useInitBdGateAuctionSheetPaymentMutation();

  useEffect(() => {
    if (!token || token === "{session_token}") return;

    syncBdGatePaymentStatus(token)
      .unwrap()
      .catch((error: any) => {
        message.error(
          error?.data?.message ||
            error?.message ||
            "Could not verify BDGate payment status",
        );
      });
  }, [syncBdGatePaymentStatus, token]);

  useEffect(() => {
    if (status !== "success" || !isAuctionSheetPayment) return;

    const timeout = window.setTimeout(() => {
      router.replace(
        chassis
          ? `/auction-sheets?chassis=${encodeURIComponent(chassis)}`
          : "/auction-sheets",
      );
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [chassis, isAuctionSheetPayment, router, status]);

  const startAuctionSheetPayment = useCallback(async () => {
    if (!orderId) {
      message.error("Order reference is missing. Please submit the form again.");
      router.push(
        chassis
          ? `/auction-sheets?chassis=${encodeURIComponent(chassis)}`
          : "/verify-auction-sheet",
      );
      return;
    }

    try {
      const response = await initBdGateAuctionSheetPayment({
        orderId,
        chassis,
        amount: AUCTION_SHEET_PAYMENT_AMOUNT,
        description: `CarClickBD auction sheet verification${chassis ? ` for ${chassis}` : ""}`,
      }).unwrap();

      const paymentUrl =
        response?.data?.payment_url ||
        response?.data?.paymentUrl ||
        response?.data?.redirect_url ||
        response?.data?.redirectUrl ||
        response?.data?.checkout_url ||
        response?.data?.checkoutUrl ||
        response?.data?.url;

      if (!paymentUrl) {
        message.error("BDGate did not return a payment URL.");
        return;
      }

      window.location.href = paymentUrl;
    } catch (error: any) {
      message.error(
        error?.data?.message ||
        error?.message ||
          "Could not start BDGate payment. Please try again.",
      );
    }
  }, [chassis, initBdGateAuctionSheetPayment, orderId, router]);

  useEffect(() => {
    if (
      status ||
      !isAuctionSheetPayment ||
      isStartingPayment ||
      hasStartedAuctionSheetPayment.current
    ) {
      return;
    }

    hasStartedAuctionSheetPayment.current = true;
    startAuctionSheetPayment();
  }, [isAuctionSheetPayment, isStartingPayment, startAuctionSheetPayment, status]);

  if (!status && isAuctionSheetPayment) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-14">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_26px_80px_rgba(15,23,42,0.12)]">
          <Spin size="large" />
          <h1 className="mt-6 text-2xl font-black text-slate-950">
            Opening BDGate payment
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            Please wait while we connect your auction sheet order to the secure
            payment page.
          </p>
        </section>
      </main>
    );
  }

  const resultStatus: ResultStatusType =
    status === "success"
      ? "success"
      : status === "cancelled"
        ? "warning"
        : "error";
  const resultTitle =
    status === "success"
      ? "Payment submitted successfully"
      : status === "cancelled"
        ? "Payment cancelled"
        : "Payment was not completed";
  const resultSubTitle =
    status === "success" && isAuctionSheetPayment
      ? "Your payment was received. Redirecting to Auction Sheets..."
      : status === "success"
        ? "BDGate has received your payment request. Your order will update after gateway confirmation."
        : "You can return and try the BDGate payment again.";

  return (
    <div className="min-h-[55vh] bg-slate-50 px-4 py-16">
      {isSyncing && (
        <div className="mb-6 flex justify-center">
          <Spin />
        </div>
      )}
      <Result
        icon={status === "success" && isAuctionSheetPayment ? <FileSearch /> : undefined}
        status={resultStatus}
        title={resultTitle}
        subTitle={resultSubTitle}
        extra={[
          isAuctionSheetPayment ? (
            <Button
              type="primary"
              key="auction-sheets"
              onClick={() => {
                router.push(
                  chassis
                    ? `/auction-sheets?chassis=${encodeURIComponent(chassis)}`
                    : "/auction-sheets",
                );
              }}
            >
              Go to Auction Sheets
            </Button>
          ) : (
            <Button
              type="primary"
              key="console"
              onClick={() => {
                router.push("/customer/order");
              }}
            >
              View my orders
            </Button>
          ),
          <Button
            key="cars"
            onClick={() => {
              router.push(isAuctionSheetPayment ? "/verify-auction-sheet" : "/cars");
            }}
          >
            {isAuctionSheetPayment ? "Verify another sheet" : "Browse cars"}
          </Button>,
        ]}
      />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-[55vh] bg-slate-50" />}>
      <PaymentPageContent />
    </Suspense>
  );
}
