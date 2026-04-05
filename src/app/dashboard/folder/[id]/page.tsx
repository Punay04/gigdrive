"use client";
import FolderPage from "@/modals/folder/views/folder-page";
import { usePathname } from "next/navigation";
import React from "react";

const Folder = () => {
  const pathName = usePathname();
  const folderId = pathName.split("/").pop();

  return (
    <div>
      <FolderPage folderId={Number(folderId)} />
    </div>
  );
};

export default Folder;
