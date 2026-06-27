import { IDNavMenuItem } from "@/Interface/content";
import { RiAuctionLine } from "react-icons/ri";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  GiftOutlined,
  MailOutlined,
  BarChartOutlined,
  DollarOutlined,
  CalendarOutlined,
  BellOutlined
} from "@ant-design/icons";
import { BiPurchaseTag } from "react-icons/bi";

const sellerRoutes: IDNavMenuItem[] = ([
  { icon: <DashboardOutlined />, label: "Dashboard", route: "/admin" },
  { icon: <UserOutlined />, label: "Profile", route: "/seller/profile" },

  {
    icon: <FileTextOutlined />,
    label: "Product",
    children: [
      { label: "My-Product", route: "/seller/my-product" },
      { label: "Past Auctions", route: "/seller/my-product/past-auction" },
      { label: "Disable Product", route: "/seller/my-product/disable-product" },
      { label: "Create Product", route: "/seller/my-product/create-product" },
    ],
  },
  {
    icon: <RiAuctionLine />,
    label: "Bid",
    children: [
      { label: "Bid", route: "/seller/bid" },
      { label: "My Bid", route: "/seller/bid/my-bid" },
      { label: "Past Auctions", route: "/seller/bid/past-auction" },
    ],
  },
  { icon: <BiPurchaseTag />, label: "Orders", route: "/seller/order" },
  { icon: <UserOutlined />, label: "Membership", route: "/seller/membership" },

  {
    icon: <CommentOutlined />,
    label: "Comment",
    children: [
      { label: "All Comment", route: "/seller/comment-history" },
      { label: "My Comment", route: "/seller/my-comment" },
    ],
  },

  { icon: <BellOutlined />, label: "Notification", route: "/seller/notification" },
  { icon: <GiftOutlined />, label: "Offer", route: "/seller/offer" },
  { icon: <DollarOutlined />, label: "Refund", route: "/seller/refund" },

  {
    icon: <FileTextOutlined />,
    label: "Report",
    children: [
      { label: "Earning Report", route: "/seller/report/earning" },
      { label: "Selling Report", route: "/seller/report/selling" },
    ],
  },
  { icon: <CalendarOutlined />, label: "Event", route: "/seller/event" },
  { icon: <MailOutlined />, label: "Mailbox", route: "/seller/mailbox" },
  { icon: <BarChartOutlined />, label: "Support", route: "/seller/support" },
 
] as IDNavMenuItem[]).filter(Boolean);

export { sellerRoutes };