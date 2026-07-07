import React from "react";
import { Card, Typography } from "antd";
import UpdateContactNo from "./UpdateContentNo";
import UpdateName from "./UpdateName";
import UpdateAddress from "./ModifyAddress";
import { IUser } from "@/Interface/user";
import { formatDate } from "@/components/shared/custom/FormatDate";

const { Title, Text } = Typography;

const ProfileInfo: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <Card className="w-full shadow-lg p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
      <Title level={3} className="text-center text-blue-700 mb-6">Profile Information</Title>
      <div className="space-y-5">
        {[
          { label: "Name", value: user?.name, Component: UpdateName },
          { label: "Email", value: user?.email || "N/A" },
          { label: "Address", value: user?.address || "N/A", Component: UpdateAddress },
          { label: "Contact", value: user?.contactNo, Component: UpdateContactNo },
          { label: "Role", value: user?.role },
          { label: "Joining Date", value: formatDate(user?.updatedAt as string) },
        ].map(({ label, value, Component }, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-white shadow-md border border-gray-200"
          >
            <Text className="font-semibold text-gray-600 text-md">{label}:</Text>
            <div className="flex items-center gap-3">
              <Text className="text-gray-800 font-medium text-md">{value}</Text>
              {Component && <Component />}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProfileInfo;
