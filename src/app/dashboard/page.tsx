"use client";
import DashboardPage from "@/modals/dashboard/views/dashboard-page";
import { useStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);
  return (
    <div className="">
      <DashboardPage />
    </div>
  );
}
