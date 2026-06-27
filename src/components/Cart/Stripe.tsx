// frontend:

import { loadStripe } from "@stripe/stripe-js";
import { message } from "antd";
import Image from "next/image";
import stripe from "../../assets/Stripe.png";
import { useInitPaymentMutation } from "@/Redux/api/paymentApi";

const Stripe = ({ data }: any) => {

  const stripePromise = loadStripe(
    "pk_test_51L0nKIAoWY7yZrZSU2q2yTbC0iM7MthnRVvIuj6F4pPk8CA8PVt3b6UtjPcSw9wNkl1ymIHuAs0CTomgV7inylLD00y3znsqyq"
  );


  const amount = data?.totalAmount;
  const totalQuantity = data?.totalQuantity;
  const orderNumber = data?.orderNumber;

  const [initPayment] = useInitPaymentMutation();
  const onSubmit = async () => {
    const stripe = await stripePromise;

    const items = {
      name: `Reference Number #${orderNumber}`,
      description: "Purchase of this is test stripe",
      totalQuantity,
      price: amount,
      success_url: `${window.location.origin}/success?ref=${data?._id}&amount=${amount}`,
      cancel_url: `${window.location.origin}/admin/upgrades`,
    };
    message.loading("Creating.....");
    try {
      const checkoutSession = await initPayment({ items }).unwrap();

      const result = await stripe!.redirectToCheckout({
        sessionId: checkoutSession?.data?.id, // <---- UPDATED LINE
      });

      if (result.error) {
        message.error("payment error");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <>
      <div className="payment-logo bg-slate-300 px-24 py-2 hover:bg-slate-200 cursor-pointer" onClick={onSubmit}>
        <Image src={stripe} alt="" width={80} height={8} />
      </div>
    </>
  );
};
export default Stripe;
