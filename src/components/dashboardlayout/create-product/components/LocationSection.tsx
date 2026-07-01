"use client";
import React from "react";
import { Card, Row, Col, Form, Input } from "antd";

const LocationSection = () => (
  <Card title="Location" className="shadow-md mb-4">
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Form.Item name={["location", "city"]} label="Location">
          <Input placeholder="e.g. Dhaka" />
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

export default LocationSection;
