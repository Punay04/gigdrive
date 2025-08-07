"use client";
import { useStore } from "@/zustand/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Folder, Calendar, FileText, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FoldersBox = () => {
  const [folders, setFolders] = useState([]);
  const userId = useStore((state) => state.userData.telegramId);
  console.log("userId:", userId);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.post("/api/getFolders", {
          userId,
        });
        const data = await res.data;
        console.log(data);
        setFolders(data.folders || []);
      } catch (error) {
        console.error("Error fetching folders:", error);
        setFolders([]);
      }
    };

    if (userId) {
      fetchFolders();
    }
  }, [userId, setFolders, folders]);

  const router = useRouter();

  const handleFolderClick = (folder: any) => {
    router.push(`/dashboard/folder/${folder.id}`);
  };

  const handleFolderDelete = async (folderName: string) => {
    const res = await axios.post("/api/deleteFolder", { folderName });
    const data = await res.data;
    toast(`${data.message}`);
  };

  return (
    <div className="flex flex-col gap-8 mt-6 h-full mx-6 mb-6 bg-gradient-to-br from-neutral-900/95 via-neutral-800/90 to-neutral-900/95 backdrop-blur-xl rounded-3xl p-10 border border-border/60 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-xl border border-red-300/25">
              <Folder className="w-8 h-8 text-red-300" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-300 to-red-400 rounded-full flex items-center justify-center shadow-lg border-2 border-neutral-900">
              <span className="text-sm font-bold text-black">
                {folders.length}
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Your Folders
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              {folders.length} folder{folders.length !== 1 ? "s" : ""} •
              Organize your files
            </p>
          </div>
        </div>
      </div>

      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-10">
            <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-red-300/20 via-red-300/15 to-red-200/10 flex items-center justify-center shadow-2xl border border-red-300/25">
              <Folder className="w-20 h-20 text-red-300/70" />
            </div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-red-300 to-red-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
              <span className="text-xl font-bold text-black">+</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
            No folders yet
          </h3>
          <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
            Create your first folder to start organizing your files and
            documents
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {folders.map((folder: any, index: number) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 backdrop-blur-xl rounded-3xl p-8 border border-border/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-red-300/50 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-300/0 via-red-200/0 to-red-300/0 group-hover:from-red-300/10 group-hover:via-red-200/8 group-hover:to-red-300/10 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-lg border border-red-300/25 group-hover:from-red-300/40 group-hover:via-red-300/35 group-hover:to-red-200/30 transition-all duration-500">
                    <Folder className="w-8 h-8 text-red-300" />
                  </div>
                  <button
                    className="duration-500 p-2 rounded-xl bg-red-300/30 hover:scale-110 cursor-pointer"
                    onClick={() => handleFolderDelete(folder.name)}
                  >
                    <TrashIcon className="text-red-300 " />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3
                    className="font-bold text-white text-xl group-hover:text-red-300 transition-colors duration-500 tracking-tight"
                    onClick={() => handleFolderClick(folder)}
                  >
                    {folder.name}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {folder.description || "No description provided"}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {new Date(folder.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">0 files</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoldersBox;
