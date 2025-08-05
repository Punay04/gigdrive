"use client";
import AuthPage from "@/modals/auth/views/auth-page";
import { useStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const router = useRouter();

  // useEffect(() => {
  if (isLoggedIn) {
    router.push("/dashboard");
  }
  // }, [isLoggedIn, router]);

  return (
    <div>
      <AuthPage />
    </div>
  );
};

export default Page;
