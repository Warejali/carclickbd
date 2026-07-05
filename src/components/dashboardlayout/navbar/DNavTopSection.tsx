"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setOpenLeftSidebar } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { IoGlobeOutline } from "react-icons/io5";
import { Dropdown, Menu, Tooltip, Button } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import NavProfile from "./DNavPrfile";
import ScreenMode from "./ScreenMode";
import Image from "next/image";
import flag from "../../../../public/usa flag.png";
import Link from "next/link";
import { getTokenInfo } from "@/service/auth.service";
import { useMemo } from "react";
import NotificationDropdown from "@/components/notifications/NavNotification";

const languageMenu = (
  <Menu>
    <Menu.Item key="en">English</Menu.Item>
    <Menu.Item key="bn">বাংলা</Menu.Item>
  </Menu>
);

const notificationMenu = (
  <Menu>
    <Menu.Item key="1">New message received</Menu.Item>
    <Menu.Item key="2">Server maintenance scheduled</Menu.Item>
    <Menu.Item key="3">Update available</Menu.Item>
  </Menu>
);

const NavTopSection = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.layoutReducer.isOpenSideBar);
  const layoutState = useAppSelector(
    (state) => state.layoutReducer.layoutState
  );

  // Memoized user role
  const user = useMemo(() => getTokenInfo(), []);
  const userRole = user?.role;

  // Role-based Add New Menu
  const addNewMenu = (
    <Menu style={{ padding: "20px 30px" }}>
      {(userRole === "super-admin" || userRole === "admin") && (
        <>
          <Menu.Item key="category">
            <Link href="/admin/category">
              <PlusOutlined /> Create Category
            </Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link href="/admin/user/create-customer">
              <PlusOutlined /> Create User
            </Link>
          </Menu.Item>
        </>
      )}
      {userRole === "super-admin" && (
        <Menu.Item key="admin">
          <Link href="/admin/create-admin">
            <PlusOutlined /> Create Admin
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="product">
        <Link href="/admin/product/create-product">
          <PlusOutlined /> Create Product
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full px-5 flex items-center justify-between py-1 bg-blue-100 z-[999999]">
      <section className="h-full flex items-center gap-6 mr-2">
        <Tooltip title="Toggle Sidebar">
          <button
            className={`text-3xl sm:block md:hidden lg:block ${layoutState && "lg:hidden"}`}
            onClick={() => dispatch(setOpenLeftSidebar())}
          >
            {isOpen ? (
              <CgMenuRight className="text-gray-500" />
            ) : (
              <CgMenuLeft className="text-gray-500" />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Browse Website">
          <Link href="/">
            <IoGlobeOutline className="text-2xl text-gray-500 cursor-pointer bg-slate-300 rounded-full p-1" />
          </Link>
        </Tooltip>
      </section>

      <section className="flex items-center gap-4">
        {(userRole === "super-admin" ||
          userRole === "admin" ||
          userRole === "seller") && (
          <Dropdown
            overlay={addNewMenu}
            placement="bottomCenter"
            arrow
            trigger={["click"]}
          >
            <Tooltip title="Add New">
              <Button className="text-gray-500 rounded-full px-4 py-2 flex items-center gap-2">
                Add New <PlusOutlined />
              </Button>
            </Tooltip>
          </Dropdown>
        )}

<NotificationDropdown />

        <Dropdown
          overlay={languageMenu}
          placement="bottomRight"
          arrow
          trigger={["click"]}
        >
          <Tooltip title="Change Language">
            <button className="text-gray-600 px-3 py-4 border hover:bg-gray-200 bg-slate-300 rounded-full">
              <Image src={flag} alt="USA Flag" width={24} height={24} />
            </button>
          </Tooltip>
        </Dropdown>

        <ScreenMode />
        <NavProfile />
      </section>
    </div>
  );
};

export default NavTopSection;
