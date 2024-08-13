import getSession from "@/lib/getSession";
import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.user) return redirect("/login");

  return (
    <div className="flex flex-1">
      <Sidebar />

      <main className="flex flex-[3] flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Main</h1>
      </main>
    </div>
  );
}
