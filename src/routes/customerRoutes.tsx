import { IDNavMenuItem } from "@/Interface/content";
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
  CalendarOutlined,
  BellOutlined
} from "@ant-design/icons";
import { BiPurchaseTag } from "react-icons/bi";



const customerRoutes: IDNavMenuItem[] = ([
  { icon: <DashboardOutlined />, label: "Dashboard", route: "/customer" },
  { icon: <UserOutlined />, label: "Profile", route: "/customer/profile" },

  {
    icon: <FileTextOutlined />,
    label: "Inquiries",
    children: [
      { label: "My Inquiries", route: "/customer/bids" },
      { label: "Inquiry Archive", route: "/customer/bids/past-auction" },
    ],
  },
  { icon: <BiPurchaseTag />, label: "Orders", route: "/customer/order" },

  { icon: <CommentOutlined />, label: "Comment", route: "/customer/comment-history" },
  { icon: <BellOutlined />, label: "Notification", route: "/customer/notification" },
  { icon: <FileTextOutlined />, label: "Report", route: "/customer/report" },
  { icon: <FileTextOutlined />, label: "Membership", route: "/customer/membership" },
  { icon: <CalendarOutlined />, label: "Event", route: "/customer/event" },
  { icon: <BarChartOutlined />, label: "Support", route: "/customer/support" },

] as IDNavMenuItem[]).filter(Boolean);

export { customerRoutes };
