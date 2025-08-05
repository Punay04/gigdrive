import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen justify-center items-center flex bg-neutral-900">
      <LoaderCircleIcon className="animate-spin text-white" size={80} />
    </div>
  );
};

export default Loading;
