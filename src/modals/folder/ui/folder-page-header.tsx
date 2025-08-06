"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/zustand/store";
import axios from "axios";
import { LoaderIcon, UploadIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const FolderPageHeader = ({
  folderId,
  onUploadComplete,
}: {
  folderId: number;
  onUploadComplete: () => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const userId = useStore((state) => state.userData.telegramId);

  console.log(userId);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", String(folderId));
    formData.append("userId", String(userId));
    setUploading(true);

    const res = await axios.post("/api/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data.success) {
      setUploading(false);
      toast(`${res.data.message}`);
      return;
    }

    const data = await res.data;
    setUploading(false);
    toast(`${data.message}`);
    onUploadComplete();
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl rounded-3xl p-8 border border-neutral-700/60 shadow-xl mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-lg border border-red-300/25">
          <UploadIcon className="w-7 h-7 text-red-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Files in folder
          </h1>
          <p className="text-neutral-400 text-base mt-1">
            Upload and manage your files
          </p>
        </div>
      </div>
      <div>
        <Button
          variant={"destructive"}
          className={cn(
            "flex flex-row text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer",
            uploading && "pointer-events-none bg-red-300/80"
          )}
          onClick={handleClick}
        >
          {uploading ? (
            <div className="flex flex-row gap-3 justify-center items-center">
              <LoaderIcon className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-row gap-3 justify-center items-center">
              <UploadIcon className="w-5 h-5" />
              <span>Upload File</span>
            </div>
          )}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FolderPageHeader;
