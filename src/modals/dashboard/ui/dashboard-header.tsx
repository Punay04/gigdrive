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
      <div className="p-6 flex justify-between items-center bg-gradient-to-r from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl mx-6 mt-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome to{" "}
          <span className="font-bold bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
            GigDrive
          </span>{" "}
          <span className="text-red-300">{userData.name}</span>
        </h1>
        <div className="flex flex-row gap-4 items-center">
          <Button
            onClick={() => setOpen(true)}
            variant={"destructive"}
            className="text-black cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            New Folder
          </Button>
          <Button
            className="text-black cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              logout();
              router.push("/auth");
            }}
            variant={"secondary"}
          >
            Log out
          </Button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-300/25 via-red-300/20 to-red-200/15 text-red-300 font-bold text-xl flex justify-center items-center cursor-auto transition-all duration-300 shadow-lg border border-red-300/20">
            {userData.name[0]}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
