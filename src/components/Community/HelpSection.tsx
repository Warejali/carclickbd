"use client"
import React from 'react';
import { Typography, Collapse } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

interface FAQItem {
  key: string;
  title: string;
  content: string;
}

const HelpSection: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      key: '1',
      title: 'How do I place a bid?',
      content: 'To place a bid, you need to create an account and verify your payment method. Once logged in, navigate to the auction page of the car you are interested in and enter your bid amount in the designated field.',
    },
    {
      key: '2',
      title: 'What are the fees for buying and selling?',
      content: 'Buyer fees are a percentage of the final sale price. Seller fees may apply depending on the auction type and your membership level. Please refer to our Fees page for detailed information.',
    },
    {
      key: '3',
      title: 'What happens after I win an auction?',
      content: 'Once you win an auction, you will receive an email with instructions on how to complete the payment and arrange for vehicle pickup or shipping.',
    },
    // ... more FAQ items
  ];

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <Title level={3} className="mb-4">
        Help & FAQ
      </Title>
      <Collapse accordion>
        {faqData.map((item) => (
          <Panel header={item.title} key={item.key}>
            <Paragraph>{item.content}</Paragraph>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default HelpSection;