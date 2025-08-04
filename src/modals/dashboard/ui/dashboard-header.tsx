"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import FolderDialog from "./create-folder-dialog";

const DashboardHeader = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <FolderDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl text-white">
          Welcome to <span className="font-bold text-red-300">GigDrive</span>
        </h1>
        <Button
          onClick={() => setOpen(true)}
          variant={"destructive"}
          className="text-black cursor-pointer"
        >
          New Folder
        </Button>
      </div>
    </>
  );
};

export default DashboardHeader;
