import React, { useRef } from "react";
import FolderPageHeader from "../ui/folder-page-header";
import FilesBox from "../ui/files-box";

const FolderPage = ({ folderId }: { folderId: number }) => {
  const filesBoxRef = useRef<any>(null);

  const handleUploadComplete = () => {
    filesBoxRef.current?.refetchFiles();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
      <FolderPageHeader
        onUploadComplete={handleUploadComplete}
        folderId={folderId}
      />
      <FilesBox folderId={folderId} />
    </div>
  );
};

export default FolderPage;
