import { IDNavMenuItem } from "@/Interface/content";
import HasAccess from "./RoleBasedRouteGenerator";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShopOutlined,
  FileTextOutlined,
  CommentOutlined,
  GiftOutlined,
  SettingOutlined,
  MailOutlined,
  BarChartOutlined,
  StockOutlined,
  DollarOutlined,
  NotificationOutlined,
  CustomerServiceOutlined,
  SafetyOutlined,
  CalendarOutlined,
  BellOutlined
} from "@ant-design/icons";
import { BiPurchaseTag } from "react-icons/bi";



const agentRoutes: IDNavMenuItem[] = ([
  { icon: <DashboardOutlined />, label: "Dashboard", route: "/admin" },
  { icon: <UserOutlined />, label: "Profile", route: "/admin/profile" },
  {
    icon: <TeamOutlined />,
    label: "Customers",
    children: [
      { label: "All Customers", route: "/admin/user" },
      { label: "Create Customer", route: "/admin/user/create-customer" },
    ],
  },
  {
    icon: <TeamOutlined />,
    label: "Sellers",
    children: [
      { label: "All Sellers", route: "/admin/seller" },
      { label: "Create Seller", route: "/admin/seller/create-seller" },
    ],
  },

  {
    icon: <ShopOutlined />,
    label: "All Product",
    children: [
      { label: "Product", route: "/admin/product" },
      { label: "Listing Approval", route: "/admin/product/past-auction" },
      { label: "Disable Product", route: "/admin/product/disable-product" },
    ],
  },
  {
    icon: <FileTextOutlined />,
    label: "My Product",
    children: [
      { label: "My-Product", route: "/admin/my-product" },
      { label: "Listing Approval", route: "/admin/my-product/past-auction" },
      { label: "Disable Product", route: "/admin/my-product/disable-product" },
      { label: "Create Product", route: "/admin/product/create-product" },
    ],
  },
  {
    icon: <FileTextOutlined />,
    label: "Leads",
    children: [
      { label: "Buyer Inquiries", route: "/admin/bids" },
      { label: "Lead Archive", route: "/admin/bids/past-auction" },
    ],
  },
  { icon: <BiPurchaseTag />, label: "Orders", route: "/admin/order" },

  {
    icon: <CommentOutlined />,
    label: "Comment",
    children: [
      { label: "All Comment", route: "/admin/comment-history" },
      { label: "My Comment", route: "/admin/comment-history" },
    ],
  },

  { icon: <BellOutlined />, label: "Notification", route: "/admin/notification" },
  { icon: <GiftOutlined />, label: "Offer", route: "/admin/offer" },
  { icon: <AppstoreOutlined />, label: "Category", route: "/admin/category" },
  { icon: <DollarOutlined />, label: "Refund", route: "/admin/refund" },
  {
    icon: <NotificationOutlined />,
    label: "Marketing",
    children: [
      { label: "Flash Deals", route: "/admin/marketing/flash-deals" },
      { label: "Dynamic Pop-up", route: "/admin/marketing/dynamic-pop-up" },
      { label: "Custom Alerts", route: "/admin/custom-alerts" },
      { label: "Email Templates", route: "/admin/email-template" },
      { label: "Newsletter", route: "/admin/newsletter" },
      { label: "Bulk SMS", route: "/admin/bulk-sms" },
    ],
  },
  {
    icon: <FileTextOutlined />,
    label: "Report",
    children: [
      { label: "Selling Report", route: "/admin/report/selling" },
      { label: "Earning Report", route: "/admin/report/earning" },
    ],
  },
  { icon: <StockOutlined />, label: "Stock", route: "/admin/stock" },
  { icon: <CalendarOutlined />, label: "Event", route: "/admin/event" },
  { icon: <MailOutlined />, label: "Mailbox", route: "/admin/mailbox" },
  { icon: <CustomerServiceOutlined />, label: "Support", route: "/admin/support" },
  { icon: <SettingOutlined />, label: "Settings", route: "/admin/settings" },
] as IDNavMenuItem[]).filter(Boolean);

export { agentRoutes };

