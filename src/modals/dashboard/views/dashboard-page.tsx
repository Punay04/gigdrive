import React from "react";
import DashboardHeader from "../ui/dashboard-header";
import FoldersBox from "../ui/folders-box";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col px-4 py-6 sm:px-6 lg:px-8">
      <DashboardHeader />
      <FoldersBox />
    </div>
  );
};

export default DashboardPage;
