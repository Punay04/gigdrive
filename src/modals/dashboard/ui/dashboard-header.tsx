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
  const userData = useStore((state) => state.userData);
  const router = useRouter();
  return (
    <>
      <FolderDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl text-white">
          Welcome to <span className="font-bold text-red-300">GigDrive</span>{" "}
          {userData.name}
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
            className="text-black cursor-pointer"
            onClick={() => {
              logout();
              router.push("/auth");
            }}
            variant={"secondary"}
          >
            Log out
          </Button>
          <div className="w-10 h-10 rounded-full bg-neutral-800 text-red-300 font-bold text-xl flex justify-center items-center hover:bg-red-300 hover:text-black cursor-auto">
            {userData.name[0]}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
