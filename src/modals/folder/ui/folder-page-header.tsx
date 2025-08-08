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

    if (file.size > 50 * 1024 * 1024) {
      toast("File too large. Max limit is 50MB for Telegram uploads.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", String(folderId));
    formData.append("userId", String(userId));
    setUploading(true);

    try {
      const res = await axios.post("/api/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      setUploading(false);
      toast(`${data.message}`);
      onUploadComplete();
    } catch (error: any) {
      setUploading(false);
      const message =
        error.response?.data?.message || "Something went wrong while uploading";
      toast(message);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-gradient-to-r from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-border/60 shadow-xl mb-6 sm:mb-8">
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-lg border border-red-300/25">
          <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 text-red-300" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Files in folder
          </h1>
          <p className="text-muted-foreground text-base mt-1">
            Upload and manage your files
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          className={cn(
            "flex flex-row text-black px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer",
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
