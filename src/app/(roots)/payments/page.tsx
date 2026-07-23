"use client";

import { useEffect } from "react";
import { Button, Result, Spin, message } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useRouter } from "next/navigation";
import { useSyncBdGatePaymentStatusMutation } from "@/Redux/api/paymentApi";

function PaymentResultPage({ searchParams }: any) {
  const router = useRouter();
  const { status, token, session_token } = searchParams || {};
  const [syncBdGatePaymentStatus, { isLoading }] =
    useSyncBdGatePaymentStatusMutation();
  const bdGateToken = token || session_token;

  useEffect(() => {
    if (!bdGateToken || bdGateToken === "{session_token}") return;

    syncBdGatePaymentStatus(bdGateToken)
      .unwrap()
      .catch((error: any) => {
        message.error(
          error?.data?.message ||
            error?.message ||
            "Could not verify BDGate payment status",
        );
      });
  }, [bdGateToken, syncBdGatePaymentStatus]);

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
    status === "success"
      ? "BDGate has received your payment request. Your order will update after gateway confirmation."
      : "You can return to your orders and try the BDGate payment again.";

  return (
    <div className="min-h-[55vh] bg-slate-50 px-4 py-16">
      {isLoading && (
        <div className="mb-6 flex justify-center">
          <Spin />
        </div>
      )}
      <Result
        status={resultStatus}
        title={resultTitle}
        subTitle={resultSubTitle}
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              router.push("/customer/order");
            }}
          >
            View my orders
          </Button>,
          <Button
            key="cars"
            onClick={() => {
              router.push("/cars");
            }}
          >
            Browse cars
          </Button>,
        ]}
      />
    </div>
  );
}

export default PaymentResultPage;
