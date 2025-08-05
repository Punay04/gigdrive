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
      <div className="bg-neutral-800 max-w-[400px] max-h-[500px] p-10 rounded-md text-white flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">
          Let's get started with{" "}
          <span className="font-bold text-red-300 underline underline-offset-auto">
            GigDrive
          </span>
        </h1>
        <Image src={"/logo.png"} alt="" width={100} height={100} />
        <div>
          <LoginButton
            botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
            onAuthCallback={async (data) => {
              const res = await axios.post(
                "https://67367bcfaccb.ngrok-free.app/api/telegramAuth",
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
            cornerRadius={5}
            showAvatar={true}
            lang="en"
          />
        </div>
      </div>
    </>
  );
};

export default TelegramAuth;
