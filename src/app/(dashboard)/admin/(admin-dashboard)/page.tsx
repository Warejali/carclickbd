import AdminBoardHome from "@/components/dashboardlayout/adminBoardHome/Page";
import AdminProtect from "@/components/shared/protectors/AdminProtect";
import React from "react";

const HomePage = () => {
  return (
    <AdminProtect>
    <AdminBoardHome />
    </AdminProtect>
  );
};

export default HomePage;
