import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen justify-center items-center flex bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <LoaderCircleIcon className="animate-spin text-red-300" size={80} />
          <div className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-transparent rounded-full animate-pulse"></div>
        </div>
        <p className="text-white text-lg font-semibold tracking-tight">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
