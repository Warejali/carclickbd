"use client";

import { Suspense, useEffect } from "react";
import { Button, Result, Spin, message } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, FileSearch, ShieldCheck } from "lucide-react";
import { useSyncBdGatePaymentStatusMutation } from "@/Redux/api/paymentApi";

const AUCTION_SHEET_PAYMENT_AMOUNT = 800;
const DIRECT_BDGATE_AUCTION_SHEET_PAYMENT_URL =
  "https://pay.bdgate.net/p/test-941a828d";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const token = searchParams.get("token") || searchParams.get("session_token");
  const chassis = searchParams.get("chassis") || "";
  const orderId = searchParams.get("order") || "";
  const isAuctionSheetPayment = type === "auction-sheet";
  const [syncBdGatePaymentStatus, { isLoading: isSyncing }] =
    useSyncBdGatePaymentStatusMutation();

  useEffect(() => {
    if (!token || token === "{session_token}" || isAuctionSheetPayment) return;

    syncBdGatePaymentStatus(token)
      .unwrap()
      .catch((error: any) => {
        message.error(
          error?.data?.message ||
            error?.message ||
            "Could not verify BDGate payment status",
        );
      });
  }, [isAuctionSheetPayment, syncBdGatePaymentStatus, token]);

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

  const startAuctionSheetPayment = () => {
    window.location.href = DIRECT_BDGATE_AUCTION_SHEET_PAYMENT_URL;
  };

  if (!status && isAuctionSheetPayment) {
    return (
      <main className="min-h-[65vh] bg-slate-50 px-4 py-14">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-[#073b82] to-[#0057c2] p-7 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#f5bd05]">
              <ShieldCheck size={15} />
              Secure BDGate payment
            </div>
            <h1 className="mt-4 text-3xl font-black">
              Auction sheet verification payment
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-blue-100">
              Complete this payment to submit your Japanese auction sheet
              verification request to CarClickBD.
            </p>
          </div>

          <div className="grid gap-4 p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Chassis number
                </p>
                <p className="mt-1 text-lg font-black uppercase text-slate-950">
                  {chassis || "Not provided"}
                </p>
              </div>
              <div className="rounded-xl border border-[#f5bd05]/40 bg-[#fff8df] p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Payable amount
                </p>
                <p className="mt-1 text-2xl font-black text-slate-950">
                  BDT {AUCTION_SHEET_PAYMENT_AMOUNT.toLocaleString("en-US")}/-
                </p>
              </div>
              {orderId && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Order reference
                  </p>
                  <p className="mt-1 break-words text-sm font-black text-slate-950">
                    {orderId}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="primary"
              onClick={startAuctionSheetPayment}
              className="!h-14 !rounded-xl !bg-[#f5bd05] !px-8 !text-base !font-black !text-slate-950 hover:!bg-[#e4ad00]"
              icon={<CreditCard size={18} />}
            >
              Continue to Payment
            </Button>
          </div>
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
