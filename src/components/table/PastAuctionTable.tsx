import { Space, Popconfirm, Tag, Avatar, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import BidHistory from "@/components/bid/BidHistory";
import { RiAuctionLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import React, { useState } from "react";
import { message, Row, Col, Modal, Button, Table, Card, Input, Flex } from "antd";
import {useDeleteProductMutation} from "@/Redux/api/productApi";
import { IProduct } from "@/Interface/product";
import { IoEye } from "react-icons/io5";
import useBiddingTimer from "@/hooks/useBiddingTimer";

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

const PastAuctionTable: React.FC<ProductTableProps> = ({
  products,
  pagination,

  onChange,
}) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [searchText, setSearchText] = useState("");
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  
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
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            variant="filled"
            color="default"
            size="small"
            onClick={() => viewProduct(record)}
          >
            <Tooltip title="View Product detail" color="gray">
              <IoEye className="text-gray-500 hover:text-gray-800 cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110" />
            </Tooltip>
          </Button>

          <Button
            variant="filled"
            color="primary"
            size="small"
            onClick={() => viewProductBids(record)}
          >
            <Tooltip title="View Bids" color="blue">
              <RiAuctionLine className="text-blue-400 hover:text-blue-800 cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110" />
            </Tooltip>
          </Button>

          <Popconfirm
            title="Delete user"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            description="Are you sure you want to delete this product?"
            onConfirm={() => record._id && deleteProductHandler(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="filled" color="danger" size="small">
              <Tooltip title="Delete Product" color="red">
                <MdOutlineDelete className="text-red-600 hover:text-red-400 cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-110" />
              </Tooltip>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };



  const deleteProductHandler = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product");
    }
  };


  const deleteSelectedProducts = async () => {
    confirm({
      title: "Are you sure you want to delete selected products?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await Promise.all(
            selectedRowKeys.map((id) => deleteProduct(id).unwrap())
          );
          message.success("Selected products deleted successfully");
          setSelectedRowKeys([]);
        } catch (error) {
          message.error("Failed to delete selected products");
        }
      },
    });
  };


  const viewProduct = (record: any) => {
    router.push(`/admin/product/${record._id}`);
  };
  const viewProductBids = (record: any) => {
    setModalTitle(`Bids for ${record.title}`);
    setModalContent(<BidHistory productId={record._id} />);
    setIsModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
          className={`${isCritical ? "text-red-500 font-bold px-2" : " text-green-500 font-bold px-2"}`}
        >
          ({daysLeft || timeRemaining})
        </span>
      </span>
    );
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  const FilterProducts = products?.filter(
    (product: IProduct) =>
      product.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.highestBid?.toString().includes(searchText)
  );

  return (
    <div className="space-y-4">
      <Card className="shadow-md rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-gray-500">
            Past Auction
          </h1>
          <div className="w-full max-w-lg">
            <Input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="lg:w-full p-3 text-lg border rounded-lg"
            />
          </div>
        </div>
      </Card>
      <Row gutter={16}>
        {/* <Col span={6} xs={12} md={8} lg={6} className="mb-4">
          <StatsCard
            title="Total Products"
            value={products.length || 0}
            icon={<FaShoppingCart />}
            bgColor="bg-white"
            textColor="text-green-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Active"
            value={onlineProduct}
            icon={<FaCheckCircle />}
            bgColor="bg-white"
            textColor="text-blue-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Category"
            value={31}
            icon={<FaCheckCircle />}
            bgColor="bg-white"
            textColor="text-green-500"
          />
        </Col>
        <Col span={6} xs={12} md={8} lg={6}>
          <StatsCard
            title="Total Disabled"
            value={disabledProduct}
            icon={<FaTimesCircle />}
            bgColor="bg-white"
            textColor="text-red-500"
          />
        </Col> */}
        <div className="flex justify-between items-center">
        <div>
          <Flex gap="middle" align="center">
            <Button
              type="primary"
              onClick={start}
              disabled={!selectedRowKeys.length}
              loading={loading}
            >
              Reload
            </Button>
            <Button
              type="primary"
              danger
              onClick={deleteSelectedProducts}
              disabled={!selectedRowKeys.length}
            >
              Delete Selected
            </Button>
            {selectedRowKeys.length > 0
              ? `Selected ${selectedRowKeys.length} items`
              : null}
          </Flex>
        </div>
      </div>
      </Row>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={FilterProducts || []}
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

export default PastAuctionTable;
