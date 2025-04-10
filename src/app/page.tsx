"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "@/presentation/auth/login/page";
// import { useAuthStore } from '@/core/state/auth' ← si usás Zustand

export default function Page() {
  const router = useRouter();
  const user = null;

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  return <LoginScreen />;
}
