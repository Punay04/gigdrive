"use client";
import Image from "next/image";
import React from "react";
import { LoginButton } from "@telegram-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/zustand/store";

console.log("Bot username:", process.env.NEXT_PUBLIC_BOT_USERNAME);

const TelegramAuth = () => {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const userData = useStore((state) => state.userData);

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
          <LoginButton
            botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
            onAuthCallback={async (data) => {
              const res = await axios.post(
                "https://gigdrive.vercel.app/api/telegramAuth",
                {
                  ...data,
                }
              );
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              console.log(data);
              userData.name = data.first_name;
              userData.telegramId = String(data.id);
              login();
              router.push("/dashboard");
            }}
            buttonSize="large"
            cornerRadius={12}
            showAvatar={true}
            lang="en"
          />
        </div>
      </div>
    </>
  );
};

export default TelegramAuth;
