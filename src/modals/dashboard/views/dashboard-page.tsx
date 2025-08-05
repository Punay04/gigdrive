import React from "react";
import DashboardHeader from "../ui/dashboard-header";
import FoldersBox from "../ui/folders-box";

const DashboardPage = () => {
  return (
    <div className="h-screen bg-neutral-900 flex flex-col p-5">
      <DashboardHeader />
      <FoldersBox />
    </div>
  );
};

export default DashboardPage;
