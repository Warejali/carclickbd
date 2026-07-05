"use client";
import React from "react";
import { Card, Form, Input, Row, Col, Select } from "antd";

const { Option } = Select;

const years = Array.from(
  { length: new Date().getFullYear() - 1949 },
  (_, i) => 1950 + i
).reverse();

const BasicInfoSection = () => (
  <Card title="Basic Information" className="shadow-md mb-4">
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Form.Item
          name="make"
          label="Maker"
          rules={[{ required: true, message: "Please enter maker" }]}
        >
          <Input placeholder="e.g. Toyota" />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="model"
          label="Model"
          rules={[{ required: true, message: "Please enter model" }]}
        >
          <Input placeholder="e.g. Harrier" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="grade" label="Grade">
          <Input placeholder="e.g. Z Leather Package" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="launchingYear"
          label="Registration Year"
          rules={[{ required: true, message: "Please select registration year" }]}
        >
          <Select showSearch placeholder="Select registration year" allowClear>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="productionYear" label="Production Year (Optional)">
          <Select showSearch placeholder="Select production year" allowClear>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="language" label="Language">
          <Select placeholder="Select language" allowClear>
            <Option value="English">English</Option>
            <Option value="বাংলা">বাংলা</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

export default BasicInfoSection;
