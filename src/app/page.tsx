"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoginScreen from "@/presentation/auth/login/components/LoginScreen";

export default function Page() {
  const router = useRouter();
  const user = null;

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  return (
    <Suspense fallback={<div>Cargando login...</div>}>
      <LoginScreen />
    </Suspense>
  );
}
