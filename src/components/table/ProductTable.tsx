import { Space, Popconfirm, Tag, Avatar, Tooltip, Menu, Dropdown } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useState } from "react";
import { message, Row, Col, Modal, Button, Table, Card, Input } from "antd";
import {
  useDeleteProductMutation,
  useToggleProducrtStatusMutation,
  useToggleProductFeaturedMutation,
} from "@/Redux/api/productApi";
import { IProduct } from "@/Interface/product";
import StatsCard from "./StatsCard";
import useBiddingTimer from "@/hooks/useBiddingTimer";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  CloudDownloadOutlined,
  EyeOutlined,
  StarOutlined,
  StarFilled,
  EllipsisOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { RiAuctionLine } from "react-icons/ri";
import ProductDetailsModal from "../Modal/ProductDetailsModal";
import ProductCommentModal from "../Modal/ProductCommentModal";
import BidModal from "../Modal/BidModal";

const { confirm } = Modal;

interface ProductTableProps {
  products: IProduct[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };

  onChange: (pagination: any) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  pagination,

  onChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchText, setSearchText] = useState("");
  const [deleteProduct] = useDeleteProductMutation();
  const [toggleProductStatus] = useToggleProducrtStatusMutation();
  const [toggleProductFeatured] = useToggleProductFeaturedMutation();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const handleToggleStatus = async (product: IProduct) => {
    if (!product._id) {
      message.error("Invalid user ID");
      return;
    }

    try {
      await toggleProductStatus({ id: product._id }).unwrap();

      message.success(
        `Product ${product.isDraft ? "disabled" : "enabled"} successfully`
      );
    } catch (error) {
      message.error("Failed to update user status");
    }
  };

  const handleToggleFeatured = async (product: IProduct) => {
    if (!product._id) {
      message.error("Invalid user ID");
      return;
    }

    try {
      await toggleProductFeatured({ id: product._id }).unwrap();

      message.success(
        `Product ${product.isFeatured ? "Unfeatured" : "Featured"} successfully`
      );
    } catch (error) {
      message.error("Failed to update user status");
    }
  };

  const AuctionEndCell: React.FC<{ endBid?: string }> = ({ endBid }) => {
    const { timeRemaining, isCritical, daysLeft } = useBiddingTimer(
      endBid || ""
    );

    if (!endBid) return <span>N/A</span>;

    return (
      <span>
        {dayjs(endBid).format("MMM D, YYYY HH:mm")}
        <span
          className={`${isCritical ? "text-red-500 text-xs px-2" : " text-green-500 text-xs px-2"}`}
        >
          ({daysLeft || timeRemaining})
        </span>
      </span>
    );
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Title",
      key: "image_title",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (_, record) => (
        <Space>
          <Avatar
            shape="square"
            size={32}
            src={record.photos?.mainPhoto || "/placeholder.png"}
            alt={record.title}
          />
          <span>{record.title || "No name"}</span>
        </Space>
      ),
      filterMode: "tree",
      filterSearch: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      title: "Highest Bid",
      dataIndex: "highestBid",
      key: "highestBid",
      sorter: (a: IProduct, b: IProduct) =>
        (a.highestBid || 0) - (b.highestBid || 0),
      render: (highestBid) => (
        <span>${highestBid ? highestBid?.toLocaleString() : "0"}</span>
      ),
    },
    {
      title: "Auction End",
      key: "endBid",
      responsive: ["md", "lg", "xl"],
      render: (_, record) => {
        const endBid = record?.endBid;

        // Ensure endBid is either a string or undefined
        const formattedEndBid = endBid ? String(endBid) : undefined;

        return <AuctionEndCell endBid={formattedEndBid} />;
      },
      sorter: (a, b) => {
        const endBidA = a?.endBid;
        const endBidB = b?.endBid;

        if (!endBidA || !endBidB) return 0;
        return dayjs(endBidA).isBefore(dayjs(endBidB)) ? -1 : 1;
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md", "lg", "xl"],
      render: (createdAt) => (
        <span>
          {createdAt ? dayjs(createdAt).format("MMM D, YYYY") : "N/A"}
        </span>
      ),
      sorter: (a, b) => {
        const createdA = a?.createdAt;
        const createdB = b?.createdAt;
        return dayjs(createdA).isBefore(dayjs(createdB)) ? -1 : 1;
      },
    },

    {
      title: "Status",
      dataIndex: "isDraft",
      key: "isDraft",
      render: (isDraft) => (
        <Tag color={isDraft ? "red" : "green"}>
          {isDraft ? "Offline" : "Online"}
        </Tag>
      ),
      filters: [
        { text: "Offline", value: true },
        { text: "Online", value: false },
      ],
      onFilter: (value, record) => record.isDraft === value,
    },

    {
      title: "Action",
      key: "action",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="toggle-status">
              <Popconfirm
                title={`Are you sure you want to ${record.isDraft ? "Featured" : "Unfeatured"} this product?`}
                onConfirm={() => handleToggleStatus(record)}
                okText="Yes"
                cancelText="No"
              >
                <div className="flex items-center">
                  {record.isDraft ? (
                    <UploadOutlined className="text-green-500 mr-2" />
                  ) : (
                    <CloudDownloadOutlined className="text-gray-500 mr-2" />
                  )}
                  {record.isDraft ? "Publish" : "Unpublish"}
                </div>
              </Popconfirm>
            </Menu.Item>
            <Menu.Item key="toggle-featured">
              <Popconfirm
                title={`Are you sure you want to ${record.isFeatured ? "Unfeature" : "Feature"} this product?`}
                onConfirm={() => handleToggleFeatured(record)}
                okText="Yes"
                cancelText="No"
              >
                <div className="flex items-center">
                  {record.isFeatured ? (
                    <StarFilled className="text-yellow-500 mr-2" />
                  ) : (
                    <StarOutlined className="text-gray-500 mr-2" />
                  )}
                  {record.isFeatured ? "Unfeature" : "Feature"}
                </div>
              </Popconfirm>
            </Menu.Item>
            <Menu.Item
              key="view"
              icon={<EyeOutlined className="text-gray-500" />}
              onClick={() => viewProduct(record)}
            >
              View
            </Menu.Item>
            <Menu.Item
              key="bids"
              icon={<RiAuctionLine className="text-blue-400" />}
              onClick={() => viewProductBids(record)}
            >
              Bids
            </Menu.Item>
            <Menu.Item
              key="comments"
              icon={<CommentOutlined className="text-blue-400" />}
              onClick={() => viewProductComments(record)}
            >
              Comments
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined className="text-red-600" />}
              danger
              onClick={() => deleteProductHandler(record)}
            >
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  // View Product
  const viewProduct = (record: IProduct) => {
    setSelectedProduct(record);
    setIsDetailsModalVisible(true);
  };

  const viewProductComments = (record: IProduct) => {
    setModalTitle(`Comments for ${record.title}`);
    setModalContent(<ProductCommentModal productId={record._id} />);
    setIsModalVisible(true);
  };


  const viewProductBids = (record: any) => {
    setModalTitle(`Bids for ${record.title}`);
    setModalContent(<BidModal productId={record._id} />);
    setIsModalVisible(true);
  };
  const deleteProductHandler = (record: any) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: `Product: ${record.title}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const productId = record._id;

        const hideLoadingMessage = message.loading("Deleting product...", 0);

        try {
          const res = await deleteProduct(productId).unwrap();

          if (res?.success || res?.status === "success") {
            message.success("Product deleted successfully");
          } else {
            message.error(
              res?.message || "Failed to delete the product. Please try again."
            );
          }
        } catch (error: any) {
          message.error(`Error: ${error.message}`);
        } finally {
          hideLoadingMessage();
        }
      },
      onCancel() {
        message.info("Deletion canceled");
      },
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-md rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="md:text-xl font-semibold text-gray-500">
            Active Products List
          </h1>
          <div className="w-full max-w-lg">
            <Input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-3 text-lg border rounded-lg"
            />
          </div>
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={6} xs={12} md={8} lg={6} className="mb-4">
          <StatsCard
            title="Total Products"
            value={products.length || 0}
            icon={<ShoppingCartOutlined />}
            bgColor="bg-white"
            textColor="text-green-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Active"
            value={0}
            icon={<CheckCircleOutlined />}
            bgColor="bg-white"
            textColor="text-blue-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Category"
            value={31}
            icon={<CheckCircleOutlined />}
            bgColor="bg-white"
            textColor="text-green-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Disabled"
            value={0}
            icon={<CloseCircleOutlined />}
            bgColor="bg-white"
            textColor="text-red-500"
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={products || []}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} products`,
        }}
        onChange={onChange}
        scroll={{ x: true }}
      />

<ProductDetailsModal
  visible={isDetailsModalVisible}
  onClose={() => setIsDetailsModalVisible(false)}
  product={selectedProduct}
/>

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default ProductTable;
