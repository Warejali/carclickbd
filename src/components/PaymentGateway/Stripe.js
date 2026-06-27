import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
import { Context } from '../../pages/_app';
import { SiteLogo } from "../config";


const Stripe = ({data}) => {

    const value = useContext(Context);
    const stripePromise = loadStripe("pk_test_51L0nKIAoWY7yZrZSU2q2yTbC0iM7MthnRVvIuj6F4pPk8CA8PVt3b6UtjPcSw9wNkl1ymIHuAs0CTomgV7inylLD00y3znsqyq");

    const amount = data[data.frequency + '_price']
    const handleCheckout = async () => {
        // setLoading(true);
        try {
            const stripe = await stripePromise;
            const checkoutSession = await axios.post("/api/payment/stripe", {
                item: {
                    name: data.package_name,
                    description: 'Purchase of ' + data.package_name,
                    image: `${value.config.NEXT_PUBLIC_BASE_URL}${SiteLogo()}`,
                    quantity: 1,
                    price: amount,
                    success_url: `${value.config.NEXT_PUBLIC_BASE_URL}/admin/upgrades/success/`,
                    cancel_url: `${value.config.NEXT_PUBLIC_BASE_URL}/admin/upgrades`,
                }

            });
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSession.id,
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (<>
        <div className="payment-logo"
            onClick={handleCheckout}>
            <Image src="/assets/img/stripe.png" alt=""
            width={200}
            height={200}
            />
        </div>
    </>);
};
export default Stripe;
