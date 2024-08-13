import React from "react";
import LoginForm from "../_components/LoginForm";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Login() {
  const session = await getSession();
  console.log(session?.user);
  if (session?.user) redirect("/dashboard");

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4">
      <Tabs defaultValue="student" className="w-full max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="student" className="w-full">
            Student
          </TabsTrigger>
          <TabsTrigger value="teacher" className="w-full">
            Teacher
          </TabsTrigger>
        </TabsList>
        <TabsContent value="student" asChild>
          <StudentLogin />
        </TabsContent>
        <TabsContent value="teacher" asChild>
          <TeacherLogin />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function StudentLogin() {
  return (
    <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
      <h1 className="text-xl font-black">Welcome Back!</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Hurry up! Go grab your attendance.
      </p>

      <LoginForm role="Student" />
    </div>
  );
}

function TeacherLogin() {
  return (
    <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
      <h1 className="text-xl font-black">Welcome Back!</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Loging to record attendance for your students with ease.
      </p>

      <LoginForm role="Teacher" />
    </div>
  );
}
