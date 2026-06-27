import { Typography } from "antd";
import { FlagOutlined, ArrowDownOutlined, UnorderedListOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;

const features = [
  { id: 1, icon: <FlagOutlined className="text-2xl text-green-700" />, title: "Cool Car Auctions", description: "Auction your modern enthusiast car — anything cool and exciting from the 1980s to the 2020s." },
  { id: 2, icon: <ArrowDownOutlined className="text-2xl text-green-700" />, title: "Low Fees", description: "Buyers pay a 4.5% commission, capped at $4,500. Sellers list for free and receive 100% of the sale price." },
  { id: 3, icon: <UnorderedListOutlined className="text-2xl text-green-700" />, title: "More Information", description: "We provide vehicle history reports for every vehicle listed on carclickbd — for free." },
  { id: 4, icon: <CheckOutlined className="text-2xl text-green-600" />, title: "Easy to Use", description: "We've developed several new features that innovate buying and selling enthusiast cars online." },
];

export default function FeaturesSection() {
  return (
    <div className="mx-auto lg:p-16 p-4 bg-gray-100">
      <div className="mb-16">
        <Title level={1} className="text-4xl font-bold mb-2">What&apos;s carclickbd?</Title>
        <div className="h-2 w-48 bg-yellow-400"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        {features.map((feature) => (
          <div key={feature.id}>
            <div className="inline-block p-4 bg-green-50 rounded-lg mb-4">{feature.icon}</div>
            <Title level={2} className="text-2xl font-bold mb-4">{feature.title}</Title>
            <div className="text-gray-700 text-lg">{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
