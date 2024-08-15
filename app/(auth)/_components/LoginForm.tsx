"use client";
import React from "react";
import FormItem from "./FormItem";
import FormSubmissionButton from "./FormSubmissionButton";
import { loginUser } from "../_actions/actions";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import getSession from "@/lib/getSession";

export default function LoginForm({ role }: { role: string }) {
  const { setIsAuthenticated, setSession } = useGlobalContext();
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-4 pt-5"
      action={async (formData) => {
        try {
          toast.loading("Logging in...", { id: "login" });
          const response = await loginUser(formData, role);
          if (response?.success) {
            setIsAuthenticated(true);
            const session = await getSession();
            setSession(session);
            router.push("/dashboard");
            toast.success("Successfully logged in!", { id: "login" });
          } else {
            toast.error(response.error, { id: "login" });
            return;
          }
        } catch (error: any) {
          console.error(error);
          toast.error(error.message, { id: "login" });
          return;
        }
      }}
    >
      <FormItem
        label="Email"
        placeholder="tyler@example.com"
        type="email"
        name="email"
      />

      <FormItem
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
      />

      <FormSubmissionButton label={`Login as ${role}`} />
    </form>
  );
}
