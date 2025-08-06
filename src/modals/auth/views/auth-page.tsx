import React from "react";
import TelegramAuth from "../ui/telegram-auth";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md">
        <TelegramAuth />
      </div>
    </div>
  );
};

export default AuthPage;
