"use client";

import PayPal from "@/components/Cart/Paypal";
import Stripe from "@/components/Cart/Stripe";
import { useOrderQuery } from "@/Redux/api/orderApi";
import { Col, Image, Row } from "antd";
import { useState } from "react";

const CheckoutPage = ({ params }: any) => {
  const { data, isLoading, } = useOrderQuery(params?.id)
  const [paymentStatus, setPaymentStatus] = useState("");
  return (
    <div>
      <div className="flex justify-between items-center bg-white px-10">
        <h4>CHECKOUT</h4>
       
      </div>
      <div>
        <div >
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={12} >

              <h3>Payment Selection</h3>

              <Row gutter={20} className=" bg-white my-4 p-8">
                <Col span={24}>
                  <div className=" flex gap-4 items-center">
                    <div>
                      <PayPal
                        data={data}
                        setPaymentStatus={setPaymentStatus}
                      />

                    </div>
                    <div>
                      <Stripe data={data} setPaymentStatus={setPaymentStatus} />
                    </div>
                    {/* <div>
                      <Image
                        src={BankTransfer}
                        width={100}
                        height={44}
                        alt=''
                      />
                    </div> */}
                  </div>
                </Col>
              </Row>
              <Row gutter={20} className=" bg-white px-8 py-8 my-4">
                <Col>
                  <div>
                    <h2>paidAmount: {data?.totalAmount}</h2>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
