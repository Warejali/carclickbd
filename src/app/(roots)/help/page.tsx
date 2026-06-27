"use client";
import FeaturesSection from "./components/FeaturesSection";
import BuyingCarSection from "./components/BuyingCarSection";
import SellingCarSection from "./components/SellingCarSection";
import FAQSection from "./components/FAQSection";
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("how-it-works");

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        if (tab) {
          if (tab === 'buying-car' || tab === 'selling-car' || tab === 'faq') { // added conditions
            setActiveTab(tab);
          }
        }
    }
}, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Help Center</h1>
      <p className="text-lg text-gray-600 text-center">
        Find answers to your questions about buying and selling on our
        platform.
      </p>

      {/* Tab System */}
      <Tabs activeKey={activeTab} onTabClick={setActiveTab} className="w-full">
        <TabPane tab="How it Works" key="how-it-works">
          <FeaturesSection />
        </TabPane>
        <TabPane tab="Buying a Car" key="buying-car">
          <BuyingCarSection />
        </TabPane>
        <TabPane tab="Selling Car" key="selling-car">
          <SellingCarSection />
        </TabPane>
        <TabPane tab="FAQ" key="faq">
          <FAQSection />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HelpPage;

