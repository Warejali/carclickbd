import { IDNavMenuItem } from "@/Interface/content";
import {
  BarChartOutlined,
  BellOutlined,
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  MailOutlined,
  ShopOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BiPurchaseTag } from "react-icons/bi";

const sellerRoutes: IDNavMenuItem[] = [
  { icon: <DashboardOutlined />, label: "Seller Dashboard", route: "/seller" },
  { icon: <UserOutlined />, label: "Profile", route: "/seller/profile" },
  {
    icon: <ShopOutlined />,
    label: "Listings",
    children: [
      { label: "My Listings", route: "/seller/my-product" },
      { label: "Create Listing", route: "/seller/my-product/create-product" },
      { label: "Pending Approval", route: "/seller/my-product/disable-product" },
    ],
  },
  { icon: <StarOutlined />, label: "Featured Requests", route: "/seller/featured-requests" },
  { icon: <CommentOutlined />, label: "Buyer Inquiries", route: "/seller/comment-history" },
  { icon: <BiPurchaseTag />, label: "Orders", route: "/seller/order" },
  {
    icon: <FileTextOutlined />,
    label: "Reports",
    children: [
      { label: "Selling Report", route: "/seller/report/selling" },
      { label: "Earning Report", route: "/seller/report/earning" },
    ],
  },
  { icon: <BellOutlined />, label: "Notifications", route: "/seller/notification" },
  { icon: <MailOutlined />, label: "Mailbox", route: "/seller/mailbox" },
  { icon: <BarChartOutlined />, label: "Support", route: "/seller/support" },
];

export { sellerRoutes };
