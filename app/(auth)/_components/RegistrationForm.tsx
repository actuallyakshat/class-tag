"use client";

import React from "react";
import { registerUser } from "../_actions/actions";
import FormItem from "./FormItem";
import FormSubmissionButton from "./FormSubmissionButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegistrationForm({ role }: { role: string }) {
  const router = useRouter();
  function resetForm() {
    const form: HTMLFormElement = document.getElementById(
      "register-form",
    ) as HTMLFormElement;
    form.reset();
  }

  return (
    <form
      id="register-form"
      className="flex flex-col gap-4 pt-5"
      action={async (e) => {
        try {
          validateForm(e);
          toast.loading("Creating Account", { id: "register-form" });
          const response = await registerUser(e, role);
          if (response.success) {
            toast.success("Account Created", { id: "register-form" });
            resetForm();
            router.push("/login");
          } else {
            toast.error(response.error, { id: "register-form" });
          }
        } catch (error: any) {
          if (error.message == "NEXT_REDIRECT") return;
          toast.error(error.message, { id: "register-form" });
        }
      }}
    >
      <div className="flex gap-4">
        <FormItem
          label="First Name"
          placeholder="Tyler"
          type="text"
          name="firstName"
        />
        <FormItem
          label="Last Name"
          placeholder="Durden"
          type="text"
          name="lastName"
        />
      </div>

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
      <FormItem
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        name="confirmPassword"
      />
      <FormSubmissionButton label={`Register as ${role}`} />
    </form>
  );
}

//Validate form data
function validateForm(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error("Missing required fields");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const passwordMinLength = 6;

  if (password.length < passwordMinLength) {
    throw new Error("Password must be at least 6 characters long");
  }
}
