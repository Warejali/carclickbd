"use client";
import { Collapse, Typography } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const faqData = [
  {
    category: "Prior to Bidding",
    questions: [
      {
        question: "What are the fees for the buyer on carclickbd?",
        answer:
          "In addition to the final purchase price paid to the seller, buyers pay a 5% buyer’s fee to carclickbd. The buyer’s fee has a minimum of $250 and a maximum of $7,500.",
      },
      {
        question: "How do I register to bid?",
        answer:
          "To register, click the ‘Sign In’ icon in the upper right corner, then select ‘Sign up here.’ Verify your email and provide your credit card information to complete registration.",
      },
      {
        question: "How do I place a bid?",
        answer:
          "Navigate to the car listing and click the ‘Place Bid’ button. Enter your bid amount, ensuring it is higher than the current bid, and confirm your bid.",
      },
    ],
  },
  {
    category: "During the Auction",
    questions: [
      {
        question: "How do I contact a seller privately?",
        answer:
          "You can contact the seller through the auction page by clicking ‘Contact the seller’ next to their name.",
      },
      {
        question: "How can I tell if a car was inspected?",
        answer:
          "An ‘Inspected’ tag appears near the listing title. You can also view the inspection report under the listing image.",
      },
      {
        question: "Is there proxy bidding?",
        answer:
          "No, carclickbd does not support proxy bidding. You need to manually input your next bid if outbid.",
      },
    ],
  },
];

const sellerFaqData = [
  {
    category: "Listing & Selling",
    questions: [
      {
        question: "How do I list my car for sale?",
        answer:
          "To list your car, click ‘Sell a Car’ at the top of the page, complete the submission form, and our team will review your application.",
      },
      {
        question: "Are there any listing fees?",
        answer:
          "No, listing a car on carclickbd is free. You receive 100% of the final sale price.",
      },
      {
        question: "Can I set a reserve price?",
        answer:
          "Yes, you can set a reserve price to ensure your vehicle sells at a minimum acceptable price.",
      },
    ],
  },
  {
    category: "After the Auction Ends",
    questions: [
      {
        question: "What happens after my car sells?",
        answer:
          "You’ll receive the buyer’s contact information to arrange payment and vehicle pickup.",
      },
      {
        question: "How does the buyer pay me?",
        answer:
          "The buyer will contact you directly to complete the payment process. carclickbd does not handle vehicle payments.",
      },
      {
        question: "What if the winning bidder does not pay?",
        answer:
          "If the buyer fails to complete the transaction, contact our support team for assistance.",
      },
    ],
  },
];

const buyerFaqData = [
  {
    category: "Registration & Bidding",
    questions: [
      {
        question: "How do I register as a buyer?",
        answer:
          "To register, click ‘Sign In’ at the top right, select ‘Sign up here,’ and verify your email. Then, provide your credit card details to activate bidding.",
      },
      {
        question: "Are there any fees to register as a buyer?",
        answer:
          "No, registering as a buyer is free. However, you must provide a valid credit card to place bids.",
      },
      {
        question: "Can I cancel a bid?",
        answer:
          "No, all bids are binding. Once placed, they cannot be canceled or withdrawn.",
      },
    ],
  },
  {
    category: "After Winning an Auction",
    questions: [
      {
        question: "What happens after I win an auction?",
        answer:
          "You will receive the seller’s contact details to arrange payment and vehicle pickup. Ensure you complete the transaction within 7 days.",
      },
      {
        question: "How do I pay for a vehicle I won?",
        answer:
          "Payment is arranged directly between you and the seller. carclickbd does not process payments for vehicles.",
      },
      {
        question: "Can I inspect the car before finalizing the purchase?",
        answer:
          "Yes, we encourage buyers to coordinate with the seller for an inspection before completing the transaction.",
      },
    ],
  },
];

export default function FAQSection() {
  return (
 <div className="bg-gray-100 py-10">
    <div className="mx-auto max-w-3xl p-6 bg-white shadow rounded-lg">
      <p className="mb-4 text-center">FAQ</p>
      <Collapse accordion>
        {faqData.map((category, index) => (
          <Panel header={category.category} key={index}>
            <Collapse accordion>
              {category.questions.map((item, idx) => (
                <Panel header={item.question} key={`${index}-${idx}`}>
                  <p>{item.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </div>
    <div className="mx-auto max-w-3xl p-6 bg-white shadow rounded-lg my-4">
      <p className="mb-4 text-center">Seller FAQ</p>
      <Collapse accordion>
        {sellerFaqData.map((category, index) => (
          <Panel header={category.category} key={index}>
            <Collapse accordion>
              {category.questions.map((item, idx) => (
                <Panel header={item.question} key={`${index}-${idx}`}>
                  <p>{item.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </div>
        <div className="mx-auto max-w-3xl p-6 bg-white shadow rounded-lg">
          <p className="mb-4 text-center">Buyer FAQ</p>
          <Collapse accordion>
            {buyerFaqData.map((category, index) => (
              <Panel header={category.category} key={index}>
                <Collapse accordion>
                  {category.questions.map((item, idx) => (
                    <Panel header={item.question} key={`${index}-${idx}`}>
                      <p>{item.answer}</p>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        </div>
 </div>
  );
}
