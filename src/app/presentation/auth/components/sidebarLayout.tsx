// app/components/Layout.tsx o donde prefieras
import React from "react";
import Sidebar from "./sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#ffffff] p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;

