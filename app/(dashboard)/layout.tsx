import React from "react";
import Sidebar from "./_components/Sidebar";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-[3] px-12 py-10">{children}</div>
    </div>
  );
}
