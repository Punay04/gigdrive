import React from "react";
import TelegramAuth from "../ui/telegram-auth";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center p-6">
      <div className="mx-auto w-full max-w-md sm:max-w-lg">
        <TelegramAuth />
      </div>
    </div>
  );
};

export default AuthPage;
