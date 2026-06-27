
import { useCreatePaymentMutation } from "@/Redux/api/paymentApi";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { message } from "antd";
import { useRouter } from "next/navigation";

const PayPal = ({ data }: any) => {
    // const value = useContext(Context);

    const router = useRouter()

    const paypal_api_key = "AaVx07_cTmUZHgeXIM_SA4pquFYDLEJuEX6W9PY5VCDl0uDJNZVMvjr1rTDOfkX9_JPgkak5ckgGVtoY";

    const [createPayment] = useCreatePaymentMutation()

    const paypalOptions = {
        "client-id": paypal_api_key, currency: "USD", components: "buttons",
    };
    const amount = data?.totalAmount
        ;

    const createOrder = (info: any, actions: any) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: amount
                },
            },],
        });
    };

    const onApprove = (info: any, actions: any) => {

        return actions.order.capture().then(async function (details: any) {
            console.log('details', details);

            const paymentData = {
                amount,
                paymentStatus: 'PAID',
                transactionId: details.id,
                orderId: data?.id,
                paymentMethod: 'paypal',
            };


            const res = await createPayment({ data: paymentData }).unwrap();
            console.log('res', res);

            if (res?.id) {
                message.success("Payment success")
                setTimeout(() => {
                    router.push("/")

                }, 1000);
            }



            // Show a success message to your buyer
            // data.payment_status = "paid";
            // data.payment_method = "paypal";
            // data.currency = "USD";
            // data.company_id = company_id;
            // data.reference_no = details.id;
            // data.transaction_id = details.id;

            // const res = await updatePackage(data);
            // if (res.affectedRows > 0) {
            //     // redirect to the dashboard
            //     notify("success", t("your_payment_has_been_successfully_processed"));
            //     setPaymentStatus("success");
            // }
        });
    };

    return (<div>
        <PayPalScriptProvider
            options={{
                "clientId": paypal_api_key, currency: "USD", intent: "capture",
            }}
        >
            <PayPalButtons
                fundingSource={"paypal"}
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "horizontal", height: 40, }}
            />
        </PayPalScriptProvider>
    </div>);
};

export default PayPal;
