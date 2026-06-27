import { Modal, Avatar, Descriptions, Tag, Space, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IUser } from "@/Interface/user";

const { Title, Text } = Typography;

interface UserDetailsModalProps {
  isVisible: boolean;
  user: IUser | null;
  onClose: () => void;
}

const getTagColor = (value: boolean | string | undefined, type: "status" | "role") => {
  if (type === "status") {
    return value ? "green" : "red";
  }

  switch (value) {
    case "super-admin":
      return "volcano";
    case "admin":
      return "geekblue";
    case "seller":
      return "blue";
    case "customer":
      return "cyan";
    default:
      return "default";
  }
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isVisible,
  user,
  onClose,
}) => {
  return (
    <Modal
      title={<Title level={4} className="mb-0">User Details</Title>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      {user && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <Avatar
              size={72}
              src={user.profilePhoto}
              icon={<UserOutlined />}
            />
            <div>
              <Title level={5} className="mb-1">{user.name || "Unnamed User"}</Title>
              <Space>
                <Tag color={getTagColor(user.role, "role")}>{user.role || "N/A"}</Tag>
                {user.accountType && (
                  <Tag color="gold">{user.accountType}</Tag>
                )}
              </Space>
            </div>
          </div>

          <Divider orientation="left">Contact Info</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Email">
              {user.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact Number">
              {user.contactNo || "N/A"}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Account Details</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
            <Descriptions.Item label="Membership">
              {user.membership || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Total Products">
              {user.totalProduct ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email Verified">
              <Tag color={getTagColor(user.isEmailVerified, "status")}>
                {user.isEmailVerified ? "Verified" : "Unverified"}
              </Tag>
            </Descriptions.Item>
            {user.isVerified !== undefined && (
              <Descriptions.Item label="Account Verified">
                <Tag color={getTagColor(user.isVerified, "status")}>
                  {user.isVerified ? "Verified" : "Unverified"}
                </Tag>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Last Updated">
              {new Date(user.updatedAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
