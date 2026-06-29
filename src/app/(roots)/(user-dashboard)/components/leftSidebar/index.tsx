"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IDNavMenuItem } from "@/Interface/content";
import { setLogOut } from "@/Redux/Slices/authSlice";
import { sidebarToggle } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import LeftSidebarDropdown from "./leftSidebarDropdown";


interface ISidebarProps {
  menuGroups: IDNavMenuItem[];
}

const LeftSidebar: React.FC<ISidebarProps> = ({ menuGroups = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(
    (state) => state.layoutReducer.isOpenSideBar
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  const handleLogOut = () => {
    dispatch(setLogOut());
    router.push("/");
  };

  return (
    <aside
      className={`${
        isSidebarOpen
          ? "w-[14rem]"
          : "md:w-[5rem] opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100"
      } !transition-all !ease-in-out !duration-300 h-full absolute md:sticky top-0 left-0 z-[9999999999] text-[1rem] 
   bg-white`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center flex-col  justify-center gap-2   w-full">
        <button
          className="  text-3xl top-4 lg:hidden p-5"
          onClick={() => dispatch(sidebarToggle())}
        >
          {isSidebarOpen ? (
            <span>
              <HiArrowLongLeft />
            </span>
          ) : (
            <span className="md:block hidden">
              <CgMenuLeft />
            </span>
          )}
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto h-[calc(100vh-130px)] duration-300 ease-linear">
        <section className="mt-2   px-4 py-4 lg:mt-9 lg:px-6">
          <nav className="space-y-4">
            {menuGroups?.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.children ? (
                  <LeftSidebarDropdown
                    isSidebarOpen={isSidebarOpen}
                    icon={group.icon}
                    label={group.label}
                    isOpen={activeDropdown === group.label}
                    onToggle={() => handleDropdownToggle(group.label)}
                    onItemClick={() => {
                      if (window.innerWidth < 768) {
                        dispatch(sidebarToggle());
                      }
                    }}
                  >
                    {group.children}
                  </LeftSidebarDropdown>
                ) : (
                  <Link
                    className="flex items-center text-sm text-nowrap gap-2 px-3 py-1.5 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
                    href={group.route || "/"}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        dispatch(sidebarToggle());
                      }
                    }}
                  >
                    <span className={`${!isSidebarOpen && "text-xl"}`}>
                      {group.icon && group.icon}
                    </span>
                    <span className={`${!isSidebarOpen && "hidden"}`}>
                      {group.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}

            <button
              onClick={handleLogOut}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <span className={`${!isSidebarOpen ? "text-[22px]" : ""}`}>
                  <TbLogout className="text-[#f0b90b]" />
                </span>
                <span
                  className={`${!isSidebarOpen ? "hidden" : "text-sm text-nowrap font-bold"}`}
                >
                  Logout
                </span>
              </div>
            </button>
          </nav>
        </section>
      </div>
    </aside>
  );
};

export default LeftSidebar;
