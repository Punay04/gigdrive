"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/zustand/store";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const TelegramAuth = () => {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const setUserData = useStore((state) => state.setUserData);
  const [isLoading, setIsLoading] = useState(false);

  const TelegramLoginButton = dynamic(
    () => import("@telegram-auth/react").then((mod) => mod.LoginButton),
    { ssr: false }
  );

  return (
    <>
      <div className="bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 backdrop-blur-xl w-full p-8 sm:p-10 rounded-3xl text-white flex flex-col justify-center items-center gap-6 border border-border/60 shadow-2xl">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Let us get started with{" "}
          <span className="font-bold text-red-300 bg-gradient-to-r from-red-300 to-red-400 bg-clip-text underline underline-offset-4">
            GigDrive
          </span>
        </h1>
        <div className="relative">
          <Image
            src={"/logo.png"}
            alt="GigDrive logo"
            width={100}
            height={100}
            className="rounded-2xl shadow-xl"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-300 border-t-transparent" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <TelegramLoginButton
              botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
              onAuthCallback={async (data) => {
                setIsLoading(true);
                try {
                  const res = await axios.post("/api/telegramAuth", {
                    ...data,
                  });
                  localStorage.setItem("token", res.data.token);
                  setUserData({
                    name: data.first_name,
                    telegramId: String(data.id),
                  });
                  login();
                  toast.success("Login successful!");
                  router.push("/dashboard");
                } catch {
                  toast.error("Authentication failed");
                  setIsLoading(false);
                }
              }}
              buttonSize="large"
              cornerRadius={12}
              showAvatar={true}
              lang="en"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TelegramAuth;
