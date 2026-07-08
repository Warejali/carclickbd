"use client";
import React, { useMemo } from "react";
import { Card, Form, Input, Row, Col, Select } from "antd";
import {
  homeFilterMakers,
  homeFilterModelsByMaker,
} from "@/content/product.constant";

const { Option } = Select;

const years = Array.from(
  { length: new Date().getFullYear() - 1949 },
  (_, i) => 1950 + i
).reverse();

const makerOptions = homeFilterMakers.filter((item) => item.value !== "all");

const BasicInfoSection = () => {
  const form = Form.useFormInstance();
  const selectedMaker = Form.useWatch("make", form);
  const selectedModel = Form.useWatch("model", form);

  const modelOptions = useMemo(() => {
    return homeFilterModelsByMaker[selectedMaker] || [
      { value: "OTHERS", label: "OTHERS" },
    ];
  }, [selectedMaker]);

  return (
  <Card title="Basic Information" className="shadow-md mb-4">
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Form.Item
          name="make"
          label="Maker"
          rules={[{ required: true, message: "Please select maker" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Select maker"
            options={makerOptions}
            optionFilterProp="label"
            onChange={() => {
              form.setFieldsValue({
                model: undefined,
                otherMake: undefined,
                otherModel: undefined,
              });
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="model"
          label="Car Name"
          rules={[{ required: true, message: "Please select car name" }]}
        >
          <Select
            showSearch
            allowClear
            disabled={!selectedMaker}
            placeholder="Select car name"
            options={modelOptions}
            optionFilterProp="label"
            onChange={() => form.setFieldsValue({ otherModel: undefined })}
          />
        </Form.Item>
      </Col>
      {selectedMaker === "OTHERS" && (
        <Col xs={24} md={12}>
          <Form.Item
            name="otherMake"
            label="Other Maker"
            rules={[{ required: true, message: "Please write maker name" }]}
          >
            <Input placeholder="Write maker name" />
          </Form.Item>
        </Col>
      )}
      {selectedModel === "OTHERS" && (
        <Col xs={24} md={12}>
          <Form.Item
            name="otherModel"
            label="Other Car Name"
            rules={[{ required: true, message: "Please write car name" }]}
          >
            <Input placeholder="Write car name" />
          </Form.Item>
        </Col>
      )}
      <Col xs={24} md={8}>
        <Form.Item name="grade" label="Grade">
          <Input placeholder="e.g. Z Leather Package" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="productionYear"
          label="Production Year"
          rules={[{ required: true, message: "Please select production year" }]}
        >
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
        <Form.Item name="registrationYear" label="Registration Year (Optional)">
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
        <Form.Item name="stockNumber" label="Reference / Stock Number">
          <Input placeholder="Seller reference or auto stock number" />
        </Form.Item>
      </Col>
    </Row>
  </Card>
  );
};

export default BasicInfoSection;
