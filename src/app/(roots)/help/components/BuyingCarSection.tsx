import { Layout, Typography, Steps, Button, Card, Row, Col, Divider } from "antd";
import { CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Step } = Steps;

const steps = [
  {
    title: "Register to Bid",
    description:
      "Sign up for an account and ensure your payment method is set. This allows you to place bids on any vehicle of your choice.",
    icon: <CheckOutlined />,
  },
  {
    title: "Browse & Review Listings",
    description:
      "Explore car listings with detailed photos, descriptions, and vehicle history. Don’t forget to check out any inspection reports.",
    icon: <InfoCircleOutlined />,
  },
  {
    title: "Set Your Budget",
    description:
      "Calculate your maximum bid, including any additional fees, taxes, and shipping costs. Ensure your bid aligns with your budget.",
    icon: <CheckOutlined />,
  },
  {
    title: "Place a Bid",
    description:
      "Make a bid on the car you're interested in, ensuring you meet the minimum bid increment and understand the buyer's fees.",
    icon: <CheckOutlined />,
  },
  {
    title: "Win the Auction",
    description:
      "If you're the highest bidder, congratulations! Complete the payment and arrange for delivery or pickup of your car.",
    icon: <CheckOutlined />,
  },
];

const BuyingCarSection = () => {
  return (
    <Layout className="bg-gray-100">
      <div className="p-6">
        <Title level={1}>How to Buy a Car on carclickbd</Title>
        <Divider className="w-24 bg-yellow-400 mb-8" />
        <Steps current={4} direction="vertical" size="default">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </Steps>

        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Key Tips for Buying" bordered={false}>
              <Text strong>1. Set your budget early.</Text>
              <br />
              <Text>
                Make sure you&apos;re aware of all additional costs (buyer’s fee, shipping, taxes) before you bid.
              </Text>
              <br />
              <Text strong>2. Understand the car’s history.</Text>
              <br />
              <Text>
                Always review the inspection reports and carfax details for peace of mind.
              </Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Financing and Payment" bordered={false}>
              <Text strong>Explore Financing Options</Text>
              <br />
              <Text>
                Consider financing options to ensure you&apos;re ready when your bid wins. Have a payment plan in place.
              </Text>
            </Card>
          </Col>
        </Row>

        <Divider />
        <Button type="primary" size="large" block>
          Start Bidding Now!
        </Button>
      </div>
    </Layout>
  );
};

export default BuyingCarSection;
