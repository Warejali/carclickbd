"use client";
import React from "react";
import { Card, Row, Col, Form, Input, Select } from "antd";

const { Option } = Select;

const VehicleDetailsSection = () => (
  <Card title="Vehicle Details" className="shadow-md mb-4">
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Form.Item name="engine" label="Engine Size">
          <Input placeholder="e.g. 2000cc" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="fuelType" label="Fuel Type">
          <Select placeholder="Select" allowClear>
            <Option value="Petrol">Petrol</Option>
            <Option value="Diesel">Diesel</Option>
            <Option value="Hybrid">Hybrid</Option>
            <Option value="Electric">Electric</Option>
            <Option value="EV">EV</Option>
            <Option value="HEV">HEV</Option>
            <Option value="CNG">CNG</Option>
            <Option value="LPG">LPG</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="transmission" label="Transmission">
          <Select placeholder="Select" allowClear>
            <Option value="Automatic">Automatic</Option>
            <Option value="Manual">Manual</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Form.Item name="drivetrain" label="Drive Type">
          <Select placeholder="Select" allowClear>
            <Option value="4WD">4WD</Option>
            <Option value="2WD">2WD</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="bodyStyle" label="Body Type">
          <Select placeholder="Select" allowClear>
            <Option value="Sedan">Sedan</Option>
            <Option value="SUV">SUV</Option>
            <Option value="Coupe">Coupe</Option>
            <Option value="Convertible">Convertible</Option>
            <Option value="SUV/Crossover">SUV/Crossover</Option>
            <Option value="Van/Minivan">Van/Minivan</Option>
            <Option value="Truck">Truck</Option>
            <Option value="Hatchback">Hatchback</Option>
            <Option value="Wagon">Wagon</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="color" label="Color">
          <Input placeholder="e.g. Pearl White" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Form.Item name="vin" label="Chassis Number">
          <Input placeholder="e.g. ZVW50-1234567" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="auctionGrade" label="Auction Grade">
          <Input placeholder="e.g. 4.5" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="condition" label="Condition">
          <Select placeholder="Select" allowClear>
            <Option value="New">New</Option>
            <Option value="Reconditioned">Reconditioned</Option>
            <Option value="Local Used">Local Used</Option>
            <Option value="Pre Owned">Pre Owned</Option>
            <Option value="Used">Used</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

export default VehicleDetailsSection;
