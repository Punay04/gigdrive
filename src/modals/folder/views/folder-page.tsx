import React from "react";
import FolderPageHeader from "../ui/folder-page-header";

const FolderPage = (folderId: { folderId: number }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 flex flex-col">
      <FolderPageHeader />
    </div>
  );
};

export default FolderPage;
