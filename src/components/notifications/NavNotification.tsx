"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Dropdown, Badge, Card } from "antd";
import { AiOutlineBell } from "react-icons/ai";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useFormatTime from "@/hooks/useFormatTime";
import { useGetNotificationsQuery } from "@/Redux/api/notificationApi";
import { getTokenInfo } from "@/service/auth.service";
import { INotification } from "@/Interface/notification";

dayjs.extend(relativeTime);


interface MenuItem {
  key: string;
  label: React.ReactNode;
}

const NotificationDropdown: React.FC = () => {
  const { data: notifications = [], isLoading } = useGetNotificationsQuery({
    pollingInterval: 1000,
  });
  const { formatTime } = useFormatTime();

   const user = useMemo(() => getTokenInfo(), []);
    const userRole = user?.role;

  const [dropdownPlacement, setDropdownPlacement] = useState<"bottom" | "bottomCenter">("bottomCenter");
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0); // Force re-render every 30s to update relative time

  useEffect(() => {
    setMounted(true);

    const updatePlacement = () => {
      setDropdownPlacement(window.innerWidth <= 768 ? "bottom" : "bottomCenter");
    };

    const interval = setInterval(() => {
      setTick((prev) => prev + 1); // Re-render trigger
    }, 30000);

    updatePlacement();
    window.addEventListener("resize", updatePlacement);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updatePlacement);
    };
  }, []);

  if (!mounted || typeof window === "undefined") return null;
  const unreadCount: number = notifications.filter((n: INotification) => !n.isRead).length;
  const sortedNotifications: INotification[] = notifications
    .slice(0, 5);

  const menuItems: MenuItem[] = sortedNotifications.map((item: INotification) => ({
    key: item?._id?.toString(),
    label: (
      <Link
      href={`/${userRole === 'super-admin' ? 'admin' : userRole}/notification`}
        className="block py-2 px-3 hover:bg-gray-100 transition-all cursor-pointer"
      >
        <div>
          {!item.isRead ? (
            
            <Badge status="success">
              <NotificationCard message={item?.message || "No message"} time={formatTime(item?.createdAt || "")} isRead={item?.isRead || false} />
            </Badge>
          ) : (
            <NotificationCard message={item?.message || ""} time={formatTime(item?.createdAt || "")} isRead={item?.isRead || false} />
          )}
        </div>
      </Link>
    ),
  }));

  return (
    <div className="flex items-center space-x-3">
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement={dropdownPlacement}
      >
        <Badge size="small" count={unreadCount} overflowCount={9} className="cursor-pointer">
          <AiOutlineBell className="text-xl text-white lg:text-2xl transition-all duration-200" />
        </Badge>
      </Dropdown>
    </div>
  );
};


const NotificationCard: React.FC<{ message: string; time: string; isRead: boolean }> = ({
  message,
  time,
  isRead,
}) => (
  <div className="flex items-start space-x-2">
    {!isRead && (
      <span className="w-2 h-2 mt-1 rounded-full bg-green-500 flex-shrink-0" />
    )}
    <div>
      <p className="text-gray-600 pe-10">
        {message.length > 25 ? `${message.slice(0, 25)}...` : message}
      </p>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  </div>
);

export default NotificationDropdown;
