import React from "react";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface StatusTagProps {
  verified: boolean;
  type: "email" | "account";
}

const StatusTag: React.FC<StatusTagProps> = ({ verified, type }) => {
  return verified ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {type === "email" ? "Verified" : "Verified"}
    </Tag>
  ) : (
    <Tag icon={<CloseCircleOutlined />} color="error">
      Unverified
    </Tag>
  );
};

export default StatusTag;
