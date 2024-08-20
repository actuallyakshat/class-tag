import React from "react";
import Sidebar from "./_components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-[3] px-12 py-10">{children}</div>
    </div>
  );
}
