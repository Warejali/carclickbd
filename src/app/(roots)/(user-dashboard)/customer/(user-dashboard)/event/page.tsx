"use client";
import React, { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Tag,
  Switch,
  Space,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface AuctionEvent {
  key: string;
  eventName: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
}

const initialEvents: AuctionEvent[] = [
  {
    key: "1",
    eventName: "Vintage Car Auction",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    status: "Active",
  },
  {
    key: "2",
    eventName: "Luxury Watches Auction",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    status: "Inactive",
  },
  {
    key: "3",
    eventName: "Luxury Watches Auction",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    status: "Inactive",
  },
  {
    key: "4",
    eventName: "Luxury Watches Auction",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    status: "Inactive",
  },
];

const AuctionEventPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [auctionEvents, setAuctionEvents] =
    useState<AuctionEvent[]>(initialEvents);
  const [searchText, setSearchText] = useState("");
  const [editingEvent, setEditingEvent] = useState<AuctionEvent | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (record: AuctionEvent) => {
    setEditingEvent({
      ...record,
      startDate: dayjs(record.startDate).toISOString(),
      endDate: dayjs(record.endDate).toISOString(),
    });
    setIsEditModalVisible(true);
  };

  const handleOk = (values: any) => {
    const newEvent: AuctionEvent = {
      key: (auctionEvents.length + 1).toString(),
      eventName: values.eventName,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
      status: "Inactive",
    };
    setAuctionEvents([...auctionEvents, newEvent]);
    setIsModalVisible(false);
  };

  const handleEditOk = (values: any) => {
    setAuctionEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.key === editingEvent?.key
          ? {
              ...event,
              eventName: values.eventName,
              startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
              endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
            }
          : event
      )
    );
    setIsEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  const toggleStatus = (key: string) => {
    setAuctionEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.key === key
          ? {
              ...event,
              status: event.status === "Active" ? "Inactive" : "Active",
            }
          : event
      )
    );
  };

  const deleteEvent = (key: string) => {
    setAuctionEvents((prevEvents) =>
      prevEvents.filter((event) => event.key !== key)
    );
  };

  const filteredEvents = auctionEvents.filter((event) =>
    event.eventName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<AuctionEvent> = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },

  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Auction Event Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredEvents}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title="Create Auction Event"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Auction Event"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleEditOk}
          initialValues={
            editingEvent
              ? {
                  ...editingEvent,
                  startDate: dayjs(editingEvent.startDate),
                  endDate: dayjs(editingEvent.endDate),
                }
              : {}
          }
        >
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuctionEventPage;
