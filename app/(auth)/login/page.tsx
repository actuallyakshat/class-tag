import React from "react";
import LoginForm from "../_components/LoginForm";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export default async function Login() {
  const session = await getSession();
  console.log(session?.user);
  if (session?.user) redirect("/dashboard");

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
        <h1 className="text-xl font-black">Welcome Back!</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hurry up! Go grab your attendance.
        </p>

        <LoginForm />
      </div>
    </section>
  );
}
