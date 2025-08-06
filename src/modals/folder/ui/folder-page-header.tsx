"use client";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import React, { useRef } from "react";

const FolderPageHeader = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 border border-neutral-700/50 shadow-xl mb-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">
        Files in folder
      </h1>
      <div>
        <Button
          variant={"destructive"}
          className="flex flex-row text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          onClick={handleClick}
        >
          <UploadIcon className="w-5 h-5" />
          New File
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
