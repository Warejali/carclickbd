export default function LegacyPaymentReturn() {
  return (
    <div className="p-12 text-center">
      <h1>Payment verification required</h1>
      <p>
        Open your order to check its payment status. A return URL does not
        confirm payment.
      </p>
      <a href="/customer/order">View my orders</a>
    </div>
  );
}
