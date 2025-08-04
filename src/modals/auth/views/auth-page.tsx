import React from "react";
import TelegramAuth from "../ui/telegram-auth";

const AuthPage = () => {
  return (
    <div className="bg-neutral-900 h-screen flex justify-center items-center">
      <div>
        <TelegramAuth />
      </div>
    </div>
  );
};

export default AuthPage;
