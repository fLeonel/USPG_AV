"use client";

import LoginScreen from "@/presentation/auth/login/components/LoginScreen";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando login...</div>}>
      <LoginScreen />
    </Suspense>
  );
}

