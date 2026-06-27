import { Layout, Typography, Steps, Button, Card, Row, Col, Divider } from "antd";
import { UploadOutlined, CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Step } = Steps;

const steps = [
  {
    title: "Step 1: Register Your Car",
    description:
      "Start by creating an account and filling out the details about the car you're selling. Provide all necessary information to help buyers make an informed decision.",
    icon: <UploadOutlined />,
  },
  {
    title: "Step 2: Provide Car Photos & Details",
    description:
      "Upload clear and high-quality photos of your car. Include important details such as mileage, condition, and any upgrades or modifications.",
    icon: <InfoCircleOutlined />,
  },
  {
    title: "Step 3: Set the Reserve Price",
    description:
      "Decide on a reserve price — the minimum amount you're willing to accept for the car. If the auction doesn't meet this price, the car won't sell.",
    icon: <CheckOutlined />,
  },
  {
    title: "Step 4: Auction Begins",
    description:
      "Once your listing is live, potential buyers will start bidding on your car. Be sure to monitor the auction and respond to any buyer inquiries.",
    icon: <CheckOutlined />,
  },
  {
    title: "Step 5: Complete the Sale",
    description:
      "If your car is sold, complete the transaction by accepting the highest bid and arranging shipping or pickup with the buyer.",
    icon: <CheckOutlined />,
  },
];

const SellingCarSection = () => {
  return (
    <Layout className="bg-gray-100">
      <div className="p-6">
        <Title level={1}>How to Sell a Car on carclickbd</Title>
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
            <Card title="Tips for Selling" bordered={false}>
              <Text strong>1. Provide accurate information.</Text>
              <br />
              <Text>
                The more transparent you are about the car&apos;s condition, the more likely you are to attract serious buyers.
              </Text>
              <br />
              <Text strong>2. Take clear, detailed photos.</Text>
              <br />
              <Text>
                High-quality images will help buyers better understand the car’s condition and features.
              </Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Shipping & Payment" bordered={false}>
              <Text strong>Finalize Payment</Text>
              <br />
              <Text>
                After the auction ends, arrange payment and shipping with the buyer in a timely manner to complete the transaction smoothly.
              </Text>
            </Card>
          </Col>
        </Row>

        <Divider />
        <Button type="primary" size="large" block>
          Start Selling Now!
        </Button>
      </div>
    </Layout>
  );
};

export default SellingCarSection;
