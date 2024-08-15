"use client";
import FormItem from "@/app/(auth)/_components/FormItem";
import FormSubmissionButton from "@/app/(auth)/_components/FormSubmissionButton";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";

export default function UpdateProfileForm() {
  const { user } = useGlobalContext();
  return (
    <form action="" className="flex max-w-lg flex-col gap-3">
      <FormItem
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Tyler"
        defaultValue={user?.name.split(" ")[0]}
      />
      <FormItem
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Durden"
        defaultValue={user?.name.split(" ")[1]}
      />
      <FormItem
        label="Email"
        name="email"
        type="email"
        placeholder="tyler@example.com"
        defaultValue={user?.email}
      />
      <FormItem
        label="Roll Number"
        name="rollNumber"
        type="text"
        placeholder="E24CSEU0000"
        defaultValue="E22CSEU1420"
      />
      <FormSubmissionButton label="Update Profile" />
    </form>
  );
}
