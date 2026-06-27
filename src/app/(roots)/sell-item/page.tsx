"use client"
import React from "react";
import { Collapse, Button, Card } from "antd";
import { CheckCircleOutlined, CarOutlined } from "@ant-design/icons";
import { Row, Col, Rate } from "antd";
import { useRouter } from "next/navigation";
import ProductsResult from "@/components/publiclayout/home/AcutionProducts/ProductsResult";
import Breadcrumbs from "@/components/shared/Breadcrumbs";


const { Panel } = Collapse;
const reviews = [
  {
    rating: 5,
    text: "Some of the most helpful and kind people to work with! Will for sure sell with them again.",
    author: "Cary R.",
    date: "Sept 2024",
  },
  {
    rating: 5,
    text: "Best and only place you should consider when selling your cool car! Perhaps the best free service available on the internet.",
    author: "Jay C.",
    date: "July 2024",
  },
  {
    rating: 5,
    text: "carclickbd is by far the greatest place to sell your car online. I've sold 3 cars with them now and am never going back to anywhere else!",
    author: "Andrew C.",
    date: "June 2024",
  },
  {
    rating: 5,
    text: "Great selling experience! Smooth transaction, highly recommend!",
    author: "Geoff M.",
    date: "May 2024",
  },
];

const SellCarPage = () => { 
const router = useRouter()
  const goToSignup = ()=> {
    router.push("/seller-signup")
    
  }
  return (
    <div className="container mx-auto p-6 space-y-10">
      <Breadcrumbs />
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get the best price for your car</h1>
        <p className="text-lg text-gray-600">More buyers, more bids, more profit</p>
        <Button onClick={goToSignup} type="primary" size="large">Sell now — it’s free!</Button>
      </div>

      {/* Recent Sales */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Sales</h2>
        <div >
        <ProductsResult
                  className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                  isPaginate={false}
                  isShowAll={false}
                  isWinner={true}
                />
        </div>
      </div>

      {/* Why Sell Here? */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Why sell on Our Platform?</h2>
        <p className="text-lg text-gray-600">
          We bring more eyes to your car than any other auction platform.
        </p>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-2xl font-bold mb-4">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Submit your car in minutes",
            "We craft your listing",
            "It's auction time",
            "Get paid",
          ].map((text, index) => (
            <Card key={index} className="p-4 text-center shadow-md">
              <CheckCircleOutlined className="text-3xl text-green-500 mb-2" />
              <p className="font-semibold">{text}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">What Sellers Are Saying</h2>
      <Row gutter={[16, 16]}>
        {reviews.map((review, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card className="shadow-lg p-4 rounded-lg border">
              <Rate disabled defaultValue={review.rating} className="mb-2" />
              <p className="text-gray-700 italic">{review.text}</p>
              <p className="text-sm font-semibold text-gray-600 mt-2">- {review.author}, {review.date}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <Collapse>
          <Panel header="How much does it cost to sell a car?" key="1">
            <p>It’s completely free to list your car for sale.</p>
          </Panel>
          <Panel header="How do you choose which cars you're looking for?" key="2">
            <p>We accept high-quality, enthusiast cars that appeal to our buyers.</p>
          </Panel>
          <Panel header="How do I submit my car for sale?" key="3">
            <p>You can fill out our online form with photos and details.</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SellCarPage;
