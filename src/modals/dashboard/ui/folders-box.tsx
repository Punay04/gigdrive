"use client";
import { useStore } from "@/zustand/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Folder, MoreVertical, Calendar, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

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
  }, [userId]);

  const router = useRouter();

  const handleFolderClick = (folder: any) => {
    router.push(`/dashboard/folder/${folder.id}`);
  };

  return (
    <div className="flex flex-col gap-6 mt-6 h-full mx-6 mb-6 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-300/20 to-red-200/20 flex items-center justify-center">
            <Folder className="w-6 h-6 text-red-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Your Folders</h1>
            <p className="text-neutral-400 text-sm">
              {folders.length} folder{folders.length !== 1 ? "s" : ""} •
              Organize your files
            </p>
          </div>
        </div>
      </div>

      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-300/10 to-red-200/10 flex items-center justify-center mb-4">
            <Folder className="w-10 h-10 text-red-300/50" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No folders yet
          </h3>
          <p className="text-neutral-400 text-sm max-w-md">
            Create your first folder to start organizing your files and
            documents
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder: any, index: number) => (
            <div
              key={index}
              onClick={() => handleFolderClick(folder)}
              className="group bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-red-300/30 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-300/20 to-red-200/20 flex items-center justify-center group-hover:from-red-300/30 group-hover:to-red-200/30 transition-all duration-300">
                  <Folder className="w-6 h-6 text-red-300" />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-lg hover:bg-neutral-600/50">
                  <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white text-lg group-hover:text-red-300 transition-colors duration-300 cursor-pointer">
                  {folder.name}
                </h3>

                <p className="text-neutral-400 text-sm line-clamp-2">
                  {folder.description || "No description provided"}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-600/30">
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(folder.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-neutral-500">
                    <FileText className="w-3 h-3" />
                    <span>0 files</span>
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
