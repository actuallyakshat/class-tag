"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";

export default function UserCard() {
  const { user } = useGlobalContext();
  return (
    <div className="px-6 py-3 hover:bg-muted">
      <p className="font-medium">
        {user?.firstName} {user?.lastName}
      </p>
      <p className="text-sm text-muted-foreground">{user?.email}</p>
    </div>
  );
}
