"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { CiSettings } from "react-icons/ci";
import { IDNavMenuItem } from "@/Interface/content";
import { toggleLayoutSidebar } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import LeftSidebar from "@/components/dashboardlayout/sidebar/leftSidebar";
import DashBoardNav from "@/components/dashboardlayout/navbar";
import RightSidebar from "@/components/dashboardlayout/sidebar/rightSidebar";
import { getMenuContent } from "@/content/DNavigationMenu";
import RouteGuard from "@/shared/wrapper/RouteGuard";
import { getTokenInfo } from "@/service/auth.service";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector(
    (state) => state.layoutReducer.layoutState,
  );
  const tokenInfo = getTokenInfo()
  
  const navigationRoutes = getMenuContent(tokenInfo, dispatch);

  return (
    <>
      <RouteGuard>
        <div className="flex h-screen  overflow-hidden relative">
          <aside className={`${layoutState && "md:hidden"}`}>
            <LeftSidebar
              menuGroups={navigationRoutes as unknown as IDNavMenuItem[]}
            />
          </aside>
          <section className="w-full h-full overflow-hidden light-darkmode">
            <header>
              <DashBoardNav />
            </header>

            <main className=" bg-gray-200 light-darkmode md:p-5    h-[calc(100vh-55px)] overflow-y-auto ">
              <div className="  absolute bottom-10 right-10 bg-[#4396c7] h-12 w-12 rounded-full hidden md:flex items-center justify-center z-[999999999] ">
                <button
                  onClick={() => dispatch(toggleLayoutSidebar(true))}
                  className="text-white  text-3xl animate-spin  "
                >
                  <CiSettings />
                </button>
              </div>
              {children}
            </main>
          </section>

          <aside className="overflow-hidden  hidden md:block  ">
            <RightSidebar />
          </aside>
        </div>
      </RouteGuard>
    </>
  );
};

export default DashBoardLayout;
