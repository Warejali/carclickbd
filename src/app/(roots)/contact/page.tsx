"use client";

import React from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Input, Button, Form, Modal } from "antd";
import { useSendMessageMutation } from "@/Redux/api/contactApi";
import { WhatsAppOutlined } from "@ant-design/icons";

export default function ContactUsPage() {
  const [form] = Form.useForm();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleFinish = async (values: any) => {
    try {
      await sendMessage(values).unwrap();
      Modal.success({
        title: "Message Sent!",
        content:
          "Thank you for contacting us. We will get back to you shortly.",
      });
      form.resetFields();
    } catch (error) {
      Modal.error({
        title: "Failed to Send",
        content: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <EnvironmentOutlined className="text-2xl text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Address</p>
              <p className="text-gray-600">Rogersville, AL 35652</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneOutlined className="text-2xl text-green-500" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Phone</p>
              <p className="text-gray-600">(256) 577-9901</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <WhatsAppOutlined className="text-2xl text-green-600" />
            <div>
              <p className="text-lg font-semibold text-gray-700">WhatsApp</p>
              <a
                href="https://wa.me/12565779901?text=Hello!%20I%20have%20a%20question%20about%20carclickbd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MailOutlined className="text-2xl text-red-500" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Email</p>
              <p className="text-gray-600">evalles35645@gmail.com</p>
            </div>
          </div>

          {/* Optional Google Map */}
          <iframe
            className="rounded-lg w-full h-64 border"
            src="https://maps.google.com/maps?q=Rogersville,%20AL%2035652&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="+1 (XXX) XXX-XXXX" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={5} placeholder="Write your message..." />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
