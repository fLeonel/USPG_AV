"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";
import SidebarLayout from "../components/sidebarLayout";
import Header from "./components/Header";
import Planificacion from "./components/Planificacion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
  const { user, loading } = useLoggedUserData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Cargando...</p>;

  if (!user) return null;

  return (
    <SidebarLayout>
      <Header />
      <div className="flex flex-col items-center bg-gray-100 rounded-2xl text-[#171717] min-h-screen pt-14">
        <Planificacion />
      </div>
    </SidebarLayout>
  );
}
