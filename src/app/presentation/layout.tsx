import type { ReactNode } from "react";
import SidebarLayout from "./auth/components/sidebarLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
