"use client";
import React from "react";
import { Card, Form, Select } from "antd";

const FeatureTagsSection = () => (
  <Card title="Features & Options" className="shadow-md mb-4">
    <Form.Item name="featuresAndOptions" label="Features & Options">
      <Select
        mode="tags"
        tokenSeparators={[]}
        placeholder="Press Enter to add feature or option"
        open={false}
      />
    </Form.Item>
  </Card>
);

export default FeatureTagsSection;
