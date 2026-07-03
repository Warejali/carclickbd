import { IDNavMenuItem } from "@/Interface/content";
import {
  BarChartOutlined,
  BellOutlined,
  CarOutlined,
  CommentOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BiPurchaseTag } from "react-icons/bi";

const customerRoutes: IDNavMenuItem[] = [
  { icon: <DashboardOutlined />, label: "Dashboard", route: "/customer" },
  { icon: <UserOutlined />, label: "Profile", route: "/customer/profile" },
  { icon: <CarOutlined />, label: "Browse Cars", route: "/cars" },
  {
    icon: <CommentOutlined />,
    label: "Inquiries",
    children: [
      { label: "My Inquiries", route: "/customer/bids" },
      { label: "Inquiry Archive", route: "/customer/bids/past-auction" },
    ],
  },
  {
    icon: <HeartOutlined />,
    label: "Saved & Cart",
    children: [
      { label: "Saved Cars", route: "/customer/cart" },
      { label: "Cart", route: "/customer/cart" },
    ],
  },
  { icon: <BiPurchaseTag />, label: "Orders", route: "/customer/order" },
  { icon: <FileProtectOutlined />, label: "Membership", route: "/customer/membership" },
  { icon: <BellOutlined />, label: "Notifications", route: "/customer/notification" },
  { icon: <BarChartOutlined />, label: "Activity Report", route: "/customer/report" },
  { icon: <QuestionCircleOutlined />, label: "Support", route: "/customer/support" },
];

export { customerRoutes };
