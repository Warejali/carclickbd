import React from "react";
import { Space, Tag, Button, Popconfirm, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IUser } from "@/Interface/user";
import { useRouter } from "next/navigation";

export const useUserColumns = (
  onDelete: (id: string) => void,
): ColumnsType<IUser> => {
  const router = useRouter();

  return [
    {
      title: "User",
      key: "name",
      render: (record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact",
      dataIndex: "contactNo",
      key: "contactNo",
      render: (contactNo) => contactNo || "N/A",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      filters: [
        { text: "Personal", value: "personal" },
        { text: "Business", value: "business" },
      ],
      render: (type) => (
        <Tag color={type === "business" ? "blue" : "green"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Membership",
      dataIndex: "membership",
      key: "membership",
      filters: [
        { text: "Free", value: "free" },
        { text: "Premium", value: "premium" },
      ],
      render: (membership) => (
        <Tag color={membership === "premium" ? "gold" : "default"}>
          {membership.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Verification",
      key: "verification",
      render: (record) => (
        <Space>
          <Tag color={record.isEmailVerified ? "green" : "red"}>
            {record.isEmailVerified ? "Email Verified" : "Email Unverified"}
          </Tag>
          {record.isVerified !== undefined && (
            <Tag color={record.isVerified ? "green" : "red"}>
              {record.isVerified ? "Verified" : "Unverified"}
            </Tag>
          )}
        </Space>
      ),
      filters: [
        { text: "Email Verified", value: "emailVerified" },
        { text: "Email Unverified", value: "emailUnverified" },
        { text: "Account Verified", value: "verified" },
        { text: "Account Unverified", value: "unverified" },
      ],
      onFilter: (value, record) => {
        switch (value) {
          case "emailVerified":
            return !!record.isEmailVerified;
          case "emailUnverified":
            return !record.isEmailVerified;
          case "verified":
            return !!record.isVerified;
          case "unverified":
            return record.isVerified === false;
          default:
            return false;
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => router.push(`/users/${record._id}`)}
          >
            View Details
          </Button>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            onConfirm={() => record._id && onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
