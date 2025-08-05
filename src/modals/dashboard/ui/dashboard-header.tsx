"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import FolderDialog from "./create-folder-dialog";
import { PlusIcon } from "lucide-react";
import { useStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const [open, setOpen] = React.useState(false);
  const logout = useStore((state) => state.logout);
  const router = useRouter();
  return (
    <>
      <FolderDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl text-white">
          Welcome to <span className="font-bold text-red-300">GigDrive</span>
        </h1>
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => setOpen(true)}
            variant={"destructive"}
            className="text-black cursor-pointer"
          >
            <PlusIcon />
            New Folder
          </Button>
          <Button
            onClick={() => {
              logout();
              router.push("/auth");
            }}
            variant={"secondary"}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
