import { useStore } from "@/zustand/store";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  HardDrive,
  TrashIcon,
  Search,
  RefreshCwIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FilesBox = ({ folderId }: { folderId: number }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [viewFiles, setViewFiles] = useState<any[]>([]);
  const userId = useStore((state) => state.userData.telegramId);

  const getFiles = async () => {
    const res = await axios.post("/api/getFiles", {
      folderId: folderId,
      userId,
    });
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getFiles();
        setFiles(data.files || []);
        setViewFiles(data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (folderId && userId) {
      fetchFiles();
    }
  }, [folderId, userId]);

  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDeleteFile = async (fileId: number) => {
    try {
      await axios.post("/api/deleteFile", {
        fileId,
      });
      const data = await getFiles();
      setFiles(data.files || []);
      setViewFiles(data.files || []);
      toast("File Deleted")
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleChange = (input: string) => {
    const value = input.trim().toLowerCase();

    if (value === "") {
      setViewFiles(files);
      return;
    }

    setViewFiles(
      files.filter((file) => file.fileName.toLowerCase().startsWith(value))
    );
  };

  const handleRefresh = async () => {
    const data = await getFiles();
    setFiles(data.files || []);
    setViewFiles(data.files || []);
    toast("Files Refreshed");
  };

  return (
    <div className="flex flex-col gap-8 mt-6 h-full mx-6 mb-6 bg-gradient-to-br from-neutral-900/95 via-neutral-800/90 to-neutral-900/95 backdrop-blur-xl rounded-3xl p-10 border border-border/60 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-lg border border-red-300/25">
            <FileText className="w-7 h-7 text-red-300" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Files ({files.length})
            </h2>
            <p className="text-muted-foreground text-base mt-1">
              {files.length === 0
                ? "No files uploaded yet"
                : "Your uploaded files"}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <Input
                placeholder="Search files"
                className="mt-3 h-11 w-full sm:w-72 md:w-80 rounded-xl bg-neutral-900/60 border border-border/60 text-white placeholder:text-neutral-500 pl-10 pr-4 focus-visible:border-red-300/60 focus-visible:ring-red-300/30 focus-visible:ring-[3px] shadow-sm"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <Button
              onClick={handleRefresh}
              variant={"outline"}
              className="mt-3 h-11 w-11 sm:w-auto rounded-xl bg-neutral-900/60 border border-border/60 text-white hover:border-red-300/50 hover:bg-neutral-900/70 shadow-sm transition-colors flex items-center justify-center cursor-pointer"
            >
              <RefreshCwIcon className="w-4 h-4 text-red-300" />
            </Button>
          </div>
        </div>
      </div>
      {files.length === 0 || viewFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-red-300/20 via-red-300/15 to-red-200/10 flex items-center justify-center mb-8 shadow-xl border border-red-300/25">
            <FileText className="w-14 h-14 text-red-300/70" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
            No files yet
          </h3>
          <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
            Upload your first file to get started with file management
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {viewFiles.map((file: any) => (
            <div
              key={file.id}
              className="group relative bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-border/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-red-300/50 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-300/0 via-red-200/0 to-red-300/0 group-hover:from-red-300/10 group-hover:via-red-200/8 group-hover:to-red-300/10 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-300/30 via-red-300/25 to-red-200/20 flex items-center justify-center shadow-lg border border-red-300/25 group-hover:from-red-300/40 group-hover:via-red-300/35 group-hover:to-red-200/30 transition-all duration-500">
                    <FileText className="w-8 h-8 text-red-300" />
                  </div>
                  <Button
                    className="bg-red-300/40 hover:bg-red-300/20 cursor-pointer"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <TrashIcon className="w-6 h-6 text-white text-xl font-bold hover:text-red-300" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-foreground text-xl group-hover:text-red-300 transition-colors duration-500 tracking-tight line-clamp-1">
                    {file.fileName}
                  </h3>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <HardDrive className="w-4 h-4" />
                    <span className="font-medium">
                      {formatFileSize(file.fileSize)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-600/50">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {new Date(file.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <Link
                      className="flex items-center space-x-2 text-sm text-red-300 hover:text-red-400 transition-colors duration-300 font-medium hover:scale-105"
                      href={`https://api.telegram.org/file/bot${botToken}/${file.fileLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Link>
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

export default FilesBox;
