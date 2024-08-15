import React from "react";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import { auth } from "@/auth";

export default async function Profile() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-3xl font-black">Profile</h1>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        Your details will be used to mark your attendance.
      </p>
      <hr className="my-3" />

      <p>Your role: {session?.user?.role}</p>
      {/* <UpdateProfileForm /> */}
    </div>
  );
}
