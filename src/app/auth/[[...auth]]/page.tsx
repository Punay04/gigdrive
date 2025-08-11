"use client";
import AuthPage from "@/modals/auth/views/auth-page";
import { useStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const router = useRouter();

if (isLoggedIn) {
    router.push("/dashboard");
  }

  return (
    <div>
      <AuthPage />
    </div>
  );
};

export default Page;
